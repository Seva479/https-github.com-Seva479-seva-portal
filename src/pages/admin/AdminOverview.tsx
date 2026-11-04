import React from 'react';
import {
  FileText,
  Clock,
  CheckCircle2,
  Calendar,
  XCircle,
  PauseCircle,
  PlayCircle,
  Award,
  Layers,
  TrendingUp,
  MapPin,
  Building,
  ArrowUpRight,
  MessageSquare,
  FileSpreadsheet,
  UploadCloud,
} from 'lucide-react';
import { SevaStore } from '../../services/store';
import { Application, ProgrammeProject, Meeting } from '../../types';

interface AdminOverviewProps {
  applications: Application[];
  projects: ProgrammeProject[];
  meetings: Meeting[];
  onSelectApplication: (app: Application) => void;
  onNavigateTab: (tab: string) => void;
  onOpenExcelImport?: () => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  applications,
  projects,
  meetings,
  onSelectApplication,
  onNavigateTab,
  onOpenExcelImport,
}) => {
  // Count by status
  const counts = {
    total: applications.length,
    new: applications.filter((a) => a.status === 'New Application').length,
    underReview: applications.filter((a) => a.status === 'Under Initial Review' || a.status === 'Additional Information Required').length,
    shortlisted: applications.filter((a) => a.status === 'Shortlisted').length,
    meetingScheduled: applications.filter((a) => a.status === 'Meeting Scheduled').length,
    approved: applications.filter((a) => a.status === 'Approved' || a.status === 'Agreement Pending').length,
    rejected: applications.filter((a) => a.status === 'Rejected').length,
    onHold: applications.filter((a) => a.status === 'On Hold').length,
    ongoing: projects.filter((p) => p.implementation_status !== 'Completed').length,
    completed: projects.filter((p) => p.implementation_status === 'Completed').length,
  };

  // State distribution
  const stateDist: { [key: string]: number } = {};
  applications.forEach((a) => {
    stateDist[a.state] = (stateDist[a.state] || 0) + 1;
  });

  // Org type distribution
  const orgTypeDist: { [key: string]: number } = {};
  applications.forEach((a) => {
    orgTypeDist[a.type_of_organization] = (orgTypeDist[a.type_of_organization] || 0) + 1;
  });

  // Priority distribution
  const priorityDist = {
    High: applications.filter((a) => a.priority === 'High').length,
    Medium: applications.filter((a) => a.priority === 'Medium').length,
    Low: applications.filter((a) => a.priority === 'Low').length,
  };

  // Support requirement distribution
  const supportDist: { [key: string]: number } = {};
  applications.forEach((a) => {
    (a.support_type_seeking || []).forEach((s) => {
      supportDist[s] = (supportDist[s] || 0) + 1;
    });
  });

  return (
    <div className="space-y-8">
      {/* 1. Quick Actions Bar (झटपट कृती - सोपा व सुटसुटीत डॅशबोर्ड) */}
      <div
        className="rounded-3xl p-6 text-white shadow-md space-y-4 border border-[#1E573B]"
        style={{ backgroundColor: '#143E29' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-300">
              प्रशासकीय नियंत्रण केंद्र · Central Control
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-0.5">
              SEVA तंत्रज्ञान सहाय्य कार्यक्रम डॅशबोर्ड
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {onOpenExcelImport && (
              <button
                onClick={onOpenExcelImport}
                className="px-4 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-900 font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
                title="Excel फाईलवरून डेटा अपलोड करा"
              >
                <UploadCloud className="w-4 h-4 text-stone-900" />
                <span>Excel डेटा अपलोड करा</span>
              </button>
            )}
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-400/60 text-emerald-100 text-xs font-bold"
              style={{ backgroundColor: '#0B3320' }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>सिस्टम कार्यरत</span>
            </span>
          </div>
        </div>

        {/* 5 Quick Action Cards (High Contrast, Solid Dark Emerald Backgrounds, Vibrant Accents) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-1">
          <button
            onClick={() => onNavigateTab('applications')}
            className="p-4 rounded-2xl border border-emerald-500/40 text-left transition-all cursor-pointer group active:scale-[0.98] shadow-xs hover:border-amber-400"
            style={{ backgroundColor: '#0E3020' }}
          >
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-5 h-5 text-amber-300" />
              {counts.new > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-stone-900 text-[10px] font-black">
                  {counts.new} नवीन
                </span>
              )}
            </div>
            <div className="text-sm font-extrabold text-white group-hover:text-amber-300">
              नवीन अर्ज तपासा
            </div>
            <div className="text-[11px] text-emerald-100 font-medium">
              {counts.total} पैकी {counts.new} तपासणी बाकी
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('inquiries')}
            className="p-4 rounded-2xl border border-emerald-500/40 text-left transition-all cursor-pointer group active:scale-[0.98] shadow-xs hover:border-amber-400"
            style={{ backgroundColor: '#0E3020' }}
          >
            <div className="flex items-center justify-between mb-2">
              <MessageSquare className="w-5 h-5 text-amber-300" />
              {SevaStore.getContactMessages().filter((m) => m.status === 'Unread').length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-stone-900 text-[10px] font-black">
                  {SevaStore.getContactMessages().filter((m) => m.status === 'Unread').length} नवीन
                </span>
              )}
            </div>
            <div className="text-sm font-extrabold text-white group-hover:text-amber-300">
              चौकशी संदेश (Inquiry)
            </div>
            <div className="text-[11px] text-emerald-100 font-medium">
              {SevaStore.getContactMessages().length} संदेश प्राप्त
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('meetings')}
            className="p-4 rounded-2xl border border-emerald-500/40 text-left transition-all cursor-pointer group active:scale-[0.98] shadow-xs hover:border-emerald-300"
            style={{ backgroundColor: '#0E3020' }}
          >
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-5 h-5 text-emerald-300" />
              <span className="text-xs font-mono font-bold text-emerald-200">
                {meetings.length}
              </span>
            </div>
            <div className="text-sm font-extrabold text-white group-hover:text-emerald-200">
              बैठका व्यवस्थापन
            </div>
            <div className="text-[11px] text-emerald-100 font-medium">
              शेड्यूल केलेल्या संवादांची यादी
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('projects')}
            className="p-4 rounded-2xl border border-emerald-500/40 text-left transition-all cursor-pointer group active:scale-[0.98] shadow-xs hover:border-sky-300"
            style={{ backgroundColor: '#0E3020' }}
          >
            <div className="flex items-center justify-between mb-2">
              <PlayCircle className="w-5 h-5 text-sky-300" />
              <span className="text-xs font-mono font-bold text-sky-200">
                {counts.ongoing}
              </span>
            </div>
            <div className="text-sm font-extrabold text-white group-hover:text-sky-200">
              सक्रिय प्रकल्प ट्रॅकर
            </div>
            <div className="text-[11px] text-emerald-100 font-medium">
              कामाची प्रगती व टप्पे
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('cms')}
            className="p-4 rounded-2xl border border-emerald-500/40 text-left transition-all cursor-pointer group active:scale-[0.98] shadow-xs hover:border-purple-300"
            style={{ backgroundColor: '#0E3020' }}
          >
            <div className="flex items-center justify-between mb-2">
              <Layers className="w-5 h-5 text-purple-300" />
              <span className="text-xs text-purple-200 font-bold">CMS</span>
            </div>
            <div className="text-sm font-extrabold text-white group-hover:text-purple-200">
              केस स्टडी व सामग्री
            </div>
            <div className="text-[11px] text-emerald-100 font-medium">
              संस्थाचालक फोटो व आकडेवारी
            </div>
          </button>
        </div>

        {/* Excel Import Feature Banner */}
        <div
          className="border border-emerald-500/50 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2"
          style={{ backgroundColor: '#0A2619' }}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-xl text-emerald-200 flex items-center justify-center shrink-0 border border-emerald-400/40"
              style={{ backgroundColor: '#143E29' }}
            >
              <FileSpreadsheet className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-white flex items-center gap-2">
                <span>Excel Sheet द्वारे डेटा बल्क अपलोड करण्याची सुविधा</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-stone-900 text-[10px] font-black">
                  नवीन
                </span>
              </div>
              <p className="text-xs text-emerald-100/90 mt-0.5 font-medium">
                एकाच वेळी अनेक संस्थांचा डेटा थेट Excel (.xlsx, .xls) किंवा CSV फाईलवरून सिस्टीममध्ये अपलोड करा. नमुना शीट डाउनलोड करा व वापरा.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {onOpenExcelImport ? (
              <button
                onClick={onOpenExcelImport}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-[0.98]"
              >
                <UploadCloud className="w-4 h-4 text-stone-900" />
                <span>Excel Sheet अपलोड करा</span>
              </button>
            ) : (
              <button
                onClick={() => onNavigateTab('applications')}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-[0.98]"
              >
                <UploadCloud className="w-4 h-4 text-stone-900" />
                <span>अर्ज विभागात जा</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Enhanced High-Contrast Metric Cards with Colored Accents */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight uppercase">
            महत्त्वाचे आकडे व प्रगती (Key Metrics)
          </h3>
          <span className="text-xs text-slate-600 font-bold bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
            SEVA 70-30 Model
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Card 1: Total (Indigo Accent) */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 border-l-4 border-l-indigo-600 shadow-sm space-y-1 hover:shadow-md hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 block">एकूण आलेले अर्ज</span>
              <FileText className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-3xl font-black font-mono text-slate-900 tabular-nums">{counts.total}</div>
            <span className="text-[11px] text-indigo-700 font-semibold block">सर्व जिल्ह्यांतून</span>
          </div>

          {/* Card 2: New Submissions (Amber Accent) */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 border-l-4 border-l-amber-500 shadow-sm space-y-1 hover:shadow-md hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 block">नवीन अर्ज (New)</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-3xl font-black font-mono text-amber-900 tabular-nums">{counts.new}</div>
            <span className="text-[11px] text-amber-700 font-semibold block">तपासणी बाकी</span>
          </div>

          {/* Card 3: Under Review (Sky Blue Accent) */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 border-l-4 border-l-sky-500 shadow-sm space-y-1 hover:shadow-md hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 block">समीक्षा सुरू (In Review)</span>
              <TrendingUp className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-3xl font-black font-mono text-sky-900 tabular-nums">{counts.underReview + counts.shortlisted}</div>
            <span className="text-[11px] text-sky-700 font-semibold block">तांत्रिक मूल्यमापन</span>
          </div>

          {/* Card 4: Approved (Emerald Accent) */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 border-l-4 border-l-emerald-600 shadow-sm space-y-1 hover:shadow-md hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 block">मंजूर संस्था (Approved)</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-black font-mono text-[#184E34] tabular-nums">{counts.approved}</div>
            <span className="text-[11px] text-emerald-700 font-semibold block">30% करार निश्चित</span>
          </div>

          {/* Card 5: Active Projects (Forest Green Card) */}
          <div
            className="p-5 rounded-2xl text-white border border-[#184E34] border-l-4 border-l-emerald-400 shadow-sm space-y-1 hover:shadow-md transition-all"
            style={{ backgroundColor: '#143E29' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-200 block">सक्रिय प्रकल्प (Active)</span>
              <PlayCircle className="w-4 h-4 text-emerald-300" />
            </div>
            <div className="text-3xl font-black font-mono text-white tabular-nums">{counts.ongoing}</div>
            <span className="text-[11px] text-emerald-300 font-semibold block">थेट मैदानावर काम</span>
          </div>
        </div>
      </div>

      {/* 2. Analytical Charts Grid (High Contrast Cards on Slate Background) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Support Requirements Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center justify-between">
            <span>Applications by Support Requirement</span>
            <span className="text-xs text-slate-500 font-semibold">Count</span>
          </h3>
          <div className="space-y-3 pt-1">
            {Object.entries(supportDist).map(([key, val]) => {
              const pct = Math.round((val / (applications.length || 1)) * 100);
              return (
                <div key={key} className="space-y-1.5">
                  <div className="flex justify-between text-xs sm:text-sm text-slate-800 font-medium">
                    <span className="truncate pr-2">{key}</span>
                    <span className="font-mono font-bold text-slate-900 tabular-nums">{val} ({pct}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                    <div
                      className="h-full bg-[#0B6643] rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Priority & Organisation Type Grid */}
        <div className="space-y-6">
          {/* Priority Breakdown */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
              Applications by Priority Assessment
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <div className="p-3.5 rounded-xl bg-red-50/90 border border-red-200 shadow-2xs">
                <div className="text-xs text-red-700 font-bold">High Priority</div>
                <div className="text-2xl font-black font-mono text-red-900 tabular-nums mt-1">{priorityDist.High}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 shadow-2xs">
                <div className="text-xs text-amber-800 font-bold">Medium Priority</div>
                <div className="text-2xl font-black font-mono text-amber-900 tabular-nums mt-1">{priorityDist.Medium}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                <div className="text-xs text-slate-700 font-bold">Low Priority</div>
                <div className="text-2xl font-black font-mono text-slate-900 tabular-nums mt-1">{priorityDist.Low}</div>
              </div>
            </div>
          </div>

          {/* Org Type Distribution */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
              Organisation Legal Structure
            </h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(orgTypeDist).map(([type, count]) => (
                <div key={type} className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 flex items-center gap-2 shadow-2xs">
                  <span className="font-semibold">{type}</span>
                  <span className="font-mono font-bold text-[#0B6643] bg-white px-2 py-0.5 rounded-md border border-slate-200 tabular-nums">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Urgent Action Queue & Recent Applications */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-5 bg-slate-50/80 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
              Recent Application Queue
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              Review, score, and update status directly
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('applications')}
            className="text-xs font-bold text-[#0B6643] hover:text-[#064E36] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Applications</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {[...applications]
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .slice(0, 6)
            .map((app) => (
            <div
              key={app.id}
              className={`p-4 sm:px-6 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                app.status === 'New Application' ? 'bg-emerald-50/40' : ''
              }`}
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                    {app.id}
                  </span>
                  {app.status === 'New Application' && (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-400 text-stone-900 shadow-2xs">
                      ★ नवीन अर्ज (New)
                    </span>
                  )}
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    app.priority === 'High' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}>
                    {app.priority} Priority
                  </span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs text-slate-600 font-medium">{app.district}, {app.state}</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900">
                  {app.name_of_organization}
                </h4>
                <p className="text-xs text-slate-600 line-clamp-1 font-medium">
                  Seeking: {app.support_type_seeking.join(', ')} · Contact: {app.contact_person_name} ({app.contact_number})
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0">
                <span className="text-xs font-bold px-3 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
                  {app.status}
                </span>
                <button
                  onClick={() => onSelectApplication(app)}
                  className="px-4 py-1.5 text-xs font-bold text-white bg-[#0B6643] hover:bg-[#064E36] rounded-lg transition-colors cursor-pointer shadow-2xs"
                >
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
