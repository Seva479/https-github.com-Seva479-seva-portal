import React, { useState } from 'react';
import {
  Save,
  CheckCircle2,
  TrendingUp,
  BookOpen,
  FileText,
  Building,
  Plus,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import { SevaStore } from '../../services/store';
import { ImpactStatistic, CaseStudy, ResourceItem, OrganisationSettings } from '../../types';

export const ContentManager: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'stats' | 'case_studies' | 'resources' | 'settings'>('stats');

  // CMS States
  const [impactStats, setImpactStats] = useState<ImpactStatistic[]>(SevaStore.getImpactStats());
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(SevaStore.getCaseStudies());
  const [resources, setResources] = useState<ResourceItem[]>(SevaStore.getResources());
  const [settings, setSettings] = useState<OrganisationSettings>(SevaStore.getSettings());
  const [savedSuccess, setSavedSuccess] = useState(false);

  // New Case Study Form State
  const [showNewCaseStudy, setShowNewCaseStudy] = useState(false);
  const [newCaseStudy, setNewCaseStudy] = useState<Partial<CaseStudy>>({
    organisation_name: '',
    state: 'Maharashtra',
    district: 'Yavatmal',
    organisation_background: '',
    challenge_before_support: '',
    technology_support_provided: '',
    implementation_process: '',
    results_and_improvements: ['', ''],
    testimonial_quote: '',
    testimonial_author: '',
    testimonial_designation: '',
    image_url: '',
  });

  // Save Impact Stats
  const handleSaveStats = () => {
    impactStats.forEach((st) => {
      SevaStore.updateImpactStat(st.id, st);
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  // Save Settings
  const handleSaveSettings = () => {
    SevaStore.saveSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  // Submit New Case Study
  const handleCreateCaseStudy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCaseStudy.organisation_name) return;

    const fullCaseStudy: CaseStudy = {
      id: `cs-${Date.now()}`,
      organisation_name: newCaseStudy.organisation_name!,
      state: newCaseStudy.state || 'Maharashtra',
      district: newCaseStudy.district || 'Yavatmal',
      organisation_background: newCaseStudy.organisation_background || '',
      challenge_before_support: newCaseStudy.challenge_before_support || '',
      technology_support_provided: newCaseStudy.technology_support_provided || '',
      implementation_process: newCaseStudy.implementation_process || '',
      results_and_improvements: (newCaseStudy.results_and_improvements || []).filter((r) => r.trim().length > 0),
      image_url: newCaseStudy.image_url?.trim() || '',
      testimonial_quote: newCaseStudy.testimonial_quote,
      testimonial_author: newCaseStudy.testimonial_author,
      testimonial_designation: newCaseStudy.testimonial_designation,
      date_published: new Date().toISOString().split('T')[0],
      is_published: true,
      is_sample: false,
    };

    SevaStore.saveCaseStudy(fullCaseStudy);
    setCaseStudies(SevaStore.getCaseStudies());
    setShowNewCaseStudy(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            Website Content Management System (CMS)
          </h2>
          <p className="text-xs text-stone-500">
            Update impact metrics, verified case studies, resources, and contact coordinates without editing code
          </p>
        </div>

        {savedSuccess && (
          <div className="p-2.5 px-4 rounded-lg bg-emerald-50 border border-emerald-300 text-[#064E36] text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0B6643]" />
            <span>Changes published to live website!</span>
          </div>
        )}
      </div>

      {/* Sub Tabs */}
      <div className="bg-white rounded-xl border border-stone-200 p-1 flex gap-2">
        <button
          onClick={() => setActiveSubTab('stats')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeSubTab === 'stats'
              ? 'bg-[#0B6643] text-white'
              : 'text-stone-600 hover:bg-stone-50'
          }`}
        >
          Impact Statistics
        </button>
        <button
          onClick={() => setActiveSubTab('case_studies')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeSubTab === 'case_studies'
              ? 'bg-[#0B6643] text-white'
              : 'text-stone-600 hover:bg-stone-50'
          }`}
        >
          Verified Case Studies
        </button>
        <button
          onClick={() => setActiveSubTab('settings')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeSubTab === 'settings'
              ? 'bg-[#0B6643] text-white'
              : 'text-stone-600 hover:bg-stone-50'
          }`}
        >
          Organisation Coordinates &amp; Banner
        </button>
      </div>

      {/* 1. IMPACT STATS */}
      {activeSubTab === 'stats' && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-6 shadow-xs">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-stone-900">
              Verified Impact Statistics
            </h3>
            <p className="text-xs text-stone-500">
              Update these numbers after verifying actual grassroots project documentation. Changes reflect immediately across the homepage and impact page.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {impactStats.map((stat, idx) => (
              <div key={stat.id} className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">
                    Label
                  </label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => {
                      const updated = [...impactStats];
                      updated[idx].label = e.target.value;
                      setImpactStats(updated);
                    }}
                    className="w-full p-2 rounded border border-stone-200 bg-white text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">
                    Display Value (e.g. 38, 260+, 14)
                  </label>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => {
                      const updated = [...impactStats];
                      updated[idx].value = e.target.value;
                      setImpactStats(updated);
                    }}
                    className="w-full p-2 rounded border border-stone-200 bg-white font-mono font-bold text-base text-[#0B6643]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">
                    Subtext Description
                  </label>
                  <input
                    type="text"
                    value={stat.subtext}
                    onChange={(e) => {
                      const updated = [...impactStats];
                      updated[idx].subtext = e.target.value;
                      setImpactStats(updated);
                    }}
                    className="w-full p-2 rounded border border-stone-200 bg-white text-xs text-stone-600"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleSaveStats}
              className="px-6 py-2.5 rounded-lg bg-[#0B6643] hover:bg-[#064E36] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>Save &amp; Publish Impact Numbers</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. CASE STUDIES */}
      {activeSubTab === 'case_studies' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-900">
              Verified Field Case Studies ({caseStudies.length})
            </h3>
            <button
              onClick={() => setShowNewCaseStudy(true)}
              className="px-4 py-2 rounded-lg bg-[#0B6643] hover:bg-[#064E36] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Verified Case Study</span>
            </button>
          </div>

          {/* New Case Study Form */}
          {showNewCaseStudy && (
            <form
              onSubmit={handleCreateCaseStudy}
              className="bg-white rounded-xl border border-stone-200 p-6 space-y-4 shadow-xs"
            >
              <h4 className="font-bold text-sm text-stone-900">
                New Case Study Profile
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Organisation Name *</label>
                  <input
                    type="text"
                    required
                    value={newCaseStudy.organisation_name}
                    onChange={(e) => setNewCaseStudy({ ...newCaseStudy, organisation_name: e.target.value })}
                    className="w-full p-2 rounded border border-stone-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">District *</label>
                  <input
                    type="text"
                    required
                    value={newCaseStudy.district}
                    onChange={(e) => setNewCaseStudy({ ...newCaseStudy, district: e.target.value })}
                    className="w-full p-2 rounded border border-stone-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={newCaseStudy.state}
                    onChange={(e) => setNewCaseStudy({ ...newCaseStudy, state: e.target.value })}
                    className="w-full p-2 rounded border border-stone-200"
                  />
                </div>
              </div>

              <div className="text-xs space-y-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Organisation Background</label>
                  <input
                    type="text"
                    value={newCaseStudy.organisation_background}
                    onChange={(e) => setNewCaseStudy({ ...newCaseStudy, organisation_background: e.target.value })}
                    placeholder="e.g. Grassroots society working with 40 tribal villages on agriculture..."
                    className="w-full p-2 rounded border border-stone-200"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Challenge Before Support *</label>
                    <textarea
                      rows={2}
                      required
                      value={newCaseStudy.challenge_before_support}
                      onChange={(e) => setNewCaseStudy({ ...newCaseStudy, challenge_before_support: e.target.value })}
                      className="w-full p-2 rounded border border-stone-200"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Technology Support Provided *</label>
                    <textarea
                      rows={2}
                      required
                      value={newCaseStudy.technology_support_provided}
                      onChange={(e) => setNewCaseStudy({ ...newCaseStudy, technology_support_provided: e.target.value })}
                      className="w-full p-2 rounded border border-stone-200"
                    />
                  </div>
                </div>

                {/* Leader Profile & Circular Avatar Setup (संस्थाचालक प्रोफाइल) */}
                <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#064E36] uppercase tracking-wide">
                      संस्थाचालक प्रोफाइल व राउंड फोटो (Organisation Leader Profile &amp; Round Avatar)
                    </span>
                    <span className="text-[11px] text-stone-500 font-medium">
                      मोठा फोटो काढुन टाकला असून गोल आयकॉनमध्ये दिसेल
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    <div className="sm:col-span-8 space-y-2">
                      <label className="block font-semibold text-stone-700">
                        संस्थाचालक फोटो URL (Leader Image URL)
                      </label>
                      <input
                        type="url"
                        placeholder="https://example.com/leader-photo.jpg (रिकामे ठेवल्यास सुंदर अक्षरांचा गोल बॅज दिसेल)"
                        value={newCaseStudy.image_url || ''}
                        onChange={(e) => setNewCaseStudy({ ...newCaseStudy, image_url: e.target.value })}
                        className="w-full p-2 rounded border border-stone-200 bg-white"
                      />
                    </div>

                    <div className="sm:col-span-4 flex items-center gap-3 bg-white p-2.5 rounded-lg border border-emerald-100 shadow-xs">
                      {newCaseStudy.image_url && newCaseStudy.image_url.trim() ? (
                        <img
                          src={newCaseStudy.image_url}
                          alt="Round Preview"
                          className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 ring-2 ring-emerald-200 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-100 to-amber-100 border-2 border-emerald-500 flex items-center justify-center font-extrabold text-[#064E36] text-sm shrink-0">
                          {((newCaseStudy.testimonial_author || newCaseStudy.organisation_name || 'SC')
                            .split(' ')
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join('') || 'SC').toUpperCase()}
                        </div>
                      )}
                      <div className="text-[11px] text-stone-600 leading-tight">
                        <strong className="block text-stone-900 font-bold">राउंड प्रिव्ह्यू</strong>
                        <span>संकेतस्थळावर असा गोल दिसेल</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">संस्थाचालकाचे नाव (Leader Name)</label>
                      <input
                        type="text"
                        placeholder="उदा. सुनीता पाटील"
                        value={newCaseStudy.testimonial_author || ''}
                        onChange={(e) => setNewCaseStudy({ ...newCaseStudy, testimonial_author: e.target.value })}
                        className="w-full p-2 rounded border border-stone-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">पद / हुद्दा (Designation)</label>
                      <input
                        type="text"
                        placeholder="उदा. प्रकल्प संचालक / सचिव"
                        value={newCaseStudy.testimonial_designation || ''}
                        onChange={(e) => setNewCaseStudy({ ...newCaseStudy, testimonial_designation: e.target.value })}
                        className="w-full p-2 rounded border border-stone-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">प्रतिक्रिया / मत (Quote)</label>
                      <input
                        type="text"
                        placeholder="उदा. SEVA च्या मदतीमुळे आमचे काम सुलभ झाले..."
                        value={newCaseStudy.testimonial_quote || ''}
                        onChange={(e) => setNewCaseStudy({ ...newCaseStudy, testimonial_quote: e.target.value })}
                        className="w-full p-2 rounded border border-stone-200 bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewCaseStudy(false)}
                  className="px-4 py-2 border border-stone-200 rounded-lg text-xs hover:bg-stone-50 cursor-pointer"
                >
                  रद्द करा (Cancel)
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B6643] hover:bg-[#064E36] text-white rounded-lg text-xs font-semibold cursor-pointer shadow-xs"
                >
                  केस स्टडी प्रकाशित करा (Publish Case Study)
                </button>
              </div>
            </form>
          )}

          {/* Existing Case Studies List */}
          <div className="space-y-3">
            {caseStudies.map((cs) => (
              <div key={cs.id} className="bg-white rounded-xl border border-stone-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-200 transition-colors shadow-2xs">
                <div className="flex items-center gap-3.5">
                  {/* Round Leader Avatar Thumbnail */}
                  <div className="relative shrink-0">
                    {cs.image_url && cs.image_url.trim() && !cs.image_url.includes('hero_') && !cs.image_url.includes('training_') && !cs.image_url.includes('field_') ? (
                      <img
                        src={cs.image_url}
                        alt={cs.testimonial_author || cs.organisation_name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow-xs"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-100 to-amber-100 border-2 border-emerald-500 flex items-center justify-center font-extrabold text-[#064E36] text-sm shadow-xs">
                        {((cs.testimonial_author || cs.organisation_name || 'SC')
                          .split(' ')
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join('') || 'SC').toUpperCase()}
                      </div>
                    )}
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#0B6643] border border-white flex items-center justify-center text-[8px] text-white font-bold">
                      ✓
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-sm text-stone-900">{cs.organisation_name}</span>
                      <span className="text-xs text-stone-400">·</span>
                      <span className="text-xs text-stone-500">{cs.district}, {cs.state}</span>
                      <span className="text-[10px] bg-emerald-50 text-[#064E36] px-2 py-0.5 rounded font-semibold border border-emerald-200">
                        {cs.testimonial_author ? `संचालक: ${cs.testimonial_author}` : 'सत्यापित अहवाल'}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 line-clamp-1">{cs.technology_support_provided}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                  <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    Published
                  </span>
                  <button
                    onClick={() => {
                      if (window.confirm(`खरोखर "${cs.organisation_name}" ची केस स्टडी हटवायची आहे का?`)) {
                        SevaStore.deleteCaseStudy(cs.id);
                        setCaseStudies(SevaStore.getCaseStudies());
                      }
                    }}
                    className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg hover:bg-red-50 cursor-pointer transition-colors"
                    title="केस स्टडी हटवा"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. ORGANISATION SETTINGS */}
      {activeSubTab === 'settings' && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-6 shadow-xs">
          <h3 className="text-sm font-bold text-stone-900">
            Organisation Legal Identity &amp; Contact Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            <div>
              <label className="block font-bold text-stone-700 mb-1">Organisation Legal Name</label>
              <input
                type="text"
                value={settings.org_name}
                onChange={(e) => setSettings({ ...settings, org_name: e.target.value })}
                className="w-full p-2.5 rounded border border-stone-200 font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">Official Website URL</label>
              <input
                type="text"
                value={settings.website_url}
                onChange={(e) => setSettings({ ...settings, website_url: e.target.value })}
                className="w-full p-2.5 rounded border border-stone-200"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">Helpline Phone Number</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full p-2.5 rounded border border-stone-200 font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">Official Email Address</label>
              <input
                type="text"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full p-2.5 rounded border border-stone-200"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-stone-700 mb-1">Registered Address</label>
              <input
                type="text"
                value={`${settings.address_line1}, ${settings.address_district}, ${settings.address_state} - ${settings.address_pin}`}
                disabled
                className="w-full p-2.5 rounded border border-stone-200 bg-stone-50 text-stone-500 font-medium"
              />
              <span className="text-[11px] text-stone-400 mt-1 block">
                Statutory Address registered at 31 B, Jalka, Ralegaon, Yavatmal, Maharashtra.
              </span>
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-stone-700 mb-1">Homepage Announcement Banner</label>
              <input
                type="text"
                value={settings.announcement_banner}
                onChange={(e) => setSettings({ ...settings, announcement_banner: e.target.value })}
                className="w-full p-2.5 rounded border border-stone-200"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleSaveSettings}
              className="px-6 py-2.5 rounded-lg bg-[#0B6643] hover:bg-[#064E36] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>Save System Settings</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
