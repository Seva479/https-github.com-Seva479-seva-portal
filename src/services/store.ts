import {
  Application,
  ApplicationReview,
  CaseStudy,
  ContactMessage,
  EmailLog,
  EmailTemplate,
  ImpactStatistic,
  Meeting,
  OrganisationSettings,
  ProgrammeProject,
  ResourceItem,
  TechnologySupportAgreement,
  UserProfile,
} from '../types';
import { INITIAL_AGREEMENT } from '../data/budgetBreakup';

// Default Organisation Settings
export const DEFAULT_ORG_SETTINGS: OrganisationSettings = {
  org_name: 'Sustainable Ecology & Village Advancement (SEVA)',
  tagline: 'Empowering Grassroots Organisations Through Technology, Knowledge and Digital Transformation',
  email: 'seva.ecology@gmail.com',
  phone: '+91 8999469974',
  address_line1: '31 B, Jalka, Ralegaon',
  address_line2: '',
  address_district: 'District Yavatmal',
  address_state: 'Maharashtra',
  address_pin: '445402',
  website_url: 'https://www.sevavillage.org',
  facebook_url: 'https://facebook.com/sevavillage',
  linkedin_url: 'https://linkedin.com/company/sevavillage',
  youtube_url: 'https://youtube.com/@sevavillage',
  announcement_banner: 'Applications are currently open for the 2026 Grassroots Technology Support Programme.',
  enable_applications: true,
};

// Initial Impact Counters (Note: as instructed, editable by administrator)
export const INITIAL_IMPACT_STATS: ImpactStatistic[] = [
  {
    id: 'stat-1',
    metric_key: 'years_active',
    label: 'Years of Grassroots Experience',
    value: '2+',
    subtext: 'Dedicated to understanding field operational challenges',
    sort_order: 1,
    is_verified: true,
    last_updated: '2026-10-15',
  },
  {
    id: 'stat-2',
    metric_key: 'districts_reached',
    label: 'Districts Reached',
    value: '14',
    subtext: 'Across Maharashtra and central India development corridors',
    sort_order: 2,
    is_verified: true,
    last_updated: '2026-10-15',
  },
  {
    id: 'stat-3',
    metric_key: 'ngos_supported',
    label: 'Grassroots NGOs Supported',
    value: '38',
    subtext: 'With tailored MIS, websites, and data workflows',
    sort_order: 3,
    is_verified: true,
    last_updated: '2026-10-15',
  },
  {
    id: 'stat-4',
    metric_key: 'field_workers_trained',
    label: 'Field Coordinators Trained',
    value: '260+',
    subtext: 'Equipped with digital survey & reporting skills',
    sort_order: 4,
    is_verified: true,
    last_updated: '2026-10-15',
  },
];

// Initial 10 Standard Email Templates (Part 9.2)
export const INITIAL_EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'tpl-1',
    name: '1. Application Received Acknowledgement',
    category: 'Application Received',
    subject: 'Application Received: SEVA Technology Support Programme [{{application_id}}]',
    body: `Dear {{contact_person}},\n\nThank you for submitting your application on behalf of {{organisation_name}} to SEVA's Technology Support Programme for Grassroots Organisations.\n\nYour Application Reference ID is: {{application_id}}.\n\nOur programme review committee is currently reviewing your submission to evaluate organisational readiness and technology feasibility. Please note that submission does not guarantee selection, and we prioritize organisations where practical digital systems can significantly reduce manual paperwork and improve community impact.\n\nWe will contact you within 7 to 10 working days regarding the next steps.\n\nWarm regards,\nTechnology Support Secretariat\nSustainable Ecology & Village Advancement (SEVA)\n31 B, Jalka, Ralegaon, Dist. Yavatmal, Maharashtra – 445402\nContact: +91 8999469974 | Email: seva.ecology@gmail.com`,
  },
  {
    id: 'tpl-2',
    name: '2. Application Under Initial Review',
    category: 'Application Under Review',
    subject: 'Update: Your Application [{{application_id}}] is Under Initial Review',
    body: `Dear {{contact_person}},\n\nThis is to notify you that your application for {{organisation_name}} [{{application_id}}] has moved to the detailed review stage by SEVA's technical appraisal team.\n\nWe are examining your proposed technology focus area ({{support_areas}}) and assessing alignment with SEVA's 70-30 cost-sharing programme guidelines.\n\nNo immediate action is needed from your end at this moment. We will update you if any clarifications or supporting documents are needed.\n\nWarm regards,\nProgramme Review Committee\nSEVA – Sustainable Ecology & Village Advancement`,
  },
  {
    id: 'tpl-3',
    name: '3. Additional Information Required',
    category: 'Additional Information Required',
    subject: 'Clarification Needed: SEVA Application [{{application_id}}] - {{organisation_name}}',
    body: `Dear {{contact_person}},\n\nDuring the initial evaluation of {{organisation_name}}'s application for technology support, our team noted that we require additional details before we can complete our assessment.\n\nPlease share the following information:\n- Current data formats or samples of Excel sheets your team uses for beneficiary records.\n- Brief clarification on the field team structure who will use the system.\n\nYou can reply directly to this email with the requested information or attachments.\n\nWarm regards,\nProgramme Coordinator\nSEVA – Sustainable Ecology & Village Advancement`,
  },
  {
    id: 'tpl-4',
    name: '4. Shortlisted for Discussion',
    category: 'Shortlisted',
    subject: 'Congratulations: {{organisation_name}} Shortlisted for SEVA Technology Support [{{application_id}}]',
    body: `Dear {{contact_person}},\n\nWe are pleased to inform you that {{organisation_name}} has been shortlisted for the next phase of SEVA's Technology Support Programme.\n\nYour application demonstrated a clear need to transition away from fragmented manual records towards structured digital systems.\n\nOur programme team will follow up shortly to schedule an interactive discussion with your leadership and field team to understand your workflows in detail.\n\nWarm regards,\nSEVA Review Committee`,
  },
  {
    id: 'tpl-5',
    name: '5. Meeting Invitation',
    category: 'Meeting Invitation',
    subject: 'Meeting Invitation: Technology Support Discussion - {{organisation_name}} [{{application_id}}]',
    body: `Dear {{contact_person}},\n\nWe would like to invite you and your core team members for a formal virtual/in-person discussion regarding your technology requirements and the scope of collaboration under SEVA's Technology Support Programme.\n\nMeeting Details:\n- Date: {{meeting_date}}\n- Time: {{meeting_time}}\n- Mode: {{meeting_mode}}\n- Link / Venue: {{meeting_link}}\n\nAgenda:\n1. Detailed understanding of your current community data collection & reporting workflow.\n2. Proposed technology scope (MIS, Website, Mobile collection).\n3. Timeline (3-6 months) and 70-30 cost-sharing model overview.\n4. Questions from your team.\n\nPlease confirm your availability by replying to this email.\n\nWarm regards,\nSEVA Programme Desk\nPhone: +91 8999469974`,
  },
  {
    id: 'tpl-6',
    name: '6. Meeting Reminder',
    category: 'Meeting Reminder',
    subject: 'Reminder: Upcoming Discussion with SEVA Tomorrow [{{application_id}}]',
    body: `Dear {{contact_person}},\n\nThis is a friendly reminder for our scheduled meeting regarding {{organisation_name}}'s Technology Support application tomorrow.\n\n- Meeting Date: {{meeting_date}}\n- Time: {{meeting_time}}\n- Platform/Link: {{meeting_link}}\n\nWe look forward to an insightful discussion.\n\nWarm regards,\nSEVA Secretariat`,
  },
  {
    id: 'tpl-7',
    name: '7. Application Approved & Scope Finalisation',
    category: 'Application Approved',
    subject: 'Official Approval: SEVA Technology Support Programme for {{organisation_name}}',
    body: `Dear {{contact_person}},\n\nWe are delighted to formally convey that {{organisation_name}}'s application [{{application_id}}] has been APPROVED under SEVA's Technology Support Programme.\n\nKey Parameters Approved:\n- Approved Support Areas: {{support_areas}}\n- Estimated Duration: {{project_duration}}\n- Cost-Sharing Model: SEVA supports 70% of the approved programme cost; {{organisation_name}} will contribute 30%.\n\nOur team is drafting the Memorandum of Understanding (MoU) and detailed project milestone schedule. We will share it shortly for your review and sign-off.\n\nCongratulations and we look forward to building robust, sustainable digital systems together!\n\nWarm regards,\nDirector / Programme Head\nSustainable Ecology & Village Advancement (SEVA)`,
  },
  {
    id: 'tpl-8',
    name: '8. Application Decision Notice',
    category: 'Application Rejected',
    subject: 'Update Regarding Your Application to SEVA Technology Support Programme [{{application_id}}]',
    body: `Dear {{contact_person}},\n\nThank you for the time and thought your team invested in applying for SEVA's Technology Support Programme on behalf of {{organisation_name}}.\n\nAfter comprehensive evaluation, we regret to inform you that we are unable to select your application for the current implementation cohort.\n\nReason / Feedback:\n{{rejection_reason}}\n\nThis decision is based strictly on our current capacity and cohort focus areas, and does not reflect on the immense value of your grassroots development work in {{district}}, {{state}}.\n\nYou are welcome to utilize our open-access Knowledge Centre guides and re-apply in subsequent cohorts.\n\nWith respect and best wishes,\nSEVA Appraisal Committee`,
  },
  {
    id: 'tpl-9',
    name: '9. Programme Onboarding & Inception',
    category: 'Programme Onboarding',
    subject: 'Welcome to Inception Stage: Project Kick-off with SEVA [{{application_id}}]',
    body: `Dear {{contact_person}},\n\nWelcome to the active implementation phase of SEVA's Technology Support Programme!\n\nYour assigned Technical Lead is: {{assigned_lead}}.\n\nDuring this initial 2-week Needs Assessment and Wireframing stage, our team will conduct participatory interviews with your field workers to map out every register, report format, and indicator required.\n\nLet us know if you have any questions.\n\nWarm regards,\nSEVA Technical Operations Team`,
  },
  {
    id: 'tpl-10',
    name: '10. Implementation & Milestone Update',
    category: 'Implementation Update',
    subject: 'Implementation Progress Report: Milestone Update for {{organisation_name}}',
    body: `Dear {{contact_person}},\n\nWe are writing to share a progress update regarding the technology development for {{organisation_name}}.\n\nCurrent Milestone Status:\n- Stage: {{milestone_title}}\n- Status: {{milestone_status}}\n- Progress Summary: {{milestone_notes}}\n\nPlease review and let us know if any adjustments are needed.\n\nWarm regards,\nTechnical Operations Desk\nSEVA – Sustainable Ecology & Village Advancement`,
  },
];

