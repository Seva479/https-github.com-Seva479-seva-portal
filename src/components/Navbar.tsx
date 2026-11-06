import React, { useState } from 'react';
import { Menu, X, Lock, ArrowRight, Phone, Mail, Sparkles, Building2, ChevronRight } from 'lucide-react';
import { SevaLogo } from './SevaLogo';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  isAdmin: boolean;
  onToggleAdmin: () => void;
  mobileMenuOpen?: boolean;
  onToggleMobileMenu?: (open?: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  isAdmin,
  onToggleAdmin,
  mobileMenuOpen: externalMenuOpen,
  onToggleMobileMenu,
}) => {
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);
  const mobileMenuOpen = externalMenuOpen !== undefined ? externalMenuOpen : internalMenuOpen;
  const setMobileMenuOpen = (open: boolean) => {
    if (onToggleMobileMenu) {
      onToggleMobileMenu(open);
    } else {
      setInternalMenuOpen(open);
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About SEVA' },
    { id: 'approach', label: 'Our Approach' },
    { id: 'why-digital', label: 'Why Digital?' },
    { id: 'programme', label: 'Tech Support' },
    { id: 'impact', label: 'Our Impact' },
    { id: 'resources', label: 'Resources' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. Top Utility Bar: Clean on Tablet & Desktop (>= 768px), Hidden on Mobile (< 768px) to prevent vertical clutter */}
      <div className="hidden md:block bg-[#064E36] text-[#F7FAF8] text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-[#0B6643]/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left: Organization Identity */}
          <div className="flex items-center gap-2 text-emerald-100 font-medium tracking-tight truncate">
            <span className="font-extrabold text-emerald-300">SEVA</span>
            <span>·</span>
            <span className="font-semibold">Sustainable Ecology &amp; Village Advancement</span>
            <span className="text-emerald-300/40">·</span>
            <span className="text-emerald-200/90">Ralegaon, Yavatmal, Maharashtra</span>
          </div>

          {/* Right: Direct Contact Links */}
          <div className="flex items-center gap-4 text-emerald-100/90 font-medium text-xs shrink-0">
            <a
              href="tel:+918999469974"
              className="flex items-center gap-1.5 hover:text-white transition-colors min-h-[36px]"
              title="Call SEVA Helpline"
            >
              <Phone className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
              <span className="tabular-nums font-bold">+91 8999469974</span>
            </a>
            <span className="text-emerald-300/40">·</span>
            <a
              href="mailto:seva.ecology@gmail.com"
              className="flex items-center gap-1.5 hover:text-white transition-colors min-h-[36px]"
              title="Email SEVA"
            >
              <Mail className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
              <span className="font-semibold">seva.ecology@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Header Tier: Brand Logo (Left) + Clean Mobile Actions (Right) */}
      <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-stone-200 shadow-xs w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Left: Official Emblem & Dark Green Typography */}
            <button
              onClick={() => handleNavClick('home')}
              className="text-left cursor-pointer group shrink-0 focus:outline-hidden min-h-[48px] flex items-center"
              title="SEVA – Sustainable Ecology & Village Advancement"
            >
              <SevaLogo variant="light" />
            </button>

            {/* Right: Actions & Menu Toggle (Uncluttered & Spacious on Mobile) */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Admin Login Button */}
              <button
                onClick={onToggleAdmin}
                className={`min-h-[48px] min-w-[48px] flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-full border transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-2xs ${
                  isAdmin
                    ? 'bg-[#064E36] text-white border-[#064E36]'
                    : 'bg-emerald-50/80 text-[#064E36] border-emerald-200 hover:bg-[#064E36] hover:text-white'
                }`}
                title="सुरक्षित Admin Login"
              >
                <Lock className="w-3.5 h-3.5 text-[#D97706]" />
                <span className="hidden sm:inline">Admin Login</span>
                <span className="sm:hidden font-extrabold">Admin</span>
              </button>

              {/* Apply for Support Button (Desktop >= 768px) */}
              <button
                onClick={() => handleNavClick('apply')}
                className="hidden md:flex items-center gap-2 min-h-[48px] px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#064E36] hover:bg-[#043323] rounded-full transition-all shadow-sm hover:shadow-md cursor-pointer whitespace-nowrap shrink-0 active:scale-[0.98]"
              >
                <span>Apply for Support</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </button>

              {/* Mobile (< 768px) Hamburger Toggle with min 48x48px Touch Target */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-12 h-12 min-h-[48px] min-w-[48px] flex items-center justify-center text-stone-800 hover:text-[#064E36] hover:bg-emerald-50 rounded-xl border border-stone-200 focus:outline-hidden shrink-0 cursor-pointer transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#064E36]" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* 3. Dedicated Rich Dark Green Desktop Navigation Ribbon (>= 768px) */}
        <div
          className="hidden md:block border-t border-[#04281C] text-white shadow-md"
          style={{
            backgroundColor: '#064E36',
            backgroundImage: 'linear-gradient(135deg, #03281C 0%, #064E36 50%, #0A6347 100%)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center justify-between py-2">
              <div className="flex items-center gap-1 xl:gap-2">
                {navLinks.map((link) => {
                  const isActive = currentView === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link.id)}
                      className={`px-3.5 py-2 rounded-lg text-xs xl:text-sm font-bold tracking-tight transition-all cursor-pointer whitespace-nowrap min-h-[40px] ${
                        isActive
                          ? 'bg-white text-[#064E36] font-black shadow-xs'
                          : 'text-emerald-100 hover:text-white hover:bg-white/15'
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-amber-300 bg-black/30 px-3 py-1.5 rounded-full border border-amber-400/30 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>2026 Batch Active · Ralegaon Hub</span>
              </div>
            </nav>
          </div>
        </div>

        {/* 4. Streamlined Mobile Drawer Overlay (< 768px, Fully Responsive & High Touch-Friendly) */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay to close when touching outside */}
            <div
              className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-xs transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="md:hidden border-t border-stone-200 bg-white shadow-2xl animate-in slide-in-from-top-2 duration-200 relative z-50">
              {/* Top Contact Strip in Drawer */}
              <div className="bg-[#064E36] px-4 py-2 text-white flex items-center justify-between text-xs font-medium">
                <a
                  href="tel:+918999469974"
                  className="flex items-center gap-1.5 hover:text-amber-200 font-bold min-h-[48px] py-1"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>+91 8999469974</span>
                </a>
                <a
                  href="mailto:seva.ecology@gmail.com"
                  className="flex items-center gap-1.5 hover:text-amber-200 font-bold min-h-[48px] py-1"
                >
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>ईमेल करा</span>
                </a>
              </div>

              {/* Nav links with min 48px Touch Targets */}
              <div className="p-4 space-y-1 divide-y divide-stone-100 max-h-[70vh] overflow-y-auto">
                {navLinks.map((link) => {
                  const isActive = currentView === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link.id)}
                      className={`w-full text-left min-h-[48px] py-3 px-4 rounded-xl text-base font-bold flex items-center justify-between cursor-pointer transition-colors ${
                        isActive
                          ? 'bg-emerald-50 text-[#064E36] font-extrabold'
                          : 'text-stone-700 hover:bg-stone-50 hover:text-[#064E36]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className={`w-5 h-5 ${isActive ? 'text-[#064E36]' : 'text-stone-400'}`} />
                    </button>
                  );
                })}

                {/* Primary Mobile Action Buttons with >= 48px Height */}
                <div className="pt-4 space-y-3">
                  <button
                    onClick={() => handleNavClick('apply')}
                    className="w-full min-h-[48px] py-3 px-5 rounded-full bg-[#064E36] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md hover:bg-[#043323] cursor-pointer active:scale-[0.98]"
                  >
                    <span>Apply for Technology Support</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onToggleAdmin();
                    }}
                    className="w-full min-h-[48px] py-3 px-5 rounded-full bg-stone-100 text-stone-800 font-bold text-xs flex items-center justify-center gap-2 border border-stone-200 hover:bg-stone-200 cursor-pointer active:scale-[0.98]"
                  >
                    <Lock className="w-4 h-4 text-amber-600" />
                    <span>प्रशासकीय लॉगिन (Admin Portal Login)</span>
                  </button>
                </div>

                {/* Institutional info & Cache Buster */}
                <div className="pt-3 pb-1 text-center text-xs text-stone-500 font-medium space-y-2">
                  <div>
                    An Initiative of <strong className="text-[#064E36]">Sarathi Sanstha</strong> • Ralegaon, Yavatmal
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        window.location.href = window.location.origin + window.location.pathname + '?v=' + Date.now();
                      }}
                      className="min-h-[44px] text-xs text-[#064E36] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200"
                    >
                      <span>🔄 नवीन आवृत्ती लोड करा (Tap to Hard Refresh)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
};
