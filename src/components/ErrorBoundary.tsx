import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.warn('Could not clear localStorage:', e);
    }
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-center shadow-2xl">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-8 h-8" />
            </div>
            
            <h2 className="text-xl font-bold text-white mb-2">
              কিছু সমস্যা হয়েছে / Something went wrong
            </h2>
            
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              ব্রাউজারের পুরানো ডাটা বা অন্য কোনো কারণে সাময়িক সমস্যা হতে পারে। নিচের বাটনে ক্লিক করে অ্যাপটি রিলোড করুন।
              <br />
              <span className="text-xs text-slate-500 mt-1 block">
                Click below to reset corrupted browser storage and reload clean.
              </span>
            </p>

            {this.state.error && (
              <div className="p-3 mb-6 bg-slate-950 rounded-lg text-left text-xs font-mono text-rose-400 overflow-x-auto border border-rose-500/20">
                {this.state.error.message || String(this.state.error)}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={this.handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>রিসেট ও রিলোড (Reset & Reload)</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
