import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  Laptop,
  Database,
  Users,
  FileSpreadsheet,
  BookOpen,
  Share2,
  Calendar,
  Layers,
  Sparkles,
  ChevronRight,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import { SevaStore } from '../services/store';
import { PencilHeroArt, PencilOfficeArt } from '../components/PencilArt';

interface HomePageProps {
  onNavigate: (view: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const impactStats = SevaStore.getImpactStats();
  const [activeTab, setActiveTab] = useState<'comparison' | 'focus'>('comparison');

  const focusAreas = [
    {
      id: 'focus-1',
      title: 'Digital Empowerment',
      desc: 'Demystifying technology for rural development workers, building digital confidence, and eliminating tech anxieties.',
      icon: Users,
    },
    {
      id: 'focus-2',
      title: 'Technology Solutions',
      desc: 'Developing affordable, lightweight websites, field data tools, and applications designed for low-connectivity environments.',
      icon: Laptop,
    },
    {
      id: 'focus-3',
      title: 'Institutional Capacity Building',
      desc: 'Equipping leadership and grassroots field coordinators with practical skills, governance tools, and long-term tech autonomy.',
      icon: Layers,
    },
    {
      id: 'focus-4',
      title: 'Data Management & MIS',
      desc: 'Replacing chaotic paper registers and scattered Excel sheets with structured, centralized beneficiary databases and monitoring systems.',
      icon: Database,
    },
    {
      id: 'focus-5',
      title: 'Knowledge & Documentation',
      desc: 'Standardizing reporting formats, creating digital archives, and publishing participatory research from community initiatives.',
      icon: BookOpen,
    },
    {
      id: 'focus-6',
      title: 'Social Impact & Visibility',
      desc: 'Helping grassroots organisations tell authentic stories, showcase audited achievements, and build credibility with stakeholders.',
      icon: Share2,
    },
  ];

  const beforeAfterList = [
    {
      before: 'Paper-based registers prone to physical damage and loss during monsoon',
      after: 'Centralised, secure digital records accessible across authorized team members',
    },
    {
      before: 'Manual beneficiary records scattered across fragmented notebooks',
      after: 'Organised beneficiary databases with unique records and verification history',
    },
    {
      before: 'Multiple conflicting Excel sheets with version mismatches on personal laptops',
      after: 'Automated dashboards with live program indicators and aggregated statistics',
    },
    {
      before: 'Repetitive, exhausting data entry taking staff away from community field visits',
      after: 'Simplified digital data collection via intuitive mobile forms with offline sync',
    },
    {
      before: 'Time-consuming reporting taking up to two weeks to compile for donors',
      after: 'Faster 1-click standardized report generation for CSR partners and trustees',
    },
    {
      before: 'Limited project monitoring and difficulty verifying distant village interventions',
      after: 'Real-time project monitoring with geographic activity mapping where appropriate',
    },
    {
      before: 'Difficulty tracking field activities and comparing planned vs. actual outputs',
      after: 'Improved decision-making supported by reliable, auditable community evidence',
    },
    {
      before: 'Limited organisational visibility, no professional website, and low credibility',
      after: 'Better institutional communication, transparent online profile, and verified impact',
    },
  ];

  return (
    <div className="space-y-20 lg:space-y-28 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-10 lg:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              {/* Main Headline (Bold, high contrast, responsive) */}
              <h1
                className="text-2xl sm:text-3xl lg:text-5xl font-black tracking-tight leading-[1.22]"
                style={{ color: '#064E36', fontFamily: "'Outfit', sans-serif" }}
              >
                Strengthening Grassroots Organisations Through Digital Transformation
              </h1>

              {/* Subtitle Badge */}
              <div>
                <div
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-xs"
                  style={{
                    backgroundColor: '#ECFDF5',
                    border: '1.5px solid #059669',
                    color: '#064E36',
                  }}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: '#064E36' }}
                  />
                  <span>
                    An Initiative of{' '}
                    <a
                      href="https://www.sarathisanstha.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-[#0B6643] font-black"
                    >
                      Sarathi Sanstha
                    </a>
                  </span>
                </div>
              </div>

