import React, { useState, useMemo } from 'react';
import { ScenarioHistoryEntry } from '../types';
import { exportScenarioHistoryText } from '../utils/scenarioHistory';
import { 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Star, 
  Clock, 
  BookOpen, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  Trash2, 
  Download, 
  Search, 
  Filter, 
  Award, 
  Compass, 
  ShieldCheck, 
  ArrowLeft,
  Sparkles,
  Layers
} from 'lucide-react';

interface ScenarioHistoryLogProps {
  entries: ScenarioHistoryEntry[];
  onSelectScenario: (scenarioId: string) => void;
  onDeleteEntry: (id: string) => void;
  onClearAll: () => void;
  onBackToMissions: () => void;
}

export const ScenarioHistoryLog: React.FC<ScenarioHistoryLogProps> = ({
  entries,
  onSelectScenario,
  onDeleteEntry,
  onClearAll,
  onBackToMissions,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Passed' | 'Honor' | 'Review'>('All');
  const [expandedEntries, setExpandedEntries] = useState<Record<string, boolean>>({});
  const [isConfirmingClear, setIsConfirmingClear] = useState(false);

  // Toggle expand/collapse for an entry
  const toggleExpand = (id: string) => {
    setExpandedEntries((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Expand all / collapse all
  const toggleAll = (expand: boolean) => {
    const updated: Record<string, boolean> = {};
    entries.forEach((e) => {
      updated[e.id] = expand;
    });
    setExpandedEntries(updated);
  };

  // Categories list derived from entries
  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    entries.forEach((e) => set.add(e.scenarioCategory));
    return ['All', ...Array.from(set)];
  }, [entries]);

  // Filtered entries
  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      // Category filter
      if (selectedCategory !== 'All' && entry.scenarioCategory !== selectedCategory) {
        return false;
      }
      // Status filter
      if (selectedStatus === 'Passed' && !entry.passed) return false;
      if (selectedStatus === 'Honor' && !entry.earnedHonorCredit) return false;
      if (selectedStatus === 'Review' && entry.passed && !entry.decisions.some((d) => !d.isBestCourse)) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = entry.scenarioTitle.toLowerCase().includes(q);
        const matchesCategory = entry.scenarioCategory.toLowerCase().includes(q);
        const matchesDecisions = entry.decisions.some(
          (d) =>
            d.selectedOptionText.toLowerCase().includes(q) ||
            d.outcomeText.toLowerCase().includes(q) ||
            d.referenceQuote.toLowerCase().includes(q)
        );
        if (!matchesTitle && !matchesCategory && !matchesDecisions) {
          return false;
        }
      }

      return true;
    });
  }, [entries, selectedCategory, selectedStatus, searchQuery]);

  // Overall Statistics
  const stats = useMemo(() => {
    if (entries.length === 0) {
      return { total: 0, passRate: 0, avgScore: 0, honorCredits: 0, totalBestChoices: 0, totalStages: 0 };
    }
    const total = entries.length;
    const passedCount = entries.filter((e) => e.passed).length;
    const passRate = Math.round((passedCount / total) * 100);
    const avgScore = Math.round(
      entries.reduce((acc, cur) => acc + cur.percentage, 0) / total
    );
    const honorCredits = entries.filter((e) => e.earnedHonorCredit).length;
    const totalBestChoices = entries.reduce((acc, cur) => acc + cur.bestChoicesCount, 0);
    const totalStages = entries.reduce((acc, cur) => acc + cur.totalStages, 0);

    return { total, passRate, avgScore, honorCredits, totalBestChoices, totalStages };
  }, [entries]);

  const handleExport = () => {
    const text = exportScenarioHistoryText(entries);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CAP_Cadet_Scenario_Debrief_Log_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header and Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-[#0a1e3d] border border-[#163a70] shadow-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToMissions}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#06142a] hover:bg-[#002855] text-slate-200 hover:text-white border border-[#163a70] text-xs font-bold transition shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-[#ffc72c]" />
            <span>Mission Simulator</span>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#ffc72c]" />
                <span>Cadet Decision History Log</span>
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-[#002855] border border-[#ffc72c]/40 text-[#ffc72c] text-xs font-mono font-bold">
                {entries.length} {entries.length === 1 ? 'Record' : 'Records'}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Local storage-backed repository of tactical decisions, regulatory outcomes, and performance debriefs.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {entries.length > 0 && (
            <>
              <button
                onClick={handleExport}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#002855] hover:bg-[#003875] text-[#ffc72c] border border-[#163a70] text-xs font-bold transition shadow-sm"
                title="Download formatted official debrief transcript"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Report</span>
              </button>

              <button
                onClick={() => setIsConfirmingClear(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/60 text-xs font-semibold transition shadow-sm"
                title="Clear all saved history logs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear History</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Confirmation Modal for Clearing History */}
      {isConfirmingClear && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#0a1e3d] rounded-2xl border-2 border-red-700 p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <div className="w-10 h-10 rounded-xl bg-red-950/80 flex items-center justify-center border border-red-600">
                <Trash2 className="w-5 h-5 text-red-300" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Clear Decision History Log?</h4>
                <p className="text-xs text-slate-300">This will permanently remove all saved mission attempts.</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-[#06142a] p-3 rounded-xl border border-[#163a70]">
              Warning: All local storage records of your stage decisions, scenario scores, and doctrine references will be wiped. Your honor points and ribbons will remain intact.
            </p>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setIsConfirmingClear(false)}
                className="px-4 py-2 rounded-xl bg-[#06142a] hover:bg-[#0d274e] border border-[#163a70] text-xs font-semibold text-slate-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onClearAll();
                  setIsConfirmingClear(false);
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white transition shadow-lg shadow-red-900/40"
              >
                Yes, Clear All Logs
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Summary Statistics Dashboard */}
      {entries.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-2xl bg-[#0a1e3d] border border-[#163a70] shadow-md flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#002855] border border-[#ffc72c]/40 flex items-center justify-center text-[#ffc72c] shadow-inner">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                Missions Debriefed
              </div>
              <div className="text-2xl font-black text-white font-tech mt-0.5">
                {stats.total}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0a1e3d] border border-[#163a70] shadow-md flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#002855] border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-inner">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                Mission Pass Rate
              </div>
              <div className="text-2xl font-black text-emerald-400 font-tech mt-0.5">
                {stats.passRate}%
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0a1e3d] border border-[#163a70] shadow-md flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#002855] border border-[#ffc72c]/40 flex items-center justify-center text-[#ffc72c] shadow-inner">
              <Star className="w-5 h-5 fill-[#ffc72c]" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                Honor Credits
              </div>
              <div className="text-2xl font-black text-[#ffc72c] font-tech mt-0.5">
                {stats.honorCredits}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0a1e3d] border border-[#163a70] shadow-md flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#002855] border border-blue-500/40 flex items-center justify-center text-blue-300 shadow-inner">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                Average Performance
              </div>
              <div className="text-2xl font-black text-white font-tech mt-0.5">
                {stats.avgScore}%
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0a1e3d] border border-[#163a70] shadow-lg space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by scenario title, decision text, or doctrine keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#06142a] border border-[#163a70] focus:border-[#ffc72c] focus:outline-none text-xs text-white placeholder-slate-400 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick expand/collapse controls */}
          {filteredEntries.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleAll(true)}
                className="px-2.5 py-1.5 rounded-lg bg-[#06142a] hover:bg-[#002855] text-slate-300 hover:text-white border border-[#163a70] text-[11px] font-semibold transition"
              >
                Expand All
              </button>
              <button
                onClick={() => toggleAll(false)}
                className="px-2.5 py-1.5 rounded-lg bg-[#06142a] hover:bg-[#002855] text-slate-300 hover:text-white border border-[#163a70] text-[11px] font-semibold transition"
              >
                Collapse All
              </button>
            </div>
          )}
        </div>

        {/* Status and Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#163a70]/50 text-xs">
          {/* Status buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <span className="text-[11px] font-bold text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#ffc72c]" /> Status:
            </span>
            {(['All', 'Passed', 'Honor', 'Review'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                  selectedStatus === status
                    ? 'bg-[#c8102e] text-white shadow-xs'
                    : 'bg-[#06142a] text-slate-300 hover:text-white hover:bg-[#002855] border border-[#163a70]'
                }`}
              >
                {status === 'All' && 'All Outcomes'}
                {status === 'Passed' && 'Passed'}
                {status === 'Honor' && 'Honor Credit ⭐'}
                {status === 'Review' && 'Suboptimal / Errors'}
              </button>
            ))}
          </div>

          {/* Category Filter Dropdown / Pills */}
          {availableCategories.length > 1 && (
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              <span className="text-[11px] font-bold text-slate-400 mr-1">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-2.5 py-1 rounded-lg bg-[#06142a] border border-[#163a70] text-white text-[11px] font-semibold focus:outline-none focus:border-[#ffc72c]"
              >
                {availableCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* History Log List */}
      {entries.length === 0 ? (
        /* Empty State */
        <div className="text-center py-16 px-6 rounded-3xl bg-[#0a1e3d] border-2 border-dashed border-[#163a70] space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-[#002855] border-2 border-[#ffc72c] mx-auto flex items-center justify-center text-[#ffc72c] shadow-xl">
            <BookOpen className="w-8 h-8 text-[#ffc72c]" />
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-white">No Scenario Decisions Logged Yet</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Step onto the field and participate in our Civil Air Patrol leadership scenarios. All your tactical decisions, regulatory outcomes, and score results will be permanently archived here in your local storage.
            </p>
          </div>
          <button
            onClick={onBackToMissions}
            className="py-2.5 px-6 rounded-xl bg-[#c8102e] hover:bg-[#a80c25] text-white font-bold text-xs transition inline-flex items-center gap-2 shadow-lg shadow-[#c8102e]/30"
          >
            <Compass className="w-4 h-4 text-[#ffc72c]" />
            <span>Launch Cadet Decision Simulator</span>
          </button>
        </div>
      ) : filteredEntries.length === 0 ? (
        /* Filter Empty State */
        <div className="text-center py-12 px-4 rounded-2xl bg-[#0a1e3d] border border-[#163a70] space-y-3">
          <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
          <h4 className="text-sm font-bold text-white">No Matching History Logs Found</h4>
          <p className="text-xs text-slate-300">Try adjusting your search query, status, or category filter.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedStatus('All');
            }}
            className="px-3.5 py-1.5 rounded-lg bg-[#002855] text-[#ffc72c] border border-[#163a70] text-xs font-bold transition hover:bg-[#003875]"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        /* History Log Cards */
        <div className="space-y-4">
          {filteredEntries.map((entry) => {
            const isExpanded = !!expandedEntries[entry.id];
            const dateDisplay = new Date(entry.completedAt).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            });

            return (
              <div
                key={entry.id}
                className="rounded-2xl overflow-hidden bg-[#0a1e3d] border border-[#163a70] hover:border-[#ffc72c]/60 transition-all duration-200 shadow-xl"
              >
                {/* Entry Header Card Bar */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#06142a]/70 border-b border-[#163a70]">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#002855] border border-[#ffc72c]/40 text-[#ffc72c] text-[10px] font-black uppercase tracking-wider">
                        {entry.scenarioCategory}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#0a1e3d] border border-[#163a70] text-slate-300 text-[10px] font-semibold">
                        {entry.difficulty}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {dateDisplay}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <span>{entry.scenarioTitle}</span>
                    </h3>
                  </div>

                  {/* Performance Badges and Actions */}
                  <div className="flex flex-wrap items-center gap-2.5 sm:self-center">
                    {/* Status Pill */}
                    {entry.earnedHonorCredit ? (
                      <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/60 text-amber-300 text-xs font-black shadow-xs">
                        <Star className="w-3.5 h-3.5 fill-[#ffc72c] text-[#ffc72c]" />
                        <span>HONOR CREDIT</span>
                      </div>
                    ) : entry.passed ? (
                      <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/60 text-emerald-300 text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>PASSED</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/60 text-red-300 text-xs font-bold">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>REVIEW REQUIRED</span>
                      </div>
                    )}

                    {/* Score Badge */}
                    <div className="px-3 py-1 rounded-xl bg-[#002855] border border-[#163a70] text-right font-mono">
                      <div className="text-xs font-black text-white">
                        {entry.score} / {entry.maxScore}
                      </div>
                      <div className="text-[10px] text-[#ffc72c] font-bold">
                        {entry.percentage}%
                      </div>
                    </div>

                    {/* Expand/Collapse Toggle Button */}
                    <button
                      onClick={() => toggleExpand(entry.id)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0a1e3d] hover:bg-[#002855] border border-[#163a70] text-slate-200 hover:text-white text-xs font-semibold transition"
                      aria-expanded={isExpanded}
                    >
                      <span>{isExpanded ? 'Hide Decisions' : 'Review Decisions'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5 text-[#ffc72c]" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-[#ffc72c]" />
                      )}
                    </button>

                    {/* Delete Entry */}
                    <button
                      onClick={() => onDeleteEntry(entry.id)}
                      className="p-2 rounded-xl bg-[#06142a] hover:bg-red-950/50 text-slate-400 hover:text-red-300 border border-[#163a70] hover:border-red-800 transition"
                      title="Remove this log entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Quick Performance Breakdown Strip */}
                <div className="px-5 py-2.5 bg-[#0a1e3d] flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300 border-b border-[#163a70]/40">
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-slate-400">Tactical Decisions: </span>
                      <span className="font-bold text-white">
                        {entry.bestChoicesCount} of {entry.totalStages} Optimal Courses ({Math.round((entry.bestChoicesCount / entry.totalStages) * 100)}%)
                      </span>
                    </div>
                    {entry.cadetName && (
                      <div className="hidden sm:inline-block">
                        <span className="text-slate-400">Cadet: </span>
                        <span className="font-semibold text-slate-200">{entry.cadetName}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => onSelectScenario(entry.scenarioId)}
                    className="flex items-center gap-1 text-xs font-bold text-[#ffc72c] hover:underline"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Re-attempt Mission</span>
                  </button>
                </div>

                {/* Expanded Decision Outcomes Section */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 bg-[#06142a]/95 space-y-5 animate-fade-in">
                    <div className="flex items-center justify-between pb-2 border-b border-[#163a70]">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#ffc72c] uppercase tracking-wider">
                        <Layers className="w-4 h-4 text-[#ffc72c]" />
                        <span>Stage Decision Breakdown & CAP Doctrine Outcomes</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {entry.decisions.length} Decisions Logged
                      </span>
                    </div>

                    <div className="space-y-4">
                      {entry.decisions.map((dec) => (
                        <div
                          key={dec.stageIndex}
                          className={`p-4 rounded-xl border transition-all ${
                            dec.isBestCourse
                              ? 'bg-[#002855]/40 border-emerald-500/40'
                              : dec.scoreModifier > 30
                              ? 'bg-amber-950/20 border-amber-500/40'
                              : 'bg-red-950/20 border-red-500/40'
                          }`}
                        >
                          {/* Stage Headline & Score Quality */}
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-[#002855] border border-[#ffc72c] text-[#ffc72c] font-black text-xs flex items-center justify-center">
                                {dec.stageIndex + 1}
                              </span>
                              <h4 className="text-sm font-bold text-white">
                                {dec.stageTitle}
                              </h4>
                            </div>

                            <div className="flex items-center gap-2">
                              {dec.isBestCourse ? (
                                <span className="flex items-center gap-1 text-[11px] font-black text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  BEST COURSE OF ACTION
                                </span>
                              ) : dec.scoreModifier > 30 ? (
                                <span className="flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/40">
                                  <AlertCircle className="w-3.5 h-3.5" />
                                  SUBOPTIMAL COURSE
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-[11px] font-bold text-red-300 bg-red-950/80 px-2.5 py-0.5 rounded-full border border-red-500/40">
                                  <XCircle className="w-3.5 h-3.5" />
                                  CRITICAL ERROR
                                </span>
                              )}

                              <span className="text-xs font-mono font-black text-[#ffc72c] bg-[#06142a] px-2 py-0.5 rounded border border-[#163a70]">
                                +{dec.scoreModifier} Pts
                              </span>
                            </div>
                          </div>

                          {/* Stage Prompt Question */}
                          <div className="text-xs font-semibold text-slate-300 mb-2.5 italic">
                            Prompt: "{dec.promptQuestion}"
                          </div>

                          {/* Cadet's Chosen Course of Action */}
                          <div className="p-3 rounded-lg bg-[#06142a] border border-[#163a70] text-xs space-y-1">
                            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                              Cadet Selected Action:
                            </div>
                            <div className="font-semibold text-white leading-relaxed">
                              "{dec.selectedOptionText}"
                            </div>
                          </div>

                          {/* Outcome Analysis */}
                          <div className="mt-2.5 text-xs text-slate-200 leading-relaxed font-medium">
                            <span className="font-bold text-[#ffc72c]">Outcome Consequence: </span>
                            {dec.outcomeText}
                          </div>

                          {/* Regulatory Reference Quote */}
                          <div className="mt-3 p-3 rounded-lg bg-[#001833] border border-[#163a70] text-xs text-slate-300 flex items-start gap-2">
                            <BookOpen className="w-4 h-4 text-[#ffc72c] flex-shrink-0 mt-0.5" />
                            <div className="space-y-0.5">
                              <span className="font-bold text-[#ffc72c] text-[11px] uppercase tracking-wider block">
                                Civil Air Patrol Doctrine Grounding:
                              </span>
                              <p className="italic text-slate-300 text-[11px]">
                                {dec.referenceQuote}
                              </p>
                            </div>
                          </div>

                          {/* Core Value Demonstration */}
                          {dec.coreValueDemonstrated && (
                            <div className="mt-2 text-[11px] flex items-center gap-1.5 text-slate-400">
                              <Sparkles className="w-3 h-3 text-[#ffc72c]" />
                              <span>Core Value Evaluated: </span>
                              <span className="font-bold text-white px-2 py-0.5 rounded-full bg-[#002855] border border-[#ffc72c]/30">
                                {dec.coreValueDemonstrated}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
