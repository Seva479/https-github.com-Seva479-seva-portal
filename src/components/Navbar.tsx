import React, { useState } from 'react';
import { Menu, X, Lock, ArrowRight, Phone, Mail, Sparkles, Building2, ChevronRight } from 'lucide-react';
import { SevaLogo } from './SevaLogo';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  isAdmin: boolean;
  onToggleAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  isAdmin,
  onToggleAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      {/* 1. Top Utility Bar: Clean on Tablet & Desktop, Hidden on Mobile to prevent vertical clutter */}
      <div className="hidden sm:block bg-[#064E36] text-[#F7FAF8] text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-[#0B6643]/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left: Organization Identity */}
          <div className="flex items-center gap-2 text-emerald-100 font-medium tracking-tight truncate">
            <span className="font-extrabold text-emerald-300">SEVA</span>
            <span>·</span>
            <span className="font-semibold">Sustainable Ecology &amp; Village Advancement</span>
            <span className="hidden md:inline text-emerald-300/40">·</span>
            <span className="hidden md:inline text-emerald-200/90">Ralegaon, Yavatmal, Maharashtra</span>
          </div>

          {/* Right: Direct Contact Links */}
          <div className="flex items-center gap-4 text-emerald-100/90 font-medium text-xs shrink-0">
            <a
              href="tel:+918999469974"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              title="Call SEVA Helpline"
            >
              <Phone className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
              <span className="tabular-nums font-bold">+91 8999469974</span>
            </a>
            <span className="text-emerald-300/40">·</span>
            <a
              href="mailto:seva.ecology@gmail.com"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
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
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3.5">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Left: Official Emblem & Dark Green Typography */}
            <button
              onClick={() => handleNavClick('home')}
              className="text-left cursor-pointer group shrink-0 focus:outline-hidden"
              title="SEVA – Sustainable Ecology & Village Advancement"
            >
              <SevaLogo variant="light" />
            </button>

            {/* Right: Actions & Menu Toggle (Uncluttered & Spacious on Mobile) */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              {/* Admin Login Button */}
              <button
                onClick={onToggleAdmin}
                className={`flex items-center gap-1 sm:gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs font-bold rounded-full border transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-2xs ${
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

              {/* Apply for Support Button (Tablet & Desktop) */}
              <button
                onClick={() => handleNavClick('apply')}
                className="hidden sm:flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold text-white bg-[#064E36] hover:bg-[#043323] rounded-full transition-all shadow-sm hover:shadow-md cursor-pointer whitespace-nowrap shrink-0 active:scale-[0.98]"
              >
                <span>Apply for Support</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </button>

              {/* Mobile & Tablet Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-stone-800 hover:text-[#064E36] hover:bg-emerald-50 rounded-xl border border-stone-200 focus:outline-hidden shrink-0 cursor-pointer transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-[#064E36]" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* 3. Desktop Navigation Bar (Large screens) */}
        <div className="hidden lg:block border-t border-stone-100 bg-stone-50/70">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <nav className="flex items-center justify-between py-1.5">
              <div className="flex items-center gap-1">
                {navLinks.map((link) => {
                  const isActive = currentView === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#064E36] text-white shadow-2xs'
                          : 'text-stone-700 hover:text-[#064E36] hover:bg-white'
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-3 text-xs font-medium text-stone-500">
                <span className="flex items-center gap-1 text-[#064E36] font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>2026 Batch Active</span>
                </span>
              </div>
            </nav>
          </div>
        </div>

        {/* 4. Streamlined Mobile Drawer (Completely uncluttered, high touch-friendly) */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white shadow-xl animate-in slide-in-from-top-2 duration-200">
            {/* Top Contact Strip in Drawer */}
            <div className="bg-[#064E36] p-3 text-white flex items-center justify-between text-xs font-medium">
              <a href="tel:+918999469974" className="flex items-center gap-1.5 hover:text-amber-200 font-bold">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>+91 8999469974</span>
              </a>
              <a href="mailto:seva.ecology@gmail.com" className="flex items-center gap-1.5 hover:text-amber-200 font-bold">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>ईमेल करा</span>
              </a>
            </div>

            {/* Nav links */}
            <div className="p-4 space-y-1 divide-y divide-stone-100 max-h-[70vh] overflow-y-auto">
              {navLinks.map((link) => {
                const isActive = currentView === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full text-left py-2.5 px-3 rounded-xl text-sm font-bold flex items-center justify-between cursor-pointer transition-colors ${
                      isActive
                        ? 'bg-emerald-50 text-[#064E36] font-extrabold'
                        : 'text-stone-700 hover:bg-stone-50 hover:text-[#064E36]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#064E36]' : 'text-stone-400'}`} />
                  </button>
                );
              })}

              {/* Primary Mobile Action Buttons */}
              <div className="pt-4 space-y-2.5">
                <button
                  onClick={() => handleNavClick('apply')}
                  className="w-full py-3.5 px-5 rounded-full bg-[#064E36] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md hover:bg-[#043323] cursor-pointer"
                >
                  <span>Apply for Technology Support</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onToggleAdmin();
                  }}
                  className="w-full py-2.5 px-5 rounded-full bg-stone-100 text-stone-800 font-bold text-xs flex items-center justify-center gap-2 border border-stone-200 hover:bg-stone-200 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                  <span>प्रशासकीय लॉगिन (Admin Portal Login)</span>
                </button>
              </div>

              {/* Institutional info & Cache Buster */}
              <div className="pt-3 pb-1 text-center text-[11px] text-stone-500 font-medium space-y-1.5">
                <div>
                  An Initiative of <strong className="text-[#064E36]">Sarathi Sanstha</strong> • Ralegaon, Yavatmal
                </div>
                <div>
                  <button
                    onClick={() => {
                      window.location.href = window.location.origin + window.location.pathname + '?v=' + Date.now();
                    }}
                    className="text-[11px] text-[#064E36] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200"
                  >
                    <span>🔄 नवीन आवृत्ती लोड करा (Tap to Hard Refresh)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
