import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserAccount, CadetRankId, ScenarioResult, CadetGoal } from '../types';
import { CADET_RANKS } from '../data/cadetData';
import confetti from 'canvas-confetti';

interface AuthContextType {
  user: UserAccount | null;
  isAuthenticated: boolean;
  isGoogleModalOpen: boolean;
  setIsGoogleModalOpen: (open: boolean) => void;
  isOnboardingModalOpen: boolean;
  setIsOnboardingModalOpen: (open: boolean) => void;
  loginWithGoogle: (email: string, name?: string, avatarUrl?: string) => void;
  logoutGoogle: () => void;
  completeOnboarding: (params: {
    fullName: string;
    capId: string;
    currentRankId: CadetRankId;
    squadron: string;
    callsign?: string;
  }) => void;
  updateProfile: (params: {
    fullName?: string;
    capId?: string;
    currentRankId?: CadetRankId;
    squadron?: string;
    callsign?: string;
  }) => void;
  login: (email: string) => boolean;
  signup: (fullName: string, email: string, callsign: string, squadron: string) => void;
  logout: () => void;
  createGuestAccount: () => void;
  recordScenarioCompletion: (
    scenarioId: string,
    score: number,
    maxScore: number,
    bestChoicesCount: number,
    totalStages: number
  ) => { newRankPromoted: boolean; newRibbonEarned: string | null; newPoints: number };
  toggleGoal: (goalId: string) => void;
  addGoal: (
    title: string,
    priority: 'High' | 'Medium' | 'Low',
    category: 'Promotion' | 'Activity' | 'Study' | 'Fitness'
  ) => void;
  toggleFirstYearTask: (taskKey: keyof UserAccount['firstYearChecklist']) => void;
  setOathMastered: (val: boolean) => void;
  recordDrillScore: (testName: string, score: number) => void;
  resetProgress: () => void;
  exportProgressJSON: () => string;
  importProgressJSON: (jsonString: string) => boolean;
}

const STORAGE_KEY = 'cap_cadet_active_session';
const GOOGLE_ACCOUNTS_KEY = 'cap_cadet_google_accounts';

const DEFAULT_FIRST_YEAR = {
  stayedOneYear: false,
  regularMeetings: true,
  saturdayEventsCount: 1,
  completedOFlight: false,
  attendedEncampment: false,
  earnedWrightBrothers: false,
};

