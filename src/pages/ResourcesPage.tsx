import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import {
  Search,
  BookOpen,
  Download,
  Calendar,
  Clock,
  Filter,
  X,
  FileText,
  CheckCircle,
  ExternalLink,
  FileSpreadsheet,
  Printer,
  Sparkles,
} from 'lucide-react';
import { SevaStore } from '../services/store';
import { ResourceItem } from '../types';

export const ResourcesPage: React.FC = () => {
  const [resources, setResources] = useState<ResourceItem[]>(SevaStore.getResources());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<ResourceItem | null>(null);
  const [downloadNotification, setDownloadNotification] = useState<string | null>(null);

  const categories = [
    'All',
    'MIS and Data Management',
    'Digital Security',
    'Documentation and Reporting',
    'NGO Website Development',
    'Digital Tools for NGOs',
    'Digital Communication',
    'Project Monitoring',
    'Capacity Building',
    'Technology for Rural Development',
  ];

  const filteredResources = resources.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Generates genuine, fully formatted Microsoft Excel (.xlsx) workbooks that open cleanly without errors
  const generateAndDownloadXlsx = (res: ResourceItem, filename: string) => {
    const workbook = XLSX.utils.book_new();

    if (filename.includes('SEVA_Standard_Reporting_Template') || res.id === 'res-3') {
      // Sheet 1: Monthly Progress Report
      const progressData = [
        ['SEVA TECHNOLOGY SUPPORT PROGRAMME - MONTHLY OUTPUT & ACTIVITY REPORT'],
        ['Organisation Name:', 'Partner Rural Development Organisation', 'Reporting Month:', 'November 2026'],
        ['Project Lead:', 'SEVA Technical Secretariat', 'Geographical Focus:', 'Yavatmal & Wardha Districts, Maharashtra'],
        [],
        [
          'Sr No',
          'Activity / Milestone Description',
          'Key Output Unit',
          'Monthly Target',
          'Actual Achieved',
          'Cumulative Till Date',
          'Target Date',
          'Actual Completion',
          'Variance (%)',
          'Status',
          'Responsible Officer',
          'Verification Evidence / Remarks',
        ],
        [
          1,
          'Baseline household socio-economic mapping in pilot villages',
          'Households Surveyed',
          250,
          250,
          250,
          '2026-11-10',
          '2026-11-09',
          '0%',
          'Completed',
          'Field Coordinator',
          'Geotagged survey submissions verified',
        ],
        [
          2,
          'Water conservation check-dam maintenance & water table logging',
          'Check-dams Logged',
          12,
          10,
          10,
          '2026-11-15',
          '2026-11-16',
          '-16.6%',
          'In Progress',
          'Jal-Duta Animators',
          '2 check-dams delayed due to road repairs',
        ],
        [
          3,
          'Rural women Self-Help Group (SHG) digital literacy workshop',
          'Women Trained',
          60,
          65,
          65,
          '2026-11-20',
          '2026-11-19',
          '+8.3%',
          'Completed',
          'Capacity Trainer',
          'Attendance sheets & photo logs submitted',
        ],
        [
          4,
          'Field animators smartphone MIS offline data entry setup',
          'Animators Equipped',
          8,
          8,
          8,
          '2026-11-25',
          '2026-11-24',
          '0%',
          'Completed',
          'Technical Lead',
          'All 8 devices tested in zero-connectivity village',
        ],
        [
          5,
          'Quarterly consolidated MIS reporting & donor progress brief',
          'Official Report',
          1,
          1,
          1,
          '2026-11-30',
          '2026-11-29',
          '0%',
          'Completed',
          'Project Director',
          'Audited milestone sign-off completed',
        ],
      ];

      const ws1 = XLSX.utils.aoa_to_sheet(progressData);
      ws1['!cols'] = [
        { wch: 8 },
        { wch: 38 },
        { wch: 20 },
        { wch: 14 },
        { wch: 14 },
        { wch: 18 },
        { wch: 14 },
        { wch: 16 },
        { wch: 14 },
        { wch: 14 },
        { wch: 22 },
        { wch: 36 },
      ];
      XLSX.utils.book_append_sheet(workbook, ws1, 'Monthly_Progress_Report');

      // Sheet 2: 70-30 Budget Expenditure Breakup
      const budgetData = [
        ['SEVA 70-30 COST SHARING MODEL - BUDGET UTILIZATION TRACKER'],
        ['Agreement Reference:', 'SEVA/TSP/2026/001', 'Programme Value:', '₹1,05,000'],
        ['SEVA Technical Support (70%):', '₹73,500', 'Partner Contribution (30%):', '₹31,500'],
        [],
        [
          'Sr No',
          'Budget Head / Component',
          'Approved Total (₹)',
          'SEVA Share 70% (₹)',
          'Partner Share 30% (₹)',
          'Expenditure to Date (₹)',
          'Balance Available (₹)',
          'Utilization Status',
        ],
        [1, 'Custom Mobile / Web MIS Application', 40000, 28000, 12000, 35000, 5000, 'On Track'],
        [2, 'Institutional Website & Knowledge Bank', 25000, 17500, 7500, 25000, 0, 'Completed'],
        [3, 'Staff & Animator Digital Capacity Building', 15000, 10500, 4500, 12000, 3000, 'In Progress'],
        [4, 'Documentation & Beneficiary Verification', 12000, 8400, 3600, 10000, 2000, 'In Progress'],
        [5, 'Server Setup, SSL & Annual Maintenance', 13000, 9100, 3900, 8000, 5000, 'Committed'],
        ['', 'TOTAL PROGRAMME BUDGET', 105000, 73500, 31500, 90000, 15000, 'Overall Healthy (85.7% Executed)'],
      ];

      const ws2 = XLSX.utils.aoa_to_sheet(budgetData);
      ws2['!cols'] = [
        { wch: 8 },
        { wch: 36 },
        { wch: 18 },
        { wch: 18 },
        { wch: 18 },
        { wch: 22 },
        { wch: 20 },
        { wch: 26 },
      ];
      XLSX.utils.book_append_sheet(workbook, ws2, '70_30_Budget_Utilization');
    } else if (filename.includes('Monitoring_Tracker') || res.id === 'res-7') {
      // Sheet 1: Project Monitoring Framework
      const monData = [
        ['SEVA RURAL PROJECT MONITORING & MILESTONE VERIFICATION FRAMEWORK'],
        ['Standardized 9-Stage Milestone Matrix for Grassroots Interventions'],
        [],
        [
          'Stage No',
          'Implementation Stage',
          'Core Deliverable & Evidence Required',
          'Planned Target Date',
          'Actual Completion',
          'Field Verification Method',
          'Sign-Off Authority',
          'Stage Status',
        ],
        [
          'Stage 1',
          'Needs Assessment & Workflow Mapping',
          'Catalog of paper registers & field animator interviews',
          'Day 15',
          'Day 14',
          'On-site field inspection',
          'SEVA Technical Lead',
          'Completed',
        ],
        [
          'Stage 2',
          'Requirement Finalisation & Database Schema',
          'Signed bilingual data dictionary (Marathi & English)',
          'Day 30',
          'Day 28',
          'Joint committee meeting',
          'Partner Executive Secretary',
          'Completed',
        ],
        [
          'Stage 3',
          'UI Wireframing & Accessibility Audit',
          'High-contrast prototype tested on basic Android phones',
          'Day 45',
          'Day 44',
          'Village animator user trial',
          'Lead Technologist',
          'Completed',
        ],
        [
          'Stage 4',
          'System Development & Offline Sync Implementation',
          'Functional web portal & local database sync build',
          'Day 70',
          'Day 68',
          'Staging server review',
          'Technical Reviewer',
          'In Progress',
        ],
        [
          'Stage 5',
          'Field Pilot Testing & Data Stress Verification',
          'Simulated 500-household survey in zero-network village',
          'Day 85',
          'Pending',
          'Field stress test in 3 villages',
          'Block Coordinator',
          'Scheduled',
        ],
        [
          'Stage 6',
          'Staff Training & Capacity Building Workshops',
          '2-day practical workshop for all field animators',
          'Day 100',
          'Pending',
          'Post-training competency check',
          'Capacity Trainer',
          'Scheduled',
        ],
        [
          'Stage 7',
          'Live Deployment & Historical Data Migration',
          'Migration of historical paper notebooks into database',
          'Day 110',
          'Pending',
          '100% reconciliation audit',
          'Partner M&E Officer',
          'Scheduled',
        ],
        [
          'Stage 8',
          'Complete Handover & Source Credentials',
          'Transfer of admin credentials, database backup & code',
          'Day 120',
          'Pending',
          'Official Handover Certificate',
          'SEVA Director',
          'Scheduled',
        ],
        [
          'Stage 9',
          'Follow-up, Evaluation & Quarterly Health Check',
          'Quarterly server and data integrity health report',
          'Day 210',
          'Pending',
          'Quarterly review meeting',
          'Operations Desk',
          'Scheduled',
        ],
      ];

      const ws = XLSX.utils.aoa_to_sheet(monData);
      ws['!cols'] = [
        { wch: 10 },
        { wch: 34 },
        { wch: 42 },
        { wch: 18 },
        { wch: 18 },
        { wch: 28 },
        { wch: 26 },
        { wch: 16 },
      ];
      XLSX.utils.book_append_sheet(workbook, ws, 'Milestone_Tracker');
    } else if (filename.includes('Digital_Communication') || res.id === 'res-6') {
      // Sheet 1: Editorial Calendar
      const commData = [
        ['GRASSROOTS DIGITAL COMMUNICATION & SOCIAL MEDIA TOOLKIT'],
        ['30-Day Content Planner for Rural Community Storytelling'],
        [],
        [
          'Week',
          'Date',
          'Channel',
          'Story Hook / Theme',
          'Target Audience',
          'Vernacular Language',
          'Visual Asset Needed',
          'Storyteller Responsible',
          'Status',
        ],
        [
          'Week 1',
          '05 Nov 2026',
          'WhatsApp Community',
          'Farmer Testimonial: Traditional Seed Preservation Results',
          'Village Farmers & SHG Leaders',
          'Marathi',
          'Field photo with farmer holding harvest',
          'Block Animator',
          'Published',
        ],
        [
          'Week 1',
          '08 Nov 2026',
          'Institutional Website',
          'Quarterly Impact Update: 34 Villages Water Table Report',
          'Donors, CSR Partners, Trustees',
          'Bilingual (English & Marathi)',
          'Infographic chart of water levels',
          'Lead Coordinator',
          'Published',
        ],
        [
          'Week 2',
          '12 Nov 2026',
          'Facebook / LinkedIn',
          'Women in Governance: Gram Panchayat Resolution Case Study',
          'Development sector, Government Officers',
          'English',
          'Photo of Mahila Gram Sabha in session',
          'Research Associate',
          'Approved',
        ],
        [
          'Week 2',
          '15 Nov 2026',
          'Donor Newsletter',
          'Quarterly Transparency Bulletin: Audited Utilization',
          'Institutional Philanthropies',
          'English',
          'Summary graphics of 70-30 model',
          'Director Desk',
          'Drafting',
        ],
        [
          'Week 3',
          '20 Nov 2026',
          'WhatsApp Community',
          'Weather & Organic Pest Alert: Winter Crop Advisory',
          'Local Farmer Producer Groups',
          'Marathi',
          'Short 1-minute vernacular voice note',
          'Agri Specialist',
          'Scheduled',
        ],
      ];

      const ws = XLSX.utils.aoa_to_sheet(commData);
      ws['!cols'] = [
        { wch: 10 },
        { wch: 14 },
        { wch: 22 },
        { wch: 38 },
        { wch: 26 },
        { wch: 20 },
        { wch: 32 },
        { wch: 22 },
        { wch: 14 },
      ];
      XLSX.utils.book_append_sheet(workbook, ws, 'Editorial_Calendar');
    } else if (filename.includes('Appropriate_Rural_Technology') || res.id === 'res-9') {
      // Sheet 1: Appropriate Technology Matrix
      const techData = [
        ['APPROPRIATE RURAL TECHNOLOGY SELECTION & FEASIBILITY MATRIX'],
        ['Decision Guide for Resource-Constrained Grassroots Organisations'],
        [],
        [
          'Functional Area',
          'Common Village Challenge',
          'Recommended Open / Low-Cost Tool',
          'Offline Capable?',
          'Hardware Needed',
          'Connectivity Requirement',
          'Est. Initial Cost (₹)',
          'Staff Learning Curve',
          'SEVA Support Available',
        ],
        [
          'Beneficiary Data Collection',
          'Zero cellular signal in remote hamlets',
          'Progressive Web App (PWA) / ODK Collect',
          'Yes (100% Offline)',
          'Basic Android smartphone (≥ 3GB RAM)',
          'Periodic sync once per week',
          '₹0 (Open Source)',
          'Low (2 days practical training)',
          'Yes (Included in 70-30 model)',
        ],
        [
          'Water Table / Crop GPS Mapping',
          'Paper maps getting ruined in rains',
          'QGIS Open Source & Geotagged Camera',
          'Yes',
          'Field smartphone with GPS chip',
          'GPS satellites only (no cellular data needed)',
          '₹0 (Open Source)',
          'Medium (3 days training)',
          'Yes (Supported)',
        ],
        [
          'SHG & Micro-finance Accounting',
          'Notebook registers prone to errors',
          'Standardized Offline Excel / LibreOffice Sheet',
          'Yes',
          'Shared office laptop or tablet',
          'Zero internet required',
          '₹0',
          'Low',
          'Yes (Included)',
        ],
        [
          'Institutional Website & Credibility',
          'No digital showcase for CSR donors',
          'Static Web Architecture (Hosted on GitHub Pages / Cloud)',
          'No (Web viewing)',
          'Desktop browser / Mobile responsive',
          'Standard web hosting (₹1,500/yr domain)',
          '₹1,500 - ₹3,000 / year',
          'Low (Simple markdown or CMS)',
          'Yes (Complete setup & training)',
        ],
      ];

      const ws = XLSX.utils.aoa_to_sheet(techData);
      ws['!cols'] = [
        { wch: 24 },
        { wch: 32 },
        { wch: 32 },
        { wch: 18 },
        { wch: 30 },
        { wch: 28 },
        { wch: 18 },
        { wch: 24 },
        { wch: 26 },
      ];
      XLSX.utils.book_append_sheet(workbook, ws, 'Tech_Selection_Matrix');
    } else {
      // Generic structured spreadsheet for any other workbook
      const genericData = [
        ['SEVA KNOWLEDGE CENTRE - RESOURCE WORKSHEET'],
        ['Title:', res.title],
        ['Category:', res.category, 'Published Date:', res.published_date],
        ['Format:', res.format, 'Estimated Read Time:', res.read_time],
        [],
        ['Executive Summary:'],
        [res.summary],
        [],
        ['Complete Methodological Framework & Instructions:'],
        ...res.content.split('\n').map((line) => [line]),
        [],
        ['Sustainable Ecology & Village Advancement (SEVA) - Ralegaon, Yavatmal, Maharashtra'],
        ['Official Portal: https://sevavillage.org | Contact: seva.ecology@gmail.com'],
      ];

      const ws = XLSX.utils.aoa_to_sheet(genericData);
      ws['!cols'] = [{ wch: 20 }, { wch: 80 }];
      XLSX.utils.book_append_sheet(workbook, ws, 'Resource_Guide');
    }

    // Write file using genuine XLSX format
    XLSX.writeFile(workbook, filename);
  };

  // Generates genuine, beautifully formatted Microsoft Word (.doc) documents
  const generateAndDownloadWord = (res: ResourceItem, filename: string) => {
    const docHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${res.title}</title>
        <style>
          @page { size: A4; margin: 2.2cm; }
          body { font-family: 'Calibri', 'Segoe UI', Arial, sans-serif; font-size: 11pt; line-height: 1.5; color: #172B24; }
          .header-box { border-bottom: 2pt solid #184E34; padding-bottom: 8pt; margin-bottom: 14pt; }
          h1 { font-size: 16pt; font-weight: bold; color: #143E29; margin-bottom: 4pt; }
          .meta { font-size: 9.5pt; color: #555555; margin-bottom: 12pt; }
          .summary-box { background-color: #F0FDF4; border-left: 3pt solid #184E34; padding: 10pt 14pt; margin: 12pt 0; font-style: italic; }
          h2 { font-size: 13pt; font-weight: bold; color: #0F3825; border-bottom: 1pt solid #D1D5DB; padding-bottom: 2pt; margin-top: 16pt; margin-bottom: 6pt; }
          h3 { font-size: 11.5pt; font-weight: bold; color: #184E34; margin-top: 12pt; margin-bottom: 4pt; }
          p { margin-bottom: 8pt; }
          ul, ol { margin-top: 4pt; margin-bottom: 10pt; padding-left: 20pt; }
          li { margin-bottom: 4pt; }
          table { width: 100%; border-collapse: collapse; margin: 12pt 0; font-size: 10pt; }
          th, td { border: 1pt solid #CBD5E1; padding: 6pt 8pt; text-align: left; vertical-align: top; }
          th { background-color: #184E34; color: #ffffff; font-weight: bold; }
          .footer-box { border-top: 1pt solid #E2E8F0; margin-top: 24pt; padding-top: 10pt; font-size: 9pt; color: #64748B; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header-box">
          <div style="font-size:14pt; font-weight:bold; color:#184E34; text-transform:uppercase;">SEVA – Sustainable Ecology &amp; Village Advancement</div>
          <div style="font-size:9.5pt; color:#0B6643; font-weight:bold;">An Initiative of Sarathi Sanstha · Ralegaon, Yavatmal, Maharashtra</div>
        </div>

        <h1>${res.title}</h1>
        <div class="meta">
          <strong>Category:</strong> ${res.category} | 
          <strong>Format:</strong> ${res.format} | 
          <strong>Published:</strong> ${res.published_date} | 
          <strong>Estimated Reading Time:</strong> ${res.read_time}
        </div>

        <div class="summary-box">
          <strong>Executive Summary:</strong><br/>
          ${res.summary}
        </div>

        <h2>Comprehensive Implementation Guide &amp; Field Modules</h2>
        <div>
          ${res.content
            .split('\n\n')
            .map((para) => `<p>${para.replace(/\n/g, '<br/>')}</p>`)
            .join('')}
        </div>

        <h2>Standard Institutional Checkpoints</h2>
        <ul>
          <li><strong>Vernacular Alignment:</strong> Ensure all data inputs, field terminology, and confirmation prompts match the local spoken language (Marathi/Hindi).</li>
          <li><strong>Data Ethics &amp; Consent:</strong> Collect only indicators directly relevant to community decisions or statutory compliance. Always obtain oral consent from community participants.</li>
          <li><strong>Offline Resilience:</strong> Assume field coordinators will work with zero cellular network. Synchronize data only when returning to base camp or block office.</li>
          <li><strong>70-30 Technical Support Model:</strong> Under SEVA's programme, 70% of technology architecture, software development, and capacity building is subsidized by SEVA, while the partner organisation contributes 30% to ensure sustainable local ownership.</li>
        </ul>

        <div class="footer-box">
          Sustainable Ecology &amp; Village Advancement (SEVA) · 31 B, Jalka, Ralegaon, Dist. Yavatmal, Maharashtra – 445402<br/>
          Contact: +91 8999469974 | Email: seva.ecology@gmail.com | Website: https://sevavillage.org
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([docHtml], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownload = (res: ResourceItem) => {
    let filename = res.download_name || `${res.title.replace(/\s+/g, '_')}.xlsx`;

    // Dispatch to appropriate format generator
    if (filename.toLowerCase().endsWith('.xlsx') || res.format === 'Template' || res.format === 'Toolkit') {
      if (!filename.toLowerCase().endsWith('.xlsx')) {
        filename = `${filename.replace(/\.[^/.]+$/, '')}.xlsx`;
      }
      generateAndDownloadXlsx(res, filename);
    } else {
      if (!filename.toLowerCase().endsWith('.doc') && !filename.toLowerCase().endsWith('.docx')) {
        filename = `${filename.replace(/\.[^/.]+$/, '')}.doc`;
      }
      generateAndDownloadWord(res, filename);
    }

    setDownloadNotification(`डाउनलोड यशस्वी: ${filename}`);
    setTimeout(() => setDownloadNotification(null), 4000);
  };

  return (
    <div className="space-y-12 py-8 pb-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold tracking-widest text-[#184E34] uppercase">
            Open Access Repository
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#143E29] leading-[1.15]">
            Resources &amp; Knowledge Centre
          </h1>
          <p className="text-lg sm:text-xl text-[#254636] leading-[1.7] font-normal">
            Practical guides, downloadable MIS templates, digital security checklists, and documentation frameworks created specifically for grassroots development organisations in India.
          </p>
        </div>
      </section>

      {/* Search and Category Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-5">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search guides, templates, and methodologies (e.g. MIS, Security, Reporting, Communication, Monitoring)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6643]/30 focus:border-[#0B6643]"
            />
          </div>

          {/* Categories Tab Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#184E34] text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Download Alert Toast */}
      {downloadNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#184E34] text-white px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-3 border border-emerald-400 animate-in slide-in-from-bottom-2">
          <CheckCircle className="w-5 h-5 text-emerald-300 shrink-0" />
          <span className="text-sm font-semibold">{downloadNotification}</span>
        </div>
      )}

      {/* Resources Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredResources.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-3">
            <p className="text-stone-500 text-sm">No resources found matching your search criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="text-xs font-bold text-[#0B6643] underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((item) => {
              const isExcel = item.download_name?.toLowerCase().endsWith('.xlsx') || item.format === 'Template' || item.format === 'Toolkit';
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between hover:border-emerald-400 hover:shadow-md transition-all space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-md border flex items-center gap-1.5 ${
                        isExcel
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-blue-50 text-blue-800 border-blue-200'
                      }`}>
                        {isExcel ? <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" /> : <FileText className="w-3.5 h-3.5 text-blue-700" />}
                        <span>{item.format} ({isExcel ? '.xlsx' : '.doc'})</span>
                      </span>
                      <span className="text-xs text-stone-400 flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{item.read_time}</span>
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-[#0B6643] uppercase tracking-wider block">
                        {item.category}
                      </span>
                      <h2 className="text-lg font-bold text-[#143E29] tracking-tight mt-1 line-clamp-2">
                        {item.title}
                      </h2>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setActiveArticle(item)}
                      className="text-xs font-bold text-[#0B6643] hover:text-[#064E36] transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span>Read Guide</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleDownload(item)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#184E34] bg-emerald-50 hover:bg-[#184E34] hover:text-white border border-emerald-200 transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
                      title={`Download ${item.download_name || 'Resource'}`}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{isExcel ? 'Download Excel' : 'Download Word'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[88vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative space-y-6 border border-stone-200 animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1 rounded-md cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#0B6643] uppercase tracking-wider">
                {activeArticle.category} · {activeArticle.format}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#143E29]">
                {activeArticle.title}
              </h2>
              <div className="flex items-center gap-4 text-xs text-stone-500 pt-1 font-medium">
                <span>Published: {activeArticle.published_date}</span>
                <span>·</span>
                <span>{activeArticle.read_time}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-xs sm:text-sm text-[#143E29] font-medium leading-relaxed">
              {activeArticle.summary}
            </div>

            <div className="prose prose-sm max-w-none text-stone-800 leading-relaxed whitespace-pre-line text-sm border-t border-stone-100 pt-4">
              {activeArticle.content}
            </div>

            <div className="pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-stone-500 font-medium">
                Provided by SEVA Rural Digital Empowerment Desk · An Initiative of Sarathi Sanstha
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-2 text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Print this guide or save as PDF via browser print"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  onClick={() => handleDownload(activeArticle)}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#184E34] hover:bg-[#0F3825] rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-sm active:scale-[0.98]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Resource File</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
