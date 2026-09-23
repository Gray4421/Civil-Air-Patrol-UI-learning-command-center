import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { CADET_RANKS } from '../data/cadetData';
import { CadetRankId } from '../types';
import { Shield, Award, User, Hash, Compass, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CapEmblem } from './CapEmblem';

interface CadetOnboardingModalProps {
  isOpen: boolean;
}

export const CadetOnboardingModal: React.FC<CadetOnboardingModalProps> = ({ isOpen }) => {
  const { user, completeOnboarding } = useAuth();

  const [fullName, setFullName] = useState('');
  const [capId, setCapId] = useState('');
  const [rankId, setRankId] = useState<CadetRankId>('c_ab');
  const [squadron, setSquadron] = useState('');
  const [callsign, setCallsign] = useState('');
  const [error, setError] = useState('');

  // Prefill from user when opened
  useEffect(() => {
    if (user) {
      if (
        user.fullName &&
        user.fullName !== 'New Cadet' &&
        user.fullName !== 'Cadet' &&
        !user.fullName.toLowerCase().includes('jordan') &&
        !user.fullName.toLowerCase().includes('jordin') &&
        user.fullName !== 'jwilliam4421'
      ) {
        setFullName(user.fullName);
      } else {
        setFullName('');
      }
      if (user.capId && user.capId.length >= 6) {
        setCapId(user.capId);
      }
      if (user.squadron) {
        setSquadron(user.squadron);
      }
      if (user.currentRankId) {
        setRankId(user.currentRankId);
      }
    }
  }, [user]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanName = fullName.trim();
    const cleanCapId = capId.trim();
    const cleanSquadron = squadron.trim();

    if (!cleanName) {
      setError('Please enter your full name as registered in CAP eServices.');
      return;
    }
    if (!cleanCapId) {
      setError('Please enter your Civil Air Patrol ID number (typically 6 or 7 digits).');
      return;
    }
    if (!cleanSquadron) {
      setError('Please enter your Squadron name or number.');
      return;
    }

    completeOnboarding({
      fullName: cleanName,
      capId: cleanCapId,
      currentRankId: rankId,
      squadron: cleanSquadron,
      callsign: callsign.trim() || undefined,
    });
  };

  const selectedRank = CADET_RANKS.find((r) => r.id === rankId) || CADET_RANKS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0a1e3d] border border-[#163a70] rounded-3xl shadow-2xl overflow-hidden text-slate-100 animate-scale-in">
        {/* Header Ribbon */}
        <div className="cap-tricolor-stripe h-1.5 w-full" />

        <div className="p-6 sm:p-7 space-y-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-2xl bg-[#002855] border border-[#ffc72c]/40 flex-shrink-0 shadow-lg">
              <CapEmblem size={42} />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ffc72c]/20 border border-[#ffc72c]/40 text-[#ffc72c] text-[11px] font-bold uppercase tracking-wider mb-1">
                <Shield className="w-3 h-3" /> Initial Enlistment Setup
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Welcome to Civil Air Patrol!
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Enter your official CAP membership details to link your Google account to your personnel dossier and dashboard.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/80 text-xs text-red-200 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Cadet Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#ffc72c]" />
                Cadet Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#06142a] border border-[#163a70] text-white text-sm focus:outline-none focus:border-[#ffc72c] focus:ring-1 focus:ring-[#ffc72c] transition placeholder:text-slate-500"
              />
            </div>

            {/* CAP Number & Squadron Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-[#ffc72c]" />
                  CAP ID Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 684920"
                  value={capId}
                  onChange={(e) => setCapId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#06142a] border border-[#163a70] text-white font-mono text-sm focus:outline-none focus:border-[#ffc72c] focus:ring-1 focus:ring-[#ffc72c] transition placeholder:text-slate-500"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Found on your CAP card or eServices
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#ffc72c]" />
                  Squadron
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Squadron 101"
                  value={squadron}
                  onChange={(e) => setSquadron(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#06142a] border border-[#163a70] text-white text-sm focus:outline-none focus:border-[#ffc72c] focus:ring-1 focus:ring-[#ffc72c] transition placeholder:text-slate-500"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Composite, Cadet, or Hometown Unit
                </span>
              </div>
            </div>

            {/* Current Rank Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#ffc72c]" />
                  Current Cadet Grade / Rank
                </span>
                <span className="text-[11px] text-[#ffc72c] font-mono">
                  {selectedRank.abbreviation}
                </span>
              </label>
              <select
                value={rankId}
                onChange={(e) => setRankId(e.target.value as CadetRankId)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#06142a] border border-[#163a70] text-white text-sm focus:outline-none focus:border-[#ffc72c] focus:ring-1 focus:ring-[#ffc72c] transition cursor-pointer"
              >
                {CADET_RANKS.map((r) => (
                  <option key={r.id} value={r.id} className="bg-[#0a1e3d] text-white">
                    {r.abbreviation} — {r.name} {r.tier ? `(${r.tier})` : ''}
                  </option>
                ))}
              </select>
              <div className="mt-1.5 p-2 rounded-lg bg-[#06142a]/70 border border-[#163a70] text-[11px] text-slate-300 flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#002855] border border-[#ffc72c] text-[#ffc72c] font-black text-[10px] flex items-center justify-center flex-shrink-0">
                  {selectedRank.abbreviation.replace('C/', '')}
                </div>
                <span>{selectedRank.insigniaDescription}</span>
              </div>
            </div>

            {/* Optional Cadet Callsign */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center justify-between">
                <span>Flight Callsign (Optional)</span>
                <span className="text-[10px] text-slate-400">Used during flight line & drill</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Apex, Raptor-1, Starbird"
                value={callsign}
                onChange={(e) => setCallsign(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#06142a] border border-[#163a70] text-white text-sm focus:outline-none focus:border-[#ffc72c] transition placeholder:text-slate-500"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-[#c8102e] hover:bg-[#a80c25] text-white font-bold text-sm transition flex items-center justify-center gap-2 shadow-xl shadow-[#c8102e]/30 group cursor-pointer border border-[#e2304d]"
              >
                <span>Save Profile & Enter Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>
            </div>
          </form>

          {/* Core Values Footer */}
          <div className="pt-3 border-t border-[#163a70] text-center text-[11px] text-slate-400">
            <span className="text-[#ffc72c] font-semibold">Integrity First</span> • Volunteer Service • Excellence in All We Do • Respect
          </div>
        </div>
      </div>
    </div>
  );
};