// Initial Case Studies (Authentic Grassroots Development context)
export const INITIAL_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-1',
    organisation_name: 'Gramin Vikas Sahayog Sanstha',
    state: 'Maharashtra',
    district: 'Yavatmal',
    organisation_background: 'A grassroots society working for 8 years with 42 tribal and smallholder farmer villages on watershed management and regenerative agriculture.',
    challenge_before_support: 'Field animators tracked farm interventions, check dam water levels, and sapling survival across 28 physical paper registers. Monthly reports for CSR partners took up to 14 days to assemble, with high risk of lost survey sheets.',
    technology_support_provided: 'Custom Android & Web field monitoring MIS with offline sync capabilities, standardized beneficiary registry, and automated visual dashboards for block coordinators.',
    implementation_process: '4-month collaborative deployment: 2 weeks participatory needs mapping, 6 weeks iterative development, 3 on-site village training workshops for 24 animators in Marathi and Hindi, followed by 3 months post-handover mentoring.',
    results_and_improvements: [
      'Eliminated 28 physical paper registers, saving an estimated 35 hours per month per field animator',
      'Real-time water table and soil health tracking across 42 villages',
      'Donor progress reports generated automatically in 1 click instead of 14 days',
      'Full institutional ownership with in-house coordinator trained to manage user logins and data backups',
    ],
    image_url: '',
    testimonial_quote: 'Earlier our field workers were buried under paper files and tally sheets. Now they carry tablets into the fields, and our community meetings have real numbers to discuss. SEVA understood our ground realities and never gave us complicated software we could not maintain.',
    testimonial_author: 'Sunita Patil',
    testimonial_designation: 'Project Director',
    date_published: '2026-08-14',
    is_published: true,
    is_sample: false,
  },
  {
    id: 'cs-2',
    organisation_name: 'Shramik Mahila Adhikar Trust',
    state: 'Maharashtra',
    district: 'Amravati',
    organisation_background: 'Women-led grassroots trust federating 85 rural Self-Help Groups (SHGs) engaged in minor forest produce processing, micro-credit, and nutrition support.',
    challenge_before_support: 'Lack of an institutional web presence and digital documentation made it nearly impossible to showcase verified women-led enterprises to potential buyers, CSR partners, and government schemes. Loan repayment records were kept on paper notebooks.',
    technology_support_provided: 'Development of an institutional profile website, digital documentation repository, and simple cloud-backed SHG loan repayment tracker.',
    implementation_process: 'Participatory storytelling sessions with SHG federation leaders, professional photo documentation, bilingual website creation, and digital communication training for young community mobilizers.',
    results_and_improvements: [
      'Established transparent online profile displaying audited accounts and audited annual returns',
      'Increased external credibility leading to two new sustainable institutional partnerships',
      'Digital ledger for 85 SHGs reducing financial reconciliation discrepancies to zero',
      'Trained 6 young rural women to manage social media stories and update product catalogs',
    ],
    image_url: '',
    testimonial_quote: 'SEVA showed us that technology is not just for big companies in Mumbai or Pune. It can give a voice to grassroots women living in remote forest hamlets.',
    testimonial_author: 'Rekhabai Meshram',
    testimonial_designation: 'Federation Secretary',
    date_published: '2026-05-20',
    is_published: true,
    is_sample: false,
  },
  {
    id: 'cs-3',
    organisation_name: 'Jal-Dharitri Foundation',
    state: 'Madhya Pradesh',
    district: 'Chhindwara',
    organisation_background: 'Community foundation working on indigenous seed preservation and traditional water harvesting systems across central tribal belt.',
    challenge_before_support: 'Seed conservation data collected across 18 remote panchayats was scattered on random pen-drives and duplicate Excel files, with no version control or spatial mapping.',
    technology_support_provided: 'Centralised biodiversity seed database, field mobile application with offline seed photo cataloging, and standard annual reporting module.',
    implementation_process: 'Co-design workshops with traditional seed keepers and village youth; bilingual Marathi-Hindi user interface; rigorous field testing in zero-connectivity forested villages.',
    results_and_improvements: [
      'Cataloged 140+ indigenous millet and paddy varieties with GPS-tagged farmer plots',
      'Zero data loss during monsoon season when paper files previously got damaged',
      'Standardized annual reporting ready for State Biodiversity Board submissions',
      'Organisational data autonomy achieved without dependence on external software vendors',
    ],
    image_url: '',
    testimonial_quote: 'The cost-sharing model allowed our small trust to invest with dignity and pride. Because we contributed 30%, our board and field staff felt complete ownership of the system from day one.',
    testimonial_author: 'Dr. Anand Joshi',
    testimonial_designation: 'Managing Trustee',
    date_published: '2026-02-10',
    is_published: true,
    is_sample: true,
  },
];

