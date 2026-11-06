import React from 'react';
import { Mail, Phone, MapPin, Globe, ArrowUpRight, ShieldCheck, Lock, HeartHandshake, Database, Laptop } from 'lucide-react';
import { SevaLogo } from './SevaLogo';

interface FooterProps {
  onNavigate: (view: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  return (
    <footer className="bg-[#0F3825] text-[#F7FAF8] border-t border-[#184E34] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-900/60">
          {/* Column 1 & 2: Organization Info */}
          <div className="lg:col-span-2 space-y-4">
            <SevaLogo variant="dark" />

            <p className="text-sm sm:text-base text-emerald-100/90 leading-[1.7] max-w-md pt-2 font-normal">
              SEVA works towards strengthening grassroots organisations, rural communities and village development institutions across India through practical, need-based technology solutions, data management systems and operational capacity building.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0B6643]/70 text-emerald-100 text-xs border border-emerald-700/50">
                <HeartHandshake className="w-4 h-4 text-[#F59E0B]" />
                <span>70% SEVA Supported · 30% Grassroots Contribution</span>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-emerald-100/80">
              {/* Sarathi Sanstha Link */}
              <li>
                <a
                  href="https://www.sarathisanstha.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-300 hover:text-white transition-colors inline-flex items-center gap-1.5 font-bold"
                >
                  <span>Sarathi Sanstha</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About SEVA &amp; Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('approach')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Approach &amp; Cost-Sharing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('why-digital')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Why Digital Empowerment?
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('programme')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Technology Support Programme
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('impact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Impact &amp; Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('resources')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Knowledge Centre &amp; MIS Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Focus Areas */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-4">
              Focus Areas
            </h4>
            <ul className="space-y-2.5 text-sm text-emerald-100/80">
              <li>NGO Website Development</li>
              <li>Beneficiary &amp; Project MIS</li>
              <li>Field Data Collection Tools</li>
              <li>Social Media &amp; Digital Presence</li>
              <li>Staff Digital Literacy Training</li>
              <li>Documentation &amp; Reporting</li>
              <li>Institutional Transparency</li>
            </ul>
          </div>

          {/* Column 5: Official Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-4">
              Registered Office
            </h4>
            <div className="space-y-3 text-xs text-emerald-100/80 leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                <span>
                  31 B, Jalka, Ralegaon,<br />
                  District Yavatmal,<br />
                  Maharashtra – 445402, India.
                </span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-[#D97706] shrink-0" />
                <a href="tel:+918999469974" className="hover:text-white tabular-nums">
                  +91 8999469974
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D97706] shrink-0" />
                <a href="mailto:seva.ecology@gmail.com" className="hover:text-white break-all">
                  seva.ecology@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#D97706] shrink-0" />
                <a href="https://www.sevavillage.org" target="_blank" rel="noreferrer" className="hover:text-white">
                  www.sevavillage.org
                </a>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-2">
                <button
                  onClick={onOpenAdmin}
                  className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-black/25 text-emerald-200 hover:text-white hover:bg-black/40 text-xs transition-colors cursor-pointer border border-emerald-800/80 font-medium"
                >
                  <Lock className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Admin Login</span>
                </button>
                <button
                  onClick={() => {
                    window.location.href = window.location.origin + window.location.pathname + '?v=' + Date.now();
                  }}
                  className="min-h-[44px] inline-flex items-center gap-1 px-3.5 py-2 rounded-full bg-emerald-950/80 text-emerald-300 hover:text-white text-xs border border-emerald-800/60 cursor-pointer"
                  title="Force refresh to load newest website version"
                >
                  <span>🔄 रिफ्रेश (Update Site)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-emerald-200/70">
          <p>
            &copy; {new Date().getFullYear()} Sustainable Ecology &amp; Village Advancement (SEVA). All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span>Non-Profit Digital Transformation Initiative</span>
            <span aria-hidden="true">·</span>
            <span>Empowering Grassroots Since 2024</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
