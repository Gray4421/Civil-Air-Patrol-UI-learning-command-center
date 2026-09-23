import React, { useState } from 'react';
import { CADET_RANKS } from '../data/cadetData';
import { CadetRank } from '../types';
import { 
  Layers, 
  Award, 
  Clock, 
  CheckCircle2, 
  Compass, 
  BookOpen, 
  Activity, 
  ShieldCheck, 
  ChevronRight,
  ExternalLink 
} from 'lucide-react';

export const SuperChartRanksView: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<number>(1);
  const [activeRank, setActiveRank] = useState<CadetRank>(CADET_RANKS[1]); // C/Amn default

  const phases = [
    { number: 1, title: 'Phase I: The Learning Phase', subtitle: 'Cadet Airman Basic to Senior Airman' },
    { number: 2, title: 'Phase II: The Leadership Phase', subtitle: 'Cadet Staff Sergeant to 2d Lieutenant' },
    { number: 3, title: 'Phase III: The Command Phase', subtitle: 'Cadet 1st Lieutenant to Captain' },
    { number: 4, title: 'Phase IV: The Executive Phase', subtitle: 'Cadet Major to Colonel (Spaatz Award)' },
  ];

  const filteredRanks = CADET_RANKS.filter((r) => r.phase === selectedPhase);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Title Header */}
      <div className="relative rounded-3xl overflow-hidden bg-[#0a1e3d] border border-[#163a70] shadow-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c8102e]/20 border border-[#c8102e]/40 text-white text-xs font-bold shadow-sm">
              <Layers className="w-3.5 h-3.5 text-[#ffc72c]" />
              <span>CAP Visual Aid 60-100 (Cadet Super Chart)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Cadet Super Chart & Promotion Pathway
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
              Explore the four phases of cadet advancement from Cadet Airman Basic to Cadet Colonel (Gen Carl A. Spaatz Award). Review leadership, aerospace, fitness, and character requirements for every achievement.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#06142a] border border-[#163a70] text-xs text-slate-300 text-right shadow">
            <div className="text-[#ffc72c] font-bold">Minimum Time in Grade:</div>
            <div className="font-semibold text-white mt-0.5">56 Days (8 Weeks) per Achievement</div>
            <div className="text-[10px] text-slate-400">Pledge to promote 3+ times per year</div>
          </div>
        </div>
      </div>

      {/* Phase Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {phases.map((p) => (
          <button
            key={p.number}
            onClick={() => {
              setSelectedPhase(p.number);
              const firstInPhase = CADET_RANKS.find((r) => r.phase === p.number);
              if (firstInPhase) setActiveRank(firstInPhase);
            }}
            className={`p-4 rounded-2xl border text-left transition ${
              selectedPhase === p.number
                ? 'bg-[#c8102e] border-[#c8102e] text-white shadow-lg shadow-[#c8102e]/30'
                : 'bg-[#0a1e3d] border-[#163a70] text-slate-300 hover:text-white hover:bg-[#11315f]'
            }`}
          >
            <div className="text-xs font-black uppercase tracking-wider text-[#ffc72c]">Phase {p.number}</div>
            <div className="text-sm font-bold mt-1 text-white">{p.title.split(':')[1]}</div>
            <div className="text-[11px] text-slate-200 mt-1">{p.subtitle}</div>
          </button>
        ))}
      </div>

      {/* Ranks in Selected Phase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRanks.map((r) => {
          const isSelected = activeRank.id === r.id;

          return (
            <div
              key={r.id}
              onClick={() => setActiveRank(r)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#002855] border-[#ffc72c] shadow-xl ring-2 ring-[#ffc72c]/50'
                  : 'bg-[#0a1e3d] border-[#163a70] hover:border-[#1e4c91] hover:bg-[#0c2447]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-[#06142a] border border-[#163a70] text-[#ffc72c] text-xs font-mono font-black">
                    {r.abbreviation}
                  </span>
                  <span className="text-[11px] text-slate-300 font-semibold">{r.tier}</span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">{r.name}</h3>
                  {r.achievementName && (
                    <p className="text-xs text-[#ffc72c] font-medium mt-0.5">
                      {r.achievementName}
                    </p>
                  )}
                </div>

                {/* Ribbon Bar Visualizer */}
                {r.ribbonColors && (
                  <div className="pt-1">
                    <div className="w-20 h-5 rounded-[2px] shadow-inner overflow-hidden flex border border-[#163a70]">
                      {r.ribbonColors.map((color, i) => (
                        <div key={i} className="h-full flex-1" style={{ backgroundColor: color }} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-[#163a70] flex items-center justify-between text-xs text-slate-400">
                <span>Address: <strong className="text-slate-200 font-normal">{r.addressTerm}</strong></span>
                <ChevronRight className={`w-4 h-4 transition ${isSelected ? 'text-[#ffc72c] translate-x-1' : 'text-slate-500'}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Rank Deep Dive Dossier */}
      {activeRank && (
        <div className="p-6 rounded-3xl bg-[#0a1e3d] border border-[#163a70] shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#163a70] pb-4">
            <div>
              <span className="text-xs font-bold text-[#ffc72c] uppercase tracking-wider">
                {activeRank.tier} • Phase {activeRank.phase}
              </span>
              <h2 className="text-2xl font-black text-white mt-0.5">
                {activeRank.name} ({activeRank.abbreviation})
              </h2>
              {activeRank.achievementName && (
                <div className="text-xs text-[#ffc72c] font-semibold mt-1">
                  {activeRank.achievementName}
                </div>
              )}
            </div>

            <div className="text-right">
              <div className="text-xs text-slate-300 font-medium">Honor Points Benchmark:</div>
              <div className="text-lg font-black text-[#ffc72c] font-mono">
                {activeRank.requiredHonorPoints} Points
              </div>
            </div>
          </div>

          {/* Requirements Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#06142a] border border-[#163a70] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#ffc72c] uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-[#ffc72c]" />
                <span>Leadership</span>
              </div>
              <p className="text-xs text-slate-300">
                {activeRank.phase === 1
                  ? 'Learn to Lead Chapters 1–3, Cadet Interactive or Open-Book Test, and Drill & Ceremonies Practical Test.'
                  : activeRank.phase === 2
                  ? 'Learn to Lead Chapters 4–8, Drill Tests, and Wright Brothers / Mitchell Comprehensive Exams.'
                  : 'Learn to Lead Chapters 9–16, Staff Duty Analysis (SDA), and Leadership Presentations.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#06142a] border border-[#163a70] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#ffc72c] uppercase tracking-wider">
                <Compass className="w-4 h-4 text-[#ffc72c]" />
                <span>Aerospace</span>
              </div>
              <p className="text-xs text-slate-300">
                {activeRank.id === 'c_ab'
                  ? 'No requirement for Achievement 1.'
                  : activeRank.phase <= 2
                  ? 'Aerospace Dimensions Modules 1–7 (interactive or open-book written test).'
                  : 'Journey of Flight comprehensive aerospace chapters.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#06142a] border border-[#163a70] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#ffc72c] uppercase tracking-wider">
                <Activity className="w-4 h-4 text-[#ffc72c]" />
                <span>Fitness (CPFT)</span>
              </div>
              <p className="text-xs text-slate-300">
                Participate in 1 squadron fitness activity. For Wright Brothers & Mitchell, meet the Healthy Fitness Zone (HFZ) standards in run/pacer, push-ups, and sit-and-reach.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#06142a] border border-[#163a70] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#ffc72c] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#ffc72c]" />
                <span>Character</span>
              </div>
              <p className="text-xs text-slate-300">
                Participate in 1 Character Development Forum led by the squadron chaplain or moral leadership officer. Cadet Wingman Course.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#06142a] border border-[#163a70] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-300">
            <div>
              <strong className="text-white">Insignia Description: </strong>
              {activeRank.insigniaDescription}
            </div>
            <div>
              <strong className="text-white">Manners of Address: </strong>
              "{activeRank.addressTerm}"
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
