import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ApproachPage } from './pages/ApproachPage';
import { WhyDigitalPage } from './pages/WhyDigitalPage';
import { ProgrammePage } from './pages/ProgrammePage';
import { ImpactPage } from './pages/ImpactPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ContactPage } from './pages/ContactPage';
import { ApplyPage } from './pages/ApplyPage';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminLoginModal } from './components/AdminLoginModal';
import { SevaStore } from './services/store';
import { Bell, Sparkles, X } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showBanner, setShowBanner] = useState<boolean>(true);

  const settings = SevaStore.getSettings();

  // Helper to check if currently authenticated as admin
  const isUserAuthenticated = (): boolean => {
    try {
      const raw = localStorage.getItem('seva_admin_session');
      if (raw) {
        const data = JSON.parse(raw);
        return Boolean(data && data.email);
      }
    } catch (e) {
      console.warn('Session parse error:', e);
    }
    return false;
  };

  // Handle URL hash navigation on mount and hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'admin') {
        if (isUserAuthenticated()) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          setShowLoginModal(true);
        }
      } else if (hash) {
        setIsAdmin(false);
        setCurrentView(hash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (view: string) => {
    setIsAdmin(false);
    setCurrentView(view);
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Safe handler to request Admin entry
  const handleOpenAdmin = () => {
    if (isUserAuthenticated()) {
      setIsAdmin(true);
      window.location.hash = 'admin';
    } else {
      setShowLoginModal(true);
    }
  };

  // Successful Admin Login
  const handleLoginSuccess = (email: string) => {
    setShowLoginModal(false);
    setIsAdmin(true);
    window.location.hash = 'admin';
  };

  // Logout & Exit Admin
  const handleExitAdmin = () => {
    localStorage.removeItem('seva_admin_session');
    setIsAdmin(false);
    setCurrentView('home');
    window.location.hash = 'home';
  };

  // If in Admin Mode, render the complete Admin Console
  if (isAdmin) {
    return <AdminLayout onExitAdmin={handleExitAdmin} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF8] text-[#172B24] font-sans selection:bg-[#0B6643] selection:text-white">
      {/* Announcement Banner if configured */}
      {showBanner && settings.announcement_banner && (
        <div className="bg-[#D97706] text-white text-xs py-2 px-4 text-center font-medium relative flex items-center justify-center gap-3 shadow-xs">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>{settings.announcement_banner}</span>
          </div>
          <button
            onClick={() => handleNavigate('apply')}
            className="underline font-bold hover:text-amber-100 cursor-pointer hidden sm:inline"
          >
            Apply Now &rarr;
          </button>
          <button
            onClick={() => setShowBanner(false)}
            className="absolute right-3 text-amber-200 hover:text-white p-0.5 cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        isAdmin={isAdmin}
        onToggleAdmin={handleOpenAdmin}
      />

      {/* Main Body View */}
      <main className="flex-1">
        {currentView === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentView === 'about' && <AboutPage onNavigate={handleNavigate} />}
        {currentView === 'approach' && <ApproachPage onNavigate={handleNavigate} />}
        {currentView === 'why-digital' && <WhyDigitalPage onNavigate={handleNavigate} />}
        {currentView === 'programme' && <ProgrammePage onNavigate={handleNavigate} />}
        {currentView === 'impact' && <ImpactPage onNavigate={handleNavigate} />}
        {currentView === 'resources' && <ResourcesPage />}
        {currentView === 'contact' && <ContactPage />}
        {currentView === 'apply' && <ApplyPage onNavigate={handleNavigate} />}
      </main>

      {/* Main Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Secure Password-Protected Admin Login Modal */}
      <AdminLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
