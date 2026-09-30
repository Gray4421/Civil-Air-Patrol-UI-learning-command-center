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

  // -------------------------------------------------------------
  // C/TSgt -> C/MSgt (Achievement 5 - Charles Lindbergh)
  // -------------------------------------------------------------
  c_tsgt: {
    currentRankId: 'c_tsgt',
    targetRankId: 'c_msgt',
    targetRankName: 'Cadet Master Sergeant',
    targetAbbreviation: 'C/MSgt',
    targetAchievementName: 'Achievement 5 - Charles Lindbergh',
    targetRibbonName: 'Charles Lindbergh Ribbon',
    targetRibbonColors: ['#1e3d59', '#17b978', '#ff6e40', '#17b978', '#1e3d59'],
    targetInsignia: 'Chevron of 6 stripes (4 lower + 2 inverted)',
    phase: 2,
    minimumTimeInGradeDays: 56,
    honorPointsRequired: 2200,
    summaryQuote: '"What kind of man would live where there is no daring? I don’t believe in taking foolish chances, but nothing can be accomplished without taking any chance at all." — Charles Lindbergh',
    overview:
      'Advance to Cadet Master Sergeant. Master Learn to Lead Chapter 5 (Communication: Speaking & Writing), Aerospace Dimensions Module 4 (Rockets), and CAPP 60-34 Drill Test 6 (Forming the Flight, Open Ranks, and Inspection of Personnel).',
    levelUpRequirements: [
      {
        id: 'lind_ldr',
        category: 'Leadership',
        title: 'Learn to Lead Chapter 5 Exam',
        description: 'Complete Learn to Lead Chapter 5 on the communication process, active listening, the rhetorical triangle (ethos, pathos, logos), and public speaking delivery methods.',
        passingStandard: 'Score 80% or higher on eServices / Cadet Interactive online test.',
        officialReference: 'Learn to Lead Volume 2, Chapter 5',
        recommendedPrepTimeWeeks: 3,
      },
      {
        id: 'lind_aero',
        category: 'Aerospace',
        title: 'Aerospace Dimensions Module 4 Exam',
        description: 'Pass Aerospace Dimensions Module 4: Rockets (history of rocketry, Robert Goddard, Newton’s 3rd Law of Motion, solid vs. liquid propellants, and rocket staging).',
        passingStandard: 'Score 80%+ on eServices online aerospace exam.',
        officialReference: 'Aerospace Dimensions Module 4',
        recommendedPrepTimeWeeks: 3,
      },
      {
        id: 'lind_drill',
        category: 'Drill',
        title: 'CAPP 60-34 Drill Practical Test 6',
        description: 'Demonstrate commanding a flight in forming up, executing Open Ranks MARCH, aligning the elements with Dress Right DRESS, conducting uniform inspections, and Close Ranks MARCH.',
        passingStandard: 'Flawless execution of Open Ranks / Close Ranks under CAPP 60-33 / CAPP 60-34 standards.',
        officialReference: 'CAPP 60-34 Test 6 & CAPP 60-33 Chapter 4',
        recommendedPrepTimeWeeks: 4,
      },
      {
        id: 'lind_fitness',
        category: 'Fitness',
        title: 'CPFT Benchmark Assessment',
        description: 'Participate in the Cadet Physical Fitness Test and meet Healthy Fitness Zone (HFZ) standards.',
        passingStandard: 'Pass HFZ standards in your age/gender bracket.',
        officialReference: 'CAPP 60-50 (Cadet Physical Fitness Program)',
        recommendedPrepTimeWeeks: 3,
      },
      {
        id: 'lind_char',
        category: 'Character',
        title: 'Character Development Forum',
        description: 'Participate actively in the squadron monthly Character Development Forum.',
        passingStandard: 'Active participation logged on Form 50-1.',
        officialReference: 'CAPP 60-12',
        recommendedPrepTimeWeeks: 1,
      },
    ],
    resources: [
      {
        id: 'res_l2l_ch5',
        title: 'Learn to Lead: Chapter 5 (Communication)',
        code: 'L2L Vol 2 Ch 5',
        type: 'Textbook',
        description: 'Covers the communication loop, overcoming barriers, active listening techniques, outlines, and speeches.',
        chapterOrModule: 'Chapter 5: "The Communication Process"',
        keyConcepts: ['Sender-Message-Receiver-Feedback', 'Active Listening vs Passive Hearing', 'Ethos, Pathos, Logos', 'Impromptu vs Extemporaneous Delivery', 'Outlining Speeches & Essays'],
      },
      {
        id: 'res_aero_mod4',
        title: 'Aerospace Dimensions: Rockets',
        code: 'AE Module 4',
        type: 'Textbook',
        description: 'Pioneers of rocketry, propulsion principles, solid vs liquid propellants, and orbital launch vehicles.',
        chapterOrModule: 'Module 4: Chapters 1–3',
        keyConcepts: ['Dr. Robert H. Goddard', 'Newton’s 3rd Law of Motion', 'Solid Propellants vs Liquid Fuel', 'Specific Impulse', 'Payload & Guidance Systems', 'Escape Velocity (25,000 mph)'],
      },
      {
        id: 'res_drill_test6',
        title: 'Drill Practical Test 6',
        code: 'CAPP 60-34',
        type: 'Practical Test',
        description: 'Inspection of personnel, forming the flight in line, interval spacing, and open ranks procedures.',
        chapterOrModule: 'Drill Test 6: In-Line Inspections',
        keyConcepts: ['Open Ranks, MARCH', 'Element spacing (1st element 2 paces, 2nd element 1 pace, 3rd stands fast, 4th steps back)', 'Ready, FRONT', 'Close Ranks, MARCH'],
      },
    ],
    weeklySyllabus: [
      {
        weekNumber: 1,
        theme: 'The Communication Process & Rocket History',
        focusArea: 'Leadership',
        objective: 'Study Learn to Lead Chapter 5 communication models and read the history of rocketry in Module 4.',
        tasks: [
          {
            id: 'c6_w1_t1',
            label: 'Read L2L Chapter 5: The Communication Process & Active Listening',
            resourceName: 'L2L Vol 2 Ch 5',
            resourceRef: 'Pages 5–20',
            estimatedMinutes: 45,
            practicalAction: 'Identify 3 communication filters or barriers in your flight and propose solutions.',
          },
          {
            id: 'c6_w1_t2',
            label: 'Study Aerospace Module 4: Early Rocket Pioneers (Goddard, Oberth, von Braun)',
            resourceName: 'AE Module 4',
            resourceRef: 'Pages 4–18',
            estimatedMinutes: 45,
            practicalAction: 'Diagram Goddard’s 1926 liquid-fueled rocket and explain why gasoline and liquid oxygen were used.',
          },
        ],
      },
      {
        weekNumber: 2,
        theme: 'Public Speaking Delivery & Rocket Physics',
        focusArea: 'Aerospace',
        objective: 'Prepare a 3-minute extemporaneous speech and study Newton’s Third Law in rocketry.',
        tasks: [
          {
            id: 'c6_w2_t1',
            label: 'Draft outline for a 3-minute speech on aerospace innovation',
            resourceName: 'L2L Vol 2 Ch 5',
            resourceRef: 'Speech Construction',
            estimatedMinutes: 40,
            practicalAction: 'Practice delivering the speech without reading a manuscript word-for-word.',
          },
          {
            id: 'c6_w2_t2',
            label: 'Study Solid vs. Liquid Propellants and Specific Impulse',
            resourceName: 'AE Module 4',
            resourceRef: 'Chapter 2',
            estimatedMinutes: 40,
            practicalAction: 'Compare advantages and disadvantages of solid rocket boosters vs liquid cryogenic engines.',
          },
        ],
      },
      {
        weekNumber: 3,
        theme: 'Open Ranks Command & Aerospace Testing',
        focusArea: 'Drill',
        objective: 'Master Open Ranks MARCH command counts and pass online Aerospace Module 4 test.',
        tasks: [
          {
            id: 'c6_w3_t1',
            label: 'Practice Open Ranks, MARCH and Close Ranks, MARCH on the drill field',
            resourceName: 'CAPP 60-34 Drill Test 6',
            resourceRef: 'Test 6 Protocol',
            estimatedMinutes: 45,
            practicalAction: 'Command a flight through Open Ranks, Dress Right DRESS, inspection walk-through, and Ready FRONT.',
          },
          {
            id: 'c6_w3_t2',
            label: 'Pass Aerospace Dimensions Module 4 online exam in eServices',
            resourceName: 'eServices Testing',
            resourceRef: 'AE Module 4',
            estimatedMinutes: 35,
            practicalAction: 'Score 80%+ on the 25-question aerospace exam.',
          },
        ],
      },
      {
        weekNumber: 4,
        theme: 'Leadership Exam & Promotion Review Board',
        focusArea: 'Leadership',
        objective: 'Pass Learn to Lead Chapter 5 exam and prepare uniform for C/MSgt promotion board.',
        tasks: [
          {
            id: 'c6_w4_t1',
            label: 'Pass Learn to Lead Chapter 5 online exam in eServices',
            resourceName: 'Cadet Interactive',
            resourceRef: 'Chapter 5 Exam',
            estimatedMinutes: 35,
            practicalAction: 'Score 80%+ on leadership communication test.',
          },
          {
            id: 'c6_w4_t2',
            label: 'Complete CPFT assessment and participate in promotion review board',
            resourceName: 'Form 50-1',
            resourceRef: 'Master Sergeant Board',
            estimatedMinutes: 30,
            practicalAction: 'Demonstrate commanding an in-line inspection and answer board questions on communication.',
          },
        ],
      },
    ],
    drillExamTips: [
      'On Open Ranks, MARCH: the first element takes two paces forward, second element takes one pace, third stands fast, and fourth takes two half-paces backward.',
      'Immediately call Dress Right, DRESS, align each element from 2 paces in front, and command Ready, FRONT before walking down the ranks.',
    ],
    boardReviewQuestions: [
      {
        question: 'Who was Charles Lindbergh and what historic feat did he accomplish in 1927?',
        expectedAnswerDoctrine:
          'Charles A. Lindbergh became an international hero in May 1927 when he completed the first solo, nonstop transatlantic airplane flight, piloting the Spirit of St. Louis from New York to Paris in 33.5 hours.',
        doctrineReference: 'Learn to Lead Achievement 5 Historical Profile',
      },
      {
        question: 'What are the 4 primary speech delivery methods according to Learn to Lead Chapter 5?',
        expectedAnswerDoctrine:
          '1. Impromptu (speaking with little or no preparation), 2. Extemporaneous (planned and outlined, delivered conversationally using brief notes), 3. Manuscript (reading word-for-word from a written text), and 4. Memorized (delivering a speech from memory without notes).',
        doctrineReference: 'Learn to Lead Volume 2, Chapter 5',
      },
      {
        question: 'How does Newton’s Third Law of Motion apply to rocket propulsion?',
        expectedAnswerDoctrine:
          'Newton’s Third Law states that for every action, there is an equal and opposite reaction. In a rocket, combustion gases expelled rearward at high velocity create an equal forward reaction force (thrust) that drives the rocket.',
        doctrineReference: 'Aerospace Dimensions Module 4: Rockets',
      },
    ],
  },

  // -------------------------------------------------------------
  // C/MSgt -> C/SMSgt (Achievement 6 - Gen Jimmy Doolittle)
  // -------------------------------------------------------------
  c_msgt: {
    currentRankId: 'c_msgt',
    targetRankId: 'c_smsgt',
    targetRankName: 'Cadet Senior Master Sergeant',
    targetAbbreviation: 'C/SMSgt',
    targetAchievementName: 'Achievement 6 - Gen Jimmy Doolittle',
    targetRibbonName: 'Gen Jimmy Doolittle Ribbon',
    targetRibbonColors: ['#0b4f6c', '#01baef', '#fbfbff', '#01baef', '#0b4f6c'],
    targetInsignia: 'Chevron of 7 stripes (5 lower + 2 inverted)',
    phase: 2,
    minimumTimeInGradeDays: 56,
    honorPointsRequired: 2750,
    summaryQuote: '"There is nothing stronger than the heart of a volunteer." — Gen Jimmy Doolittle',
    overview:
      'Advance to Cadet Senior Master Sergeant. Study Learn to Lead Chapter 6 (Group Dynamics & Team Decision Making), Aerospace Dimensions Module 5 (Space Environment), and CAPP 60-34 Drill Test 7 (Commanding Squadron Formations & Mass Drill).',
    levelUpRequirements: [
      {
        id: 'doo_ldr',
        category: 'Leadership',
        title: 'Learn to Lead Chapter 6 Exam',
        description: 'Complete Learn to Lead Chapter 6 on Bruce Tuckman’s model of team growth (Forming, Storming, Norming, Performing), team roles, avoiding groupthink, and consensus decision making.',
        passingStandard: 'Score 80% or higher on eServices / Cadet Interactive online test.',
        officialReference: 'Learn to Lead Volume 2, Chapter 6',
        recommendedPrepTimeWeeks: 3,
      },
      {
        id: 'doo_aero',
        category: 'Aerospace',
        title: 'Aerospace Dimensions Module 5 Exam',
        description: 'Pass Aerospace Dimensions Module 5: Space Environment (the Sun, solar wind, coronal mass ejections, ionosphere layers D/E/F, Van Allen radiation belts, and microgravity effects on human physiology).',
        passingStandard: 'Score 80%+ on eServices online aerospace exam.',
        officialReference: 'Aerospace Dimensions Module 5',
        recommendedPrepTimeWeeks: 3,
      },
      {
        id: 'doo_drill',
        category: 'Drill',
        title: 'CAPP 60-34 Drill Practical Test 7',
        description: 'Demonstrate commanding flight and squadron mass formations, column maneuvers, and parade field alignment.',
        passingStandard: 'Exemplary command voice projection, cadence consistency, and formation alignment under CAPP 60-33 / CAPP 60-34.',
        officialReference: 'CAPP 60-34 Test 7 & CAPP 60-33 Chapter 5',
        recommendedPrepTimeWeeks: 4,
      },
      {
        id: 'doo_fitness',
        category: 'Fitness',
        title: 'CPFT Benchmark Assessment',
        description: 'Participate in the Cadet Physical Fitness Test and meet Healthy Fitness Zone (HFZ) standards.',
        passingStandard: 'Pass HFZ standards in your age/gender bracket.',
        officialReference: 'CAPP 60-50',
        recommendedPrepTimeWeeks: 3,
      },
      {
        id: 'doo_char',
        category: 'Character',
        title: 'Character Development Forum',
        description: 'Participate actively in the squadron monthly Character Development Forum.',
        passingStandard: 'Active participation logged on Form 50-1.',
        officialReference: 'CAPP 60-12',
        recommendedPrepTimeWeeks: 1,
      },
    ],
    resources: [
      {
        id: 'res_l2l_ch6',
        title: 'Learn to Lead: Chapter 6 (Group Dynamics)',
        code: 'L2L Vol 2 Ch 6',
        type: 'Textbook',
        description: 'Bruce Tuckman’s four stages of team development, team roles, consensus building, and preventing groupthink.',
        chapterOrModule: 'Chapter 6: "Group Dynamics"',
        keyConcepts: ['Forming, Storming, Norming, Performing', 'Team Roles & Cohesion', 'Groupthink Warning Signs & Countermeasures', 'Brainstorming & Consensus', 'Managing Destructive Conflict'],
      },
      {
        id: 'res_aero_mod5',
        title: 'Aerospace Dimensions: Space Environment',
        code: 'AE Module 5',
        type: 'Textbook',
        description: 'The Sun, solar flare activity, Earth’s magnetosphere, radiation hazards, and physiological challenges of spaceflight.',
        chapterOrModule: 'Module 5: Chapters 1–3',
        keyConcepts: ['Photosphere, Chromosphere, Corona', 'Solar Wind & Coronal Mass Ejections (CMEs)', 'Ionosphere Layers (D, E, F1, F2)', 'Van Allen Radiation Belts', 'Microgravity & Bone Density Loss', 'Space Debris Mitigation'],
      },
      {
        id: 'res_drill_test7',
        title: 'Drill Practical Test 7',
        code: 'CAPP 60-34',
        type: 'Practical Test',
        description: 'Squadron drill, mass formation maneuvers, flight guide integration, and parade procedures.',
        chapterOrModule: 'Drill Test 7: Squadron Formations',
        keyConcepts: ['Squadron in Line', 'Squadron in Column', 'Mass Formation', 'Command Voice Inflection & Cadence', 'Flight Sergeant Leadership'],
      },
    ],
    weeklySyllabus: [
      {
        weekNumber: 1,
        theme: 'Tuckman’s Stages of Team Growth & The Sun',
        focusArea: 'Leadership',
        objective: 'Understand team life cycles (Forming, Storming, Norming, Performing) and the solar space environment.',
        tasks: [
          {
            id: 'c7_w1_t1',
            label: 'Read L2L Chapter 6: Tuckman’s Stages of Team Development',
            resourceName: 'L2L Vol 2 Ch 6',
            resourceRef: 'Pages 5–22',
            estimatedMinutes: 45,
            practicalAction: 'Analyze your squadron’s flights and identify whether they are in the forming, storming, norming, or performing stage.',
          },
          {
            id: 'c7_w1_t2',
            label: 'Study Aerospace Module 5: The Sun and Space Weather',
            resourceName: 'AE Module 5',
            resourceRef: 'Pages 4–20',
            estimatedMinutes: 40,
            practicalAction: 'Describe how solar flares and coronal mass ejections affect satellite navigation and high-frequency radio communications.',
          },
        ],
      },
      {
        weekNumber: 2,
        theme: 'Preventing Groupthink & Earth’s Magnetosphere',
        focusArea: 'Aerospace',
        objective: 'Learn groupthink indicators and study Van Allen radiation belts and ionosphere layers.',
        tasks: [
          {
            id: 'c7_w2_t1',
            label: 'Study Groupthink symptoms and devil’s advocacy in decision making',
            resourceName: 'L2L Vol 2 Ch 6',
            resourceRef: 'Pages 23–35',
            estimatedMinutes: 40,
            practicalAction: 'Lead a small team problem-solving exercise where one cadet is assigned to challenge assumptions.',
          },
          {
            id: 'c7_w2_t2',
            label: 'Study Van Allen Radiation Belts and Ionospheric Radio Wave Reflection',
            resourceName: 'AE Module 5',
            resourceRef: 'Chapter 2',
            estimatedMinutes: 40,
            practicalAction: 'Diagram the D, E, and F layers of the ionosphere and explain day vs night radio skip distance.',
          },
        ],
      },
      {
        weekNumber: 3,
        theme: 'Squadron Mass Drill & Aerospace Testing',
        focusArea: 'Drill',
        objective: 'Practice leading multi-flight formations and pass Aerospace Module 5 exam.',
        tasks: [
          {
            id: 'c7_w3_t1',
            label: 'Practice commanding squadron mass formations on the parade field',
            resourceName: 'CAPP 60-34 Drill Test 7',
            resourceRef: 'Test 7 Commands',
            estimatedMinutes: 45,
            practicalAction: 'Execute forming a squadron in line and marching in column with guidon bearers.',
          },
          {
            id: 'c7_w3_t2',
            label: 'Pass Aerospace Dimensions Module 5 online exam in eServices',
            resourceName: 'eServices Testing',
            resourceRef: 'AE Module 5',
            estimatedMinutes: 35,
            practicalAction: 'Score 80%+ on the space environment exam.',
          },
        ],
      },
      {
        weekNumber: 4,
        theme: 'Leadership Exam & Senior NCO Promotion Review',
        focusArea: 'Leadership',
        objective: 'Pass Learn to Lead Chapter 6 exam and prepare for appointment as Cadet Senior Master Sergeant.',
        tasks: [
          {
            id: 'c7_w4_t1',
            label: 'Pass Learn to Lead Chapter 6 online exam in eServices',
            resourceName: 'Cadet Interactive',
            resourceRef: 'Chapter 6 Exam',
            estimatedMinutes: 35,
            practicalAction: 'Score 80%+ on group dynamics exam.',
          },
          {
            id: 'c7_w4_t2',
            label: 'Complete CPFT assessment and board review for C/SMSgt',
            resourceName: 'Form 50-1',
            resourceRef: 'Senior Master Sergeant Board',
            estimatedMinutes: 30,
            practicalAction: 'Demonstrate squadron command voice and articulate team-building principles to the board.',
          },
        ],
      },
    ],
    drillExamTips: [
      'In squadron mass formations, commands must be delivered with sustained diaphragm projection so all flights execute simultaneously.',
      'Ensure flight commanders repeat preparatory commands where required by regulation before giving the command of execution.',
    ],
    boardReviewQuestions: [
      {
        question: 'Who was General James "Jimmy" Doolittle and what famous mission did he lead in WWII?',
        expectedAnswerDoctrine:
          'Gen Jimmy Doolittle was an aviation pioneer and air racing champion who led the historic Doolittle Raid on April 18, 1942, launching 16 Army Air Forces B-25 Mitchell bombers from the aircraft carrier USS Hornet to strike Tokyo, providing a vital morale boost for the United States.',
        doctrineReference: 'Learn to Lead Achievement 6 Historical Profile',
      },
      {
        question: 'What are the 4 stages of team development according to Bruce Tuckman?',
        expectedAnswerDoctrine:
          '1. Forming (team members are polite and orient themselves), 2. Storming (personality clashes and conflict arise as roles are contested), 3. Norming (rules, standards, and cohesion develop), and 4. Performing (the team operates smoothly and cooperatively toward high performance).',
        doctrineReference: 'Learn to Lead Volume 2, Chapter 6',
      },
      {
        question: 'What is "Groupthink" and why is it dangerous in military and leadership decisions?',
        expectedAnswerDoctrine:
          'Groupthink is a psychological phenomenon where the desire for harmony or conformity in a group results in an irrational or dysfunctional decision-making outcome. Team members suppress dissenting viewpoints, ignore warning signs, and fail to critically evaluate alternatives.',
        doctrineReference: 'Learn to Lead Volume 2, Chapter 6',
      },
    ],
  },

  // -------------------------------------------------------------
  // C/SMSgt -> C/CMSgt (Achievement 7 - Goddard & Achievement 8 - Armstrong)
  // -------------------------------------------------------------
  c_smsgt: {
    currentRankId: 'c_smsgt',
    targetRankId: 'c_cmsgt',
    targetRankName: 'Cadet Chief Master Sergeant',
    targetAbbreviation: 'C/CMSgt',
    targetAchievementName: 'Achievement 7 & 8 - Goddard & Armstrong',
    targetRibbonName: 'Neil Armstrong Ribbon',
    targetRibbonColors: ['#111d5e', '#c70039', '#f37121', '#c70039', '#111d5e'],
    targetInsignia: 'Chevron of 8 stripes (6 lower + 2 inverted)',
    phase: 2,
    minimumTimeInGradeDays: 56,
    honorPointsRequired: 3350,
    summaryQuote: '"That’s one small step for man, one giant leap for mankind." — Neil Armstrong',
    overview:
      'Advance to the pinnacle NCO grade: Cadet Chief Master Sergeant. Complete Learn to Lead Chapter 7 (Management Basics) and Chapter 8 (The Leading Leader: Coaching, Mentoring & Supervising), Aerospace Dimensions Module 6 (Spacecraft), and CAPP 60-34 Drill Test 8 (Squadron Drill and Ceremonies). Prepare for the Milestone 2 Billy Mitchell Award.',
    levelUpRequirements: [
      {
        id: 'arm_ldr',
        category: 'Leadership',
        title: 'Learn to Lead Chapters 7 & 8 Exams',
        description: 'Complete Learn to Lead Chapter 7 (The 4 Functions of Management: Planning, Organizing, Leading, Controlling) and Chapter 8 (Coaching, Mentoring, and Supervising).',
        passingStandard: 'Score 80% or higher on both chapters in eServices / Cadet Interactive.',
        officialReference: 'Learn to Lead Volume 2, Chapters 7 & 8',
        recommendedPrepTimeWeeks: 4,
      },
      {
        id: 'arm_aero',
        category: 'Aerospace',
        title: 'Aerospace Dimensions Module 6 Exam',
        description: 'Pass Aerospace Dimensions Module 6: Spacecraft (unmanned satellites, orbits [LEO, GEO, polar], satellite subsystems, and manned space exploration: Mercury, Gemini, Apollo, Space Shuttle, and ISS).',
        passingStandard: 'Score 80%+ on eServices online aerospace exam.',
        officialReference: 'Aerospace Dimensions Module 6',
        recommendedPrepTimeWeeks: 3,
      },
      {
        id: 'arm_drill',
        category: 'Drill',
        title: 'CAPP 60-34 Drill Practical Test 8',
        description: 'Demonstrate commanding flight and squadron ceremonies, Flight Sergeant review duties, guidon manual, and parade passing in review.',
        passingStandard: 'Mastery of ceremonial drill, guidon movements, and marching precision under CAPP 60-33 / CAPP 60-34.',
        officialReference: 'CAPP 60-34 Test 8 & CAPP 60-33 Chapter 6',
        recommendedPrepTimeWeeks: 4,
      },
      {
        id: 'arm_fitness',
        category: 'Fitness',
        title: 'CPFT Mandatory Benchmark Assessment',
        description: 'Participate in the Cadet Physical Fitness Test and meet Healthy Fitness Zone (HFZ) standards in all 4 events.',
        passingStandard: 'Pass HFZ across all 4 events in preparation for Mitchell testing.',
        officialReference: 'CAPP 60-50',
        recommendedPrepTimeWeeks: 4,
      },
      {
        id: 'arm_char',
        category: 'Character',
        title: 'Character Development Forum',
        description: 'Participate actively in the squadron monthly Character Development Forum and mentor junior cadets.',
        passingStandard: 'Active participation logged on Form 50-1.',
        officialReference: 'CAPP 60-12',
        recommendedPrepTimeWeeks: 1,
      },
    ],
    resources: [
      {
        id: 'res_l2l_ch7_8',
        title: 'Learn to Lead: Chapters 7 & 8 (Management & Coaching)',
        code: 'L2L Vol 2 Ch 7 & 8',
        type: 'Textbook',
        description: 'Principles of management (Planning, Organizing, Leading, Controlling), effective delegation, coaching, mentoring, and constructive performance appraisal.',
        chapterOrModule: 'Chapters 7 & 8: "Management Basics" and "The Leading Leader"',
        keyConcepts: ['POLC Framework (Plan, Organize, Lead, Control)', 'Effective Delegation Principles', 'Coaching vs Mentoring vs Counseling', 'Supervisory Feedback', 'Gantt Charts & Project Milestones'],
      },
      {
        id: 'res_aero_mod6',
        title: 'Aerospace Dimensions: Spacecraft',
        code: 'AE Module 6',
        type: 'Textbook',
        description: 'Satellite orbits, orbital mechanics, satellite subsystems, and America’s journey to the Moon and permanent space station habitation.',
        chapterOrModule: 'Module 6: Chapters 1–3',
        keyConcepts: ['Low Earth Orbit (LEO) vs Geostationary (GEO)', 'Polar & Sun-Synchronous Orbits', 'Spacecraft Subsystems (Thermal, Power, Attitude, Communications)', 'Project Mercury, Gemini, Apollo', 'Space Shuttle (STS) & International Space Station'],
      },
      {
        id: 'res_drill_test8',
        title: 'Drill Practical Test 8',
        code: 'CAPP 60-34',
        type: 'Practical Test',
        description: 'Ceremonial parade drill, guidon manual, Flight Sergeant position of honor, and pass in review protocol.',
        chapterOrModule: 'Drill Test 8: Ceremonies & Guidon',
        keyConcepts: ['Order Guidon & Carry Guidon', 'Present Guidon', 'Pass in Review Protocol', 'Flight Sergeant Inspection Role', 'Parade Staff Procedures'],
      },
    ],
    weeklySyllabus: [
      {
        weekNumber: 1,
        theme: 'The 4 Functions of Management & Satellite Orbits',
        focusArea: 'Leadership',
        objective: 'Master Planning, Organizing, Leading, Controlling (POLC) and learn orbital characteristics in Module 6.',
        tasks: [
          {
            id: 'c8_w1_t1',
            label: 'Read L2L Chapter 7: The 4 Functions of Management (POLC)',
            resourceName: 'L2L Vol 2 Ch 7',
            resourceRef: 'Pages 5–25',
            estimatedMinutes: 50,
            practicalAction: 'Create a project management plan and timeline for an upcoming squadron field trip using POLC.',
          },
          {
            id: 'c8_w1_t2',
            label: 'Study Aerospace Module 6: Satellite Orbits (LEO, MEO, GEO, Polar)',
            resourceName: 'AE Module 6',
            resourceRef: 'Pages 4–22',
            estimatedMinutes: 45,
            practicalAction: 'Differentiate why communications satellites use 22,236-mile geostationary orbits while weather/spy satellites use polar LEO orbits.',
          },
        ],
      },
      {
        weekNumber: 2,
        theme: 'Coaching & Mentoring vs. Manned Spaceflight History',
        focusArea: 'Aerospace',
        objective: 'Study L2L Chapter 8 coaching techniques and review Mercury, Gemini, and Apollo programs.',
        tasks: [
          {
            id: 'c8_w2_t1',
            label: 'Read L2L Chapter 8: Coaching, Mentoring, and Performance Appraisals',
            resourceName: 'L2L Vol 2 Ch 8',
            resourceRef: 'Pages 5–28',
            estimatedMinutes: 45,
            practicalAction: 'Conduct a formal coaching session with a junior cadet preparing for their first drill test.',
          },
          {
            id: 'c8_w2_t2',
            label: 'Study Manned Space Exploration: Mercury, Gemini, Apollo, Space Shuttle, and ISS',
            resourceName: 'AE Module 6',
            resourceRef: 'Chapter 2',
            estimatedMinutes: 45,
            practicalAction: 'Summarize how Project Gemini developed rendezvous, docking, and extravehicular activity (EVA) required for Apollo moon landings.',
          },
        ],
      },
      {
        weekNumber: 3,
        theme: 'Guidon Manual, Ceremonies & Aerospace Testing',
        focusArea: 'Drill',
        objective: 'Master guidon bearer manual and pass Aerospace Module 6 online exam.',
        tasks: [
          {
            id: 'c8_w3_t1',
            label: 'Practice Guidon Manual (Order Guidon, Carry Guidon, Present Guidon)',
            resourceName: 'CAPP 60-34 Drill Test 8',
            resourceRef: 'Guidon Manual CAPP 60-33',
            estimatedMinutes: 45,
            practicalAction: 'Execute guidon salutes and march in formation with the squadron guidon.',
          },
          {
            id: 'c8_w3_t2',
            label: 'Pass Aerospace Dimensions Module 6 online exam in eServices',
            resourceName: 'eServices Testing',
            resourceRef: 'AE Module 6',
            estimatedMinutes: 35,
            practicalAction: 'Score 80%+ on spacecraft and satellite technology exam.',
          },
        ],
      },
      {
        weekNumber: 4,
        theme: 'Leadership Exams & Chief Master Sergeant Promotion Board',
        focusArea: 'Leadership',
        objective: 'Pass Learn to Lead Chapters 7 & 8 exams and prepare for Chief Master Sergeant pinning and Mitchell readiness.',
        tasks: [
          {
            id: 'c8_w4_t1',
            label: 'Pass Learn to Lead Chapters 7 & 8 online exams in eServices',
            resourceName: 'Cadet Interactive',
            resourceRef: 'Chapters 7 & 8 Exams',
            estimatedMinutes: 50,
            practicalAction: 'Achieve 80%+ on both management and leadership examinations.',
          },
          {
            id: 'c8_w4_t2',
            label: 'Complete CPFT assessment and Chief Master Sergeant promotion board',
            resourceName: 'Form 50-1',
            resourceRef: 'Chief Master Sergeant Board',
            estimatedMinutes: 30,
            practicalAction: 'Receive appointment as Cadet Chief Master Sergeant and begin comprehensive review for the Mitchell Award.',
          },
        ],
      },
    ],
    drillExamTips: [
      'The guidon bearer stands one pace to the rear and one pace to the right of the flight commander in flight formation.',
      'On Present, ARMS, execute Present Guidon by lowering the staff forward until it rests horizontally under the right armpit with the spearhead pointing front.',
    ],
    boardReviewQuestions: [
      {
        question: 'Who was Neil Armstrong and what historical milestone did he achieve?',
        expectedAnswerDoctrine:
          'Neil Armstrong was an aerospace engineer, naval aviator, test pilot, and NASA astronaut who, on July 20, 1969, became the first human being to walk on the surface of the Moon during the Apollo 11 lunar mission.',
        doctrineReference: 'Learn to Lead Achievement 8 Historical Profile',
      },
      {
        question: 'What are the 4 fundamental functions of management according to Learn to Lead Chapter 7?',
        expectedAnswerDoctrine:
          '1. Planning (determining organizational goals and how to achieve them), 2. Organizing (bringing together resources, people, and materials to execute the plan), 3. Leading (directing, motivating, and inspiring personnel), and 4. Controlling (monitoring progress and taking corrective actions).',
        doctrineReference: 'Learn to Lead Volume 2, Chapter 7',
      },
      {
        question: 'What is the key difference between a Geostationary Orbit (GEO) and a Low Earth Orbit (LEO)?',
        expectedAnswerDoctrine:
          'A Geostationary Orbit is a circular orbit approximately 22,236 miles (35,786 km) above Earth’s equator where a satellite orbits at the exact same rotational speed as Earth, appearing stationary over one point (ideal for communications). A Low Earth Orbit is much closer (100 to 1,200 miles), with orbital periods of roughly 90 minutes (ideal for Earth observation, ISS, and weather satellites).',
        doctrineReference: 'Aerospace Dimensions Module 6: Spacecraft',
      },
    ],
  },
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
  // -------------------------------------------------------------
  // C/2d Lt -> C/1st Lt (Achievement 9 & 10)
  // -------------------------------------------------------------
  c_2dlt: {
    currentRankId: 'c_2dlt',
    targetRankId: 'c_1stlt',
    targetRankName: 'Cadet First Lieutenant',
    targetAbbreviation: 'C/1st Lt',
    targetAchievementName: 'Achievement 9 & 10',
    targetRibbonName: 'Amelia Earhart Track Ribbon',
    targetRibbonColors: ['#3b185f', '#a03c78', '#ed8e7c', '#a03c78', '#3b185f'],
    targetInsignia: 'Two pips (silver discs)',
    phase: 3,
    minimumTimeInGradeDays: 56,
    honorPointsRequired: 4700,
    summaryQuote: '"Leadership and learning are indispensable to each other." — John F. Kennedy',
    overview:
      'Advance to Cadet First Lieutenant in Phase III (The Command Phase). Complete Learn to Lead Volume 3 Chapter 9 (Leading in the Organization) & Chapter 10 (The Art of Persuasion), author a technical Staff Duty Analysis (SDA) service report with oral briefing under CAPP 60-32, and study Aerospace: The Journey of Flight.',
    levelUpRequirements: [
      {
        id: 'c1lt_ldr',
        category: 'Leadership',
        title: 'Learn to Lead Volume 3 (Chapters 9 & 10)',
        description: 'Complete Learn to Lead Chapter 9 (Organizational Culture, Hierarchy, and Climate) and Chapter 10 (The Art of Persuasion, Rhetorical Appeals, and Logical Fallacies).',
        passingStandard: 'Score 80% or higher on eServices online officer leadership exams.',
        officialReference: 'Learn to Lead Volume 3, Chapters 9 & 10',
        recommendedPrepTimeWeeks: 4,
      },
      {
        id: 'c1lt_sda',
        category: 'Milestone Special',
        title: 'Staff Duty Analysis (SDA) Technical Report & Oral Briefing',
        description: 'Serve in a cadet staff position (Flight Commander, Adjutant, Safety, Aerospace, or Public Affairs); write an official technical service report and deliver a 5-minute oral briefing evaluated on Form 60-90.',
        passingStandard: 'Satisfactory score (at least 80% on rubric) from Senior Staff Mentor.',
        officialReference: 'CAPP 60-32 (Cadet Staff Duty Analysis)',
        recommendedPrepTimeWeeks: 6,
      },
      {
        id: 'c1lt_aero',
        category: 'Aerospace',
        title: 'Journey of Flight Aerospace Chapter Tests',
        description: 'Study Aerospace: The Journey of Flight (Aviation History, Principles of Flight, and Air Power Development).',
        passingStandard: 'Score 80%+ on Journey of Flight chapter examination.',
        officialReference: 'Aerospace: The Journey of Flight',
        recommendedPrepTimeWeeks: 4,
      },
      {
        id: 'c1lt_fitness',
        category: 'Fitness',
        title: 'Officer CPFT Benchmark Assessment',
        description: 'Participate in physical fitness testing and maintain Healthy Fitness Zone benchmarks.',
        passingStandard: 'Pass HFZ standards across CPFT events.',
        officialReference: 'CAPP 60-50',
        recommendedPrepTimeWeeks: 3,
      },
      {
        id: 'c1lt_char',
        category: 'Character',
        title: 'Officer Character & Ethics Forum',
        description: 'Facilitate or participate in squadron Character Development Forum.',
        passingStandard: 'Active leadership role logged on Form 50-1.',
        officialReference: 'CAPP 60-12',
        recommendedPrepTimeWeeks: 1,
      },
    ],
    resources: [
      {
        id: 'res_l2l_vol3',
        title: 'Learn to Lead: Volume 3 (Indirect Leadership)',
        code: 'L2L Vol 3',
        type: 'Textbook',
        description: 'Leading in organizations, command climate, persuasion rhetoric, and counseling frameworks for company-grade officers.',
        chapterOrModule: 'Chapters 9 & 10: "Organizational Leadership" & "Persuasion"',
        keyConcepts: ['Organizational Culture vs Climate', 'Maslow’s Hierarchy & Herzberg Motivators', 'Ethos, Pathos, Logos in Persuasion', 'Logical Fallacies (Ad Hominem, Straw Man, False Dilemma)', 'Formal Staff Communications'],
      },
      {
        id: 'res_capp60_32_sda',
        title: 'Cadet Staff Duty Analysis Guide',
        code: 'CAPP 60-32',
        type: 'Manual',
        description: 'Official guidebook for staff duty analysis, service learning, executive writing guidelines, and oral briefing evaluation rubrics.',
        chapterOrModule: 'SDA Roles & CAP Form 60-90 Rubric',
        keyConcepts: ['Staff Roles (Safety, PAO, Adjutant, Logistics, Flight Commander)', 'Problem Statement & Analysis', 'Technical Service Writing Format', '5-Minute Formal Oral Briefing', 'Form 60-90 Evaluation'],
      },
      {
        id: 'res_journey_of_flight',
        title: 'Aerospace: The Journey of Flight',
        code: 'JOF Textbook',
        type: 'Textbook',
        description: 'Comprehensive college-level aerospace textbook for cadet officers, covering aviation history, airframes, avionics, and airpower doctrine.',
        chapterOrModule: 'Part 1: Aviation History & Airpower',
        keyConcepts: ['Evolution of Military Aviation', 'Principles of Aerodynamics', 'Reciprocating vs Turbine Propulsion', 'Commercial Air Transportation Infrastructure'],
      },
    ],
    weeklySyllabus: [
      {
        weekNumber: 1,
        theme: 'Organizational Leadership & SDA Position Selection',
        focusArea: 'Leadership',
        objective: 'Read L2L Chapter 9 and select your staff role (Safety, Adjutant, or Flight Commander) for Staff Duty Analysis.',
        tasks: [
          {
            id: 'o1_w1_t1',
            label: 'Read L2L Chapter 9: Leading in the Organization',
            resourceName: 'L2L Vol 3 Ch 9',
            resourceRef: 'Pages 5–25',
            estimatedMinutes: 50,
            practicalAction: 'Assess your squadron’s organizational climate and identify formal vs informal leaders.',
          },
          {
            id: 'o1_w1_t2',
            label: 'Select SDA specialty role and review CAPP 60-32 requirements with Senior Staff Mentor',
            resourceName: 'CAPP 60-32',
            resourceRef: 'SDA Position Guide',
            estimatedMinutes: 40,
            practicalAction: 'Draft your SDA problem statement and research scope for your squadron.',
          },
        ],
      },
      {
        weekNumber: 2,
        theme: 'The Art of Persuasion & Journey of Flight Study',
        focusArea: 'Aerospace',
        objective: 'Study L2L Chapter 10 persuasion models and read assigned Journey of Flight chapters.',
        tasks: [
          {
            id: 'o1_w2_t1',
            label: 'Read L2L Chapter 10: The Art of Persuasion and Fallacy Recognition',
            resourceName: 'L2L Vol 3 Ch 10',
            resourceRef: 'Pages 26–48',
            estimatedMinutes: 45,
            practicalAction: 'Identify 4 common logical fallacies and explain how they undermine effective military briefings.',
          },
          {
            id: 'o1_w2_t2',
            label: 'Study Journey of Flight: Airpower in World War II and the Jet Age',
            resourceName: 'JOF Textbook',
            resourceRef: 'Chapters 4–6',
            estimatedMinutes: 50,
            practicalAction: 'Summarize the strategic impact of radar, jet aircraft, and long-range escort fighters.',
          },
        ],
      },
      {
        weekNumber: 3,
        theme: 'SDA Technical Report Writing & Journey of Flight Testing',
        focusArea: 'Milestone Special',
        objective: 'Draft your SDA technical service report and pass Journey of Flight chapter test.',
        tasks: [
          {
            id: 'o1_w3_t1',
            label: 'Author official 2–3 page SDA technical report following CAPP 60-32 guidelines',
            resourceName: 'CAPP 60-32',
            resourceRef: 'Technical Writing Template',
            estimatedMinutes: 75,
            practicalAction: 'Submit report draft to your senior mentor for feedback on problem analysis and recommendations.',
          },
          {
            id: 'o1_w3_t2',
            label: 'Pass Aerospace: The Journey of Flight online examination in eServices',
            resourceName: 'eServices Testing',
            resourceRef: 'JOF Chapter Exam',
            estimatedMinutes: 40,
            practicalAction: 'Score 80%+ on the officer aerospace exam.',
          },
        ],
      },
      {
        weekNumber: 4,
        theme: 'Oral Briefing Delivery & Promotion Ceremony',
        focusArea: 'Leadership',
        objective: 'Deliver formal 5-minute SDA oral briefing to the squadron staff and pass leadership exam.',
        tasks: [
          {
            id: 'o1_w4_t1',
            label: 'Deliver 5-minute SDA oral presentation evaluated on Form 60-90',
            resourceName: 'CAP Form 60-90',
            resourceRef: 'Form 60-90 Rubric',
            estimatedMinutes: 30,
            practicalAction: 'Present findings cleanly using slides or charts, answering questions from senior officers.',
          },
          {
            id: 'o1_w4_t2',
            label: 'Pass Learn to Lead Chapter 9 & 10 exam and pin on C/1st Lt pips',
            resourceName: 'Cadet Interactive',
            resourceRef: 'Volume 3 Exam',
            estimatedMinutes: 40,
            practicalAction: 'Achieve 80%+ and assume expanded flight commander / staff duties as First Lieutenant.',
          },
        ],
      },
    ],
    drillExamTips: [
      'Cadet officers return salutes crisp and promptly, initiating eye contact and greeting the reporting subordinate.',
      'During inspections, observe cadet uniform wear objectively and provide constructive feedback that inspires pride rather than humiliation.',
    ],
    boardReviewQuestions: [
      {
        question: 'What is the distinction between "Organizational Culture" and "Organizational Climate" in Learn to Lead Volume 3?',
        expectedAnswerDoctrine:
          'Organizational culture is the shared set of underlying values, traditions, and long-term beliefs that shape how an organization functions over time. Organizational climate is the short-term feeling, atmosphere, and attitude of personnel within the organization at a given moment (which leaders can influence immediately through their leadership style).',
        doctrineReference: 'Learn to Lead Volume 3, Chapter 9',
      },
      {
        question: 'What are the 3 classical rhetorical appeals defined by Aristotle in Learn to Lead Chapter 10?',
        expectedAnswerDoctrine:
          '1. Ethos (appeal to character, credibility, and authority of the speaker), 2. Pathos (appeal to emotion and the audience’s passions), and 3. Logos (appeal to logic, evidence, reasoning, and empirical facts).',
        doctrineReference: 'Learn to Lead Volume 3, Chapter 10',
      },
      {
        question: 'What is the primary purpose of the Staff Duty Analysis (SDA) under CAPP 60-32?',
        expectedAnswerDoctrine:
          'To introduce cadet officers to real-world staff work, service-learning, executive problem solving, technical writing, and formal military oral briefings evaluated on CAP Form 60-90.',
        doctrineReference: 'CAPP 60-32 Section 1',
      },
    ],
  },

  // -------------------------------------------------------------
  // C/1st Lt -> C/Capt (Milestone 3 - Amelia Earhart Award)
  // -------------------------------------------------------------
  c_1stlt: {
    currentRankId: 'c_1stlt',
    targetRankId: 'c_capt',
    targetRankName: 'Cadet Captain',
    targetAbbreviation: 'C/Capt',
    targetAchievementName: 'Milestone 3 - Amelia Earhart Award',
    targetRibbonName: 'Amelia Earhart Ribbon',
    targetRibbonColors: ['#142850', '#27496d', '#00909e', '#dae1e7', '#142850'],
    targetInsignia: 'Three pips (silver discs)',
    phase: 3,
    minimumTimeInGradeDays: 56,
    honorPointsRequired: 5500,
    summaryQuote: '"Courage is the price that life extracts for granting peace." — Amelia Earhart',
    overview:
      'EARN THE AMELIA EARHART AWARD & APPOINTMENT AS CADET CAPTAIN. Complete the closed-book proctored Earhart Leadership Exam (Learn to Lead Volume 3, Chapters 9–14), pass the comprehensive Earhart Aerospace Exam (Aerospace: The Journey of Flight), pass CPFT in the Healthy Fitness Zone, and qualify for the International Air Cadet Exchange (IACE).',
    levelUpRequirements: [
      {
        id: 'earhart_ldr_exam',
        category: 'Leadership',
        title: 'Earhart Comprehensive Leadership Exam',
        description: 'Proctored closed-book exam covering Learn to Lead Volume 3 (Chapters 9 through 14: Indirect Leadership, The Leader as Counselor, Conflict Resolution, and Executive Ethics).',
        passingStandard: 'Score 80% or higher (50 questions, 60 minutes, closed-book).',
        officialReference: 'Learn to Lead Volume 3 Comprehensive',
        recommendedPrepTimeWeeks: 6,
      },
      {
        id: 'earhart_aero_exam',
        category: 'Aerospace',
        title: 'Earhart Comprehensive Aerospace Exam',
        description: 'Proctored closed-book exam covering the entire Aerospace: The Journey of Flight textbook.',
        passingStandard: 'Score 80% or higher (50 questions, 60 minutes, closed-book).',
        officialReference: 'Aerospace: The Journey of Flight Comprehensive',
        recommendedPrepTimeWeeks: 6,
      },
      {
        id: 'earhart_sda',
        category: 'Milestone Special',
        title: 'Complete Staff Duty Analysis Portfolio',
        description: 'Fulfill all Staff Duty Analysis (SDA) technical service reports and oral presentations required for Phase III.',
        passingStandard: 'Signed off on Form 60-90 by Squadron Commander.',
        officialReference: 'CAPP 60-32',
        recommendedPrepTimeWeeks: 4,
      },
      {
        id: 'earhart_fitness',
        category: 'Fitness',
        title: 'CPFT Mandatory Healthy Fitness Zone Pass',
        description: 'Must pass all 4 CPFT physical fitness categories in the Healthy Fitness Zone.',
        passingStandard: 'Pass 4 of 4 events in HFZ.',
        officialReference: 'CAPP 60-50',
        recommendedPrepTimeWeeks: 4,
      },
      {
        id: 'earhart_char',
        category: 'Character',
        title: 'Character Development Forum & Commander Recommendation',
        description: 'Participate in character forums and receive unit commander appointment recommendation for Cadet Captain.',
        passingStandard: 'Recommendation recorded in eServices.',
        officialReference: 'CAPR 60-1',
        recommendedPrepTimeWeeks: 2,
      },
    ],
    resources: [
      {
        id: 'res_l2l_vol3_comp',
        title: 'Learn to Lead: Volume 3 Comprehensive',
        code: 'L2L Vol 3',
        type: 'Textbook',
        description: 'Chapters 9 through 14: Organizational climate, persuasion, conflict resolution, counseling techniques, and the ethics of command.',
        chapterOrModule: 'Complete Volume 3 (Chapters 9–14)',
        keyConcepts: ['Indirect Leadership Framework', 'The Leader as Counselor (Directive, Non-directive, Combined)', 'Conflict Resolution Models (Blake & Mouton)', 'Ethical Dilemmas in Command', 'Managing Organizational Change'],
      },
      {
        id: 'res_jof_comp',
        title: 'Aerospace: The Journey of Flight (Comprehensive)',
        code: 'JOF Comprehensive',
        type: 'Textbook',
        description: 'Comprehensive aerospace textbook: historical aviation milestones, principles of flight, navigation, rocket propulsion, and space exploration.',
        chapterOrModule: 'Complete Journey of Flight',
        keyConcepts: ['Aviation History & Pioneers', 'Aerodynamics & Flight Dynamics', 'Aircraft Propulsion Systems', 'VFR/IFR Navigation & Air Traffic Control', 'Rocketry & Spaceflight Missions'],
      },
    ],
    weeklySyllabus: [
      {
        weekNumber: 1,
        theme: 'Learn to Lead Volume 3 Review (Chapters 9–11)',
        focusArea: 'Leadership',
        objective: 'Review organizational leadership, persuasive communication, and conflict resolution models.',
        tasks: [
          {
            id: 'eh_w1_t1',
            label: 'Review Learn to Lead Chapters 9, 10, and 11',
            resourceName: 'L2L Vol 3',
            resourceRef: 'Chapters 9–11',
            estimatedMinutes: 60,
            practicalAction: 'Create flashcards comparing the five conflict resolution styles (competing, avoiding, accommodating, compromising, collaborating).',
          },
          {
            id: 'eh_w1_t2',
            label: 'Begin Journey of Flight comprehensive review (Chapters 1–8)',
            resourceName: 'JOF Comprehensive',
            resourceRef: 'History & Flight Principles',
            estimatedMinutes: 60,
            practicalAction: 'Take online practice quizzes on early aviation pioneers and the Wright brothers.',
          },
        ],
      },
      {
        weekNumber: 2,
        theme: 'The Leader as Counselor & Aerospace Navigation',
        focusArea: 'Leadership',
        objective: 'Study counseling models (Chapter 12) and aviation navigation principles.',
        tasks: [
          {
            id: 'eh_w2_t1',
            label: 'Review Learn to Lead Chapter 12: The Leader as Counselor',
            resourceName: 'L2L Vol 3 Ch 12',
            resourceRef: 'Pages 5–26',
            estimatedMinutes: 50,
            practicalAction: 'Compare directive, nondirective, and collaborative counseling techniques.',
          },
          {
            id: 'eh_w2_t2',
            label: 'Review Journey of Flight Navigation: VOR, GPS, and Sectional Charts',
            resourceName: 'JOF Comprehensive',
            resourceRef: 'Navigation Chapters',
            estimatedMinutes: 60,
            practicalAction: 'Plot a true course and magnetic course on a sectional chart incorporating magnetic variation.',
          },
        ],
      },
      {
        weekNumber: 3,
        theme: 'Journey of Flight Propulsion & Space Exploration Review',
        focusArea: 'Aerospace',
        objective: 'Complete comprehensive aerospace review covering rocketry, space systems, and propulsion.',
        tasks: [
          {
            id: 'eh_w3_t1',
            label: 'Review Journey of Flight Chapters on Propulsion and Space Missions',
            resourceName: 'JOF Comprehensive',
            resourceRef: 'Propulsion & Space',
            estimatedMinutes: 70,
            practicalAction: 'Review differences between turbojets, turbofans, turboprops, and rocket thrust chambers.',
          },
          {
            id: 'eh_w3_t2',
            label: 'Conduct CPFT conditioning for mandatory Healthy Fitness Zone pass',
            resourceName: 'CAPP 60-50',
            resourceRef: 'HFZ Protocol',
            estimatedMinutes: 45,
            practicalAction: 'Achieve HFZ in mile run, push-ups, curl-ups, and sit-and-reach.',
          },
        ],
      },
      {
        weekNumber: 4,
        theme: 'Proctored Earhart Exams & Captain Appointment',
        focusArea: 'Milestone Special',
        objective: 'Pass both closed-book Earhart exams and receive appointment as Cadet Captain.',
        tasks: [
          {
            id: 'eh_w4_t1',
            label: 'Take proctored Earhart Leadership Exam (closed-book)',
            resourceName: 'eServices Proctored Test',
            resourceRef: 'Earhart Leadership Exam',
            estimatedMinutes: 60,
            practicalAction: 'Score 80%+ on 50 questions covering L2L Volume 3.',
          },
          {
            id: 'eh_w4_t2',
            label: 'Take proctored Earhart Aerospace Exam (closed-book)',
            resourceName: 'eServices Proctored Test',
            resourceRef: 'Earhart Aerospace Exam',
            estimatedMinutes: 60,
            practicalAction: 'Score 80%+ on 50 questions covering Journey of Flight.',
          },
          {
            id: 'eh_w4_t3',
            label: 'Complete promotion ceremony and receive Amelia Earhart Award Ribbon',
            resourceName: 'Form 50-1',
            resourceRef: 'Earhart Appointment',
            estimatedMinutes: 30,
            practicalAction: 'Pin on your three silver pips and apply for International Air Cadet Exchange (IACE)!',
          },
        ],
      },
    ],
    drillExamTips: [
      'Cadet Captains command full squadron parades and serve as review officers or cadet commanders.',
      'Maintain an exemplary command presence, projecting poise, authority, and humility in all interactions.',
    ],
    boardReviewQuestions: [
      {
        question: 'Who was Amelia Earhart and what legacy does her CAP milestone represent?',
        expectedAnswerDoctrine:
          'Amelia Earhart was a pioneering aviator, the first woman to fly solo across the Atlantic Ocean (1932), the first person to fly solo from Hawaii to California, and an advocate for women in aviation. The Earhart Award represents milestone excellence, indirect leadership, and eligibility for international ambassadorship (IACE).',
        doctrineReference: 'Learn to Lead Milestone 3 Earhart Profile',
      },
      {
        question: 'What are the 3 major counseling approaches described in Learn to Lead Volume 3?',
        expectedAnswerDoctrine:
          '1. Directive (the counselor identifies the problem and dictates the solution; best for simple, corrective situations), 2. Nondirective (the counselor listens actively and prompts the cadet to identify the problem and develop their own plan), and 3. Combined/Collaborative (the counselor and cadet work together as partners to find a solution; generally the most effective approach).',
        doctrineReference: 'Learn to Lead Volume 3, Chapter 12',
      },
      {
        question: 'What are the 5 conflict management styles in the Thomas-Kilmann / Blake-Mouton model?',
        expectedAnswerDoctrine:
          '1. Competing (forcing one’s will), 2. Avoiding (withdrawing from the conflict), 3. Accommodating (yielding to the other party), 4. Compromising (finding an expedient middle ground), and 5. Collaborating (seeking a win-win integration of all parties’ concerns).',
        doctrineReference: 'Learn to Lead Volume 3, Chapter 11',
      },
    ],
  },

  // -------------------------------------------------------------
  // C/Capt -> C/Maj (Phase IV Executive Phase: Achievements 12 to 15)
  // -------------------------------------------------------------
  c_capt: {
    currentRankId: 'c_capt',
    targetRankId: 'c_maj',
    targetRankName: 'Cadet Major',
    targetAbbreviation: 'C/Maj',
    targetAchievementName: 'Achievement 12 to 15',
    targetRibbonName: 'Dr. Sally Ride Ribbon',
    targetRibbonColors: ['#2c003e', '#512b58', '#fe346e', '#512b58', '#2c003e'],
    targetInsignia: 'One diamond (silver rhombus)',
    phase: 4,
    minimumTimeInGradeDays: 56,
    honorPointsRequired: 6400,
    summaryQuote: '"Leadership is the capacity to translate vision into reality." — Warren Bennis',
    overview:
      'Cross into the Field Grade Officer ranks as Cadet Major. Complete Learn to Lead Volume 4 Chapter 15 (Executive Leadership: Vision, Strategy, and Climate) and Chapter 16 (Strategic Leadership in a Changing World), serve in executive staff duties (Cadet Commander, Deputy Commander, or XO), and study advanced aerospace systems in Journey of Flight.',
    levelUpRequirements: [
      {
        id: 'cmaj_ldr',
        category: 'Leadership',
        title: 'Learn to Lead Volume 4 (Chapters 15 & 16)',
        description: 'Complete Learn to Lead Chapter 15 (Strategic Vision, Institutional Climate, and Resource Allocation) and Chapter 16 (Leading in a Changing Global Environment).',
        passingStandard: 'Score 80% or higher on eServices online exams.',
        officialReference: 'Learn to Lead Volume 4, Chapters 15 & 16',
        recommendedPrepTimeWeeks: 4,
      },
      {
        id: 'cmaj_staff',
        category: 'Milestone Special',
        title: 'Executive Cadet Staff Duties',
        description: 'Serve as Cadet Squadron Commander, Deputy Commander for Cadets, or Cadet Executive Officer (XO), managing squadron training schedules, cadet staff, and safety programs.',
        passingStandard: 'Exemplary leadership evaluation from Squadron Deputy Commander for Cadets.',
        officialReference: 'CAPR 60-1',
        recommendedPrepTimeWeeks: 8,
      },
      {
        id: 'cmaj_aero',
        category: 'Aerospace',
        title: 'Journey of Flight Advanced Systems Exam',
        description: 'Pass advanced modules in Aerospace: The Journey of Flight covering orbital mechanics, hypersonic flight, and cyber defense.',
        passingStandard: 'Score 80%+ on advanced aerospace examination.',
        officialReference: 'Aerospace: The Journey of Flight Part 5',
        recommendedPrepTimeWeeks: 4,
      },
      {
        id: 'cmaj_fitness',
        category: 'Fitness',
        title: 'Field Grade CPFT Benchmark Assessment',
        description: 'Participate in physical fitness testing and maintain Healthy Fitness Zone benchmarks.',
        passingStandard: 'Pass HFZ standards across CPFT events.',
        officialReference: 'CAPP 60-50',
        recommendedPrepTimeWeeks: 3,
      },
      {
        id: 'cmaj_char',
        category: 'Character',
        title: 'Character Development Seminar Facilitation',
        description: 'Assist squadron chaplain or moral leadership officer in facilitating a Character Development Forum.',
        passingStandard: 'Session facilitation recorded on Form 50-1.',
        officialReference: 'CAPP 60-12',
        recommendedPrepTimeWeeks: 2,
      },
    ],
    resources: [
      {
        id: 'res_l2l_vol4',
        title: 'Learn to Lead: Volume 4 (Strategic Perspective)',
        code: 'L2L Vol 4',
        type: 'Textbook',
        description: 'Executive leadership, strategic planning, vision formulation, SWOT analysis, and institutional culture management for senior cadet officers.',
        chapterOrModule: 'Chapters 15 & 16: "Executive Leadership" & "Strategic Perspective"',
        keyConcepts: ['Strategic Vision & Core Purpose', 'SWOT Analysis (Strengths, Weaknesses, Opportunities, Threats)', 'Leading Transformational Change', 'Institutional Ethics & Accountability', 'Executive Delegation & Accountability'],
      },
      {
        id: 'res_jof_advanced',
        title: 'Aerospace: The Journey of Flight (Advanced Modules)',
        code: 'JOF Advanced',
        type: 'Textbook',
        description: 'Advanced aerospace technologies: hypersonic aerodynamics, stealth design, ballistic missile defense, and military space operations.',
        chapterOrModule: 'Parts 5 & 6: Modern Aerospace Systems',
        keyConcepts: ['Hypersonic Aerodynamics (Mach 5+)', 'Stealth Technology & Radar Cross Section', 'Space Domain Awareness & Military Satellites', 'Unmanned Aerial Systems (UAS) Integration'],
      },
    ],
    weeklySyllabus: [
      {
        weekNumber: 1,
        theme: 'Strategic Vision & SWOT Analysis',
        focusArea: 'Leadership',
        objective: 'Read L2L Chapter 15 and conduct a comprehensive SWOT analysis of your cadet squadron.',
        tasks: [
          {
            id: 'maj_w1_t1',
            label: 'Read L2L Chapter 15: Executive Leadership & Strategic Vision',
            resourceName: 'L2L Vol 4 Ch 15',
            resourceRef: 'Pages 5–28',
            estimatedMinutes: 50,
            practicalAction: 'Formulate a 1-year strategic vision statement for your squadron’s cadet training program.',
          },
          {
            id: 'maj_w1_t2',
            label: 'Conduct a formal SWOT analysis for cadet retention and recruitment',
            resourceName: 'L2L Vol 4 Ch 15',
            resourceRef: 'SWOT Framework',
            estimatedMinutes: 45,
            practicalAction: 'Present the SWOT matrix to your squadron commander with 3 actionable recommendations.',
          },
        ],
      },
      {
        weekNumber: 2,
        theme: 'Hypersonic Flight & Space Domain Operations',
        focusArea: 'Aerospace',
        objective: 'Study advanced aerospace systems and emerging space defense technologies.',
        tasks: [
          {
            id: 'maj_w2_t1',
            label: 'Study Journey of Flight: Hypersonic Flight and Stealth Technology',
            resourceName: 'JOF Advanced',
            resourceRef: 'Chapters 18–20',
            estimatedMinutes: 50,
            practicalAction: 'Explain thermal barrier challenges and scramjet propulsion at Mach 5+.',
          },
          {
            id: 'maj_w2_t2',
            label: 'Study U.S. Space Force and Military Satellite Communications',
            resourceName: 'JOF Advanced',
            resourceRef: 'Space Defense Chapters',
            estimatedMinutes: 45,
            practicalAction: 'Analyze how anti-satellite (ASAT) weapons and GPS jamming threaten modern civil and military aviation.',
          },
        ],
      },
      {
        weekNumber: 3,
        theme: 'Executive Staff Coordination & Advanced Testing',
        focusArea: 'Leadership',
        objective: 'Lead cadet staff meeting and pass Journey of Flight advanced systems exam.',
        tasks: [
          {
            id: 'maj_w3_t1',
            label: 'Preside over cadet staff planning meeting for the quarterly training schedule',
            resourceName: 'CAPR 60-1',
            resourceRef: 'Squadron Staff Guide',
            estimatedMinutes: 60,
            practicalAction: 'Coordinate flight commanders, safety officers, and aerospace staff to finalize the monthly calendar.',
          },
          {
            id: 'maj_w3_t2',
            label: 'Pass Journey of Flight advanced systems exam in eServices',
            resourceName: 'eServices Testing',
            resourceRef: 'JOF Advanced Exam',
            estimatedMinutes: 40,
            practicalAction: 'Score 80%+ on the exam.',
          },
        ],
      },
      {
        weekNumber: 4,
        theme: 'Leadership Exam & Field Grade Promotion Board',
        focusArea: 'Leadership',
        objective: 'Pass Learn to Lead Chapter 15 & 16 exam and receive promotion to Cadet Major.',
        tasks: [
          {
            id: 'maj_w4_t1',
            label: 'Pass Learn to Lead Volume 4 Chapter 15 & 16 exam in eServices',
            resourceName: 'Cadet Interactive',
            resourceRef: 'Vol 4 Exam',
            estimatedMinutes: 40,
            practicalAction: 'Score 80%+ on executive leadership test.',
          },
          {
            id: 'maj_w4_t2',
            label: 'Complete promotion interview with Squadron Commander and pin on silver diamond',
            resourceName: 'Form 50-1',
            resourceRef: 'Field Grade Board',
            estimatedMinutes: 30,
            practicalAction: 'Assume Field Grade Officer responsibilities as Cadet Major.',
          },
        ],
      },
    ],
    drillExamTips: [
      'Field Grade Officers command ceremonies with dignified military bearing, observing protocol and ceremonial sequence flawlessly.',
      'Ensure junior officers and NCOs receive thoughtful, constructive critiques after drill events.',
    ],
    boardReviewQuestions: [
      {
        question: 'Who was Dr. Sally Ride and what historical milestone did she achieve?',
        expectedAnswerDoctrine:
          'Dr. Sally Ride was a physicist, educator, and NASA astronaut who, on June 18, 1983, aboard Space Shuttle Challenger (STS-7), became the first American woman to fly in space. She later championed STEM education for young people nationwide.',
        doctrineReference: 'Learn to Lead Phase IV Historical Profile',
      },
      {
        question: 'What are the 4 components of a SWOT analysis in strategic planning?',
        expectedAnswerDoctrine:
          '1. Strengths (internal positive attributes and capabilities), 2. Weaknesses (internal vulnerabilities and deficiencies), 3. Opportunities (external factors and trends that could facilitate growth), and 4. Threats (external risks and obstacles that could hinder success).',
        doctrineReference: 'Learn to Lead Volume 4, Chapter 15',
      },
      {
        question: 'How does an executive leader’s vision differ from a standard operational goal?',
        expectedAnswerDoctrine:
          'A goal is a specific, measurable objective with a defined deadline. A vision is a compelling, inspiring mental image of the desired future state of the entire organization that provides overarching direction, purpose, and motivation for all long-term goals.',
        doctrineReference: 'Learn to Lead Volume 4, Chapter 15',
      },
    ],
  },

  // -------------------------------------------------------------
  // C/Maj -> C/Lt Col (Milestone 4 - Gen Ira C. Eaker Award)
  // -------------------------------------------------------------
  c_maj: {
    currentRankId: 'c_maj',
    targetRankId: 'c_ltcol',
    targetRankName: 'Cadet Lieutenant Colonel',
    targetAbbreviation: 'C/Lt Col',
    targetAchievementName: 'Milestone 4 - Gen Ira C. Eaker Award',
    targetRibbonName: 'Gen Ira C. Eaker Ribbon',
    targetRibbonColors: ['#1f4068', '#162447', '#e43f5a', '#162447', '#1f4068'],
    targetInsignia: 'Two diamonds (silver rhombi)',
    phase: 4,
    minimumTimeInGradeDays: 56,
    honorPointsRequired: 7400,
    summaryQuote: '"We would rather you judge us by our deeds than by our words." — Gen Ira C. Eaker',
    overview:
      'EARN THE GENERAL IRA C. EAKER AWARD & APPOINTMENT AS CADET LIEUTENANT COLONEL. Complete Cadet Officer School (COS at Maxwell AFB) or Region Cadet Leadership School (RCLS), deliver a formal oral presentation to an outside civic group, write an academic essay on a national leadership topic, and pass CPFT in the Healthy Fitness Zone.',
    levelUpRequirements: [
      {
        id: 'eaker_leadership_school',
        category: 'Milestone Special',
        title: 'Cadet Officer School (COS) or RCLS Graduation',
        description: 'Successfully graduate from Cadet Officer School (COS at Air University, Maxwell AFB, AL) or an accredited Region Cadet Leadership School (RCLS).',
        passingStandard: 'Official certificate of graduation recorded in eServices.',
        officialReference: 'CAPR 60-1',
        recommendedPrepTimeWeeks: 12,
      },
      {
        id: 'eaker_civic_presentation',
        category: 'Leadership',
        title: 'Formal Civic Oral Presentation',
        description: 'Deliver a prepared 20–30 minute presentation to a non-CAP civic group (e.g. Rotary Club, school assembly, VFW, or local government) on an aerospace, cyber, or leadership topic.',
        passingStandard: 'Satisfactory evaluation on Form 60-90 submitted to Wing.',
        officialReference: 'CAPP 60-31 & CAPR 60-1',
        recommendedPrepTimeWeeks: 6,
      },
      {
        id: 'eaker_academic_essay',
        category: 'Leadership',
        title: 'Academic Analytical Essay',
        description: 'Research, author, and submit a 3–5 page formal analytical essay on a major national defense, aerospace technology, or leadership ethics topic.',
        passingStandard: 'Approved by Wing Director of Cadet Programs.',
        officialReference: 'CAPR 60-1',
        recommendedPrepTimeWeeks: 6,
      },
      {
        id: 'eaker_fitness',
        category: 'Fitness',
        title: 'CPFT Mandatory Healthy Fitness Zone Pass',
        description: 'Must pass all 4 CPFT physical fitness events in the Healthy Fitness Zone.',
        passingStandard: 'Pass 4 of 4 events in HFZ.',
        officialReference: 'CAPP 60-50',
        recommendedPrepTimeWeeks: 4,
      },
      {
        id: 'eaker_char',
        category: 'Character',
        title: 'Character Development Leadership',
        description: 'Lead a character development session and receive squadron and wing commander recommendations.',
        passingStandard: 'Commander recommendation recorded in eServices.',
        officialReference: 'CAPR 60-1',
        recommendedPrepTimeWeeks: 2,
      },
    ],
    resources: [
      {
        id: 'res_l2l_vol4_eaker',
        title: 'Learn to Lead: Volume 4 (Complete)',
        code: 'L2L Vol 4',
        type: 'Textbook',
        description: 'Chapters 15 through 18: Strategic perspective, organizational leadership, national defense policy, and the ethics of strategic power.',
        chapterOrModule: 'Complete Volume 4 (Chapters 15–18)',
        keyConcepts: ['Strategic Leadership Principles', 'Civilian-Military Relations in the U.S.', 'Joint Military Doctrine & Coalitions', 'Public Speaking to Civic Audiences', 'Formal Research & Academic Writing'],
      },
      {
        id: 'res_cos_curriculum',
        title: 'Cadet Officer School / RCLS Curriculum',
        code: 'COS Syllabus',
        type: 'Manual',
        description: 'Air University leadership doctrine, seminar case studies, strategic leadership models, and problem-solving methodologies.',
        chapterOrModule: 'COS Leadership Curriculum',
        keyConcepts: ['Seminar Problem Solving', 'Executive Decision Analysis', 'Airpower Doctrine (AFDP-1)', 'Ethics of Strategic Command'],
      },
    ],
    weeklySyllabus: [
      {
        weekNumber: 1,
        theme: 'Cadet Officer School / RCLS Preparation & Essay Topic Selection',
        focusArea: 'Milestone Special',
        objective: 'Apply for or complete COS/RCLS and select your academic essay research question.',
        tasks: [
          {
            id: 'ek_w1_t1',
            label: 'Review COS/RCLS curriculum and confirm enrollment or graduation records',
            resourceName: 'COS Syllabus',
            resourceRef: 'Enrollment Portal',
            estimatedMinutes: 45,
            practicalAction: 'Verify that attendance records or graduation certificates are uploaded to eServices.',
          },
          {
            id: 'ek_w1_t2',
            label: 'Select academic essay topic on a contemporary aerospace or national defense question',
            resourceName: 'CAPR 60-1',
            resourceRef: 'Eaker Essay Guide',
            estimatedMinutes: 60,
            practicalAction: 'Develop a clear thesis statement and compile at least 5 scholarly or governmental sources.',
          },
        ],
      },
      {
        weekNumber: 2,
        theme: 'Civic Presentation Scheduling & Drafting',
        focusArea: 'Leadership',
        objective: 'Schedule a 20–30 minute presentation to an outside civic group (Rotary, VFW, school).',
        tasks: [
          {
            id: 'ek_w2_t1',
            label: 'Contact an outside civic organization and schedule your formal briefing date',
            resourceName: 'CAPP 60-31',
            resourceRef: 'Civic Presentation Guide',
            estimatedMinutes: 45,
            practicalAction: 'Secure written confirmation from the civic group leader on date, topic, and expected audience.',
          },
          {
            id: 'ek_w2_t2',
            label: 'Draft outline and presentation slides on aerospace leadership or Civil Air Patrol missions',
            resourceName: 'L2L Vol 4',
            resourceRef: 'Speech Construction',
            estimatedMinutes: 60,
            practicalAction: 'Rehearse delivering the presentation with professional projection and visual aids.',
          },
        ],
      },
      {
        weekNumber: 3,
        theme: 'Academic Essay Writing & Civic Presentation Delivery',
        focusArea: 'Leadership',
        objective: 'Deliver presentation to the civic group and finalize your 3–5 page academic essay.',
        tasks: [
          {
            id: 'ek_w3_t1',
            label: 'Deliver 20–30 minute formal presentation to the civic group',
            resourceName: 'CAP Form 60-90',
            resourceRef: 'Civic Presentation Rubric',
            estimatedMinutes: 45,
            practicalAction: 'Present with confidence, answer audience questions, and obtain completed evaluation letter.',
          },
          {
            id: 'ek_w3_t2',
            label: 'Complete and submit 3–5 page academic essay to Wing Director of Cadet Programs',
            resourceName: 'CAPR 60-1',
            resourceRef: 'Academic Writing Standards',
            estimatedMinutes: 90,
            practicalAction: 'Ensure APA citations, rigorous logical structure, and thorough proofreading.',
          },
        ],
      },
      {
        weekNumber: 4,
        theme: 'CPFT Mandatory Pass & Eaker Award Promotion',
        focusArea: 'Fitness',
        objective: 'Pass CPFT in Healthy Fitness Zone and complete Eaker promotion ceremony.',
        tasks: [
          {
            id: 'ek_w4_t1',
            label: 'Pass CPFT across all 4 events in the Healthy Fitness Zone',
            resourceName: 'CAPP 60-50',
            resourceRef: 'HFZ Protocol',
            estimatedMinutes: 45,
            practicalAction: 'Attain passing scores logged by squadron testing officer on Form 50-1.',
          },
          {
            id: 'ek_w4_t2',
            label: 'Receive General Ira C. Eaker Award and pin on Cadet Lieutenant Colonel diamonds',
            resourceName: 'Form 50-1',
            resourceRef: 'Eaker Appointment',
            estimatedMinutes: 30,
            practicalAction: 'Pin on your two silver diamonds and prepare for the pinnacle milestone: The Spaatz Award!',
          },
        ],
      },
    ],
    drillExamTips: [
      'Cadet Lieutenant Colonels command large-scale wing reviews, encampments, and multi-unit formations.',
      'Maintain an unshakeable military bearing that serves as a living model for all cadets in your wing.',
    ],
    boardReviewQuestions: [
      {
        question: 'Who was General Ira C. Eaker and what was his pivotal role in World War II?',
        expectedAnswerDoctrine:
          'Gen Ira C. Eaker was a military aviation pioneer who commanded the U.S. Eighth Air Force in Europe during WWII. He was the chief architect of the daylight precision bombing campaign against Nazi Germany, famously defending daylight doctrine with the quote: "We would rather you judge us by our deeds than by our words."',
        doctrineReference: 'Learn to Lead Milestone 4 Eaker Profile',
      },
      {
        question: 'What is the constitutional principle of civilian control of the military in the United States?',
        expectedAnswerDoctrine:
          'Civilian control of the military is a cornerstone of American democracy established in the U.S. Constitution, ensuring that ultimate command of the armed forces rests with elected civilian leaders (the President as Commander in Chief and Congress with power to declare war and fund the military), subordinating military force to the will of the people.',
        doctrineReference: 'Learn to Lead Volume 4, Chapter 17',
      },
      {
        question: 'What key lessons in executive leadership are taught at Cadet Officer School (COS)?',
        expectedAnswerDoctrine:
          'COS teaches strategic thinking, seminar-based critical problem solving, institutional vision, team cohesion under high pressure, and the transition from direct flight leadership to indirect institutional command.',
        doctrineReference: 'CAPP 60-1 Cadet Program Management',
      },
    ],
  },

  // -------------------------------------------------------------
  // C/Lt Col -> C/Col (Milestone 5 - Gen Carl A. Spaatz Award)
  // -------------------------------------------------------------
  c_ltcol: {
    currentRankId: 'c_ltcol',
    targetRankId: 'c_col',
    targetRankName: 'Cadet Colonel',
    targetAbbreviation: 'C/Col',
    targetAchievementName: 'Milestone 5 - Gen Carl A. Spaatz Award',
    targetRibbonName: 'Gen Carl A. Spaatz Award Ribbon',
    targetRibbonColors: ['#002b49', '#ffd100', '#ffffff', '#c8102e', '#002b49'],
    targetInsignia: 'Three diamonds (silver rhombi)',
    phase: 4,
    minimumTimeInGradeDays: 56,
    honorPointsRequired: 8500,
    summaryQuote: '"Airpower is like poker. A second-best hand is no good at all." — Gen George S. Patton',
    overview:
      'REACH THE PINNACLE OF THE CADET PROGRAM: THE GENERAL CARL A. SPAATZ AWARD. Fewer than one-half of one percent of cadets achieve this honor. Pass the proctored 4-part Spaatz Examination: 1. Closed-book Leadership Exam (Learn to Lead Volumes 1–4), 2. Closed-book Aerospace Exam (Aerospace: The Journey of Flight), 3. Physical Fitness Test (highest CPFT standards), and 4. Timed 60-minute proctored essay on a contemporary leadership dilemma.',
    levelUpRequirements: [
      {
        id: 'spaatz_ldr_exam',
        category: 'Leadership',
        title: 'Spaatz Proctored Leadership Exam (Closed-Book)',
        description: 'Comprehensive 60-minute, 50-question closed-book exam covering Learn to Lead Volumes 1 through 4 (Chapters 1 to 18).',
        passingStandard: 'Score 80% or higher proctored by Wing Testing Officer.',
        officialReference: 'Learn to Lead Volumes 1–4 Comprehensive',
        recommendedPrepTimeWeeks: 8,
      },
      {
        id: 'spaatz_aero_exam',
        category: 'Aerospace',
        title: 'Spaatz Proctored Aerospace Exam (Closed-Book)',
        description: 'Comprehensive 60-minute, 50-question closed-book exam covering the entire Aerospace: The Journey of Flight textbook.',
        passingStandard: 'Score 80% or higher proctored by Wing Testing Officer.',
        officialReference: 'Aerospace: The Journey of Flight Comprehensive',
        recommendedPrepTimeWeeks: 8,
      },
      {
        id: 'spaatz_timed_essay',
        category: 'Milestone Special',
        title: 'Spaatz Timed Proctored Essay',
        description: '60-minute proctored analytical essay on an ethical, military, or aerospace dilemma assigned at testing time and graded by National Headquarters.',
        passingStandard: 'Passing score awarded by National Headquarters review board.',
        officialReference: 'CAPR 60-1 & NHQ Spaatz Board',
        recommendedPrepTimeWeeks: 6,
      },
      {
        id: 'spaatz_fitness',
        category: 'Fitness',
        title: 'Spaatz Physical Fitness Exam (Highest Standards)',
        description: 'Must pass all 4 CPFT events in the Healthy Fitness Zone under strict proctoring standards (1-Mile Run, Push-ups, Curl-ups, and Sit-and-Reach).',
        passingStandard: 'Pass 4 of 4 events in HFZ without exception.',
        officialReference: 'CAPP 60-50 & CAPR 60-1',
        recommendedPrepTimeWeeks: 6,
      },
      {
        id: 'spaatz_board',
        category: 'Character',
        title: 'Wing Commander Review & National Presentation',
        description: 'Approval by Wing Commander and national certification; award presented by a State Governor, Member of Congress, or General Officer.',
        passingStandard: 'National Spaatz Certificate and Spaatz Number issued.',
        officialReference: 'CAPR 60-1',
        recommendedPrepTimeWeeks: 4,
      },
    ],
    resources: [
      {
        id: 'res_spaatz_l2l_all',
        title: 'Learn to Lead: Complete Volumes 1 through 4',
        code: 'L2L Complete',
        type: 'Textbook',
        description: 'Mastery of all 18 chapters: Followership, NCO leadership, indirect organizational leadership, and executive strategic perspective.',
        chapterOrModule: 'Volumes 1, 2, 3, & 4 (Chapters 1–18)',
        keyConcepts: ['Core Values & Honor Code', 'NCO Supervision & Mentoring', 'Organizational Culture & Climate', 'Strategic Planning & Vision', 'Civilian Control of the Military', 'Ethics of Command'],
      },
      {
        id: 'res_spaatz_jof_all',
        title: 'Aerospace: The Journey of Flight (Complete)',
        code: 'JOF Complete',
        type: 'Textbook',
        description: 'Mastery of all sections: Aviation history, aerodynamics, flight systems, meteorology, rocketry, space exploration, and aerospace defense.',
        chapterOrModule: 'Complete Journey of Flight Textbook',
        keyConcepts: ['Aviation History & Milestones', 'Four Forces & Flight Dynamics', 'Aircraft Engines & Systems', 'Weather & Meteorology', 'Orbital Mechanics & Satellite Systems', 'Military Airpower & Space Strategy'],
      },
    ],
    weeklySyllabus: [
      {
        weekNumber: 1,
        theme: 'Learn to Lead Comprehensive Master Review (Vols 1 & 2)',
        focusArea: 'Leadership',
        objective: 'Intensive study of Learn to Lead Volumes 1 and 2 (followership, team dynamics, communication, and management).',
        tasks: [
          {
            id: 'sp_w1_t1',
            label: 'Review Learn to Lead Volumes 1 & 2 (Chapters 1 through 8)',
            resourceName: 'L2L Complete',
            resourceRef: 'Volumes 1 & 2',
            estimatedMinutes: 90,
            practicalAction: 'Take closed-book practice tests covering followership, NCO roles, and communication models.',
          },
          {
            id: 'sp_w1_t2',
            label: 'Daily CPFT fitness conditioning (Mile run pacing and push-ups)',
            resourceName: 'CAPP 60-50',
            resourceRef: 'Fitness Protocol',
            estimatedMinutes: 45,
            practicalAction: 'Time your 1-mile run to guarantee passing comfortably within the Healthy Fitness Zone.',
          },
        ],
      },
      {
        weekNumber: 2,
        theme: 'Learn to Lead Comprehensive Master Review (Vols 3 & 4)',
        focusArea: 'Leadership',
        objective: 'Intensive study of Learn to Lead Volumes 3 and 4 (indirect leadership, counseling, strategic vision, and civilian control).',
        tasks: [
          {
            id: 'sp_w2_t1',
            label: 'Review Learn to Lead Volumes 3 & 4 (Chapters 9 through 18)',
            resourceName: 'L2L Complete',
            resourceRef: 'Volumes 3 & 4',
            estimatedMinutes: 90,
            practicalAction: 'Outline essays on ethical command dilemmas, strategic vision, and organizational change.',
          },
          {
            id: 'sp_w2_t2',
            label: 'Practice 60-minute timed essay writing under proctored conditions',
            resourceName: 'NHQ Spaatz Board',
            resourceRef: 'Essay Prompts',
            estimatedMinutes: 60,
            practicalAction: 'Write a full 3-page essay responding to a sample national security prompt within 60 minutes.',
          },
        ],
      },
      {
        weekNumber: 3,
        theme: 'Journey of Flight Complete Textbook Master Review',
        focusArea: 'Aerospace',
        objective: 'Comprehensive study of all chapters of Aerospace: The Journey of Flight.',
        tasks: [
          {
            id: 'sp_w3_t1',
            label: 'Master review of Journey of Flight: History, Aerodynamics, and Propulsion',
            resourceName: 'JOF Complete',
            resourceRef: 'Parts 1, 2, & 3',
            estimatedMinutes: 90,
            practicalAction: 'Review Bernoulli formulas, wing lift equations, Mach numbers, and engine cycles.',
          },
          {
            id: 'sp_w3_t2',
            label: 'Master review of Journey of Flight: Space Environment, Orbits, and Defense',
            resourceName: 'JOF Complete',
            resourceRef: 'Parts 4, 5, & 6',
            estimatedMinutes: 90,
            practicalAction: 'Review Kepler’s laws of planetary motion, escape velocities, and satellite telemetry systems.',
          },
        ],
      },
      {
        weekNumber: 4,
        theme: 'The Proctored Spaatz Examination & Promotion',
        focusArea: 'Milestone Special',
        objective: 'Execute the proctored 4-part Spaatz Examination with Wing Testing Officers.',
        tasks: [
          {
            id: 'sp_w4_t1',
            label: 'Take proctored Spaatz Leadership Exam and Aerospace Exam (closed-book, 80%+)',
            resourceName: 'Wing Testing Office',
            resourceRef: 'Spaatz Exams',
            estimatedMinutes: 120,
            practicalAction: 'Score 80%+ on both 50-question closed-book examinations.',
          },
          {
            id: 'sp_w4_t2',
            label: 'Complete timed 60-minute proctored essay and pass CPFT in Healthy Fitness Zone',
            resourceName: 'NHQ Spaatz Board',
            resourceRef: 'Spaatz Essay & CPFT',
            estimatedMinutes: 90,
            practicalAction: 'Pass all 4 physical fitness events and submit essay to NHQ for evaluation.',
          },
          {
            id: 'sp_w4_t3',
            label: 'Receive General Carl A. Spaatz Award (#) and appointment as Cadet Colonel',
            resourceName: 'National Headquarters',
            resourceRef: 'Spaatz Presentation',
            estimatedMinutes: 60,
            practicalAction: 'Pin on three silver diamonds presented by the Governor or General Officer, joining the Spaatz Association!',
          },
        ],
      },
    ],
    drillExamTips: [
      'Cadet Colonels embody the pinnacle of military bearing, dignity, and calm authority under any circumstance.',
      'Lead with servant leadership: inspire, mentor, and prepare junior cadets to surpass your own accomplishments.',
    ],
    boardReviewQuestions: [
      {
        question: 'Who was General Carl A. "Tooey" Spaatz and what were his monumental military contributions?',
        expectedAnswerDoctrine:
          'Gen Carl A. Spaatz was an aviation pioneer who set endurance flight records in the Question Mark (1929), commanded the U.S. Strategic Air Forces in Europe during WWII overseeing the defeat of the Luftwaffe, commanded strategic bombing forces in the Pacific, and in 1947 became the very first Chief of Staff of the independent United States Air Force. He also served as the first Chairman of the Civil Air Patrol National Board.',
        doctrineReference: 'Milestone 5 Spaatz Award Profile',
      },
      {
        question: 'What percentage of Civil Air Patrol cadets earn the General Carl A. Spaatz Award?',
        expectedAnswerDoctrine:
          'Fewer than one-half of one percent (less than 0.5%) of all cadets who join Civil Air Patrol earn the Spaatz Award, making it one of the most prestigious youth leadership awards in the United States.',
        doctrineReference: 'CAPR 60-1 Chapter 5',
      },
      {
        question: 'What is the highest ethical obligation of a senior commander according to Learn to Lead Volume 4?',
        expectedAnswerDoctrine:
          'To place the welfare of the nation, the success of the mission, and the safety and development of their people above personal ambition, ego, or self-interest, living as an incorruptible guardian of the Core Values.',
        doctrineReference: 'Learn to Lead Volume 4, Chapter 18',
      },
    ],
  },
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
