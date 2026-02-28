import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not defined');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const cached = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

const CONNECT_OPTS = {
  bufferCommands: false,
  maxPoolSize: 1,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  retryReads: true,
  retryWrites: true,
};

function createConnection() {
  return mongoose.connect(MONGODB_URI, CONNECT_OPTS).then((m) => {
    console.log('MongoDB connected successfully');
    return m;
  });
}

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = createConnection();
  }

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      cached.conn = await cached.promise;
      return cached.conn;
    } catch (e) {
      cached.promise = null;
      cached.conn = null;
      if (attempt < 2) {
        console.warn(`MongoDB connection attempt ${attempt + 1} failed, retrying...`);
        cached.promise = createConnection();
      } else {
        throw e;
      }
    }
  }

  return cached.conn!;
}

/**
 * Retry wrapper for database operations that may fail due to
 * transient pool/SSL errors during static generation.
 */
export async function withRetry<T>(fn: () => Promise<T>, maxAttempts = 3): Promise<T> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err: unknown) {
      const isRetryable =
        err instanceof Error &&
        (err.name === 'MongoPoolClearedError' ||
         err.name === 'MongoNetworkError' ||
         err.message.includes('pool was cleared') ||
         err.message.includes('tlsv1 alert'));

      if (isRetryable && attempt < maxAttempts - 1) {
        console.warn(`[DB] Retryable error (attempt ${attempt + 1}/${maxAttempts}): ${err instanceof Error ? err.message : err}`);
        // Reset connection so next connectDB() re-establishes
        cached.conn = null;
        cached.promise = null;
        await connectDB();
      } else {
        throw err;
      }
    }
  }
  throw new Error('withRetry: unreachable');
}

export default connectDB;
