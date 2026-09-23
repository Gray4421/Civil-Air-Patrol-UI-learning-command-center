import React, { useState } from 'react';
import { CADET_OATH_LINES } from '../data/cadetData';
import { useAuth } from '../context/AuthContext';
import { BookOpen, CheckCircle2, Award, RotateCcw, Sparkles, HelpCircle, Check, Flag } from 'lucide-react';
import confetti from 'canvas-confetti';
import colorGuardFlag from '../assets/images/color_guard_flag_1789949026090.jpg';

export const CadetOathView: React.FC = () => {
  const { user, setOathMastered } = useAuth();
  const [activeMode, setActiveMode] = useState<'study' | 'quiz'>('study');
  const [selectedWordInputs, setSelectedWordInputs] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizPassed, setQuizPassed] = useState<boolean>(false);

  // Missing words challenge for quiz mode
  const QUIZ_BLANKS = [
    {
      lineIndex: 0,
      prefix: 'I pledge that I will serve ',
      correctWord: 'faithfully',
      suffix: ' in the Civil Air Patrol Cadet Program,',
      options: ['faithfully', 'passively', 'secretly'],
    },
    {
      lineIndex: 1,
      prefix: 'and that I will attend meetings ',
      correctWord: 'regularly',
      suffix: ',',
      options: ['regularly', 'occasionally', 'yearly'],
    },
    {
      lineIndex: 2,
      prefix: 'participate ',
      correctWord: 'actively',
      suffix: ' in unit activities,',
      options: ['actively', 'silently', 'reluctantly'],
    },
    {
      lineIndex: 3,
      prefix: 'obey my ',
      correctWord: 'officers',
      suffix: ',',
      options: ['officers', 'friends', 'critics'],
    },
    {
      lineIndex: 4,
      prefix: 'wear my uniform ',
      correctWord: 'properly',
      suffix: ',',
      options: ['properly', 'casually', 'partly'],
    },
    {
      lineIndex: 5,
      prefix: 'and advance my education and training ',
      correctWord: 'rapidly',
      suffix: '',
      options: ['rapidly', 'slowly', 'eventually'],
    },
    {
      lineIndex: 6,
      prefix: 'to prepare myself to be of ',
      correctWord: 'service',
      suffix: ' to my community, state, and nation.',
      options: ['service', 'comfort', 'profit'],
    },
  ];

  const handleSelectQuizWord = (blankIdx: number, word: string) => {
    setSelectedWordInputs((prev) => ({ ...prev, [blankIdx]: word }));
  };

  const handleCheckQuiz = () => {
    setQuizSubmitted(true);
    let allCorrect = true;
    QUIZ_BLANKS.forEach((b, idx) => {
      if (selectedWordInputs[idx] !== b.correctWord) {
        allCorrect = false;
      }
    });

    setQuizPassed(allCorrect);
    if (allCorrect) {
      setOathMastered(true);
      confetti({ particleCount: 90, spread: 60 });
    }
  };

  const handleResetQuiz = () => {
    setSelectedWordInputs({});
    setQuizSubmitted(false);
    setQuizPassed(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-[#0a1e3d] border border-[#163a70] shadow-2xl p-6 sm:p-8">
        {/* Real Flag Ceremony Image in background with gradient overlay */}
        <div className="absolute top-0 right-0 w-full sm:w-2/5 h-full opacity-20 sm:opacity-30 pointer-events-none overflow-hidden">
          <img
            src={colorGuardFlag}
            alt="Cadet Color Guard Honoring Flag"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1e3d] via-[#0a1e3d]/80 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c8102e]/20 border border-[#c8102e]/40 text-white text-xs font-bold shadow-sm">
              <BookOpen className="w-3.5 h-3.5 text-[#ffc72c]" />
              <span>CAPP 60-20 & Learn to Lead (p. 14-15)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              The Cadet Oath
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
              "An oath is a solemn promise made in public that serves a public good. When you swear an oath, you put your personal honor and reputation on the line." Cadets are expected to recite the Cadet Oath from memory.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {user?.oathMastered ? (
              <div className="px-4 py-2 rounded-2xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 text-xs font-bold flex items-center gap-2 shadow">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Oath Recited from Memory</span>
              </div>
            ) : (
              <button
                onClick={() => {
                  setOathMastered(true);
                  confetti({ particleCount: 80, spread: 60 });
                }}
                className="px-4 py-2 rounded-2xl bg-[#c8102e] hover:bg-[#a80c25] text-white text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-[#c8102e]/30"
              >
                <Check className="w-4 h-4" />
                Mark as Memorized
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveMode('study')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeMode === 'study'
              ? 'bg-[#c8102e] text-white shadow-md shadow-[#c8102e]/30'
              : 'bg-[#0a1e3d] text-slate-300 hover:text-white border border-[#163a70]'
          }`}
        >
          Line-by-Line Study & Meaning
        </button>
        <button
          onClick={() => setActiveMode('quiz')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeMode === 'quiz'
              ? 'bg-[#c8102e] text-white shadow-md shadow-[#c8102e]/30'
              : 'bg-[#0a1e3d] text-slate-300 hover:text-white border border-[#163a70]'
          }`}
        >
          Memory Recitation Test
        </button>
      </div>

      {activeMode === 'study' ? (
        /* Line-by-Line Study Cards */
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-[#0a1e3d] border border-[#163a70] shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#163a70] pb-3">
              <span className="text-xs font-black text-[#ffc72c] uppercase tracking-wider">
                Official Recitation Text
              </span>
              <span className="text-xs text-slate-300 font-mono">Civil Air Patrol Cadet Corps</span>
            </div>

            <div className="space-y-4">
              {CADET_OATH_LINES.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#06142a] border border-[#163a70] space-y-1.5 transition hover:border-[#1e4c91]"
                >
                  <div className="text-sm sm:text-base font-bold text-white leading-snug">
                    "{item.line}"
                  </div>
                  <div className="text-xs text-slate-300 pl-4 border-l-2 border-[#ffc72c]">
                    <strong className="text-[#ffc72c] font-bold">What this means: </strong>
                    {item.meaning}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Fill-in-the-Blank Memory Quiz */
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0a1e3d] border border-[#163a70] shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Cadet Oath Memory Verification
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Select the missing key words to complete the Cadet Oath.
              </p>
            </div>

            <button
              onClick={handleResetQuiz}
              className="text-xs text-slate-300 hover:text-white flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-4">
            {QUIZ_BLANKS.map((blank, bIdx) => {
              const selectedWord = selectedWordInputs[bIdx];
              const isCorrect = selectedWord === blank.correctWord;

              return (
                <div
                  key={bIdx}
                  className="p-4 rounded-2xl bg-[#06142a] border border-[#163a70] space-y-3"
                >
                  <div className="text-sm font-medium text-slate-200">
                    <span>{blank.prefix}</span>
                    <span className="font-black underline text-[#ffc72c] mx-1">
                      {selectedWord || '[ ________ ]'}
                    </span>
                    <span>{blank.suffix}</span>
                  </div>

                  {/* Multiple Choice Buttons for Blank */}
                  <div className="flex flex-wrap items-center gap-2">
                    {blank.options.map((optionWord) => (
                      <button
                        key={optionWord}
                        onClick={() => handleSelectQuizWord(bIdx, optionWord)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                          selectedWord === optionWord
                            ? quizSubmitted
                              ? isCorrect
                                ? 'bg-emerald-600 text-white'
                                : 'bg-[#c8102e] text-white'
                              : 'bg-[#c8102e] text-white'
                            : 'bg-[#002855] text-slate-300 hover:bg-[#003875] hover:text-white border border-[#163a70]'
                        }`}
                      >
                        {optionWord}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#163a70]">
            {quizSubmitted && (
              <div
                className={`text-xs font-bold flex items-center gap-1.5 ${
                  quizPassed ? 'text-emerald-400' : 'text-[#ffc72c]'
                }`}
              >
                {quizPassed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>PERFECT RECITATION! Oath mastered and recorded to personnel profile.</span>
                  </>
                ) : (
                  <span>Some words were incorrect. Review the study guide and try again!</span>
                )}
              </div>
            )}

            <button
              onClick={handleCheckQuiz}
              disabled={Object.keys(selectedWordInputs).length < QUIZ_BLANKS.length}
              className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-[#c8102e] hover:bg-[#a80c25] disabled:opacity-50 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-[#c8102e]/30 ml-auto"
            >
              <Award className="w-4 h-4" />
              <span>Check Recitation</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
