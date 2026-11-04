import React from 'react';

// High-impact, attractive, lightweight SVG vector illustrations (0ms load, ~3KB payload)
// Crafted specifically for Sustainable Ecology & Village Advancement (SEVA)
// Blending lush rural village landscapes, ecology, and modern digital technology

interface ArtProps {
  className?: string;
  caption?: string;
}

/**
 * 1. PencilHeroArt / VibrantHeroArt:
 * Attractive, vibrant rural digital empowerment illustration.
 * Features rolling green hills, golden sunrise, majestic village tree, solar panel,
 * rural coordinators collaborating with glowing digital tablets and live MIS data badges.
 */
export const PencilHeroArt: React.FC<ArtProps> = ({ className = '', caption }) => {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#E8F5E9] via-[#F1F8E9] to-[#FFFBEB] border-2 border-emerald-600/30 shadow-xl ${className}`}>
      <svg
        viewBox="0 0 600 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover select-none"
        aria-label="Vibrant illustration of rural coordinators using digital tablets in a lush village setting"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="40%" stopColor="#D1FAE5" />
            <stop offset="100%" stopColor="#E0F2FE" />
          </linearGradient>

          <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>

          <linearGradient id="hillFar" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#86EFAC" />
            <stop offset="100%" stopColor="#4ADE80" />
          </linearGradient>

          <linearGradient id="hillMid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#15803D" />
          </linearGradient>

          <linearGradient id="hillFront" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#16A34A" />
            <stop offset="100%" stopColor="#14532D" />
          </linearGradient>

          <linearGradient id="terraceField" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          <linearGradient id="screenGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>

          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#064E36" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Sky Background */}
        <rect width="600" height="460" fill="url(#skyGrad)" />

        {/* Golden Sun & Radiant Rings */}
        <circle cx="470" cy="110" r="70" fill="url(#sunGrad)" opacity="0.85" filter="url(#softGlow)" />
        <circle cx="470" cy="110" r="100" stroke="#FDE68A" strokeWidth="2" strokeDasharray="6 6" opacity="0.5" />
        <circle cx="470" cy="110" r="130" stroke="#FDE68A" strokeWidth="1.5" strokeDasharray="4 8" opacity="0.3" />

        {/* Birds flying */}
        <path d="M420 70 Q 426 64 432 70 Q 438 64 444 70" stroke="#065F46" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M380 95 Q 385 90 390 95 Q 395 90 400 95" stroke="#065F46" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M405 120 Q 409 116 413 120 Q 417 116 421 120" stroke="#065F46" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* Distant Mountain Range */}
        <path d="M0 260 Q 90 200 180 240 T 360 210 T 540 230 L 600 240 L 600 460 L 0 460 Z" fill="url(#hillFar)" opacity="0.7" />

        {/* Midground Terraced Village Hills & Fields */}
        <path d="M0 310 Q 150 250 300 290 T 600 270 L 600 460 L 0 460 Z" fill="url(#hillMid)" />

        {/* Terraced Agricultural Curves */}
        <path d="M40 330 Q 140 310 240 335" stroke="#FEF08A" strokeWidth="3" fill="none" opacity="0.7" />
        <path d="M220 345 Q 320 325 420 345" stroke="#FDE047" strokeWidth="2.5" fill="none" opacity="0.7" />

        {/* Foreground Lush Ground */}
        <path d="M0 370 Q 180 330 360 360 T 600 340 L 600 460 L 0 460 Z" fill="url(#hillFront)" />

        {/* Village Houses & Clean Solar Roof in Background */}
        <g transform="translate(370, 260)">
          {/* House 1 */}
          <polygon points="20,40 50,20 80,40" fill="#EA580C" />
          <rect x="25" y="40" width="50" height="35" fill="#FEF3C7" stroke="#92400E" strokeWidth="1.5" />
          <rect x="42" y="55" width="16" height="20" fill="#92400E" />
          {/* Solar Panel on Rooftop */}
          <polygon points="50,20 80,40 70,44 42,24" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.5" />
          <line x1="56" y1="26" x2="72" y2="38" stroke="#E0F2FE" strokeWidth="1" />

          {/* Small Temple / Community Hall */}
          <polygon points="90,35 110,12 130,35" fill="#D97706" />
          <rect x="95" y="35" width="30" height="40" fill="#FFFBEB" stroke="#B45309" strokeWidth="1.5" />
          <circle cx="110" cy="10" r="3" fill="#DC2626" />
        </g>

        {/* Majestic Banyan / Neem Tree with Dense Foliage */}
        <g transform="translate(40, 90)">
          {/* Tree Trunk with Rich Bark Texture */}
          <path d="M90 310 Q 75 190 100 130 Q 110 90 135 70" stroke="#78350F" strokeWidth="18" strokeLinecap="round" fill="none" />
          <path d="M85 240 Q 50 200 40 180" stroke="#78350F" strokeWidth="10" strokeLinecap="round" fill="none" />
          <path d="M95 180 Q 135 150 170 140" stroke="#78350F" strokeWidth="11" strokeLinecap="round" fill="none" />
          <path d="M78 300 Q 55 315 35 320" stroke="#78350F" strokeWidth="6" strokeLinecap="round" fill="none" />

          {/* Lush Green Canopy Clouds */}
          <circle cx="70" cy="70" r="55" fill="#15803D" />
          <circle cx="130" cy="50" r="65" fill="#16A34A" />
          <circle cx="190" cy="75" r="55" fill="#22C55E" />
          <circle cx="110" cy="100" r="60" fill="#15803D" />
          <circle cx="50" cy="120" r="50" fill="#166534" />
          <circle cx="160" cy="115" r="50" fill="#4ADE80" opacity="0.9" />

          {/* Highlights on Leaves */}
          <circle cx="130" cy="35" r="25" fill="#86EFAC" opacity="0.6" />
          <circle cx="180" cy="60" r="20" fill="#BBF7D0" opacity="0.7" />
        </g>

        {/* Character 1: Grassroots Coordinator (Standing proudly with glowing digital tablet) */}
        <g transform="translate(195, 170)">
          {/* Shadow */}
          <ellipse cx="65" cy="235" rx="42" ry="10" fill="#064E36" opacity="0.35" />

          {/* Saree & Torso */}
          <path d="M42 90 L 25 230 L 105 230 L 88 90 Z" fill="#047857" stroke="#064E36" strokeWidth="2.5" />
          <path d="M42 90 Q 75 140 100 160" stroke="#F59E0B" strokeWidth="5" fill="none" /> {/* Rich Saree Pallu */}
          <path d="M30 190 Q 65 195 100 190" stroke="#F59E0B" strokeWidth="3" fill="none" opacity="0.8" />

          {/* Head & Face */}
          <circle cx="65" cy="55" r="26" fill="#FDE68A" stroke="#78350F" strokeWidth="2" />
          {/* Hair in tidy bun */}
          <path d="M40 50 Q 65 24 90 48 Q 98 62 90 74 L 40 65 Z" fill="#1F2937" />
          <circle cx="92" cy="58" r="11" fill="#1F2937" />
          <circle cx="92" cy="58" r="4" fill="#F59E0B" /> {/* Hair flower */}
          {/* Facial features */}
          <circle cx="68" cy="54" r="3" fill="#DC2626" /> {/* Bindi */}
          <path d="M58 64 Q 66 70 74 64" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" fill="none" /> {/* Smile */}

          {/* Arms holding tablet */}
          <path d="M45 105 Q 70 120 95 110" stroke="#FDE68A" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M75 110 L 98 118" stroke="#FDE68A" strokeWidth="7" strokeLinecap="round" />

          {/* Modern Digital Tablet (High-Tech, Vivid Screen) */}
          <rect x="90" y="85" width="58" height="78" rx="8" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" filter="url(#badgeShadow)" />
          <rect x="94" y="89" width="50" height="70" rx="6" fill="#022C22" />
          {/* Tablet Screen UI */}
          <rect x="98" y="94" width="42" height="12" rx="3" fill="#059669" />
          <text x="101" y="103" fill="#FFFFFF" fontSize="7" fontWeight="bold" fontFamily="sans-serif">SEVA MIS</text>
          {/* Bar Chart on Tablet */}
          <rect x="100" y="118" width="6" height="24" rx="2" fill="#34D399" />
          <rect x="110" y="112" width="6" height="30" rx="2" fill="#38BDF8" />
          <rect x="120" y="122" width="6" height="20" rx="2" fill="#FBBF24" />
          <rect x="130" y="115" width="6" height="27" rx="2" fill="#A78BFA" />
          {/* Checkmark icon on tablet */}
          <circle cx="134" cy="99" r="3" fill="#22C55E" />
        </g>

        {/* Character 2: Rural Animator / Field Mobilizer (Youth with laptop & notebook) */}
        <g transform="translate(345, 195)">
          {/* Shadow */}
          <ellipse cx="60" cy="215" rx="40" ry="10" fill="#064E36" opacity="0.35" />

          {/* Wooden Bench */}
          <rect x="0" y="145" width="115" height="12" rx="3" fill="#92400E" stroke="#78350F" strokeWidth="2" />
          <rect x="15" y="157" width="8" height="55" fill="#78350F" />
          <rect x="95" y="157" width="8" height="55" fill="#78350F" />

          {/* Clothes */}
          <path d="M40 85 L 25 155 L 85 155 L 75 85 Z" fill="#D97706" stroke="#B45309" strokeWidth="2" />
          <path d="M28 155 L 20 215 L 42 215 L 48 155 Z" fill="#1E3A8A" />
          <path d="M60 155 L 56 215 L 78 215 L 82 155 Z" fill="#1E3A8A" />

          {/* Head & Hair */}
          <circle cx="58" cy="50" r="24" fill="#FDE68A" stroke="#78350F" strokeWidth="2" />
          <path d="M38 45 Q 58 22 78 40 Q 82 55 76 60 L 38 52 Z" fill="#1F2937" />
          {/* Smile */}
          <path d="M52 58 Q 58 64 64 58" stroke="#78350F" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Laptop on Lap */}
          <polygon points="35,125 80,125 88,142 27,142" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
          <rect x="35" y="92" width="45" height="33" rx="4" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
          <rect x="38" y="95" width="39" height="27" rx="2" fill="#0369A1" />
          <line x1="42" y1="102" x2="68" y2="102" stroke="#BAE6FD" strokeWidth="2" strokeLinecap="round" />
          <line x1="42" y1="108" x2="62" y2="108" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
          <line x1="42" y1="114" x2="72" y2="114" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Dynamic Digital Metrics Badges Floating in Foreground */}
        {/* Badge 1: 100% Offline MIS */}
        <g transform="translate(25, 380)" filter="url(#badgeShadow)">
          <rect width="175" height="42" rx="21" fill="#FFFFFF" stroke="#059669" strokeWidth="2" />
          <circle cx="22" cy="21" r="13" fill="#10B981" />
          <path d="M16 21 L 20 25 L 28 17" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="44" y="19" fill="#064E36" fontSize="11" fontWeight="800" fontFamily="sans-serif">
            100% ऑफलाइन MIS
          </text>
          <text x="44" y="32" fill="#047857" fontSize="9" fontWeight="600" fontFamily="sans-serif">
            Zero Network Field Sync
          </text>
        </g>

        {/* Badge 2: 70-30 Cost-Sharing */}
        <g transform="translate(420, 375)" filter="url(#badgeShadow)">
          <rect width="160" height="45" rx="22" fill="#FFFFFF" stroke="#D97706" strokeWidth="2" />
          <circle cx="23" cy="22.5" r="14" fill="#F59E0B" />
          <text x="14" y="27" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="sans-serif">₹</text>
          <text x="45" y="19" fill="#78350F" fontSize="11" fontWeight="800" fontFamily="sans-serif">
            70:30 सहकार्य मॉडेल
          </text>
          <text x="45" y="33" fill="#B45309" fontSize="9" fontWeight="600" fontFamily="sans-serif">
            Dignified Cost Sharing
          </text>
        </g>
      </svg>

      {caption && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#064E36]/90 backdrop-blur-sm text-white text-[11px] font-bold py-1 px-4 rounded-full border border-emerald-400/40 shadow-sm whitespace-nowrap">
          {caption}
        </div>
      )}
    </div>
  );
};

