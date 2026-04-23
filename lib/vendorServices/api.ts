import type { ApiErrorBody, VendorService } from './types';

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
                'https://ai-procurement-backend-q35u.onrender.com';

export class VendorServiceApiError extends Error {
  status: number;
  details: ApiErrorBody | null;
  constructor(message: string, status: number, details: ApiErrorBody | null) {
    super(message);
    this.name = 'VendorServiceApiError';
    this.status = status;
    this.details = details;
  }
}

async function authFetch<T>(
  path: string,
  token: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  let body: { success?: boolean; data?: unknown; error?: ApiErrorBody; message?: string } = {};
  try {
    body = await res.json();
  } catch {
    // body stays empty
  }

  if (!res.ok || body.success === false) {
    const msg = body.error?.message || body.message || `Request failed (${res.status})`;
    throw new VendorServiceApiError(msg, res.status, body.error || null);
  }

  return body.data as T;
}

export function listVendorServices(token: string) {
  return authFetch<VendorService[]>('/api/vendor-services', token);
}

export function getVendorService(id: string, token: string) {
  return authFetch<VendorService>(`/api/vendor-services/${encodeURIComponent(id)}`, token);
}

export function createVendorService(input: VendorService, token: string) {
  return authFetch<VendorService>('/api/vendor-services', token, {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function updateVendorService(id: string, input: VendorService, token: string) {
  return authFetch<VendorService>(`/api/vendor-services/${encodeURIComponent(id)}`, token, {
    method: 'PUT',
    body: JSON.stringify(input),
  });
}

export function deleteVendorService(id: string, token: string) {
  return authFetch<{ ok: true }>(`/api/vendor-services/${encodeURIComponent(id)}`, token, {
    method: 'DELETE',
  });
}
