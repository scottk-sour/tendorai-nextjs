'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ai-procurement-backend-q35u.onrender.com';

function ResetPasswordForm({ token }: { token: string | null }) {
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [maskedEmail, setMaskedEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Validate token on mount
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setError('No reset token provided');
        setIsValidating(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/auth/verify-reset-token/${token}`);
        const data = await response.json();

        if (data.valid) {
          setIsValid(true);
          setMaskedEmail(data.email);
        } else {
          setError(data.message || 'Invalid or expired reset link');
        }
      } catch {
        setError('Failed to verify reset link');
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/vendor-reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to reset password');
      }

      setSuccess(true);

      // Store token and redirect to dashboard
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('vendorId', data.vendorId);
        localStorage.setItem('userRole', 'vendor');
        localStorage.setItem('userName', data.name);

        setTimeout(() => {
          router.push('/vendor-dashboard');
        }, 2000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (isValidating) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Verifying reset link...</p>
      </div>
    );
  }

  // Invalid token state
  if (!isValid && !success) {
    return (
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
          <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-medium text-gray-900">Link expired or invalid</h3>
        <p className="mt-2 text-sm text-gray-600">{error}</p>
        <div className="mt-6">
          <Link
            href="/vendor-forgot-password"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700"
          >
            Request new reset link
          </Link>
        </div>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-medium text-gray-900">Password reset successful</h3>
        <p className="mt-2 text-sm text-gray-600">
          Your password has been changed. Redirecting to your dashboard...
        </p>
        <div className="mt-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  // Reset form
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {maskedEmail && (
        <div className="bg-gray-50 rounded-lg px-4 py-3 text-sm text-gray-600">
          Resetting password for: <strong>{maskedEmail}</strong>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          New password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            placeholder="At least 6 characters"
          />
        </div>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm new password
        </label>
        <div className="mt-1">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            placeholder="Confirm your password"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Resetting...
            </>
          ) : (
            'Reset password'
          )}
        </button>
      </div>
    </form>
  );
}

export default function ResetPasswordContent({ token }: { token: string | null }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center">
          <span className="text-3xl font-bold text-purple-600">TendorAI</span>
        </Link>
        <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
          Create new password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <ResetPasswordForm token={token} />
        </div>
      </div>
    </div>
  );
}