/**
 * 2. PencilOfficeArt / VibrantOfficeArt:
 * Attractive modern grassroots NGO office setup with widescreen MIS dashboard,
 * GIS village boundary maps, tablet synchronization, and green plants.
 */
export const PencilOfficeArt: React.FC<ArtProps> = ({ className = '', caption }) => {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#F0FDF4] via-[#F8FAFC] to-[#ECFDF5] border-2 border-emerald-600/30 shadow-xl ${className}`}>
      <svg
        viewBox="0 0 600 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover select-none"
        aria-label="Vibrant illustration of a modern grassroots NGO digital command office"
      >
        <defs>
          <linearGradient id="officeBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ECFDF5" />
            <stop offset="60%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#FEF3C7" />
          </linearGradient>

          <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          <filter id="screenShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#064E36" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* Ambient Room Background */}
        <rect width="600" height="460" fill="url(#officeBg)" />

        {/* Big Sunny Village Window looking out to green farms */}
        <g transform="translate(60, 40)">
          <rect width="180" height="150" rx="12" fill="#E0F2FE" stroke="#64748B" strokeWidth="4" />
          <path d="M0 110 Q 50 80 100 95 T 180 85 L 180 150 L 0 150 Z" fill="#86EFAC" />
          <circle cx="140" cy="50" r="22" fill="#FDE047" />
          {/* Window Panes */}
          <line x1="90" y1="0" x2="90" y2="150" stroke="#64748B" strokeWidth="3" />
          <line x1="0" y1="75" x2="180" y2="75" stroke="#64748B" strokeWidth="3" />
        </g>

        {/* Institutional Noticeboard with Village MIS Pinboards */}
        <g transform="translate(360, 45)">
          <rect width="180" height="120" rx="8" fill="#FDE68A" stroke="#B45309" strokeWidth="3" />
          <text x="15" y="24" fill="#78350F" fontSize="10" fontWeight="bold">ग्रामपंचायत डिजिटल प्रकल्प अहवाल</text>
          {/* Pinned note 1 */}
          <rect x="15" y="35" width="65" height="60" rx="4" fill="#FFFFFF" stroke="#CBD5E1" />
          <line x1="20" y1="48" x2="70" y2="48" stroke="#10B981" strokeWidth="3" />
          <line x1="20" y1="60" x2="60" y2="60" stroke="#3B82F6" strokeWidth="2.5" />
          <line x1="20" y1="72" x2="65" y2="72" stroke="#F59E0B" strokeWidth="2.5" />
          {/* Pinned note 2 */}
          <rect x="90" y="40" width="75" height="55" rx="4" fill="#FEF08A" stroke="#F59E0B" />
          <text x="96" y="58" fill="#92400E" fontSize="9" fontWeight="bold">७०% SEVA</text>
          <text x="96" y="74" fill="#B45309" fontSize="8">३०% लोकसहभाग</text>
        </g>

        {/* Main Solid Oak Workstation Table */}
        <g transform="translate(30, 240)">
          <rect width="540" height="24" rx="6" fill="#78350F" stroke="#451A03" strokeWidth="2" />
          {/* Table Legs */}
          <rect x="40" y="24" width="18" height="180" fill="#451A03" />
          <rect x="480" y="24" width="18" height="180" fill="#451A03" />
          <line x1="58" y1="120" x2="480" y2="120" stroke="#78350F" strokeWidth="8" />

          {/* Large Primary Desktop Monitor */}
          <g transform="translate(130, -150)" filter="url(#screenShadow)">
            {/* Monitor Stand */}
            <rect x="110" y="130" width="40" height="20" fill="#64748B" />
            <rect x="90" y="148" width="80" height="8" rx="4" fill="#475569" />
            {/* Monitor Frame */}
            <rect width="260" height="135" rx="8" fill="#0F172A" stroke="#38BDF8" strokeWidth="2.5" />
            {/* Screen Dashboard Content */}
            <rect x="6" y="6" width="248" height="123" rx="4" fill="#022C22" />
            {/* Header bar */}
            <rect x="6" y="6" width="248" height="20" fill="#064E36" />
            <text x="16" y="20" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
              SEVA Grassroots MIS • Yavatmal &amp; Amravati
            </text>
            <circle cx="240" cy="16" r="4" fill="#22C55E" />

            {/* Dashboard Tiles */}
            <rect x="14" y="34" width="68" height="40" rx="4" fill="#065F46" />
            <text x="20" y="48" fill="#A7F3D0" fontSize="8">गाव संख्या</text>
            <text x="20" y="66" fill="#FFFFFF" fontSize="14" fontWeight="bold">४२ गावे</text>

            <rect x="90" y="34" width="74" height="40" rx="4" fill="#075985" />
            <text x="96" y="48" fill="#BAE6FD" fontSize="8">लाभार्थी नोंदणी</text>
            <text x="96" y="66" fill="#FFFFFF" fontSize="14" fontWeight="bold">३,८५०+</text>

            <rect x="172" y="34" width="74" height="40" rx="4" fill="#854D0E" />
            <text x="178" y="48" fill="#FDE68A" fontSize="8">कागदपत्र बचत</text>
            <text x="178" y="66" fill="#FFFFFF" fontSize="14" fontWeight="bold">१००% डिजिटल</text>

            {/* Data Chart Lines on Screen */}
            <path d="M16 112 Q 50 85 90 98 T 160 88 T 240 82" stroke="#34D399" strokeWidth="3" fill="none" />
            <path d="M16 118 Q 60 102 110 110 T 180 100 T 240 95" stroke="#38BDF8" strokeWidth="2.5" fill="none" />
          </g>

          {/* Keyboard & Mouse on Desk */}
          <rect x="235" y="4" width="90" height="14" rx="2" fill="#E2E8F0" stroke="#94A3B8" />
          <ellipse cx="340" cy="11" rx="7" ry="5" fill="#CBD5E1" stroke="#94A3B8" />

          {/* Syncing Field Survey Tablet on Wooden Stand */}
          <g transform="translate(60, -50)">
            <rect width="50" height="65" rx="6" fill="#0F172A" stroke="#10B981" strokeWidth="2" />
            <rect x="4" y="4" width="42" height="57" rx="3" fill="#047857" />
            <circle cx="25" cy="25" r="10" fill="#10B981" />
            <path d="M21 25 L 24 28 L 29 22" stroke="#FFFFFF" strokeWidth="2" fill="none" />
            <text x="11" y="48" fill="#ECFDF5" fontSize="7" fontWeight="bold">SYNCED</text>
          </g>

          {/* Lush Indoor Green Plant in Terracotta Pot */}
          <g transform="translate(420, -55)">
            <polygon points="12,35 48,35 42,65 18,65" fill="#C2410C" stroke="#9A3412" strokeWidth="1.5" />
            <ellipse cx="30" cy="35" rx="18" ry="4" fill="#78350F" />
            {/* Large Plant Leaves */}
            <path d="M30 35 Q 10 15 5 2" stroke="#15803D" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M30 35 Q 40 10 55 5" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M30 35 Q 30 10 32 -8" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" fill="none" />
          </g>
        </g>
      </svg>

      {caption && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#064E36]/90 backdrop-blur-sm text-white text-[11px] font-bold py-1 px-4 rounded-full border border-emerald-400/40 shadow-sm whitespace-nowrap">
          {caption}
        </div>
      )}
    </div>
  );
};

