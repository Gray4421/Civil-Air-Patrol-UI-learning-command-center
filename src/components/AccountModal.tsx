import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { CADET_RANKS } from '../data/cadetData';
import { CadetRankId } from '../types';
import { 
  X, 
  ShieldCheck, 
  Download, 
  Upload, 
  RefreshCw, 
  CheckCircle, 
  Edit3, 
  LogOut, 
  User, 
  Hash, 
  Compass, 
  Award,
  Save
} from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const { 
    user, 
    isAuthenticated, 
    updateProfile, 
    logoutGoogle, 
    setIsGoogleModalOpen, 
    exportProgressJSON, 
    importProgressJSON, 
    resetProgress 
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'status' | 'edit' | 'sync'>('status');

  // Edit form states
  const [editName, setEditName] = useState('');
  const [editCapId, setEditCapId] = useState('');
  const [editRankId, setEditRankId] = useState<CadetRankId>('c_ab');
  const [editSquadron, setEditSquadron] = useState('');
  const [editCallsign, setEditCallsign] = useState('');
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Backup form states
  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setEditName(user.fullName || '');
      setEditCapId(user.capId || '');
      setEditRankId(user.currentRankId || 'c_ab');
      setEditSquadron(user.squadron || '');
      setEditCallsign(user.callsign || '');
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const currentRank = CADET_RANKS.find((r) => r.id === user?.currentRankId) || CADET_RANKS[0];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim() || !editCapId.trim() || !editSquadron.trim()) return;

    updateProfile({
      fullName: editName.trim(),
      capId: editCapId.trim(),
      currentRankId: editRankId,
      squadron: editSquadron.trim(),
      callsign: editCallsign.trim() || undefined,
    });

    setSaveMessage('Cadet personnel record updated successfully!');
    setTimeout(() => {
      setSaveMessage(null);
      setActiveTab('status');
    }, 1200);
  };

  const handleExport = () => {
    const data = exportProgressJSON();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cap_cadet_${user?.callsign || 'tracker'}_record.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    setImportStatus(null);
    if (!importText.trim()) return;
    const success = importProgressJSON(importText);
    if (success) {
      setImportStatus('Cadet profile and progress restored successfully!');
      setTimeout(() => {
        setActiveTab('status');
        setImportStatus(null);
      }, 1200);
    } else {
      setImportStatus('Invalid JSON backup file. Please verify and retry.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0a1e3d] border border-[#163a70] rounded-3xl shadow-2xl overflow-hidden text-slate-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#002855] via-[#0a1e3d] to-[#06142a] p-5 border-b border-[#163a70] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c8102e]/20 border border-[#c8102e]/50 flex items-center justify-center text-[#ffc72c] shadow">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">Cadet Personnel Record</h2>
              <p className="text-xs text-slate-300">Civil Air Patrol eServices Sync</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-[#163a70] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tab Switcher */}
        <div className="flex border-b border-[#163a70] bg-[#06142a] px-5 pt-2 gap-2 text-xs">
          <button
            onClick={() => setActiveTab('status')}
            className={`pb-2 px-3 font-bold border-b-2 transition cursor-pointer ${
              activeTab === 'status'
                ? 'border-[#ffc72c] text-[#ffc72c]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Active Record
          </button>
          <button
            onClick={() => setActiveTab('edit')}
            className={`pb-2 px-3 font-bold border-b-2 transition cursor-pointer ${
              activeTab === 'edit'
                ? 'border-[#ffc72c] text-[#ffc72c]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Edit Profile & Rank
          </button>
          <button
            onClick={() => setActiveTab('sync')}
            className={`pb-2 px-3 font-bold border-b-2 transition cursor-pointer ${
              activeTab === 'sync'
                ? 'border-[#ffc72c] text-[#ffc72c]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Backup / Restore
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {activeTab === 'status' && (
            <div className="space-y-4">
              {/* Cadet Identification Badge */}
              <div className="p-4 rounded-2xl bg-[#06142a] border border-[#163a70] flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                    Enrolled Cadet Record
                  </div>
                  <div className="text-lg font-bold text-white flex items-center gap-2 mt-0.5">
                    <span>{user?.fullName || 'Cadet'}</span>
                    {user?.callsign && (
                      <span className="text-xs px-2 py-0.5 rounded bg-[#002855] text-[#ffc72c] border border-[#ffc72c]/40 font-bold">
                        "{user.callsign}"
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-300 mt-1">
                    CAP ID: <span className="text-white font-mono font-bold">{user?.capId || 'Pending'}</span> • {user?.squadron || 'Unassigned'}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-black text-[#ffc72c]">{currentRank.abbreviation}</div>
                  <div className="text-[11px] text-slate-300">{currentRank.name}</div>
                  <div className="text-[10px] text-[#ffc72c] mt-0.5 font-bold">
                    {user?.honorPoints || 0} Honor Pts
                  </div>
                </div>
              </div>

              {/* Google Account Authentication Status */}
              <div className="p-3.5 rounded-xl bg-[#002855]/60 border border-[#163a70] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                  <div>
                    <div className="text-xs font-semibold text-white">
                      {user?.isGoogleAuth ? 'Authenticated with Google' : 'Guest Mode (Unauthenticated)'}
                    </div>
                    <div className="text-[11px] text-slate-300">
                      {user?.email || 'No email linked'}
                    </div>
                  </div>
                </div>

                {user?.isGoogleAuth ? (
                  <button
                    onClick={() => {
                      logoutGoogle();
                      onClose();
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-950/60 hover:bg-red-900/80 border border-red-800 text-red-200 text-xs font-medium transition cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      onClose();
                      setIsGoogleModalOpen(true);
                    }}
                    className="px-3 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold transition cursor-pointer shadow-sm"
                  >
                    Sign In
                  </button>
                )}
              </div>

              {/* Progress Summary: Badges and Qualifications Removed */}
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3.5 rounded-xl bg-[#06142a] border border-[#163a70]">
                  <div className="text-xs text-slate-400">Scenarios Passed</div>
                  <div className="text-xl font-black text-emerald-400 mt-1 font-tech">
                    {Object.values(user?.scenarioResults || {}).filter((s) => s.passed).length} / 8
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#06142a] border border-[#163a70]">
                  <div className="text-xs text-slate-400">Ribbons Earned</div>
                  <div className="text-xl font-black text-[#ffc72c] mt-1 font-tech">
                    {user?.earnedRibbonIds.length || 0}
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#002855]/40 border border-[#163a70] text-xs text-blue-100">
                <p className="flex items-center gap-1.5 font-medium">
                  <CheckCircle className="w-4 h-4 text-[#ffc72c] flex-shrink-0" />
                  Your training scores, drill records, and ribbons sync automatically with your Google account.
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setActiveTab('edit')}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#002855] hover:bg-[#003875] text-white text-xs font-semibold border border-[#163a70] transition cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#ffc72c]" />
                  Edit Profile & Rank
                </button>
                <button
                  onClick={handleExport}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#06142a] hover:bg-[#11315f] text-slate-200 text-xs font-medium border border-[#163a70] transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#ffc72c]" />
                  Export
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Reset all completed scenarios and points back to initial cadet status?')) {
                      resetProgress();
                    }
                  }}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#c8102e]/20 hover:bg-[#c8102e]/30 text-red-300 text-xs font-medium border border-[#c8102e]/50 transition cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset
                </button>
              </div>
            </div>
          )}

          {activeTab === 'edit' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <p className="text-xs text-slate-300">
                Update your official cadet credentials, current rank, or assigned squadron at any time.
              </p>

              {saveMessage && (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-200 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  {saveMessage}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#ffc72c]" />
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#06142a] border border-[#163a70] text-white text-sm focus:outline-none focus:border-[#ffc72c]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-[#ffc72c]" />
                    CAP ID Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 684920"
                    value={editCapId}
                    onChange={(e) => setEditCapId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#06142a] border border-[#163a70] text-white font-mono text-sm focus:outline-none focus:border-[#ffc72c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1">
                    Flight Callsign
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Apex"
                    value={editCallsign}
                    onChange={(e) => setEditCallsign(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#06142a] border border-[#163a70] text-white text-sm focus:outline-none focus:border-[#ffc72c]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#ffc72c]" />
                  Assigned Squadron
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Squadron 101 (Phoenix)"
                  value={editSquadron}
                  onChange={(e) => setEditSquadron(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#06142a] border border-[#163a70] text-white text-sm focus:outline-none focus:border-[#ffc72c]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#ffc72c]" />
                  Current Cadet Grade / Rank
                </label>
                <select
                  value={editRankId}
                  onChange={(e) => setEditRankId(e.target.value as CadetRankId)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#06142a] border border-[#163a70] text-white text-sm focus:outline-none focus:border-[#ffc72c] cursor-pointer"
                >
                  {CADET_RANKS.map((r) => (
                    <option key={r.id} value={r.id} className="bg-[#0a1e3d] text-white">
                      {r.abbreviation} — {r.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('status')}
                  className="px-4 py-2.5 rounded-xl border border-[#163a70] text-xs font-semibold text-slate-300 hover:bg-[#163a70] transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#c8102e] hover:bg-[#a80c25] text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-[#c8102e]/30 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  Save Record Changes
                </button>
              </div>
            </form>
          )}

          {activeTab === 'sync' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-300">
                You can save your cadet progress offline as a JSON file or paste your backup to transfer records between devices.
              </p>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Paste JSON Backup</label>
                <textarea
                  rows={4}
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder="Paste your exported progress JSON here..."
                  className="w-full px-3 py-2 rounded-xl bg-[#06142a] border border-[#163a70] text-white font-mono text-xs focus:outline-none focus:border-[#ffc72c]"
                />
              </div>

              {importStatus && (
                <div className="p-3 rounded-xl bg-[#06142a] border border-[#163a70] text-xs text-[#ffc72c]">
                  {importStatus}
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={handleImport}
                  className="flex-1 py-2.5 rounded-xl bg-[#c8102e] hover:bg-[#a80c25] text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-md shadow-[#c8102e]/30 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  Restore Progress
                </button>
                <button
                  onClick={handleExport}
                  className="py-2.5 px-4 rounded-xl bg-[#002855] hover:bg-[#003875] text-white text-xs font-bold border border-[#163a70] transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#ffc72c]" />
                  Export
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
