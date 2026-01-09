'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-red-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-red-100 p-4 rounded-full">
              <AlertCircle className="w-12 h-12 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Bir Hata Oluştu</h1>
              <p className="text-gray-400">Something Went Wrong</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="font-semibold text-white mb-2">Hata Detayı / Error Details:</h2>
            <p className="text-sm text-white font-mono break-all">
              {error.message || 'Bilinmeyen bir hata oluştu / Unknown error occurred'}
            </p>
            {error.digest && (
              <p className="text-xs text-gray-400 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={reset}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-lg"
            >
              <RefreshCw className="w-5 h-5" />
              Tekrar Dene / Try Again
            </button>
            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-green-600 text-green-700 font-bold rounded-lg hover:bg-green-50 transition-all"
            >
              <Home className="w-5 h-5" />
              Ana Sayfa / Home
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-400 text-center">
              Sorun devam ederse lütfen bizimle iletişime geçin.<br/>
              If the problem persists, please contact support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
