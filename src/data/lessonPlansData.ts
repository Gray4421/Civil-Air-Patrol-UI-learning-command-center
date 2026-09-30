import { CadetRankId } from '../types';

export interface LevelUpRequirement {
  id: string;
  category: 'Leadership' | 'Aerospace' | 'Drill' | 'Fitness' | 'Character' | 'Milestone Special';
  title: string;
  description: string;
  passingStandard: string;
  officialReference: string;
  recommendedPrepTimeWeeks: number;
}

export interface OfficialResource {
  id: string;
  title: string;
  code: string;
  type: 'Pamphlet' | 'Textbook' | 'Manual' | 'Practical Test' | 'Interactive Portal';
  description: string;
  chapterOrModule: string;
  keyConcepts: string[];
}

export interface LessonPlanWeek {
  weekNumber: number;
  theme: string;
  focusArea: 'Leadership' | 'Aerospace' | 'Drill' | 'Fitness' | 'Character' | 'Inspection' | 'Milestone Special';
  objective: string;
  tasks: {
    id: string;
    label: string;
    resourceName: string;
    resourceRef: string;
    estimatedMinutes: number;
    practicalAction: string;
  }[];
}

export interface BoardReviewQuestion {
  question: string;
  expectedAnswerDoctrine: string;
  doctrineReference: string;
}

export interface RankLessonPlan {
  currentRankId: CadetRankId;
  targetRankId: CadetRankId;
  targetRankName: string;
  targetAbbreviation: string;
  targetAchievementName: string;
  targetRibbonName?: string;
  targetRibbonColors?: string[];
  targetInsignia: string;
  phase: number;
  minimumTimeInGradeDays: number;
  honorPointsRequired: number;
  summaryQuote: string;
  overview: string;
  levelUpRequirements: LevelUpRequirement[];
  resources: OfficialResource[];
  weeklySyllabus: LessonPlanWeek[];
  drillExamTips: string[];
  boardReviewQuestions: BoardReviewQuestion[];
}

