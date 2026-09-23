import React, { useState } from 'react';
import { SCENARIOS } from '../data/scenariosData';
import { Scenario, ScenarioOption } from '../types';
import { useAuth } from '../context/AuthContext';
import { 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  Clock, 
  Award, 
  Compass, 
  ShieldAlert, 
  ChevronRight,
  BookOpen,
  Star
} from 'lucide-react';

interface ScenariosViewProps {
  onNavigateToDashboard: () => void;
}

export const ScenariosView: React.FC<ScenariosViewProps> = ({ onNavigateToDashboard }) => {
  const { user, recordScenarioCompletion } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<ScenarioOption | null>(null);
  const [stageScores, setStageScores] = useState<number[]>([]);
  const [bestChoicesCount, setBestChoicesCount] = useState<number>(0);
  const [isDebriefing, setIsDebriefing] = useState<boolean>(false);
  const [lastPromotion, setLastPromotion] = useState<{
    newRankPromoted: boolean;
    newRibbonEarned: string | null;
    newPoints: number;
  } | null>(null);

  const categories = [
    'All',
    'Core Values',
    'Customs & Courtesies',
    'Uniform & Grooming',
    'Flight Safety',
    'Emergency Services',
    'Drill & Ceremonies',
    'Leadership Theory',
    'Flag Etiquette',
  ];

  const filteredScenarios =
    selectedCategory === 'All'
      ? SCENARIOS
      : SCENARIOS.filter((s) => s.category === selectedCategory);

  const handleStartScenario = (scenario: Scenario) => {
    setActiveScenario(scenario);
    setCurrentStageIndex(0);
    setSelectedOption(null);
    setStageScores([]);
    setBestChoicesCount(0);
    setIsDebriefing(false);
    setLastPromotion(null);
  };

  const handleSelectOption = (option: ScenarioOption) => {
    if (selectedOption) return; // Prevent double click
    setSelectedOption(option);
  };

  const handleNextStage = () => {
    if (!activeScenario || !selectedOption) return;

    const currentScore = selectedOption.scoreModifier;
    const updatedScores = [...stageScores, currentScore];
    setStageScores(updatedScores);

    const isBest = selectedOption.isBestCourse;
    const updatedBestCount = bestChoicesCount + (isBest ? 1 : 0);
    setBestChoicesCount(updatedBestCount);

    if (currentStageIndex + 1 < activeScenario.stages.length) {
      setCurrentStageIndex(currentStageIndex + 1);
      setSelectedOption(null);
    } else {
      // Finished all stages
      const totalScore = updatedScores.reduce((a, b) => a + b, 0);
      const maxScore = activeScenario.stages.length * 100;
      const result = recordScenarioCompletion(
        activeScenario.id,
        totalScore,
        maxScore,
        updatedBestCount,
        activeScenario.stages.length
      );
      setLastPromotion(result);
      setIsDebriefing(true);
    }
  };

  const handleRetry = () => {
    if (!activeScenario) return;
    setCurrentStageIndex(0);
    setSelectedOption(null);
    setStageScores([]);
    setBestChoicesCount(0);
    setIsDebriefing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Active Scenario Execution Screen */}
      {activeScenario ? (
        <div className="space-y-6">
          {/* Top Breadcrumbs & Stage Progress */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#0a1e3d] border border-[#163a70] shadow-md">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveScenario(null)}
                className="text-xs font-bold text-slate-300 hover:text-white transition flex items-center gap-1"
              >
                ← Back to Mission Board
              </button>
              <span className="text-slate-500">/</span>
              <span className="text-xs font-black text-[#ffc72c] uppercase tracking-wider">
                {activeScenario.category}
              </span>
              <span className="text-slate-500">/</span>
              <span className="text-xs text-white font-medium truncate max-w-xs sm:max-w-md">
                {activeScenario.title}
              </span>
            </div>

            <div className="flex items-center gap-4">
              {!isDebriefing && (
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <span>Stage {currentStageIndex + 1} of {activeScenario.stages.length}</span>
                  <div className="w-24 h-2 bg-[#06142a] rounded-full overflow-hidden border border-[#163a70]">
                    <div
                      className="h-full bg-gradient-to-r from-[#c8102e] to-[#ffc72c] transition-all duration-300"
                      style={{
                        width: `${((currentStageIndex + 1) / activeScenario.stages.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {!isDebriefing ? (
            /* Active Scenario Stage */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Scene Visual & Speaker Column */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative rounded-2xl overflow-hidden border-2 border-[#163a70] bg-[#06142a] shadow-2xl group">
                  <img
                    src={activeScenario.coverImage}
                    alt={activeScenario.imageAlt}
                    referrerPolicy="no-referrer"
                    className="w-full h-64 sm:h-72 object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06142a] via-[#06142a]/40 to-transparent" />
                  
                  {/* Location / Context Tag */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#06142a]/95 backdrop-blur border border-[#163a70] text-[11px] font-bold text-[#ffc72c] flex items-center gap-1.5 shadow">
                    <Compass className="w-3.5 h-3.5 text-[#ffc72c]" />
                    <span>Real-World Field Scenario</span>
                  </div>

                  {/* Stage Headline */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-xs font-black text-[#ffc72c] uppercase tracking-wider">
                      {activeScenario.stages[currentStageIndex].title}
                    </div>
                    <div className="text-sm font-semibold text-white mt-0.5">
                      {activeScenario.stages[currentStageIndex].speakerRole || 'Squadron Operations'}
                    </div>
                  </div>
                </div>

                {/* Speaker Card */}
                {activeScenario.stages[currentStageIndex].speaker && (
                  <div className="p-4 rounded-xl bg-[#0a1e3d] border border-[#163a70] flex items-center gap-3 shadow-md">
                    <div className="w-11 h-11 rounded-full bg-[#002855] border-2 border-[#ffc72c] flex items-center justify-center text-[#ffc72c] font-black text-sm shadow-sm">
                      {activeScenario.stages[currentStageIndex].speaker.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-xs text-slate-300 font-medium">
                        {activeScenario.stages[currentStageIndex].speakerRole || 'Airman In Situation'}
                      </div>
                      <div className="text-sm font-bold text-white">
                        {activeScenario.stages[currentStageIndex].speaker}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Scenario Dilemma & Options Column */}
              <div className="lg:col-span-7 space-y-6">
                {/* Situation Narrative */}
                <div className="p-6 rounded-2xl bg-[#0a1e3d] border border-[#163a70] shadow-xl space-y-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {activeScenario.stages[currentStageIndex].title}
                    </h3>
                    <div className="h-1 w-16 bg-[#ffc72c] mt-2 rounded-full" />
                  </div>

                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    {activeScenario.stages[currentStageIndex].narration}
                  </p>

                  <div className="p-4 rounded-xl bg-[#06142a] border border-[#163a70] text-sm font-semibold text-blue-100 flex items-start gap-2.5 shadow-inner">
                    <AlertCircle className="w-5 h-5 text-[#ffc72c] flex-shrink-0 mt-0.5" />
                    <span>{activeScenario.stages[currentStageIndex].promptQuestion}</span>
                  </div>
                </div>

                {/* Interactive Decision Options */}
                <div className="space-y-3">
                  <div className="text-xs font-black text-slate-300 uppercase tracking-wider px-1">
                    Select Your Course of Action:
                  </div>

                  {activeScenario.stages[currentStageIndex].options.map((opt, idx) => {
                    const isChosen = selectedOption?.id === opt.id;
                    const letter = ['A', 'B', 'C', 'D'][idx];

                    return (
                      <button
                        key={opt.id}
                        disabled={selectedOption !== null}
                        onClick={() => handleSelectOption(opt)}
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3.5 ${
                          !selectedOption
                            ? 'bg-[#0a1e3d] border-[#163a70] hover:border-[#ffc72c] hover:bg-[#0d274e] cursor-pointer hover:shadow-lg text-white'
                            : isChosen
                            ? opt.isBestCourse
                              ? 'bg-emerald-950/70 border-emerald-500 ring-2 ring-emerald-500/40 text-white'
                              : opt.scoreModifier > 30
                              ? 'bg-amber-950/70 border-amber-500 ring-2 ring-amber-500/40 text-white'
                              : 'bg-red-950/70 border-red-500 ring-2 ring-red-500/40 text-white'
                            : 'bg-[#06142a]/60 border-[#11315f] opacity-50 text-slate-400'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 transition ${
                            !selectedOption
                              ? 'bg-[#002855] text-[#ffc72c] border border-[#ffc72c]/40'
                              : isChosen
                              ? opt.isBestCourse
                                ? 'bg-emerald-500 text-white'
                                : opt.scoreModifier > 30
                                ? 'bg-amber-500 text-white'
                                : 'bg-red-500 text-white'
                              : 'bg-[#06142a] text-slate-500'
                          }`}
                        >
                          {letter}
                        </div>
                        <div className="flex-1 text-sm font-medium leading-snug">
                          {opt.text}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Panel (Revealed upon selection) */}
                {selectedOption && (
                  <div
                    className={`p-5 rounded-2xl border shadow-xl space-y-4 animate-fade-in ${
                      selectedOption.isBestCourse
                        ? 'bg-emerald-950/50 border-emerald-600/70'
                        : selectedOption.scoreModifier > 30
                        ? 'bg-amber-950/50 border-amber-600/70'
                        : 'bg-red-950/50 border-red-600/70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {selectedOption.isBestCourse ? (
                          <div className="flex items-center gap-1.5 text-emerald-300 font-black text-sm">
                            <CheckCircle2 className="w-5 h-5" />
                            <span>BEST COURSE OF ACTION</span>
                          </div>
                        ) : selectedOption.scoreModifier > 30 ? (
                          <div className="flex items-center gap-1.5 text-amber-300 font-bold text-sm">
                            <AlertCircle className="w-5 h-5" />
                            <span>SUBOPTIMAL / ACCEPTABLE WITH FLAWS</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-red-300 font-bold text-sm">
                            <XCircle className="w-5 h-5" />
                            <span>CRITICAL ERROR / NOT RECOMMENDED</span>
                          </div>
                        )}
                      </div>

                      <div className="text-xs font-black px-2.5 py-0.5 rounded bg-[#06142a] text-[#ffc72c] border border-[#163a70]">
                        +{selectedOption.scoreModifier} Points
                      </div>
                    </div>

                    <p className="text-sm text-slate-100 leading-relaxed font-medium">
                      {selectedOption.outcomeText}
                    </p>

                    {/* Official Reference Quote */}
                    <div className="p-3.5 rounded-xl bg-[#06142a] border border-[#163a70] text-xs text-slate-200 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-[#ffc72c]">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Civil Air Patrol Doctrine & Reference:</span>
                      </div>
                      <p className="italic text-slate-300 pl-5">
                        {selectedOption.referenceQuote}
                      </p>
                    </div>

                    {selectedOption.coreValueDemonstrated && (
                      <div className="text-xs text-slate-300 flex items-center gap-2">
                        <span className="text-slate-400">Core Value In Action:</span>
                        <span className="px-2 py-0.5 rounded-full bg-[#002855] text-[#ffc72c] border border-[#ffc72c]/40 font-bold">
                          {selectedOption.coreValueDemonstrated}
                        </span>
                      </div>
                    )}

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={handleNextStage}
                        className="py-2.5 px-6 rounded-xl bg-[#c8102e] hover:bg-[#a80c25] text-white font-bold text-xs transition flex items-center gap-2 shadow-lg shadow-[#c8102e]/30"
                      >
                        <span>
                          {currentStageIndex + 1 < activeScenario.stages.length
                            ? 'Continue to Next Stage'
                            : 'Complete Mission & Debrief'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Post-Scenario Debriefing Screen */
            <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-[#0a1e3d] border border-[#163a70] shadow-2xl text-center space-y-6 animate-fade-in">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#002855] to-[#c8102e] border-2 border-[#ffc72c] mx-auto flex items-center justify-center text-[#ffc72c] shadow-xl">
                <Award className="w-8 h-8 text-[#ffc72c]" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-white">Mission Debrief Complete</h3>
                <p className="text-sm text-slate-300 mt-1">{activeScenario.title}</p>
              </div>

              {/* Score Display */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#06142a] border border-[#163a70]">
                <div className="p-3">
                  <div className="text-xs text-slate-400">Mission Score</div>
                  <div className="text-2xl font-black text-white mt-1">
                    {stageScores.reduce((a, b) => a + b, 0)} / {activeScenario.stages.length * 100}
                  </div>
                </div>

                <div className="p-3">
                  <div className="text-xs text-slate-400">Best Choices</div>
                  <div className="text-2xl font-black text-emerald-400 mt-1">
                    {bestChoicesCount} / {activeScenario.stages.length}
                  </div>
                </div>

                <div className="p-3 col-span-2 sm:col-span-1">
                  <div className="text-xs text-slate-400">Honor Credit</div>
                  <div className="text-base font-bold text-[#ffc72c] mt-2 flex items-center justify-center gap-1">
                    {bestChoicesCount === activeScenario.stages.length ? (
                      <>
                        <Star className="w-4 h-4 fill-[#ffc72c] text-[#ffc72c]" />
                        <span>Silver Star</span>
                      </>
                    ) : (
                      <span className="text-slate-400 font-normal">Standard Pass</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Promotion / Rewards Notification */}
              {lastPromotion && (
                <div className="space-y-3 p-4 rounded-xl bg-[#002855]/70 border border-[#ffc72c]/40 text-left">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#ffc72c]">
                    <Sparkles className="w-4 h-4 text-[#ffc72c]" />
                    <span>Progression & Rewards Saved:</span>
                  </div>
                  <ul className="text-xs text-slate-200 space-y-1.5 pl-6 list-disc font-medium">
                    <li>Earned +{lastPromotion.newPoints} Honor Points toward promotion</li>
                    {lastPromotion.newRibbonEarned && (
                      <li className="text-[#ffc72c] font-bold">
                        Unlocked New Ribbon: {lastPromotion.newRibbonEarned}!
                      </li>
                    )}
                    {lastPromotion.newRankPromoted && (
                      <li className="text-emerald-300 font-black">
                        PROMOTION EARNED! Advanced in cadet grade! Check your dashboard.
                      </li>
                    )}
                    <li>Progress permanently saved to your cadet personnel file</li>
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3 justify-center pt-2">
                <button
                  onClick={handleRetry}
                  className="py-2.5 px-5 rounded-xl bg-[#06142a] hover:bg-[#092248] text-slate-200 font-semibold text-xs border border-[#163a70] transition flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Retry Scenario
                </button>
                <button
                  onClick={() => setActiveScenario(null)}
                  className="py-2.5 px-5 rounded-xl bg-[#0a1e3d] hover:bg-[#0f2d59] text-white font-semibold text-xs border border-[#163a70] transition flex items-center gap-2"
                >
                  <span>More Scenarios</span>
                </button>
                <button
                  onClick={onNavigateToDashboard}
                  className="py-2.5 px-6 rounded-xl bg-[#c8102e] hover:bg-[#a80c25] text-white font-bold text-xs transition flex items-center gap-2 shadow-lg shadow-[#c8102e]/30"
                >
                  <Award className="w-4 h-4" />
                  View Cadet Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Scenario Selection Grid */
        <div className="space-y-8">
          {/* Header Banner */}
          <div className="relative rounded-3xl overflow-hidden border border-[#163a70] bg-[#0a1e3d] shadow-2xl p-6 sm:p-8">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c8102e]/20 border border-[#c8102e]/40 text-white text-xs font-bold shadow-sm">
                <Compass className="w-3.5 h-3.5 text-[#ffc72c]" />
                <span>Interactive Decision Simulator</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Real-World Cadet Scenarios
              </h1>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                Step into realistic situations faced by Civil Air Patrol cadets. From drill commands to the flight line, uniform inspections, and ethical traps—make your decisions, analyze the best courses of action, and advance toward your milestone awards.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>CAPP 60-20 & Learn to Lead Grounded</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#ffc72c]" />
                  <span>Automatic Progress Saving</span>
                </div>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-[#c8102e] text-white shadow-md shadow-[#c8102e]/30'
                    : 'bg-[#0a1e3d] text-slate-300 hover:text-white hover:bg-[#0e2c56] border border-[#163a70]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Scenario Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScenarios.map((scenario) => {
              const previousResult = user?.scenarioResults[scenario.id];
              const isPassed = previousResult?.passed;
              const hasHonorCredit = previousResult?.earnedHonorCredit;

              return (
                <div
                  key={scenario.id}
                  className="rounded-2xl overflow-hidden bg-[#0a1e3d] border border-[#163a70] hover:border-[#ffc72c]/70 transition-all duration-300 shadow-xl flex flex-col group"
                >
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden bg-[#06142a]">
                    <img
                      src={scenario.coverImage}
                      alt={scenario.imageAlt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e3d] via-[#0a1e3d]/30 to-transparent" />

                    {/* Category Tag */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#06142a]/95 backdrop-blur border border-[#163a70] text-[10px] font-black text-[#ffc72c] uppercase tracking-wider">
                      {scenario.category}
                    </div>

                    {/* Completion / Status Badge */}
                    {isPassed && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[11px] font-bold shadow-lg">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{hasHonorCredit ? 'Honor Credit' : 'Passed'}</span>
                        {hasHonorCredit && <Star className="w-3 h-3 fill-[#ffc72c] text-[#ffc72c]" />}
                      </div>
                    )}

                    <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-slate-200 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-300" />
                        {scenario.estimatedMinutes} mins
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-[#06142a] border border-[#163a70] text-slate-200 text-[10px] font-semibold">
                        {scenario.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-[#ffc72c] transition leading-snug">
                        {scenario.title}
                      </h3>
                      <p className="text-xs text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                        {scenario.summary}
                      </p>
                    </div>

                    <div className="space-y-3 pt-2 border-t border-[#163a70]">
                      <div className="text-[11px] text-slate-300">
                        <span className="font-bold text-slate-200">Recommended: </span>
                        {scenario.recommendedAchievement}
                      </div>

                      <button
                        onClick={() => handleStartScenario(scenario)}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#002855] hover:bg-[#003875] border border-[#163a70] hover:border-[#ffc72c]/60 text-white font-bold text-xs transition flex items-center justify-center gap-2 group-hover:shadow-lg shadow-sm"
                      >
                        <span>{isPassed ? 'Replay Scenario' : 'Begin Decision Scenario'}</span>
                        <ChevronRight className="w-4 h-4 text-[#ffc72c] transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
