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

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      retryReads: true,
      retryWrites: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('MongoDB connected successfully');
      return mongoose;
    });
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
        const opts = {
          bufferCommands: false,
          maxPoolSize: 5,
          serverSelectionTimeoutMS: 30000,
          socketTimeoutMS: 45000,
          retryReads: true,
          retryWrites: true,
        };
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
          console.log('MongoDB connected successfully');
          return mongoose;
        });
      } else {
        throw e;
      }
    }
  }

  return cached.conn!;
}

export default connectDB;
