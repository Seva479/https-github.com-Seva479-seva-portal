import React, { useState } from 'react';
import {
  Mail,
  Phone,
  Building,
  Calendar,
  Search,
  CheckCircle2,
  Trash2,
  MessageSquare,
  Clock,
  Send,
  Eye,
  AlertCircle,
  ExternalLink,
  Filter,
} from 'lucide-react';
import { SevaStore } from '../../services/store';
import { ContactMessage } from '../../types';

interface InquiriesManagerProps {
  onRefresh?: () => void;
}

export const InquiriesManager: React.FC<InquiriesManagerProps> = ({ onRefresh }) => {
  const [messages, setMessages] = useState<ContactMessage[]>(SevaStore.getContactMessages());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Unread' | 'Read' | 'Replied'>('All');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const refreshMessages = () => {
    const list = SevaStore.getContactMessages();
    setMessages(list);
    if (selectedMessage) {
      const found = list.find((m) => m.id === selectedMessage.id);
      setSelectedMessage(found || null);
    }
    if (onRefresh) onRefresh();
  };

  const handleUpdateStatus = (id: string, status: 'Unread' | 'Read' | 'Replied') => {
    SevaStore.updateContactMessageStatus(id, status);
    refreshMessages();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('हा चौकशी संदेश काढून टाकायचा आहे का? (Delete inquiry?)')) {
      SevaStore.deleteContactMessage(id);
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
      refreshMessages();
    }
  };

  const filteredMessages = messages.filter((msg) => {
    const matchesStatus = statusFilter === 'All' || msg.status === statusFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      msg.name.toLowerCase().includes(query) ||
      msg.email.toLowerCase().includes(query) ||
      (msg.organisation && msg.organisation.toLowerCase().includes(query)) ||
      msg.subject.toLowerCase().includes(query) ||
      msg.message.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  const unreadCount = messages.filter((m) => m.status === 'Unread').length;

  return (
    <div className="space-y-6">
      {/* Top Banner & Stats */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#184E34] flex items-center justify-center border border-emerald-200">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#143E29] tracking-tight">
                  चौकशी संदेश व्यवस्थापन (Inquiries &amp; Messages)
                </h2>
                <p className="text-xs text-stone-500 font-medium">
                  'Send Us an Inquiry' फॉर्मद्वारे नागरिकांनी व संस्थांनी पाठवलेले सर्व संदेश येथे दिसतील.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-amber-50 border border-amber-200 rounded-2xl text-center">
              <span className="text-[11px] font-bold text-amber-800 uppercase block">नवीन संदेश (Unread)</span>
              <span className="text-xl font-black text-amber-700">{unreadCount}</span>
            </div>
            <div className="px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
              <span className="text-[11px] font-bold text-emerald-800 uppercase block">एकूण संदेश (Total)</span>
              <span className="text-xl font-black text-[#184E34]">{messages.length}</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-6 pt-5 border-t border-stone-100 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="नाव, संस्था, ईमेल किंवा विषयाने शोधा..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#184E34]/20 focus:border-[#184E34]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {(['All', 'Unread', 'Read', 'Replied'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                  statusFilter === status
                    ? 'bg-[#184E34] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {status === 'All' && `सर्व (${messages.length})`}
                {status === 'Unread' && `नवीन (${unreadCount})`}
                {status === 'Read' && `वाचलेले (${messages.filter((m) => m.status === 'Read').length})`}
                {status === 'Replied' && `उत्तरे दिलेले (${messages.filter((m) => m.status === 'Replied').length})`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Messages Grid or Empty State */}
      {filteredMessages.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-stone-300 p-12 text-center space-y-3">
          <MessageSquare className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="text-base font-bold text-stone-800">कोणतेही चौकशी संदेश आढळले नाहीत</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            नागरिक किंवा संस्थांनी 'Contact' पेजवरून फॉर्म भरल्यावर त्यांचे संदेश त्वरित येथे दिसतील.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* List of Messages */}
          <div className={`${selectedMessage ? 'lg:col-span-5' : 'lg:col-span-12'} space-y-3`}>
            {filteredMessages.map((msg) => {
              const isSelected = selectedMessage?.id === msg.id;
              const formattedDate = new Date(msg.submitted_at).toLocaleDateString('mr-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={msg.id}
                  onClick={() => {
                    setSelectedMessage(msg);
                    if (msg.status === 'Unread') {
                      handleUpdateStatus(msg.id, 'Read');
                    }
                  }}
                  className={`bg-white rounded-2xl border p-5 transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border-[#184E34] shadow-md ring-2 ring-[#184E34]/15'
                      : 'border-stone-200 hover:border-stone-300 shadow-2xs'
                  }`}
                >
                  {/* Status Indicator */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        msg.status === 'Unread'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300 font-extrabold'
                          : msg.status === 'Replied'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-stone-100 text-stone-700 border border-stone-200'
                      }`}
                    >
                      {msg.status === 'Unread' && '● नवीन (Unread)'}
                      {msg.status === 'Read' && 'वाचलेला (Read)'}
                      {msg.status === 'Replied' && 'उत्तर दिले (Replied)'}
                    </span>

                    <span className="text-[11px] text-stone-400 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formattedDate}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 leading-snug line-clamp-1">
                    {msg.subject || 'सामान्य चौकशी (General Inquiry)'}
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-600 mt-1 mb-2 font-medium">
                    <span className="font-bold text-stone-900">{msg.name}</span>
                    {msg.organisation && (
                      <span className="flex items-center gap-1 text-stone-500">
                        <Building className="w-3 h-3" />
                        {msg.organisation}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Detailed Message Viewer */}
          {selectedMessage && (
            <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-md space-y-6 sticky top-24">
              <div className="flex items-start justify-between gap-3 border-b border-stone-100 pb-4">
                <div>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold mb-2 uppercase ${
                      selectedMessage.status === 'Unread'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : selectedMessage.status === 'Replied'
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    स्थिती: {selectedMessage.status}
                  </span>
                  <h3 className="text-xl font-black text-[#143E29]">
                    {selectedMessage.subject || 'चौकशी संदेश'}
                  </h3>
                  <span className="text-xs text-stone-400 font-mono">
                    दिनांक:{' '}
                    {new Date(selectedMessage.submitted_at).toLocaleString('mr-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="p-2 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    title="संदेश हटवा"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sender Details */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-stone-400 block font-semibold uppercase text-[10px]">पाठवणारा (Sender)</span>
                  <span className="font-bold text-stone-900 text-sm">{selectedMessage.name}</span>
                </div>

                {selectedMessage.organisation && (
                  <div>
                    <span className="text-stone-400 block font-semibold uppercase text-[10px]">संस्था (Organisation)</span>
                    <span className="font-bold text-stone-800">{selectedMessage.organisation}</span>
                  </div>
                )}

                <div>
                  <span className="text-stone-400 block font-semibold uppercase text-[10px]">ईमेल पत्ता</span>
                  <a
                    href={`mailto:${selectedMessage.email}?subject=SEVA Response: ${encodeURIComponent(selectedMessage.subject || 'Inquiry')}`}
                    className="font-medium text-[#184E34] hover:underline flex items-center gap-1"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{selectedMessage.email}</span>
                  </a>
                </div>

                {selectedMessage.phone && (
                  <div>
                    <span className="text-stone-400 block font-semibold uppercase text-[10px]">फोन नंबर</span>
                    <a
                      href={`tel:${selectedMessage.phone}`}
                      className="font-medium text-[#184E34] hover:underline flex items-center gap-1"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{selectedMessage.phone}</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Message Body */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  संदेश मजकूर (Message Body)
                </span>
                <div className="p-5 rounded-2xl bg-[#F7FAF8] border border-stone-200 text-stone-800 text-sm leading-relaxed whitespace-pre-line font-normal">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-500 font-semibold">स्थिती बदला:</span>
                  <button
                    onClick={() => handleUpdateStatus(selectedMessage.id, 'Unread')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                      selectedMessage.status === 'Unread'
                        ? 'bg-amber-600 text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    Unread
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedMessage.id, 'Read')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                      selectedMessage.status === 'Read'
                        ? 'bg-blue-600 text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    Read
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedMessage.id, 'Replied')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                      selectedMessage.status === 'Replied'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    Replied
                  </button>
                </div>

                <a
                  href={`mailto:${selectedMessage.email}?subject=SEVA Response: ${encodeURIComponent(selectedMessage.subject || 'Inquiry')}`}
                  onClick={() => handleUpdateStatus(selectedMessage.id, 'Replied')}
                  className="px-5 py-2.5 rounded-full bg-[#184E34] hover:bg-[#0F3825] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>ईमेलने उत्तर पाठवा (Reply via Email)</span>
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
