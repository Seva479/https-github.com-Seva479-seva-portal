import React, { Component, ErrorInfo, ReactNode } from 'react';

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
    console.error('Uncaught error in SEVA Portal:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F7FAF8] flex items-center justify-center p-4 sm:p-6 text-center">
          <div className="max-w-md w-full bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-stone-200 space-y-5">
            <div className="flex justify-center mb-2">
              <img
                src="/assets/aistudio/Screenshot_2026-11-03_152258_7da70e8a.png"
                alt="SEVA – Sustainable Ecology & Village Advancement"
                className="max-h-16 w-auto object-contain mx-auto"
                onError={(e) => {
                  // Fallback if image fails
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <h1 className="text-xl font-black text-[#0F3825]">SEVA Technology Portal</h1>
              <p className="text-xs font-semibold text-[#0B6643] uppercase tracking-wider mt-1">
                Sustainable Ecology &amp; Village Advancement
              </p>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed">
              We encountered a technical issue while rendering the application. Please tap below to reload and restore your session.
            </p>
            {this.state.error && (
              <pre className="text-xs bg-stone-50 border border-stone-200 p-3 rounded-xl text-left overflow-auto text-stone-700 max-h-28 font-mono">
                {this.state.error.message || String(this.state.error)}
              </pre>
            )}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  try {
                    localStorage.removeItem('seva_admin_session');
                  } catch (e) {
                    // Ignore storage error
                  }
                  window.location.href = '/';
                }}
                className="flex-1 py-3 px-5 bg-[#0B6643] hover:bg-[#07472E] text-white font-bold text-sm rounded-full shadow-md transition-all cursor-pointer"
              >
                Reload Portal
              </button>
              <button
                onClick={() => {
                  window.location.reload();
                }}
                className="py-3 px-5 border border-stone-300 text-stone-700 hover:bg-stone-50 font-semibold text-sm rounded-full transition-all cursor-pointer"
              >
                Try Again
              </button>
            </div>
            <div className="text-[11px] text-stone-400">
              Need assistance? Contact <a href="mailto:seva.ecology@gmail.com" className="text-[#0B6643] underline font-medium">seva.ecology@gmail.com</a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
