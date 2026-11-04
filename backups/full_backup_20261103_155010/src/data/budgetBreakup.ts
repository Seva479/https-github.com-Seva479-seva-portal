import { BudgetHeadItem, TechnologySupportAgreement } from '../types';

export const ANNUAL_MAINTENANCE_CHARGE = 8700;

export const DEFAULT_BUDGET_HEADS: BudgetHeadItem[] = [
  {
    id: 1,
    head_name: 'MiS Mobile App Development',
    description: 'UI/UX, Android app, dashboard, reporting, 1year maintenance',
    total_amount: 40000,
    seva_support: 28000,
    partner_contribution: 12000,
    is_selected: true,
  },
  {
    id: 2,
    head_name: 'MiS Web Application',
    description: 'Responsive portal, admin panel, data visualization, hosting 1 year',
    total_amount: 30000,
    seva_support: 21000,
    partner_contribution: 9000,
    is_selected: true,
  },
  {
    id: 3,
    head_name: 'Attendance App (Mobile + Web)',
    description: 'Geo-tagging, selfie/face attendance, leave management, reports, integration',
    total_amount: 25000,
    seva_support: 17500,
    partner_contribution: 7500,
    is_selected: false,
  },
  {
    id: 4,
    head_name: 'Learning Management System (LMS)',
    description: 'Course creation, video/PDF content, quiz & assessment, progress tracking, certificate generation, mobile-friendly LMS',
    total_amount: 50000,
    seva_support: 35000,
    partner_contribution: 15000,
    is_selected: false,
  },
  {
    id: 5,
    head_name: 'Website Development',
    description: 'Responsive website (5–7 pages), CMS, contact form, gallery, SEO basics, hosting + domain 1 year',
    total_amount: 35000,
    seva_support: 24500,
    partner_contribution: 10500,
    is_selected: true,
  },
  {
    id: 6,
    head_name: 'Staff Capacity Building',
    description: '3 training sessions (online/offline), training material, handholding support',
    total_amount: 25000,
    seva_support: 17500,
    partner_contribution: 7500,
    is_selected: false,
  },
  {
    id: 7,
    head_name: 'Expert Service / Consulting',
    description: 'Domain expert visits, process audit, SOP development, technical guidance (6–7 days)',
    total_amount: 20000,
    seva_support: 14000,
    partner_contribution: 6000,
    is_selected: false,
  },
  {
    id: 8,
    head_name: 'Documentation & Handover',
    description: 'User manuals, training videos, final handover & support',
    total_amount: 10000,
    seva_support: 7000,
    partner_contribution: 3000,
    is_selected: false,
  },
  {
    id: 9,
    head_name: 'Integration & Testing',
    description: 'All apps + LMS + website integration, UAT, bug fixing',
    total_amount: 10000,
    seva_support: 7000,
    partner_contribution: 3000,
    is_selected: false,
  },
];

export const DEFAULT_FIRST_PARTY_INFO = {
  name: 'Substantiable Ecology & Village Advancement (SEVA)',
  address: '31, B, Jalka, Ralegaon, Yavatmal, Maharashtra 445402',
  representative: 'Mr. Rasul Sheikh',
  designation: 'Director',
};

export const DEFAULT_BANK_DETAILS = {
  holder_name: 'SUSTAINABLE ECOLOGY & VILLAGE ADVACEMENT',
  account_number: '5020 0118 9111 11',
  account_type: 'Current Account',
  bank_name: 'HDFC Bank',
  ifsc: 'HDFC0008322',
  branch: 'RALEGAON',
};

export const calculateBudget = (heads: BudgetHeadItem[], includeMaintenance: boolean = false) => {
  const selected = heads.filter((h) => h.is_selected);
  const totalBase = selected.reduce((sum, h) => sum + h.total_amount, 0);
  const maintenance = includeMaintenance ? ANNUAL_MAINTENANCE_CHARGE : 0;
  const grandTotal = totalBase + maintenance;

  // 70% SEVA, 30% Partner
  const sevaSupported = Math.round(grandTotal * 0.7);
  const partnerContribution = grandTotal - sevaSupported; // Ensures exact sum

  return {
    selectedCount: selected.length,
    selectedHeads: selected,
    totalBase,
    maintenance,
    grandTotal,
    sevaSupported,
    partnerContribution,
  };
};

export const INITIAL_AGREEMENT: TechnologySupportAgreement = {
  id: 'SEVA/TSP/2026/001',
  agreement_date: '2026-11-03',
  place_of_execution: 'Ralegaon, Yavatmal',
  application_id: 'SEVA-2026-0001',

  first_party_name: DEFAULT_FIRST_PARTY_INFO.name,
  first_party_address: DEFAULT_FIRST_PARTY_INFO.address,
  first_party_representative: DEFAULT_FIRST_PARTY_INFO.representative,
  first_party_designation: DEFAULT_FIRST_PARTY_INFO.designation,

  second_party_name: 'Shri Panchkrushi Mahila Vikas Mandal',
  second_party_address: 'Plot No. 12, Shivaji Nagar, Post Ner, Taluka Ner, Yavatmal, Maharashtra - 445102',
  second_party_representative: 'Kavita Arvind Gawande',
  second_party_designation: 'Secretary & Lead Coordinator',
  second_party_registration_number: 'MAH/542/2014/YTL',
  second_party_email: 'spmvm.yavatmal@gmail.com',
  second_party_phone: '9822451098',

  programme_duration: 'Three (3) months',
  payment_deadline: 'Within one (1) week of signing this Agreement',
  include_maintenance_charge: false,
  annual_maintenance_charge: ANNUAL_MAINTENANCE_CHARGE,
  selected_budget_heads: DEFAULT_BUDGET_HEADS.map((h) => ({
    ...h,
    is_selected: [1, 2, 5].includes(h.id), // MIS Mobile, MIS Web, Website
  })),
  total_annual_cost: 105000,
  seva_supported_cost: 73500, // 70%
  partner_contribution_cost: 31500, // 30%

  bank_holder_name: DEFAULT_BANK_DETAILS.holder_name,
  bank_account_number: DEFAULT_BANK_DETAILS.account_number,
  bank_account_type: DEFAULT_BANK_DETAILS.account_type,
  bank_name: DEFAULT_BANK_DETAILS.bank_name,
  bank_ifsc: DEFAULT_BANK_DETAILS.ifsc,
  bank_branch: DEFAULT_BANK_DETAILS.branch,

  status: 'Draft',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};