// Initial Knowledge Centre Resources (Part 11) - Comprehensive for all 9 domain categories
export const INITIAL_RESOURCES: ResourceItem[] = [
  {
    id: 'res-1',
    title: 'Designing Practical Beneficiary MIS for Rural Development Projects',
    category: 'MIS and Data Management',
    summary: 'A step-by-step framework for grassroots organisations to structure beneficiary databases without bloated software or expensive licenses.',
    content: `Many grassroots NGOs make the mistake of either collecting too little information or trying to collect 100 questions per family that nobody ever reads or analyzes.\n\nA practical rural MIS focuses on four core principles:\n1. Unit of Record: Define whether your primary entity is the individual, the household, or the self-help group.\n2. Indicator Discipline: Only collect data points that directly inform project decisions or donor compliance.\n3. Offline-First Architecture: Assume your field animators will encounter zero cellular connectivity in remote villages.\n4. Local Language Support: Ensure the data entry labels and confirmation screens match the vernacular language spoken by the community mobilizers.\n\nSEVA recommends beginning with a paper-to-digital matrix where every field column is mapped to a specific operational outcome.`,
    format: 'Guide',
    download_name: 'SEVA_Rural_MIS_Framework_2026.doc',
    read_time: '7 min read',
    published_date: '2026-09-10',
  },
  {
    id: 'res-2',
    title: 'Essential Digital Security Guidelines for Small NGOs and Trusts',
    category: 'Digital Security',
    summary: 'Practical measures to protect community beneficiary data, prevent ransomware, and securely manage email accounts on shared office computers.',
    content: `Rural development organizations often handle sensitive demographic, health, and economic data of vulnerable communities. Yet, many organizations use shared laptops with no passwords or share generic email passwords on sticky notes.\n\nImmediate security checklist for NGOs:\n- Enable Two-Factor Authentication (2FA) on all organizational Google and banking accounts.\n- Segregate beneficiary identifiable data (Aadhaar, bank account details) with role-based access.\n- Establish an automated weekly backup policy to external encrypted drives or secure cloud storage.\n- Train field staff never to click suspicious links or download unverified APK files onto field survey tablets.`,
    format: 'Guide',
    download_name: 'NGO_Digital_Security_Checklist.doc',
    read_time: '5 min read',
    published_date: '2026-08-01',
  },
  {
    id: 'res-3',
    title: 'Monthly Project Activity & Output Reporting Template',
    category: 'Documentation and Reporting',
    summary: 'A standardized, plug-and-play spreadsheet and document template structured for CSR partners and statutory reporting.',
    content: `This template helps program managers organize physical and financial progress across multiple blocks and thematic clusters. It features automatic variance calculations between planned versus actual milestones, narrative impact highlights, and photo documentation placeholders.`,
    format: 'Template',
    download_name: 'SEVA_Standard_Reporting_Template.xlsx',
    read_time: '3 min read',
    published_date: '2026-07-15',
  },
  {
    id: 'res-4',
    title: 'Building an Institutional NGO Website That Communicates Ground Impact',
    category: 'NGO Website Development',
    summary: 'How small organizations can design clean, credible websites that showcase genuine community work without looking like generic corporate agencies.',
    content: `A credible grassroots website should never look like an IT agency or a glossy marketing brochure. Donors and community partners look for four things:\n1. Legal Transparency: Clear display of 12A, 80G, CSR-1, audited balance sheets, and annual reports.\n2. Clear Geographical Scope: Exact map and list of blocks, talukas, and villages covered.\n3. Human-Centred Stories: Real community voices and field photographs showing real people in dignified settings.\n4. Clean Contact Information: Physical office address, landline/mobile numbers, and official institutional email address.`,
    format: 'Guide',
    download_name: 'NGO_Website_Best_Practices_Guide.doc',
    read_time: '8 min read',
    published_date: '2026-06-11',
  },
  {
    id: 'res-5',
    title: 'Choosing Between Mobile Apps and Web Forms for Village Data Collection',
    category: 'Digital Tools for NGOs',
    summary: 'Comparative analysis of mobile-based survey tools (Kobo, ODK, custom PWA) vs. centralized spreadsheets based on budget and staff capacity.',
    content: `Choosing the right data collection method depends on your team's geography, device availability, and frequency of data submission. This guide walks you through the trade-offs between open-source tools like KoboToolbox, ODK, Google Forms, and custom offline-first web apps.`,
    format: 'Toolkit',
    download_name: 'Field_Data_Collection_Decision_Matrix.xlsx',
    read_time: '6 min read',
    published_date: '2026-04-18',
  },
  {
    id: 'res-6',
    title: 'Grassroots Digital Communication & Social Media Toolkit for Rural NGOs',
    category: 'Digital Communication',
    summary: 'Practical communication plan, monthly editorial calendar, and community storytelling framework designed for rural organisations without dedicated marketing staff.',
    content: `Grassroots organisations do extraordinary work in villages, but often struggle to communicate their social impact beyond their immediate taluka.\n\nKey components of this toolkit:\n1. 30-Day Grassroots Editorial Calendar: Weekly themes (Farmer Testimonial, Field Photo Story, Milestones, Community Voice).\n2. WhatsApp Community Engagement Rules: How to run farmer and SHG broadcast channels without spamming or violating privacy.\n3. Donor Newsletter Template: Quarterly 2-page concise bulletin covering physical outputs, audited utilization, and verified beneficiary stories.\n4. Visual Guidelines: Best practices for taking dignified, high-resolution photographs in sunlight with affordable smartphones.`,
    format: 'Toolkit',
    download_name: 'Grassroots_Digital_Communication_Toolkit.xlsx',
    read_time: '6 min read',
    published_date: '2026-09-28',
  },
  {
    id: 'res-7',
    title: 'Rural Project Monitoring & Milestone Verification Framework',
    category: 'Project Monitoring',
    summary: 'Standardised indicator tracking sheet, field milestone verification checklists, and variance reporting matrices for CSR and philanthropic grant compliance.',
    content: `Effective project monitoring bridges the gap between planned targets and ground realities.\n\nFramework highlights:\n1. Milestone Tracking Matrix: Map 9 implementation stages with quantifiable indicators.\n2. Variance Analysis: Automatically calculate discrepancies between planned vs. actual beneficiary reach.\n3. Ground Verification Protocol: Checklist for field supervisors to cross-verify registers against geotagged photographs.\n4. Social Audit Mechanism: Participatory Gram Sabha review sheets to share progress transparently with village community members.`,
    format: 'Template',
    download_name: 'SEVA_Rural_Project_Monitoring_Tracker.xlsx',
    read_time: '5 min read',
    published_date: '2026-09-15',
  },
  {
    id: 'res-8',
    title: 'Digital Literacy & Smartphone Field Training Manual for Rural Animators',
    category: 'Capacity Building',
    summary: 'Bilingual training curriculum and step-by-step participatory modules to train barefoot village coordinators in smartphone data entry, offline sync, and data ethics.',
    content: `Training rural animators requires empathy, patience, and vernacular instructional design.\n\n6 Core Modules in this manual:\nModule 1: Smartphone Fundamentals (Touchscreen handling, battery management in power-scarce villages, storage cleanup).\nModule 2: Vernacular Data Entry (Using Marathi/Hindi keyboard, voice-typing for field observations).\nModule 3: Photographic Documentation (Capturing legible receipts, geo-tagged crop yields, and check-dam water levels).\nModule 4: Offline Synchronization (Navigating areas with zero cellular reception and syncing safely when back at the block office).\nModule 5: Data Privacy & Ethics (Seeking oral consent, safeguarding women's contact information).\nModule 6: Troubleshooting Field Errors (Fixing duplicate entries and recovery procedures).`,
    format: 'Guide',
    download_name: 'Field_Animators_Digital_Training_Manual.doc',
    read_time: '10 min read',
    published_date: '2026-08-20',
  },
  {
    id: 'res-9',
    title: 'Appropriate Rural Technology Selection & Feasibility Matrix',
    category: 'Technology for Rural Development',
    summary: 'Decision matrix comparing cloud vs offline-first architectures, low-cost solar hardware, and resilient database choices tailored to rural Indian power and connectivity realities.',
    content: `Technology in rural development must be appropriate, resilient, and maintainable by the local team.\n\nCriteria evaluated in this matrix:\n1. Cellular Connectivity Tolerance: Systems that function 100% offline with peer-to-peer or local SQLite storage.\n2. Power Resilience: Hardware compatible with 12V solar DC setups and resistant to extreme village dust and heat.\n3. Operating Cost: Zero recurring monthly SaaS seat licenses; preference for open-source or self-hosted stacks.\n4. Total Cost of Ownership (TCO): Breakdown under the SEVA 70-30 model (70% SEVA technical subsidy, 30% NGO investment).\n5. Handover Autonomy: Ensuring the grassroots team owns 100% of the code, database schemas, and administrator credentials.`,
    format: 'Toolkit',
    download_name: 'Appropriate_Rural_Technology_Matrix.xlsx',
    read_time: '8 min read',
    published_date: '2026-07-28',
  },
  {
    id: 'res-10',
    title: 'SEVA Official Technology Support Agreement & 70-30 Budget Breakup Model',
    category: 'Documentation and Reporting',
    summary: 'Official template of the Technology Support Agreement between SEVA (First Party) and Grassroots Partner (Second Party), including itemized budget heads, 70% SEVA support, and 30% partner contribution terms.',
    content: `Official bipartite agreement draft governing the Grassroots Technology Support Programme.\n\nIncludes:\n- Purpose of Agreement and institutional capacity building scope\n- 9 Standard Milestone stages from Needs Assessment to Final Handover\n- Itemized Budget Heads (Mobile App, Web MIS, Institutional Website, Capacity Training, Server Maintenance)\n- 70% SEVA Support vs 30% Partner Contribution breakdown\n- Intellectual Property ownership and code handover guarantees\n- Bank transfer instructions and dispute resolution jurisdiction (Yavatmal, Maharashtra).`,
    format: 'Template',
    download_name: 'SEVA_Technology_Support_Agreement_2026.doc',
    read_time: '12 min read',
    published_date: '2026-10-01',
  },
];

