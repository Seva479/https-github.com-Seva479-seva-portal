import React, { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Mail,
  PlayCircle,
  Settings,
  Database,
  ShieldCheck,
  LogOut,
  Bell,
  Search,
  UserCheck,
  ChevronRight,
  MessageSquare,
  FileCheck,
} from 'lucide-react';
import { SevaStore, ADMIN_USERS } from '../../services/store';
import { Application, UserProfile, Meeting, ProgrammeProject } from '../../types';
import { SevaLogo } from '../../components/SevaLogo';
import { AdminOverview } from './AdminOverview';
import { ApplicationsManager } from './ApplicationsManager';
import { AgreementBudgetManager } from './AgreementBudgetManager';
import { InquiriesManager } from './InquiriesManager';
import { ApplicationDetailModal } from './ApplicationDetailModal';
import { MeetingsManager } from './MeetingsManager';
import { EmailManager } from './EmailManager';
import { ProjectsTracker } from './ProjectsTracker';
import { ContentManager } from './ContentManager';
import { DatabaseSchemaModal } from './DatabaseSchemaModal';
import { ExcelImportModal } from './ExcelImportModal';
import { fetchRemoteApplications, isSupabaseConfigured } from '../../services/supabase';

interface AdminLayoutProps {
  onExitAdmin: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onExitAdmin }) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'applications' | 'agreements' | 'inquiries' | 'meetings' | 'emails' | 'projects' | 'cms' | 'database'
  >('overview');

  const [currentUser, setCurrentUser] = useState<UserProfile>(SevaStore.getCurrentUser());
  const [applications, setApplications] = useState<Application[]>(SevaStore.getApplications());
  const [projects, setProjects] = useState<ProgrammeProject[]>(SevaStore.getProjects());
  const [meetings, setMeetings] = useState<Meeting[]>(SevaStore.getMeetings());
  const [contactMessages, setContactMessages] = useState(SevaStore.getContactMessages());

  // Modal states
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [preselectedAppForMeeting, setPreselectedAppForMeeting] = useState<Application | null>(null);
  const [preselectedAppForEmail, setPreselectedAppForEmail] = useState<Application | null>(null);
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);

  const refreshAll = () => {
    setApplications(SevaStore.getApplications());
    setProjects(SevaStore.getProjects());
    setMeetings(SevaStore.getMeetings());
    setContactMessages(SevaStore.getContactMessages());
  };

  // Auto-refresh when applications are submitted in another tab, window, or on the portal
  React.useEffect(() => {
    const handleStoreChange = () => {
      refreshAll();
    };

    window.addEventListener('storage', handleStoreChange);
    window.addEventListener('seva_store_updated', handleStoreChange);

    // Initial check & auto-pull from Supabase if configured
    if (isSupabaseConfigured()) {
      fetchRemoteApplications()
        .then((remoteApps) => {
          if (remoteApps && remoteApps.length > 0) {
            const res = SevaStore.syncRemoteApplications(remoteApps);
            if (res.newCount > 0) {
              refreshAll();
            }
          }
        })
        .catch((e) => {
          console.warn('Background remote sync skipped:', e);
        });
    }

    return () => {
      window.removeEventListener('storage', handleStoreChange);
      window.removeEventListener('seva_store_updated', handleStoreChange);
    };
  }, []);

  const handleUpdateApp = (updated: Application) => {
    refreshAll();
    setSelectedApp(updated);
  };

  const handleRoleChange = (roleName: string) => {
    const found = ADMIN_USERS.find((u) => u.role === roleName) || ADMIN_USERS[0];
    SevaStore.setCurrentUser(found);
    setCurrentUser(found);
  };

  const handleScheduleMeetingFromApp = (app: Application) => {
    setSelectedApp(null);
    setPreselectedAppForMeeting(app);
    setActiveTab('meetings');
  };

  const handleComposeEmailFromApp = (app: Application) => {
    setSelectedApp(null);
    setPreselectedAppForEmail(app);
    setActiveTab('emails');
  };

  const handleConvertToProjectFromApp = (app: Application) => {
    const newProj = SevaStore.convertApplicationToProject(app, {
      agreed_cost: 65000,
      assigned_lead: 'Pravin R. (SEVA Tech Lead)',
      duration_months: 4,
      start_date: new Date().toISOString().split('T')[0],
    });
    refreshAll();
    setSelectedApp(null);
    setActiveTab('projects');
  };

  const newCount = applications.filter((a) => a.status === 'New Application').length;

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col font-sans">
      {/* Top Admin Header Bar */}
      <header className="bg-[#0F3825] text-white sticky top-0 z-40 border-b border-[#184E34] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand & Area */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <SevaLogo variant="dark" showSubtitle={false} />
            <div className="border-l border-emerald-700/60 pl-2.5 sm:pl-3">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-xs sm:text-base tracking-tight block text-white whitespace-nowrap">
                  Admin Console
                </span>
                <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-800 text-[9px] sm:text-[10px] font-bold text-emerald-200 border border-emerald-600/40 whitespace-nowrap">
                  प्रशासकीय कक्ष
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-emerald-200/90 hidden sm:block -mt-0.5 font-medium truncate max-w-xs">
                Grassroots Digital Management Platform · Ralegaon
              </span>
            </div>
          </div>

          {/* User & Role Switcher + Logout */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs">
            {/* User Chip */}
            <div className="hidden md:flex items-center gap-2 bg-emerald-950/70 px-3.5 py-1.5 rounded-full border border-emerald-700/60">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-100 font-semibold">{currentUser.name}</span>
              <span className="text-emerald-400/50">·</span>
              <span className="text-amber-300 font-mono text-[11px]">{currentUser.email}</span>
            </div>

            {/* Logout / Exit button */}
            <button
              onClick={onExitAdmin}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-950/70 hover:bg-red-900 text-red-200 hover:text-white font-bold transition-all cursor-pointer border border-red-800/60 shadow-xs"
              title="सुरक्षितपणे बाहेर पडा (Logout and return to public website)"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span>लॉगआउट (Logout)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Admin Navigation Sub-Bar with clean pill buttons */}
      <nav className="bg-white border-b border-stone-200 sticky top-16 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1.5 overflow-x-auto scrollbar-none py-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-[#184E34] text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>डॅशबोर्ड (Overview)</span>
          </button>

          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-2 relative ${
              activeTab === 'applications'
                ? 'bg-[#184E34] text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>अर्ज व्यवस्थापन (Applications)</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
              activeTab === 'applications' ? 'bg-amber-400 text-stone-900' : 'bg-emerald-100 text-[#184E34]'
            }`}>
              {applications.length}
            </span>
            {newCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-500 absolute top-1.5 right-1.5 animate-ping" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('agreements')}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'agreements'
                ? 'bg-[#184E34] text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5 text-amber-500" />
            <span>करार व बजेट (Agreement &amp; Budget)</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-2 relative ${
              activeTab === 'inquiries'
                ? 'bg-[#184E34] text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>चौकशी संदेश (Inquiries)</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
              activeTab === 'inquiries' ? 'bg-amber-400 text-stone-900' : 'bg-emerald-100 text-[#184E34]'
            }`}>
              {contactMessages.length}
            </span>
            {contactMessages.filter((m) => m.status === 'Unread').length > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-500 absolute top-1.5 right-1.5 animate-ping" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('meetings')}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'meetings'
                ? 'bg-[#184E34] text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>बैठका (Meetings)</span>
            <span className="text-[11px] text-stone-400 font-mono">({meetings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('emails')}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'emails'
                ? 'bg-[#184E34] text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>ईमेल केंद्र (Emails)</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'projects'
                ? 'bg-[#184E34] text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span>प्रकल्प ट्रॅकर (Projects)</span>
            <span className="text-[11px] text-stone-400 font-mono">({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('cms')}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'cms'
                ? 'bg-[#184E34] text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>सामग्री व केसेस (CMS)</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'database'
                ? 'bg-[#184E34] text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>डेटाबेस (SQL Schema)</span>
          </button>
        </div>
      </nav>

      {/* Main Admin Workspace Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {activeTab === 'overview' && (
          <AdminOverview
            applications={applications}
            projects={projects}
            meetings={meetings}
            onSelectApplication={(app) => setSelectedApp(app)}
            onNavigateTab={(tab) => setActiveTab(tab as any)}
            onOpenExcelImport={() => setIsExcelModalOpen(true)}
          />
        )}

        {activeTab === 'applications' && (
          <ApplicationsManager
            applications={applications}
            onSelectApplication={(app) => setSelectedApp(app)}
            onRefresh={refreshAll}
          />
        )}

        {activeTab === 'agreements' && (
          <AgreementBudgetManager
            applications={applications}
            onSelectApplicationForDetail={(app) => setSelectedApp(app)}
            onNavigateToEmails={(app) => {
              setPreselectedAppForEmail(app);
              setActiveTab('emails');
            }}
          />
        )}

        {activeTab === 'inquiries' && (
          <InquiriesManager onRefresh={refreshAll} />
        )}

        {activeTab === 'meetings' && (
          <MeetingsManager
            meetings={meetings}
            applications={applications}
            onRefreshMeetings={refreshAll}
            preselectedApp={preselectedAppForMeeting}
          />
        )}

        {activeTab === 'emails' && (
          <EmailManager
            applications={applications}
            preselectedApp={preselectedAppForEmail}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsTracker
            projects={projects}
            onRefreshProjects={refreshAll}
          />
        )}

        {activeTab === 'cms' && <ContentManager />}

        {activeTab === 'database' && <DatabaseSchemaModal />}
      </main>

      {/* Application Detail / Review Modal */}
      {selectedApp && (
        <ApplicationDetailModal
          application={selectedApp}
          onClose={() => setSelectedApp(null)}
          onUpdateApp={handleUpdateApp}
          onScheduleMeeting={handleScheduleMeetingFromApp}
          onComposeEmail={handleComposeEmailFromApp}
          onConvertToProject={handleConvertToProjectFromApp}
          onCreateAgreement={(app) => {
            setSelectedApp(null);
            setActiveTab('agreements');
          }}
          onDeleteApp={() => {
            setSelectedApp(null);
            refreshAll();
          }}
        />
      )}

      {/* Global Excel / CSV Bulk Import Modal */}
      <ExcelImportModal
        isOpen={isExcelModalOpen}
        onClose={() => setIsExcelModalOpen(false)}
        onImportSuccess={() => {
          refreshAll();
        }}
      />
    </div>
  );
};
