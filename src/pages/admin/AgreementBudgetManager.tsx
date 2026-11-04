import React, { useState } from 'react';
import {
  FileText,
  Download,
  Mail,
  Printer,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  Plus,
  Trash2,
  Edit3,
  Building2,
  DollarSign,
  ShieldCheck,
  Calendar,
  Check,
  FileSpreadsheet,
  FileCheck,
  RefreshCw,
  X,
  Share2,
} from 'lucide-react';
import { Application, BudgetHeadItem, TechnologySupportAgreement } from '../../types';
import { SevaStore } from '../../services/store';
import {
  DEFAULT_BUDGET_HEADS,
  DEFAULT_FIRST_PARTY_INFO,
  DEFAULT_BANK_DETAILS,
  ANNUAL_MAINTENANCE_CHARGE,
  calculateBudget,
} from '../../data/budgetBreakup';

interface AgreementBudgetManagerProps {
  applications: Application[];
  onSelectApplicationForDetail?: (app: Application) => void;
  onNavigateToEmails?: (app: Application) => void;
}

export const AgreementBudgetManager: React.FC<AgreementBudgetManagerProps> = ({
  applications,
  onNavigateToEmails,
}) => {
  const [agreements, setAgreements] = useState<TechnologySupportAgreement[]>(
    SevaStore.getAgreements()
  );

  // Active agreement being edited or previewed
  const [currentAgreement, setCurrentAgreement] = useState<TechnologySupportAgreement>(
    agreements[0] || SevaStore.getAgreements()[0]
  );

  const [activeTab, setActiveTab] = useState<'full_agreement' | 'budget_only'>('full_agreement');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);

  // Recalculate totals whenever budget heads or maintenance toggle change
  const budgetSummary = calculateBudget(
    currentAgreement.selected_budget_heads,
    currentAgreement.include_maintenance_charge
  );

  // Select an existing agreement from history
  const handleSelectAgreement = (agr: TechnologySupportAgreement) => {
    setCurrentAgreement(agr);
  };

  // Populate data when selecting a Partner Organisation from Applications list
  const handleSelectPartnerApplication = (appId: string) => {
    const app = applications.find((a) => a.id === appId);
    if (!app) return;

    // Match requested support areas to budget heads
    const supportAreasLower = (app.support_type_seeking || []).map((s) => s.toLowerCase());

    const updatedHeads = currentAgreement.selected_budget_heads.map((head) => {
      const headNameLower = head.head_name.toLowerCase();
      let matched = false;

      if (headNameLower.includes('mobile') && supportAreasLower.some((s) => s.includes('mobile') || s.includes('app'))) {
        matched = true;
      } else if (headNameLower.includes('web application') && supportAreasLower.some((s) => s.includes('mis') || s.includes('web-based'))) {
        matched = true;
      } else if (headNameLower.includes('website') && supportAreasLower.some((s) => s.includes('website'))) {
        matched = true;
      } else if (headNameLower.includes('capacity') && supportAreasLower.some((s) => s.includes('capacity') || s.includes('training'))) {
        matched = true;
      } else if (headNameLower.includes('documentation') && supportAreasLower.some((s) => s.includes('documentation') || s.includes('reporting'))) {
        matched = true;
      }

      return {
        ...head,
        is_selected: matched || [1, 2, 5].includes(head.id), // Default fallback to core heads if none matched
      };
    });

    const newTotals = calculateBudget(updatedHeads, currentAgreement.include_maintenance_charge);

    const updatedAgr: TechnologySupportAgreement = {
      ...currentAgreement,
      application_id: app.id,
      id: `SEVA/TSP/2026/${app.id.replace('SEVA-2026-', '')}`,
      second_party_name: app.name_of_organization,
      second_party_address: `${app.organisation_address || ''}, ${app.district}, ${app.state}`,
      second_party_representative: app.contact_person_name,
      second_party_designation: app.designation || 'Secretary / Authorized Representative',
      second_party_registration_number: app.registration_number || 'Under Verification',
      second_party_email: app.organisation_email,
      second_party_phone: app.contact_number,
      selected_budget_heads: updatedHeads,
      total_annual_cost: newTotals.grandTotal,
      seva_supported_cost: newTotals.sevaSupported,
      partner_contribution_cost: newTotals.partnerContribution,
    };

    setCurrentAgreement(updatedAgr);
    SevaStore.saveAgreement(updatedAgr);
    setAgreements(SevaStore.getAgreements());
    showNotice('संस्थेचा तपशील व मागितलेल्या सेवा बजेटमध्ये समाविष्ट केल्या आहेत!');
  };

  // Toggle individual budget head item
  const handleToggleBudgetHead = (headId: number) => {
    const updatedHeads = currentAgreement.selected_budget_heads.map((h) =>
      h.id === headId ? { ...h, is_selected: !h.is_selected } : h
    );

    const totals = calculateBudget(updatedHeads, currentAgreement.include_maintenance_charge);

    const updatedAgr: TechnologySupportAgreement = {
      ...currentAgreement,
      selected_budget_heads: updatedHeads,
      total_annual_cost: totals.grandTotal,
      seva_supported_cost: totals.sevaSupported,
      partner_contribution_cost: totals.partnerContribution,
    };

    setCurrentAgreement(updatedAgr);
    SevaStore.saveAgreement(updatedAgr);
    setAgreements(SevaStore.getAgreements());
  };

  // Toggle maintenance charge
  const handleToggleMaintenance = () => {
    const nextVal = !currentAgreement.include_maintenance_charge;
    const totals = calculateBudget(currentAgreement.selected_budget_heads, nextVal);

    const updatedAgr: TechnologySupportAgreement = {
      ...currentAgreement,
      include_maintenance_charge: nextVal,
      total_annual_cost: totals.grandTotal,
      seva_supported_cost: totals.sevaSupported,
      partner_contribution_cost: totals.partnerContribution,
    };

    setCurrentAgreement(updatedAgr);
    SevaStore.saveAgreement(updatedAgr);
    setAgreements(SevaStore.getAgreements());
  };

  // Select All or Core 3
  const handleSelectCoreServices = () => {
    const updatedHeads = currentAgreement.selected_budget_heads.map((h) => ({
      ...h,
      is_selected: [1, 2, 5].includes(h.id), // MIS Mobile, MIS Web, Website
    }));
    const totals = calculateBudget(updatedHeads, currentAgreement.include_maintenance_charge);
    const updatedAgr = {
      ...currentAgreement,
      selected_budget_heads: updatedHeads,
      total_annual_cost: totals.grandTotal,
      seva_supported_cost: totals.sevaSupported,
      partner_contribution_cost: totals.partnerContribution,
    };
    setCurrentAgreement(updatedAgr);
    SevaStore.saveAgreement(updatedAgr);
    setAgreements(SevaStore.getAgreements());
  };

  const handleSelectAllServices = () => {
    const updatedHeads = currentAgreement.selected_budget_heads.map((h) => ({
      ...h,
      is_selected: true,
    }));
    const totals = calculateBudget(updatedHeads, currentAgreement.include_maintenance_charge);
    const updatedAgr = {
      ...currentAgreement,
      selected_budget_heads: updatedHeads,
      total_annual_cost: totals.grandTotal,
      seva_supported_cost: totals.sevaSupported,
      partner_contribution_cost: totals.partnerContribution,
    };
    setCurrentAgreement(updatedAgr);
    SevaStore.saveAgreement(updatedAgr);
    setAgreements(SevaStore.getAgreements());
  };

  // Create new fresh agreement draft
  const handleCreateNewAgreement = () => {
    const count = agreements.length + 1;
    const newAgr: TechnologySupportAgreement = {
      id: `SEVA/TSP/2026/${String(count).padStart(3, '0')}`,
      agreement_date: new Date().toISOString().split('T')[0],
      place_of_execution: 'Ralegaon, Yavatmal',
      first_party_name: DEFAULT_FIRST_PARTY_INFO.name,
      first_party_address: DEFAULT_FIRST_PARTY_INFO.address,
      first_party_representative: DEFAULT_FIRST_PARTY_INFO.representative,
      first_party_designation: DEFAULT_FIRST_PARTY_INFO.designation,

      second_party_name: 'नवीन भागीदार संस्था',
      second_party_address: 'संस्थेचा संपूर्ण पत्ता, जिल्हा, राज्य',
      second_party_representative: 'अधिकृत प्रतिनिधींचे नाव',
      second_party_designation: 'अध्यक्ष / सचिव',
      second_party_registration_number: 'नोंदणी क्रमांक',
      second_party_email: '',
      second_party_phone: '',

      programme_duration: 'Three (3) months',
      payment_deadline: 'Within one (1) week of signing this Agreement',
      include_maintenance_charge: false,
      annual_maintenance_charge: ANNUAL_MAINTENANCE_CHARGE,
      selected_budget_heads: DEFAULT_BUDGET_HEADS.map((h) => ({
        ...h,
        is_selected: [1, 2, 5].includes(h.id),
      })),
      total_annual_cost: 105000,
      seva_supported_cost: 73500,
      partner_contribution_cost: 31500,

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

    SevaStore.saveAgreement(newAgr);
    setAgreements(SevaStore.getAgreements());
    setCurrentAgreement(newAgr);
    showNotice('नवीन कराराचा मसुदा तयार झाला आहे!');
  };

  const showNotice = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  // Print agreement via browser print (formats into print-ready PDF)
  const handlePrint = () => {
    window.print();
  };

  // Generate and download Microsoft Word document (.doc)
  const handleDownloadWordDoc = () => {
    const selectedHeads = currentAgreement.selected_budget_heads.filter((h) => h.is_selected);
    const totals = calculateBudget(currentAgreement.selected_budget_heads, currentAgreement.include_maintenance_charge);

    const docContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${currentAgreement.id} - SEVA Technology Support Programme Agreement</title>
        <style>
          @page { size: A4; margin: 2cm; }
          body { font-family: 'Calibri', 'Segoe UI', Arial, sans-serif; font-size: 11pt; line-height: 1.45; color: #111111; }
          h1 { font-size: 16pt; font-weight: bold; text-align: center; color: #184E34; margin-bottom: 2pt; text-transform: uppercase; }
          h2 { font-size: 14pt; font-weight: bold; text-align: center; margin-bottom: 4pt; }
          h3 { font-size: 12pt; font-weight: bold; text-align: center; color: #555; margin-bottom: 14pt; }
          h4 { font-size: 11pt; font-weight: bold; margin-top: 14pt; margin-bottom: 4pt; color: #0F3825; border-bottom: 1pt solid #184E34; padding-bottom: 2pt; }
          table { width: 100%; border-collapse: collapse; margin: 10pt 0; font-size: 10pt; }
          th, td { border: 1pt solid #333333; padding: 6pt 8pt; text-align: left; vertical-align: top; }
          th { background-color: #184E34; color: #ffffff; font-weight: bold; }
          .highlight { background-color: #fef08a; font-weight: bold; }
          .sig-box { height: 60pt; vertical-align: top; }
          .note { font-size: 9pt; color: #555555; margin-top: 4pt; }
        </style>
      </head>
      <body>
        <h1>TECHNOLOGY SUPPORT PROGRAMME</h1>
        <h2>AGREEMENT</h2>
        <h3>Between<br/>Substantiable Ecology &amp; Village Advancement (SEVA)<br/>and<br/>${currentAgreement.second_party_name}</h3>

        <table>
          <tr>
            <th style="width:33%;">Agreement Date</th>
            <th style="width:33%;">Place of Execution</th>
            <th style="width:34%;">Agreement Reference No.</th>
          </tr>
          <tr>
            <td>${currentAgreement.agreement_date}</td>
            <td>${currentAgreement.place_of_execution}</td>
            <td><strong>${currentAgreement.id}</strong></td>
          </tr>
        </table>

        <h4>PARTIES</h4>
        <p><strong>FIRST PARTY — Technology Support Providing Organisation</strong><br/>
        Name: ${currentAgreement.first_party_name}<br/>
        Registered Address: ${currentAgreement.first_party_address}<br/>
        Authorised Representative: ${currentAgreement.first_party_representative}<br/>
        Designation: ${currentAgreement.first_party_designation}<br/>
        Hereinafter referred to as <strong>"SEVA"</strong>.</p>

        <p><strong>SECOND PARTY — Technology Support Receiving Organisation</strong><br/>
        Name of Organisation: <strong>${currentAgreement.second_party_name}</strong><br/>
        Registered Address: ${currentAgreement.second_party_address}<br/>
        Authorised Representative: ${currentAgreement.second_party_representative}<br/>
        Designation: ${currentAgreement.second_party_designation}<br/>
        Registration Number: ${currentAgreement.second_party_registration_number}<br/>
        Contact Email: ${currentAgreement.second_party_email} | Contact Phone: ${currentAgreement.second_party_phone}<br/>
        Hereinafter referred to as the <strong>"Participating Organisation"</strong>.</p>

        <p>SEVA and the Participating Organisation are hereinafter collectively referred to as the <strong>"Parties"</strong>.</p>

        <h4>1. PURPOSE OF THE AGREEMENT</h4>
        <p>This Agreement is entered into to strengthen the technical capacity of the Participating Organisation, promote effective use of digital technology in its operations, improve information management, and equip its team with required technical skills.<br/>
        Technology support will be provided after assessing the Participating Organisation's needs, available resources, existing digital systems, organisational priorities, and technical challenges.</p>

        <h4>2. SELECTION AND PLANNING PROCESS</h4>
        <p>2.1 The Participating Organisation has been preliminarily selected for the first phase of the Programme.<br/>
        2.2 Before final selection, SEVA will conduct a meeting or discussion with the Participating Organisation.<br/>
        2.3 The meeting will assess technical needs, existing systems, digital workflows, information-management requirements, and training needs.<br/>
        2.4 SEVA will decide final selection based on this assessment.<br/>
        2.5 After final selection, the Parties will mutually finalise a detailed work plan, priorities, implementation schedule, and expected outcomes.</p>

        <h4>3. SCOPE OF TECHNOLOGY SUPPORT</h4>
        <p>Subject to the approved work plan, SEVA may provide the following support:</p>
        <ul>
          ${selectedHeads.map((h) => `<li><strong>${h.head_name}:</strong> ${h.description}</li>`).join('')}
        </ul>
        <p>SEVA is required to provide a maximum of three (3) services from the above scope for standard programmes, or as mutually agreed in writing. The actual services, scope, and deliverables will be as per the work plan approved in writing by both Parties.</p>

        <h4>4. FINANCIAL TERMS</h4>
        <table>
          <tr>
            <th style="width:40%;">Item</th>
            <th style="width:60%;">Terms</th>
          </tr>
          <tr>
            <td><strong>Total annual programme cost</strong></td>
            <td><strong>₹${totals.grandTotal.toLocaleString('en-IN')}</strong> (As per the approved programme budget)</td>
          </tr>
          <tr>
            <td><strong>Participating Organisation's contribution</strong></td>
            <td><strong>30% of annual programme cost = ₹${totals.partnerContribution.toLocaleString('en-IN')}</strong></td>
          </tr>
          <tr>
            <td><strong>SEVA-supported portion</strong></td>
            <td><strong>70% of annual programme cost = ₹${totals.sevaSupported.toLocaleString('en-IN')}</strong></td>
          </tr>
          <tr>
            <td><strong>Nature of SEVA support</strong></td>
            <td>Technical services, guidance, training, and capacity building</td>
          </tr>
          <tr>
            <td><strong>Cash assistance / grant / donation</strong></td>
            <td>Not applicable</td>
          </tr>
          <tr>
            <td><strong>Payment method</strong></td>
            <td>NEFT to SEVA account</td>
          </tr>
          <tr>
            <td><strong>Payment deadline</strong></td>
            <td>${currentAgreement.payment_deadline}</td>
          </tr>
          <tr>
            <td><strong>Programme duration</strong></td>
            <td>${currentAgreement.programme_duration}</td>
          </tr>
        </table>
        <p>4.1 Additional costs for requirements outside the approved programme scope will require prior written approval of both Parties.<br/>
        4.2 Any change to the programme scope or cost will be effective only after written agreement by both Parties.<br/>
        4.3 The 70% SEVA-supported portion represents the value of technical and direct support and is not a cash transfer to the Participating Organisation.</p>

        <h4>5. RESPONSIBILITIES OF SEVA</h4>
        <ul>
          <li>Assess the technical needs of the Participating Organisation.</li>
          <li>Provide technology guidance, support, and capacity building as per the approved work plan.</li>
          <li>Assist with technical planning and implementation.</li>
          <li>Provide training and support to resolve technical difficulties.</li>
          <li>Coordinate periodic progress reviews.</li>
          <li>Communicate approved services and deliverables to the Participating Organisation.</li>
        </ul>

        <h4>6. RESPONSIBILITIES OF THE PARTICIPATING ORGANISATION</h4>
        <ul>
          <li>Provide required information regarding technical needs, priorities, and existing systems.</li>
          <li>Appoint a coordinator or responsible staff member for programme implementation.</li>
          <li>Ensure participation of relevant staff in meetings, trainings, and technical discussions.</li>
          <li>Provide information, documents, and feedback within agreed timelines.</li>
          <li>Deposit the agreed financial contribution (30% = ₹${totals.partnerContribution.toLocaleString('en-IN')}) on time.</li>
          <li>Use developed digital systems appropriately and train relevant staff.</li>
          <li>Maintain confidentiality and information-security standards for beneficiary and organisational data.</li>
        </ul>

        <h4>7. CONFIDENTIALITY AND DATA PROTECTION</h4>
        <p>Both Parties shall protect confidential organisational information received during the Programme. Beneficiary personal information, contact details, photographs, field records, and other sensitive data shall be used only for authorised programme purposes. Both Parties shall implement reasonable security measures to prevent unauthorised access to digital systems.</p>

        <h4>8. MONITORING, REVIEW, AND REPORTING</h4>
        <p>Programme progress will be reviewed at mutually agreed intervals. Reviews will cover work-plan progress, training, developed systems, and pending activities. Both Parties shall cooperate in preparing required progress reports and programme documentation.</p>

        <h4>9. TERM AND RENEWAL</h4>
        <table>
          <tr><th style="width:40%;">Clause</th><th style="width:60%;">Details</th></tr>
          <tr><td>Effective date</td><td>${currentAgreement.agreement_date}</td></tr>
          <tr><td>Initial term</td><td>${currentAgreement.programme_duration}</td></tr>
          <tr><td>Renewal</td><td>Requires written consent of both Parties</td></tr>
          <tr><td>Financial and implementation terms</td><td>As per the approved work plan for the applicable term</td></tr>
        </table>

        <h4>10. AMENDMENTS &amp; 11. TERMINATION</h4>
        <p>Any amendment shall require prior written consent of both Parties. Either Party may terminate this Agreement by giving at least thirty (30) days' prior written notice to the other Party.</p>

        <h4>12. DISPUTE RESOLUTION &amp; 13. GENERAL PROVISIONS</h4>
        <p>Any dispute shall first be resolved through mutual discussion. This Agreement is made with the mutual consent of both Parties.</p>

        <h4>14. SIGNATURES</h4>
        <p>IN WITNESS WHEREOF, the Parties have executed this Agreement on the date first written above.</p>

        <table>
          <tr>
            <th style="width:50%;">FIRST PARTY — SEVA</th>
            <th style="width:50%;">SECOND PARTY — PARTICIPATING ORGANISATION</th>
          </tr>
          <tr>
            <td class="sig-box">
              <strong>Name:</strong> ${currentAgreement.first_party_representative}<br/>
              <strong>Designation:</strong> ${currentAgreement.first_party_designation}<br/>
              <strong>Signature:</strong> ____________________________<br/>
              <strong>Organisation Seal:</strong><br/><br/>
              <strong>Date:</strong> ${currentAgreement.agreement_date}
            </td>
            <td class="sig-box">
              <strong>Name:</strong> ${currentAgreement.second_party_representative}<br/>
              <strong>Designation:</strong> ${currentAgreement.second_party_designation}<br/>
              <strong>Signature:</strong> ____________________________<br/>
              <strong>Organisation Seal:</strong><br/><br/>
              <strong>Date:</strong> ${currentAgreement.agreement_date}
            </td>
          </tr>
        </table>

        <table>
          <tr>
            <th style="width:50%;">WITNESS 1</th>
            <th style="width:50%;">WITNESS 2</th>
          </tr>
          <tr>
            <td>Name: ____________________________<br/>Address: __________________________<br/>Signature: _________________________</td>
            <td>Name: ____________________________<br/>Address: __________________________<br/>Signature: _________________________</td>
          </tr>
        </table>

        <br style="page-break-before:always;" />

        <h1>ANNEXURE 1</h1>
        <h2>APPROVED TECHNICAL SUPPORT WORK PLAN &amp; BUDGET BREAKUP</h2>
        <p>This Annexure forms an integral part of the Agreement once accepted and signed by both Parties.</p>

        <table>
          <thead>
            <tr>
              <th style="width:6%;">Sr No</th>
              <th style="width:28%;">Technical Support Area / Budget Head</th>
              <th style="width:34%;">Approved Work / Expected Deliverables</th>
              <th style="width:12%;">Total Amount (₹)</th>
              <th style="width:10%;">SEVA 70% (₹)</th>
              <th style="width:10%;">Partner 30% (₹)</th>
            </tr>
          </thead>
          <tbody>
            ${selectedHeads
              .map(
                (h, idx) => `
              <tr>
                <td style="text-align:center;">${idx + 1}</td>
                <td><strong>${h.head_name}</strong></td>
                <td>${h.description}</td>
                <td>₹${h.total_amount.toLocaleString('en-IN')}</td>
                <td>₹${h.seva_support.toLocaleString('en-IN')}</td>
                <td>₹${h.partner_contribution.toLocaleString('en-IN')}</td>
              </tr>
            `
              )
              .join('')}
            ${
              currentAgreement.include_maintenance_charge
                ? `
              <tr style="background-color:#f0fdf4;">
                <td style="text-align:center;">+</td>
                <td><strong>Annual Maintenance Charge (AMC)</strong></td>
                <td>Server hosting, SSL renewal, security patches, regular quarterly health check</td>
                <td>₹${ANNUAL_MAINTENANCE_CHARGE.toLocaleString('en-IN')}</td>
                <td>₹${Math.round(ANNUAL_MAINTENANCE_CHARGE * 0.7).toLocaleString('en-IN')}</td>
                <td>₹${Math.round(ANNUAL_MAINTENANCE_CHARGE * 0.3).toLocaleString('en-IN')}</td>
              </tr>
            `
                : ''
            }
            <tr style="background-color:#f9fafb; font-weight:bold;">
              <td colspan="3" style="text-align:right;">Total Programme Budget:</td>
              <td>₹${totals.grandTotal.toLocaleString('en-IN')}</td>
              <td>₹${totals.sevaSupported.toLocaleString('en-IN')}</td>
              <td>₹${totals.partnerContribution.toLocaleString('en-IN')}</td>
            </tr>
          </tbody>
        </table>

        <p class="note">• Partner Contribution (30%): ₹${totals.partnerContribution.toLocaleString('en-IN')}<br/>
        • SEVA Support (70%): ₹${totals.sevaSupported.toLocaleString('en-IN')}<br/>
        • Grand Total: ₹${totals.grandTotal.toLocaleString('en-IN')}<br/>
        ${currentAgreement.include_maintenance_charge ? '• Includes Per year maintenance Charge Extra ₹8700 for per year.' : '• Optional per year maintenance Charge Extra ₹8700 for per year (if opted).'}</p>

        <h4>FINANCIAL SUMMARY</h4>
        <table>
          <tr><th style="width:40%;">Particulars</th><th style="width:60%;">Details</th></tr>
          <tr><td>Participating Organisation's contribution (30%)</td><td><strong>₹${totals.partnerContribution.toLocaleString('en-IN')}</strong></td></tr>
          <tr><td>SEVA-supported cost (70%)</td><td><strong>₹${totals.sevaSupported.toLocaleString('en-IN')}</strong></td></tr>
          <tr><td>Payment method</td><td>NEFT to SEVA account</td></tr>
          <tr><td>Payment schedule</td><td>${currentAgreement.payment_deadline}</td></tr>
          <tr><td>Programme duration</td><td>${currentAgreement.programme_duration}</td></tr>
        </table>

        <h4>BANK DETAILS (FOR NEFT / RTGS TRANSFER)</h4>
        <table>
          <tr><th style="width:40%;">Particulars</th><th style="width:60%;">Details</th></tr>
          <tr><td>Primary holder's name</td><td><strong>${currentAgreement.bank_holder_name}</strong></td></tr>
          <tr><td>Account Number</td><td><strong>${currentAgreement.bank_account_number}</strong></td></tr>
          <tr><td>Account Type</td><td>${currentAgreement.bank_account_type}</td></tr>
          <tr><td>Bank</td><td>${currentAgreement.bank_name}</td></tr>
          <tr><td>IFSC</td><td><strong>${currentAgreement.bank_ifsc}</strong></td></tr>
          <tr><td>Branch</td><td>${currentAgreement.bank_branch}</td></tr>
        </table>

        <h4>ACCEPTED AND AGREED BY BOTH PARTIES:</h4>
        <table>
          <tr>
            <th style="width:50%;">For and on behalf of SEVA</th>
            <th style="width:50%;">For and on behalf of Participating Organisation</th>
          </tr>
          <tr>
            <td class="sig-box">
              Signature / Seal / Date:<br/><br/><br/>
              _____________________________________
            </td>
            <td class="sig-box">
              Signature / Seal / Date:<br/><br/><br/>
              _____________________________________
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([docContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const cleanOrgName = currentAgreement.second_party_name.replace(/[^a-zA-Z0-9]/g, '_');
    link.download = `SEVA_Agreement_${cleanOrgName}_${currentAgreement.id.replace(/\//g, '_')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showNotice('Microsoft Word (.doc) करार फाइल यशस्वीरित्या डाऊनलोड झाली!');
  };

  // Prepare full email text to send to partner with CC to seva.ecology@gmail.com
  const getPreparedEmailBody = (): string => {
    const selected = currentAgreement.selected_budget_heads.filter((h) => h.is_selected);
    const totals = calculateBudget(currentAgreement.selected_budget_heads, currentAgreement.include_maintenance_charge);

    return `Dear ${currentAgreement.second_party_representative},

Greetings from Sustainable Ecology & Village Advancement (SEVA).

We are pleased to share the official Technology Support Programme Agreement and Approved Budget Breakup for ${currentAgreement.second_party_name} [Ref: ${currentAgreement.id}].

Under SEVA's Grassroots Technology Support Programme, the approved technology heads and 70-30 cost-sharing structure are summarized below:

---
PROGRAMME SUMMARY & BUDGET BREAKUP:
${selected.map((h, i) => `${i + 1}. ${h.head_name}: ₹${h.total_amount.toLocaleString('en-IN')} (SEVA 70%: ₹${h.seva_support.toLocaleString('en-IN')} | Partner 30%: ₹${h.partner_contribution.toLocaleString('en-IN')})`).join('\n')}
${currentAgreement.include_maintenance_charge ? `+ Annual Maintenance Charge: ₹${ANNUAL_MAINTENANCE_CHARGE.toLocaleString('en-IN')}\n` : ''}
TOTAL PROGRAMME VALUE: ₹${totals.grandTotal.toLocaleString('en-IN')}
SEVA DIRECT SUPPORT (70%): ₹${totals.sevaSupported.toLocaleString('en-IN')}
PARTICIPATING ORGANISATION CONTRIBUTION (30%): ₹${totals.partnerContribution.toLocaleString('en-IN')}
PROGRAMME DURATION: ${currentAgreement.programme_duration}
---

BANK DETAILS FOR NEFT / RTGS TRANSFER:
Primary Holder: ${currentAgreement.bank_holder_name}
Account Number: ${currentAgreement.bank_account_number}
Account Type: ${currentAgreement.bank_account_type}
Bank: ${currentAgreement.bank_name}
IFSC Code: ${currentAgreement.bank_ifsc}
Branch: ${currentAgreement.bank_branch}

NEXT STEPS:
1. Please review the agreement terms and budget heads attached/detailed above.
2. Affix the authorised signature and organisation seal on the agreement copy.
3. Transfer the 30% contribution (₹${totals.partnerContribution.toLocaleString('en-IN')}) via NEFT within one week of signing.
4. Reply to this email (with CC seva.ecology@gmail.com) with the signed copy and payment reference.

Warm regards,
${currentAgreement.first_party_representative}
${currentAgreement.first_party_designation}
Sustainable Ecology & Village Advancement (SEVA)
31 B, Jalka, Ralegaon, Dist. Yavatmal, Maharashtra – 445402
Contact: +91 8999469974 | Email: seva.ecology@gmail.com
Website: https://sevavillage.org`;
  };

  const handleSendViaGmail = () => {
    const to = currentAgreement.second_party_email || 'partner@example.org';
    const cc = 'seva.ecology@gmail.com';
    const subject = `SEVA Technology Support Agreement & Budget Breakup [${currentAgreement.id}] - ${currentAgreement.second_party_name}`;
    const body = getPreparedEmailBody();

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&cc=${encodeURIComponent(cc)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');

    SevaStore.sendEmail({
      application_id: currentAgreement.application_id,
      recipient_email: to,
      recipient_name: currentAgreement.second_party_representative,
      cc_email: cc,
      subject,
      body,
      template_used: 'Agreement & Budget Breakup',
      sent_by: 'SEVA Director (Agreement Desk)',
      status: 'Dispatched via Gmail',
      delivery_method: `Gmail Web (CC: ${cc})`,
    });

    setEmailModalOpen(false);
    showNotice(`Gmail विंडो उघडली! CC मध्ये ${cc} जोडले असून ईमेल पाठवण्यासाठी तयार आहे.`);
  };

  const handleSendViaMailApp = () => {
    const to = currentAgreement.second_party_email || 'partner@example.org';
    const cc = 'seva.ecology@gmail.com';
    const subject = `SEVA Technology Support Agreement & Budget Breakup [${currentAgreement.id}] - ${currentAgreement.second_party_name}`;
    const body = getPreparedEmailBody();

    const mailtoUrl = `mailto:${encodeURIComponent(to)}?cc=${encodeURIComponent(cc)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;

    SevaStore.sendEmail({
      application_id: currentAgreement.application_id,
      recipient_email: to,
      recipient_name: currentAgreement.second_party_representative,
      cc_email: cc,
      subject,
      body,
      template_used: 'Agreement & Budget Breakup',
      sent_by: 'SEVA Director (Agreement Desk)',
      status: 'Sent via Mail App',
      delivery_method: `Mail App (CC: ${cc})`,
    });

    setEmailModalOpen(false);
    showNotice(`Mail Client उघडले! CC मध्ये ${cc} जोडले आहे.`);
  };

  const handleCopyEmailText = () => {
    navigator.clipboard.writeText(getPreparedEmailBody());
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2500);
  };

  const selectedHeads = currentAgreement.selected_budget_heads.filter((h) => h.is_selected);

  return (
    <div className="space-y-6">
      {/* Top Header & Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-100 text-[#184E34]">
              <FileCheck className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-stone-900 tracking-tight">
              करारपत्र व बजेट ब्रेकअप व्यवस्थापक (Agreement &amp; Budget Generator)
            </h2>
          </div>
          <p className="text-xs text-stone-600 mt-1 max-w-3xl leading-relaxed">
            पार्टनरने मागितलेल्या तांत्रिक सेवा निवडा, ७०% SEVA अनुदान व ३०% पार्टनर सहभाग आपोआप मोजा, अधिकृत करारपत्र व बजेट ब्रेकअप (Word / PDF) जनरेट करा व सहीसाठी पाठवा.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleCreateNewAgreement}
            className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-stone-600" />
            <span>नवीन करार तयार करा</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadWordDoc}
            className="px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-900 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
            title="Microsoft Word (.doc) फाइल डाऊनलोड करा"
          >
            <Download className="w-4 h-4 text-blue-700" />
            <span>Word (.doc) डाऊनलोड</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-900 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
            title="प्रिंट करा किंवा PDF सेव्ह करा (Print / Save as PDF)"
          >
            <Printer className="w-4 h-4 text-amber-700" />
            <span>प्रिंट / PDF सेव्ह</span>
          </button>

          <button
            type="button"
            onClick={() => setEmailModalOpen(true)}
            className="px-5 py-2 rounded-xl bg-[#184E34] hover:bg-[#0F3825] text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.98]"
            title="पार्टनरला अधिकृत ईमेल पाठवा (CC: seva.ecology@gmail.com)"
          >
            <Mail className="w-4 h-4 text-emerald-300" />
            <span>ईमेल द्वारे पाठवा (CC: SEVA)</span>
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {saveSuccessMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-950 rounded-2xl text-xs font-semibold flex items-center gap-2.5 animate-in fade-in shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Admin Parameter Inputs & Budget Head Selector (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* 1. Quick Partner Switcher / Application Selector */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-4 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#184E34] text-white flex items-center justify-center font-mono text-[10px]">१</span>
              <span>भागीदार संस्था निवडा (Select Partner Organisation)</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                नोंदणीकृत अर्जावरून संस्था निवडा:
              </label>
              <select
                value={currentAgreement.application_id || ''}
                onChange={(e) => handleSelectPartnerApplication(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-200 bg-white text-xs font-bold text-[#184E34]"
              >
                <option value="">-- संस्था निवडा (Select Organisation) --</option>
                {applications.map((app) => (
                  <option key={app.id} value={app.id}>
                    {app.id} - {app.name_of_organization} ({app.district})
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-stone-500 mt-1">
                निवडताच संस्थेचे नाव, पत्ता, प्रतिनिधी व त्यांनी मागितलेल्या सेवा आपोआप लोड होतील.
              </p>
            </div>

            {/* Editable Second Party Fields */}
            <div className="space-y-3 pt-2 border-t border-stone-100 text-xs">
              <div>
                <label className="block text-stone-600 font-semibold mb-1">संस्थेचे नाव (Organisation Name) *</label>
                <input
                  type="text"
                  value={currentAgreement.second_party_name}
                  onChange={(e) => setCurrentAgreement({ ...currentAgreement, second_party_name: e.target.value })}
                  className="w-full p-2 rounded-lg border border-stone-200 font-semibold text-stone-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-stone-600 font-semibold mb-1">प्रतिनिधींचे नाव *</label>
                  <input
                    type="text"
                    value={currentAgreement.second_party_representative}
                    onChange={(e) => setCurrentAgreement({ ...currentAgreement, second_party_representative: e.target.value })}
                    className="w-full p-2 rounded-lg border border-stone-200 text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-semibold mb-1">पद (Designation) *</label>
                  <input
                    type="text"
                    value={currentAgreement.second_party_designation}
                    onChange={(e) => setCurrentAgreement({ ...currentAgreement, second_party_designation: e.target.value })}
                    className="w-full p-2 rounded-lg border border-stone-200 text-stone-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-stone-600 font-semibold mb-1">नोंदणी क्रमांक *</label>
                  <input
                    type="text"
                    value={currentAgreement.second_party_registration_number}
                    onChange={(e) => setCurrentAgreement({ ...currentAgreement, second_party_registration_number: e.target.value })}
                    className="w-full p-2 rounded-lg border border-stone-200 text-stone-900 font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-semibold mb-1">करार संदर्भ क्रमांक (Ref No) *</label>
                  <input
                    type="text"
                    value={currentAgreement.id}
                    onChange={(e) => setCurrentAgreement({ ...currentAgreement, id: e.target.value })}
                    className="w-full p-2 rounded-lg border border-stone-200 text-[#184E34] font-mono text-[11px] font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-600 font-semibold mb-1">नोंदणीकृत पत्ता (Registered Address) *</label>
                <textarea
                  rows={2}
                  value={currentAgreement.second_party_address}
                  onChange={(e) => setCurrentAgreement({ ...currentAgreement, second_party_address: e.target.value })}
                  className="w-full p-2 rounded-lg border border-stone-200 text-stone-800 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-stone-600 font-semibold mb-1">ईमेल (Email)</label>
                  <input
                    type="email"
                    value={currentAgreement.second_party_email}
                    onChange={(e) => setCurrentAgreement({ ...currentAgreement, second_party_email: e.target.value })}
                    className="w-full p-2 rounded-lg border border-stone-200 text-stone-800 font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-semibold mb-1">मोबाइल (Phone)</label>
                  <input
                    type="text"
                    value={currentAgreement.second_party_phone}
                    onChange={(e) => setCurrentAgreement({ ...currentAgreement, second_party_phone: e.target.value })}
                    className="w-full p-2 rounded-lg border border-stone-200 text-stone-800 font-mono text-[11px]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Budget Heads Selection (Official 9 Heads from PDF) */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#184E34] text-white flex items-center justify-center font-mono text-[10px]">२</span>
                <span>बजेट हेड व सेवा निवडा (Budget Heads)</span>
              </h3>
              <div className="flex items-center gap-1.5 text-[11px]">
                <button
                  type="button"
                  onClick={handleSelectCoreServices}
                  className="px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold cursor-pointer"
                  title="मुख्य ३ सेवा निवडा"
                >
                  मुख्य ३
                </button>
                <button
                  type="button"
                  onClick={handleSelectAllServices}
                  className="px-2 py-0.5 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-semibold cursor-pointer"
                  title="सर्व ९ सेवा निवडा"
                >
                  सर्व
                </button>
              </div>
            </div>

            <p className="text-[11px] text-stone-500">
              संस्थेला आवश्यक असणाऱ्या सेवांवर खूण करा. एकूण बजेट, SEVA ७०% व पार्टनर ३०% सहभाग आपोआप मोजला जाईल:
            </p>

            <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
              {currentAgreement.selected_budget_heads.map((head) => {
                const isSelected = Boolean(head.is_selected);
                return (
                  <div
                    key={head.id}
                    onClick={() => handleToggleBudgetHead(head.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer select-none ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/60 shadow-2xs'
                        : 'border-stone-200 bg-white hover:bg-stone-50 opacity-80'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="mt-0.5 w-4 h-4 text-[#184E34] rounded border-stone-300 focus:ring-emerald-500 cursor-pointer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`text-xs font-bold ${isSelected ? 'text-[#184E34]' : 'text-stone-800'}`}>
                            {head.id}. {head.head_name}
                          </span>
                          <span className="font-mono text-xs font-bold text-stone-900 shrink-0">
                            ₹{head.total_amount.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500 leading-tight mt-0.5 line-clamp-2">
                          {head.description}
                        </p>
                        <div className="flex items-center gap-3 mt-1.5 text-[10px] font-mono">
                          <span className="text-emerald-700 font-semibold">
                            SEVA 70%: ₹{head.seva_support.toLocaleString('en-IN')}
                          </span>
                          <span className="text-stone-400">|</span>
                          <span className="text-amber-700 font-semibold">
                            Partner 30%: ₹{head.partner_contribution.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Maintenance Extra Option */}
            <div
              onClick={handleToggleMaintenance}
              className={`p-3 rounded-xl border transition-all cursor-pointer select-none ${
                currentAgreement.include_maintenance_charge
                  ? 'border-emerald-500 bg-emerald-50/60'
                  : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={currentAgreement.include_maintenance_charge}
                  onChange={() => {}}
                  className="mt-0.5 w-4 h-4 text-[#184E34] rounded border-stone-300 focus:ring-emerald-500 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900">
                      Per year maintenance Charge Extra ₹8,700 for per year
                    </span>
                    <span className="font-mono text-xs font-bold text-emerald-800">
                      + ₹8,700/yr
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    वार्षिक सर्व्हर मेंटेनन्स, सिक्युरिटी पॅचेस व नियमित सपोर्ट शुल्क
                  </p>
                </div>
              </div>
            </div>

            {/* Calculated Real-Time Summary Pill */}
            <div
              className="p-4 rounded-xl text-white space-y-2 shadow-xs bg-[#0F3825]"
              style={{
                backgroundColor: '#0F3825',
                backgroundImage: 'linear-gradient(135deg, #09281A 0%, #0F3825 50%, #175438 100%)',
              }}
            >
              <div className="flex items-center justify-between text-xs text-emerald-200 border-b border-emerald-700/60 pb-1.5">
                <span>निवडलेल्या सेवा संख्या:</span>
                <span className="font-bold font-mono">{budgetSummary.selectedCount} / 9 सेवा</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-100">एकूण वार्षिक कार्यक्रम बजेट (Total):</span>
                <span className="font-bold font-mono text-sm">₹{budgetSummary.grandTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-200 font-semibold">SEVA अनुदान सहभाग (70%):</span>
                <span className="font-bold font-mono text-emerald-300">₹{budgetSummary.sevaSupported.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-amber-200 font-semibold">पार्टनर संस्था सहभाग (30%):</span>
                <span className="font-bold font-mono text-amber-300 text-sm">₹{budgetSummary.partnerContribution.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Full Agreement & Budget Breakup Document Preview (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Preview Navigation Tabs */}
          <div className="flex items-center justify-between bg-white px-4 py-2 rounded-2xl border border-stone-200 shadow-xs">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveTab('full_agreement')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'full_agreement'
                    ? 'bg-[#184E34] text-white shadow-xs'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                📄 संपूर्ण करारपत्र (Full 6-Page Agreement)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('budget_only')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'budget_only'
                    ? 'bg-[#184E34] text-white shadow-xs'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                📊 Annexure 1: बजेट ब्रेकअप (Budget Breakup Only)
              </button>
            </div>

            <span className="text-[11px] font-mono text-stone-500 font-bold hidden sm:inline">
              Ref: {currentAgreement.id}
            </span>
          </div>

          {/* Printable Document Sheet Container */}
          <div
            id="printable-agreement"
            className="bg-white rounded-3xl border border-stone-300 p-8 sm:p-12 shadow-sm space-y-8 text-stone-900 font-sans leading-relaxed text-xs sm:text-[13px]"
          >
            {/* Document Header */}
            <div className="text-center space-y-1.5 border-b-2 border-[#184E34] pb-6">
              <div className="text-base sm:text-lg font-black tracking-wider text-[#184E34] uppercase">
                TECHNOLOGY SUPPORT PROGRAMME
              </div>
              <div className="text-xl sm:text-2xl font-black text-stone-900 uppercase tracking-tight">
                AGREEMENT
              </div>
              <div className="text-xs text-stone-600 font-medium">
                Between<br />
                <strong className="text-stone-900">{currentAgreement.first_party_name}</strong><br />
                and<br />
                <strong className="text-[#184E34]">{currentAgreement.second_party_name}</strong>
              </div>
            </div>

            {/* Metadata Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border border-stone-300 text-xs">
                <thead className="bg-[#184E34] text-white font-bold">
                  <tr>
                    <th className="p-2.5 border border-stone-300">Agreement Date</th>
                    <th className="p-2.5 border border-stone-300">Place of Execution</th>
                    <th className="p-2.5 border border-stone-300">Agreement Reference No.</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-stone-50">
                    <td className="p-2.5 border border-stone-300 font-medium">{currentAgreement.agreement_date}</td>
                    <td className="p-2.5 border border-stone-300 font-medium">{currentAgreement.place_of_execution}</td>
                    <td className="p-2.5 border border-stone-300 font-mono font-bold text-[#184E34]">{currentAgreement.id}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* PARTIES SECTION */}
            <div className="space-y-4">
              <div className="font-black text-sm uppercase text-[#184E34] border-b border-stone-200 pb-1">
                PARTIES
              </div>

              <div className="space-y-1 text-stone-800">
                <p className="font-bold text-stone-900">FIRST PARTY — Technology Support Providing Organisation</p>
                <p><strong>Name:</strong> {currentAgreement.first_party_name}</p>
                <p><strong>Registered Address:</strong> {currentAgreement.first_party_address}</p>
                <p><strong>Authorised Representative:</strong> {currentAgreement.first_party_representative}</p>
                <p><strong>Designation:</strong> {currentAgreement.first_party_designation}</p>
                <p className="italic text-stone-600">Hereinafter referred to as &ldquo;SEVA&rdquo;.</p>
              </div>

              <div className="space-y-1 text-stone-800 pt-2 border-t border-stone-100">
                <p className="font-bold text-stone-900">SECOND PARTY — Technology Support Receiving Organisation</p>
                <p><strong>Name of Organisation:</strong> <span className="bg-amber-100/70 px-1.5 py-0.5 rounded font-bold">{currentAgreement.second_party_name}</span></p>
                <p><strong>Registered Address:</strong> {currentAgreement.second_party_address}</p>
                <p><strong>Authorised Representative:</strong> {currentAgreement.second_party_representative}</p>
                <p><strong>Designation:</strong> {currentAgreement.second_party_designation}</p>
                <p><strong>Registration Number:</strong> <span className="font-mono">{currentAgreement.second_party_registration_number}</span></p>
                <p className="italic text-stone-600">Hereinafter referred to as the &ldquo;Participating Organisation&rdquo;.</p>
              </div>

              <p className="italic text-stone-600 text-xs">
                SEVA and the Participating Organisation are hereinafter collectively referred to as the &ldquo;Parties&rdquo;.
              </p>
            </div>

            {/* Full Clauses (Sections 1 to 14) */}
            {activeTab === 'full_agreement' && (
              <>
                {/* 1 & 2 */}
                <div className="space-y-2">
                  <div className="font-bold text-stone-900">1. PURPOSE OF THE AGREEMENT</div>
                  <p className="text-stone-700">
                    This Agreement is entered into to strengthen the technical capacity of the Participating Organisation, promote effective use of digital technology in its operations, improve information management, and equip its team with required technical skills. Technology support will be provided after assessing the Participating Organisation&rsquo;s needs, available resources, existing digital systems, organisational priorities, and technical challenges.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="font-bold text-stone-900">2. SELECTION AND PLANNING PROCESS</div>
                  <p className="text-stone-700">
                    2.1 The Participating Organisation has been preliminarily selected for the first phase of the Programme.<br />
                    2.2 Before final selection, SEVA will conduct a meeting or discussion with the Participating Organisation.<br />
                    2.3 The meeting will assess technical needs, existing systems, digital workflows, information-management requirements, and training needs.<br />
                    2.4 SEVA will decide final selection based on this assessment.<br />
                    2.5 After final selection, the Parties will mutually finalise a detailed work plan, priorities, implementation schedule, and expected outcomes.
                  </p>
                </div>

                {/* 3. SCOPE OF TECHNOLOGY SUPPORT */}
                <div className="space-y-2">
                  <div className="font-bold text-stone-900">3. SCOPE OF TECHNOLOGY SUPPORT</div>
                  <p className="text-stone-700">Subject to the approved work plan, SEVA may provide the following support:</p>
                  <ul className="list-disc list-inside space-y-1 text-stone-700 pl-2">
                    {selectedHeads.map((h) => (
                      <li key={h.id}>
                        <strong>{h.head_name}:</strong> {h.description}
                      </li>
                    ))}
                  </ul>
                  <p className="text-stone-600 text-xs italic">
                    SEVA is required to provide a maximum of three (3) services from the above scope for standard cohorts. All services will not necessarily be provided simultaneously. The actual services, scope, and deliverables will be as per the work plan approved in writing by both Parties.
                  </p>
                </div>

                {/* 4. FINANCIAL TERMS */}
                <div className="space-y-2">
                  <div className="font-bold text-stone-900">4. FINANCIAL TERMS</div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border border-stone-300 text-xs">
                      <thead className="bg-[#184E34] text-white">
                        <tr>
                          <th className="p-2 border border-stone-300 w-1/3">Item</th>
                          <th className="p-2 border border-stone-300 w-2/3">Terms</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200">
                        <tr>
                          <td className="p-2 border border-stone-300 font-semibold">Total annual programme cost</td>
                          <td className="p-2 border border-stone-300 font-mono font-bold">
                            ₹{budgetSummary.grandTotal.toLocaleString('en-IN')} (As per approved programme budget)
                          </td>
                        </tr>
                        <tr className="bg-amber-50/50">
                          <td className="p-2 border border-stone-300 font-semibold text-amber-950">
                            Participating Organisation&rsquo;s contribution
                          </td>
                          <td className="p-2 border border-stone-300 font-mono font-bold text-amber-900">
                            30% of annual programme cost = ₹{budgetSummary.partnerContribution.toLocaleString('en-IN')}
                          </td>
                        </tr>
                        <tr className="bg-emerald-50/50">
                          <td className="p-2 border border-stone-300 font-semibold text-emerald-950">
                            SEVA-supported portion
                          </td>
                          <td className="p-2 border border-stone-300 font-mono font-bold text-emerald-900">
                            70% of annual programme cost = ₹{budgetSummary.sevaSupported.toLocaleString('en-IN')}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 border border-stone-300 font-semibold">Nature of SEVA support</td>
                          <td className="p-2 border border-stone-300">Technical services, guidance, training, and capacity building</td>
                        </tr>
                        <tr>
                          <td className="p-2 border border-stone-300 font-semibold">Cash assistance / grant / donation</td>
                          <td className="p-2 border border-stone-300">Not applicable</td>
                        </tr>
                        <tr>
                          <td className="p-2 border border-stone-300 font-semibold">Payment method</td>
                          <td className="p-2 border border-stone-300">NEFT to SEVA account</td>
                        </tr>
                        <tr>
                          <td className="p-2 border border-stone-300 font-semibold">Payment deadline</td>
                          <td className="p-2 border border-stone-300">{currentAgreement.payment_deadline}</td>
                        </tr>
                        <tr>
                          <td className="p-2 border border-stone-300 font-semibold">Programme duration</td>
                          <td className="p-2 border border-stone-300">{currentAgreement.programme_duration}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-stone-600 text-xs">
                    4.1 Additional costs for requirements outside the approved programme scope will require prior written approval of both Parties.<br />
                    4.2 Any change to the programme scope or cost will be effective only after written agreement by both Parties.<br />
                    4.3 The 70% SEVA-supported portion represents the value of technical and direct support and is not a cash transfer to the Participating Organisation.
                  </p>
                </div>

                {/* 5, 6, 7, 8 Responsibilities & Confidentiality */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5 p-3 rounded-xl bg-stone-50 border border-stone-200">
                    <div className="font-bold text-stone-900">5. RESPONSIBILITIES OF SEVA</div>
                    <ul className="list-disc list-inside space-y-0.5 text-stone-700 text-xs">
                      <li>Assess technical needs of the Participating Organisation.</li>
                      <li>Provide technology guidance and capacity building.</li>
                      <li>Assist with technical planning and implementation.</li>
                      <li>Provide training and support to resolve difficulties.</li>
                      <li>Coordinate periodic progress reviews.</li>
                    </ul>
                  </div>

                  <div className="space-y-1.5 p-3 rounded-xl bg-stone-50 border border-stone-200">
                    <div className="font-bold text-stone-900">6. RESPONSIBILITIES OF PARTICIPATING ORG</div>
                    <ul className="list-disc list-inside space-y-0.5 text-stone-700 text-xs">
                      <li>Provide required technical needs information.</li>
                      <li>Appoint an internal coordinator for implementation.</li>
                      <li>Ensure relevant staff participate in workshops.</li>
                      <li>Deposit agreed financial contribution (30%) on time.</li>
                      <li>Maintain data confidentiality and privacy standards.</li>
                    </ul>
                  </div>
                </div>

                {/* 14. SIGNATURES EXECUTION BLOCK */}
                <div className="space-y-4 pt-4 border-t-2 border-stone-300">
                  <div className="font-bold text-sm uppercase text-[#184E34]">
                    14. SIGNATURES &amp; EXECUTION
                  </div>
                  <p className="text-xs text-stone-600">
                    IN WITNESS WHEREOF, the Parties have executed this Agreement on the date first written above.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-stone-300 p-4 rounded-xl space-y-2 bg-stone-50/50">
                      <div className="font-bold text-xs uppercase text-[#184E34] border-b border-stone-200 pb-1">
                        FIRST PARTY — SEVA
                      </div>
                      <p><strong>Name:</strong> {currentAgreement.first_party_representative}</p>
                      <p><strong>Designation:</strong> {currentAgreement.first_party_designation}</p>
                      <div className="pt-6 border-b border-stone-300" />
                      <p className="text-[11px] text-stone-500">Authorised Signature &amp; Official Seal</p>
                      <p className="text-[11px] text-stone-500">Date: {currentAgreement.agreement_date}</p>
                    </div>

                    <div className="border border-stone-300 p-4 rounded-xl space-y-2 bg-stone-50/50">
                      <div className="font-bold text-xs uppercase text-[#184E34] border-b border-stone-200 pb-1">
                        SECOND PARTY — PARTICIPATING ORGANISATION
                      </div>
                      <p><strong>Name:</strong> {currentAgreement.second_party_representative}</p>
                      <p><strong>Designation:</strong> {currentAgreement.second_party_designation}</p>
                      <div className="pt-6 border-b border-stone-300" />
                      <p className="text-[11px] text-stone-500">Authorised Signature &amp; Official Seal</p>
                      <p className="text-[11px] text-stone-500">Date: {currentAgreement.agreement_date}</p>
                    </div>
                  </div>

                  {/* Witnesses */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="border border-stone-200 p-3 rounded-lg text-xs space-y-1">
                      <span className="font-bold text-stone-800">WITNESS 1:</span>
                      <p className="text-stone-500">Name &amp; Address: ___________________________</p>
                      <p className="text-stone-500">Signature: _________________________________</p>
                    </div>
                    <div className="border border-stone-200 p-3 rounded-lg text-xs space-y-1">
                      <span className="font-bold text-stone-800">WITNESS 2:</span>
                      <p className="text-stone-500">Name &amp; Address: ___________________________</p>
                      <p className="text-stone-500">Signature: _________________________________</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ANNEXURE 1: APPROVED TECHNICAL SUPPORT WORK PLAN & BUDGET BREAKUP */}
            <div className="space-y-4 pt-6 border-t-2 border-[#184E34]">
              <div className="text-center space-y-1">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#184E34] font-bold text-xs uppercase tracking-wider">
                  ANNEXURE 1
                </span>
                <h3 className="text-base sm:text-lg font-black text-stone-900 tracking-tight">
                  APPROVED TECHNICAL SUPPORT WORK PLAN &amp; BUDGET BREAKUP
                </h3>
                <p className="text-xs text-stone-500">
                  This Annexure forms an integral part of the Agreement once accepted and signed by both Parties.
                </p>
              </div>

              {/* Itemized Budget Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border border-stone-300 text-xs">
                  <thead className="bg-[#184E34] text-white font-bold">
                    <tr>
                      <th className="p-2 border border-stone-300 text-center w-12">#</th>
                      <th className="p-2 border border-stone-300">Technical Support Area</th>
                      <th className="p-2 border border-stone-300">Approved Work / Deliverables</th>
                      <th className="p-2 border border-stone-300 text-right">Total Amount (₹)</th>
                      <th className="p-2 border border-stone-300 text-right">SEVA 70% (₹)</th>
                      <th className="p-2 border border-stone-300 text-right">Partner 30% (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 text-stone-800">
                    {selectedHeads.map((h, idx) => (
                      <tr key={h.id} className="hover:bg-stone-50">
                        <td className="p-2 border border-stone-300 text-center font-bold font-mono">{idx + 1}</td>
                        <td className="p-2 border border-stone-300 font-bold text-stone-900">{h.head_name}</td>
                        <td className="p-2 border border-stone-300 text-stone-600 leading-snug">{h.description}</td>
                        <td className="p-2 border border-stone-300 text-right font-mono font-bold">
                          ₹{h.total_amount.toLocaleString('en-IN')}
                        </td>
                        <td className="p-2 border border-stone-300 text-right font-mono text-emerald-800 font-semibold">
                          ₹{h.seva_support.toLocaleString('en-IN')}
                        </td>
                        <td className="p-2 border border-stone-300 text-right font-mono text-amber-900 font-semibold">
                          ₹{h.partner_contribution.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}

                    {currentAgreement.include_maintenance_charge && (
                      <tr className="bg-emerald-50/70 font-semibold">
                        <td className="p-2 border border-stone-300 text-center font-mono">+</td>
                        <td className="p-2 border border-stone-300 text-[#184E34]">Annual Maintenance Charge (AMC)</td>
                        <td className="p-2 border border-stone-300 text-emerald-900">
                          Server hosting, SSL certificates, regular quarterly security updates &amp; backups
                        </td>
                        <td className="p-2 border border-stone-300 text-right font-mono">
                          ₹{ANNUAL_MAINTENANCE_CHARGE.toLocaleString('en-IN')}
                        </td>
                        <td className="p-2 border border-stone-300 text-right font-mono text-emerald-800">
                          ₹{Math.round(ANNUAL_MAINTENANCE_CHARGE * 0.7).toLocaleString('en-IN')}
                        </td>
                        <td className="p-2 border border-stone-300 text-right font-mono text-amber-900">
                          ₹{Math.round(ANNUAL_MAINTENANCE_CHARGE * 0.3).toLocaleString('en-IN')}
                        </td>
                      </tr>
                    )}

                    {/* Grand Total Row */}
                    <tr className="bg-stone-100 font-black text-stone-900">
                      <td colSpan={3} className="p-2.5 border border-stone-300 text-right uppercase tracking-wider">
                        एकूण कार्यक्रम बजेट (Grand Total):
                      </td>
                      <td className="p-2.5 border border-stone-300 text-right font-mono text-sm text-[#184E34]">
                        ₹{budgetSummary.grandTotal.toLocaleString('en-IN')}
                      </td>
                      <td className="p-2.5 border border-stone-300 text-right font-mono text-emerald-800">
                        ₹{budgetSummary.sevaSupported.toLocaleString('en-IN')}
                      </td>
                      <td className="p-2.5 border border-stone-300 text-right font-mono text-amber-900 text-sm">
                        ₹{budgetSummary.partnerContribution.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Maintenance Note from PDF */}
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs space-y-1 text-stone-700">
                <p>• <strong>Partner Contribution (30%):</strong> ₹{budgetSummary.partnerContribution.toLocaleString('en-IN')}</p>
                <p>• <strong>SEVA (70%):</strong> ₹{budgetSummary.sevaSupported.toLocaleString('en-IN')}</p>
                <p>• <strong>Grand Total:</strong> ₹{budgetSummary.grandTotal.toLocaleString('en-IN')}</p>
                <p className="font-semibold text-stone-900">
                  {currentAgreement.include_maintenance_charge
                    ? '• Per year maintenance Charge Extra ₹8700 for per year (Included above).'
                    : '• Per year maintenance Charge Extra ₹8700 for per year (Optional on renewal).'}
                </p>
              </div>

              {/* Financial Summary & Bank Details Side-by-Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <h4 className="font-bold text-xs uppercase text-[#184E34] mb-2">FINANCIAL SUMMARY</h4>
                  <table className="w-full text-left border border-stone-300 text-xs">
                    <tbody>
                      <tr>
                        <td className="p-2 border border-stone-300 font-semibold">Participating Org Contribution</td>
                        <td className="p-2 border border-stone-300 font-mono font-bold text-amber-900">
                          ₹{budgetSummary.partnerContribution.toLocaleString('en-IN')}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-stone-300 font-semibold">SEVA-supported cost</td>
                        <td className="p-2 border border-stone-300 font-mono font-bold text-emerald-900">
                          ₹{budgetSummary.sevaSupported.toLocaleString('en-IN')}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-stone-300 font-semibold">Payment method</td>
                        <td className="p-2 border border-stone-300">NEFT to SEVA account</td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-stone-300 font-semibold">Payment schedule</td>
                        <td className="p-2 border border-stone-300">{currentAgreement.payment_deadline}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <h4 className="font-bold text-xs uppercase text-[#184E34] mb-2">BANK DETAILS (NEFT/RTGS)</h4>
                  <table className="w-full text-left border border-stone-300 text-xs">
                    <tbody>
                      <tr>
                        <td className="p-2 border border-stone-300 font-semibold">Primary holder&rsquo;s name</td>
                        <td className="p-2 border border-stone-300 font-bold">{currentAgreement.bank_holder_name}</td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-stone-300 font-semibold">Account Number</td>
                        <td className="p-2 border border-stone-300 font-mono font-bold">{currentAgreement.bank_account_number}</td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-stone-300 font-semibold">Account Type / Bank</td>
                        <td className="p-2 border border-stone-300">{currentAgreement.bank_account_type} - {currentAgreement.bank_name}</td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-stone-300 font-semibold">IFSC / Branch</td>
                        <td className="p-2 border border-stone-300 font-mono font-bold text-[#184E34]">
                          {currentAgreement.bank_ifsc} ({currentAgreement.bank_branch})
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Final Signatures on Annexure 1 */}
              <div className="pt-4 border-t border-stone-200">
                <p className="font-bold text-xs uppercase text-stone-900 mb-2">Accepted and agreed by both Parties:</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-stone-300 p-3 rounded-lg text-xs space-y-4">
                    <span className="font-bold text-[#184E34]">For and on behalf of SEVA</span>
                    <div className="pt-6 border-b border-stone-300" />
                    <span className="text-[11px] text-stone-500 block">Signature / Seal / Date</span>
                  </div>
                  <div className="border border-stone-300 p-3 rounded-lg text-xs space-y-4">
                    <span className="font-bold text-[#184E34]">For and on behalf of Participating Organisation</span>
                    <div className="pt-6 border-b border-stone-300" />
                    <span className="text-[11px] text-stone-500 block">Signature / Seal / Date</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Dispatch Modal */}
      {emailModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-stone-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#184E34]" />
                  <span>पार्टनरला करार व बजेट ईमेल द्वारे पाठवा</span>
                </h3>
                <span className="text-xs text-stone-500">
                  सर्व ईमेलची प्रत (CC) <strong>seva.ecology@gmail.com</strong> वर आपोआप जाईल.
                </span>
              </div>
              <button
                onClick={() => setEmailModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 font-semibold mb-1">To (प्राप्तकर्ता):</label>
                  <input
                    type="text"
                    readOnly
                    value={`${currentAgreement.second_party_representative} <${currentAgreement.second_party_email || 'partner@example.org'}>`}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 font-mono text-stone-700"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-semibold mb-1">CC (प्रत):</label>
                  <input
                    type="text"
                    readOnly
                    value="seva.ecology@gmail.com"
                    className="w-full p-2.5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-900 font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-600 font-semibold mb-1">Subject (विषय):</label>
                <input
                  type="text"
                  readOnly
                  value={`SEVA Technology Support Agreement & Budget Breakup [${currentAgreement.id}] - ${currentAgreement.second_party_name}`}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 font-semibold text-stone-900"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-stone-600 font-semibold">ईमेल मसुदा (Message Body Preview):</label>
                  <button
                    type="button"
                    onClick={handleCopyEmailText}
                    className="text-[11px] font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedDraft ? 'कॉपी झाले!' : 'मजकूर कॉपी करा'}</span>
                  </button>
                </div>
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 font-mono whitespace-pre-wrap max-h-56 overflow-y-auto leading-relaxed text-stone-800 text-[11px]">
                  {getPreparedEmailBody()}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-stone-100">
              <button
                type="button"
                onClick={handleSendViaMailApp}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Mail className="w-4 h-4 text-stone-600" />
                <span>Mail App द्वारे पाठवा</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setEmailModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-600 text-xs font-medium cursor-pointer"
                >
                  रद्द करा
                </button>

                <button
                  type="button"
                  onClick={handleSendViaGmail}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#184E34] hover:bg-[#0F3825] text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.98]"
                >
                  <Mail className="w-4 h-4 text-emerald-300" />
                  <span>Gmail मध्ये उघडा व पाठवा (with CC)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
