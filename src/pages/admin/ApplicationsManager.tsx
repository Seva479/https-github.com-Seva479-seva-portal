import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  CheckCircle2,
  Clock,
  ChevronDown,
  ArrowUpDown,
  FileSpreadsheet,
  UploadCloud,
  Trash2,
  AlertTriangle,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { Application, ApplicationStatus, PriorityLevel } from '../../types';
import { ExcelImportModal } from './ExcelImportModal';
import { SevaStore } from '../../services/store';
import { fetchRemoteApplications, isSupabaseConfigured } from '../../services/supabase';

interface ApplicationsManagerProps {
  applications: Application[];
  onSelectApplication: (app: Application) => void;
  onRefresh?: () => void;
}

export const ApplicationsManager: React.FC<ApplicationsManagerProps> = ({
  applications,
  onSelectApplication,
  onRefresh,
}) => {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [appToDelete, setAppToDelete] = useState<Application | null>(null);
  const [deleteToast, setDeleteToast] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [stateFilter, setStateFilter] = useState<string>('All');
  const [supportFilter, setSupportFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'date_desc' | 'date_asc' | 'score_desc'>('date_desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter options
  const allStatuses: ApplicationStatus[] = [
    'New Application',
    'Under Initial Review',
    'Additional Information Required',
    'Shortlisted',
    'Meeting Scheduled',
    'Approved',
    'Rejected',
    'On Hold',
    'Agreement Pending',
    'Implementation Started',
    'Implementation Completed',
  ];

  const uniqueStates = Array.from(new Set(applications.map((a) => a.state)));
  const supportTypes = [
    'Website Development and Support',
    'MIS and Digital Data Management',
    'Mobile or Web-Based Application Development',
    'Social Media and Digital Communication Training',
    'Digital Capacity Building and Technical Support',
    'Data Management, Documentation and Reporting Systems',
  ];

  // Safe filtering and sorting logic
  const filtered = applications.filter((app) => {
    if (!app) return false;
    const orgName = (app.name_of_organization || '').toLowerCase();
    const appId = (app.id || '').toLowerCase();
    const contact = (app.contact_person_name || '').toLowerCase();
    const dist = (app.district || '').toLowerCase();
    const search = searchQuery.toLowerCase().trim();

    const matchesSearch =
      !search ||
      orgName.includes(search) ||
      appId.includes(search) ||
      contact.includes(search) ||
      dist.includes(search);

    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || app.priority === priorityFilter;
    const matchesState = stateFilter === 'All' || app.state === stateFilter;
    
    let matchesSupport = true;
    if (supportFilter !== 'All') {
      if (Array.isArray(app.support_type_seeking)) {
        matchesSupport = app.support_type_seeking.includes(supportFilter);
      } else if (typeof app.support_type_seeking === 'string') {
        matchesSupport = (app.support_type_seeking as string).includes(supportFilter);
      } else {
        matchesSupport = false;
      }
    }

    return matchesSearch && matchesStatus && matchesPriority && matchesState && matchesSupport;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'date_desc') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    if (sortBy === 'date_asc') {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    }
    if (sortBy === 'score_desc') {
      const scoreA = a.reviews?.total_score || 0;
      const scoreB = b.reviews?.total_score || 0;
      return scoreB - scoreA;
    }
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sorted.length / itemsPerPage) || 1;
  const paginated = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // CSV Export (Part 8.2 / 15)
  const exportToCSV = () => {
    const headers = [
      'Application ID',
      'Organisation Name',
      'Type',
      'Established',
      'Registration No',
      'State',
      'District',
      'Contact Person',
      'Phone',
      'Email',
      'Status',
      'Priority',
      'Review Score',
      'First Priority',
      'Submission Date (IST)',
    ];

    const rows = sorted.map((a) => [
      a.id,
      `"${a.name_of_organization.replace(/"/g, '""')}"`,
      a.type_of_organization,
      a.year_of_establishment,
      `"${a.registration_number}"`,
      a.state,
      a.district,
      `"${a.contact_person_name}"`,
      a.contact_number,
      a.organisation_email,
      a.status,
      a.priority,
      a.reviews?.total_score || 'Not Scored',
      `"${a.first_priority_support || ''}"`,
      new Date(a.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SEVA_Applications_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteConfirm = () => {
    if (!appToDelete) return;
    const orgName = appToDelete.name_of_organization;
    SevaStore.deleteApplication(appToDelete.id);
    setAppToDelete(null);
    onRefresh?.();
    setDeleteToast(`'${orgName}' चा रिजेक्ट झालेला अर्ज सिस्टीममधून यशस्वीरीत्या डिलिट करण्यात आला.`);
    setTimeout(() => setDeleteToast(null), 4000);
  };

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshToast, setRefreshToast] = useState<string | null>(null);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    if (isSupabaseConfigured()) {
      try {
        const remote = await fetchRemoteApplications();
        if (remote && remote.length > 0) {
          SevaStore.syncRemoteApplications(remote);
        }
      } catch (e) {
        console.warn('Manual remote sync failed:', e);
      }
    }
    onRefresh?.();
    setIsRefreshing(false);
    setRefreshToast(`डेटा रिफ्रेश झाला! एकूण ${applications.length} अर्ज नोंदवलेले आहेत.`);
    setTimeout(() => setRefreshToast(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {(deleteToast || refreshToast) && (
        <div className="p-3 bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-between">
          <span>{deleteToast || refreshToast}</span>
          <button
            onClick={() => {
              setDeleteToast(null);
              setRefreshToast(null);
            }}
            className="text-white hover:text-amber-200 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-stone-900 tracking-tight">
              Master Application Registry
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#0B6643] text-xs font-bold border border-emerald-300">
              {applications.length} अर्ज
            </span>
          </div>
          <p className="text-xs text-stone-500">
            Manage, triage, score, and transition grassroots organisation submissions
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="px-3 py-2 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs active:scale-[0.98] disabled:opacity-50"
            title="नवीन आलेले अर्ज व डेटा रिफ्रेश करा"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#0B6643] ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>डेटा रिफ्रेश (Refresh)</span>
          </button>

          <button
            onClick={() => setIsImportModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-[#184E34] hover:bg-[#0F3825] text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition-all shadow-xs active:scale-[0.98]"
            title="Excel किंवा CSV फाईलवरून संस्थांचा डेटा सिस्टीममध्ये अपलोड करा"
          >
            <UploadCloud className="w-4 h-4 text-emerald-300" />
            <span>Excel Sheet अपलोड करा</span>
          </button>

          <button
            onClick={exportToCSV}
            className="px-3 py-2 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
            title="विद्यमान सर्व अर्ज CSV किंवा Excel मध्ये डाउनलोड करा"
          >
            <FileSpreadsheet className="w-4 h-4 text-[#0B6643]" />
            <span>Export to CSV / Excel</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search by organisation name, application ID, district, or contact person..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
          />
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-stone-500 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2 rounded-lg border border-stone-200 bg-white"
            >
              <option value="All">All Statuses ({applications.length})</option>
              {allStatuses.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-500 mb-1">Priority</label>
            <select
              value={priorityFilter}
              onChange={(e) => {
                setPriorityFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2 rounded-lg border border-stone-200 bg-white"
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-500 mb-1">State</label>
            <select
              value={stateFilter}
              onChange={(e) => {
                setStateFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2 rounded-lg border border-stone-200 bg-white"
            >
              <option value="All">All States</option>
              {uniqueStates.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-500 mb-1">Support Type</label>
            <select
              value={supportFilter}
              onChange={(e) => {
                setSupportFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2 rounded-lg border border-stone-200 bg-white"
            >
              <option value="All">All Support Types</option>
              {supportTypes.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-500 mb-1">Sort Order</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full p-2 rounded-lg border border-stone-200 bg-white"
            >
              <option value="date_desc">Newest First</option>
              <option value="date_asc">Oldest First</option>
              <option value="score_desc">Highest Assessment Score</option>
            </select>
          </div>
        </div>
      </div>

      {/* 1. Mobile Cards View (Visible on Mobile & Tablet: Screen < 1024px) */}
      <div className="lg:hidden space-y-3">
        {paginated.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center text-stone-400">
            No applications found matching your criteria.
          </div>
        ) : (
          paginated.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-2xl border border-stone-200 p-4 space-y-3 shadow-xs"
            >
              {/* Top Row: ID, Date, and Status Badge */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold text-stone-900 bg-stone-100 px-2.5 py-1 rounded-md">
                  {app.id}
                </span>
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                  app.status === 'New Application' ? 'bg-amber-100 text-amber-900 border-amber-300' :
                  app.status === 'Approved' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                  app.status === 'Shortlisted' ? 'bg-purple-100 text-purple-800 border-purple-300' :
                  app.status === 'Meeting Scheduled' ? 'bg-indigo-100 text-indigo-800 border-indigo-300' :
                  app.status === 'Rejected' ? 'bg-red-100 text-red-800 border-red-300' :
                  'bg-stone-100 text-stone-700 border-stone-200'
                }`}>
                  {app.status}
                </span>
              </div>

              {/* Organisation Info */}
              <div>
                <h4 className="font-extrabold text-base text-stone-900 leading-tight">
                  {app.name_of_organization}
                </h4>
                <div className="text-xs text-stone-500 mt-0.5">
                  {app.type_of_organization} • {app.district}, {app.state}
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-stone-100">
                <div>
                  <span className="text-stone-400 block text-[10.5px]">Contact Person:</span>
                  <span className="font-semibold text-stone-800">{app.contact_person_name}</span>
                  <span className="block font-mono text-stone-500 text-[11px]">+91 {app.contact_number}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10.5px]">Priority &amp; Score:</span>
                  <span className="font-semibold text-stone-800">{app.priority} Priority</span>
                  {app.reviews?.total_score !== undefined && (
                    <span className="block font-bold text-[#0B6643]">{app.reviews.total_score}/100</span>
                  )}
                </div>
              </div>

              {/* Mobile Actions: Review & Delete */}
              <div className="pt-2 border-t border-stone-100 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onSelectApplication(app)}
                  className="flex-1 py-2 px-3 text-xs font-bold text-white bg-[#064E36] hover:bg-[#043E2B] rounded-xl text-center cursor-pointer shadow-xs active:scale-95"
                >
                  तपासा (Review)
                </button>

                {/* Prominent delete button on mobile */}
                {app.status === 'Rejected' ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setAppToDelete(app);
                    }}
                    className="flex-1 py-2 px-3 text-xs font-bold text-red-700 bg-red-100 hover:bg-red-200 border border-red-300 rounded-xl text-center cursor-pointer flex items-center justify-center gap-1.5 shadow-xs active:scale-95"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    <span>रिजेक्ट अर्ज डिलिट करा</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setAppToDelete(app);
                    }}
                    className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl border border-stone-200 cursor-pointer"
                    title="डिलिट करा"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 2. Desktop Table View (Visible on screens >= 1024px) */}
      <div className="hidden lg:block bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Application ID</th>
                <th className="py-3.5 px-4">Organisation</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Contact Person</th>
                <th className="py-3.5 px-4">First Priority</th>
                <th className="py-3.5 px-4">Priority &amp; Score</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Submitted (IST)</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-stone-400">
                    No applications found matching your criteria.
                  </td>
                </tr>
              ) : (
                paginated.map((app) => (
                  <tr key={app.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-stone-900 whitespace-nowrap">
                      {app.id}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-stone-900">{app.name_of_organization}</span>
                        {app.status === 'Rejected' && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setAppToDelete(app);
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-900 text-[11px] font-bold border border-red-300 transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
                            title="रिजेक्ट झालेली संस्था कायमची डिलिट करा (Delete rejected organisation)"
                          >
                            <Trash2 className="w-3 h-3 text-red-600" />
                            <span>डिलिट करा</span>
                          </button>
                        )}
                      </div>
                      <div className="text-[11px] text-stone-400">{app.type_of_organization} (Est. {app.year_of_establishment})</div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div>{app.district}</div>
                      <div className="text-[11px] text-stone-400">{app.state}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-stone-800">{app.contact_person_name}</div>
                      <div className="text-[11px] text-stone-500 font-mono">+91 {app.contact_number}</div>
                    </td>
                    <td className="py-3 px-4 max-w-[180px] truncate" title={app.first_priority_support}>
                      {app.first_priority_support || 'General Tech Support'}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          app.priority === 'High' ? 'bg-red-50 text-red-700 border border-red-200' :
                          app.priority === 'Medium' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          'bg-stone-100 text-stone-600'
                        }`}>
                          {app.priority}
                        </span>
                        {app.reviews?.total_score !== undefined && (
                          <span className="font-mono text-[11px] font-bold text-[#0B6643]">
                            {app.reviews.total_score}/100
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border ${
                        app.status === 'New Application' ? 'bg-amber-100 text-amber-900 border-amber-300 font-extrabold shadow-2xs' :
                        app.status === 'Approved' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                        app.status === 'Shortlisted' ? 'bg-purple-50 text-purple-800 border-purple-200' :
                        app.status === 'Meeting Scheduled' ? 'bg-indigo-50 text-indigo-800 border-indigo-200' :
                        app.status === 'Rejected' ? 'bg-red-50 text-red-800 border-red-200' :
                        'bg-stone-100 text-stone-700 border-stone-200'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-stone-500 font-mono text-[11px]">
                      {new Date(app.created_at).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onSelectApplication(app)}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-[#0B6643] hover:bg-[#064E36] rounded-md transition-colors cursor-pointer"
                        >
                          Review
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setAppToDelete(app);
                          }}
                          className="p-1.5 text-stone-400 hover:text-white hover:bg-red-600 rounded-md border border-stone-200 hover:border-red-600 transition-colors cursor-pointer"
                          title="हा अर्ज सिस्टीममधून कायमचा डिलिट करा (Delete Application)"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
          <div>
            Showing <span className="font-semibold">{paginated.length}</span> of{' '}
            <span className="font-semibold">{sorted.length}</span> applications
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-1 rounded border border-stone-300 bg-white disabled:opacity-40 cursor-pointer"
            >
              Previous
            </button>
            <span className="font-mono">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="px-3 py-1 rounded border border-stone-300 bg-white disabled:opacity-40 cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Excel Import Modal */}
      <ExcelImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImportSuccess={(count) => {
          onRefresh?.();
        }}
      />

      {/* Delete Confirmation Modal for Rejected Application */}
      {appToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto border border-red-200 shadow-xs">
              <Trash2 className="w-7 h-7" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-lg font-bold text-stone-900">
                रिजेक्ट झालेला अर्ज कायमचा डिलिट करा
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                तुम्हाला खात्री आहे का की तुम्ही <strong>'{appToDelete.name_of_organization}'</strong> (ID: {appToDelete.id}) या संस्थेचा अर्ज सिस्टीममधून कायमचा काढू इच्छिता?
              </p>
            </div>

            <div className="p-3.5 bg-red-50/80 rounded-2xl border border-red-200 text-xs text-red-800 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-red-900">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                <span>महत्त्वाची सूचना:</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                हा अर्ज डिलिट केल्यानंतर त्याचा सर्व डेटा, पुनरावलोकन आणि ऑडिट हिस्ट्री सिस्टीममधून कायमची नष्ट होईल व पूर्ववत करता येणार नाही.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setAppToDelete(null)}
                className="px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-bold transition-colors cursor-pointer"
              >
                रद्द करा (Cancel)
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5 active:scale-95"
              >
                <Trash2 className="w-4 h-4" />
                <span>होय, कायमचा डिलिट करा</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Success Toast */}
      {deleteToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-stone-700 animate-in fade-in slide-in-from-bottom-3 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{deleteToast}</span>
          <button
            onClick={() => setDeleteToast(null)}
            className="ml-2 text-stone-400 hover:text-white cursor-pointer font-bold"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};
