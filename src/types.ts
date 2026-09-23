export type CadetRankId =
  | 'c_ab'
  | 'c_amn'
  | 'c_a1c'
  | 'c_sra'
  | 'c_ssgt'
  | 'c_tsgt'
  | 'c_msgt'
  | 'c_smsgt'
  | 'c_cmsgt'
  | 'c_2dlt'
  | 'c_1stlt'
  | 'c_capt'
  | 'c_maj'
  | 'c_ltcol'
  | 'c_col';

export interface CadetRank {
  id: CadetRankId;
  name: string;
  abbreviation: string;
  tier: 'Cadet Airman' | 'NCO' | 'Company Grade Officer' | 'Field Grade Officer';
  achievementName?: string;
  insigniaDescription: string;
  addressTerm: string;
  phase: number;
  ribbonName?: string;
  ribbonColors?: string[];
  requiredHonorPoints: number;
}

export interface ScenarioOption {
  id: string;
  text: string;
  isBestCourse: boolean;
  scoreModifier: number; // e.g. 100 for best, 50 for acceptable, 0 for poor
  outcomeText: string;
  referenceQuote: string; // From CAPP 60-20, CAPP 60-34, or Learn to Lead
  coreValueDemonstrated?: 'Integrity First' | 'Volunteer Service' | 'Excellence in All We Do' | 'Respect';
}

export interface ScenarioStage {
  id: string;
  title: string;
  narration: string;
  speaker?: string;
  speakerRole?: string;
  promptQuestion: string;
  options: ScenarioOption[];
}

export interface Scenario {
  id: string;
  title: string;
  category: 'Core Values' | 'Customs & Courtesies' | 'Uniform & Grooming' | 'Flight Safety' | 'Emergency Services' | 'Drill & Ceremonies' | 'Leadership Theory' | 'Flag Etiquette';
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
  estimatedMinutes: number;
  coverImage: string;
  imageAlt: string;
  summary: string;
  learningObjectives: string[];
  stages: ScenarioStage[];
  recommendedAchievement: string;
}

export interface ScenarioResult {
  scenarioId: string;
  completedAt: string;
  score: number;
  maxScore: number;
  bestChoicesCount: number;
  totalStages: number;
  passed: boolean;
  earnedHonorCredit: boolean;
}

export interface CadetGoal {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  category: 'Promotion' | 'Activity' | 'Study' | 'Fitness';
  completed: boolean;
  createdAt: string;
}

export interface UserAccount {
  id: string;
  callsign: string;
  fullName: string;
  email: string;
  squadron: string;
  capId: string;
  avatarSeed: string;
  googleAvatar?: string;
  isGoogleAuth: boolean;
  onboardingCompleted: boolean;
  createdAt: string;
  currentRankId: CadetRankId;
  honorPoints: number;
  scenarioResults: Record<string, ScenarioResult>;
  earnedRibbonIds: string[];
  earnedBadgeIds?: string[];
  firstYearChecklist: {
    stayedOneYear: boolean;
    regularMeetings: boolean;
    saturdayEventsCount: number;
    completedOFlight: boolean;
    attendedEncampment: boolean;
    earnedWrightBrothers: boolean;
  };
  goals: CadetGoal[];
  oathMastered: boolean;
  drillTestHighScores: Record<string, number>;
}