/**
 * 3. PencilStoryArt / VibrantStoryArt:
 * Community watershed planting & ecological restoration artwork.
 */
export const PencilStoryArt: React.FC<ArtProps> = ({ className = '', caption }) => {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#FEF3C7] via-[#D1FAE5] to-[#ECFDF5] border-2 border-emerald-600/30 shadow-xl ${className}`}>
      <svg
        viewBox="0 0 600 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover select-none"
        aria-label="Vibrant community tree planting and ecology restoration illustration"
      >
        <rect width="600" height="460" fill="#ECFDF5" />
        <circle cx="480" cy="90" r="75" fill="#FDE047" opacity="0.8" />
        <path d="M0 320 Q 180 260 360 300 T 600 280 L 600 460 L 0 460 Z" fill="#15803D" />
        <path d="M0 365 Q 200 330 400 355 T 600 340 L 600 460 L 0 460 Z" fill="#14532D" />

        {/* Sapling & Planting Hands */}
        <g transform="translate(250, 240)">
          <path d="M50 120 Q 45 40 50 10" stroke="#78350F" strokeWidth="8" strokeLinecap="round" fill="none" />
          <ellipse cx="30" cy="15" rx="20" ry="10" fill="#22C55E" transform="rotate(-30 30 15)" />
          <ellipse cx="70" cy="20" rx="20" ry="10" fill="#16A34A" transform="rotate(30 70 20)" />
          <ellipse cx="50" cy="-5" rx="18" ry="12" fill="#4ADE80" />
        </g>
      </svg>
      {caption && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#064E36]/90 backdrop-blur-sm text-white text-[11px] font-bold py-1 px-4 rounded-full border border-emerald-400/40 shadow-sm whitespace-nowrap">
          {caption}
        </div>
      )}
    </div>
  );
};

/**
 * 4. PencilLeaderAvatar / VibrantLeaderAvatar:
 * High-definition circular avatar for verified NGO leaders in Case Studies.
 */
export const PencilLeaderAvatar: React.FC<{
  name: string;
  designation?: string;
  className?: string;
}> = ({ name, designation, className = 'w-16 h-16' }) => {
  const initials = (name || 'SC')
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div
      className={`relative rounded-full bg-gradient-to-br from-[#D1FAE5] via-[#A7F3D0] to-[#FDE68A] border-3 border-emerald-500 shadow-md ring-2 ring-emerald-600/30 flex items-center justify-center font-extrabold text-[#064E36] shrink-0 ${className}`}
      title={`${name}${designation ? ` (${designation})` : ''}`}
    >
      <span className="text-base sm:text-lg tracking-tight font-black">{initials}</span>
      <span
        className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0B6643] border-2 border-white flex items-center justify-center text-[10px] text-white font-black shadow-xs"
        title="सत्यापित संस्थाचालक (Verified Director)"
      >
        ✓
      </span>
    </div>
  );
};
