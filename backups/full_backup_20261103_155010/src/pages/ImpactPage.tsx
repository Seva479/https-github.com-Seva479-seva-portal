import React from 'react';
import {
  CheckCircle2,
  Calendar,
  MapPin,
  ArrowRight,
  Quote,
  ShieldCheck,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import { SevaStore } from '../services/store';

interface ImpactPageProps {
  onNavigate: (view: string) => void;
}

export const ImpactPage: React.FC<ImpactPageProps> = ({ onNavigate }) => {
  const caseStudies = SevaStore.getCaseStudies();
  const impactStats = SevaStore.getImpactStats();

  const coreImprovements = [
    'Substantial reduction in manual, repetitive administrative paperwork',
    'Structured, auditable beneficiary databases with zero data loss',
    'Real-time project monitoring and automated progress tracking',
    'Increased digital confidence and technical literacy among rural animators',
    'Enhanced institutional visibility and credibility with institutional donors',
    'Transparent, timely compliance reporting for CSR and statutory bodies',
  ];

  return (
    <div className="space-y-16 lg:space-y-24 py-8 pb-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold tracking-widest text-[#184E34] uppercase">
            Field Evidence
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#143E29] leading-[1.15]">
            Building Stronger Grassroots Institutions Through Technology
          </h1>
          <p className="text-lg sm:text-xl text-[#254636] leading-[1.7] font-normal">
            Over the past two years, SEVA has been working with grassroots organisations to understand their challenges, strengthen their systems and make technology more accessible and practical for their everyday development work.
          </p>
        </div>
      </section>

      {/* Verified Counters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {impactStats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/90 text-center space-y-2 shadow-xs"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-[#184E34] font-mono tabular-nums">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-stone-900">
                {stat.label}
              </div>
              <div className="text-xs text-stone-500 leading-snug">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Improvements Showcase */}
      <section className="bg-white py-14 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-2 mb-8">
            <span className="text-xs font-bold tracking-widest text-[#0B6643] uppercase">
              Transformational Outcomes
            </span>
            <h2 className="text-2xl font-bold text-[#172B24]">
              What Practical Technology Support Creates on the Ground
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreImprovements.map((imp, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-[#0B6643] shrink-0 mt-0.5" />
                <span className="text-sm text-stone-700 font-medium leading-relaxed">
                  {imp}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verified Case Studies Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3 mb-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-widest text-[#0B6643] uppercase">
              Verified Case Studies
            </span>
            <span className="text-xs bg-emerald-50 text-[#0B6643] px-2 py-0.5 rounded-full font-medium border border-emerald-100">
              Admin Managed
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#172B24]">
            Ground Realities &amp; Documented Transitions
          </h2>
          <p className="text-stone-600 text-sm max-w-2xl">
            Detailed case studies from non-profit institutions that transitioned from manual registers to structured digital workflows.
          </p>
        </div>

        <div className="space-y-8">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-xs hover:border-emerald-300 hover:shadow-md transition-all p-6 sm:p-8 space-y-6"
            >
              {/* Leader Profile Header with Round Avatar (संस्थाचालक राउंड फोटो) */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pb-5 border-b border-stone-100">
                <div className="flex items-center gap-4">
                  {/* Round Leader Photo */}
                  <div className="relative shrink-0">
                    {study.image_url && study.image_url.trim() && !study.image_url.includes('hero_') && !study.image_url.includes('training_') ? (
                      <img
                        src={study.image_url}
                        alt={study.testimonial_author || 'संस्थाचालक'}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-emerald-100 shadow-md ring-2 ring-[#184E34]/20 bg-emerald-50"
                      />
                    ) : (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-emerald-100 to-amber-100 border-4 border-emerald-100 shadow-md ring-2 ring-[#184E34]/20 flex items-center justify-center font-extrabold text-xl text-[#143E29]">
                        {(study.testimonial_author || study.organisation_name || 'SC')
                          .split(' ')
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join('')
                          .toUpperCase()}
                      </div>
                    )}
                    <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#184E34] border-2 border-white flex items-center justify-center text-[10px] text-white font-bold" title="सत्यापित संस्थाचालक">
                      ✓
                    </span>
                  </div>

                  {/* Leader and Org Info */}
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#143E29]">
                        {study.organisation_name}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#184E34] text-xs font-bold border border-emerald-200/80">
                        {study.district}, {study.state}
                      </span>
                    </div>

                    <div className="text-xs sm:text-sm text-[#254636] font-semibold flex items-center gap-2">
                      <span>संस्थाचालक / नेतृत्व:</span>
                      <strong className="text-stone-900">{study.testimonial_author || 'प्रमुख संचालक'}</strong>
                      <span className="text-stone-400">·</span>
                      <span className="text-stone-600">{study.testimonial_designation || 'प्रकल्प संचालक'}</span>
                    </div>

                    <p className="text-xs text-[#325243] leading-relaxed">
                      {study.organisation_background}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-stone-500 shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-[#184E34]" />
                  <span>सत्यापित अहवाल: {study.date_published}</span>
                </div>
              </div>

              {/* Challenge & Solution Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1.5">
                  <span className="font-bold text-amber-900 text-xs uppercase tracking-wide block">
                    सुरुवातीचे आव्हान (Challenge Before Support)
                  </span>
                  <p className="text-[#254636] leading-relaxed">
                    {study.challenge_before_support}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1.5">
                  <span className="font-bold text-[#143E29] text-xs uppercase tracking-wide block">
                    SEVA चे तांत्रिक सहकार्य (Technology Support Provided)
                  </span>
                  <p className="text-[#254636] leading-relaxed">
                    {study.technology_support_provided}
                  </p>
                </div>
              </div>

              {/* Results list */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#143E29] block">
                  प्रत्यक्ष परिणाम व सुधारणा (Results &amp; Documented Improvements)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {study.results_and_improvements.map((res, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-2 text-xs sm:text-sm text-[#254636] bg-[#F7FAF8] p-2.5 rounded-xl border border-stone-200/70">
                      <CheckCircle2 className="w-4 h-4 text-[#184E34] shrink-0 mt-0.5" />
                      <span className="leading-snug">{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial Quote from Leader */}
              {study.testimonial_quote && (
                <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/50 border-l-4 border-[#184E34] text-xs sm:text-sm text-[#254636] space-y-2">
                  <div className="flex items-start gap-2">
                    <Quote className="w-4 h-4 text-[#184E34] shrink-0 mt-0.5" />
                    <p className="italic leading-relaxed font-normal">
                      "{study.testimonial_quote}"
                    </p>
                  </div>
                  {study.testimonial_author && (
                    <p className="text-right text-xs font-bold text-[#143E29]">
                      — {study.testimonial_author} ({study.testimonial_designation})
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#064E36] text-white p-8 sm:p-12 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold">
              Ready to Document and Digitize Your Organisation's Work?
            </h3>
            <p className="text-sm text-emerald-100">
              Apply to the next technology support cohort and build lasting capacity.
            </p>
          </div>
          <button
            onClick={() => onNavigate('apply')}
            className="px-6 py-3.5 text-sm font-bold text-[#064E36] bg-white hover:bg-emerald-50 rounded-lg transition-all shrink-0 cursor-pointer"
          >
            Apply for Support
          </button>
        </div>
      </section>
    </div>
  );
};
