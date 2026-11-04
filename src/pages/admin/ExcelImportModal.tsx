import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import {
  FileSpreadsheet,
  Upload,
  Download,
  CheckCircle2,
  AlertTriangle,
  X,
  FileCheck,
  HelpCircle,
  RefreshCw,
  Info,
} from 'lucide-react';
import { Application } from '../../types';
import { SevaStore } from '../../services/store';

interface ExcelImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: (count: number) => void;
}

interface ParsedRowPreview {
  index: number;
  isValid: boolean;
  validationError?: string;
  data: Partial<Application>;
}

export const ExcelImportModal: React.FC<ExcelImportModalProps> = ({
  isOpen,
  onClose,
  onImportSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'template' | 'guide'>('upload');
  const [fileName, setFileName] = useState<string>('');
  const [parsedRows, setParsedRows] = useState<ParsedRowPreview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successCount, setSuccessCount] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Universal key cleaner: removes spaces, brackets, parentheses, colons, stars, quotes, slashes, hyphens, etc.
  const cleanKey = (str: string): string => {
    return String(str || '')
      .toLowerCase()
      .replace(/[\s\-_.\*()[\]{}:;,\/'"#?!@+]/g, '')
      .trim();
  };

  const mapRowToApplication = (rawRow: Record<string, any>, idx: number): ParsedRowPreview | null => {
    // Check if the entire row has any non-blank value
    const nonBlankEntries = Object.entries(rawRow).filter(([_, v]) => {
      return v !== undefined && v !== null && String(v).trim() !== '';
    });
    if (nonBlankEntries.length === 0) {
      return null; // Skip empty row
    }

    // Build list of cleaned key-value pairs
    const cleanedPairs = nonBlankEntries.map(([k, v]) => ({
      rawKey: k,
      clean: cleanKey(k),
      value: v,
    }));

    // Universal value matcher:
    // Matches if cleaned key exactly matches, or contains the keyword, or the keyword contains the cleaned key
    const getValue = (keywords: string[]): any => {
      for (const kw of keywords) {
        const cleanKw = cleanKey(kw);
        // 1. Exact match on cleaned key
        const exact = cleanedPairs.find((p) => p.clean === cleanKw);
        if (exact) return exact.value;

        // 2. Contains match (e.g. 'संस्थेचेनावorganisationname' matches 'organisation' or 'संस्थेचेनाव')
        const contains = cleanedPairs.find(
          (p) => p.clean.includes(cleanKw) || (cleanKw.length > 3 && cleanKw.includes(p.clean))
        );
        if (contains) return contains.value;
      }
      return undefined;
    };

    let orgName = getValue([
      'संस्थेचे नाव (Organisation Name) *',
      'संस्थेचे नाव (Organisation Name)',
      'संस्थेचे नाव',
      'संस्था नाव',
      'संस्था',
      'name_of_organization',
      'organisation_name',
      'organization_name',
      'organisation',
      'organization',
      'org_name',
      'orgname',
      'name',
    ]);

    // Fallback: If orgName not found via key, use the first non-numeric textual column
    if (!orgName) {
      const candidate = cleanedPairs.find(
        (p) => typeof p.value === 'string' && p.value.trim().length > 1 && isNaN(Number(p.value.trim()))
      );
      if (candidate) {
        orgName = candidate.value;
      }
    }

    const orgType = getValue([
      'संस्थेचा प्रकार (Type)',
      'type_of_organization',
      'organisation_type',
      'संस्थेचा प्रकार',
      'प्रकार',
      'type',
      'org_type',
    ]) || 'Trust';

    const estYear = getValue([
      'स्थापना वर्ष (Year of Est)',
      'year_of_establishment',
      'establishment_year',
      'स्थापना वर्ष',
      'स्थापना',
      'वर्ष',
      'year',
      'est_year',
    ]);

    const regNo = getValue([
      'नोंदणी क्रमांक (Reg Number)',
      'registration_number',
      'reg_no',
      'नोंदणी क्रमांक',
      'नोंदणी क्र',
      'नोंदणी',
      'registration',
    ]) || '';

    const state = getValue([
      'राज्य (State) *',
      'राज्य (State)',
      'state',
      'राज्य',
      'state_name',
    ]) || 'Maharashtra';

    const district = getValue([
      'जिल्हा (District) *',
      'जिल्हा (District)',
      'district',
      'जिल्हा',
      'district_name',
    ]) || '';

    const address = getValue([
      'संस्थेचा पत्ता (Address)',
      'organisation_address',
      'address',
      'संस्थेचा पत्ता',
      'पत्ता',
    ]) || '';

    const email = getValue([
      'ईमेल (Email) *',
      'ईमेल (Email)',
      'organisation_email',
      'ईमेल',
      'ई-मेल',
      'email',
      'mail',
      'contact_email',
    ]) || '';

    const contactPerson = getValue([
      'संपर्क व्यक्ती (Contact Person) *',
      'संपर्क व्यक्ती (Contact Person)',
      'contact_person_name',
      'contact_person',
      'संपर्क व्यक्तीचे नाव',
      'संपर्क व्यक्ती',
      'व्यक्ती',
      'संपर्क',
      'नाव',
      'person_name',
      'contact_name',
    ]) || '';

    const designation = getValue([
      'पद (Designation)',
      'designation',
      'पद',
      'हुद्दा',
      'role',
      'position',
    ]) || 'Coordinator';

    const phone = getValue([
      'मोबाईल क्रमांक (10 Digits) *',
      'मोबाईल क्रमांक (10 Digits)',
      'contact_number',
      'मोबाईल क्रमांक',
      'मोबाईल',
      'फोन',
      'संपर्क क्रमांक',
      'mobile',
      'phone',
      'contact_no',
      'mobile_number',
    ]) || '';

    const keyAreas = getValue([
      'कामाचे क्षेत्र (Key Areas)',
      'key_areas_of_work',
      'focus_areas',
      'कामाचे मुख्य क्षेत्र',
      'कामाचे क्षेत्र',
      'क्षेत्र',
      'sectors',
    ]);

    const villages = getValue([
      'गावे संख्या (Villages)',
      'villages_covered',
      'villages',
      'गावे संख्या',
      'गावे',
      'total_villages',
    ]) || 0;

    const beneficiaries = getValue([
      'वार्षिक लाभार्थी (Beneficiaries)',
      'annual_beneficiaries_reached',
      'beneficiaries',
      'वार्षिक लाभार्थी संख्या',
      'वार्षिक लाभार्थी',
      'लाभार्थी',
      'annual_beneficiaries',
    ]) || 0;

    const primaryBeneficiaries = getValue([
      'प्राथमिक लाभार्थी (Primary Beneficiaries)',
      'primary_beneficiaries',
      'प्राथमिक लाभार्थी',
      'लाभार्थी वर्ग',
      'target_group',
    ]) || 'Rural Communities';

    const supportSeeking = getValue([
      'प्रथम प्राधान्य टेक सपोर्ट (Support Needed)',
      'first_priority_support',
      'support_type_seeking',
      'प्रथम प्राधान्य टेक सपोर्ट',
      'टेक सपोर्ट',
      'मदत',
      'support_type',
    ]) || 'MIS and Digital Data Management';

    const challenges = getValue([
      'सध्याच्या तांत्रिक अडचणी (Tech Challenges)',
      'major_technology_challenges',
      'challenges',
      'सध्याच्या तांत्रिक अडचणी',
      'तांत्रिक अडचणी',
      'अडचणी',
      'tech_challenges',
    ]) || '';

    const status = getValue([
      'status',
      'स्थिती',
    ]) || 'New Application';

    // Validation rule
    const isValid = Boolean(orgName && String(orgName).trim().length > 1);
    const validationError = !isValid ? 'संस्थेचे नाव आढळले नाही.' : undefined;

    const data: Partial<Application> = {
      name_of_organization: String(orgName || '').trim(),
      type_of_organization: String(orgType).trim(),
      year_of_establishment: estYear ? Number(estYear) : new Date().getFullYear(),
      registration_number: String(regNo).trim(),
      state: String(state).trim(),
      district: String(district).trim(),
      organisation_address: String(address).trim(),
      organisation_email: String(email).trim(),
      contact_person_name: String(contactPerson).trim(),
      designation: String(designation).trim(),
      contact_number: String(phone).trim().replace(/[^0-9]/g, '').slice(-10),
      key_areas_of_work: keyAreas
        ? typeof keyAreas === 'string'
          ? keyAreas.split(',').map((s: string) => s.trim()).filter(Boolean)
          : Array.isArray(keyAreas)
          ? keyAreas
          : ['Agriculture', 'Livelihoods']
        : ['Agriculture', 'Livelihoods'],
      villages_covered: Number(villages) || 0,
      annual_beneficiaries_reached: Number(beneficiaries) || 0,
      primary_beneficiaries: String(primaryBeneficiaries).trim(),
      first_priority_support: String(supportSeeking).trim(),
      support_type_seeking: [String(supportSeeking).trim()],
      major_technology_challenges: String(challenges).trim(),
      status: status as any,
    };

    return {
      index: idx + 1,
      isValid,
      validationError,
      data,
    };
  };

  const handleFileProcess = (file: File) => {
    setErrorMsg(null);
    setSuccessCount(null);
    setIsLoading(true);
    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const buffer = e.target?.result;
        if (!buffer) {
          throw new Error('फाईल वाचण्यात त्रुटी आली. कृपया पुन्हा प्रयत्न करा.');
        }

        const workbook = XLSX.read(buffer, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        if (!firstSheetName) {
          throw new Error('एक्सेल शीट रिकामी आहे.');
        }

        const worksheet = workbook.Sheets[firstSheetName];
        const rawJson = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet, {
          defval: '',
        });

        if (!rawJson || rawJson.length === 0) {
          throw new Error('या फाईलमध्ये कोणताही डेटा सापडला नाही. कृपया डेटा तपासा.');
        }

        const nonNullRows = rawJson
          .map((row, i) => mapRowToApplication(row, i))
          .filter((item): item is ParsedRowPreview => item !== null);

        const previews = nonNullRows.map((item, idx) => ({
          ...item,
          index: idx + 1,
        }));

        if (previews.length === 0) {
          throw new Error('या फाईलमध्ये कोणतीही भरलेली ओळ सापडली नाही.');
        }

        setParsedRows(previews);
        setIsLoading(false);
      } catch (err: any) {
        setIsLoading(false);
        setErrorMsg(err?.message || 'फाईल वाचताना अडचण आली. कृपया .xlsx, .xls किंवा .csv फाईल निवडा.');
      }
    };

    reader.onerror = () => {
      setIsLoading(false);
      setErrorMsg('फाईल लोड करताना त्रुटी आली.');
    };

    reader.readAsArrayBuffer(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileProcess(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileProcess(e.target.files[0]);
    }
  };

  // Download Sample Excel (.xlsx) Template
  const downloadTemplate = (format: 'xlsx' | 'csv') => {
    const sampleData = [
      {
        'संस्थेचे नाव (Organisation Name) *': 'ग्राम उत्कर्ष सेवा संस्था',
        'संस्थेचा प्रकार (Type)': 'Trust',
        'स्थापना वर्ष (Year of Est)': 2016,
        'नोंदणी क्रमांक (Reg Number)': 'F-1289/Yavatmal',
        'राज्य (State) *': 'Maharashtra',
        'जिल्हा (District) *': 'Yavatmal',
        'संस्थेचा पत्ता (Address)': 'मु. पो. कळंब, ता. कळंब, जि. यवतमाळ - ४४५४०१',
        'ईमेल (Email) *': 'gramutkarsh.yavatmal@gmail.com',
        'संपर्क व्यक्ती (Contact Person) *': 'दिलीप नारायणराव देशमुख',
        'पद (Designation)': 'सचिव (Secretary)',
        'मोबाईल क्रमांक (10 Digits) *': '9822114477',
        'कामाचे क्षेत्र (Key Areas)': 'Agriculture, Water, Livelihoods',
        'गावे संख्या (Villages)': 24,
        'वार्षिक लाभार्थी (Beneficiaries)': 3200,
        'प्राथमिक लाभार्थी (Primary Beneficiaries)': 'अल्पभूधारक शेतकरी व महिला बचत गट',
        'प्रथम प्राधान्य टेक सपोर्ट (Support Needed)': 'MIS and Digital Data Management',
        'सध्याच्या तांत्रिक अडचणी (Tech Challenges)': 'शेतकरी प्रशिक्षण व बचत गट नोंदी वह्यांमध्ये लिहिल्या जातात, डिजिटल डेटाबेसमधून वेळेवर अहवाल तयार होत नाहीत',
      },
      {
        'संस्थेचे नाव (Organisation Name) *': 'सहानुभूती महिला व बाल विकास संस्था',
        'संस्थेचा प्रकार (Type)': 'Society',
        'स्थापना वर्ष (Year of Est)': 2018,
        'नोंदणी क्रमांक (Reg Number)': 'MAH-342/Wardha',
        'राज्य (State) *': 'Maharashtra',
        'जिल्हा (District) *': 'Wardha',
        'संस्थेचा पत्ता (Address)': 'प्लॉट नं. १५, स्नेह नगर, वर्धा - ४४२००१',
        'ईमेल (Email) *': 'sahanubhuti.wardha@gmail.com',
        'संपर्क व्यक्ती (Contact Person) *': 'सुनिता बाबाराव पाटील',
        'पद (Designation)': 'प्रकल्प समन्वयक (Project Coordinator)',
        'मोबाईल क्रमांक (10 Digits) *': '9423556688',
        'कामाचे क्षेत्र (Key Areas)': 'Women Empowerment, Health, Education',
        'गावे संख्या (Villages)': 18,
        'वार्षिक लाभार्थी (Beneficiaries)': 1850,
        'प्राथमिक लाभार्थी (Primary Beneficiaries)': 'ग्रामीण महिला व किशोरवयीन मुली',
        'प्रथम प्राधान्य टेक सपोर्ट (Support Needed)': 'Website Development and Support',
        'सध्याच्या तांत्रिक अडचणी (Tech Challenges)': 'अधिकृत वेबसाईट नसल्यामुळे दाते व सीएसआर कंपन्यांपर्यंत कामाचे वार्षिक अहवाल पोहोचवता येत नाहीत',
      },
      {
        'संस्थेचे नाव (Organisation Name) *': 'जल-धरित्री पर्यावरण विकास मंच',
        'संस्थेचा प्रकार (Type)': 'Section 8 Company',
        'स्थापना वर्ष (Year of Est)': 2020,
        'नोंदणी क्रमांक (Reg Number)': 'U85300MH2020NPL12345',
        'राज्य (State) *': 'Maharashtra',
        'जिल्हा (District) *': 'Amravati',
        'संस्थेचा पत्ता (Address)': 'चांदूर बाजार रोड, परतवाडा, अमरावती - ४४४८०५',
        'ईमेल (Email) *': 'jaldharitri.ngo@gmail.com',
        'संपर्क व्यक्ती (Contact Person) *': 'प्रमोद विठ्ठलराव ठाकरे',
        'पद (Designation)': 'संचालक (Director)',
        'मोबाईल क्रमांक (10 Digits) *': '9890123456',
        'कामाचे क्षेत्र (Key Areas)': 'Water, Natural Resource Management',
        'गावे संख्या (Villages)': 32,
        'वार्षिक लाभार्थी (Beneficiaries)': 4500,
        'प्राथमिक लाभार्थी (Primary Beneficiaries)': 'कोरडवाहू शेतकरी व जल समिता सदस्य',
        'प्रथम प्राधान्य टेक सपोर्ट (Support Needed)': 'Mobile or Web-Based Application Development',
        'सध्याच्या तांत्रिक अडचणी (Tech Challenges)': 'पाणलोट बंधारे व विहिरींचे जिओ-टॅगिंग व जलपातळी मोजणी मोबाईल ॲपद्वारे नोंदवणे आवश्यक आहे',
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(sampleData);

    // Set column widths for readability
    worksheet['!cols'] = [
      { wch: 32 }, // org name
      { wch: 18 }, // type
      { wch: 14 }, // year
      { wch: 20 }, // reg no
      { wch: 18 }, // state
      { wch: 18 }, // district
      { wch: 36 }, // address
      { wch: 32 }, // email
      { wch: 26 }, // contact person
      { wch: 22 }, // designation
      { wch: 18 }, // phone
      { wch: 32 }, // key areas
      { wch: 14 }, // villages
      { wch: 18 }, // beneficiaries
      { wch: 32 }, // primary beneficiaries
      { wch: 36 }, // first priority support
      { wch: 45 }, // challenges
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SEVA_Data_Import');

    if (format === 'xlsx') {
      XLSX.writeFile(workbook, 'SEVA_Admin_Application_Data_Template.xlsx');
    } else {
      XLSX.writeFile(workbook, 'SEVA_Admin_Application_Data_Template.csv', { bookType: 'csv' });
    }
  };

  const handleImportToDatabase = () => {
    const validRows = parsedRows.filter((r) => r.isValid).map((r) => r.data);
    if (validRows.length === 0) {
      setErrorMsg('अपलोड करण्यासाठी कोणतीही वैध नोंद सापडली नाही.');
      return;
    }

    try {
      const result = SevaStore.bulkImportApplications(validRows);
      setSuccessCount(result.successCount);
      onImportSuccess(result.successCount);
    } catch (err: any) {
      setErrorMsg('डेटा सेव्ह करताना त्रुटी आली: ' + (err?.message || 'Unknown error'));
    }
  };

  const validCount = parsedRows.filter((r) => r.isValid).length;
  const invalidCount = parsedRows.length - validCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#0F3825] text-white p-6 flex items-center justify-between border-b border-[#184E34]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#184E34] border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white">Excel / CSV डेटा बल्क अपलोड</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 text-[11px] font-semibold border border-emerald-500/30">
                  Admin Tool
                </span>
              </div>
              <p className="text-xs text-emerald-200/80">
                एकाच वेळी अनेक संस्थांचा डेटा Excel किंवा CSV फाईलवरून थेट सिस्टीममध्ये जोडा
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-stone-200 bg-stone-50">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all cursor-pointer flex items-center gap-2 border-b-2 ${
              activeTab === 'upload'
                ? 'bg-white border-[#184E34] text-[#184E34] shadow-xs'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>१. एक्सेल फाईल अपलोड करा (Upload)</span>
          </button>

          <button
            onClick={() => setActiveTab('template')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all cursor-pointer flex items-center gap-2 border-b-2 ${
              activeTab === 'template'
                ? 'bg-white border-[#184E34] text-[#184E34] shadow-xs'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>२. नमुना शीट डाउनलोड करा (Template)</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all cursor-pointer flex items-center gap-2 border-b-2 ${
              activeTab === 'guide'
                ? 'bg-white border-[#184E34] text-[#184E34] shadow-xs'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>३. कॉलम मार्गदर्शक (Instructions)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: Upload & Preview */}
          {activeTab === 'upload' && (
            <div className="space-y-6">
              {successCount !== null ? (
                <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-emerald-950">
                      डेटा यशस्वीरीत्या अपलोड झाला!
                    </h4>
                    <p className="text-sm text-emerald-700 mt-1">
                      एकूण <strong className="font-mono text-base">{successCount}</strong> संस्थांच्या नोंदी Admin Portal च्या डेटाबेसमध्ये समाविष्ट करण्यात आल्या आहेत.
                    </p>
                  </div>
                  <div className="flex justify-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setParsedRows([]);
                        setFileName('');
                        setSuccessCount(null);
                      }}
                      className="px-4 py-2 rounded-xl bg-white border border-emerald-300 text-emerald-800 text-xs font-bold hover:bg-emerald-50 transition-colors cursor-pointer"
                    >
                      आणखी फाईल अपलोड करा
                    </button>
                    <button
                      onClick={onClose}
                      className="px-5 py-2 rounded-xl bg-[#184E34] text-white text-xs font-bold hover:bg-[#0F3825] transition-colors cursor-pointer"
                    >
                      डॅशबोर्डवर पहा
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Dropzone */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all ${
                      isDragging
                        ? 'border-[#184E34] bg-emerald-50/70 scale-[1.01]'
                        : 'border-stone-300 hover:border-emerald-600 bg-stone-50/50 hover:bg-emerald-50/30'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".xlsx, .xls, .csv"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#184E34] flex items-center justify-center mx-auto mb-3 shadow-xs">
                      <Upload className="w-7 h-7" />
                    </div>
                    <div className="font-bold text-stone-900 text-base">
                      {fileName ? fileName : 'तुमची Excel Sheet (.xlsx, .xls) किंवा CSV फाईल येथे ड्रॅग करा'}
                    </div>
                    <p className="text-xs text-stone-500 mt-1">
                      किंवा कॉम्प्युटरवरून निवडण्यासाठी येथे क्लिक करा (Click to browse files)
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-stone-400">
                      <span className="px-2.5 py-1 rounded-md bg-white border border-stone-200 font-mono">
                        .xlsx
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-white border border-stone-200 font-mono">
                        .xls
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-white border border-stone-200 font-mono">
                        .csv
                      </span>
                    </div>
                  </div>

                  {/* Loading */}
                  {isLoading && (
                    <div className="flex items-center justify-center gap-2 py-4 text-xs text-stone-600">
                      <RefreshCw className="w-4 h-4 animate-spin text-[#184E34]" />
                      <span>फाईल वाचली जात आहे, कृपया प्रतीक्षा करा...</span>
                    </div>
                  )}

                  {/* Error Alert */}
                  {errorMsg && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-xs text-red-700">
                      <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-semibold">त्रुटी:</strong>
                        <span>{errorMsg}</span>
                      </div>
                    </div>
                  )}

                  {/* Preview Section */}
                  {parsedRows.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-stone-100 p-3.5 rounded-xl border border-stone-200">
                        <div className="flex items-center gap-3 text-xs">
                          <span className="font-bold text-stone-900">
                            एकूण {parsedRows.length} नोंदी आढळल्या:
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold font-mono text-[11px]">
                            {validCount} वैध नोंदी
                          </span>
                          {invalidCount > 0 && (
                            <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 font-bold font-mono text-[11px]">
                              {invalidCount} अवैध नोंदी
                            </span>
                          )}
                        </div>

                        <button
                          onClick={handleImportToDatabase}
                          disabled={validCount === 0}
                          className="px-5 py-2 rounded-xl bg-[#184E34] hover:bg-[#0F3825] text-white text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 shadow-xs active:scale-[0.98]"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{validCount} नोंदी सिस्टीममध्ये सेव्ह करा</span>
                        </button>
                      </div>

                      {/* Preview Table */}
                      <div className="border border-stone-200 rounded-xl overflow-hidden max-h-72 overflow-y-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider text-[10px] sticky top-0">
                            <tr>
                              <th className="py-2.5 px-3">#</th>
                              <th className="py-2.5 px-3">संस्थेचे नाव</th>
                              <th className="py-2.5 px-3">राज्य व जिल्हा</th>
                              <th className="py-2.5 px-3">संपर्क व्यक्ती</th>
                              <th className="py-2.5 px-3">मोबाईल</th>
                              <th className="py-2.5 px-3">टेक सपोर्ट</th>
                              <th className="py-2.5 px-3 text-right">स्थिती</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-stone-100 text-stone-700">
                            {parsedRows.map((r) => (
                              <tr key={r.index} className={r.isValid ? 'hover:bg-stone-50/70' : 'bg-red-50/40'}>
                                <td className="py-2 px-3 font-mono text-stone-400">{r.index}</td>
                                <td className="py-2 px-3 font-semibold text-stone-900">
                                  {r.data.name_of_organization || (
                                    <span className="text-red-500 italic">संस्थेचे नाव रिक्त आहे</span>
                                  )}
                                </td>
                                <td className="py-2 px-3 whitespace-nowrap">
                                  <div>{r.data.district || '—'}</div>
                                  <div className="text-[10px] text-stone-400">{r.data.state}</div>
                                </td>
                                <td className="py-2 px-3">{r.data.contact_person_name || '—'}</td>
                                <td className="py-2 px-3 font-mono text-[11px]">{r.data.contact_number || '—'}</td>
                                <td className="py-2 px-3 max-w-[150px] truncate" title={r.data.first_priority_support}>
                                  {r.data.first_priority_support || 'MIS'}
                                </td>
                                <td className="py-2 px-3 text-right whitespace-nowrap">
                                  {r.isValid ? (
                                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 inline-flex items-center gap-1">
                                      <CheckCircle2 className="w-2.5 h-2.5" />
                                      तयार
                                    </span>
                                  ) : (
                                    <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-700 text-[10px] font-bold border border-red-200 inline-flex items-center gap-1" title={r.validationError}>
                                      <AlertTriangle className="w-2.5 h-2.5" />
                                      अपूर्ण
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* TAB 2: Download Template */}
          {activeTab === 'template' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#184E34] flex items-center justify-center shrink-0">
                  <FileCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-950 text-sm">
                    तयार नमुना एक्सेल शीट (Ready-made Sample Template)
                  </h4>
                  <p className="text-xs text-emerald-800/90 mt-1 leading-relaxed">
                    तुमचा डेटा व्यवस्थित आणि अचूकपणे अपलोड होण्यासाठी आम्ही सर्व योग्य कॉलम हेडिंग्ज आणि ३ प्रात्यक्षिक उदाहरणांसह (यवतमाळ, वर्धा, अमरावती) एक्सेल शीट तयार केली आहे. ती डाउनलोड करून त्यात तुमचा डेटा भरा आणि अपलोड करा.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    <button
                      onClick={() => downloadTemplate('xlsx')}
                      className="px-4 py-2.5 rounded-xl bg-[#184E34] hover:bg-[#0F3825] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs transition-all active:scale-[0.98]"
                    >
                      <Download className="w-4 h-4" />
                      <span>नमुना Excel (.xlsx) फाईल डाउनलोड करा</span>
                    </button>

                    <button
                      onClick={() => downloadTemplate('csv')}
                      className="px-4 py-2.5 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-2xs transition-all"
                    >
                      <Download className="w-4 h-4 text-stone-500" />
                      <span>नमुना CSV (.csv) फाईल डाउनलोड करा</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Instructions steps */}
              <div className="space-y-3">
                <h5 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                  डेटा भरताना या सोप्या पायऱ्या वापरा:
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-1">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#184E34] font-bold text-xs flex items-center justify-center font-mono">
                      १
                    </div>
                    <div className="font-bold text-stone-900 pt-1">टेम्पलेट डाउनलोड करा</div>
                    <p className="text-stone-500 text-[11px]">
                      वरील हिरव्या बटनावर क्लिक करून एक्सेल शीट तुमच्या कॉम्प्युटरवर सेव्ह करा.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-1">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#184E34] font-bold text-xs flex items-center justify-center font-mono">
                      २
                    </div>
                    <div className="font-bold text-stone-900 pt-1">संस्थांचा डेटा भरा</div>
                    <p className="text-stone-500 text-[11px]">
                      कॉलम हेडिंग न बदलता प्रत्येक ओळीत एका संस्थेची माहिती (नाव, जिल्हा, मोबाईल, इत्यादी) भरा.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-1">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#184E34] font-bold text-xs flex items-center justify-center font-mono">
                      ३
                    </div>
                    <div className="font-bold text-stone-900 pt-1">शीट अपलोड करा</div>
                    <p className="text-stone-500 text-[11px]">
                      पहिल्या टॅबमध्ये जाऊन सेव्ह केलेली एक्सेल फाईल अपलोड करा व 'सेव्ह करा' बटनावर क्लिक करा.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Column Guide */}
          {activeTab === 'guide' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong>टीप:</strong> आमची सिस्टीम मराठी आणि इंग्रजी दोन्ही भाषांमधील कॉलम नावे ओळखते. तुम्ही खालीलपैकी कोणतीही कॉलम हेडिंग वापरू शकता.
                </div>
              </div>

              <div className="border border-stone-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-700 font-bold uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">कॉलमचे नाव (Field)</th>
                      <th className="py-2.5 px-4">मराठी / इंग्रजी हेडिंग्ज</th>
                      <th className="py-2.5 px-4">आवश्यक आहे का?</th>
                      <th className="py-2.5 px-4">उदाहरणे / पर्याय</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-700">
                    <tr>
                      <td className="py-2 px-4 font-bold text-stone-900">संस्थेचे नाव</td>
                      <td className="py-2 px-4 font-mono text-[11px]">name_of_organization, संस्थेचे नाव</td>
                      <td className="py-2 px-4 text-emerald-700 font-bold">होय (Required)</td>
                      <td className="py-2 px-4">उदा. ग्राम उत्कर्ष सेवा संस्था</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-bold text-stone-900">संस्थेचा प्रकार</td>
                      <td className="py-2 px-4 font-mono text-[11px]">type_of_organization, प्रकार</td>
                      <td className="py-2 px-4 text-stone-400">ऐच्छिक</td>
                      <td className="py-2 px-4">Trust, Society, Section 8, CBO</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-bold text-stone-900">स्थापना वर्ष</td>
                      <td className="py-2 px-4 font-mono text-[11px]">year_of_establishment, वर्ष</td>
                      <td className="py-2 px-4 text-stone-400">ऐच्छिक</td>
                      <td className="py-2 px-4">उदा. 2015</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-bold text-stone-900">नोंदणी क्रमांक</td>
                      <td className="py-2 px-4 font-mono text-[11px]">registration_number, नोंदणी क्र</td>
                      <td className="py-2 px-4 text-stone-400">ऐच्छिक</td>
                      <td className="py-2 px-4">उदा. F-1289/Yavatmal</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-bold text-stone-900">राज्य</td>
                      <td className="py-2 px-4 font-mono text-[11px]">state, राज्य</td>
                      <td className="py-2 px-4 text-emerald-700 font-bold">होय (Required)</td>
                      <td className="py-2 px-4">उदा. Maharashtra</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-bold text-stone-900">जिल्हा</td>
                      <td className="py-2 px-4 font-mono text-[11px]">district, जिल्हा</td>
                      <td className="py-2 px-4 text-emerald-700 font-bold">होय (Required)</td>
                      <td className="py-2 px-4">उदा. Yavatmal, Wardha, Amravati</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-bold text-stone-900">संपर्क व्यक्तीचे नाव</td>
                      <td className="py-2 px-4 font-mono text-[11px]">contact_person_name, संपर्क व्यक्ती</td>
                      <td className="py-2 px-4 text-emerald-700 font-bold">होय (Required)</td>
                      <td className="py-2 px-4">उदा. दिलीप नारायणराव देशमुख</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-bold text-stone-900">मोबाईल क्रमांक</td>
                      <td className="py-2 px-4 font-mono text-[11px]">contact_number, मोबाईल, फोन</td>
                      <td className="py-2 px-4 text-emerald-700 font-bold">होय (Required)</td>
                      <td className="py-2 px-4">१० अंकी मोबाईल नंबर (उदा. 9822114477)</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-bold text-stone-900">ईमेल पत्ता</td>
                      <td className="py-2 px-4 font-mono text-[11px]">organisation_email, ईमेल</td>
                      <td className="py-2 px-4 text-emerald-700 font-bold">होय (Required)</td>
                      <td className="py-2 px-4">उदा. gramutkarsh@gmail.com</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-bold text-stone-900">प्रथम प्राधान्य टेक सपोर्ट</td>
                      <td className="py-2 px-4 font-mono text-[11px]">first_priority_support, टेक सपोर्ट</td>
                      <td className="py-2 px-4 text-stone-400">ऐच्छिक</td>
                      <td className="py-2 px-4">MIS, Website, Mobile App, Capacity Building</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-stone-50 border-t border-stone-200 px-6 py-4 flex items-center justify-between text-xs">
          <div className="text-stone-500">
            मदत हवी असल्यास <span className="font-mono text-stone-800">seva.ecology@gmail.com</span> वर संपर्क साधा.
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 font-bold transition-colors cursor-pointer"
          >
            बंद करा (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
