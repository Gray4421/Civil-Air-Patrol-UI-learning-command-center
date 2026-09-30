import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { CADET_RANKS } from '../data/cadetData';
import { RANK_LESSON_PLANS, RankLessonPlan } from '../data/lessonPlansData';
import { CadetRankId } from '../types';
import { NavTab } from './Navbar';
import { 
  GraduationCap, 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  Compass, 
  Activity, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  Award, 
  Download, 
  Printer, 
  ArrowRight, 
  Layers, 
  AlertCircle,
  HelpCircle,
  RotateCcw,
  ExternalLink
} from 'lucide-react';

interface LessonPlanViewProps {
  onNavigateTab: (tab: NavTab) => void;
  selectedRankId?: CadetRankId;
}

export const LessonPlanView: React.FC<LessonPlanViewProps> = ({ onNavigateTab, selectedRankId }) => {
  const { user } = useAuth();

  // Selected rank defaults to user's enrolled rank, or selectedRankId, or C/AB
  const [activeRankId, setActiveRankId] = useState<CadetRankId>(
    selectedRankId || user?.currentRankId || 'c_ab'
  );

  // Sync if user rank changes and no explicit override
  useEffect(() => {
    if (selectedRankId) {
      setActiveRankId(selectedRankId);
    } else if (user?.currentRankId) {
      setActiveRankId(user.currentRankId);
    }
  }, [user?.currentRankId, selectedRankId]);

  // Active Lesson Plan
  const plan: RankLessonPlan = useMemo(() => {
    return RANK_LESSON_PLANS[activeRankId] || RANK_LESSON_PLANS['c_ab'];
  }, [activeRankId]);

  const currentRank = CADET_RANKS.find((r) => r.id === activeRankId) || CADET_RANKS[0];

  // Local Storage Checkbox States for Level Up Requirements and Weekly Tasks
  const storageKey = `cap_cadet_lesson_checks_${activeRankId}`;
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setCheckedItems(JSON.parse(saved));
      } else {
        setCheckedItems({});
      }
    } catch {
      setCheckedItems({});
    }
  }, [storageKey]);

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch (err) {
        console.error(err);
      }
      return next;
    });
  };

  const resetChecks = () => {
    setCheckedItems({});
    localStorage.removeItem(storageKey);
  };

  // Revealed Board Review Questions
  const [revealedQuestions, setRevealedQuestions] = useState<Record<number, boolean>>({});
  const toggleRevealQuestion = (idx: number) => {
    setRevealedQuestions((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Readiness Calculations
  const totalRequirements = plan.levelUpRequirements.length;
  const completedRequirements = plan.levelUpRequirements.filter((r) => checkedItems[r.id]).length;
  const reqPercentage = totalRequirements > 0 ? Math.round((completedRequirements / totalRequirements) * 100) : 0;

  const totalTasks = plan.weeklySyllabus.reduce((acc, w) => acc + w.tasks.length, 0);
  const completedTasks = plan.weeklySyllabus.reduce(
    (acc, w) => acc + w.tasks.filter((t) => checkedItems[t.id]).length,
    0
  );
  const taskPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Printable syllabus export
  const handleExportPlan = () => {
    let report = `========================================================================\n`;
    report += `   CIVIL AIR PATROL CADET ACADEMY - TAILORED PROMOTION LESSON PLAN\n`;
    report += `========================================================================\n`;
    report += `Current Grade: ${currentRank.name} (${currentRank.abbreviation})\n`;
    report += `Target Promotion Grade: ${plan.targetRankName} (${plan.targetAbbreviation})\n`;
    report += `Target Award: ${plan.targetAchievementName}\n`;
    report += `Insignia: ${plan.targetInsignia}\n`;
    report += `Minimum Time-in-Grade: ${plan.minimumTimeInGradeDays} Days\n`;
    report += `Honor Points Required: ${plan.honorPointsRequired} Pts\n`;
    report += `Cadet: ${user?.fullName || user?.callsign || 'Cadet'} | Squadron: ${user?.squadron || 'CAP Squadron'}\n`;
    report += `------------------------------------------------------------------------\n\n`;

    report += `I. LEVEL-UP REQUIREMENTS CHECKLIST:\n`;
    plan.levelUpRequirements.forEach((req, idx) => {
      const isDone = !!checkedItems[req.id];
      report += ` [${isDone ? 'X' : ' '}] ${idx + 1}. [${req.category.toUpperCase()}] ${req.title}\n`;
      report += `     Standard: ${req.passingStandard}\n`;
      report += `     Reference: ${req.officialReference} | Prep: ~${req.recommendedPrepTimeWeeks} Weeks\n\n`;
    });

    report += `II. OFFICIAL RESOURCES & CITATIONS:\n`;
    plan.resources.forEach((res) => {
      report += ` - ${res.code}: ${res.title} (${res.chapterOrModule})\n`;
      report += `   Key Concepts: ${res.keyConcepts.join(', ')}\n`;
    });

    report += `\nIII. TAILORED 4-WEEK STUDY & TRAINING SYLLABUS:\n`;
    plan.weeklySyllabus.forEach((week) => {
      report += `\nWEEK ${week.weekNumber}: ${week.theme.toUpperCase()} (${week.focusArea})\n`;
      report += `Objective: ${week.objective}\n`;
      week.tasks.forEach((t) => {
        const isDone = !!checkedItems[t.id];
        report += `   [${isDone ? 'X' : ' '}] ${t.label} (~${t.estimatedMinutes} mins)\n`;
        report += `       Ref: ${t.resourceName} (${t.resourceRef})\n`;
        report += `       Action: ${t.practicalAction}\n`;
      });
    });

    report += `\nIV. PROMOTION REVIEW BOARD QUESTIONS & DOCTRINE:\n`;
    plan.boardReviewQuestions.forEach((q, idx) => {
      report += ` Q${idx + 1}: ${q.question}\n`;
      report += ` Expected Answer: ${q.expectedAnswerDoctrine}\n`;
      report += ` Ref: ${q.doctrineReference}\n\n`;
    });

    report += `========================================================================\n`;
    report += `Generated via Civil Air Patrol Cadet Academy Interactive Syllabus Portal\n`;

    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CAP_Lesson_Plan_${currentRank.abbreviation.replace('/', '_')}_to_${plan.targetAbbreviation.replace('/', '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Title Header with Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-[#0a1e3d] border border-[#163a70] shadow-2xl p-6 sm:p-8">
        <div className="cap-tricolor-stripe h-1.5 w-full absolute top-0 left-0" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c8102e]/20 border border-[#c8102e]/40 text-white text-xs font-bold shadow-sm">
              <GraduationCap className="w-3.5 h-3.5 text-[#ffc72c]" />
              <span>Tailored Advancement Curriculum</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Cadet Level-Up Lesson Plan & Syllabus
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Select or change any cadet rank to instantly customize a regulation-grounded promotion study plan. Review the exact curriculum textbooks, leadership exams, drill maneuvers, physical fitness milestones, and weekly study tasks required to level up.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-center">
            <button
              onClick={handleExportPlan}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#002855] hover:bg-[#003875] text-[#ffc72c] border border-[#163a70] hover:border-[#ffc72c]/60 text-xs font-bold transition shadow-sm cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export Printable Syllabus</span>
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#06142a] hover:bg-[#0d274e] text-slate-300 hover:text-white border border-[#163a70] text-xs font-semibold transition cursor-pointer"
              title="Print lesson plan"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Rank Selector Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#0a1e3d] border border-[#163a70] shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs font-bold text-[#ffc72c] uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            <span>Select Current Grade to Tailor Lesson Plan:</span>
          </div>

          {user && (
            <button
              onClick={() => setActiveRankId(user.currentRankId)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeRankId === user.currentRankId
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50'
                  : 'bg-[#06142a] text-slate-300 hover:text-white border border-[#163a70]'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Use My Profile Rank ({CADET_RANKS.find((r) => r.id === user.currentRankId)?.abbreviation})</span>
            </button>
          )}
        </div>

        {/* Scrollable Rank Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-thin">
          {CADET_RANKS.map((r) => {
            const isSelected = activeRankId === r.id;
            const isEnrolled = user?.currentRankId === r.id;

            return (
              <button
                key={r.id}
                onClick={() => setActiveRankId(r.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-[#c8102e] border-[#c8102e] text-white shadow-lg shadow-[#c8102e]/30 font-black'
                    : 'bg-[#06142a] border-[#163a70] text-slate-300 hover:text-white hover:bg-[#002855]'
                }`}
              >
                <span>{r.abbreviation}</span>
                <span className="hidden md:inline font-normal text-[11px] opacity-80">
                  {r.name.replace('Cadet ', '')}
                </span>
                {isEnrolled && (
                  <span className="w-2 h-2 rounded-full bg-[#ffc72c]" title="Your current profile rank" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Level-Up Showcase Hero Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0a1e3d] via-[#002855] to-[#0a1e3d] border-2 border-[#163a70] shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-2.5 py-0.5 rounded-md bg-[#06142a] border border-[#163a70] text-xs font-mono font-bold text-slate-300">
                Current: {currentRank.abbreviation}
              </span>
              <ArrowRight className="w-4 h-4 text-[#ffc72c]" />
              <span className="px-2.5 py-0.5 rounded-md bg-[#c8102e] text-white text-xs font-mono font-black shadow-sm">
                Target: {plan.targetAbbreviation} ({plan.targetRankName})
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-[#002855] border border-[#ffc72c]/40 text-[#ffc72c] text-xs font-bold">
                Phase {plan.phase}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {plan.targetAchievementName}
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              {plan.overview}
            </p>

            <div className="text-xs italic text-[#ffc72c] font-medium pt-1">
              {plan.summaryQuote}
            </div>
          </div>

          {/* Right Card: Award, Insignia, Honor Points & Time in Grade */}
          <div className="w-full lg:w-auto p-5 rounded-2xl bg-[#06142a]/95 border border-[#163a70] shadow-xl space-y-4 min-w-[280px]">
            <div className="flex items-center justify-between border-b border-[#163a70] pb-3">
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Award To Earn</div>
                <div className="text-xs font-bold text-white mt-0.5">
                  {plan.targetRibbonName || plan.targetAchievementName}
                </div>
              </div>
              {plan.targetRibbonColors && (
                <div className="w-16 h-4 rounded-[2px] shadow-sm overflow-hidden flex border border-slate-600">
                  {plan.targetRibbonColors.map((color, i) => (
                    <div key={i} className="h-full flex-1" style={{ backgroundColor: color }} />
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-[#0a1e3d] border border-[#163a70]">
                <div className="text-[10px] text-slate-400">Min. Time In Grade</div>
                <div className="text-sm font-black text-white mt-0.5 flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-[#ffc72c]" />
                  <span>{plan.minimumTimeInGradeDays} Days</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#0a1e3d] border border-[#163a70]">
                <div className="text-[10px] text-slate-400">Honor Points</div>
                <div className="text-sm font-black text-[#ffc72c] mt-0.5 font-mono">
                  {plan.honorPointsRequired} Pts
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-300">
              <span className="font-bold text-white">Insignia: </span>
              {plan.targetInsignia}
            </div>
          </div>
        </div>

        {/* Readiness Meter */}
        <div className="mt-6 pt-5 border-t border-[#163a70]/60 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#ffc72c]" />
              <span>Promotion Readiness Tracker ({completedRequirements}/{totalRequirements} Requirements Met)</span>
            </span>
            <span className="font-mono font-bold text-[#ffc72c]">{reqPercentage}% Ready</span>
          </div>

          <div className="w-full h-3 bg-[#06142a] rounded-full overflow-hidden border border-[#163a70]">
            <div
              className="h-full bg-gradient-to-r from-[#c8102e] via-[#ffc72c] to-emerald-400 transition-all duration-300"
              style={{ width: `${reqPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Grid: Level Up Requirements Checklist (Left) & Official Resources (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Requirements Checklist */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#ffc72c]" />
              <h3 className="text-lg font-bold text-white">Level-Up Requirements Checklist</h3>
            </div>
            <button
              onClick={resetChecks}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Checks</span>
            </button>
          </div>

          <div className="space-y-3">
            {plan.levelUpRequirements.map((req) => {
              const isChecked = !!checkedItems[req.id];

              return (
                <div
                  key={req.id}
                  onClick={() => toggleCheck(req.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                    isChecked
                      ? 'bg-emerald-950/40 border-emerald-500/70 shadow-md ring-1 ring-emerald-500/30'
                      : 'bg-[#0a1e3d] border-[#163a70] hover:border-[#ffc72c]/60 hover:bg-[#0d274e]'
                  }`}
                >
                  <button
                    type="button"
                    className="mt-0.5 flex-shrink-0 text-slate-400 transition"
                  >
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-950" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-500 hover:text-slate-300" />
                    )}
                  </button>

                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-black uppercase tracking-wider text-[#ffc72c]">
                        {req.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        ~{req.recommendedPrepTimeWeeks} Weeks Prep
                      </span>
                    </div>

                    <h4 className={`text-sm font-bold ${isChecked ? 'text-emerald-200 line-through' : 'text-white'}`}>
                      {req.title}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {req.description}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] border-t border-[#163a70]/40 mt-2">
                      <span className="text-slate-300">
                        <strong className="text-white">Passing Standard: </strong>
                        {req.passingStandard}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#06142a] border border-[#163a70] text-[#ffc72c] font-mono text-[10px]">
                        {req.officialReference}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Shortcuts to In-App Training */}
          <div className="p-4 rounded-2xl bg-[#002855]/60 border border-[#163a70] space-y-3">
            <div className="text-xs font-bold text-[#ffc72c] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#ffc72c]" />
              <span>Interactive Academy Shortcuts for this Rank:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <button
                onClick={() => onNavigateTab('drill')}
                className="p-3 rounded-xl bg-[#06142a] hover:bg-[#0d274e] border border-[#163a70] text-slate-200 hover:text-white font-bold transition flex items-center justify-between text-left cursor-pointer group"
              >
                <span>Practice Drill Simulator</span>
                <ChevronRight className="w-4 h-4 text-[#ffc72c] group-hover:translate-x-0.5 transition" />
              </button>
              <button
                onClick={() => onNavigateTab('scenarios')}
                className="p-3 rounded-xl bg-[#06142a] hover:bg-[#0d274e] border border-[#163a70] text-slate-200 hover:text-white font-bold transition flex items-center justify-between text-left cursor-pointer group"
              >
                <span>Solve Leadership Scenarios</span>
                <ChevronRight className="w-4 h-4 text-[#ffc72c] group-hover:translate-x-0.5 transition" />
              </button>
              <button
                onClick={() => onNavigateTab('uniform')}
                className="p-3 rounded-xl bg-[#06142a] hover:bg-[#0d274e] border border-[#163a70] text-slate-200 hover:text-white font-bold transition flex items-center justify-between text-left cursor-pointer group"
              >
                <span>Inspect Regulation Uniform</span>
                <ChevronRight className="w-4 h-4 text-[#ffc72c] group-hover:translate-x-0.5 transition" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Official Resources & References */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#ffc72c]" />
            <h3 className="text-lg font-bold text-white">Curated Official Resources</h3>
          </div>

          <div className="space-y-3.5">
            {plan.resources.map((res) => (
              <div
                key={res.id}
                className="p-4 rounded-2xl bg-[#0a1e3d] border border-[#163a70] shadow-md space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#002855] border border-[#ffc72c]/40 text-[#ffc72c] text-xs font-mono font-bold">
                    {res.code}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    {res.type}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white">{res.title}</h4>
                  <div className="text-xs text-[#ffc72c] font-medium mt-0.5">{res.chapterOrModule}</div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {res.description}
                </p>

                <div className="pt-2 border-t border-[#163a70]/50 space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-400">Key Concepts to Master:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {res.keyConcepts.map((concept, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-[#06142a] border border-[#163a70] text-[10px] text-slate-300 font-medium"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Drill Exam Tactical Tips */}
          {plan.drillExamTips.length > 0 && (
            <div className="p-4 rounded-2xl bg-[#06142a] border border-[#163a70] space-y-2.5 shadow-md">
              <div className="text-xs font-bold text-[#ffc72c] uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#ffc72c]" />
                <span>Drill & Practical Test Tactical Tips:</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 pl-5 list-disc leading-relaxed">
                {plan.drillExamTips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Tailored 4-Week Study & Training Syllabus */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#ffc72c]" />
              <span>Step-by-Step Training Syllabus (4-Week Level-Up Track)</span>
            </h3>
            <p className="text-xs text-slate-300">
              Structured study plan distributing reading, practical drill, fitness preparation, and testing across 4 weeks.
            </p>
          </div>

          <div className="text-xs font-bold text-[#ffc72c] font-mono px-3 py-1 rounded-xl bg-[#0a1e3d] border border-[#163a70]">
            Syllabus Tasks Done: {completedTasks} / {totalTasks} ({taskPercentage}%)
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plan.weeklySyllabus.map((week) => (
            <div
              key={week.weekNumber}
              className="p-5 rounded-2xl bg-[#0a1e3d] border border-[#163a70] shadow-xl space-y-3.5 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-[#163a70] pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#c8102e] text-white text-xs font-black flex items-center justify-center shadow-sm">
                      {week.weekNumber}
                    </span>
                    <h4 className="text-sm font-bold text-white">Week {week.weekNumber}: {week.theme}</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#002855] text-[#ffc72c] text-[10px] font-black uppercase">
                    {week.focusArea}
                  </span>
                </div>

                <p className="text-xs text-slate-300 italic">
                  <strong>Objective: </strong>{week.objective}
                </p>

                <div className="space-y-2.5 pt-1">
                  {week.tasks.map((task) => {
                    const isTaskDone = !!checkedItems[task.id];

                    return (
                      <div
                        key={task.id}
                        onClick={() => toggleCheck(task.id)}
                        className={`p-3 rounded-xl border transition cursor-pointer flex items-start gap-2.5 ${
                          isTaskDone
                            ? 'bg-emerald-950/30 border-emerald-600/50 text-slate-400'
                            : 'bg-[#06142a] border-[#163a70] hover:border-[#ffc72c]/50 text-slate-200'
                        }`}
                      >
                        <button type="button" className="mt-0.5 flex-shrink-0">
                          {isTaskDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-500" />
                          )}
                        </button>
                        <div className="flex-1 space-y-1 text-xs">
                          <div className={`font-semibold ${isTaskDone ? 'line-through text-slate-400' : 'text-white'}`}>
                            {task.label}
                          </div>
                          <div className="text-[11px] text-[#ffc72c]">
                            {task.resourceName} • {task.resourceRef} ({task.estimatedMinutes} mins)
                          </div>
                          <div className="text-[11px] text-slate-300 leading-snug">
                            <strong className="text-slate-200">Action: </strong>{task.practicalAction}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promotion Board Review Questions & Flashcards */}
      {plan.boardReviewQuestions.length > 0 && (
        <div className="p-6 rounded-3xl bg-[#0a1e3d] border border-[#163a70] shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#ffc72c]" />
                <span>Promotion Review Board Flashcards & Expected Answers</span>
              </h3>
              <p className="text-xs text-slate-300">
                Official questions frequently asked by Cadet Flight Staff and Squadron Review Boards for this rank.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {plan.boardReviewQuestions.map((item, idx) => {
              const isRevealed = !!revealedQuestions[idx];

              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#06142a] border border-[#163a70] space-y-3"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#002855] border border-[#ffc72c] text-[#ffc72c] font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
                      {item.question}
                    </h4>
                  </div>

                  {isRevealed ? (
                    <div className="p-3 rounded-xl bg-[#002855]/70 border border-[#163a70] space-y-1.5 text-xs animate-fade-in">
                      <div className="text-[10px] text-[#ffc72c] font-bold uppercase tracking-wider">
                        Official CAP Doctrine Answer:
                      </div>
                      <p className="text-slate-100 leading-relaxed font-medium">
                        {item.expectedAnswerDoctrine}
                      </p>
                      <div className="text-[10px] text-slate-400 font-mono pt-1">
                        Ref: {item.doctrineReference}
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => toggleRevealQuestion(idx)}
                      className="w-full py-2 px-3 rounded-xl bg-[#002855] hover:bg-[#003875] text-[#ffc72c] text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Reveal Expected Doctrine Answer</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {isRevealed && (
                    <button
                      onClick={() => toggleRevealQuestion(idx)}
                      className="text-[11px] text-slate-400 hover:text-white transition"
                    >
                      Hide Answer
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
