import React, { useState } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  FileText,
  Clock,
  Eye,
  RefreshCw,
  Search,
  ExternalLink,
  Copy,
  Trash2,
  AlertCircle,
  X,
  ShieldCheck,
  Edit3,
  Check,
  RotateCcw,
} from 'lucide-react';
import { EmailTemplate, EmailLog, Application } from '../../types';
import { SevaStore } from '../../services/store';

interface EmailManagerProps {
  applications: Application[];
  preselectedApp?: Application | null;
}

export const EmailManager: React.FC<EmailManagerProps> = ({
  applications,
  preselectedApp,
}) => {
  const templates = SevaStore.getEmailTemplates();
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>(SevaStore.getEmailLogs());
  const [selectedAppId, setSelectedAppId] = useState(preselectedApp?.id || (applications[0]?.id || ''));
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(templates[0]?.id || '');
  const [ccEmail, setCcEmail] = useState<string>('seva.ecology@gmail.com');

  const selectedApp = applications.find((a) => a.id === selectedAppId);
  const currentTemplate = templates.find((t) => t.id === selectedTemplateId) || templates[0];

  // Helper to replace template tokens
  const renderTemplateTokens = (text: string, app?: Application): string => {
    if (!app) return text;
    return text
      .replace(/{{contact_person}}/g, app.contact_person_name)
      .replace(/{{organisation_name}}/g, app.name_of_organization)
      .replace(/{{application_id}}/g, app.id)
      .replace(/{{district}}/g, app.district)
      .replace(/{{state}}/g, app.state)
      .replace(/{{support_areas}}/g, app.support_type_seeking.join(', '))
      .replace(/{{meeting_date}}/g, '5 November 2026')
      .replace(/{{meeting_time}}/g, '11:00 AM IST')
      .replace(/{{meeting_mode}}/g, 'Virtual Google Meet')
      .replace(/{{meeting_link}}/g, 'https://meet.google.com/sev-tech-scoping')
      .replace(/{{project_duration}}/g, '4 Months')
      .replace(/{{assigned_lead}}/g, 'Pravin R. (SEVA Lead Technologist)')
      .replace(/{{milestone_title}}/g, 'Stage 1: Needs Assessment')
      .replace(/{{milestone_status}}/g, 'In Progress')
      .replace(/{{milestone_notes}}/g, 'Field interviews completed across 12 villages.')
      .replace(/{{rejection_reason}}/g, 'Scope exceeds technical feasibility for current cohort.');
  };

  const [subject, setSubject] = useState(renderTemplateTokens(currentTemplate?.subject || '', selectedApp));
  const [body, setBody] = useState(renderTemplateTokens(currentTemplate?.body || '', selectedApp));
  const [signature, setSignature] = useState<string>(SevaStore.getEmailSignature());
  const [isEditingSig, setIsEditingSig] = useState(false);
  const [sigSavedNotice, setSigSavedNotice] = useState(false);
  const [sendSuccessMsg, setSendSuccessMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [viewingLog, setViewingLog] = useState<EmailLog | null>(null);

  // Helper to get complete outgoing email text including the official signature
  const getCompleteOutgoingMessage = (): string => {
    const trimmedBody = body.trim();
    const trimmedSig = signature.trim();
    if (!trimmedSig) return trimmedBody;

    // Avoid duplication if the body already ends with the exact signature
    if (trimmedBody.endsWith(trimmedSig)) {
      return trimmedBody;
    }

    // Avoid duplication if the body already contains the core organization signature block
    if (trimmedBody.includes('Technology Support Secretariat\nSustainable Ecology & Village Advancement (SEVA)')) {
      return trimmedBody;
    }

    return `${trimmedBody}\n\n${trimmedSig}`;
  };

  const handleSaveSignature = () => {
    SevaStore.saveEmailSignature(signature);
    setIsEditingSig(false);
    setSigSavedNotice(true);
    setTimeout(() => setSigSavedNotice(false), 3000);
  };

  const handleResetSignature = () => {
    const defaultSig = `Warm regards,\nTechnology Support Secretariat\nSustainable Ecology & Village Advancement (SEVA)\n31 B, Jalka, Ralegaon, Dist. Yavatmal, Maharashtra – 445402\nContact: +91 8999469974 | Email: seva.ecology@gmail.com\nWebsite: https://sevavillage.org`;
    setSignature(defaultSig);
    SevaStore.saveEmailSignature(defaultSig);
    setIsEditingSig(false);
    setSigSavedNotice(true);
    setTimeout(() => setSigSavedNotice(false), 3000);
  };

  // When changing template or application, re-populate tokens
  const handleTemplateChange = (tplId: string) => {
    setSelectedTemplateId(tplId);
    const tpl = templates.find((t) => t.id === tplId);
    if (tpl) {
      setSubject(renderTemplateTokens(tpl.subject, selectedApp));
      setBody(renderTemplateTokens(tpl.body, selectedApp));
    }
  };

  const handleAppChange = (appId: string) => {
    setSelectedAppId(appId);
    const app = applications.find((a) => a.id === appId);
    if (app && currentTemplate) {
      setSubject(renderTemplateTokens(currentTemplate.subject, app));
      setBody(renderTemplateTokens(currentTemplate.body, app));
    }
  };

  // 1. Direct Dispatch via Official Gmail Web Compose
  const handleSendViaGmail = () => {
    if (!selectedApp) return;

    const to = selectedApp.organisation_email;
    const cc = ccEmail.trim() || 'seva.ecology@gmail.com';
    const outgoingMessage = getCompleteOutgoingMessage();

    // Construct Gmail Web Compose URL
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&cc=${encodeURIComponent(cc)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(outgoingMessage)}`;

    // Open Gmail compose tab
    window.open(gmailUrl, '_blank');

    // Save accurate audit log
    const newLog = SevaStore.sendEmail({
      application_id: selectedApp.id,
      recipient_email: to,
      recipient_name: selectedApp.contact_person_name,
      cc_email: cc,
      subject,
      body: outgoingMessage,
      template_used: currentTemplate?.category,
      sent_by: 'SEVA Admin (seva.ecology@gmail.com)',
      status: 'Dispatched via Gmail',
      delivery_method: `Gmail Web (CC: ${cc})`,
    });

    setEmailLogs(SevaStore.getEmailLogs());
    setSendSuccessMsg(`Gmail विंडो उघडली आहे! ईमेल ${to} ला पाठवण्यासाठी तयार असून CC मध्ये ${cc} जोडले आहे. 'Send' वर क्लिक करा.`);
    setTimeout(() => setSendSuccessMsg(null), 6000);
  };

  // 2. Dispatch via Desktop Mail Client (mailto:)
  const handleSendViaMailApp = () => {
    if (!selectedApp) return;

    const to = selectedApp.organisation_email;
    const cc = ccEmail.trim() || 'seva.ecology@gmail.com';
    const outgoingMessage = getCompleteOutgoingMessage();

    const mailtoUrl = `mailto:${encodeURIComponent(to)}?cc=${encodeURIComponent(cc)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(outgoingMessage)}`;
    window.location.href = mailtoUrl;

    const newLog = SevaStore.sendEmail({
      application_id: selectedApp.id,
      recipient_email: to,
      recipient_name: selectedApp.contact_person_name,
      cc_email: cc,
      subject,
      body: outgoingMessage,
      template_used: currentTemplate?.category,
      sent_by: 'SEVA Admin (Default Mail Client)',
      status: 'Sent via Mail App',
      delivery_method: `Default Mail Client (CC: ${cc})`,
    });

    setEmailLogs(SevaStore.getEmailLogs());
    setSendSuccessMsg(`तुमचे Mail Client उघडले आहे! CC मध्ये ${cc} जोडले आहे.`);
    setTimeout(() => setSendSuccessMsg(null), 5000);
  };

  // 3. Copy draft to clipboard
  const handleCopyDraft = () => {
    const outgoingMessage = getCompleteOutgoingMessage();
    const fullDraft = `To: ${selectedApp?.organisation_email || ''}\nCC: ${ccEmail}\nSubject: ${subject}\n\n${outgoingMessage}`;
    navigator.clipboard.writeText(fullDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // 4. Delete specific audit log
  const handleDeleteLog = (logId: string) => {
    SevaStore.deleteEmailLog(logId);
    setEmailLogs(SevaStore.getEmailLogs());
  };

  // 5. Clear old test logs
  const handleClearAllLogs = () => {
    if (window.confirm('तुम्हाला मागील सर्व जुने ईमेल लॉग्स हटवायचे आहेत का?')) {
      SevaStore.clearEmailLogs();
      setEmailLogs([]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Explanation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            Email Communication &amp; Official Notifications
          </h2>
          <p className="text-xs text-stone-500">
            संस्थांना थेट अधिकृत Gmail वरून ईमेल पाठवा. प्रत्येक ईमेलची प्रत (CC) <strong>seva.ecology@gmail.com</strong> ला आपोआप पाठवली जाते.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Active CC: seva.ecology@gmail.com</span>
          </span>
        </div>
      </div>

      {/* Success Notification Alert */}
      {sendSuccessMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl text-xs font-semibold flex items-start gap-3 animate-in fade-in shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold">ईमेल प्रेषण यशस्वी!</div>
            <p className="leading-relaxed">{sendSuccessMsg}</p>
          </div>
        </div>
      )}

      {/* Composer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Template Selector & Parameters */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-4 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#184E34] text-white flex items-center justify-center font-mono text-[10px]">१</span>
              <span>प्राप्तकर्ता व टेम्पलेट निवडा</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Recipient Organisation (संस्था निवडा) *
              </label>
              <select
                value={selectedAppId}
                onChange={(e) => handleAppChange(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-200 bg-white text-xs font-medium"
              >
                {applications.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.id} - {a.name_of_organization} ({a.organisation_email})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Official Email Template (१० अधिकृत नमुने) *
              </label>
              <select
                value={selectedTemplateId}
                onChange={(e) => handleTemplateChange(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-200 bg-white text-xs font-bold text-[#184E34]"
              >
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedApp && (
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1.5 text-stone-600">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-800">अर्ज तपशील:</span>
                  <span className="font-mono text-[11px] bg-white px-2 py-0.5 rounded border border-stone-200">
                    {selectedApp.id}
                  </span>
                </div>
                <div><strong>संस्थेचे नाव:</strong> {selectedApp.name_of_organization}</div>
                <div><strong>संपर्क व्यक्ती:</strong> {selectedApp.contact_person_name}</div>
                <div><strong>ईमेल (To):</strong> <span className="font-mono text-emerald-800 font-semibold">{selectedApp.organisation_email}</span></div>
                <div><strong>जिल्हा / राज्य:</strong> {selectedApp.district}, {selectedApp.state}</div>
                <div><strong>सध्याची स्थिती:</strong> <span className="font-semibold text-stone-800">{selectedApp.status}</span></div>
              </div>
            )}

            {/* CC notice card */}
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1 text-emerald-950">
              <div className="font-bold flex items-center gap-1.5 text-[#184E34]">
                <Mail className="w-3.5 h-3.5" />
                <span>CC (प्रत): seva.ecology@gmail.com</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                हा ईमेल पाठवल्यानंतर तुम्हाला <strong>seva.ecology@gmail.com</strong> वर त्याची प्रत (CC) मिळेल, ज्यामुळे सर्व संवाद अधिकृतपणे तुमच्या इनबॉक्समध्ये सुरक्षित राहील.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Message Editor & Dispatch Options */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#184E34] text-white flex items-center justify-center font-mono text-[10px]">२</span>
                <span>मजकूर तपासा व पाठवा (Dispatch)</span>
              </h3>
              <button
                type="button"
                onClick={handleCopyDraft}
                className="text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1.5 px-3 py-1 rounded-lg border border-stone-200 hover:bg-stone-50 cursor-pointer transition-colors"
                title="ईमेल मजकूर कॉपी करा"
              >
                <Copy className="w-3.5 h-3.5 text-stone-500" />
                <span>{copied ? 'कॉपी झाले!' : 'मजकूर कॉपी करा'}</span>
              </button>
            </div>

            {/* Recipient To & CC display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-stone-600 font-semibold mb-1">
                  To (प्राप्तकर्ता):
                </label>
                <input
                  type="text"
                  readOnly
                  value={`${selectedApp?.contact_person_name || ''} <${selectedApp?.organisation_email || ''}>`}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 font-mono text-stone-700 text-xs"
                />
              </div>

              <div>
                <label className="block text-stone-600 font-semibold mb-1">
                  CC (प्रत):
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={ccEmail}
                    onChange={(e) => setCcEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-emerald-300 bg-emerald-50/50 font-mono text-emerald-900 text-xs font-semibold"
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-300">
                    Always CC
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Subject Line (विषय) *
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-[#184E34]/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Email Message Body (ईमेल संदेश) *
              </label>
              <textarea
                required
                rows={10}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-stone-200 text-xs leading-relaxed font-mono whitespace-pre-wrap focus:ring-2 focus:ring-[#184E34]/30"
              />
            </div>

            {/* Dedicated Signature section requested by user: Signature: (appended at the end of all outgoing messages) */}
            <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200/80 pb-2.5">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="text-xs font-bold text-stone-900 tracking-tight">
                      Signature:
                    </label>
                    <span className="text-[11px] font-medium text-stone-600">
                      (appended at the end of all outgoing messages)
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    हा अधिकृत स्वाक्षरी ब्लॉक सर्व बाहेर जाणार्‍या ईमेलच्या शेवटी आपोआप जोडला जातो.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isEditingSig ? (
                    <>
                      <button
                        type="button"
                        onClick={handleSaveSignature}
                        className="px-3 py-1.5 rounded-lg bg-[#184E34] hover:bg-[#0F3825] text-white text-[11px] font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>स्वाक्षरी सेव्ह करा (Save)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSignature(SevaStore.getEmailSignature());
                          setIsEditingSig(false);
                        }}
                        className="px-2.5 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-600 text-[11px] font-medium cursor-pointer transition-colors"
                      >
                        रद्द करा
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => setIsEditingSig(true)}
                        className="px-3 py-1.5 rounded-lg border border-stone-300 hover:bg-white bg-white/80 text-stone-700 text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-stone-600" />
                        <span>स्वाक्षरी संपादित करा (Edit)</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleResetSignature}
                        className="px-2.5 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-500 hover:text-stone-700 text-[11px] font-medium flex items-center gap-1 cursor-pointer transition-colors"
                        title="डिफॉल्ट SEVA स्वाक्षरीवर रिसेट करा"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>डिफॉल्ट रिसेट</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {sigSavedNotice && (
                <div className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>स्वाक्षरी यशस्वीरित्या सेव्ह झाली आहे!</span>
                </div>
              )}

              {isEditingSig ? (
                <div className="space-y-1.5">
                  <textarea
                    rows={6}
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#184E34]/40 bg-white text-xs font-mono whitespace-pre-wrap leading-relaxed focus:ring-2 focus:ring-[#184E34]/20"
                    placeholder="येथे तुमची अधिकृत स्वाक्षरी लिहा..."
                  />
                  <div className="text-[10px] text-stone-400">
                    टीप: येथे सेव्ह केलेली स्वाक्षरी ब्राउझरमध्ये कायमस्वरूपी सेव्ह राहील व सर्व ईमेलच्या शेवटी जाईल.
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-white border border-stone-200/90 text-xs font-mono text-stone-700 whitespace-pre-wrap leading-relaxed shadow-2xs">
                  {signature}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className="text-[11px] text-stone-500">
                क्लिक करताच CC सह थेट अधिकृत ईमेल पाठवला जाईल
              </span>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleSendViaMailApp}
                  className="px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors shadow-2xs"
                  title="Default Desktop Email Client (Outlook / Apple Mail)"
                >
                  <Mail className="w-4 h-4 text-stone-600" />
                  <span>Mail App द्वारे पाठवा</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendViaGmail}
                  className="px-5 py-2.5 rounded-xl bg-[#184E34] hover:bg-[#0F3825] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs transition-all active:scale-[0.98]"
                  title="Gmail मध्ये थेट उघडा आणि एका क्लिकवर पाठवा (CC: seva.ecology@gmail.com)"
                >
                  <Send className="w-4 h-4 text-emerald-300" />
                  <span>Gmail द्वारे थेट पाठवा (with CC)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sent Email Logs Table */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-50">
          <div>
            <h3 className="font-bold text-xs text-stone-900 uppercase tracking-wider">
              Sent Email History &amp; Delivery Audit Logs (पाठवलेल्या ईमेलची नोंद)
            </h3>
            <p className="text-[11px] text-stone-500">
              प्रत्येक पाठवलेल्या ईमेलची वेळ, प्राप्तकर्ता आणि CC (seva.ecology@gmail.com) पडताळणी नोंद
            </p>
          </div>

          {emailLogs.length > 0 && (
            <button
              onClick={handleClearAllLogs}
              className="text-[11px] font-semibold text-red-600 hover:text-red-800 hover:bg-red-50 px-2.5 py-1 rounded-lg border border-red-200 transition-colors cursor-pointer"
            >
              जुने टेस्ट लॉग्स साफ करा (Clear Test Logs)
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 font-bold border-b border-stone-200 text-[11px]">
              <tr>
                <th className="py-3 px-4">Application ID</th>
                <th className="py-3 px-4">Recipient (To)</th>
                <th className="py-3 px-4">CC (प्रत)</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Method / Status</th>
                <th className="py-3 px-4">Sent At (IST)</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {emailLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-stone-400">
                    कोणतेही ईमेल पाठवलेले नाहीत. वरील फॉर्मवरून ईमेल पाठवा.
                  </td>
                </tr>
              ) : (
                emailLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-stone-900 whitespace-nowrap">
                      {log.application_id || 'N/A'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-stone-900">{log.recipient_name}</div>
                      <div className="font-mono text-[11px] text-stone-500">{log.recipient_email}</div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-mono font-bold border border-emerald-200">
                        {log.cc_email || 'seva.ecology@gmail.com'}
                      </span>
                    </td>
                    <td className="py-3 px-4 max-w-[200px] truncate font-medium text-stone-800" title={log.subject}>
                      {log.subject}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-bold border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                        <span>{log.status}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-stone-500 whitespace-nowrap">
                      {new Date(log.sent_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setViewingLog(log)}
                          className="px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-semibold cursor-pointer transition-colors"
                          title="ईमेलचा पूर्ण मजकूर पहा"
                        >
                          मजकूर पहा
                        </button>
                        <button
                          onClick={() => {
                            const cc = log.cc_email || 'seva.ecology@gmail.com';
                            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(log.recipient_email)}&cc=${encodeURIComponent(cc)}&su=${encodeURIComponent(log.subject)}&body=${encodeURIComponent(log.body)}`;
                            window.open(gmailUrl, '_blank');
                          }}
                          className="p-1 rounded bg-emerald-50 hover:bg-emerald-100 text-[#184E34] cursor-pointer transition-colors"
                          title="Gmail मध्ये पुन्हा उघडा"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteLog(log.id)}
                          className="p-1 rounded hover:bg-red-50 text-red-600 cursor-pointer transition-colors"
                          title="हा लॉग डिलिट करा"
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
      </div>

      {/* Modal to view email body */}
      {viewingLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-stone-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <h3 className="font-bold text-sm text-stone-900">
                  पाठवलेल्या ईमेलचा सविस्तर मजकूर
                </h3>
                <span className="font-mono text-xs text-stone-500">
                  {new Date(viewingLog.sent_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                </span>
              </div>
              <button
                onClick={() => setViewingLog(null)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div><strong>To (प्राप्तकर्ता):</strong> {viewingLog.recipient_name} &lt;{viewingLog.recipient_email}&gt;</div>
              <div><strong>CC (प्रत):</strong> <span className="font-mono text-emerald-800 font-bold">{viewingLog.cc_email || 'seva.ecology@gmail.com'}</span></div>
              <div><strong>Subject (विषय):</strong> <span className="font-semibold text-stone-900">{viewingLog.subject}</span></div>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono whitespace-pre-wrap max-h-80 overflow-y-auto leading-relaxed text-stone-800">
              {viewingLog.body}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  const fullText = `To: ${viewingLog.recipient_email}\nCC: ${viewingLog.cc_email || 'seva.ecology@gmail.com'}\nSubject: ${viewingLog.subject}\n\n${viewingLog.body}`;
                  navigator.clipboard.writeText(fullText);
                  alert('मजकूर क्लिपबोर्डवर कॉपी झाला!');
                }}
                className="px-3 py-1.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>मजकूर कॉपी करा</span>
              </button>

              <button
                onClick={() => setViewingLog(null)}
                className="px-5 py-2 rounded-xl bg-[#184E34] text-white text-xs font-bold hover:bg-[#0F3825] cursor-pointer"
              >
                बंद करा
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
