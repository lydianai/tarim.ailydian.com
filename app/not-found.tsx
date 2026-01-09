'use client';

import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white rounded-2xl shadow-2xl p-12 border-4 border-blue-100">
          <div className="inline-flex items-center justify-center bg-blue-100 p-6 rounded-full mb-6">
            <FileQuestion className="w-20 h-20 text-blue-600" />
          </div>

          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-3xl font-bold text-white mb-4">
            Sayfa Bulunamadı
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Page Not Found
          </p>

          <p className="text-gray-400 mb-8 leading-relaxed">
            Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.<br/>
            The page you're looking for might have been moved, deleted, or never existed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
            >
              <Home className="w-5 h-5" />
              Ana Sayfa / Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-blue-600 text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Geri Dön / Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
