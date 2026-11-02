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
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 text-xs font-extrabold text-[#184E34] uppercase tracking-wider bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
                  Sustainable Ecology &amp; Village Advancement
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#C2410C] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  SEVA
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#143E29] leading-[1.14] text-balance">
                Strengthening Grassroots Organisations Through Digital Transformation
              </h1>

              {/* Tagline as requested: Technology • Digital Capacity Building • MIS • Data Management • Social Impact */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50/70 border border-emerald-200/80 text-xs sm:text-sm font-bold text-[#143E29] flex flex-wrap items-center gap-2">
                <span className="text-[#184E34] font-black uppercase text-[11px]">Core Pillars:</span>
                <span>Technology</span>
                <span className="text-amber-500">•</span>
                <span>Digital Capacity Building</span>
                <span className="text-amber-500">•</span>
                <span>MIS</span>
                <span className="text-amber-500">•</span>
                <span>Data Management</span>
                <span className="text-amber-500">•</span>
                <span>Social Impact</span>
              </div>

              <p className="text-base sm:text-lg text-[#254636] leading-[1.72] max-w-2xl font-normal">
                Technology should not be a barrier to village development. SEVA works with grassroots organisations to simplify their systems, build digital confidence, improve data management, and amplify their ground social impact.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('apply')}
                  className="px-7 py-3.5 text-base font-semibold text-white bg-[#184E34] hover:bg-[#0F3825] rounded-full transition-all shadow-sm hover:shadow-md flex items-center gap-2.5 cursor-pointer active:scale-[0.98]"
                >
                  <span>Discover Technology Support</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('about')}
                  className="px-7 py-3.5 text-base font-semibold text-[#184E34] bg-white hover:bg-stone-50 border border-stone-300 rounded-full transition-all cursor-pointer shadow-2xs"
                >
                  Read About SEVA &rarr;
                </button>
              </div>

              {/* Sub-note */}
              <div className="pt-2 flex items-center gap-2 text-xs text-[#325243]">
                <span className="font-bold text-[#184E34]">Shared Contribution Model:</span>
                <span>70% supported by SEVA · 30% grassroots contribution</span>
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
