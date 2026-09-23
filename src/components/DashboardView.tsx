import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CADET_RANKS, ALL_RIBBONS } from '../data/cadetData';
import { SCENARIOS } from '../data/scenariosData';
import { 
  Award, 
  CheckCircle2, 
  Calendar, 
  Plus, 
  Shield, 
  Sparkles, 
  CheckSquare, 
  TrendingUp,
  User,
  Hash,
  Compass,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { CapEmblem } from './CapEmblem';

export const DashboardView: React.FC = () => {
  const { 
    user, 
    isAuthenticated,
    setIsGoogleModalOpen,
    toggleGoal, 
    addGoal, 
    toggleFirstYearTask 
  } = useAuth();

  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalPriority, setNewGoalPriority] = useState<'High' | 'Medium' | 'Low'>('High');
  const [newGoalCategory, setNewGoalCategory] = useState<'Promotion' | 'Activity' | 'Study' | 'Fitness'>('Promotion');

  // If not authenticated via Google or onboarding not completed, display Google Sign-in gate
  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 animate-fade-in">
        <div className="relative rounded-3xl overflow-hidden bg-[#0a1e3d] border border-[#163a70] shadow-2xl p-8 sm:p-12 text-center space-y-6">
          <div className="cap-tricolor-stripe h-1.5 w-full absolute top-0 left-0" />
          
          <div className="w-20 h-20 rounded-2xl bg-[#002855] border-2 border-[#ffc72c] flex items-center justify-center mx-auto shadow-xl">
            <CapEmblem size={52} />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffc72c]/20 border border-[#ffc72c]/40 text-[#ffc72c] text-xs font-bold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5" /> Official Cadet Personnel Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Sign In to View Your Cadet Dashboard
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Use your Google account to access your Civil Air Patrol personnel dossier, track your promotions, mount your personal ribbon rack, and manage leadership goals.
            </p>
          </div>

          <div className="pt-2 max-w-sm mx-auto">
            <button
              id="google-signin-dashboard-btn"
              onClick={() => setIsGoogleModalOpen(true)}
              className="w-full py-3.5 px-6 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm shadow-xl flex items-center justify-center gap-3 transition group cursor-pointer border border-slate-200 active:scale-[0.99]"
            >
              {/* Google SVG G logo */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>Continue with Google Account</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition" />
            </button>
          </div>

          <div className="pt-6 border-t border-[#163a70] grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto">
            <div className="p-3.5 rounded-xl bg-[#06142a] border border-[#163a70]/70">
              <div className="text-xs font-bold text-[#ffc72c] flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" /> Personal Ribbon Rack
              </div>
              <div className="text-[11px] text-slate-300 mt-1">Accredited ribbons mounted on regulation uniform bar.</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#06142a] border border-[#163a70]/70">
              <div className="text-xs font-bold text-[#ffc72c] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Personnel Record
              </div>
              <div className="text-[11px] text-slate-300 mt-1">Your verified CAP ID, squadron, grade, and honor credits.</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#06142a] border border-[#163a70]/70">
              <div className="text-xs font-bold text-[#ffc72c] flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5" /> Goals & Benchmarks
              </div>
              <div className="text-[11px] text-slate-300 mt-1">First-year CAPP 60-20 checklist and GTD task tracker.</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentRankIndex = CADET_RANKS.findIndex((r) => r.id === user.currentRankId);
  const currentRank = CADET_RANKS[currentRankIndex] || CADET_RANKS[0];
  const nextRank = currentRankIndex + 1 < CADET_RANKS.length ? CADET_RANKS[currentRankIndex + 1] : null;

  // Calculate percentage to next rank
  const prevRankPoints = currentRank.requiredHonorPoints;
  const targetPoints = nextRank ? nextRank.requiredHonorPoints : currentRank.requiredHonorPoints;
  const progressPercent = nextRank
    ? Math.min(100, Math.max(0, Math.round(((user.honorPoints - prevRankPoints) / (targetPoints - prevRankPoints)) * 100)))
    : 100;

  const completedScenariosCount = Object.values(user.scenarioResults).filter((s) => s.passed).length;
  const totalScenariosCount = SCENARIOS.length;

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;
    addGoal(newGoalTitle, newGoalPriority, newGoalCategory);
    setNewGoalTitle('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Cadet Dossier Header */}
      <div className="relative rounded-3xl overflow-hidden bg-[#0a1e3d] border border-[#163a70] shadow-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#002855] to-[#06142a] p-1 shadow-xl border-2 border-[#ffc72c] flex items-center justify-center text-white">
              <div className="w-full h-full rounded-xl bg-[#030914] flex flex-col items-center justify-center">
                <span className="font-mono text-xl sm:text-2xl font-black text-[#ffc72c]">
                  {currentRank.abbreviation.replace('C/', '')}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-slate-300 font-bold">
                  Phase {currentRank.phase}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {user.fullName || 'Cadet'}
                </h1>
                {user.callsign && (
                  <span className="px-2 py-0.5 rounded bg-[#c8102e] text-white text-xs font-bold shadow-sm">
                    "{user.callsign}"
                  </span>
                )}
                {user.isGoogleAuth && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-200 text-[10px] font-semibold">
                    <svg className="w-2.5 h-2.5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"/>
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                    </svg>
                    <span>Google Account</span>
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-medium">
                {currentRank.name} • {user.squadron}
              </p>
              <div className="text-xs text-slate-300 flex flex-wrap items-center gap-3 pt-0.5">
                <span>CAP ID: <strong className="text-white font-mono">{user.capId}</strong></span>
                <span>•</span>
                <span>Tier: <strong className="text-[#ffc72c]">{currentRank.tier}</strong></span>
                <span>•</span>
                <span className="text-slate-400">{user.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex-1 md:flex-initial p-3.5 rounded-2xl bg-[#06142a] border border-[#163a70] text-center min-w-[110px] shadow-sm">
              <div className="text-[11px] text-slate-300 font-medium">Honor Points</div>
              <div className="text-xl font-black text-[#ffc72c] mt-0.5 flex items-center justify-center gap-1 font-tech">
                <Sparkles className="w-4 h-4 text-[#ffc72c]" />
                <span>{user.honorPoints}</span>
              </div>
            </div>

            <div className="flex-1 md:flex-initial p-3.5 rounded-2xl bg-[#06142a] border border-[#163a70] text-center min-w-[110px] shadow-sm">
              <div className="text-[11px] text-slate-300 font-medium">Scenarios Done</div>
              <div className="text-xl font-black text-emerald-400 mt-0.5 font-tech">
                {completedScenariosCount} / {totalScenariosCount}
              </div>
            </div>
          </div>
        </div>

        {/* Promotion Progression Bar */}
        <div className="mt-6 pt-6 border-t border-[#163a70] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="text-slate-200 font-semibold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#ffc72c]" />
              <span>Next Grade Target: {nextRank ? nextRank.name : 'Highest Cadet Rank Achieved!'}</span>
            </div>
            {nextRank && (
              <span className="text-slate-300 font-mono">
                {user.honorPoints} / {nextRank.requiredHonorPoints} pts ({progressPercent}%)
              </span>
            )}
          </div>

          <div className="w-full h-3.5 bg-[#030914] rounded-full overflow-hidden p-0.5 border border-[#163a70]">
            <div
              className="h-full bg-gradient-to-r from-[#c8102e] via-[#ffc72c] to-[#0047ab] rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {nextRank && (
            <p className="text-[11px] text-slate-300">
              Complete decision scenarios, master drill movements, and uphold Civil Air Patrol Core Values to earn promotion endorsement.
            </p>
          )}
        </div>
      </div>

      {/* Ribbon Rack & Official Service Record Display (Badges & Qualifications removed per user directive) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Ribbon Rack (Official Cadet Rack Visualizer) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#0a1e3d] border border-[#163a70] shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#ffc72c]" />
              <h2 className="text-base font-bold text-white tracking-tight">Personal Ribbon Rack</h2>
            </div>
            <span className="text-xs text-[#ffc72c] font-mono font-bold">
              {user.earnedRibbonIds.length} Ribbon{user.earnedRibbonIds.length !== 1 ? 's' : ''} Mounted
            </span>
          </div>

          <p className="text-xs text-slate-300">
            Official Civil Air Patrol cadet ribbons set atop regulation uniform ribbon mounting bar. Ribbons are awarded when completing achievements and milestone awards.
          </p>

          {/* Realistic Ribbon Rack Frame with Felt Backing */}
          <div className="p-6 rounded-2xl bg-[#001736] border-2 border-[#163a70] flex flex-col items-center justify-center min-h-[160px] shadow-inner">
            {user.earnedRibbonIds.length > 0 ? (
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-sm">
                {user.earnedRibbonIds.map((ribbonId) => {
                  const ribbon = ALL_RIBBONS.find((r) => r.id === ribbonId);
                  if (!ribbon) return null;

                  return (
                    <div
                      key={ribbon.id}
                      className="group relative cursor-pointer"
                      title={ribbon.name}
                    >
                      {/* Ribbon Bar */}
                      <div className="w-24 h-7 rounded-[2px] shadow-md overflow-hidden flex border border-[#ffc72c]/60 relative">
                        {ribbon.colors.map((c, i) => (
                          <div key={i} className="h-full flex-1" style={{ backgroundColor: c }} />
                        ))}
                        {/* Brass reflection shine */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-black/35 pointer-events-none" />
                      </div>

                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 rounded-lg bg-[#06142a] border border-[#163a70] text-[11px] text-white shadow-2xl z-20 text-center pointer-events-none">
                        <div className="font-bold text-[#ffc72c]">{ribbon.name}</div>
                        <div className="text-[10px] text-slate-300 mt-0.5">{ribbon.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center space-y-2 py-4">
                <div className="w-10 h-10 rounded-full bg-[#06142a] border border-[#163a70] flex items-center justify-center mx-auto text-[#ffc72c]">
                  <Award className="w-5 h-5" />
                </div>
                <div className="text-xs text-slate-300 font-medium">No ribbons mounted yet.</div>
                <div className="text-[11px] text-slate-400 max-w-xs">
                  Complete scenarios and milestone awards to earn your official cadet ribbons!
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Official CAP Service Record & Duty Assignment Card (Replaces Badges & Qualifications) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#0a1e3d] border border-[#163a70] shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#ffc72c]" />
              <h2 className="text-base font-bold text-white tracking-tight">Personnel & Duty Record</h2>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/80">
              eServices Active
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-[#06142a] border border-[#163a70] flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-300">
                <User className="w-4 h-4 text-[#ffc72c]" />
                <span>Enrolled Cadet</span>
              </div>
              <span className="font-bold text-white">{user.fullName || 'Unassigned (Enter in Profile)'}</span>
            </div>

            <div className="p-3 rounded-xl bg-[#06142a] border border-[#163a70] flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-300">
                <Hash className="w-4 h-4 text-[#ffc72c]" />
                <span>CAP ID Number</span>
              </div>
              <span className="font-mono font-bold text-[#ffc72c]">{user.capId}</span>
            </div>

            <div className="p-3 rounded-xl bg-[#06142a] border border-[#163a70] flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-300">
                <Compass className="w-4 h-4 text-[#ffc72c]" />
                <span>Assigned Squadron</span>
              </div>
              <span className="font-semibold text-slate-200">{user.squadron}</span>
            </div>

            <div className="p-3 rounded-xl bg-[#06142a] border border-[#163a70] flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-300">
                <Award className="w-4 h-4 text-[#ffc72c]" />
                <span>Cadet Grade</span>
              </div>
              <span className="font-bold text-white">{currentRank.abbreviation} — {currentRank.name}</span>
            </div>

            <div className="p-3 rounded-xl bg-[#002855]/50 border border-[#163a70] flex items-center justify-between text-[11px] text-slate-300">
              <span>Account Authentication:</span>
              <span className="text-white font-medium flex items-center gap-1">
                Google ({user.email})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Goals for First-Year Cadets (CAPP 60-20 Page 4) */}
      <div className="p-6 rounded-3xl bg-[#0a1e3d] border border-[#163a70] shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-[#ffc72c]" />
            <h2 className="text-base font-bold text-white tracking-tight">Goals for First-Year Cadets</h2>
          </div>
          <span className="text-xs text-[#ffc72c] font-semibold">CAPP 60-20 Official Benchmarks</span>
        </div>

        <p className="text-xs text-slate-300">
          Essential milestones set by Civil Air Patrol to ensure your first year has maximum impact on your leadership journey. Click to track your accomplishments.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          <button
            onClick={() => toggleFirstYearTask('stayedOneYear')}
            className={`p-3.5 rounded-xl border text-left transition flex items-start gap-3 cursor-pointer ${
              user.firstYearChecklist.stayedOneYear
                ? 'bg-[#002855]/70 border-[#ffc72c] text-white shadow-md'
                : 'bg-[#06142a] border-[#11315f] hover:border-[#1e4c91] text-slate-300'
            }`}
          >
            <CheckCircle2
              className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                user.firstYearChecklist.stayedOneYear ? 'text-[#ffc72c]' : 'text-slate-600'
              }`}
            />
            <div>
              <div className="text-xs font-bold">Stay with CAP for at least 1 year</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Give the cadet experience a chance to impact your life.</div>
            </div>
          </button>

          <button
            onClick={() => toggleFirstYearTask('regularMeetings')}
            className={`p-3.5 rounded-xl border text-left transition flex items-start gap-3 cursor-pointer ${
              user.firstYearChecklist.regularMeetings
                ? 'bg-[#002855]/70 border-[#ffc72c] text-white shadow-md'
                : 'bg-[#06142a] border-[#11315f] hover:border-[#1e4c91] text-slate-300'
            }`}
          >
            <CheckCircle2
              className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                user.firstYearChecklist.regularMeetings ? 'text-[#ffc72c]' : 'text-slate-600'
              }`}
            />
            <div>
              <div className="text-xs font-bold">Attend squadron meetings regularly</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Notify your squadron in advance if you must be absent.</div>
            </div>
          </button>

          <button
            onClick={() => toggleFirstYearTask('saturdayEventsCount')}
            className={`p-3.5 rounded-xl border text-left transition flex items-start gap-3 cursor-pointer ${
              user.firstYearChecklist.saturdayEventsCount >= 3
                ? 'bg-[#002855]/70 border-[#ffc72c] text-white shadow-md'
                : 'bg-[#06142a] border-[#11315f] hover:border-[#1e4c91] text-slate-300'
            }`}
          >
            <CheckCircle2
              className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                user.firstYearChecklist.saturdayEventsCount >= 3 ? 'text-[#ffc72c]' : 'text-slate-600'
              }`}
            />
            <div>
              <div className="text-xs font-bold">
                Attend 1 Saturday event/month ({user.firstYearChecklist.saturdayEventsCount} logged)
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Click to log completed Saturday field exercises.</div>
            </div>
          </button>

          <button
            onClick={() => toggleFirstYearTask('completedOFlight')}
            className={`p-3.5 rounded-xl border text-left transition flex items-start gap-3 cursor-pointer ${
              user.firstYearChecklist.completedOFlight
                ? 'bg-[#002855]/70 border-[#ffc72c] text-white shadow-md'
                : 'bg-[#06142a] border-[#11315f] hover:border-[#1e4c91] text-slate-300'
            }`}
          >
            <CheckCircle2
              className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                user.firstYearChecklist.completedOFlight ? 'text-[#ffc72c]' : 'text-slate-600'
              }`}
            />
            <div>
              <div className="text-xs font-bold">Participate in an Orientation Flight</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Experience hands-on flight in CAP single-engine or glider aircraft.</div>
            </div>
          </button>

          <button
            onClick={() => toggleFirstYearTask('attendedEncampment')}
            className={`p-3.5 rounded-xl border text-left transition flex items-start gap-3 cursor-pointer ${
              user.firstYearChecklist.attendedEncampment
                ? 'bg-[#002855]/70 border-[#ffc72c] text-white shadow-md'
                : 'bg-[#06142a] border-[#11315f] hover:border-[#1e4c91] text-slate-300'
            }`}
          >
            <CheckCircle2
              className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                user.firstYearChecklist.attendedEncampment ? 'text-[#ffc72c]' : 'text-slate-600'
              }`}
            />
            <div>
              <div className="text-xs font-bold">Attend Encampment</div>
              <div className="text-[11px] text-slate-400 mt-0.5">1-week full military immersion; CEAP financial aid available.</div>
            </div>
          </button>

          <button
            onClick={() => toggleFirstYearTask('earnedWrightBrothers')}
            className={`p-3.5 rounded-xl border text-left transition flex items-start gap-3 cursor-pointer ${
              user.firstYearChecklist.earnedWrightBrothers
                ? 'bg-[#002855]/70 border-[#ffc72c] text-white shadow-md'
                : 'bg-[#06142a] border-[#11315f] hover:border-[#1e4c91] text-slate-300'
            }`}
          >
            <CheckCircle2
              className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                user.firstYearChecklist.earnedWrightBrothers ? 'text-[#ffc72c]' : 'text-slate-600'
              }`}
            />
            <div>
              <div className="text-xs font-bold">Earn Wright Brothers' Award</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Promote to Cadet Staff Sergeant (C/SSgt) Non-Commissioned Officer.</div>
            </div>
          </button>
        </div>
      </div>

      {/* GTD Time Management & Prioritized "Do List" (Learn to Lead Vol 1 Chapter 2) */}
      <div className="p-6 rounded-3xl bg-[#0a1e3d] border border-[#163a70] shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#ffc72c]" />
              <h2 className="text-base font-bold text-white tracking-tight">Personal Productivity: GTD "Do List"</h2>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Getting Things Done system (Learn to Lead Chapter 2, p. 41-44). Prioritize: High, Medium, Low & apply the 2-Minute Rule.
            </p>
          </div>
        </div>

        {/* Add Goal Form */}
        <form onSubmit={handleAddGoal} className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Add new task (e.g. Iron Blues shirt gig line, study drill commands)..."
            value={newGoalTitle}
            onChange={(e) => setNewGoalTitle(e.target.value)}
            className="flex-1 min-w-[200px] px-3.5 py-2 rounded-xl bg-[#06142a] border border-[#163a70] text-white text-xs focus:outline-none focus:border-[#ffc72c]"
          />

          <select
            value={newGoalPriority}
            onChange={(e) => setNewGoalPriority(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-[#06142a] border border-[#163a70] text-slate-200 text-xs focus:outline-none"
          >
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>

          <select
            value={newGoalCategory}
            onChange={(e) => setNewGoalCategory(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-[#06142a] border border-[#163a70] text-slate-200 text-xs focus:outline-none"
          >
            <option value="Promotion">Promotion</option>
            <option value="Activity">Activity</option>
            <option value="Study">Study</option>
            <option value="Fitness">Fitness</option>
          </select>

          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-[#c8102e] hover:bg-[#a80c25] text-white font-bold text-xs transition flex items-center gap-1.5 shadow-md shadow-[#c8102e]/30 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Task
          </button>
        </form>

        {/* Goals List */}
        <div className="space-y-2">
          {user.goals.map((goal) => (
            <div
              key={goal.id}
              onClick={() => toggleGoal(goal.id)}
              className={`p-3 rounded-xl border transition flex items-center justify-between gap-3 cursor-pointer ${
                goal.completed
                  ? 'bg-[#06142a]/50 border-[#11315f] opacity-60 line-through text-slate-400'
                  : 'bg-[#06142a] border-[#163a70] hover:border-[#ffc72c]/50 text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <CheckCircle2
                  className={`w-4 h-4 flex-shrink-0 ${
                    goal.completed ? 'text-emerald-400' : 'text-slate-500'
                  }`}
                />
                <span className="text-xs font-medium">{goal.title}</span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    goal.priority === 'High'
                      ? 'bg-[#c8102e] text-white shadow-sm'
                      : goal.priority === 'Medium'
                      ? 'bg-[#ffc72c]/20 text-[#ffc72c] border border-[#ffc72c]/40'
                      : 'bg-[#002855] text-blue-200 border border-blue-400/30'
                  }`}
                >
                  {goal.priority}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#0a1e3d] text-slate-300 font-medium hidden sm:inline border border-[#163a70]">
                  {goal.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