export const RANK_LESSON_PLANS: Record<CadetRankId, RankLessonPlan> = {
  // -------------------------------------------------------------
  // C/AB -> C/Amn (Achievement 1 - Curry)
  // -------------------------------------------------------------
  c_ab: {
    currentRankId: 'c_ab',
    targetRankId: 'c_amn',
    targetRankName: 'Cadet Airman',
    targetAbbreviation: 'C/Amn',
    targetAchievementName: 'Achievement 1 - Maj Gen John F. Curry',
    targetRibbonName: 'Maj Gen John F. Curry Ribbon',
    targetRibbonColors: ['#0f3460', '#e94560', '#ffffff', '#e94560', '#0f3460'],
    targetInsignia: 'Chevron of 1 downward stripe with silver Air Force star',
    phase: 1,
    minimumTimeInGradeDays: 14,
    honorPointsRequired: 200,
    summaryQuote: '"First we learn to follow, then we lead." — CAP Cadet Creed',
    overview:
      'Transition from new trainee to accredited Cadet Airman. Master followership, uniform gig-line wear, basic in-place drill commands, the Cadet Oath, and physical fitness baselines under CAPP 60-20 and Learn to Lead Vol 1.',
    levelUpRequirements: [
      {
        id: 'curry_ldr',
        category: 'Leadership',
        title: 'Learn to Lead Chapter 1 Exam',
        description: 'Complete Learn to Lead Chapter 1 (Being a Cadet: Core Values, Oath, Chain of Command, and Military Customs).',
        passingStandard: 'Score 80% or higher on online eServices / Cadet Interactive open-book test.',
        officialReference: 'Learn to Lead Volume 1, Chapter 1',
        recommendedPrepTimeWeeks: 2,
      },
      {
        id: 'curry_drill',
        category: 'Drill',
        title: 'CAPP 60-34 Drill Practical Test 1',
        description: 'Demonstrate proficiency in basic in-place military drill commands executed by an element leader.',
        passingStandard: 'Perform Position of Attention, Parade Rest, At Ease, Rest, Right/Left/About Face, Hand Salute, and Present Arms with zero balance breaks.',
        officialReference: 'CAPP 60-34 (Drill and Ceremonies Practical Tests), Test 1',
        recommendedPrepTimeWeeks: 3,
      },
      {
        id: 'curry_aero',
        category: 'Aerospace',
        title: 'Aerospace Orientation',
        description: 'No written aerospace test is required for Achievement 1. Schedule your first Orientation Flight with your squadron operations officer.',
        passingStandard: 'Introductory orientation (completed before or shortly after earning Curry).',
        officialReference: 'CAPP 60-40 (Cadet Orientation Flight Syllabus)',
        recommendedPrepTimeWeeks: 1,
      },
      {
        id: 'curry_fitness',
        category: 'Fitness',
        title: 'Cadet Physical Fitness Test (CPFT) Baseline',
        description: 'Participate in all 4 events of the Cadet Physical Fitness Test to establish your personal fitness baseline.',
        passingStandard: 'Full participation in the 1-Mile Run or PACER, Push-ups, Curl-ups, and Sit-and-Reach.',
        officialReference: 'CAPP 60-50 (Cadet Physical Fitness Program)',
        recommendedPrepTimeWeeks: 2,
      },
      {
        id: 'curry_char',
        category: 'Character',
        title: 'Character Development Forum & Cadet Wingman',
        description: 'Attend one Character Development session led by the Chaplain or Moral Leadership Officer, and complete Cadet Welcome / Wingman Safety course.',
        passingStandard: 'Active, respectful participation recorded on Form 50-1.',
        officialReference: 'CAPP 60-12 (Character Development Forum)',
        recommendedPrepTimeWeeks: 1,
      },
    ],
    resources: [
      {
        id: 'res_capp60_20',
        title: 'New Cadet Guide',
        code: 'CAPP 60-20',
        type: 'Pamphlet',
        description: 'The definitive handbook for starting your cadet journey, uniform setup, and insignia placement.',
        chapterOrModule: 'Chapters 1, 2, & 3',
        keyConcepts: ['Cadet Oath', 'Chain of Command', 'Grade Insignia', 'Blues & ABU Uniforms', 'Customs and Courtesies'],
      },
      {
        id: 'res_l2l_1',
        title: 'Learn to Lead: Personal Leadership (Volume 1)',
        code: 'L2L Vol 1',
        type: 'Textbook',
        description: 'Foundational leadership manual focusing on followership, self-discipline, and core values.',
        chapterOrModule: 'Chapter 1: "Being a Cadet"',
        keyConcepts: ['Integrity First', 'Volunteer Service', 'Excellence in All We Do', 'Respect', 'Saluting Protocol', 'Reporting to an Officer'],
      },
      {
        id: 'res_drill_test1',
        title: 'Drill Practical Tests Handbook',
        code: 'CAPP 60-34',
        type: 'Practical Test',
        description: 'Testing score sheet and instructions for Flight Staff administering the Curry drill test.',
        chapterOrModule: 'Drill Test 1: In-Place Movements',
        keyConcepts: ['Position of Attention', '45° heels', 'Thumbs along trouser seams', 'Snap about-face pivot on right heel & left toe'],
      },
      {
        id: 'res_capr39_1',
        title: 'Civil Air Patrol Uniform Regulation',
        code: 'CAPR 39-1',
        type: 'Manual',
        description: 'Official uniform specifications for Blues and utility uniforms.',
        chapterOrModule: 'Chapter 4 & Attachment 2',
        keyConcepts: ['Gig-line alignment', 'Ribbon rack centered 1/8" above left breast pocket', 'Nametag centered above right pocket'],
      },
    ],
    weeklySyllabus: [
      {
        weekNumber: 1,
        theme: 'Groundwork, Core Values & Uniform Fitting',
        focusArea: 'Inspection',
        objective: 'Memorize the Cadet Oath, inspect uniform alignment, and master the Position of Attention.',
        tasks: [
          {
            id: 'c1_w1_t1',
            label: 'Recite Cadet Oath from memory without notes',
            resourceName: 'CAPP 60-20 New Cadet Guide',
            resourceRef: 'Page 5',
            estimatedMinutes: 20,
            practicalAction: 'Practice reciting aloud in front of a mirror with correct posture.',
          },
          {
            id: 'c1_w1_t2',
            label: 'Check uniform gig-line and nametag alignment',
            resourceName: 'CAPR 39-1 Uniform Regulation',
            resourceRef: 'Attachment 2',
            estimatedMinutes: 30,
            practicalAction: 'Align shirt placket, belt buckle edge, and trouser fly seam in one straight line.',
          },
          {
            id: 'c1_w1_t3',
            label: 'Practice the Position of Attention & Parade Rest',
            resourceName: 'CAPP 60-34 Drill Test 1',
            resourceRef: 'Item 1 & 2',
            estimatedMinutes: 25,
            practicalAction: 'Heels together, 45-degree angle, head up, thumbs along trouser seams.',
          },
        ],
      },
      {
        weekNumber: 2,
        theme: 'Learn to Lead Chapter 1 & Facing Movements',
        focusArea: 'Leadership',
        objective: 'Complete reading of Learn to Lead Chapter 1 and master facing movements.',
        tasks: [
          {
            id: 'c1_w2_t1',
            label: 'Read Learn to Lead Chapter 1 sections on Followership',
            resourceName: 'L2L Volume 1',
            resourceRef: 'Chapter 1, Pages 10–25',
            estimatedMinutes: 45,
            practicalAction: 'Note the 4 Core Values and write 1 real-world example for each.',
          },
          {
            id: 'c1_w2_t2',
            label: 'Drill practice: Right Face, Left Face, and About Face',
            resourceName: 'CAPP 60-34 & Drill Simulator',
            resourceRef: 'Drill Test 1 Items 3–6',
            estimatedMinutes: 30,
            practicalAction: 'Execute 10 About-Faces pivoting smoothly on right heel and ball of left foot.',
          },
          {
            id: 'c1_w2_t3',
            label: 'Learn squadron chain of command (Element Leader to Squadron Commander)',
            resourceName: 'CAPP 60-20',
            resourceRef: 'Chapter 2',
            estimatedMinutes: 15,
            practicalAction: 'Write down names and ranks of your Flight Sergeant, Flight Commander, and Squadron Commander.',
          },
        ],
      },
      {
        weekNumber: 3,
        theme: 'Physical Fitness Baseline & Saluting Protocol',
        focusArea: 'Fitness',
        objective: 'Log baseline fitness figures and practice military customs and saluting.',
        tasks: [
          {
            id: 'c1_w3_t1',
            label: 'Practice push-ups and curl-ups to cadence',
            resourceName: 'CAPP 60-50 CPFT Guide',
            resourceRef: 'HFZ Standards Table',
            estimatedMinutes: 30,
            practicalAction: 'Perform 15 push-ups with 90-degree elbows and 20 curl-ups without lifting heels.',
          },
          {
            id: 'c1_w3_t2',
            label: 'Practice reporting to an officer: "Sir/Ma\'am, Cadet [Name] reports as ordered."',
            resourceName: 'L2L Vol 1',
            resourceRef: 'Customs & Courtesies Section',
            estimatedMinutes: 20,
            practicalAction: 'Halt two paces from desk, salute, deliver reporting phrase, hold salute until dropped.',
          },
          {
            id: 'c1_w3_t3',
            label: 'Participate in Squadron Character Development Forum',
            resourceName: 'CAPP 60-12',
            resourceRef: 'Monthly CDF Forum',
            estimatedMinutes: 60,
            practicalAction: 'Engage respectfully in discussion led by Chaplain or Moral Leadership Officer.',
          },
        ],
      },
      {
        weekNumber: 4,
        theme: 'Curry Exam, Drill Practical & Staff Review',
        focusArea: 'Drill',
        objective: 'Pass online Curry exam with 80%+, execute Drill Practical Test 1, and complete Form 50 review.',
        tasks: [
          {
            id: 'c1_w4_t1',
            label: 'Take Learn to Lead Chapter 1 Online Test in eServices',
            resourceName: 'Cadet Interactive / eServices',
            resourceRef: 'Curry Exam Module',
            estimatedMinutes: 40,
            practicalAction: 'Achieve 80% or higher. Review incorrect answers with your flight staff.',
          },
          {
            id: 'c1_w4_t2',
            label: 'Undergo CAPP 60-34 Practical Drill Test with Flight Commander',
            resourceName: 'CAPP 60-34',
            resourceRef: 'Score Sheet 1',
            estimatedMinutes: 15,
            practicalAction: 'Execute all 8 in-place commands upon verbal order without hesitation.',
          },
          {
            id: 'c1_w4_t3',
            label: 'Complete Cadet Promotion Review Board interview',
            resourceName: 'Squadron Staff Form 50-1',
            resourceRef: 'Cadet Promotion Board',
            estimatedMinutes: 15,
            practicalAction: 'Report in sharp Blues uniform, recite Cadet Oath, and answer board questions with confidence.',
          },
        ],
      },
    ],
    drillExamTips: [
      'Maintain an unbroken position of attention: eyes caged forward, chin level, zero fidgeting or head turning.',
      'On "About, FACE", carry the toe of your right foot about half a foot-length to the rear and slightly to the left of the left heel.',
      'Hand Salute: Smartly bring the tip of your right forefinger to the lower right brim of your headgear (or eyebrow if uncovered). Keep fingers extended and joined.',
      'Listen for the preparatory command and execute with snap on the command of execution ("Parade... REST!", "Flight... HALT!").',
    ],
    boardReviewQuestions: [
      {
        question: 'Recite the Civil Air Patrol Cadet Oath.',
        expectedAnswerDoctrine:
          '"I pledge that I will serve faithfully in the Civil Air Patrol Cadet Program, and that I will attend meetings regularly, participate actively in unit activities, obey my officers, wear my uniform properly, and advance my education and training rapidly to prepare myself to be of service to my community, state, and nation."',
        doctrineReference: 'CAPP 60-20 & Cadet Creed',
      },
      {
        question: 'What are the Four Core Values of Civil Air Patrol?',
        expectedAnswerDoctrine: 'Integrity First, Volunteer Service, Excellence in All We Do, and Respect.',
        doctrineReference: 'Learn to Lead Volume 1, Chapter 1',
      },
      {
        question: 'Who was Major General John F. Curry?',
        expectedAnswerDoctrine:
          'Maj Gen John F. Curry was an aviation pioneer and the very first national commander of Civil Air Patrol upon its founding on December 1, 1941.',
        doctrineReference: 'CAPP 60-20 Historical Annex',
      },
      {
        question: 'Describe the gig-line and why it is inspected.',
        expectedAnswerDoctrine:
          'The gig-line is the straight vertical line formed by the alignment of the shirt placket edge, the belt buckle edge, and the trouser fly seam. It reflects personal pride, attention to detail, and military discipline.',
        doctrineReference: 'CAPR 39-1 Chapter 4',
      },
    ],
  },

  // -------------------------------------------------------------
  // C/Amn -> C/A1C (Achievement 2 - Arnold)
  // -------------------------------------------------------------
  c_amn: {
    currentRankId: 'c_amn',
    targetRankId: 'c_a1c',
    targetRankName: 'Cadet Airman First Class',
    targetAbbreviation: 'C/A1C',
    targetAchievementName: 'Achievement 2 - Gen H.H. "Hap" Arnold',
    targetRibbonName: 'Gen H.H. "Hap" Arnold Ribbon',
    targetRibbonColors: ['#1b262c', '#0f4c81', '#f5a623', '#0f4c81', '#1b262c'],
    targetInsignia: 'Chevron of 2 downward stripes with silver star',
    phase: 1,
    minimumTimeInGradeDays: 56,
    honorPointsRequired: 500,
    summaryQuote: '"Leadership is the art of getting someone else to do something you want done because he wants to do it." — Dwight D. Eisenhower',
    overview:
      'Advance to Cadet Airman First Class. Complete Learn to Lead Chapter 2 (Critical Thinking & Time Management), start Aerospace Dimensions Module 1 (Introduction to Flight), and master marching movements in CAPP 60-34 Drill Test 2.',
    levelUpRequirements: [
      {
        id: 'arnold_ldr',
        category: 'Leadership',
        title: 'Learn to Lead Chapter 2 Exam',
        description: 'Complete Learn to Lead Chapter 2 on goal setting, time management, stress management, and critical thinking.',
        passingStandard: 'Score 80% or higher on eServices / Cadet Interactive module.',
        officialReference: 'Learn to Lead Volume 1, Chapter 2',
        recommendedPrepTimeWeeks: 3,
      },
      {
        id: 'arnold_aero',
        category: 'Aerospace',
        title: 'Aerospace Dimensions Module 1 Exam',
        description: 'Complete Aerospace Dimensions Module 1: Introduction to Flight (atmosphere, aerodynamics, 4 forces of flight, airfoils, and axes of control).',
        passingStandard: 'Score 80%+ on online module or open-book squadron test.',
        officialReference: 'Aerospace Dimensions Module 1',
        recommendedPrepTimeWeeks: 3,
      },
      {
        id: 'arnold_drill',
        category: 'Drill',
        title: 'CAPP 60-34 Drill Practical Test 2',
        description: 'Demonstrate precision in marching movements: Forward March, Halt, Column Right, Column Left, Flank Movements, and Rear March.',
        passingStandard: 'March in standard 24-inch step cadence (100–120 bpm) with correct arm swing and sharp pivot angles.',
        officialReference: 'CAPP 60-34 Test 2',
        recommendedPrepTimeWeeks: 4,
      },
      {
        id: 'arnold_fitness',
        category: 'Fitness',
        title: 'CPFT Benchmark Assessment',
        description: 'Participate in CPFT and meet Healthy Fitness Zone (HFZ) standard in at least 3 of 4 events.',
        passingStandard: 'HFZ standard achieved for your age/gender bracket.',
        officialReference: 'CAPP 60-50 CPFT',
        recommendedPrepTimeWeeks: 4,
      },
      {
        id: 'arnold_char',
        category: 'Character',
        title: 'Character Forum Participation',
        description: 'Attend one Character Development Forum led by squadron chaplain/moral leadership officer.',
        passingStandard: 'Logged attendance and discussion contribution.',
        officialReference: 'CAPP 60-12',
        recommendedPrepTimeWeeks: 1,
      },
    ],
    resources: [
      {
        id: 'res_l2l_2',
        title: 'Learn to Lead: Chapter 2',
        code: 'L2L Vol 1 Ch 2',
        type: 'Textbook',
        description: 'Covers the attitude of leadership, goals, time management matrix, and overcoming procrastination.',
        chapterOrModule: 'Chapter 2: "The Attitude of Leadership"',
        keyConcepts: ['SMART Goals', 'Urgent vs. Important Matrix', 'Defense Mechanisms', 'Critical Thinking Errors'],
      },
      {
        id: 'res_aero_mod1',
        title: 'Aerospace Dimensions: Introduction to Flight',
        code: 'AE Module 1',
        type: 'Textbook',
        description: 'Covers physical properties of the atmosphere, Bernoulli principle, Newton third law, and the 4 forces.',
        chapterOrModule: 'Module 1: Chapters 1–4',
        keyConcepts: ['Lift vs. Weight', 'Thrust vs. Drag', 'Airfoil shape & Camber', 'Angle of Attack & Stall', 'Pitch, Roll, Yaw'],
      },
      {
        id: 'res_drill_test2',
        title: 'Drill Practical Test 2',
        code: 'CAPP 60-34',
        type: 'Practical Test',
        description: 'Guidelines and execution sequence for element marching commands.',
        chapterOrModule: 'Drill Test 2: Marching Movements',
        keyConcepts: ['Forward, MARCH (step off on left foot)', 'Column Right/Left, MARCH', 'To the Rear, MARCH (two 180° pivots)', 'Right/Left Flank, MARCH'],
      },
    ],
    weeklySyllabus: [
      {
        weekNumber: 1,
        theme: 'Goal Setting, Time Management & Four Forces of Flight',
        focusArea: 'Aerospace',
        objective: 'Read L2L Chapter 2 and understand the 4 forces acting on an aircraft in equilibrium.',
        tasks: [
          {
            id: 'c2_w1_t1',
            label: 'Read L2L Chapter 2 on SMART Goals and Time Management',
            resourceName: 'L2L Vol 1 Ch 2',
            resourceRef: 'Pages 26–38',
            estimatedMinutes: 40,
            practicalAction: 'Write down 3 SMART goals for your CAP cadet career.',
          },
          {
            id: 'c2_w1_t2',
            label: 'Study Aerospace Module 1: The Four Forces of Flight',
            resourceName: 'AE Module 1',
            resourceRef: 'Pages 5–18',
            estimatedMinutes: 45,
            practicalAction: 'Diagram an airfoil in steady level flight showing Lift, Weight, Thrust, and Drag.',
          },
        ],
      },
      {
        weekNumber: 2,
        theme: 'Marching Step, Cadence, and Bernoullis Principle',
        focusArea: 'Drill',
        objective: 'Practice Forward March with 24-inch step and 6-inch arm swing.',
        tasks: [
          {
            id: 'c2_w2_t1',
            label: 'Practice Forward March and Halt with element leader',
            resourceName: 'CAPP 60-34 Drill Test 2',
            resourceRef: 'Item 1 & 2',
            estimatedMinutes: 30,
            practicalAction: 'Step off smartly with left foot on "MARCH". Maintain 100-120 steps per minute.',
          },
          {
            id: 'c2_w2_t2',
            label: 'Study aircraft axes of rotation: Longitudinal, Lateral, and Vertical',
            resourceName: 'AE Module 1',
            resourceRef: 'Chapter 3',
            estimatedMinutes: 35,
            practicalAction: 'Identify which flight control surface controls Pitch (elevators), Roll (ailerons), and Yaw (rudder).',
          },
        ],
      },
      {
        weekNumber: 3,
        theme: 'Flanks, Rear March & Online Aerospace Exam',
        focusArea: 'Aerospace',
        objective: 'Master flank turns and pass Aerospace Dimensions Module 1.',
        tasks: [
          {
            id: 'c2_w3_t1',
            label: 'Drill practice: Right Flank, Left Flank, and To the Rear March',
            resourceName: 'CAPP 60-34 Test 2 & Drill Simulator',
            resourceRef: 'Items 3–6',
            estimatedMinutes: 35,
            practicalAction: 'Practice calling command on the correct foot (Rear March called on right foot).',
          },
          {
            id: 'c2_w3_t2',
            label: 'Complete Aerospace Dimensions Module 1 Exam in eServices',
            resourceName: 'eServices Online Tests',
            resourceRef: 'AE Module 1 Test',
            estimatedMinutes: 40,
            practicalAction: 'Score 80% or higher.',
          },
        ],
      },
      {
        weekNumber: 4,
        theme: 'L2L Exam, Drill Evaluation & Promotion Board',
        focusArea: 'Leadership',
        objective: 'Pass L2L Chapter 2 exam, complete CAPP 60-34 Drill Test 2, and review with Flight Commander.',
        tasks: [
          {
            id: 'c2_w4_t1',
            label: 'Take Learn to Lead Chapter 2 Exam',
            resourceName: 'eServices / Cadet Interactive',
            resourceRef: 'Chapter 2 Module',
            estimatedMinutes: 40,
            practicalAction: 'Score 80%+ on time management and critical thinking questions.',
          },
          {
            id: 'c2_w4_t2',
            label: 'Execute CAPP 60-34 Practical Drill Test 2',
            resourceName: 'CAPP 60-34',
            resourceRef: 'Score Sheet 2',
            estimatedMinutes: 20,
            practicalAction: 'Perform marching sequence before flight staff with zero out-of-step occurrences.',
          },
          {
            id: 'c2_w4_t3',
            label: 'Pass Cadet Promotion Board interview for C/A1C',
            resourceName: 'Form 50-1',
            resourceRef: 'Squadron Board',
            estimatedMinutes: 15,
            practicalAction: 'Present polished uniform with Curry ribbon and answer Hap Arnold biographical questions.',
          },
        ],
      },
    ],
    drillExamTips: [
      'Forward March: Always step off with the left foot on the command of execution "MARCH".',
      'Maintain 24-inch paces measured from heel to heel, with arms swinging 6 inches to the front and 3 inches to the rear.',
      'To the Rear, MARCH is called as the right foot strikes the ground. Advance 1 step with left foot, pivot 180° to the right on balls of both feet, and step off with left foot.',
      'Column Right is called on the right foot; Column Left is called on the left foot.',
    ],
    boardReviewQuestions: [
      {
        question: 'Who was General of the Air Force Henry "Hap" Arnold?',
        expectedAnswerDoctrine:
          'Gen H.H. "Hap" Arnold was the commanding general of the U.S. Army Air Forces during World War II and the only person to hold five-star rank in both the U.S. Army and the U.S. Air Force.',
        doctrineReference: 'Learn to Lead Volume 1, Chapter 2 Annex',
      },
      {
        question: 'Explain the four forces acting on an airplane in unaccelerated flight.',
        expectedAnswerDoctrine:
          'Lift (generated by the wings acting upward), Weight (gravity pulling downward), Thrust (produced by engine pulling forward), and Drag (resistance acting rearward). In steady unaccelerated flight, Lift equals Weight and Thrust equals Drag.',
        doctrineReference: 'Aerospace Dimensions Module 1',
      },
      {
        question: 'What is the difference between urgent and important tasks according to time management theory?',
        expectedAnswerDoctrine:
          'Important tasks contribute directly to long-term goals and mission values, whereas urgent tasks demand immediate attention. Effective leaders spend time on important but non-urgent tasks (planning, studying, fitness) to avoid constant crisis management.',
        doctrineReference: 'Learn to Lead Volume 1, Chapter 2',
      },
    ],
  },

  // -------------------------------------------------------------
  // C/A1C -> C/SrA (Achievement 3 - Feik)
  // -------------------------------------------------------------
  c_a1c: {
    currentRankId: 'c_a1c',
    targetRankId: 'c_sra',
    targetRankName: 'Cadet Senior Airman',
    targetAbbreviation: 'C/SrA',
    targetAchievementName: 'Achievement 3 - Col Mary Feik',
    targetRibbonName: 'Col Mary Feik Ribbon',
    targetRibbonColors: ['#2b580c', '#f8b500', '#438a5e', '#f8b500', '#2b580c'],
    targetInsignia: 'Chevron of 3 downward stripes with silver star',
    phase: 1,
    minimumTimeInGradeDays: 56,
    honorPointsRequired: 850,
    summaryQuote: '"Excellence is not an exception, it is a prevailing attitude." — Gen Colin Powell',
    overview:
      'Earn your third chevron to become a Senior Airman. Complete Learn to Lead Chapter 3 (The Team & Conflict Resolution), Aerospace Dimensions Module 2 (Aircraft Systems & Propulsion), and CAPP 60-34 Drill Test 3 (Flight formation maneuvers and Open Ranks Inspection).',
    levelUpRequirements: [
      {
        id: 'feik_ldr',
        category: 'Leadership',
        title: 'Learn to Lead Chapter 3 Exam',
        description: 'Complete Learn to Lead Chapter 3 on team dynamics, diversity, conflict resolution, and communication.',
        passingStandard: 'Score 80%+ on eServices exam.',
        officialReference: 'Learn to Lead Volume 1, Chapter 3',
        recommendedPrepTimeWeeks: 3,
      },
      {
        id: 'feik_aero',
        category: 'Aerospace',
        title: 'Aerospace Dimensions Module 2 Exam',
        description: 'Pass Aerospace Dimensions Module 2: Aircraft Systems (piston & jet engines, electrical systems, flight instruments, pitot-static tube, and altimeter).',
        passingStandard: 'Score 80%+ on online or written test.',
        officialReference: 'Aerospace Dimensions Module 2',
        recommendedPrepTimeWeeks: 3,
      },
      {
        id: 'feik_drill',
        category: 'Drill',
        title: 'CAPP 60-34 Drill Practical Test 3',
        description: 'Execute flight formation drill, open ranks inspection alignment, and Eyes Right honoring passing officers.',
        passingStandard: 'Accurate execution of Open Ranks, MARCH and Dress Right, DRESS.',
        officialReference: 'CAPP 60-34 Test 3',
        recommendedPrepTimeWeeks: 4,
      },
      {
        id: 'feik_fitness',
        category: 'Fitness',
        title: 'CPFT Healthy Fitness Zone Verification',
        description: 'Meet Healthy Fitness Zone in the squadron quarterly fitness assessment.',
        passingStandard: 'HFZ in 3 of 4 events.',
        officialReference: 'CAPP 60-50',
        recommendedPrepTimeWeeks: 4,
      },
      {
        id: 'feik_char',
        category: 'Character',
        title: 'Character Development Forum',
        description: 'Attend one Character Development session.',
        passingStandard: 'Active participation logged.',
        officialReference: 'CAPP 60-12',
        recommendedPrepTimeWeeks: 1,
      },
    ],
    resources: [
      {
        id: 'res_l2l_3',
        title: 'Learn to Lead: Chapter 3',
        code: 'L2L Vol 1 Ch 3',
        type: 'Textbook',
        description: 'Team dynamics, constructive feedback, active listening, and resolving interpersonal friction.',
        chapterOrModule: 'Chapter 3: "The Team"',
        keyConcepts: ['Stages of Team Development (Forming, Storming, Norming, Performing)', 'Active Listening', 'Constructive Criticism', 'Handling Peer Pressure'],
      },
      {
        id: 'res_aero_mod2',
        title: 'Aerospace Dimensions: Aircraft Systems',
        code: 'AE Module 2',
        type: 'Textbook',
        description: 'Covers internal combustion engines, jet turbines, fuel, ignition, and flight instruments.',
        chapterOrModule: 'Module 2: Aircraft Systems',
        keyConcepts: ['Four-stroke engine cycle (Intake, Compression, Power, Exhaust)', 'Pitot-Static instruments (Airspeed, Altimeter, VSI)', 'Gyroscopic instruments (Attitude indicator, Heading indicator)'],
      },
      {
        id: 'res_drill_test3',
        title: 'Drill Practical Test 3',
        code: 'CAPP 60-34',
        type: 'Practical Test',
        description: 'Testing Open Ranks, Close Ranks, and Eyes Right.',
        chapterOrModule: 'Drill Test 3: Flight Drill & Inspection',
        keyConcepts: ['Open Ranks, MARCH', 'Dress Right, DRESS', 'Ready, FRONT', 'Close Ranks, MARCH', 'Eyes, RIGHT'],
      },
    ],
    weeklySyllabus: [
      {
        weekNumber: 1,
        theme: 'Team Dynamics & Aircraft Engine Systems',
        focusArea: 'Leadership',
        objective: 'Master Tuckman stages of team development and reciprocating aircraft engine mechanics.',
        tasks: [
          {
            id: 'c3_w1_t1',
            label: 'Read Learn to Lead Chapter 3 on Team Leadership',
            resourceName: 'L2L Vol 1 Ch 3',
            resourceRef: 'Pages 40–54',
            estimatedMinutes: 45,
            practicalAction: 'Define the 4 stages of team growth: Forming, Storming, Norming, and Performing.',
          },
          {
            id: 'c3_w1_t2',
            label: 'Study 4-stroke internal combustion engine cycle',
            resourceName: 'AE Module 2',
            resourceRef: 'Pages 8–20',
            estimatedMinutes: 40,
            practicalAction: 'Memorize the 4 strokes: Intake, Compression, Power, and Exhaust.',
          },
        ],
      },
      {
        weekNumber: 2,
        theme: 'Pitot-Static System, Gyros & Open Ranks Drill',
        focusArea: 'Drill',
        objective: 'Master flight instruments and Open Ranks inspection commands.',
        tasks: [
          {
            id: 'c3_w2_t1',
            label: 'Practice Open Ranks MARCH and Dress Right DRESS in flight',
            resourceName: 'CAPP 60-34 Test 3',
            resourceRef: 'Section 1',
            estimatedMinutes: 30,
            practicalAction: 'First rank takes 2 paces forward, second rank takes 1 pace, third rank stands fast, fourth takes 2 paces back.',
          },
          {
            id: 'c3_w2_t2',
            label: 'Study pitot-static instruments vs gyroscopic instruments',
            resourceName: 'AE Module 2',
            resourceRef: 'Chapter 3',
            estimatedMinutes: 35,
            practicalAction: 'Identify how an altimeter uses barometric pressure to calculate altitude above sea level.',
          },
        ],
      },
      {
        weekNumber: 3,
        theme: 'Conflict Resolution & Aerospace Online Exam',
        focusArea: 'Aerospace',
        objective: 'Pass Aerospace Module 2 exam and practice resolving team disputes constructively.',
        tasks: [
          {
            id: 'c3_w3_t1',
            label: 'Study L2L Chapter 3 on handling team conflict',
            resourceName: 'L2L Vol 1 Ch 3',
            resourceRef: 'Pages 55–65',
            estimatedMinutes: 30,
            practicalAction: 'Review the 5 conflict resolution styles: Competing, Avoiding, Accommodating, Compromising, and Collaborating.',
          },
          {
            id: 'c3_w3_t2',
            label: 'Take Aerospace Dimensions Module 2 Exam',
            resourceName: 'eServices Online Test',
            resourceRef: 'AE Module 2',
            estimatedMinutes: 40,
            practicalAction: 'Pass with 80% or higher.',
          },
        ],
      },
      {
        weekNumber: 4,
        theme: 'L2L Chapter 3 Exam, Drill Test 3 & Promotion Board',
        focusArea: 'Leadership',
        objective: 'Complete written and practical tests for Achievement 3 and prepare for NCO transition.',
        tasks: [
          {
            id: 'c3_w4_t1',
            label: 'Take Learn to Lead Chapter 3 Exam in eServices',
            resourceName: 'eServices Cadet Interactive',
            resourceRef: 'L2L Ch 3 Exam',
            estimatedMinutes: 40,
            practicalAction: 'Achieve 80%+ score.',
          },
          {
            id: 'c3_w4_t2',
            label: 'Execute CAPP 60-34 Practical Drill Test 3 with Flight Staff',
            resourceName: 'CAPP 60-34',
            resourceRef: 'Score Sheet 3',
            estimatedMinutes: 20,
            practicalAction: 'Accurately align flight in Open Ranks and demonstrate Eyes Right with crisp head snap.',
          },
          {
            id: 'c3_w4_t3',
            label: 'Complete Promotion Board interview for Cadet Senior Airman',
            resourceName: 'Form 50-1',
            resourceRef: 'Squadron Board',
            estimatedMinutes: 15,
            practicalAction: 'Discuss the pioneer legacy of Col Mary Feik and your readiness to prepare for NCO school.',
          },
        ],
      },
    ],
    drillExamTips: [
      'On "Open Ranks, MARCH": 1st element takes 2 paces forward, 2nd element takes 1 pace, 3rd stands fast, 4th takes 2 paces backward.',
      'Immediately after taking paces, automatically execute "Dress Right, DRESS" without verbal command.',
      'On "Eyes, RIGHT": Look 45° to the right with a smart snap of the head, except for the rightmost file who keep eyes caged forward to maintain direction.',
    ],
    boardReviewQuestions: [
      {
        question: 'Who was Colonel Mary Feik?',
        expectedAnswerDoctrine:
          'Col Mary Feik was a legendary aviation engineer who overhauled military aircraft engines during WWII, became the first woman engineer in Air Technical Service Command, and personally taught thousands of CAP cadets nationwide.',
        doctrineReference: 'CAPP 60-20 & Feik Achievement Profile',
      },
      {
        question: 'Name the four strokes of an internal combustion aircraft engine.',
        expectedAnswerDoctrine:
          'Intake (draws fuel/air mixture into cylinder), Compression (piston compresses mixture), Power (spark plug ignites mixture, driving piston down), and Exhaust (piston pushes burned gases out).',
        doctrineReference: 'Aerospace Dimensions Module 2',
      },
      {
        question: 'What are the four stages of team development described by Bruce Tuckman?',
        expectedAnswerDoctrine:
          'Forming (team meets and sets ground rules), Storming (conflict emerges as personalities clash), Norming (team establishes shared norms and cohesion), and Performing (team works smoothly toward achieving objectives).',
        doctrineReference: 'Learn to Lead Volume 1, Chapter 3',
      },
    ],
  },

  // -------------------------------------------------------------
  // C/SrA -> C/SSgt (Milestone 1 - Wright Brothers Award)
  // -------------------------------------------------------------
  c_sra: {
    currentRankId: 'c_sra',
    targetRankId: 'c_ssgt',
    targetRankName: 'Cadet Staff Sergeant',
    targetAbbreviation: 'C/SSgt',
    targetAchievementName: 'Milestone 1 - Wright Brothers Award',
    targetRibbonName: 'Wright Brothers Award Ribbon',
    targetRibbonColors: ['#003366', '#d4af37', '#ffffff', '#d4af37', '#003366'],
    targetInsignia: 'Chevron of 4 stripes (3 lower + 1 inverted on top)',
    phase: 2,
    minimumTimeInGradeDays: 56,
    honorPointsRequired: 1250,
    summaryQuote: '"The Non-Commissioned Officer is the backbone of the military." — General George Washington',
    overview:
      'CROSS THE THRESHOLD INTO THE NCO CORPS. Pass the closed-book Wright Brothers Comprehensive Leadership Exam (covering Learn to Lead Vol 1, Chapters 1–3), score 100% on CPFT Healthy Fitness Zone, execute Phase I Comprehensive Drill Test, and take on your first formal leadership role as Element Leader or Flight Sergeant.',
    levelUpRequirements: [
      {
        id: 'wright_exam',
        category: 'Milestone Special',
        title: 'Wright Brothers Comprehensive Leadership Exam',
        description: 'Pass the closed-book, proctored comprehensive exam covering Learn to Lead Volume 1 (Chapters 1, 2, and 3).',
        passingStandard: 'Score 80% or higher (closed-book proctored on eServices or paper).',
        officialReference: 'Learn to Lead Volume 1 Comprehensive',
        recommendedPrepTimeWeeks: 4,
      },
      {
        id: 'wright_drill',
        category: 'Drill',
        title: 'Phase I Comprehensive Drill Test',
        description: 'Demonstrate total mastery of all Phase I drill commands and command an element on the drill pad.',
        passingStandard: 'Flawless execution of all in-place and marching commands, calling cadence, and directing element maneuvers.',
        officialReference: 'CAPP 60-34 Phase I Drill Practical Exam',
        recommendedPrepTimeWeeks: 4,
      },
      {
        id: 'wright_fitness',
        category: 'Fitness',
        title: 'CPFT Healthy Fitness Zone (HFZ) Mandatory Pass',
        description: 'Must meet HFZ standards in all 4 physical fitness categories (mile run/pacer, push-ups, curl-ups, sit-and-reach).',
        passingStandard: 'Pass HFZ across all 4 events.',
        officialReference: 'CAPP 60-50',
        recommendedPrepTimeWeeks: 4,
      },
      {
        id: 'wright_char',
        category: 'Character',
        title: 'Character Development & NCO Readiness',
        description: 'Attend Character Development Forum and participate in NCO transition interview with Squadron Commander.',
        passingStandard: 'Recommendation of Cadet Flight Commander and approval of Squadron Commander.',
        officialReference: 'CAPP 60-12 & CAPR 60-1',
        recommendedPrepTimeWeeks: 2,
      },
    ],
    resources: [
      {
        id: 'res_l2l_vol1_comp',
        title: 'Learn to Lead Volume 1 (Comprehensive Review)',
        code: 'L2L Vol 1',
        type: 'Textbook',
        description: 'Chapters 1, 2, and 3: Followership, Attitude, Time Management, and Team Dynamics.',
        chapterOrModule: 'Complete Volume 1',
        keyConcepts: ['Followership vs. Leadership', 'Cadet Oath', 'Core Values', 'SMART Goals', 'Conflict Management', 'Listening Skills'],
      },
      {
        id: 'res_wright_drill_comp',
        title: 'Phase I Comprehensive Drill Practical',
        code: 'CAPP 60-34',
        type: 'Practical Test',
        description: 'Score sheet covering all marching and in-place movements from Drill Tests 1, 2, and 3.',
        chapterOrModule: 'Phase I Comprehensive Drill Sheet',
        keyConcepts: ['Voice inflection', 'Command voice diaphragm projection', 'Calling commands on correct foot', 'Leading an element'],
      },
      {
        id: 'res_afman_drill',
        title: 'USAF Drill & Ceremonies Manual',
        code: 'AFMAN 36-2203',
        type: 'Manual',
        description: 'The official Air Force drill manual used by Civil Air Patrol.',
        chapterOrModule: 'Chapters 1, 2, & 3',
        keyConcepts: ['Preparatory command & Command of execution', 'Interval vs. Distance', 'Cover and Alignment'],
      },
    ],
    weeklySyllabus: [
      {
        weekNumber: 1,
        theme: 'Volume 1 Comprehensive Review (Chapters 1 & 2)',
        focusArea: 'Leadership',
        objective: 'Review Followership, Core Values, Time Management, and SMART goals for the closed-book exam.',
        tasks: [
          {
            id: 'c4_w1_t1',
            label: 'Review Chapter 1: Core Values, Oath, and Military Customs',
            resourceName: 'L2L Vol 1',
            resourceRef: 'Chapter 1 Review Questions',
            estimatedMinutes: 45,
            practicalAction: 'Take a practice quiz on followership and Chain of Command hierarchy.',
          },
          {
            id: 'c4_w1_t2',
            label: 'Review Chapter 2: Time Management and Critical Thinking Errors',
            resourceName: 'L2L Vol 1',
            resourceRef: 'Chapter 2 Review',
            estimatedMinutes: 45,
            practicalAction: 'Practice identifying logical fallacies and stress management strategies.',
          },
        ],
      },
      {
        weekNumber: 2,
        theme: 'Volume 1 Chapter 3 Review & CPFT Conditioning',
        focusArea: 'Fitness',
        objective: 'Master Chapter 3 team concepts and achieve passing times on CPFT mile run.',
        tasks: [
          {
            id: 'c4_w2_t1',
            label: 'Review Chapter 3: Team dynamics, active listening, and conflict resolution',
            resourceName: 'L2L Vol 1',
            resourceRef: 'Chapter 3 Review',
            estimatedMinutes: 40,
            practicalAction: 'Explain the difference between constructive feedback and destructive criticism.',
          },
          {
            id: 'c4_w2_t2',
            label: 'Run timed mile and record push-ups for CPFT HFZ test',
            resourceName: 'CAPP 60-50',
            resourceRef: 'HFZ Milestone Standards',
            estimatedMinutes: 45,
            practicalAction: 'Hit target benchmark in all 4 fitness events under staff supervision.',
          },
        ],
      },
      {
        weekNumber: 3,
        theme: 'NCO Command Voice & Drill Leadership',
        focusArea: 'Drill',
        objective: 'Develop command voice and lead an element through Phase I marching movements.',
        tasks: [
          {
            id: 'c4_w3_t1',
            label: 'Practice command voice from diaphragm on drill pad',
            resourceName: 'AFMAN 36-2203',
            resourceRef: 'Chapter 2: Voice Characteristics',
            estimatedMinutes: 35,
            practicalAction: 'Project commands loudly with distinct snap and rising inflection without straining throat.',
          },
          {
            id: 'c4_w3_t2',
            label: 'Command an element through full Phase I drill routine',
            resourceName: 'CAPP 60-34',
            resourceRef: 'Phase I Comprehensive Routine',
            estimatedMinutes: 40,
            practicalAction: 'Lead element in column turns, flanks, rear march, and halts while calling cadence.',
          },
        ],
      },
      {
        weekNumber: 4,
        theme: 'Wright Brothers Exam, Drill Evaluation & NCO Board',
        focusArea: 'Milestone Special',
        objective: 'Pass proctored Wright Brothers Exam, pass Phase I Drill Test, and complete promotion board.',
        tasks: [
          {
            id: 'c4_w4_t1',
            label: 'Take proctored closed-book Wright Brothers Leadership Exam',
            resourceName: 'eServices Testing Portal',
            resourceRef: 'Wright Brothers Milestone Exam',
            estimatedMinutes: 60,
            practicalAction: 'Score 80%+ on closed-book 30-question milestone examination.',
          },
          {
            id: 'c4_w4_t2',
            label: 'Pass Phase I Comprehensive Practical Drill Test',
            resourceName: 'CAPP 60-34',
            resourceRef: 'Phase I Score Sheet',
            estimatedMinutes: 25,
            practicalAction: 'Score 80%+ commanding and marching on the drill pad.',
          },
          {
            id: 'c4_w4_t3',
            label: 'Complete Squadron Commander Promotion Board for Cadet Staff Sergeant',
            resourceName: 'Form 50-1',
            resourceRef: 'Milestone 1 Board',
            estimatedMinutes: 20,
            practicalAction: 'Articulate transition from follower to NCO leader and earn your 4th chevron and Wright Brothers ribbon!',
          },
        ],
      },
    ],
    drillExamTips: [
      'As an NCO, you must master the command voice: Snap, Loudness, Projection, Distinctness, and Inflection.',
      'Always call commands of execution on the foot corresponding to the direction of the turn (Right Flank on right foot, Left Flank on left foot).',
      'When leading an element, march at the head of the column or 3 paces to the flank, maintaining military bearing.',
    ],
    boardReviewQuestions: [
      {
        question: 'Who were Orville and Wilbur Wright and what did they achieve on December 17, 1903?',
        expectedAnswerDoctrine:
          'The Wright Brothers were American aviation pioneers who achieved the first controlled, powered, heavier-than-air flight at Kill Devil Hills near Kitty Hawk, North Carolina. Orville flew the Flyer 120 feet in 12 seconds.',
        doctrineReference: 'Learn to Lead Volume 1 Historical Milestone Profile',
      },
      {
        question: 'What is the primary role of a Non-Commissioned Officer (NCO)?',
        expectedAnswerDoctrine:
          'An NCO is the frontline trainer, mentor, and disciplinarian of cadets. NCOs enforce uniform and drill standards, look out for the welfare of airmen, and translate officer intent into direct action.',
        doctrineReference: 'Learn to Lead Volume 2, Chapter 4',
      },
      {
        question: 'What is the difference between a closed-book milestone exam and an achievement test?',
        expectedAnswerDoctrine:
          'Milestone exams test comprehensive mastery across entire volumes without reference materials to prove readiness to advance in leadership tier, whereas achievement tests assess individual chapter concepts.',
        doctrineReference: 'CAPR 60-1 Cadet Program Management',
      },
    ],
  },

  // -------------------------------------------------------------
  // Phase II NCO & Phase III Officer Default Fallback Generator
  // -------------------------------------------------------------
  c_ssgt: {
    currentRankId: 'c_ssgt',
    targetRankId: 'c_tsgt',
    targetRankName: 'Cadet Technical Sergeant',
    targetAbbreviation: 'C/TSgt',
    targetAchievementName: 'Achievement 4 - Capt Eddie Rickenbacker',
    targetRibbonName: 'Capt Eddie Rickenbacker Ribbon',
    targetRibbonColors: ['#b22222', '#ffffff', '#002060', '#ffffff', '#b22222'],
    targetInsignia: 'Chevron of 5 stripes (3 lower + 2 inverted on top)',
    phase: 2,
    minimumTimeInGradeDays: 56,
    honorPointsRequired: 1700,
    summaryQuote: '"Courage is doing what you are afraid to do. There can be no courage unless you are scared." — Capt Eddie Rickenbacker',
    overview:
      'Advance to Cadet Technical Sergeant. Study Learn to Lead Chapter 4 (The NCO as Leader & Disciplinarian), Aerospace Dimensions Module 3 (Air Environment & Weather Meteorology), and CAPP 60-34 Drill Test 4.',
    levelUpRequirements: [
      {
        id: 'rick_ldr',
        category: 'Leadership',
        title: 'Learn to Lead Chapter 4 Exam',
        description: 'Complete Learn to Lead Chapter 4 on NCO duties, positive discipline, and mentorship.',
        passingStandard: 'Score 80%+ on eServices exam.',
        officialReference: 'Learn to Lead Volume 2, Chapter 4',
        recommendedPrepTimeWeeks: 3,
      },
      {
        id: 'rick_aero',
        category: 'Aerospace',
        title: 'Aerospace Dimensions Module 3 Exam',
        description: 'Pass Aerospace Dimensions Module 3: Air Environment (weather, cloud formations, fronts, jet stream, and atmospheric pressure).',
        passingStandard: 'Score 80%+ on online test.',
        officialReference: 'Aerospace Dimensions Module 3',
        recommendedPrepTimeWeeks: 3,
      },
      {
        id: 'rick_drill',
        category: 'Drill',
        title: 'CAPP 60-34 Drill Practical Test 4',
        description: 'Lead a flight in formation maneuvers, route step, and column turns.',
        passingStandard: 'Demonstrate authoritative command voice and correct spacing.',
        officialReference: 'CAPP 60-34 Test 4',
        recommendedPrepTimeWeeks: 4,
      },
      {
        id: 'rick_fitness',
        category: 'Fitness',
        title: 'CPFT Physical Fitness',
        description: 'Meet Healthy Fitness Zone standard in squadron assessment.',
        passingStandard: 'Pass 3 of 4 CPFT events in HFZ.',
        officialReference: 'CAPP 60-50',
        recommendedPrepTimeWeeks: 3,
      },
      {
        id: 'rick_char',
        category: 'Character',
        title: 'Character Development Forum',
        description: 'Participate in squadron Character Development Forum.',
        passingStandard: 'Active discussion logged.',
        officialReference: 'CAPP 60-12',
        recommendedPrepTimeWeeks: 1,
      },
    ],
    resources: [
      {
        id: 'res_l2l_4',
        title: 'Learn to Lead: Chapter 4',
        code: 'L2L Vol 2 Ch 4',
        type: 'Textbook',
        description: 'The NCO Corps, authority, constructive discipline, and motivating airmen.',
        chapterOrModule: 'Chapter 4: "The NCO as Leader"',
        keyConcepts: ['Direct vs. Indirect Leadership', 'Constructive Discipline', 'Praise in Public, Counsel in Private', 'NCO Creed'],
      },
      {
        id: 'res_aero_mod3',
        title: 'Aerospace Dimensions: Air Environment',
        code: 'AE Module 3',
        type: 'Textbook',
        description: 'Aviation meteorology, atmospheric layers, air masses, Coriolis effect, and weather hazards.',
        chapterOrModule: 'Module 3: Air Environment',
        keyConcepts: ['Troposphere & Stratosphere', 'Cold Fronts vs. Warm Fronts', 'Thunderstorm lifecycle (Cumulus, Mature, Dissipating)', 'Altimeter setting & Isobars'],
      },
    ],
    weeklySyllabus: [
      {
        weekNumber: 1,
        theme: 'The NCO Role & Aviation Meteorology',
        focusArea: 'Leadership',
        objective: 'Understand NCO authority and how atmosphere dynamics affect flight safety.',
        tasks: [
          {
            id: 'c5_w1_t1',
            label: 'Read L2L Chapter 4 on Constructive Discipline',
            resourceName: 'L2L Vol 2 Ch 4',
            resourceRef: 'Pages 10–28',
            estimatedMinutes: 45,
            practicalAction: 'Draft a roleplay script counseling a junior airman on uniform inspection deficiencies.',
          },
          {
            id: 'c5_w1_t2',
            label: 'Study Aerospace Module 3: Atmospheric Layers and Isobars',
            resourceName: 'AE Module 3',
            resourceRef: 'Pages 5–22',
            estimatedMinutes: 40,
            practicalAction: 'Identify the troposphere and explain where nearly all weather occurs.',
          },
        ],
      },
      {
        weekNumber: 2,
        theme: 'Weather Fronts & Flight Drill Leadership',
        focusArea: 'Drill',
        objective: 'Master weather front characteristics and lead flight marching movements.',
        tasks: [
          {
            id: 'c5_w2_t1',
            label: 'Practice commanding a flight through column maneuvers',
            resourceName: 'CAPP 60-34 Drill Test 4',
            resourceRef: 'Test 4 Routine',
            estimatedMinutes: 35,
            practicalAction: 'Lead your element in Column Right, MARCH and Route Step MARCH.',
          },
          {
            id: 'c5_w2_t2',
            label: 'Study Cold Fronts, Warm Fronts, and Occluded Fronts',
            resourceName: 'AE Module 3',
            resourceRef: 'Chapter 3',
            estimatedMinutes: 35,
            practicalAction: 'Compare thunderstorm risks associated with fast-moving cold fronts.',
          },
        ],
      },
      {
        weekNumber: 3,
        theme: 'Aerospace Exam & Fitness Training',
        focusArea: 'Aerospace',
        objective: 'Pass Aerospace Module 3 and conduct CPFT conditioning.',
        tasks: [
          {
            id: 'c5_w3_t1',
            label: 'Take Aerospace Dimensions Module 3 Exam',
            resourceName: 'eServices Online Tests',
            resourceRef: 'AE Module 3',
            estimatedMinutes: 40,
            practicalAction: 'Score 80%+ on weather questions.',
          },
          {
            id: 'c5_w3_t2',
            label: 'Conduct squadron physical fitness session',
            resourceName: 'CAPP 60-50',
            resourceRef: 'HFZ Goals',
            estimatedMinutes: 40,
            practicalAction: 'Meet HFZ standards in mile run and push-ups.',
          },
        ],
      },
      {
        weekNumber: 4,
        theme: 'L2L Chapter 4 Exam, Drill Test & Promotion',
        focusArea: 'Leadership',
        objective: 'Pass L2L Chapter 4 exam and complete promotion review.',
        tasks: [
          {
            id: 'c5_w4_t1',
            label: 'Take Learn to Lead Chapter 4 Exam in eServices',
            resourceName: 'Cadet Interactive',
            resourceRef: 'Chapter 4',
            estimatedMinutes: 40,
            practicalAction: 'Score 80%+ on NCO leadership principles.',
          },
          {
            id: 'c5_w4_t2',
            label: 'Complete CAPP 60-34 Practical Drill Test 4',
            resourceName: 'CAPP 60-34',
            resourceRef: 'Score Sheet 4',
            estimatedMinutes: 20,
            practicalAction: 'Demonstrate confident flight command voice and posture.',
          },
          {
            id: 'c5_w4_t3',
            label: 'Pass Cadet Promotion Board for Technical Sergeant',
            resourceName: 'Form 50-1',
            resourceRef: 'Promotion Board',
            estimatedMinutes: 15,
            practicalAction: 'Explain the heroism of WWI Ace Capt Eddie Rickenbacker.',
          },
        ],
      },
    ],
    drillExamTips: [
      'When leading a flight, position yourself 3 paces in front of and centered on the flight.',
      'Always march at the standard cadence of 100 to 120 paces per minute.',
      'When executing Route Step, the cadence is not maintained, but silence and distance are preserved.',
    ],
    boardReviewQuestions: [
      {
        question: 'Who was Captain Eddie Rickenbacker?',
        expectedAnswerDoctrine:
          'Capt Eddie Rickenbacker was America\'s top "Ace of Aces" in World War I with 26 aerial victories, a Medal of Honor recipient, and later president of Eastern Air Lines.',
        doctrineReference: 'Learn to Lead Volume 2 Achievement 4 Profile',
      },
      {
        question: 'What are the three stages of a thunderstorm?',
        expectedAnswerDoctrine:
          '1. Cumulus stage (updrafts push moisture upward), 2. Mature stage (rain falls, creating downdrafts alongside updrafts, highest turbulence and lightning), 3. Dissipating stage (downdrafts dominate, storm weakens).',
        doctrineReference: 'Aerospace Dimensions Module 3',
      },
    ],
  },

  // Generative fallback for all remaining ranks
  c_tsgt: createGenericPlan('c_tsgt', 'c_msgt', 'Cadet Master Sergeant', 'C/MSgt', 'Achievement 5 - Charles Lindbergh', 2, 2200, 'Charles Lindbergh Ribbon', ['#1e3d59', '#17b978', '#ff6e40', '#17b978', '#1e3d59'], 'Chevron of 6 stripes (4 lower + 2 inverted)', 'Learn to Lead Chapter 5 (Communication & Public Speaking) and Aerospace Dimensions Module 4 (Rockets).'),
  c_msgt: createGenericPlan('c_msgt', 'c_smsgt', 'Cadet Senior Master Sergeant', 'C/SMSgt', 'Achievement 6 - Gen Jimmy Doolittle', 2, 2750, 'Gen Jimmy Doolittle Ribbon', ['#0b4f6c', '#01baef', '#fbfbff', '#01baef', '#0b4f6c'], 'Chevron of 7 stripes (5 lower + 2 inverted)', 'Learn to Lead Chapter 6 (Group Dynamics) and Aerospace Dimensions Module 5 (Space Environment).'),
  c_smsgt: createGenericPlan('c_smsgt', 'c_cmsgt', 'Cadet Chief Master Sergeant', 'C/CMSgt', 'Achievement 7 & 8 - Goddard & Armstrong', 2, 3350, 'Neil Armstrong Ribbon', ['#111d5e', '#c70039', '#f37121', '#c70039', '#111d5e'], 'Chevron of 8 stripes (6 lower + 2 inverted)', 'Learn to Lead Chapters 7 & 8 and Aerospace Dimensions Modules 6 & 7. Highest NCO rank preparing for the Mitchell Award.'),
  c_cmsgt: {
    currentRankId: 'c_cmsgt',
    targetRankId: 'c_2dlt',
    targetRankName: 'Cadet Second Lieutenant',
    targetAbbreviation: 'C/2d Lt',
    targetAchievementName: 'Milestone 2 - Gen Billy Mitchell Award',
    targetRibbonName: 'Gen Billy Mitchell Award Ribbon',
    targetRibbonColors: ['#00205b', '#c59b27', '#ffffff', '#c59b27', '#00205b'],
    targetInsignia: 'One silver pip (disc)',
    phase: 3,
    minimumTimeInGradeDays: 56,
    honorPointsRequired: 4000,
    summaryQuote: '"The only reason an aircraft takes to the air is to affect the battle on the ground." — Gen Billy Mitchell',
    overview:
      'BECOME A COMMISSIONED CADET OFFICER. Complete weeklong Encampment graduation, pass the 50-question closed-book Mitchell Leadership Exam (L2L Volumes 1 & 2), pass the 100-question Mitchell Aerospace Exam (Aerospace Dimensions Modules 1–7), pass CPFT, and step forward as Cadet Second Lieutenant.',
    levelUpRequirements: [
      {
        id: 'mitchell_encampment',
        category: 'Milestone Special',
        title: 'Cadet Encampment Graduation Prerequisite',
        description: 'Must have successfully graduated from an accredited weeklong Civil Air Patrol Cadet Encampment.',
        passingStandard: 'Official Form 50 Encampment graduation certificate recorded in eServices.',
        officialReference: 'CAPR 60-1 Cadet Program Management',
        recommendedPrepTimeWeeks: 8,
      },
      {
        id: 'mitchell_ldr_exam',
        category: 'Leadership',
        title: 'Mitchell Comprehensive Leadership Exam',
        description: 'Proctored closed-book exam covering Learn to Lead Volumes 1 and 2 (Chapters 1 through 8).',
        passingStandard: 'Score 80% or higher (50 questions, 60 minutes, closed-book).',
        officialReference: 'Learn to Lead Volumes 1 & 2',
        recommendedPrepTimeWeeks: 6,
      },
      {
        id: 'mitchell_aero_exam',
        category: 'Aerospace',
        title: 'Mitchell Comprehensive Aerospace Exam',
        description: 'Proctored closed-book exam covering all seven Aerospace Dimensions modules.',
        passingStandard: 'Score 80% or higher (100 questions, 90 minutes, closed-book).',
        officialReference: 'Aerospace Dimensions Modules 1–7',
        recommendedPrepTimeWeeks: 6,
      },
      {
        id: 'mitchell_fitness',
        category: 'Fitness',
        title: 'CPFT Mandatory Healthy Fitness Zone Pass',
        description: 'Must pass all 4 CPFT events in the Healthy Fitness Zone.',
        passingStandard: 'Pass 4 of 4 events.',
        officialReference: 'CAPP 60-50',
        recommendedPrepTimeWeeks: 4,
      },
      {
        id: 'mitchell_char',
        category: 'Character',
        title: 'Officer Ethics & Character Forum',
        description: 'Participate in officer ethics seminar and squadron commander appointment board.',
        passingStandard: 'Approval and recommendation of unit commander.',
        officialReference: 'CAPR 60-1',
        recommendedPrepTimeWeeks: 2,
      },
    ],
    resources: [
      {
        id: 'res_l2l_comp_mitchell',
        title: 'Learn to Lead Volumes 1 & 2',
        code: 'L2L Vols 1 & 2',
        type: 'Textbook',
        description: 'Comprehensive study of followership, NCO supervision, and team dynamics.',
        chapterOrModule: 'Chapters 1 through 8',
        keyConcepts: ['Core Values', 'Followership', 'NCO Duties', 'Communication', 'Counseling', 'Stress Management'],
      },
      {
        id: 'res_ae_all',
        title: 'Aerospace Dimensions Complete Series',
        code: 'AE Modules 1–7',
        type: 'Textbook',
        description: 'All 7 modules: Flight, Systems, Air Environment, Rockets, Space Environment, Space Exploration, and Cyber.',
        chapterOrModule: 'Modules 1 to 7',
        keyConcepts: ['Aerodynamics', 'Aircraft Engines', 'Weather Meteorology', 'Rocket Physics', 'Orbital Mechanics', 'Satellite Systems'],
      },
    ],
    weeklySyllabus: [
      {
        weekNumber: 1,
        theme: 'Encampment Credit & L2L Volume 1 Review',
        focusArea: 'Leadership',
        objective: 'Verify Encampment records and review foundational leadership chapters 1–4.',
        tasks: [
          {
            id: 'mitch_w1_t1',
            label: 'Review Learn to Lead Chapters 1 through 4',
            resourceName: 'L2L Volumes 1 & 2',
            resourceRef: 'Chapters 1–4',
            estimatedMinutes: 60,
            practicalAction: 'Take online practice quizzes on followership and NCO leadership.',
          },
        ],
      },
      {
        weekNumber: 2,
        theme: 'L2L Volume 2 Review (Chapters 5–8)',
        focusArea: 'Leadership',
        objective: 'Review communication, problem-solving, and counseling models.',
        tasks: [
          {
            id: 'mitch_w2_t1',
            label: 'Review Learn to Lead Chapters 5 through 8',
            resourceName: 'L2L Vol 2',
            resourceRef: 'Chapters 5–8',
            estimatedMinutes: 60,
            practicalAction: 'Practice situational leadership analysis scenarios.',
          },
        ],
      },
      {
        weekNumber: 3,
        theme: 'Aerospace Dimensions 7-Module Review',
        focusArea: 'Aerospace',
        objective: 'Review all 7 modules of Aerospace Dimensions for 100-question comprehensive exam.',
        tasks: [
          {
            id: 'mitch_w3_t1',
            label: 'Review Modules 1 through 4 (Flight, Systems, Environment, Rockets)',
            resourceName: 'AE Modules 1–4',
            resourceRef: 'Chapters 1–4',
            estimatedMinutes: 90,
            practicalAction: 'Review formulas for lift, thrust, and rocket thrust equations.',
          },
          {
            id: 'mitch_w3_t2',
            label: 'Review Modules 5 through 7 (Space & Cyber)',
            resourceName: 'AE Modules 5–7',
            resourceRef: 'Chapters 5–7',
            estimatedMinutes: 90,
            practicalAction: 'Study low earth orbit vs geostationary orbit parameters.',
          },
        ],
      },
      {
        weekNumber: 4,
        theme: 'Proctored Mitchell Examinations & Officer Appointment',
        focusArea: 'Milestone Special',
        objective: 'Pass both closed-book Mitchell exams and receive appointment as Cadet 2d Lieutenant.',
        tasks: [
          {
            id: 'mitch_w4_t1',
            label: 'Take proctored Mitchell Leadership Exam (closed-book)',
            resourceName: 'eServices Proctored Test',
            resourceRef: 'Mitchell Leadership Exam',
            estimatedMinutes: 60,
            practicalAction: 'Score 80%+ on 50 questions.',
          },
          {
            id: 'mitch_w4_t2',
            label: 'Take proctored Mitchell Aerospace Exam (closed-book)',
            resourceName: 'eServices Proctored Test',
            resourceRef: 'Mitchell Aerospace Exam',
            estimatedMinutes: 90,
            practicalAction: 'Score 80%+ on 100 questions.',
          },
          {
            id: 'mitch_w4_t3',
            label: 'Pass CPFT in Healthy Fitness Zone and complete promotion ceremony',
            resourceName: 'Form 50-1',
            resourceRef: 'Officer Appointment',
            estimatedMinutes: 30,
            practicalAction: 'Pin on your silver lieutenant pips and take the Cadet Officer Oath!',
          },
        ],
      },
    ],
    drillExamTips: [
      'Cadet Officers carry military bearing at all times and lead by example in dress, speech, and punctuality.',
      'Officers salute when reporting to superior officers and return salutes from enlisted cadets crisp and promptly.',
    ],
    boardReviewQuestions: [
      {
        question: 'Who was Brigadier General William "Billy" Mitchell?',
        expectedAnswerDoctrine:
          'Gen Billy Mitchell was a visionary military airpower pioneer whose demonstration of sinking battleships with aircraft in 1921 proved the dominance of aviation, leading to the creation of the independent United States Air Force.',
        doctrineReference: 'Learn to Lead Milestone 2 Profile',
      },
      {
        question: 'What military and educational benefits are earned through the Billy Mitchell Award?',
        expectedAnswerDoctrine:
          'Mitchell cadets are eligible for advanced enlistment rank of E-3 (Airman First Class) in the USAF, scholarship priority for AFROTC, and selection for national special activities (NCSA).',
        doctrineReference: 'CAPR 60-1 Chapter 5',
      },
    ],
  },
  c_2dlt: createOfficerPlan('c_2dlt', 'c_1stlt', 'Cadet First Lieutenant', 'C/1st Lt', 'Achievement 9 & 10', 3, 4700, 'Amelia Earhart Track Ribbon', ['#3b185f', '#a03c78', '#ed8e7c', '#a03c78', '#3b185f'], 'Two pips (silver discs)', 'Staff Duty Analysis (SDA) technical writing, oral briefings, and Journey of Flight.'),
  c_1stlt: createOfficerPlan('c_1stlt', 'c_capt', 'Cadet Captain', 'C/Capt', 'Milestone 3 - Amelia Earhart Award', 3, 5500, 'Amelia Earhart Ribbon', ['#142850', '#27496d', '#00909e', '#dae1e7', '#142850'], 'Three pips (silver discs)', 'Earhart Leadership Exam, Journey of Flight comprehensive, and eligibility for International Air Cadet Exchange (IACE).'),
  c_capt: createOfficerPlan('c_capt', 'c_maj', 'Cadet Major', 'C/Maj', 'Achievement 12 to 15', 4, 6400, 'Dr. Sally Ride Ribbon', ['#2c003e', '#512b58', '#fe346e', '#512b58', '#2c003e'], 'One diamond (silver rhombus)', 'Phase IV Executive leadership, Learn to Lead Volume 4, and squadron command staff duties.'),
  c_maj: createOfficerPlan('c_maj', 'c_ltcol', 'Cadet Lieutenant Colonel', 'C/Lt Col', 'Milestone 4 - Gen Ira C. Eaker Award', 4, 7400, 'Gen Ira C. Eaker Ribbon', ['#1f4068', '#162447', '#e43f5a', '#162447', '#1f4068'], 'Two diamonds (silver rhombi)', 'Completion of Cadet Officer School (COS) or Region Cadet Leadership School (RCLS), speech, and written essay.'),
  c_ltcol: createOfficerPlan('c_ltcol', 'c_col', 'Cadet Colonel', 'C/Col', 'Milestone 5 - Gen Carl A. Spaatz Award', 4, 8500, 'Gen Carl A. Spaatz Award Ribbon', ['#002b49', '#ffd100', '#ffffff', '#c8102e', '#002b49'], 'Three diamonds (silver rhombi)', 'The pinnacle cadet achievement earned by fewer than 0.5% of cadets. 4-part proctored examination (Leadership, Aerospace, CPFT, and timed Essay).'),
  c_col: createPinnaclePlan(),
};