const DEFAULT_GOALS: CadetGoal[] = [
  {
    id: 'g_1',
    title: 'Complete Learn to Lead Chapter 1 and Drill Test',
    priority: 'High',
    category: 'Promotion',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'g_2',
    title: 'Schedule First Orientation Flight (Cessna 172 or Glider)',
    priority: 'Medium',
    category: 'Activity',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'g_3',
    title: 'Acquire & Fit Regulation Blues & ABU/OCP Uniforms',
    priority: 'High',
    category: 'Promotion',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'g_4',
    title: 'Practice 2-minute cadence running and push-ups for CPFT',
    priority: 'Low',
    category: 'Fitness',
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);

  // Load active user session on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as UserAccount;
        // Purge any previously fabricated names (e.g. Jordan William, Jordan, jwilliam4421)
        if (
          parsed.fullName === 'Jordan William' ||
          parsed.fullName?.toLowerCase().includes('jordan') ||
          parsed.fullName?.toLowerCase().includes('jordin') ||
          parsed.fullName === 'jwilliam4421'
        ) {
          parsed.fullName = '';
          parsed.callsign = '';
          parsed.onboardingCompleted = false;
        }

        setUser(parsed);
        // If logged in with Google but onboarding was never finished or name is empty, open onboarding modal
        if (!parsed.fullName || (parsed.isGoogleAuth && !parsed.onboardingCompleted)) {
          setIsOnboardingModalOpen(true);
        }
      }
    } catch (e) {
      console.error('Failed to load user session', e);
    }
  }, []);

  // Save to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      if (user.isGoogleAuth) {
        try {
          const saved = localStorage.getItem(GOOGLE_ACCOUNTS_KEY);
          const accounts: Record<string, UserAccount> = saved ? JSON.parse(saved) : {};
          accounts[user.email.toLowerCase()] = user;
          localStorage.setItem(GOOGLE_ACCOUNTS_KEY, JSON.stringify(accounts));
        } catch (err) {
          console.error('Failed to sync google accounts', err);
        }
      }
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  // Google Login implementation - never fabricates names, only uses user input
  const loginWithGoogle = (email: string, name?: string, avatarUrl?: string) => {
    const cleanEmail = email.toLowerCase().trim();
    const explicitName = name?.trim() || '';

    try {
      const saved = localStorage.getItem(GOOGLE_ACCOUNTS_KEY);
      const accounts: Record<string, UserAccount> = saved ? JSON.parse(saved) : {};
      const existing = accounts[cleanEmail];

      if (existing) {
        // Sanitize any previously fabricated names
        if (
          existing.fullName === 'Jordan William' ||
          existing.fullName?.toLowerCase().includes('jordan') ||
          existing.fullName?.toLowerCase().includes('jordin') ||
          existing.fullName === 'jwilliam4421'
        ) {
          existing.fullName = explicitName;
          existing.callsign = '';
          existing.onboardingCompleted = false;
        }

        setUser(existing);
        if (!existing.fullName || !existing.onboardingCompleted) {
          setIsOnboardingModalOpen(true);
        } else {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.6 },
          });
        }
        return;
      }
    } catch (err) {
      console.error(err);
    }

    // New Google Cadet user: initialize fresh account with NO fabricated name
    const newCadet: UserAccount = {
      id: 'cap_g_' + Math.random().toString(36).substring(2, 9),
      callsign: '',
      fullName: explicitName,
      email: cleanEmail,
      squadron: '',
      capId: '',
      avatarSeed: 'google_' + cleanEmail,
      googleAvatar: avatarUrl,
      isGoogleAuth: true,
      onboardingCompleted: false,
      createdAt: new Date().toISOString(),
      currentRankId: 'c_ab',
      honorPoints: 50,
      scenarioResults: {},
      earnedRibbonIds: [],
      firstYearChecklist: DEFAULT_FIRST_YEAR,
      goals: DEFAULT_GOALS,
      oathMastered: false,
      drillTestHighScores: {},
    };

    setUser(newCadet);
    setIsOnboardingModalOpen(true);
  };

  const logoutGoogle = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const completeOnboarding = ({
    fullName,
    capId,
    currentRankId,
    squadron,
    callsign,
  }: {
    fullName: string;
    capId: string;
    currentRankId: CadetRankId;
    squadron: string;
    callsign?: string;
  }) => {
    if (!user) return;

    // Calculate initial honor points based on rank selected so rank matches points
    const rankObj = CADET_RANKS.find((r) => r.id === currentRankId) || CADET_RANKS[0];
    const initialPoints = Math.max(user.honorPoints, rankObj.requiredHonorPoints || 50);

    // If rank is higher than C/AB, award appropriate milestone ribbons
    const initialRibbons = [...user.earnedRibbonIds];
    if (currentRankId !== 'c_ab' && !initialRibbons.includes('ribbon_curry')) {
      initialRibbons.push('ribbon_curry');
    }
    if (['c_a1c', 'c_sra', 'c_ssgt', 'c_tsgt', 'c_msgt', 'c_smsgt', 'c_cmsgt', 'c_2dlt', 'c_1stlt', 'c_capt', 'c_maj', 'c_ltcol', 'c_col'].includes(currentRankId)) {
      if (!initialRibbons.includes('ribbon_arnold')) initialRibbons.push('ribbon_arnold');
    }
    if (['c_sra', 'c_ssgt', 'c_tsgt', 'c_msgt', 'c_smsgt', 'c_cmsgt', 'c_2dlt', 'c_1stlt', 'c_capt', 'c_maj', 'c_ltcol', 'c_col'].includes(currentRankId)) {
      if (!initialRibbons.includes('ribbon_feik')) initialRibbons.push('ribbon_feik');
    }
    if (['c_ssgt', 'c_tsgt', 'c_msgt', 'c_smsgt', 'c_cmsgt', 'c_2dlt', 'c_1stlt', 'c_capt', 'c_maj', 'c_ltcol', 'c_col'].includes(currentRankId)) {
      if (!initialRibbons.includes('ribbon_wright')) initialRibbons.push('ribbon_wright');
    }

    const updated: UserAccount = {
      ...user,
      fullName,
      capId,
      currentRankId,
      squadron,
      callsign: callsign || user.callsign || fullName.split(' ')[0],
      honorPoints: initialPoints,
      earnedRibbonIds: initialRibbons,
      onboardingCompleted: true,
    };

    setUser(updated);
    setIsOnboardingModalOpen(false);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const updateProfile = ({
    fullName,
    capId,
    currentRankId,
    squadron,
    callsign,
  }: {
    fullName?: string;
    capId?: string;
    currentRankId?: CadetRankId;
    squadron?: string;
    callsign?: string;
  }) => {
    if (!user) return;
    setUser({
      ...user,
      ...(fullName ? { fullName } : {}),
      ...(capId ? { capId } : {}),
      ...(currentRankId ? { currentRankId } : {}),
      ...(squadron ? { squadron } : {}),
      ...(callsign ? { callsign } : {}),
    });
  };

  const createGuestAccount = () => {
    const guestUser: UserAccount = {
      id: 'cadet_guest',
      callsign: 'Guest',
      fullName: 'Cadet Trainee',
      email: 'cadet.trainee@cap.dev',
      squadron: 'Squadron 101',
      capId: '684920',
      avatarSeed: 'pilot_alpha',
      isGoogleAuth: false,
      onboardingCompleted: false,
      createdAt: new Date().toISOString(),
      currentRankId: 'c_ab',
      honorPoints: 50,
      scenarioResults: {},
      earnedRibbonIds: [],
      firstYearChecklist: DEFAULT_FIRST_YEAR,
      goals: DEFAULT_GOALS,
      oathMastered: false,
      drillTestHighScores: {},
    };
    setUser(guestUser);
  };

  const login = (email: string): boolean => {
    loginWithGoogle(email);
    return true;
  };

  const signup = (fullName: string, email: string, callsign: string, squadron: string) => {
    loginWithGoogle(email, fullName);
    if (squadron) {
      updateProfile({ squadron, callsign });
    }
  };

  const logout = () => {
    logoutGoogle();
  };

  const determineRank = (points: number, currentRankId: CadetRankId): CadetRankId => {
    let eligibleRank = CADET_RANKS[0].id;
    for (const rank of CADET_RANKS) {
      if (points >= rank.requiredHonorPoints) {
        eligibleRank = rank.id;
      }
    }
    return eligibleRank;
  };

  const recordScenarioCompletion = (
    scenarioId: string,
    score: number,
    maxScore: number,
    bestChoicesCount: number,
    totalStages: number
  ) => {
    if (!user) {
      return { newRankPromoted: false, newRibbonEarned: null, newPoints: 0 };
    }

    const passed = score >= maxScore * 0.7;
    const earnedHonorCredit = bestChoicesCount === totalStages && passed;
    const previousResult = user.scenarioResults[scenarioId];
    const isFirstTimePass = !previousResult?.passed && passed;

    const addedPoints = isFirstTimePass
      ? score + (earnedHonorCredit ? 50 : 0)
      : Math.max(0, score - (previousResult?.score || 0));
    const updatedHonorPoints = user.honorPoints + addedPoints;

    const newResult: ScenarioResult = {
      scenarioId,
      completedAt: new Date().toISOString(),
      score: Math.max(score, previousResult?.score || 0),
      maxScore,
      bestChoicesCount,
      totalStages,
      passed,
      earnedHonorCredit,
    };

    const updatedResults = {
      ...user.scenarioResults,
      [scenarioId]: newResult,
    };

    // Check rank promotion
    const newRankId = determineRank(updatedHonorPoints, user.currentRankId);
    const newRankPromoted = newRankId !== user.currentRankId;

    // Check ribbons
    const newRibbons = [...user.earnedRibbonIds];
    let newRibbonEarned: string | null = null;

    if (newRankId !== 'c_ab' && !newRibbons.includes('ribbon_curry')) {
      newRibbons.push('ribbon_curry');
      newRibbonEarned = 'Maj Gen John F. Curry Ribbon';
    }
    if ((newRankId === 'c_a1c' || newRankId === 'c_sra') && !newRibbons.includes('ribbon_arnold')) {
      newRibbons.push('ribbon_arnold');
      newRibbonEarned = 'Gen H.H. "Hap" Arnold Ribbon';
    }
    if (newRankId === 'c_sra' && !newRibbons.includes('ribbon_feik')) {
      newRibbons.push('ribbon_feik');
      newRibbonEarned = 'Col Mary Feik Ribbon';
    }
    if (newRankId === 'c_ssgt' && !newRibbons.includes('ribbon_wright')) {
      newRibbons.push('ribbon_wright');
      newRibbonEarned = 'Wright Brothers Award Ribbon';
    }

    // Note: Badges and qualifications have been completely removed as requested.
    const updatedUser: UserAccount = {
      ...user,
      honorPoints: updatedHonorPoints,
      currentRankId: newRankId,
      scenarioResults: updatedResults,
      earnedRibbonIds: newRibbons,
    };

    setUser(updatedUser);

    if (newRankPromoted || newRibbonEarned || earnedHonorCredit) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    return {
      newRankPromoted,
      newRibbonEarned,
      newPoints: addedPoints,
    };
  };

  const toggleGoal = (goalId: string) => {
    if (!user) return;
    const updatedGoals = user.goals.map((g) =>
      g.id === goalId ? { ...g, completed: !g.completed } : g
    );
    setUser({ ...user, goals: updatedGoals });
  };

  const addGoal = (
    title: string,
    priority: 'High' | 'Medium' | 'Low',
    category: 'Promotion' | 'Activity' | 'Study' | 'Fitness'
  ) => {
    if (!user) return;
    const newGoal: CadetGoal = {
      id: 'g_' + Date.now(),
      title,
      priority,
      category,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setUser({ ...user, goals: [newGoal, ...user.goals] });
  };

  const toggleFirstYearTask = (taskKey: keyof UserAccount['firstYearChecklist']) => {
    if (!user) return;
    const current = user.firstYearChecklist[taskKey];
    const updatedValue = typeof current === 'boolean' ? !current : (current as number) + 1;
    setUser({
      ...user,
      firstYearChecklist: {
        ...user.firstYearChecklist,
        [taskKey]: updatedValue,
      },
    });
  };

  const setOathMastered = (val: boolean) => {
    if (!user) return;
    setUser({ ...user, oathMastered: val });
    if (val) {
      confetti({ particleCount: 60, spread: 60 });
    }
  };

  const recordDrillScore = (testName: string, score: number) => {
    if (!user) return;
    setUser({
      ...user,
      drillTestHighScores: {
        ...user.drillTestHighScores,
        [testName]: Math.max(score, user.drillTestHighScores[testName] || 0),
      },
    });
  };

  const resetProgress = () => {
    if (!user) return;
    const resetUser: UserAccount = {
      ...user,
      currentRankId: 'c_ab',
      honorPoints: 0,
      scenarioResults: {},
      earnedRibbonIds: [],
      firstYearChecklist: DEFAULT_FIRST_YEAR,
      goals: DEFAULT_GOALS,
      oathMastered: false,
      drillTestHighScores: {},
    };
    setUser(resetUser);
  };

  const exportProgressJSON = (): string => {
    return JSON.stringify(user, null, 2);
  };

  const importProgressJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString) as UserAccount;
      if (parsed.id && parsed.currentRankId) {
        setUser(parsed);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    return false;
  };

  // User is authenticated if they logged in with Google AND finished their cadet onboarding
  const isAuthenticated = Boolean(user && user.isGoogleAuth && user.onboardingCompleted);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isGoogleModalOpen,
        setIsGoogleModalOpen,
        isOnboardingModalOpen,
        setIsOnboardingModalOpen,
        loginWithGoogle,
        logoutGoogle,
        completeOnboarding,
        updateProfile,
        login,
        signup,
        logout,
        createGuestAccount,
        recordScenarioCompletion,
        toggleGoal,
        addGoal,
        toggleFirstYearTask,
        setOathMastered,
        recordDrillScore,
        resetProgress,
        exportProgressJSON,
        importProgressJSON,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
