'use client';

import React, { Component, ReactNode } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-earth-900 via-earth-800 to-earth-900 flex items-center justify-center p-6">
          <div className="max-w-2xl w-full bg-earth-950 rounded-xl shadow-2xl border border-earth-700 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-red-900/50 p-3 rounded-full border border-red-700">
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-earth-100">Bir Hata Oluştu</h1>
                <p className="text-earth-300">Something went wrong</p>
              </div>
            </div>

            <div className="bg-earth-900 rounded-lg p-4 mb-6 border border-earth-700">
              <p className="text-sm text-earth-200 font-mono">
                {this.state.error?.message || 'Bilinmeyen hata'}
              </p>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
              <details className="mb-6">
                <summary className="text-earth-300 cursor-pointer hover:text-earth-200 mb-2">
                  Teknik Detaylar (Geliştirici Modu)
                </summary>
                <pre className="bg-earth-900 rounded-lg p-4 text-xs text-earth-400 overflow-auto border border-earth-700">
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}

            <div className="flex gap-3">
              <button
                onClick={this.handleReset}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-agri-600 to-forest-600 text-white px-6 py-3 rounded-lg hover:from-agri-700 hover:to-forest-700 transition-all shadow-lg font-semibold"
              >
                <RefreshCw className="w-5 h-5" />
                Tekrar Dene
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="flex-1 flex items-center justify-center gap-2 bg-earth-800 text-earth-200 px-6 py-3 rounded-lg hover:bg-earth-700 transition-all border border-earth-700 font-semibold"
              >
                <Home className="w-5 h-5" />
                Ana Sayfa
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