function createGenericPlan(
  current: CadetRankId,
  target: CadetRankId,
  targetName: string,
  targetAbbr: string,
  achieveName: string,
  phase: number,
  points: number,
  ribbonName: string,
  ribbonColors: string[],
  insignia: string,
  summary: string
): RankLessonPlan {
  return {
    currentRankId: current,
    targetRankId: target,
    targetRankName: targetName,
    targetAbbreviation: targetAbbr,
    targetAchievementName: achieveName,
    targetRibbonName: ribbonName,
    targetRibbonColors: ribbonColors,
    targetInsignia: insignia,
    phase,
    minimumTimeInGradeDays: 56,
    honorPointsRequired: points,
    summaryQuote: '"Leadership is about making others better as a result of your presence and making sure that impact lasts in your absence."',
    overview: summary,
    levelUpRequirements: [
      {
        id: `${target}_ldr`,
        category: 'Leadership',
        title: `Learn to Lead Module Exam`,
        description: `Complete the required Learn to Lead volume chapter test for ${achieveName}.`,
        passingStandard: 'Score 80% or higher on eServices exam.',
        officialReference: 'Learn to Lead Volume 2',
        recommendedPrepTimeWeeks: 3,
      },
      {
        id: `${target}_aero`,
        category: 'Aerospace',
        title: `Aerospace Dimensions Module Exam`,
        description: `Complete the next Aerospace Dimensions module examination.`,
        passingStandard: 'Score 80% or higher.',
        officialReference: 'Aerospace Dimensions Modules 4–7',
        recommendedPrepTimeWeeks: 3,
      },
      {
        id: `${target}_drill`,
        category: 'Drill',
        title: `Practical Flight Drill Leadership`,
        description: 'Demonstrate commanding flight formations, squadron maneuvers, and drill discipline.',
        passingStandard: 'Satisfactory score on practical drill rubric.',
        officialReference: 'CAPP 60-34 & AFMAN 36-2203',
        recommendedPrepTimeWeeks: 4,
      },
      {
        id: `${target}_fitness`,
        category: 'Fitness',
        title: 'CPFT Assessment',
        description: 'Participate in physical fitness testing and strive for Healthy Fitness Zone.',
        passingStandard: 'Pass HFZ standards.',
        officialReference: 'CAPP 60-50',
        recommendedPrepTimeWeeks: 4,
      },
    ],
    resources: [
      {
        id: `res_${target}_l2l`,
        title: 'Learn to Lead (NCO Series)',
        code: 'L2L Vol 2',
        type: 'Textbook',
        description: 'NCO leadership principles, supervision, communications, and project planning.',
        chapterOrModule: 'Target Chapter',
        keyConcepts: ['Direct Leadership', 'Staff Work', 'Mentoring Junior Airmen', 'Cadet Honor Code'],
      },
      {
        id: `res_${target}_ae`,
        title: 'Aerospace Dimensions',
        code: 'AE Series',
        type: 'Textbook',
        description: 'Covers rocketry, space environment, space exploration, and cyber modules.',
        chapterOrModule: 'Target Module',
        keyConcepts: ['Aerospace Technology', 'Spaceflight Systems', 'Orbital Mechanics'],
      },
    ],
    weeklySyllabus: [
      {
        weekNumber: 1,
        theme: 'Leadership Reading & Goal Mapping',
        focusArea: 'Leadership',
        objective: 'Read assigned Learn to Lead chapter and review key terms.',
        tasks: [
          {
            id: `${target}_w1_t1`,
            label: 'Read assigned chapter in Learn to Lead Volume 2',
            resourceName: 'Learn to Lead Vol 2',
            resourceRef: 'Target Chapter',
            estimatedMinutes: 50,
            practicalAction: 'Take notes on leadership models and real-world case studies.',
          },
        ],
      },
      {
        weekNumber: 2,
        theme: 'Aerospace Science & Drill Commands',
        focusArea: 'Aerospace',
        objective: 'Study Aerospace Dimensions module and practice flight drill maneuvers.',
        tasks: [
          {
            id: `${target}_w2_t1`,
            label: 'Study Aerospace Dimensions module',
            resourceName: 'Aerospace Dimensions',
            resourceRef: 'Assigned Module',
            estimatedMinutes: 45,
            practicalAction: 'Complete end-of-chapter self-study questions.',
          },
        ],
      },
      {
        weekNumber: 3,
        theme: 'Online Testing & Physical Fitness',
        focusArea: 'Fitness',
        objective: 'Take aerospace exam online and log fitness scores.',
        tasks: [
          {
            id: `${target}_w3_t1`,
            label: 'Pass Aerospace online exam in eServices',
            resourceName: 'eServices Testing Portal',
            resourceRef: 'AE Module Test',
            estimatedMinutes: 40,
            practicalAction: 'Achieve 80%+ score.',
          },
        ],
      },
      {
        weekNumber: 4,
        theme: 'Leadership Exam & Promotion Review',
        focusArea: 'Leadership',
        objective: 'Pass leadership exam and complete promotion board.',
        tasks: [
          {
            id: `${target}_w4_t1`,
            label: 'Pass Learn to Lead online exam',
            resourceName: 'Cadet Interactive',
            resourceRef: 'Chapter Exam',
            estimatedMinutes: 40,
            practicalAction: 'Score 80%+ and prepare personnel record for squadron review.',
          },
        ],
      },
    ],
    drillExamTips: [
      'Maintain strong command voice and posture.',
      'Ensure proper interval (arm\'s length) and distance (40 inches) when commanding flight members.',
    ],
    boardReviewQuestions: [
      {
        question: `What are your primary duties as a ${targetName}?`,
        expectedAnswerDoctrine:
          'To set the example in personal conduct and uniform wear, mentor younger cadets, assist officers with flight operations, and lead element drills.',
        doctrineReference: 'Learn to Lead Volume 2',
      },
    ],
  };
}

