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
} from 'lucide-react';
import { SevaStore } from '../../services/store';
import { Application, ProgrammeProject, Meeting } from '../../types';

interface AdminOverviewProps {
  applications: Application[];
  projects: ProgrammeProject[];
  meetings: Meeting[];
  onSelectApplication: (app: Application) => void;
  onNavigateTab: (tab: string) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  applications,
  projects,
  meetings,
  onSelectApplication,
  onNavigateTab,
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
      <div className="bg-gradient-to-r from-[#184E34] to-[#0F3825] rounded-3xl p-6 text-white shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-emerald-300">
              प्रशासकीय नियंत्रण केंद्र · Central Control
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mt-0.5">
              SEVA तंत्रज्ञान सहाय्य कार्यक्रम डॅशबोर्ड
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-emerald-200 font-medium">लाइव्ह स्थिती:</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-500/50 text-emerald-100 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>सिस्टम कार्यरत</span>
            </span>
          </div>
        </div>

        {/* 5 Quick Action Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-1">
          <button
            onClick={() => onNavigateTab('applications')}
            className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-left transition-all cursor-pointer group active:scale-[0.98]"
          >
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-5 h-5 text-amber-300" />
              {counts.new > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-stone-900 text-[10px] font-extrabold">
                  {counts.new} नवीन
                </span>
              )}
            </div>
            <div className="text-sm font-bold text-white group-hover:text-emerald-100">
              नवीन अर्ज तपासा
            </div>
            <div className="text-[11px] text-emerald-200/80">
              {counts.total} पैकी {counts.new} तपासणी बाकी
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('inquiries')}
            className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-left transition-all cursor-pointer group active:scale-[0.98]"
          >
            <div className="flex items-center justify-between mb-2">
              <MessageSquare className="w-5 h-5 text-amber-300" />
              {SevaStore.getContactMessages().filter((m) => m.status === 'Unread').length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-stone-900 text-[10px] font-extrabold">
                  {SevaStore.getContactMessages().filter((m) => m.status === 'Unread').length} नवीन
                </span>
              )}
            </div>
            <div className="text-sm font-bold text-white group-hover:text-emerald-100">
              चौकशी संदेश (Inquiry)
            </div>
            <div className="text-[11px] text-emerald-200/80">
              {SevaStore.getContactMessages().length} संदेश प्राप्त
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('meetings')}
            className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-left transition-all cursor-pointer group active:scale-[0.98]"
          >
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-5 h-5 text-emerald-300" />
              <span className="text-xs font-mono font-bold text-emerald-200">
                {meetings.length}
              </span>
            </div>
            <div className="text-sm font-bold text-white group-hover:text-emerald-100">
              बैठका व्यवस्थापन
            </div>
            <div className="text-[11px] text-emerald-200/80">
              शेड्यूल केलेल्या संवादांची यादी
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('projects')}
            className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-left transition-all cursor-pointer group active:scale-[0.98]"
          >
            <div className="flex items-center justify-between mb-2">
              <PlayCircle className="w-5 h-5 text-sky-300" />
              <span className="text-xs font-mono font-bold text-sky-200">
                {counts.ongoing}
              </span>
            </div>
            <div className="text-sm font-bold text-white group-hover:text-emerald-100">
              सक्रिय प्रकल्प ट्रॅकर
            </div>
            <div className="text-[11px] text-emerald-200/80">
              कामाची प्रगती व टप्पे
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('cms')}
            className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-left transition-all cursor-pointer group active:scale-[0.98]"
          >
            <div className="flex items-center justify-between mb-2">
              <Layers className="w-5 h-5 text-purple-300" />
              <span className="text-xs text-purple-200 font-bold">CMS</span>
            </div>
            <div className="text-sm font-bold text-white group-hover:text-emerald-100">
              केस स्टडी व सामग्री
            </div>
            <div className="text-[11px] text-emerald-200/80">
              संस्थाचालक फोटो व आकडेवारी
            </div>
          </button>
        </div>
      </div>

      {/* 2. Simplified, Attractive Metric Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-stone-800 tracking-tight uppercase">
            महत्त्वाचे आकडे व प्रगती (Key Metrics)
          </h3>
          <span className="text-xs text-stone-500 font-mono">SEVA 70-30 Model</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Card 1: Total */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs space-y-1 hover:border-emerald-300 transition-all">
            <span className="text-xs font-bold text-stone-500 block">एकूण आलेले अर्ज</span>
            <div className="text-3xl font-extrabold font-mono text-stone-900 tabular-nums">{counts.total}</div>
            <span className="text-[11px] text-[#184E34] font-semibold">सर्व जिल्ह्यांतून</span>
          </div>

          {/* Card 2: New Submissions */}
          <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 shadow-xs space-y-1 hover:border-amber-400 transition-all">
            <span className="text-xs font-bold text-amber-800 block">नवीन अर्ज (New)</span>
            <div className="text-3xl font-extrabold font-mono text-amber-900 tabular-nums">{counts.new}</div>
            <span className="text-[11px] text-amber-700 font-medium">तपासणी बाकी</span>
          </div>

          {/* Card 3: Under Review */}
          <div className="p-5 rounded-2xl bg-blue-50/80 border border-blue-200 shadow-xs space-y-1 hover:border-blue-400 transition-all">
            <span className="text-xs font-bold text-blue-800 block">समीक्षा सुरू (In Review)</span>
            <div className="text-3xl font-extrabold font-mono text-blue-900 tabular-nums">{counts.underReview + counts.shortlisted}</div>
            <span className="text-[11px] text-blue-700 font-medium">तांत्रिक मूल्यमापन</span>
          </div>

          {/* Card 4: Approved */}
          <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 shadow-xs space-y-1 hover:border-emerald-400 transition-all">
            <span className="text-xs font-bold text-[#143E29] block">मंजूर संस्था (Approved)</span>
            <div className="text-3xl font-extrabold font-mono text-[#184E34] tabular-nums">{counts.approved}</div>
            <span className="text-[11px] text-emerald-800 font-medium">30% करार निश्चित</span>
          </div>

          {/* Card 5: Active Projects */}
          <div className="p-5 rounded-2xl bg-[#0F3825] text-white border border-[#184E34] shadow-xs space-y-1">
            <span className="text-xs font-bold text-emerald-200 block">सक्रिय प्रकल्प (Active)</span>
            <div className="text-3xl font-extrabold font-mono text-white tabular-nums">{counts.ongoing}</div>
            <span className="text-[11px] text-emerald-300 font-medium">थेट मैदानावर काम</span>
          </div>
        </div>
      </div>

      {/* 2. Analytical Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Support Requirements Breakdown */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-stone-900 flex items-center justify-between">
            <span>Applications by Support Requirement</span>
            <span className="text-xs text-stone-400 font-normal">Count</span>
          </h3>
          <div className="space-y-3 pt-1">
            {Object.entries(supportDist).map(([key, val]) => {
              const pct = Math.round((val / (applications.length || 1)) * 100);
              return (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between text-xs text-stone-700">
                    <span className="truncate pr-2">{key}</span>
                    <span className="font-mono font-semibold tabular-nums">{val} ({pct}%)</span>
                  </div>
                  <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
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
          <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-stone-900">
              Applications by Priority Assessment
            </h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-lg bg-red-50 border border-red-200/70">
                <div className="text-xs text-red-700 font-semibold">High Priority</div>
                <div className="text-xl font-bold font-mono text-red-900 tabular-nums mt-1">{priorityDist.High}</div>
              </div>
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200/70">
                <div className="text-xs text-amber-700 font-semibold">Medium Priority</div>
                <div className="text-xl font-bold font-mono text-amber-900 tabular-nums mt-1">{priorityDist.Medium}</div>
              </div>
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                <div className="text-xs text-stone-600 font-semibold">Low Priority</div>
                <div className="text-xl font-bold font-mono text-stone-800 tabular-nums mt-1">{priorityDist.Low}</div>
              </div>
            </div>
          </div>

          {/* Org Type Distribution */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-stone-900">
              Organisation Legal Structure
            </h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(orgTypeDist).map(([type, count]) => (
                <div key={type} className="px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-700 flex items-center gap-2">
                  <span className="font-medium">{type}</span>
                  <span className="font-mono font-bold text-[#0B6643] bg-white px-1.5 py-0.5 rounded border border-stone-200 tabular-nums">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Urgent Action Queue & Recent Applications */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-stone-900">
              Recent Application Queue
            </h3>
            <p className="text-xs text-stone-500">
              Review, score, and update status directly
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('applications')}
            className="text-xs font-semibold text-[#0B6643] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Applications</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-stone-100">
          {applications.slice(0, 5).map((app) => (
            <div
              key={app.id}
              className="p-4 sm:px-6 hover:bg-stone-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
                    {app.id}
                  </span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    app.priority === 'High' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-stone-100 text-stone-700'
                  }`}>
                    {app.priority} Priority
                  </span>
                  <span className="text-xs text-stone-400">·</span>
                  <span className="text-xs text-stone-500">{app.district}, {app.state}</span>
                </div>
                <h4 className="text-sm font-bold text-stone-900">
                  {app.name_of_organization}
                </h4>
                <p className="text-xs text-stone-500 line-clamp-1">
                  Seeking: {app.support_type_seeking.join(', ')} · Contact: {app.contact_person_name} ({app.contact_number})
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                  {app.status}
                </span>
                <button
                  onClick={() => onSelectApplication(app)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0B6643] hover:bg-[#064E36] rounded-md transition-colors cursor-pointer"
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
