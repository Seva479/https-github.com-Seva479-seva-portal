import React from 'react';
import { Target, Compass, Heart, Users, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { PencilHeroArt } from '../components/PencilArt';

interface AboutPageProps {
  onNavigate: (view: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 lg:space-y-24 py-8 pb-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold tracking-widest text-[#184E34] uppercase">
            Organisation Identity
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#143E29] leading-[1.15]">
            About SEVA
          </h1>
          <p className="text-lg sm:text-xl text-[#254636] leading-[1.7] font-normal">
            Sustainable Ecology &amp; Village Advancement (SEVA) is dedicated to strengthening grassroots organisations, rural communities and village development institutions across India.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/90 space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#184E34] flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono tracking-widest uppercase text-emerald-800/60 font-semibold">
              Core Vision
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#143E29] leading-snug">
              "Empowering Grassroots Organisations Through Technology, Knowledge and Digital Transformation."
            </h2>
            <p className="text-base text-[#254636] leading-[1.7]">
              We envision a rural development sector where even the smallest community-based organisation has access to appropriate, reliable digital tools to manage data, measure social impact, and communicate with institutional donors without prohibitive technical or financial barriers.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/90 space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#184E34] flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono tracking-widest uppercase text-emerald-800/60 font-semibold">
              Our Mission
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#143E29] leading-snug">
              "Strengthening Institutions Through Accessible, Need-Based Systems."
            </h2>
            <p className="text-base text-[#254636] leading-[1.7]">
              To strengthen grassroots and community-based organisations by providing accessible, affordable and need-based digital solutions, technology support, institutional capacity building and data management systems.
            </p>
          </div>
        </div>
      </section>

      {/* Positioning & Philosophy */}
      <section className="bg-white py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold tracking-widest text-[#184E34] uppercase">
                Our Institutional Positioning
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#143E29] leading-tight">
                A Development Organisation, Not a Commercial Software Agency
              </h2>
              <p className="text-[#254636] text-base leading-[1.72]">
                SEVA is not an IT consulting firm or an agency selling software packages. We are a development organisation rooted in rural Maharashtra that understands the lived realities of field animators, tribal women self-help groups, and grassroots trustees.
              </p>
              <p className="text-[#254636] text-base leading-[1.72]">
                We believe that grassroots organisations are the real engines of social transformation. When a local organisation spends 40% of its working hours hand-copying registers and battling corrupted Excel files, community development suffers. By strengthening their digital backbone, we amplify their ground impact.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm sm:text-base text-[#142820] font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#184E34] shrink-0" />
                  <span>Participatory, respectful co-design with rural animators</span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base text-[#142820] font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#184E34] shrink-0" />
                  <span>Vernacular language support (Marathi, Hindi, English)</span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base text-[#142820] font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#184E34] shrink-0" />
                  <span>Transparent 70% SEVA support and 30% NGO cost-sharing</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <PencilHeroArt
                className="h-[380px]"
                caption="सहभागी ग्राम विकास कार्यशाळा (Participatory Capacity Workshop)"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Registered Office Roots */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#064E36] text-white rounded-2xl p-8 sm:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-300">
              Ground Roots &amp; Headquarters
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Rooted in Ralegaon, Yavatmal, Maharashtra
            </h2>
            <p className="text-sm text-emerald-100/90 leading-relaxed">
              Our registered office is located at <strong>31 B, Jalka, Ralegaon, District Yavatmal, Maharashtra – 445402</strong>. Operating directly from Vidarbha allows us to design systems tested under genuine rural conditions—low internet bandwidth, intermittent power supply, and multi-lingual community leadership.
            </p>
          </div>
          <div className="md:col-span-4 flex md:justify-end">
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 text-xs sm:text-sm font-semibold text-[#064E36] bg-white hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
            >
              Contact Our Ralegaon Office
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
