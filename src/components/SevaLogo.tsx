import React from 'react';

interface SevaLogoProps {
  variant?: 'light' | 'dark'; // 'light' is for light backgrounds (Navbar), 'dark' is for dark backgrounds (Footer / Admin)
  showSubtitle?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Official SEVA Emblem Icon
 * Crafted to precisely match the user's emblem reference:
 * - Natural leaf silhouette in Deep Dark Forest Green (#064E36 / #0B6643)
 * - Innovation Sky-Blue apex dot (#0284C7)
 * - Two Grassroots Golden-Amber side dots (#F59E0B)
 * - Centered Bold White 'S' (#FFFFFF)
 * - High-contrast squircle container
 */
export const SevaEmblem: React.FC<{
  variant?: 'light' | 'dark';
  className?: string;
  size?: number;
}> = ({ variant = 'light', className = '', size = 44 }) => {
  const isDark = variant === 'dark';

  return (
    <div
      className={`shrink-0 flex items-center justify-center rounded-2xl transition-transform duration-200 group-hover:scale-105 ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: isDark ? '#053B29' : '#FFFFFF',
        border: isDark ? '2px solid #10B981' : '2px solid #064E36',
        boxShadow: isDark
          ? '0 2px 10px rgba(0, 0, 0, 0.4)'
          : '0 2px 8px rgba(6, 78, 54, 0.18)',
        padding: '3px',
      }}
      title="SEVA – Sustainable Ecology & Village Advancement"
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          <linearGradient id="sevaLeafGrad" x1="12" y1="5" x2="36" y2="43" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0B6643" />
            <stop offset="50%" stopColor="#064E36" />
            <stop offset="100%" stopColor="#042F21" />
          </linearGradient>
        </defs>

        {/* 1. Deep Dark Forest Green Leaf Silhouette */}
        <path
          d="M24 5 C15 10 9 20 13 34 C16 43 32 43 35 34 C39 20 33 10 24 5 Z"
          fill="url(#sevaLeafGrad)"
        />

        {/* 2. Inner Leaf Contour Highlight for Rich Organic Depth */}
        <path
          d="M24 7.5 C17 12 12.5 21 15 32 C17.5 38.5 29.5 38.5 32 32 C34.5 21 31 12 24 7.5 Z"
          fill="#0B6643"
          opacity="0.75"
        />

        {/* 3. Innovation Sky-Blue Dot at Apex */}
        <circle cx="24" cy="11.5" r="2.4" fill="#0284C7" stroke="#FFFFFF" strokeWidth="0.6" />

        {/* 4. Left Grassroots Golden Amber Dot */}
        <circle cx="11.5" cy="24.5" r="2.5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="0.6" />

        {/* 5. Right Grassroots Golden Amber Dot */}
        <circle cx="36.5" cy="24.5" r="2.5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="0.6" />

        {/* 6. Pure White Bold Distinctive 'S' in Center */}
        <text
          x="24"
          y="32.5"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="21"
          fontWeight="900"
          fontFamily="'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          style={{ letterSpacing: '-0.5px' }}
        >
          S
        </text>
      </svg>
    </div>
  );
};

export const SevaLogo: React.FC<SevaLogoProps> = ({
  variant = 'light',
  showSubtitle = true,
  className = '',
  size = 'md',
}) => {
  const isDark = variant === 'dark';
  const iconPx = size === 'sm' ? 36 : size === 'lg' ? 52 : 44;

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3.5 ${className}`}>
      {/* Official Emblem Badge */}
      <SevaEmblem variant={variant} size={iconPx} />

      {/* Brand Typography */}
      <div className="flex flex-col justify-center select-none">
        <span
          className={`font-black tracking-tight leading-none block ${
            isDark ? 'text-white' : 'text-[#064E36]'
          } ${size === 'sm' ? 'text-xl' : size === 'lg' ? 'text-3xl' : 'text-2xl sm:text-[26px]'}`}
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          SEVA
        </span>

        {showSubtitle && (
          <div className="mt-0.5 space-y-0.5">
            {/* Extended title for desktop */}
            <span
              className={`hidden sm:block text-[10.5px] font-extrabold tracking-tight uppercase leading-tight ${
                isDark ? 'text-emerald-300' : 'text-[#0B6643]'
              }`}
            >
              Sustainable Ecology &amp; Village Advancement
            </span>

            {/* Core Parent Sanstha subtitle (always visible, rich contrast) */}
            <span
              className={`block text-[11px] sm:text-[11.5px] font-bold tracking-normal leading-tight ${
                isDark ? 'text-emerald-200' : 'text-[#064E36]'
              }`}
            >
              An Initiative of Sarathi Sanstha
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
