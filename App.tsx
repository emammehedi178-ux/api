import React, { Component, ErrorInfo, ReactNode } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import FormPage from './pages/FormPage';
import AdminPage from './pages/AdminPage';
import SuccessPage from './pages/SuccessPage';

// Simple Error Boundary Component to catch crashes
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-brand-dark text-white p-4 font-sans">
          <div className="max-w-lg w-full bg-gray-800 p-8 rounded-xl border border-red-500/50 shadow-2xl">
            <h1 className="text-2xl font-bold text-red-500 mb-4">⚠️ Application Error</h1>
            <p className="text-gray-300 mb-4">Something went wrong while loading the app.</p>
            <div className="bg-black/50 p-4 rounded-lg overflow-auto max-h-60 mb-6 border border-gray-700">
              <code className="text-xs font-mono text-red-300 whitespace-pre-wrap">
                {this.state.error?.toString()}
              </code>
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<FormPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <HashRouter>
        <div className="bg-brand-dark min-h-screen text-white font-sans selection:bg-brand-red selection:text-white">
          <AnimatedRoutes />
        </div>
      </HashRouter>
    </ErrorBoundary>
  );
};

export default App;