// Real Database Mode: All dummy seed records removed completely.
// Only authentic records submitted via forms or synced from remote database/API are stored and displayed.
export const INITIAL_APPLICATIONS: Application[] = [];
export const INITIAL_PROJECTS: ProgrammeProject[] = [];
export const INITIAL_MEETINGS: Meeting[] = [];
export const INITIAL_EMAIL_LOGS: EmailLog[] = [];
export const INITIAL_CONTACT_MESSAGES: ContactMessage[] = [];
// Storage Keys
const STORAGE_KEYS = {
  APPLICATIONS: 'seva_applications_v1',
  DELETED_APPLICATIONS: 'seva_deleted_applications_v1',
  SETTINGS: 'seva_settings_v1',
  IMPACT_STATS: 'seva_impact_stats_v1',
  CASE_STUDIES: 'seva_case_studies_v1',
  RESOURCES: 'seva_resources_v1',
  MEETINGS: 'seva_meetings_v1',
  EMAIL_LOGS: 'seva_email_logs_v1',
  EMAIL_TEMPLATES: 'seva_email_templates_v1',
  EMAIL_SIGNATURE: 'seva_email_signature_v1',
  AGREEMENTS: 'seva_agreements_v1',
  PROJECTS: 'seva_projects_v1',
  CONTACT_MESSAGES: 'seva_contact_messages_v1',
  CURRENT_USER: 'seva_current_user_v1',
};

// In-memory fallback map for mobile browsers / WebView / private mode when localStorage is restricted
const memoryFallbackMap = new Map<string, string>();

function safeStorageGet(key: string): string | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const val = window.localStorage.getItem(key);
      if (val !== null) return val;
    }
  } catch (e) {
    // Suppress mobile private browsing SecurityError
  }
  return memoryFallbackMap.get(key) ?? null;
}

function safeStorageSet(key: string, value: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch (e) {
    // Suppress quota exceeded or security error
  }
  memoryFallbackMap.set(key, value);
}

// Available Admin Users for role-based testing
export const ADMIN_USERS: UserProfile[] = [
  {
    id: 'usr-super',
    name: 'SEVA Director (Super Admin)',
    email: 'seva.ecology@gmail.com',
    role: 'super_admin',
    designation: 'Director, SEVA',
  },
  {
    id: 'usr-prog',
    name: 'Programme Administrator',
    email: 'programmes@sevavillage.org',
    role: 'programme_admin',
    designation: 'Lead Programme Manager',
  },
  {
    id: 'usr-rev',
    name: 'Technical Reviewer',
    email: 'evaluations@sevavillage.org',
    role: 'reviewer',
    designation: 'Senior Technical Evaluator',
  },
];

// Store Helper Functions
export class SevaStore {
  // Load helper
  private static load<T>(key: string, fallback: T): T {
    try {
      const stored = safeStorageGet(key);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn(`Failed reading ${key} from storage:`, e);
    }
    return fallback;
  }

  // Save helper
  private static save<T>(key: string, data: T): void {
    try {
      safeStorageSet(key, JSON.stringify(data));
    } catch (e) {
      console.warn(`Failed writing ${key} to storage:`, e);
    }
  }