function createOfficerPlan(
  current: CadetRankId,
  target: CadetRankId,
  targetName: string,
  targetAbbr: string,
  achieveName: string,
  phase: number,
  points: number,
  ribbonName: string,
  ribbonColors: string[],
  insignia: string,
  summary: string
): RankLessonPlan {
  return {
    currentRankId: current,
    targetRankId: target,
    targetRankName: targetName,
    targetAbbreviation: targetAbbr,
    targetAchievementName: achieveName,
    targetRibbonName: ribbonName,
    targetRibbonColors: ribbonColors,
    targetInsignia: insignia,
    phase,
    minimumTimeInGradeDays: 56,
    honorPointsRequired: points,
    summaryQuote: '"Officers eat last." — Military Leadership Maxim',
    overview: summary,
    levelUpRequirements: [
      {
        id: `${target}_sda`,
        category: 'Leadership',
        title: 'Staff Duty Analysis (SDA) / Executive Writing',
        description: 'Complete Staff Duty Analysis technical report and oral briefing to the squadron staff.',
        passingStandard: 'Satisfactory completion evaluated on Form 60-90.',
        officialReference: 'CAPP 60-31 (Cadet Staff Duty Analysis)',
        recommendedPrepTimeWeeks: 6,
      },
      {
        id: `${target}_aero`,
        category: 'Aerospace',
        title: 'Journey of Flight Aerospace Study',
        description: 'Complete comprehensive aerospace module from Journey of Flight textbook.',
        passingStandard: 'Score 80%+ on Journey of Flight chapter test.',
        officialReference: 'Journey of Flight',
        recommendedPrepTimeWeeks: 4,
      },
      {
        id: `${target}_fitness`,
        category: 'Fitness',
        title: 'Officer Physical Fitness Standard',
        description: 'Meet CPFT Healthy Fitness Zone benchmarks.',
        passingStandard: 'Pass CPFT events in HFZ.',
        officialReference: 'CAPP 60-50',
        recommendedPrepTimeWeeks: 4,
      },
    ],
    resources: [
      {
        id: `res_${target}_l2l_officer`,
        title: 'Learn to Lead: Volumes 3 & 4',
        code: 'L2L Vols 3 & 4',
        type: 'Textbook',
        description: 'Advanced command theory, organizational management, strategic communication, and executive ethics.',
        chapterOrModule: 'Target Volume Chapters',
        keyConcepts: ['Strategic Planning', 'Officer Ethics', 'Staff Duty Analysis', 'Executive Decision Making'],
      },
      {
        id: `res_${target}_jof`,
        title: 'Journey of Flight',
        code: 'Journey of Flight',
        type: 'Textbook',
        description: 'Comprehensive college-level aviation history, commercial aviation, and space exploration textbook.',
        chapterOrModule: 'Target Chapters',
        keyConcepts: ['Aviation History', 'Space Technology', 'Airpower Strategy'],
      },
    ],
    weeklySyllabus: [
      {
        weekNumber: 1,
        theme: 'Staff Duty Analysis (SDA) Selection & Research',
        focusArea: 'Leadership',
        objective: 'Select staff functional area (e.g., Admin, Logistics, Safety, Public Affairs) and research duties.',
        tasks: [
          {
            id: `${target}_w1_t1`,
            label: 'Review CAPP 60-31 Staff Duty Analysis guidelines',
            resourceName: 'CAPP 60-31',
            resourceRef: 'SDA Guide',
            estimatedMinutes: 60,
            practicalAction: 'Select staff officer specialty and interview a senior member mentor in that field.',
          },
        ],
      },
      {
        weekNumber: 2,
        theme: 'Technical Report Drafting',
        focusArea: 'Leadership',
        objective: 'Write 2-to-3 page technical report summarizing staff responsibilities and solutions.',
        tasks: [
          {
            id: `${target}_w2_t1`,
            label: 'Draft Staff Duty technical report using AFH 33-337 Tongue and Quill format',
            resourceName: 'AFH 33-337',
            resourceRef: 'Staff Memorandums',
            estimatedMinutes: 75,
            practicalAction: 'Submit draft to Deputy Commander for review.',
          },
        ],
      },
      {
        weekNumber: 3,
        theme: 'Oral Briefing & Aerospace Examination',
        focusArea: 'Aerospace',
        objective: 'Deliver 5-to-10 minute oral briefing to squadron staff and take Journey of Flight exam.',
        tasks: [
          {
            id: `${target}_w3_t1`,
            label: 'Deliver SDA oral briefing using visual aids',
            resourceName: 'CAPP 60-31',
            resourceRef: 'SDA Rubric',
            estimatedMinutes: 45,
            practicalAction: 'Present with professional slides and answer questions from senior staff.',
          },
        ],
      },
      {
        weekNumber: 4,
        theme: 'Fitness Evaluation & Executive Board',
        focusArea: 'Milestone Special',
        objective: 'Complete promotion evaluation board and pin on next grade.',
        tasks: [
          {
            id: `${target}_w4_t1`,
            label: 'Pass Officer Promotion Board Interview',
            resourceName: 'Form 50-1',
            resourceRef: 'Executive Board',
            estimatedMinutes: 20,
            practicalAction: 'Articulate command vision, mentor junior cadets, and receive promotion endorsement.',
          },
        ],
      },
    ],
    drillExamTips: [
      'Cadet officers conduct inspections rather than taking basic tests. Master the standards of CAPR 39-1 down to 1/16th of an inch.',
      'Maintain an encouraging, professional demeanor when inspecting junior airmen.',
    ],
    boardReviewQuestions: [
      {
        question: 'What is the purpose of the Staff Duty Analysis (SDA) in officer development?',
        expectedAnswerDoctrine:
          'SDA challenges cadet officers to perform real-world staff duties, write professional technical reports, and deliver executive briefings, preparing them for senior leadership in aerospace and military careers.',
        doctrineReference: 'CAPP 60-31 Cadet Staff Duty Analysis',
      },
    ],
  };
}

