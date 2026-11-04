import React, { useState } from 'react';
import { Menu, X, Lock, ArrowRight, Phone, Mail, Sparkles } from 'lucide-react';

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
      {/* 1. Top Utility Bar for Institutional Transparency (Compact on Mobile, Full on Desktop) */}
      <div className="bg-[#064E36] text-[#F7FAF8] text-xs py-1.5 px-3 sm:px-6 lg:px-8 border-b border-[#0B6643]/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left: Organization Identity */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-emerald-100 font-medium tracking-tight truncate">
            <span className="font-extrabold text-emerald-300">SEVA</span>
            <span>·</span>
            <span className="sm:hidden font-semibold text-emerald-100">Sarathi Sanstha</span>
            <span className="hidden sm:inline font-semibold">Sustainable Ecology &amp; Village Advancement</span>
            <span className="hidden md:inline text-emerald-300/40">·</span>
            <span className="hidden md:inline text-emerald-200/90">Ralegaon, Yavatmal, Maharashtra</span>
          </div>

          {/* Right: Direct Contact Links */}
          <div className="flex items-center gap-2.5 sm:gap-4 text-emerald-100/90 font-medium text-xs shrink-0">
            <a
              href="tel:+918999469974"
              className="flex items-center gap-1 sm:gap-1.5 hover:text-white transition-colors"
              title="Call SEVA Helpline"
            >
              <Phone className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
              <span className="tabular-nums font-bold text-[11px] sm:text-xs">+91 8999469974</span>
            </a>
            <span className="hidden sm:inline text-emerald-300/40">·</span>
            <a
              href="mailto:seva.ecology@gmail.com"
              className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors"
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
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Left: Official Emblem & Dark Green Typography */}
            <button
              onClick={() => handleNavClick('home')}
              className="text-left cursor-pointer group shrink-0 flex items-center gap-2.5 sm:gap-3.5 focus:outline-hidden"
              title="SEVA – Sustainable Ecology & Village Advancement"
            >
              {/* Crisp Official Emblem Badge (Screenshot Accurate) */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#E8F8F0] p-1 flex items-center justify-center shrink-0 border border-[#86EFAC] shadow-xs group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 sm:w-9 sm:h-9">
                  {/* Smooth Organic Emerald Leaf Silhouette */}
                  <path
                    d="M24 6 C17 11 11 21 15 34 C18 43 30 43 33 34 C37 21 31 11 24 6 Z"
                    fill="#2E9E6B"
                  />
                  {/* Innovation Blue Dot at Apex */}
                  <circle cx="24" cy="11.5" r="2.2" fill="#38BDF8" />
                  {/* Left Grassroots Golden Amber Dot */}
                  <circle cx="12" cy="25" r="2.4" fill="#F59E0B" />
                  {/* Right Grassroots Golden Amber Dot */}
                  <circle cx="36" cy="25" r="2.4" fill="#F59E0B" />
                  {/* Pure White Bold Distinctive 'S' */}
                  <text
                    x="24"
                    y="32.5"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="21"
                    fontWeight="900"
                    fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                  >
                    S
                  </text>
                </svg>
              </div>

              {/* Brand Typography in Dark Green */}
              <div className="space-y-0.5">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#064E36] group-hover:text-[#0B6643] transition-colors leading-none block">
                  SEVA
                </span>
                <span className="hidden sm:block text-[11px] font-bold text-[#0B6643] tracking-tight uppercase leading-tight">
                  Sustainable Ecology &amp; Village Advancement
                </span>
                <span className="block text-[10.5px] sm:text-[11.5px] font-bold text-[#14532D] tracking-normal leading-tight">
                  An Initiative of Sarathi Sanstha
                </span>
              </div>
            </button>

            {/* Right: Actions & Menu Toggle (Uncluttered, responsive on all devices) */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              {/* Admin Login Button */}
              <button
                onClick={onToggleAdmin}
                className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold rounded-full border transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-2xs ${
                  isAdmin
                    ? 'bg-[#064E36] text-white border-[#064E36]'
                    : 'bg-stone-50 text-[#14532D] border-stone-200 hover:bg-stone-100 hover:text-stone-900'
                }`}
                title="सुरक्षित Admin Login"
              >
                <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D97706]" />
                <span className="hidden sm:inline">Admin Login</span>
                <span className="sm:hidden">Admin</span>
              </button>

              {/* Apply for Support Button (Shown on tablet, laptop, desktop) */}
              <button
                onClick={() => handleNavClick('apply')}
                className="hidden sm:flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-white bg-[#064E36] hover:bg-[#043323] rounded-full transition-all shadow-sm hover:shadow-md cursor-pointer whitespace-nowrap shrink-0 active:scale-[0.98]"
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

        {/* 3. Dedicated Horizontal Navigation Ribbon (Tier 2: On Laptop & Desktop) */}
        {/* Separating into Tier 2 guarantees the Logo and Menu Bar NEVER overlap on any screen */}
        <div className="hidden lg:block bg-[#064E36] text-white border-t border-emerald-900/60 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <nav className="flex items-center gap-1 xl:gap-2 py-1.5">
              {navLinks.map((link) => {
                const isActive = currentView === link.id && !isAdmin;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-bold tracking-tight transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-[#0B6643] text-white shadow-2xs border-b-2 border-amber-400'
                        : 'text-emerald-100/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Tagline in Desktop Navigation Ribbon */}
            <div className="hidden xl:flex items-center gap-1.5 text-[11px] font-bold text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Technology · Capacity Building · MIS · Social Impact</span>
            </div>
          </div>
        </div>

        {/* 4. Mobile & Tablet Dropdown Drawer (Spacious, Clean, No Horizontal Overflow) */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-stone-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-150">
            {/* Primary Action Button */}
            <button
              onClick={() => handleNavClick('apply')}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-white bg-[#064E36] hover:bg-[#043323] rounded-2xl shadow-sm cursor-pointer transition-colors"
            >
              <span>Apply for Support</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>

            {/* Nav Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                    currentView === link.id && !isAdmin
                      ? 'bg-emerald-50 text-[#064E36] font-black border-l-4 border-[#064E36]'
                      : 'text-stone-800 hover:bg-stone-50 font-bold'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Mobile Contact & Admin Footer */}
            <div className="pt-3 border-t border-stone-100 flex flex-col gap-2 text-xs text-stone-600">
              <div className="flex items-center justify-between text-stone-700 font-semibold px-1">
                <span>Helpline:</span>
                <a href="tel:+918999469974" className="text-[#064E36] font-bold">+91 8999469974</a>
              </div>
              <div className="flex items-center justify-between text-stone-700 font-semibold px-1">
                <span>Email:</span>
                <a href="mailto:seva.ecology@gmail.com" className="text-[#064E36] font-bold">seva.ecology@gmail.com</a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