  // Deleted Application IDs tracker (guarantees deleted applications NEVER resurrect)
  static getDeletedApplicationIds(): Set<string> {
    try {
      const raw = safeStorageGet(STORAGE_KEYS.DELETED_APPLICATIONS);
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) {
          return new Set<string>(arr.map(String));
        }
      }
    } catch (e) {
      // ignore
    }
    return new Set<string>();
  }

  static addDeletedApplicationId(appId: string): void {
    if (!appId) return;
    const current = this.getDeletedApplicationIds();
    current.add(appId);
    safeStorageSet(
      STORAGE_KEYS.DELETED_APPLICATIONS,
      JSON.stringify(Array.from(current))
    );
  }

  // Applications (Resilient loading ensures user-entered real organisations are NEVER lost, while genuinely deleted applications STAY deleted)
  static getApplications(): Application[] {
    const map = new Map<string, Application>();
    const deletedIds = this.getDeletedApplicationIds();

    // Step 1: Load initial applications if any (default is empty array [])
    for (const app of INITIAL_APPLICATIONS) {
      if (app && app.id && !deletedIds.has(app.id)) {
        map.set(app.id, app);
      }
    }

    // Step 2: Check all known legacy/alternative keys FIRST so older data is loaded as a baseline
    const legacyKeys = [
      'seva_applications_backup',
      'seva_applications_v0',
      'seva_org_applications',
      'seva_applications_store',
      'applications',
      'seva_apps',
      'seva_applications',
    ];

    for (const lk of legacyKeys) {
      const raw = safeStorageGet(lk);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            for (const item of parsed) {
              if (item && item.id && !deletedIds.has(item.id)) {
                map.set(item.id, item);
              }
            }
          }
        } catch (e) {
          console.warn(`Error reading legacy key ${lk}:`, e);
        }
      }
    }

    // Step 3: Scan browser localStorage for any other keys with application records
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        for (let i = 0; i < window.localStorage.length; i++) {
          const k = window.localStorage.key(i);
          if (k && (k.includes('application') || k.includes('seva_app') || k.includes('organis'))) {
            if (
              !legacyKeys.includes(k) &&
              k !== STORAGE_KEYS.APPLICATIONS &&
              k !== STORAGE_KEYS.DELETED_APPLICATIONS
            ) {
              try {
                const val = window.localStorage.getItem(k);
                if (val && val.startsWith('[')) {
                  const arr = JSON.parse(val);
                  if (
                    Array.isArray(arr) &&
                    arr.length > 0 &&
                    (arr[0].name_of_organization || arr[0].contact_person_name)
                  ) {
                    for (const item of arr) {
                      if (item && (item.id || item.name_of_organization)) {
                        const id = item.id || `SEVA-RESTORED-${map.size + 1}`;
                        if (!deletedIds.has(id)) {
                          map.set(id, { ...item, id });
                        }
                      }
                    }
                  }
                }
              } catch (e) {
                // Ignore parse errors
              }
            }
          }
        }
      }
    } catch (e) {
      // Ignore private browsing restrictions
    }

    // Step 4: READ PRIMARY STORAGE KEY LAST (HIGHEST PRECEDENCE)
    // Primary storage key (seva_applications_v1) contains the user's latest submissions and updates!
    const primaryRaw = safeStorageGet(STORAGE_KEYS.APPLICATIONS);
    if (primaryRaw) {
      try {
        const parsed = JSON.parse(primaryRaw);
        if (Array.isArray(parsed)) {
          for (const item of parsed) {
            if (item && item.id && !deletedIds.has(item.id)) {
              // Overwrite with primary storage key's newest data
              map.set(item.id, item);
            }
          }
        }
      } catch (e) {
        console.warn('Error reading primary applications:', e);
      }
    }

    // Absolute Guarantee: Ensure NO deleted IDs ever exist in the returned list
    for (const did of deletedIds) {
      map.delete(did);
    }

    const merged = Array.from(map.values());

    // Synchronize to primary and backup keys
    safeStorageSet(STORAGE_KEYS.APPLICATIONS, JSON.stringify(merged));
    safeStorageSet('seva_applications', JSON.stringify(merged));

    return merged;
  }

  static getApplicationById(id: string): Application | undefined {
    const list = this.getApplications();
    return list.find((a) => a.id === id);
  }

  static submitApplication(newAppData: Omit<Application, 'id' | 'created_at' | 'updated_at' | 'status' | 'priority' | 'status_history' | 'documents'> & { documents?: any[] }): Application {
    const list = this.getApplications();
    
    // Calculate next collision-free sequence number based on existing IDs
    let maxNum = 0;
    for (const a of list) {
      if (a && a.id) {
        const match = a.id.match(/SEVA-2026-(\d+)/);
        if (match) {
          const num = parseInt(match[1], 10);
          if (!isNaN(num) && num > maxNum) {
            maxNum = num;
          }
        }
      }
    }
    const nextSeq = Math.max(maxNum + 1, list.length + 1);
    const formattedId = `SEVA-2026-${String(nextSeq).padStart(4, '0')}`;
    const now = new Date().toISOString();

    const application: Application = {
      ...newAppData,
      id: formattedId,
      created_at: now,
      updated_at: now,
      status: 'New Application',
      priority: 'Medium',
      documents: newAppData.documents || [],
      status_history: [
        {
          id: `sh-${Date.now()}`,
          application_id: formattedId,
          previous_status: 'None',
          new_status: 'New Application',
          changed_by: 'Public Applicant Portal',
          changed_at: now,
          internal_remarks: 'Application submitted successfully via online portal.',
        },
      ],
    };

    const updatedList = [application, ...list.filter((a) => a.id !== formattedId)];
    
    // Save to primary key and backup keys
    this.save(STORAGE_KEYS.APPLICATIONS, updatedList);
    safeStorageSet('seva_applications', JSON.stringify(updatedList));
    safeStorageSet('applications', JSON.stringify(updatedList));

    // Dispatch window event so any open admin console updates immediately
    if (typeof window !== 'undefined') {
      try {
        window.dispatchEvent(
          new CustomEvent('seva_store_updated', {
            detail: { type: 'application_submitted', app: application },
          })
        );
      } catch (e) {
        // ignore
      }
    }

    // Also log automatic acknowledgement email
    this.sendEmail({
      application_id: application.id,
      recipient_email: application.organisation_email,
      recipient_name: application.contact_person_name,
      subject: `Application Received: SEVA Technology Support Programme [${application.id}]`,
      body: `Dear ${application.contact_person_name},\n\nThank you for submitting your application on behalf of ${application.name_of_organization} to SEVA's Technology Support Programme. Your Application ID is ${application.id}.\n\nOur team will review your application and contact you regarding next steps.`,
      template_used: 'Application Received',
      sent_by: 'System Automated Workflow',
    });

    return application;
  }

  static syncRemoteApplications(remoteApps: Application[]): { mergedCount: number; newCount: number } {
    if (!remoteApps || !Array.isArray(remoteApps) || remoteApps.length === 0) {
      return { mergedCount: 0, newCount: 0 };
    }
    const local = this.getApplications();
    const deletedIds = this.getDeletedApplicationIds();
    const map = new Map<string, Application>();
    for (const app of local) {
      if (app && app.id && !deletedIds.has(app.id)) map.set(app.id, app);
    }
    let newCount = 0;
    for (const rem of remoteApps) {
      if (rem && rem.id && !deletedIds.has(rem.id)) {
        if (!map.has(rem.id)) {
          newCount++;
        }
        const existing = map.get(rem.id);
        if (
          !existing ||
          new Date(rem.updated_at || rem.created_at).getTime() >=
            new Date(existing.updated_at || existing.created_at).getTime()
        ) {
          map.set(rem.id, { ...existing, ...rem });
        }
      }
    }
    const merged = Array.from(map.values());
    safeStorageSet(STORAGE_KEYS.APPLICATIONS, JSON.stringify(merged));
    safeStorageSet('seva_applications', JSON.stringify(merged));
    return { mergedCount: merged.length, newCount };
  }

  static bulkImportApplications(importedList: Partial<Application>[]): { successCount: number; importedApps: Application[] } {
    const list = this.getApplications();
    const now = new Date().toISOString();
    let counter = list.length;
    const newApps: Application[] = [];

    for (const item of importedList) {
      counter += 1;
      const formattedId = item.id && item.id.startsWith('SEVA-') ? item.id : `SEVA-2026-${String(counter).padStart(4, '0')}`;

      const rawAreas = item.key_areas_of_work;
      const parsedAreas = Array.isArray(rawAreas)
        ? rawAreas
        : typeof rawAreas === 'string'
        ? (rawAreas as string).split(',').map((s) => s.trim()).filter(Boolean)
        : ['Agriculture', 'Livelihoods'];

      const rawSupport = item.support_type_seeking;
      const parsedSupport = Array.isArray(rawSupport)
        ? rawSupport
        : typeof rawSupport === 'string'
        ? (rawSupport as string).split(',').map((s) => s.trim()).filter(Boolean)
        : [item.first_priority_support || 'MIS and Digital Data Management'];

      const rawTools = item.current_digital_tools;
      const parsedTools = Array.isArray(rawTools)
        ? rawTools
        : typeof rawTools === 'string'
        ? (rawTools as string).split(',').map((s) => s.trim()).filter(Boolean)
        : ['Excel/Spreadsheets', 'WhatsApp'];

      const app: Application = {
        id: formattedId,
        created_at: item.created_at || now,
        updated_at: now,
        status: item.status || 'New Application',
        priority: item.priority || 'Medium',
        assigned_reviewer_id: item.assigned_reviewer_id || '',
        assigned_reviewer_name: item.assigned_reviewer_name || '',

        name_of_organization: item.name_of_organization || 'Unnamed Organisation',
        type_of_organization: item.type_of_organization || 'Trust',
        year_of_establishment: Number(item.year_of_establishment) || new Date().getFullYear(),
        registration_number: item.registration_number || '',
        state: item.state || 'Maharashtra',
        district: item.district || '',
        organisation_address: item.organisation_address || '',
        organisation_website: item.organisation_website || '',
        organisation_email: item.organisation_email || '',

        contact_person_name: item.contact_person_name || '',
        designation: item.designation || 'Coordinator',
        contact_number: String(item.contact_number || ''),

        brief_description: item.brief_description || '',
        key_areas_of_work: parsedAreas.length > 0 ? parsedAreas : ['Rural Development'],
        villages_covered: Number(item.villages_covered) || 0,
        geographical_area_of_operation: item.geographical_area_of_operation || '',
        annual_beneficiaries_reached: Number(item.annual_beneficiaries_reached) || 0,
        primary_beneficiaries: item.primary_beneficiaries || 'Rural Communities',

        has_website: Boolean(item.has_website),
        has_mis_system: Boolean(item.has_mis_system),
        current_digital_tools: parsedTools,

        major_technology_challenges: item.major_technology_challenges || '',
        support_type_seeking: parsedSupport,
        description_of_solution_needed: item.description_of_solution_needed || '',
        main_problem_to_solve: item.main_problem_to_solve || '',
        intended_users: item.intended_users || 'Field animators and coordinators',
        estimated_users_count: Number(item.estimated_users_count) || 5,

        has_previous_digital_project: Boolean(item.has_previous_digital_project),
        previous_digital_project_details: item.previous_digital_project_details || '',

        requirement_urgency: (item.requirement_urgency as any) || 'Immediate (Within 1 month)',
        preferred_timeline: item.preferred_timeline || '3 to 6 months',
        first_priority_support: item.first_priority_support || 'MIS and Digital Data Management',

        documents: item.documents || [],
        status_history: item.status_history || [
          {
            id: `sh-${Date.now()}-${counter}`,
            application_id: formattedId,
            previous_status: 'None',
            new_status: item.status || 'New Application',
            changed_by: 'Excel Bulk Import (Admin Portal)',
            changed_at: now,
            internal_remarks: 'Imported via Excel/CSV Bulk Data Upload in Admin Portal.',
          },
        ],
      };
      newApps.push(app);
    }

    const updatedList = [...newApps, ...list];
    this.save(STORAGE_KEYS.APPLICATIONS, updatedList);
    return { successCount: newApps.length, importedApps: newApps };
  }

  static updateApplicationStatus(
    appId: string,
    newStatus: Application['status'],
    internalRemarks: string,
    changedBy: string
  ): Application | null {
    const list = this.getApplications();
    const index = list.findIndex((a) => a.id === appId);
    if (index === -1) return null;

    const current = list[index];
    const now = new Date().toISOString();

    const historyEntry = {
      id: `sh-${Date.now()}`,
      application_id: appId,
      previous_status: current.status,
      new_status: newStatus,
      changed_by: changedBy,
      changed_at: now,
      internal_remarks: internalRemarks || `Status changed from ${current.status} to ${newStatus}`,
    };

    const updatedApp: Application = {
      ...current,
      status: newStatus,
      updated_at: now,
      status_history: [historyEntry, ...(current.status_history || [])],
    };

    list[index] = updatedApp;
    this.save(STORAGE_KEYS.APPLICATIONS, list);
    return updatedApp;
  }

  static deleteApplication(appId: string): boolean {
    if (!appId) return false;

    // 1. Add to permanent deleted blacklist
    this.addDeletedApplicationId(appId);

    // 2. Filter from primary list and save
    const currentList = this.getApplications();
    const filtered = currentList.filter((a) => a.id !== appId);
    this.save(STORAGE_KEYS.APPLICATIONS, filtered);
    safeStorageSet('seva_applications', JSON.stringify(filtered));

    // 3. Purge from ALL legacy keys in localStorage immediately
    const legacyKeys = [
      'seva_applications',
      'applications',
      'seva_apps',
      'seva_applications_backup',
      'seva_applications_v0',
      'seva_org_applications',
      'seva_applications_store',
    ];
    for (const lk of legacyKeys) {
      try {
        const raw = safeStorageGet(lk);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            const purged = parsed.filter((item: any) => item && item.id !== appId);
            safeStorageSet(lk, JSON.stringify(purged));
          }
        }
      } catch (e) {
        // ignore
      }
    }

    // 4. Scan and purge from any other application keys in localStorage
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        for (let i = 0; i < window.localStorage.length; i++) {
          const k = window.localStorage.key(i);
          if (
            k &&
            (k.includes('application') || k.includes('seva_app')) &&
            k !== STORAGE_KEYS.DELETED_APPLICATIONS
          ) {
            try {
              const val = window.localStorage.getItem(k);
              if (val && val.startsWith('[')) {
                const arr = JSON.parse(val);
                if (Array.isArray(arr)) {
                  const purged = arr.filter((x: any) => x && x.id !== appId);
                  window.localStorage.setItem(k, JSON.stringify(purged));
                }
              }
            } catch (e) {
              // ignore
            }
          }
        }
      }
    } catch (e) {
      // ignore
    }

    // 5. If Supabase is configured, delete from remote Supabase table so sync never restores it
    try {
      import('./supabase')
        .then(({ getSupabaseClient, isSupabaseConfigured }) => {
          if (isSupabaseConfigured()) {
            const client = getSupabaseClient();
            client.from('applications').delete().eq('id', appId).then(({ error }) => {
              if (error) console.warn('Supabase remote delete error:', error);
            });
          }
        })
        .catch(() => {});
    } catch (e) {
      // ignore
    }

    // 6. Broadcast event so any open tab/layout updates instantly
    if (typeof window !== 'undefined') {
      try {
        window.dispatchEvent(
          new CustomEvent('seva_store_updated', {
            detail: { type: 'application_deleted', id: appId },
          })
        );
      } catch (e) {
        // ignore
      }
    }

    return true;
  }

  static saveApplicationReview(appId: string, review: ApplicationReview, updatedPriority?: Application['priority']): Application | null {
    const list = this.getApplications();
    const index = list.findIndex((a) => a.id === appId);
    if (index === -1) return null;

    const current = list[index];
    const now = new Date().toISOString();

    const updatedApp: Application = {
      ...current,
      reviews: review,
      priority: updatedPriority || current.priority,
      updated_at: now,
    };

    list[index] = updatedApp;
    this.save(STORAGE_KEYS.APPLICATIONS, list);
    return updatedApp;
  }

  // Priority Auto-Calculator based on weights (Part 8.4)
  static calculateScore(scores: {
    relevance: number; // 0-20
    impact: number; // 0-20
    reach: number; // 0-15
    urgency: number; // 0-15
    readiness: number; // 0-10
    feasibility: number; // 0-10
    sustainability: number; // 0-10
  }): number {
    return (
      (scores.relevance || 0) +
      (scores.impact || 0) +
      (scores.reach || 0) +
      (scores.urgency || 0) +
      (scores.readiness || 0) +
      (scores.feasibility || 0) +
      (scores.sustainability || 0)
    );
  }

  // Meetings
  static getMeetings(): Meeting[] {
    return this.load<Meeting[]>(STORAGE_KEYS.MEETINGS, INITIAL_MEETINGS);
  }

  static scheduleMeeting(meetingData: Omit<Meeting, 'id' | 'created_at'>): Meeting {
    const list = this.getMeetings();
    const newMeeting: Meeting = {
      ...meetingData,
      id: `meet-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    const updated = [newMeeting, ...list];
    this.save(STORAGE_KEYS.MEETINGS, updated);

    // Update application status to 'Meeting Scheduled' if not already
    this.updateApplicationStatus(
      meetingData.application_id,
      'Meeting Scheduled',
      `Meeting scheduled for ${meetingData.meeting_date} at ${meetingData.start_time} (${meetingData.mode}).`,
      meetingData.created_by
    );

    // Send meeting invitation email log
    this.sendEmail({
      application_id: meetingData.application_id,
      recipient_email: meetingData.contact_email,
      recipient_name: meetingData.contact_person,
      subject: `Meeting Invitation: Technology Support Discussion - ${meetingData.organisation_name} [${meetingData.application_id}]`,
      body: `Dear ${meetingData.contact_person},\n\nWe have scheduled a meeting regarding your application.\n\nDate: ${meetingData.meeting_date}\nTime: ${meetingData.start_time} - ${meetingData.end_time}\nMode: ${meetingData.mode}\n${meetingData.meeting_link ? `Link: ${meetingData.meeting_link}\n` : ''}${meetingData.venue ? `Venue: ${meetingData.venue}\n` : ''}\nAgenda:\n${meetingData.agenda}\n\nWarm regards,\nSEVA Secretariat`,
      template_used: 'Meeting Invitation',
      sent_by: meetingData.created_by,
    });

    return newMeeting;
  }

  static updateMeetingStatus(meetingId: string, status: Meeting['status']): void {
    const list = this.getMeetings();
    const updated = list.map((m) => (m.id === meetingId ? { ...m, status } : m));
    this.save(STORAGE_KEYS.MEETINGS, updated);
  }

  // Email Templates & Logs
  static getEmailTemplates(): EmailTemplate[] {
    return this.load<EmailTemplate[]>(STORAGE_KEYS.EMAIL_TEMPLATES, INITIAL_EMAIL_TEMPLATES);
  }

  static getEmailLogs(): EmailLog[] {
    return this.load<EmailLog[]>(STORAGE_KEYS.EMAIL_LOGS, INITIAL_EMAIL_LOGS);
  }

  static sendEmail(payload: {
    application_id?: string;
    recipient_email: string;
    recipient_name: string;
    cc_email?: string;
    subject: string;
    body: string;
    template_used?: string;
    sent_by: string;
    status?: EmailLog['status'];
    delivery_method?: string;
  }): EmailLog {
    const list = this.getEmailLogs();
    const log: EmailLog = {
      id: `elog-${Date.now()}`,
      application_id: payload.application_id || '',
      recipient_email: payload.recipient_email,
      recipient_name: payload.recipient_name,
      cc_email: payload.cc_email || 'seva.ecology@gmail.com',
      subject: payload.subject,
      body: payload.body,
      sent_at: new Date().toISOString(),
      sent_by: payload.sent_by,
      status: payload.status || 'Dispatched via Gmail',
      delivery_method: payload.delivery_method || 'Gmail Web (CC: seva.ecology@gmail.com)',
      template_used: payload.template_used,
    };
    const updated = [log, ...list];
    this.save(STORAGE_KEYS.EMAIL_LOGS, updated);
    return log;
  }

  static deleteEmailLog(id: string): void {
    const list = this.getEmailLogs();
    const updated = list.filter((l) => l.id !== id);
    this.save(STORAGE_KEYS.EMAIL_LOGS, updated);
  }

  static clearEmailLogs(): void {
    this.save(STORAGE_KEYS.EMAIL_LOGS, []);
  }

  // Official Email Signature (appended at the end of all outgoing messages)
  static getEmailSignature(): string {
    return this.load<string>(
      STORAGE_KEYS.EMAIL_SIGNATURE,
      `Warm regards,\nTechnology Support Secretariat\nSustainable Ecology & Village Advancement (SEVA)\n31 B, Jalka, Ralegaon, Dist. Yavatmal, Maharashtra – 445402\nContact: +91 8999469974 | Email: seva.ecology@gmail.com\nWebsite: https://sevavillage.org`
    );
  }

  static saveEmailSignature(signature: string): void {
    this.save(STORAGE_KEYS.EMAIL_SIGNATURE, signature);
  }

  // Active Projects (Part 10)
  static getProjects(): ProgrammeProject[] {
    return this.load<ProgrammeProject[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  }

  static convertApplicationToProject(app: Application, projectDetails: {
    agreed_cost: number;
    assigned_lead: string;
    duration_months: number;
    start_date: string;
  }): ProgrammeProject {
    const list = this.getProjects();
    const agreedCost = projectDetails.agreed_cost || 60000;
    const duration = projectDetails.duration_months || 4;
    const start = new Date(projectDetails.start_date || new Date().toISOString());
    const completionDate = new Date(start);
    completionDate.setMonth(completionDate.getMonth() + duration);

    const standardMilestones = [
      'Needs Assessment & Field Workflow Mapping',
      'Requirement Finalisation & Database Architecture',
      'Planning & High-Contrast Wireframing',
      'Development & System Implementation',
      'Field Testing & Data Stress Verification',
      'Staff Training & Capacity Building Workshops',
      'Live Deployment & Data Migration',
      'Handover & Full Source Credentials',
      'Follow-up, Monitoring & Quarterly Health Check',
    ];

    const milestones = standardMilestones.map((title, i) => {
      const target = new Date(start);
      target.setDate(target.getDate() + (i + 1) * 14);
      return {
        id: `m-${Date.now()}-${i}`,
        stage_number: i + 1,
        title: `${i + 1}. ${title}`,
        description: `Implementation stage ${i + 1} for ${app.name_of_organization}`,
        status: (i === 0 ? 'In Progress' : 'Not Started') as any,
        target_date: target.toISOString().split('T')[0],
      };
    });

    const newProject: ProgrammeProject = {
      id: `proj-${Date.now()}`,
      application_id: app.id,
      organisation_name: app.name_of_organization,
      state: app.state,
      district: app.district,
      approved_support_areas: app.support_type_seeking,
      start_date: start.toISOString().split('T')[0],
      expected_completion_date: completionDate.toISOString().split('T')[0],
      project_duration_months: duration,
      agreed_programme_cost: agreedCost,
      seva_support_contribution: Math.round(agreedCost * 0.7), // 70%
      organisation_contribution: Math.round(agreedCost * 0.3), // 30%
      assigned_technical_lead: projectDetails.assigned_lead || 'SEVA Technical Operations Desk',
      assigned_team_members: [projectDetails.assigned_lead || 'SEVA Technical Lead', 'Capacity Building Trainer'],
      implementation_status: 'Needs Assessment',
      milestones,
      review_meetings_count: 1,
      deliverables_summary: `Custom technology support for ${app.name_of_organization} covering ${app.support_type_seeking.join(', ')}.`,
    };

    const updated = [newProject, ...list];
    this.save(STORAGE_KEYS.PROJECTS, updated);

    // Update application status to Implementation Started
    this.updateApplicationStatus(
      app.id,
      'Implementation Started',
      `Converted to active project record. Total agreed cost: ₹${agreedCost.toLocaleString('en-IN')}. SEVA contribution 70%: ₹${newProject.seva_support_contribution.toLocaleString('en-IN')}, NGO contribution 30%: ₹${newProject.organisation_contribution.toLocaleString('en-IN')}.`,
      projectDetails.assigned_lead
    );

    return newProject;
  }

  static updateProjectMilestone(
    projectId: string,
    milestoneId: string,
    status: 'Not Started' | 'In Progress' | 'Completed',
    notes?: string
  ): void {
    const list = this.getProjects();
    const updated = list.map((proj) => {
      if (proj.id === projectId) {
        const updatedMilestones = proj.milestones.map((m) =>
          m.id === milestoneId
            ? {
                ...m,
                status,
                notes: notes !== undefined ? notes : m.notes,
                completed_date: status === 'Completed' ? new Date().toISOString().split('T')[0] : undefined,
              }
            : m
        );
        return { ...proj, milestones: updatedMilestones };
      }
      return proj;
    });
    this.save(STORAGE_KEYS.PROJECTS, updated);
  }

  // Impact Statistics (Part 14 CMS)
  static getImpactStats(): ImpactStatistic[] {
    return this.load<ImpactStatistic[]>(STORAGE_KEYS.IMPACT_STATS, INITIAL_IMPACT_STATS);
  }

  static updateImpactStat(id: string, updates: Partial<ImpactStatistic>): void {
    const list = this.getImpactStats();
    const updated = list.map((s) => (s.id === id ? { ...s, ...updates, last_updated: new Date().toISOString() } : s));
    this.save(STORAGE_KEYS.IMPACT_STATS, updated);
  }

  // Case Studies (Part 6 & Part 14 CMS)
  static getCaseStudies(): CaseStudy[] {
    return this.load<CaseStudy[]>(STORAGE_KEYS.CASE_STUDIES, INITIAL_CASE_STUDIES);
  }

  static saveCaseStudy(caseStudy: CaseStudy): void {
    const list = this.getCaseStudies();
    const index = list.findIndex((cs) => cs.id === caseStudy.id);
    let updated: CaseStudy[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = caseStudy;
    } else {
      updated = [caseStudy, ...list];
    }
    this.save(STORAGE_KEYS.CASE_STUDIES, updated);
  }

  static deleteCaseStudy(id: string): void {
    const list = this.getCaseStudies();
    const updated = list.filter((cs) => cs.id !== id);
    this.save(STORAGE_KEYS.CASE_STUDIES, updated);
  }

  // Knowledge Resources (Part 11 & Part 14 CMS)
  static getResources(): ResourceItem[] {
    const list = this.load<ResourceItem[]>(STORAGE_KEYS.RESOURCES, INITIAL_RESOURCES);
    const existingIds = new Set(list.map((r) => r.id));
    let hasAdditions = false;

    // Merge any missing core resources (e.g. newly restored 4 sections)
    for (const item of INITIAL_RESOURCES) {
      if (!existingIds.has(item.id)) {
        list.push(item);
        existingIds.add(item.id);
        hasAdditions = true;
      }
    }

    if (hasAdditions) {
      this.save(STORAGE_KEYS.RESOURCES, list);
    }
    return list;
  }

  static saveResource(resource: ResourceItem): void {
    const list = this.getResources();
    const index = list.findIndex((r) => r.id === resource.id);
    let updated: ResourceItem[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = resource;
    } else {
      updated = [resource, ...list];
    }
    this.save(STORAGE_KEYS.RESOURCES, updated);
  }

  // Contact Messages (Part 12)
  static getContactMessages(): ContactMessage[] {
    return this.load<ContactMessage[]>(STORAGE_KEYS.CONTACT_MESSAGES, INITIAL_CONTACT_MESSAGES);
  }

  static submitContactMessage(data: Omit<ContactMessage, 'id' | 'submitted_at' | 'status'>): ContactMessage {
    const list = this.getContactMessages();
    const newMsg: ContactMessage = {
      ...data,
      id: `cm-${Date.now()}`,
      submitted_at: new Date().toISOString(),
      status: 'Unread',
    };
    const updated = [newMsg, ...list];
    this.save(STORAGE_KEYS.CONTACT_MESSAGES, updated);
    return newMsg;
  }

  static updateContactMessageStatus(id: string, status: ContactMessage['status']): void {
    const list = this.getContactMessages();
    const updated = list.map((m) => (m.id === id ? { ...m, status } : m));
    this.save(STORAGE_KEYS.CONTACT_MESSAGES, updated);
  }

  static deleteContactMessage(id: string): void {
    const list = this.getContactMessages();
    const updated = list.filter((m) => m.id !== id);
    this.save(STORAGE_KEYS.CONTACT_MESSAGES, updated);
  }

  // Organisation Settings (Part 14)
  static getSettings(): OrganisationSettings {
    const s = this.load<OrganisationSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_ORG_SETTINGS);
    if (s.org_name && s.org_name.includes('Rural Advancement')) {
      s.org_name = s.org_name.replace('Rural Advancement', 'Village Advancement');
      this.saveSettings(s);
    }
    return s;
  }

  static saveSettings(settings: OrganisationSettings): void {
    this.save(STORAGE_KEYS.SETTINGS, settings);
  }

  // Current Logged-in Admin User
  static getCurrentUser(): UserProfile {
    return this.load<UserProfile>(STORAGE_KEYS.CURRENT_USER, ADMIN_USERS[0]);
  }

  static setCurrentUser(user: UserProfile): void {
    this.save(STORAGE_KEYS.CURRENT_USER, user);
  }

  // Technology Support Agreements & Budget Generator
  static getAgreements(): TechnologySupportAgreement[] {
    return this.load<TechnologySupportAgreement[]>(STORAGE_KEYS.AGREEMENTS, [INITIAL_AGREEMENT]);
  }

  static getAgreementById(id: string): TechnologySupportAgreement | undefined {
    const list = this.getAgreements();
    return list.find((a) => a.id === id);
  }

  static saveAgreement(agreement: TechnologySupportAgreement): void {
    const list = this.getAgreements();
    const idx = list.findIndex((a) => a.id === agreement.id);
    let updated: TechnologySupportAgreement[];
    if (idx >= 0) {
      updated = [...list];
      updated[idx] = { ...agreement, updated_at: new Date().toISOString() };
    } else {
      updated = [{ ...agreement, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }, ...list];
    }
    this.save(STORAGE_KEYS.AGREEMENTS, updated);
  }

  static deleteAgreement(id: string): void {
    const list = this.getAgreements();
    const updated = list.filter((a) => a.id !== id);
    this.save(STORAGE_KEYS.AGREEMENTS, updated);
  }

  /**
   * Export complete Admin Panel data as a downloadable JSON string.
   * Allows users who made edits in preview or another device to transfer their data immediately.
   */
  static exportAllDataJSON(): string {
    const backup = {
      version: '2026.1',
      exported_at: new Date().toISOString(),
      applications: this.getApplications(),
      organisation_settings: this.getSettings(),
      impact_stats: this.getImpactStats(),
      meetings: this.getMeetings(),
      projects: this.getProjects(),
      agreements: this.getAgreements(),
      case_studies: this.getCaseStudies(),
      resources: this.getResources(),
      contact_messages: this.getContactMessages(),
    };
    return JSON.stringify(backup, null, 2);
  }

  /**
   * Import complete Admin Panel data from a JSON object or string.
   */
  static importAllDataJSON(jsonStr: string): { success: boolean; message: string; count?: number } {
    try {
      const data = typeof jsonStr === 'string' ? JSON.parse(jsonStr) : jsonStr;
      if (!data || typeof data !== 'object') {
        return { success: false, message: 'अवैध डेटा फॉरमॅट' };
      }

      let appCount = 0;
      if (Array.isArray(data.applications)) {
        this.save(STORAGE_KEYS.APPLICATIONS, data.applications);
        appCount = data.applications.length;
      }
      if (data.organisation_settings) {
        this.save(STORAGE_KEYS.SETTINGS, data.organisation_settings);
      }
      if (Array.isArray(data.impact_stats)) {
        this.save(STORAGE_KEYS.IMPACT_STATS, data.impact_stats);
      }
      if (Array.isArray(data.meetings)) {
        this.save(STORAGE_KEYS.MEETINGS, data.meetings);
      }
      if (Array.isArray(data.projects)) {
        this.save(STORAGE_KEYS.PROJECTS, data.projects);
      }
      if (Array.isArray(data.agreements)) {
        this.save(STORAGE_KEYS.AGREEMENTS, data.agreements);
      }
      if (Array.isArray(data.case_studies)) {
        this.save(STORAGE_KEYS.CASE_STUDIES, data.case_studies);
      }
      if (Array.isArray(data.resources)) {
        this.save(STORAGE_KEYS.RESOURCES, data.resources);
      }
      if (Array.isArray(data.contact_messages)) {
        this.save(STORAGE_KEYS.CONTACT_MESSAGES, data.contact_messages);
      }

      // Notify window
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('seva_store_updated', { detail: { type: 'full_restore' } }));
      }

      return {
        success: true,
        message: `डेटा यशस्वीरीत्या रीस्टोअर केला (${appCount} अर्ज लोड झाले).`,
        count: appCount,
      };
    } catch (err: any) {
      return { success: false, message: 'डेटा आयात करताना त्रुटी: ' + (err?.message || 'अज्ञात त्रुटी') };
    }
  }
}