function createPinnaclePlan(): RankLessonPlan {
  return {
    currentRankId: 'c_col',
    targetRankId: 'c_col',
    targetRankName: 'Cadet Colonel (Spaatz Awarded)',
    targetAbbreviation: 'C/Col',
    targetAchievementName: 'Milestone 5 - Gen Carl A. Spaatz Award',
    targetRibbonName: 'Gen Carl A. Spaatz Award Ribbon',
    targetRibbonColors: ['#002b49', '#ffd100', '#ffffff', '#c8102e', '#002b49'],
    targetInsignia: 'Three silver diamonds (rhombi)',
    phase: 4,
    minimumTimeInGradeDays: 0,
    honorPointsRequired: 8500,
    summaryQuote: '"Never let the fear of striking out keep you from playing the game." — Babe Ruth',
    overview:
      'Pinnacle of the Civil Air Patrol Cadet Program. As a Cadet Colonel and Spaatz Award recipient, you have achieved what fewer than one-half of one percent of cadets achieve. Your tailored master syllabus focuses on executive mentoring, region/national staff leadership, and preparing your cadets to take your place.',
    levelUpRequirements: [
      {
        id: 'spaatz_mentor',
        category: 'Milestone Special',
        title: 'Executive Mentorship & Cadet Academy Staffing',
        description: 'Serve as Cadet Commander or Chief of Staff at Encampment or National Cadet Special Activity (NCSA).',
        passingStandard: 'Exemplary leadership evaluation from Wing/Region Commander.',
        officialReference: 'CAPR 60-1',
        recommendedPrepTimeWeeks: 12,
      },
    ],
    resources: [
      {
        id: 'res_spaatz_doctrine',
        title: 'Air Force Doctrine Document 1 (AFDD-1)',
        code: 'AFDD-1',
        type: 'Manual',
        description: 'Foundational airpower doctrine and strategic command.',
        chapterOrModule: 'Complete Manual',
        keyConcepts: ['Airpower Strategy', 'Strategic Leadership', 'Joint Warfare'],
      },
    ],
    weeklySyllabus: [
      {
        weekNumber: 1,
        theme: 'Executive Mentoring & Squadron Development',
        focusArea: 'Leadership',
        objective: 'Conduct leadership seminars for cadet officers and NCOs.',
        tasks: [
          {
            id: 'sp_w1_t1',
            label: 'Mentor junior cadet officers on mission planning and delegations',
            resourceName: 'L2L Vol 4',
            resourceRef: 'Executive Series',
            estimatedMinutes: 60,
            practicalAction: 'Hold 1-on-1 development sessions with your cadet flight commanders.',
          },
        ],
      },
    ],
    drillExamTips: [
      'Represent the Cadet Program at ceremonies, parades, and legislative presentations with flawless bearing.',
    ],
    boardReviewQuestions: [
      {
        question: 'Who was General Carl A. Spaatz?',
        expectedAnswerDoctrine:
          'Gen Carl A. "Tooey" Spaatz was a pioneer military aviator, commander of Strategic Air Forces in Europe and the Pacific during WWII, and the very first Chief of Staff of the United States Air Force.',
        doctrineReference: 'Milestone 5 Spaatz Award Profile',
      },
    ],
  };
}