              {/* Core Pillars: Structured Icon Cards with Guaranteed High-Contrast Colors */}
              <div className="space-y-2 pt-1 pb-1">
                <div
                  className="text-[11.5px] uppercase tracking-wider font-extrabold flex items-center gap-2"
                  style={{ color: '#064E36' }}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: '#059669' }}
                  />
                  <span>CORE PROGRAMME PILLARS</span>
                </div>

                <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-stretch gap-2 sm:gap-2.5">
                  {/* Pillar 1: Technology */}
                  <div
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs"
                    style={{
                      backgroundColor: '#EFF6FF',
                      border: '1.5px solid #93C5FD',
                      color: '#1E3A8A',
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                      style={{ backgroundColor: '#DBEAFE', color: '#1D4ED8' }}
                    >
                      <Laptop className="w-3.5 h-3.5" />
                    </div>
                    <span>Technology</span>
                  </div>

                  {/* Pillar 2: Capacity Building */}
                  <div
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs"
                    style={{
                      backgroundColor: '#ECFDF5',
                      border: '1.5px solid #6EE7B7',
                      color: '#064E36',
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                      style={{ backgroundColor: '#D1FAE5', color: '#047857' }}
                    >
                      <Users className="w-3.5 h-3.5" />
                    </div>
                    <span>Capacity Building</span>
                  </div>

                  {/* Pillar 3: MIS & Systems */}
                  <div
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs"
                    style={{
                      backgroundColor: '#FFFBEB',
                      border: '1.5px solid #FCD34D',
                      color: '#78350F',
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                      style={{ backgroundColor: '#FEF3C7', color: '#B45309' }}
                    >
                      <Database className="w-3.5 h-3.5" />
                    </div>
                    <span>MIS &amp; Systems</span>
                  </div>

                  {/* Pillar 4: Data Management */}
                  <div
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs"
                    style={{
                      backgroundColor: '#EEF2FF',
                      border: '1.5px solid #A5B4FC',
                      color: '#312E81',
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                      style={{ backgroundColor: '#E0E7FF', color: '#4338CA' }}
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5" />
                    </div>
                    <span>Data Management</span>
                  </div>

                  {/* Pillar 5: Social Impact (spans 2 cols on mobile) */}
                  <div
                    className="col-span-2 sm:col-span-1 flex items-center justify-center sm:justify-start gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs"
                    style={{
                      backgroundColor: '#F0FDF4',
                      border: '1.5px solid #86EFAC',
                      color: '#14532D',
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                      style={{ backgroundColor: '#DCFCE7', color: '#15803D' }}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <span>Ground Social Impact</span>
                  </div>
                </div>
              </div>

              {/* Main Description */}
              <p
                className="text-sm sm:text-base lg:text-lg leading-relaxed font-normal"
                style={{ color: '#374151' }}
              >
                Technology should not be a barrier to village development. SEVA, an initiative of Sarathi Sanstha, works with grassroots organisations to simplify their systems, build digital confidence, improve data management, and amplify their ground social impact.
              </p>

              {/* Sarathi Sanstha Mission Statement Banner */}
              <div
                className="text-xs sm:text-sm leading-relaxed p-3.5 rounded-xl shadow-xs"
                style={{
                  backgroundColor: '#F0FDF4',
                  borderLeft: '4px solid #064E36',
                  borderTop: '1px solid #BBF7D0',
                  borderRight: '1px solid #BBF7D0',
                  borderBottom: '1px solid #BBF7D0',
                  color: '#064E36',
                  fontWeight: 600,
                }}
              >
                Sarathi Sanstha works with the objective of sustaining the livelihoods of tribal women and farmers, and also works on the issues of environment, education, and self-governance.
              </div>

              {/* Responsive CTAs: Full-width on mobile, auto on desktop */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('apply')}
                  className="w-full sm:w-auto px-7 py-3.5 text-sm sm:text-base font-extrabold text-white rounded-full transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98]"
                  style={{
                    backgroundColor: '#064E36',
                    boxShadow: '0 4px 14px rgba(6, 78, 54, 0.35)',
                    border: '1px solid #043E2B',
                  }}
                >
                  <span>Discover Technology Support</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>

                <button
                  onClick={() => onNavigate('about')}
                  className="w-full sm:w-auto px-7 py-3.5 text-sm sm:text-base font-bold rounded-full transition-all cursor-pointer text-center"
                  style={{
                    backgroundColor: '#FFFFFF',
                    color: '#064E36',
                    border: '2px solid #064E36',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  Read About SEVA &rarr;
                </button>
              </div>

              {/* Shared Contribution Model Banner */}
              <div
                className="p-3.5 sm:p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm shadow-xs"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #059669',
                }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: '#ECFDF5', color: '#059669' }}
                  >
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="font-extrabold" style={{ color: '#064E36' }}>
                    Shared Contribution Model:
                  </span>
                </div>
                <span className="font-bold pl-8 sm:pl-0" style={{ color: '#064E36' }}>
                  70% supported by SEVA · 30% grassroots contribution
                </span>
              </div>
            </div>

            {/* Right Media: Attractive High-Impact Illustration */}
            <div className="lg:col-span-5">
              <PencilHeroArt
                className="h-[380px] sm:h-[440px] lg:h-[480px]"
                caption="ग्रामीण महिला डिजिटल सक्षमीकरण (Lush Village Digital Collaboration)"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTRODUCTION SECTION */}
      <section className="bg-white py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs font-bold tracking-widest text-[#184E34] uppercase">
              Grassroots Foundations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#143E29]">
              Strong Communities Need Strong Organisations
            </h2>
            <div className="w-12 h-0.5 bg-[#184E34] mx-auto my-3" />
            <p className="text-[#254636] text-base sm:text-lg leading-[1.7] text-balance">
              Thousands of grassroots organisations across India are working tirelessly to improve lives, strengthen communities and address critical development challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-sm text-[#254636] leading-relaxed">
            <div className="p-6 rounded-2xl bg-[#F7FAF8] border border-stone-200/90 space-y-3">
              <h3 className="font-bold text-[#143E29] text-base">The Paperwork Burden</h3>
              <p className="leading-[1.65]">
                Many organisations continue to work with limited digital infrastructure, manual records and fragmented information systems. Staff spend weeks compiling reports instead of working with communities.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#F7FAF8] border border-stone-200/90 space-y-3">
              <h3 className="font-bold text-[#143E29] text-base">The Digital Divide</h3>
              <p className="leading-[1.65]">
                Grassroots NGOs often face high costs, complex commercial software, and vendors who do not understand rural field realities or local languages like Marathi and Hindi.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#F7FAF8] border border-stone-200/90 space-y-3">
              <h3 className="font-bold text-[#143E29] text-base">SEVA's Mission</h3>
              <p className="leading-[1.65]">
                We bridge this gap through practical, need-based technology solutions, institutional strengthening, and 70-30 cost-sharing to foster genuine long-term ownership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR FOCUS AREAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-widest text-[#184E34] uppercase">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#143E29]">
              Our Focus Areas
            </h2>
            <p className="text-[#254636] text-sm sm:text-base max-w-xl font-normal leading-[1.6]">
              Practical pillars designed specifically for grassroots societies, trusts, and rural community-based organisations.
            </p>
          </div>
          <button
            onClick={() => onNavigate('programme')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#184E34] hover:text-[#0F3825] transition-colors cursor-pointer"
          >
            <span>Explore All 6 Support Areas</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {focusAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <div
                key={area.id}
                className="bg-white p-7 rounded-2xl border border-stone-200/90 hover:border-emerald-300 hover:shadow-md transition-all duration-300 space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#184E34] flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-mono font-medium text-emerald-800/60">
                    0{index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-[#143E29] tracking-tight">
                    {area.title}
                  </h3>
                  <p className="text-[#254636] text-sm leading-[1.65]">
                    {area.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. DIGITAL TRANSFORMATION: BEFORE & AFTER COMPARISON */}
      <section className="bg-stone-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
            <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">
              Systemic Transition
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              From Manual Processes to Smarter Organisations
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              How practical digital systems transform everyday operations, reduce paperwork, and empower field workers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* BEFORE */}
            <div className="bg-stone-800/80 rounded-2xl p-6 sm:p-8 border border-red-900/30 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-stone-700">
                <div className="w-8 h-8 rounded-full bg-red-950/80 border border-red-700/50 flex items-center justify-center text-red-400 font-bold text-sm">
                  ✕
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-100">Before Digital Transformation</h3>
                  <p className="text-xs text-stone-400">Traditional manual &amp; fragmented systems</p>
                </div>
              </div>

              <div className="space-y-4">
                {beforeAfterList.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-stone-300">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item.before}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AFTER */}
            <div className="bg-[#0F3825]/90 rounded-2xl p-6 sm:p-8 border border-emerald-600/40 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-emerald-800">
                <div className="w-8 h-8 rounded-full bg-emerald-900/90 border border-emerald-400/50 flex items-center justify-center text-emerald-300 font-bold text-sm">
                  ✓
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">After Digital Transformation</h3>
                  <p className="text-xs text-emerald-200">With SEVA's practical, need-based technology support</p>
                </div>
              </div>

              <div className="space-y-4">
                {beforeAfterList.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-emerald-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item.after}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. OUR IMPACT & EDITABLE COUNTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <span className="text-xs font-bold tracking-widest text-[#184E34] uppercase">
            Two Years of Dedicated Field Work
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#143E29]">
            Building Stronger Grassroots Institutions
          </h2>
          <div className="w-12 h-0.5 bg-[#184E34] mx-auto my-2" />
          <p className="text-[#254636] text-base sm:text-lg leading-[1.7] font-normal">
            "Over the past two years, SEVA has been working with grassroots organisations to understand their challenges, strengthen their systems and make technology more accessible and practical for their everyday development work."
          </p>
        </div>

        {/* Dynamic Verified Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {impactStats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 text-center space-y-2 hover:border-emerald-300 transition-all shadow-xs"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-[#184E34] tracking-tight font-mono tabular-nums">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-stone-900">
                {stat.label}
              </div>
              <div className="text-xs text-[#3B5A4B] leading-snug">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>

        {/* Impact Sub-Card with Lightweight Pencil Cartoon Art */}
        <div className="mt-12 bg-white rounded-3xl border border-stone-200 overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-sm">
          <div className="md:col-span-5 relative h-72 md:h-auto">
            <PencilOfficeArt
              className="w-full h-full rounded-none border-none"
              caption="संस्थागत डिजिटल व्यवस्थापन (NGO MIS & Systems)"
            />
          </div>
          <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#184E34]">
              Authentic Experience
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#143E29]">
              Real Ground Understanding, Not Commercial IT Selling
            </h3>
            <p className="text-sm sm:text-base text-[#254636] leading-[1.7]">
              We never parachute complex enterprise software into a village office. Every technology intervention begins with sitting down with your animators, examining paper registers, understanding power backup and cellular realities, and training your team until they have complete confidence.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('impact')}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#184E34] hover:text-[#0F3825] transition-colors cursor-pointer"
              >
                <span>Read Verified Case Studies</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CLOSING CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#184E34] rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <p className="text-emerald-200 text-sm font-semibold uppercase tracking-widest">
              A Development Initiative for Grassroots India
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              "Technology should empower development, not complicate it."
            </h2>
            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-normal">
              Let's make grassroots organisations stronger, smarter and more effective.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('apply')}
                className="px-8 py-4 text-base font-bold text-[#0F3825] bg-white hover:bg-emerald-50 rounded-full transition-all shadow-md cursor-pointer active:scale-[0.98]"
              >
                Apply for Technology Support
              </button>
              <button
                onClick={() => onNavigate('why-digital')}
                className="px-8 py-4 text-base font-semibold text-white bg-[#0F3825]/70 hover:bg-[#0F3825] rounded-full transition-all border border-emerald-400/40 cursor-pointer"
              >
                Understand Digital Challenges
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
