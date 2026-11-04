import React from 'react';

interface SevaLogoProps {
  variant?: 'light' | 'dark'; // 'light' is for light backgrounds (Navbar), 'dark' is for dark backgrounds (Footer / Admin)
  showSubtitle?: boolean;
  className?: string;
}

export const SevaLogo: React.FC<SevaLogoProps> = ({
  variant = 'light',
  showSubtitle = true,
  className = '',
}) => {
  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3.5 ${className}`}>
      {/* Official Emblem Badge with Dark Forest Green Leaf & Distinctive Accents */}
      <div
        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl p-1 flex items-center justify-center shrink-0 border shadow-xs transition-transform group-hover:scale-105 ${
          isDark
            ? 'bg-[#0B3D28] border-emerald-500/40'
            : 'bg-[#F0FDF4] border-[#064E36]/30'
        }`}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 sm:w-9 sm:h-9"
        >
          {/* Rich Dark Forest Green Leaf Silhouette */}
          <path
            d="M24 5 C16 10 10 21 14 35 C17 44 31 44 34 35 C38 21 32 10 24 5 Z"
            fill="#064E36"
          />
          {/* Inner Depth Gradient Overlay */}
          <path
            d="M24 7 C18 12 13 21 16 33 C18 40 30 40 32 33 C35 21 30 12 24 7 Z"
            fill="#0B6643"
            opacity="0.85"
          />
          {/* Innovation Blue Dot at Apex */}
          <circle cx="24" cy="11" r="2.2" fill="#0284C7" />
          {/* Left Grassroots Golden Amber Dot */}
          <circle cx="11.5" cy="24.5" r="2.4" fill="#F59E0B" />
          {/* Right Grassroots Golden Amber Dot */}
          <circle cx="36.5" cy="24.5" r="2.4" fill="#F59E0B" />
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

      {/* Brand Typography */}
      <div className="space-y-0.5">
        <span
          className={`text-2xl sm:text-3xl font-black tracking-tight leading-none block ${
            isDark ? 'text-white' : 'text-[#064E36]'
          }`}
        >
          SEVA
        </span>
        {showSubtitle && (
          <>
            <span
              className={`hidden sm:block text-[11px] font-extrabold tracking-tight uppercase leading-tight ${
                isDark ? 'text-emerald-300' : 'text-[#0B6643]'
              }`}
            >
              Sustainable Ecology &amp; Village Advancement
            </span>
            <span
              className={`block text-[10.5px] sm:text-[11.5px] font-bold tracking-normal leading-tight ${
                isDark ? 'text-emerald-200/90' : 'text-[#14532D]'
              }`}
            >
              An Initiative of Sarathi Sanstha
            </span>
          </>
        )}
      </div>
    </div>
  );
};
