import React from 'react';
import { Home, Laptop, Sparkles, Phone, ArrowRight, Menu } from 'lucide-react';

interface MobileBottomNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenMenu: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  onNavigate,
  onOpenMenu,
}) => {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/98 backdrop-blur-md border-t border-stone-200 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 items-center justify-items-center h-15 px-2">
        {/* 1. Home */}
        <button
          type="button"
          onClick={() => {
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center w-full h-full text-[10.5px] font-bold cursor-pointer transition-colors active:scale-95 ${
            currentView === 'home' ? 'text-[#064E36] font-extrabold' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Home className={`w-5 h-5 mb-0.5 ${currentView === 'home' ? 'text-[#064E36]' : 'text-stone-400'}`} />
          <span>Home</span>
          {currentView === 'home' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#064E36] -mb-1 mt-0.5" />
          )}
        </button>

        {/* 2. Program / Tech Support */}
        <button
          type="button"
          onClick={() => {
            onNavigate('programme');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center w-full h-full text-[10.5px] font-bold cursor-pointer transition-colors active:scale-95 ${
            currentView === 'programme' ? 'text-[#064E36] font-extrabold' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Laptop className={`w-5 h-5 mb-0.5 ${currentView === 'programme' ? 'text-[#064E36]' : 'text-stone-400'}`} />
          <span>Program</span>
          {currentView === 'programme' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#064E36] -mb-1 mt-0.5" />
          )}
        </button>

        {/* 3. Central Highlighted "Apply" CTA */}
        <button
          type="button"
          onClick={() => {
            onNavigate('apply');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-center justify-center -mt-3.5 group cursor-pointer active:scale-90 transition-transform"
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white"
            style={{
              backgroundColor: '#064E36',
              boxShadow: '0 4px 14px rgba(6, 78, 54, 0.45)',
            }}
          >
            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <span className="text-[10px] font-black text-[#064E36] mt-0.5 tracking-tight">Apply</span>
        </button>

        {/* 4. Our Impact */}
        <button
          type="button"
          onClick={() => {
            onNavigate('impact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center w-full h-full text-[10.5px] font-bold cursor-pointer transition-colors active:scale-95 ${
            currentView === 'impact' ? 'text-[#064E36] font-extrabold' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Sparkles className={`w-5 h-5 mb-0.5 ${currentView === 'impact' ? 'text-[#064E36]' : 'text-stone-400'}`} />
          <span>Impact</span>
          {currentView === 'impact' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#064E36] -mb-1 mt-0.5" />
          )}
        </button>

        {/* 5. Menu / All Pages Drawer Toggle */}
        <button
          type="button"
          onClick={onOpenMenu}
          className="flex flex-col items-center justify-center w-full h-full text-[10.5px] font-bold text-stone-600 hover:text-[#064E36] cursor-pointer transition-colors active:scale-95"
        >
          <Menu className="w-5 h-5 mb-0.5 text-stone-500" />
          <span>Menu</span>
        </button>
      </div>
    </nav>
  );
};
