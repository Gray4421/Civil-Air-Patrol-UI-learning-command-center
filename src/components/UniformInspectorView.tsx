import React, { useState, useEffect } from 'react';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Check,
  ChevronRight,
  ShieldCheck,
  Eye,
  Crosshair,
  Flame,
  HelpCircle,
  Sparkles,
  BookOpen,
  ArrowRight,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';

export interface UniformElement {
  id: string;
  number: number;
  name: string;
  category: string;
  pngImage: string;
  measurementSpec: string;
  aspectCovered: string;
  referenceQuote: string;
  maleRule: string;
  femaleRule: string;
  inspectionTips: string[];
  quizScenario: {
    question: string;
    options: {
      id: string;
      text: string;
      isCorrect: boolean;
      rationale: string;
    }[];
    failureRule: string;
  };
}

export const UNIFORM_ELEMENTS: UniformElement[] = [
  {
    id: 'flight_cap',
    number: 1,
    name: 'Flight Cap & Cadet Device',
    category: 'Headgear & Insignia',
    pngImage: '/uniform/1_flight_cap.png',
    measurementSpec: '1½ inches from front crease, tilted slightly right',
    aspectCovered: 'Device distance, cap tilt, eyebrow clearance, indoor stowage',
    referenceQuote: 'CAPR 39-1, Para 5.1.1: Cadet officer or enlisted flight cap device is worn on the left side of the flight cap, centered vertically and 1½ inches from the front fold. Cap is worn slightly tilted to the right, approximately 1 inch above the eyebrows.',
    maleRule: 'Hair cannot touch ears or collar. Bangs must remain tucked under the flight cap without protruding.',
    femaleRule: 'Hair may be visible in front of cap if styled conservatively; must not exceed bottom of collar in back.',
    inspectionTips: [
      'Check device alignment using an insignia ruler: exactly 1.5 inches from the front crease.',
      'Cap rests 1 inch above eyebrows, tilted slightly to the wearer’s right.',
      'When indoors and cap is removed, tuck under belt on left side between 1st & 2nd loops, opening facing rear.'
    ],
    quizScenario: {
      question: 'During your formal flight line inspection, the flight commander measures the cadet insignia device on your flight cap. What is the mandatory regulation distance and placement?',
      options: [
        {
          id: 'fc_1',
          text: 'Flush against the front fold of the flight cap',
          isCorrect: false,
          rationale: 'Placement flush to the front fold is unauthorized and causes the device to distort the cap crease.'
        },
        {
          id: 'fc_2',
          text: 'Centered vertically on the left side, exactly 1½ inches from the front crease',
          isCorrect: true,
          rationale: 'Correct! CAPR 39-1 dictates the device rests 1½ inches from the front crease on the left side.'
        },
        {
          id: 'fc_3',
          text: 'Centered on the right side of the cap, 2 inches from the front crease',
          isCorrect: false,
          rationale: 'The device must be worn on the LEFT side of the flight cap, never on the right.'
        },
        {
          id: 'fc_4',
          text: '1 inch above the left ear, aligned with the rear seams',
          isCorrect: false,
          rationale: 'Alignment is measured strictly from the front crease fold, not relative to the ear.'
        }
      ],
      failureRule: 'CAPR 39-1 §5.1.1: The flight cap insignia must be worn on the left side, 1½ inches from the front crease.'
    }
  },
  {
    id: 'collar_chevrons',
    number: 2,
    name: 'Collar Grade Chevrons',
    category: 'Collar Insignia',
    pngImage: '/uniform/2_collar_chevrons.png',
    measurementSpec: '1 inch from bottom edge, centered & parallel',
    aspectCovered: 'Bilateral collar spacing, parallel edge alignment, chevron orientation',
    referenceQuote: 'CAPR 39-1, Para 4.1.5: Cadet airmen and NCO grade chevrons on the short-sleeve shirt rest 1 inch from the collar edge, parallel to that edge and centered between outer edges.',
    maleRule: 'Chevrons centered between collar points and neck seam on both left and right collars.',
    femaleRule: 'Identical standard: 1 inch from bottom edge, parallel to the leading edge of the collar lapel.',
    inspectionTips: [
      'Use an insignia gauge or 1-inch ruler to verify exact distance on both collar points.',
      'Ensure chevron points downward (for cadet airmen) and pins are level without tilting.',
      'Cardboard backing or rubber enforcers prevent brass from sagging on the cloth collar.'
    ],
    quizScenario: {
      question: 'The inspector steps in front of you with a measurement gauge to inspect your short-sleeve blues collar chevrons. What is the regulation positioning standard?',
      options: [
        {
          id: 'cc_1',
          text: '½ inch from the collar point, angled diagonally toward the tie tab',
          isCorrect: false,
          rationale: 'Collar chevrons must be 1 inch from the edge, not ½ inch, and must be parallel to the edge.'
        },
        {
          id: 'cc_2',
          text: '1 inch from the bottom edge of the collar, centered and parallel to that edge',
          isCorrect: true,
          rationale: 'Correct! Both collars must have chevrons centered and parallel, exactly 1 inch from the edge.'
        },
        {
          id: 'cc_3',
          text: 'Touching the top shoulder seam, centered horizontally on the epaulets',
          isCorrect: false,
          rationale: 'On the short-sleeve shirt, cadet airmen wear chevrons on the collar lapels, not on epaulets.'
        },
        {
          id: 'cc_4',
          text: '2 inches from the bottom edge, pinned vertically against the neck seam',
          isCorrect: false,
          rationale: '2 inches is twice the allowed distance and constitutes an immediate inspection gig.'
        }
      ],
      failureRule: 'CAPR 39-1 §4.1.5: Collar chevrons must be centered 1 inch from the collar edge, parallel to that edge.'
    }
  },
  {
    id: 'ribbon_rack',
    number: 3,
    name: 'Left Breast Ribbon Rack',
    category: 'Awards & Precedence',
    pngImage: '/uniform/3_ribbon_rack.png',
    measurementSpec: 'Centered on / resting flush on left pocket welt',
    aspectCovered: 'Order of precedence, horizontal alignment, ribbon spacing and cleanliness',
    referenceQuote: 'CAPP 60-20 & CAPR 39-1: Ribbons must be worn in strict order of precedence. Male: Centered on and resting flush on the top seam of the left pocket welt. Female: Centered on left side parallel to ground, bottom row aligned with bottom of nametag.',
    maleRule: 'Rests flush on top seam of left breast pocket welt, centered horizontally on the pocket.',
    femaleRule: 'Aligned with the bottom of the nameplate on the right side, centered between armhole and placket.',
    inspectionTips: [
      'Verify strict order of precedence: Curry first, Arnold second, Feik third, Wright Brothers fourth.',
      'Silver star attachment centered on individual ribbon for honor credit.',
      'No fraying, lint, or crooked ribbon bars; use stiff card spacer behind mounting bar.'
    ],
    quizScenario: {
      question: 'When mounting your cadet ribbons on your blues shirt, how must your awards be organized according to CAP precedence rules?',
      options: [
        {
          id: 'rr_1',
          text: 'Alphabetically by the name of the aerospace pioneer or milestone',
          isCorrect: false,
          rationale: 'Ribbons are never arranged alphabetically; they follow a strict statutory order of precedence.'
        },
        {
          id: 'rr_2',
          text: 'Highest precedence award positioned on the top row toward the wearer’s right (Curry outranks Arnold, Feik, etc.)',
          isCorrect: true,
          rationale: 'Correct! Ribbons follow official CAP order of precedence, with the highest award at the top right.'
        },
        {
          id: 'rr_3',
          text: 'In the chronological order in which you earned them, newest awards on bottom',
          isCorrect: false,
          rationale: 'Chronological order is incorrect; statutory precedence always dictates ribbon placement.'
        },
        {
          id: 'rr_4',
          text: 'Grouped by ribbon color to achieve visual symmetry across the pocket',
          isCorrect: false,
          rationale: 'Ribbons cannot be reorganized for color aesthetics; precedence is mandatory.'
        }
      ],
      failureRule: 'CAPP 60-20 & CAPR 39-1: Ribbons must strictly follow CAP order of precedence, highest award top right.'
    }
  },
  {
    id: 'nameplate',
    number: 4,
    name: 'Cadet Blue Nameplate',
    category: 'Identification',
    pngImage: '/uniform/4_nameplate.png',
    measurementSpec: 'Centered flush on right pocket welt',
    aspectCovered: 'Horizontal leveling, centering over pocket welt, surname engraving',
    referenceQuote: 'CAPR 39-1, Para 4.1.6: Standard blue plastic 3-line nameplate. Male: Centered horizontally on and resting flush on top edge of right breast pocket welt. Female: Centered horizontally on right breast, parallel to ground, aligned with bottom of ribbons.',
    maleRule: 'Rests flush on top edge of right pocket flap, centered left-to-right on the pocket.',
    femaleRule: 'Centered horizontally on right breast, aligned with the bottom row of ribbons on the left side.',
    inspectionTips: [
      'White engraved lettering must be clean and free of dust or lint.',
      'Nameplate must sit completely level and parallel to the deck/ground.',
      'Must rest flush on the pocket seam with zero gap or overlap for male cadets.'
    ],
    quizScenario: {
      question: 'Where must the standard 3-line blue cadet nameplate be mounted on a male cadet’s short-sleeve blues shirt?',
      options: [
        {
          id: 'np_1',
          text: '1 inch above the right pocket flap, centered between buttons and shoulder',
          isCorrect: false,
          rationale: 'Hovering 1 inch above the pocket is unauthorized for male shirts; it must rest flush on the seam.'
        },
        {
          id: 'np_2',
          text: 'Centered horizontally and resting flush on the top seam of the right breast pocket welt',
          isCorrect: true,
          rationale: 'Correct! For male cadets, the nameplate rests directly on the top edge of the right pocket welt.'
        },
        {
          id: 'np_3',
          text: 'Centered over the buttonhole inside the right pocket flap',
          isCorrect: false,
          rationale: 'The nameplate is worn on the pocket welt seam, never inside the pocket or over the button.'
        },
        {
          id: 'np_4',
          text: 'Pinned to the right collar lapel next to the grade chevron',
          isCorrect: false,
          rationale: 'The collar is reserved for grade chevrons; nametags are worn strictly on the breast.'
        }
      ],
      failureRule: 'CAPR 39-1 §4.1.6: The male nameplate must be centered on and resting flush on the right pocket welt.'
    }
  },
  {
    id: 'specialty_badges',
    number: 5,
    name: 'Aeronautical & Specialty Badges',
    category: 'Badges & Wings',
    pngImage: '/uniform/5_specialty_badges.png',
    measurementSpec: 'Centered ½ inch above ribbons or pocket welt',
    aspectCovered: 'Vertical clearance above ribbons, badge quantity limits, multi-badge spacing',
    referenceQuote: 'CAPR 39-1, Chapter 10: Aviation and specialty badges (Solo Wings, Model Rocketry, Ground Team, CyberPatriot) are worn centered ½ inch above the top row of ribbons or left pocket welt. Maximum of 2 badges on the shirt.',
    maleRule: 'Centered horizontally ½ inch above the highest ribbon row.',
    femaleRule: 'Centered horizontally ½ inch above the highest ribbon row.',
    inspectionTips: [
      'Only authorized badges earned per CAP regulations may be worn.',
      'If wearing 2 badges: lower badge is ½" above ribbons; second badge is ½" above lower badge.',
      'Clasps must be tight and secure so badge stays level.'
    ],
    quizScenario: {
      question: 'A cadet has earned the Cadet Model Rocketry Badge. What is the mandatory clearance between the top row of ribbons and the bottom of this badge?',
      options: [
        {
          id: 'sb_1',
          text: 'Resting directly touching the top edge of the ribbons without any gap',
          isCorrect: false,
          rationale: 'Resting directly on the ribbons violates spacing; a precise ½ inch gap is required.'
        },
        {
          id: 'sb_2',
          text: 'Centered horizontally, exactly ½ inch above the top row of ribbons',
          isCorrect: true,
          rationale: 'Correct! CAPR 39-1 requires specialty and aviation badges to be centered ½ inch above the ribbon rack.'
        },
        {
          id: 'sb_3',
          text: '2 inches above the ribbons, aligned with the collar point',
          isCorrect: false,
          rationale: '2 inches is excessively high and fails standard inspection measurements.'
        },
        {
          id: 'sb_4',
          text: 'Pinned to the right breast pocket below the cadet nameplate',
          isCorrect: false,
          rationale: 'Specialty badges are worn on the left side above ribbons, not on the right pocket.'
        }
      ],
      failureRule: 'CAPR 39-1 Ch. 10: Specialty and aviation badges must be centered ½ inch above the top row of ribbons.'
    }
  },
  {
    id: 'gig_line',
    number: 6,
    name: 'The Gig-Line & Silver Buckle',
    category: 'Military Alignment',
    pngImage: '/uniform/6_gig_line.png',
    measurementSpec: 'Continuous straight line from placket to fly',
    aspectCovered: '3-point vertical alignment, male vs female belt tip direction, zero exposed web fabric',
    referenceQuote: 'CAPP 60-20, p. 19: The gig-line is the straight vertical alignment of the shirt button placket, the edge of the belt buckle, and the trouser fly. Male belt tip extends to wearer’s left; female belt tip extends to wearer’s right. No belt fabric extends past buckle.',
    maleRule: 'Belt tip extends to wearer’s LEFT through silver buckle; no blue webbing shows past buckle edge.',
    femaleRule: 'Belt tip extends to wearer’s RIGHT through silver buckle; no blue webbing shows past buckle edge.',
    inspectionTips: [
      'Inspect gig-line after every car ride, seated session, or movement.',
      'Silver belt buckle must be polished, mirror-clean, and scratch-free.',
      'The metal tip must be flush against the buckle with zero webbing showing.'
    ],
    quizScenario: {
      question: 'What three distinct uniform components form the military "Gig-Line", and which direction does the belt tip extend for male cadets?',
      options: [
        {
          id: 'gl_1',
          text: 'Shirt button placket, edge of the belt buckle, and trouser fly seam; belt tip extends to wearer’s LEFT',
          isCorrect: true,
          rationale: 'Correct! The placket, buckle edge, and fly form a single vertical line, with male belt tip extending left.'
        },
        {
          id: 'gl_2',
          text: 'Left collar edge, pocket flap, and shoelaces; belt tip extends to wearer’s RIGHT',
          isCorrect: false,
          rationale: 'The gig line involves the torso placket, buckle, and fly—not collars or shoes.'
        },
        {
          id: 'gl_3',
          text: 'Nametag, tie clasp, and knee crease; belt tip remains centered under buckle',
          isCorrect: false,
          rationale: 'The buckle tip extends through the buckle to the left (males) or right (females), not centered.'
        },
        {
          id: 'gl_4',
          text: 'Epaulet seam, belt loop, and trouser cuff; belt tip hangs freely downwards',
          isCorrect: false,
          rationale: 'A hanging belt tip is a severe uniform gig; the belt must sit flush and taut.'
        }
      ],
      failureRule: 'CAPP 60-20 p. 19: Gig line is placket, buckle edge, and fly; male belt tip points left, female points right.'
    }
  },
  {
    id: 'sleeve_creases',
    number: 7,
    name: 'Sleeve Creases & Garment Care',
    category: 'Pressing & Fabric Care',
    pngImage: '/uniform/7_sleeve_creases.png',
    measurementSpec: 'Single sharp crease down center; zero "train tracks"',
    aspectCovered: 'Crisp ironing, single crease line, preventing double tracks and scorch marks',
    referenceQuote: 'CAPP 60-20 & CAPR 39-1: Sleeves must be pressed with a single sharp crease extending down the center of the outer fold from the shoulder seam to the bottom of the sleeve. Multiple crease lines ("train tracks") are prohibited.',
    maleRule: 'Single center crease on both sleeves, pressed with starch and clean iron.',
    femaleRule: 'Identical standard for short-sleeve and long-sleeve blues blouses.',
    inspectionTips: [
      'Never press multiple lines or "train tracks" into sleeve fabric.',
      'Use a pressing cloth or damp rag to avoid creating glossy iron shine on poly-wool.',
      'Hang shirt on a sturdy contoured hanger to preserve collar and crease integrity.'
    ],
    quizScenario: {
      question: 'When preparing your short-sleeve blues shirt with an iron before a mandatory squadron inspection, what is the regulation rule for sleeve creases?',
      options: [
        {
          id: 'sc_1',
          text: 'Sleeves should have two parallel creases spaced 1 inch apart for symmetry',
          isCorrect: false,
          rationale: 'Multiple creases are known as "train tracks" and are an immediate inspection deficiency.'
        },
        {
          id: 'sc_2',
          text: 'Sleeves must have a single sharp crease running down the center of the sleeve, with zero "train tracks"',
          isCorrect: true,
          rationale: 'Correct! CAP regulations require a single, crisp center crease from shoulder seam down the arm.'
        },
        {
          id: 'sc_3',
          text: 'Sleeves must be ironed completely flat without any visible crease line',
          isCorrect: false,
          rationale: 'Blues shirts must have pressed military creases; uncreased sleeves fail inspection.'
        },
        {
          id: 'sc_4',
          text: 'Sleeves should be rolled up two turns and ironed flat at the bicep',
          isCorrect: false,
          rationale: 'Blues short-sleeve shirts are never rolled; they remain down with a crisp center crease.'
        }
      ],
      failureRule: 'CAPP 60-20: Sleeves must be pressed with a single center crease; double creases ("train tracks") fail.'
    }
  },
  {
    id: 'trouser_break',
    number: 8,
    name: 'Trouser Hem, Slacks & Break',
    category: 'Lower Garments & Tailoring',
    pngImage: '/uniform/8_trouser_break.png',
    measurementSpec: 'Slight front break; rear hem 7/8 inch above heel',
    aspectCovered: 'Front shoe break, rear heel clearance, pocket buttoning',
    referenceQuote: 'CAPR 39-1, Para 4.1.1: Trousers must rest on the front of the shoes with a slight break. The back edge of the trouser legs should hang approximately 7/8 inch above the top of the shoe heel. Rear pockets must remain buttoned.',
    maleRule: 'Dark navy blue trousers tailored with slight break over laces; back hem 7/8" above heel.',
    femaleRule: 'Slacks follow identical break standard; skirts (if worn) hemmed between 1" below and 1" above knee.',
    inspectionTips: [
      'Pockets must lie flat; do not overfill front or rear pockets with phones or bulky wallets.',
      'Rear pocket buttons must be securely fastened at all times.',
      'Ensure no loose hem stitches or frayed cuffs drag against the ground.'
    ],
    quizScenario: {
      question: 'How should the cadet uniform trousers properly hang over the low-quarter dress shoes at inspection?',
      options: [
        {
          id: 'tb_1',
          text: 'Excess fabric bundled around the ankles with 3 distinct folds',
          isCorrect: false,
          rationale: 'Excess fabric gathering at the ankles indicates poorly tailored trousers and fails inspection.'
        },
        {
          id: 'tb_2',
          text: 'Resting on the front of the shoe with a slight break, with the back edge hanging approximately 7/8 inch above the heel',
          isCorrect: true,
          rationale: 'Correct! CAPR 39-1 specifies a slight front break with rear edge hanging 7/8" above the heel.'
        },
        {
          id: 'tb_3',
          text: 'Hemmed 2 inches above the shoe laces so dress socks are prominently visible',
          isCorrect: false,
          rationale: 'Trousers that are too short ("high-waters") fail military fit standards.'
        },
        {
          id: 'tb_4',
          text: 'Tucked inside the low-quarter shoe collars with elastic blousing bands',
          isCorrect: false,
          rationale: 'Blousing is for combat boots with ABUs/OCPs, never with low-quarters and blues trousers.'
        }
      ],
      failureRule: 'CAPR 39-1 §4.1.1: Trousers rest with a slight break in front, back edge 7/8 inch above the shoe heel.'
    }
  },
  {
    id: 'dress_shoes',
    number: 9,
    name: 'Footwear & Mirror Shine',
    category: 'Footwear & Polish',
    pngImage: '/uniform/9_dress_shoes.png',
    measurementSpec: 'High gloss / mirror shine, black edge dressing, black socks',
    aspectCovered: 'Shoe shine quality, sole edge dressing, plain black dress socks, tied and tucked laces',
    referenceQuote: 'CAPR 39-1 & CAPP 60-20: Plain black low-quarter lace-up shoes polished to a high gloss or patent corfam. Soles and heel edges treated with black edge dressing. Plain black socks without pattern or ornamentation. Laces tied neatly.',
    maleRule: 'Black plain-toe lace-up oxford shoes, tied securely. Plain black dress socks with no skin showing.',
    femaleRule: 'Low-quarter oxford shoes or authorized black pumps. Neutral hose or plain black socks.',
    inspectionTips: [
      'Both toe caps and heel counters polished to reflection without scuffs or dull spots.',
      'Soles and heel welt edges treated with black edge dressing.',
      'Laces tied tightly and excess tucked into shoe collars so loops do not dangle.'
    ],
    quizScenario: {
      question: 'During final shoe inspection, what are the mandatory standards for low-quarters worn with the Blues uniform?',
      options: [
        {
          id: 'ds_1',
          text: 'Black running shoes or casual skate sneakers with white ankle socks',
          isCorrect: false,
          rationale: 'Athletic shoes and casual sneakers are strictly prohibited in the blues uniform.'
        },
        {
          id: 'ds_2',
          text: 'Plain black oxford low-quarters polished to a high gloss shine, black sole edge dressing, and plain black dress socks',
          isCorrect: true,
          rationale: 'Correct! High-gloss polish, edge dressing on soles/heels, and plain black socks are mandatory.'
        },
        {
          id: 'ds_3',
          text: 'Matte unpolished work boots with yellow or colored laces',
          isCorrect: false,
          rationale: 'Boots and colored laces cannot be worn with the Class B dress uniform.'
        },
        {
          id: 'ds_4',
          text: 'Loafers with silver ornamental buckles worn without socks',
          isCorrect: false,
          rationale: 'Ornamentation is prohibited and socks/hose are always mandatory.'
        }
      ],
      failureRule: 'CAPR 39-1 & CAPP 60-20: Plain black low-quarters polished to high gloss, edge dressing, plain black socks.'
    }
  }
];

export const UniformInspectorView: React.FC = () => {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<'quiz' | 'gallery'>('quiz');
  const [gender, setGender] = useState<'male' | 'female'>('male');

  // Selected element in gallery mode
  const [selectedElementId, setSelectedElementId] = useState<string>(UNIFORM_ELEMENTS[0].id);

  // Strict Quiz State: Fail Restarts You
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [quizState, setQuizState] = useState<'active' | 'passed_step' | 'failed' | 'completed'>('active');
  const [failureDetails, setFailureDetails] = useState<{
    element: UniformElement;
    chosenText: string;
    failureRule: string;
    rationale: string;
  } | null>(null);

  // Stats
  const [consecutiveScore, setConsecutiveScore] = useState<number>(0);
  const [totalRestarts, setTotalRestarts] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem('cap_uniform_best_streak') || '0', 10);
    } catch {
      return 0;
    }
  });

  const activeElement = UNIFORM_ELEMENTS[currentQuizIndex] || UNIFORM_ELEMENTS[0];
  const galleryElement = UNIFORM_ELEMENTS.find((e) => e.id === selectedElementId) || UNIFORM_ELEMENTS[0];

  // Answer Submission Handler
  const handleSelectOption = (optionId: string) => {
    if (quizState !== 'active') return;
    setSelectedOptionId(optionId);

    const scenario = activeElement.quizScenario;
    const chosen = scenario.options.find((o) => o.id === optionId);

    if (!chosen) return;

    if (chosen.isCorrect) {
      // Step Passed!
      setQuizState('passed_step');
      const newScore = consecutiveScore + 1;
      setConsecutiveScore(newScore);
      if (newScore > bestStreak) {
        setBestStreak(newScore);
        try {
          localStorage.setItem('cap_uniform_best_streak', newScore.toString());
        } catch {
          // ignore
        }
      }

      if (currentQuizIndex === UNIFORM_ELEMENTS.length - 1) {
        // All 9 elements completed without failure!
        setQuizState('completed');
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    } else {
      // FAILED! Strict Military Discipline: Discrepancy detected -> Must Restart!
      setFailureDetails({
        element: activeElement,
        chosenText: chosen.text,
        failureRule: scenario.failureRule,
        rationale: chosen.rationale
      });
      setQuizState('failed');
      setTotalRestarts((prev) => prev + 1);
    }
  };

  // Advance to next element after correct answer
  const handleNextElement = () => {
    if (currentQuizIndex < UNIFORM_ELEMENTS.length - 1) {
      setCurrentQuizIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setQuizState('active');
    }
  };

  // Restart after failure
  const handleRestartInspection = () => {
    setCurrentQuizIndex(0);
    setSelectedOptionId(null);
    setConsecutiveScore(0);
    setFailureDetails(null);
    setQuizState('active');
  };

  // Reset after completion to test again
  const handleRetakeExam = () => {
    setCurrentQuizIndex(0);
    setSelectedOptionId(null);
    setConsecutiveScore(0);
    setFailureDetails(null);
    setQuizState('active');
  };

  return (
    <div id="uniform-inspector-container" className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fade-in text-slate-100">
      {/* Top Banner Header with CAP Branding */}
      <div className="relative rounded-3xl overflow-hidden bg-[#0a1e3d] border border-[#163a70] shadow-2xl p-6 sm:p-8">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c8102e]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c8102e]/20 border border-[#c8102e]/40 text-white text-xs font-bold shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-[#ffc72c]" />
              <span>CAPR 39-1 & CAPP 60-20 Standardized Inspection</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              9-Element Uniform Inspection & Practical Exam
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
              "There is only 1 way to wear the uniform: the RIGHT way." Test your knowledge across all 9 uniform elements. In strict accordance with military flight line inspection rules: <span className="text-[#ffc72c] font-bold">a single discrepancy fails you and restarts the exam from Element #1!</span>
            </p>
          </div>

          {/* Controls: Mode Switcher & Gender Toggle */}
          <div className="flex flex-wrap items-center gap-2 bg-[#06142a] p-2 rounded-2xl border border-[#163a70] shadow">
            <button
              id="mode-quiz-btn"
              onClick={() => setViewMode('quiz')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                viewMode === 'quiz'
                  ? 'bg-[#c8102e] text-white shadow-md shadow-[#c8102e]/30'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-[#ffc72c]" />
              <span>Practical Exam (Strict)</span>
            </button>
            <button
              id="mode-gallery-btn"
              onClick={() => setViewMode('gallery')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                viewMode === 'gallery'
                  ? 'bg-[#002855] text-white border border-[#163a70]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#ffc72c]" />
              <span>9 Elements Gallery</span>
            </button>

            <div className="w-[1px] h-6 bg-[#163a70] mx-1 hidden sm:block" />

            <button
              id="gender-male-btn"
              onClick={() => setGender('male')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                gender === 'male'
                  ? 'bg-[#002855] text-[#ffc72c] border border-[#ffc72c]/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Male Rules
            </button>
            <button
              id="gender-female-btn"
              onClick={() => setGender('female')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                gender === 'female'
                  ? 'bg-[#002855] text-[#ffc72c] border border-[#ffc72c]/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Female Rules
            </button>
          </div>
        </div>

        {/* Live Inspection Stats Bar */}
        <div className="mt-6 pt-5 border-t border-[#163a70]/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#06142a] border border-[#163a70] flex items-center justify-center text-[#ffc72c]">
              <Crosshair className="w-4 h-4" />
            </div>
            <div>
              <div className="text-slate-400 text-[10px] uppercase font-bold">Active Element</div>
              <div className="text-white font-bold font-mono">
                {viewMode === 'quiz' ? `Element ${currentQuizIndex + 1} of 9` : 'Gallery Explorer'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#06142a] border border-[#163a70] flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-slate-400 text-[10px] uppercase font-bold">Consecutive Passes</div>
              <div className="text-emerald-400 font-bold font-mono">
                {consecutiveScore} / 9 Flawless
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#06142a] border border-[#163a70] flex items-center justify-center text-[#ffc72c]">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-slate-400 text-[10px] uppercase font-bold">Best Flawless Streak</div>
              <div className="text-[#ffc72c] font-bold font-mono">
                {bestStreak} / 9 Elements
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#06142a] border border-[#163a70] flex items-center justify-center text-[#c8102e]">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <div className="text-slate-400 text-[10px] uppercase font-bold">Discrepancy Restarts</div>
              <div className="text-slate-200 font-bold font-mono">
                {totalRestarts} {totalRestarts === 1 ? 'restart' : 'restarts'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: PRACTICAL INSPECTION EXAM (RESTART ON FAIL) */}
      {viewMode === 'quiz' && (
        <div className="space-y-6">
          {/* Progress Tracker across all 9 Elements */}
          <div className="p-4 rounded-2xl bg-[#0a1e3d] border border-[#163a70] shadow-md space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">
                Flight Line Inspection Progress (Fail restarts to Element 1):
              </span>
              <span className="font-mono font-bold text-[#ffc72c]">
                {Math.round((consecutiveScore / UNIFORM_ELEMENTS.length) * 100)}% Complete
              </span>
            </div>

            <div className="grid grid-cols-9 gap-1.5">
              {UNIFORM_ELEMENTS.map((elem, idx) => {
                const isPassed = idx < consecutiveScore;
                const isCurrent = idx === currentQuizIndex && quizState !== 'completed';
                return (
                  <div
                    key={elem.id}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      isPassed
                        ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50'
                        : isCurrent
                        ? 'bg-[#ffc72c] animate-pulse ring-2 ring-[#ffc72c]/40'
                        : 'bg-[#06142a] border border-[#163a70]'
                    }`}
                    title={`Element ${idx + 1}: ${elem.name}`}
                  />
                );
              })}
            </div>
          </div>

          {/* MAIN TEST STAGE: Active Element Challenge */}
          {quizState !== 'completed' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left: PNG Image of Current Uniform Element */}
              <div className="lg:col-span-5 p-6 rounded-3xl bg-[#0a1e3d] border border-[#163a70] shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#c8102e] text-white flex items-center justify-center font-black text-xs">
                      {activeElement.number}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#ffc72c]">
                      {activeElement.category}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[#002855] text-slate-300 border border-[#163a70]">
                    CAPR 39-1
                  </span>
                </div>

                {/* The PNG Image Stage */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#030914] to-[#06142a] border-2 border-[#163a70] shadow-inner flex items-center justify-center p-4 min-h-[360px]">
                  <img
                    src={activeElement.pngImage}
                    alt={activeElement.name}
                    referrerPolicy="no-referrer"
                    className="w-full max-w-[320px] h-auto object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.8)] rounded-xl transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-slate-300 bg-[#030914]/85 px-3 py-1.5 rounded-xl border border-[#163a70]/60 backdrop-blur">
                    <span className="font-semibold text-white truncate max-w-[200px]">
                      {activeElement.name}
                    </span>
                    <span className="text-[#ffc72c] font-mono">PNG Element {activeElement.number}</span>
                  </div>
                </div>

              </div>

              {/* Right: Inspection Question & Multiple Choices */}
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 sm:p-7 rounded-3xl bg-[#0a1e3d] border border-[#163a70] shadow-xl space-y-6">
                  {/* Scenario Question Header */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                      <HelpCircle className="w-4 h-4 text-[#ffc72c]" />
                      <span>INSPECTION CHECKPOINT #{activeElement.number}</span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-black text-white leading-snug">
                      {activeElement.quizScenario.question}
                    </h2>
                  </div>

                  {/* Multiple Choice Options */}
                  <div className="space-y-3">
                    {activeElement.quizScenario.options.map((option, optIdx) => {
                      const isSelected = selectedOptionId === option.id;
                      const isSubmitted = quizState !== 'active';
                      const isCorrect = option.isCorrect;

                      let btnStyle = 'bg-[#06142a] border-[#163a70] hover:border-[#2a5fa8] hover:bg-[#002855]/40 text-slate-200';

                      if (isSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-100 shadow-md shadow-emerald-900/40';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'bg-red-950/80 border-red-500 text-red-100 shadow-md shadow-red-900/40';
                        } else {
                          btnStyle = 'bg-[#06142a]/50 border-[#163a70]/40 text-slate-500 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={option.id}
                          disabled={quizState !== 'active'}
                          onClick={() => handleSelectOption(option.id)}
                          className={`w-full p-4 rounded-2xl border text-left transition duration-200 flex items-start gap-3.5 relative ${btnStyle}`}
                        >
                          <span
                            className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold font-mono flex-shrink-0 mt-0.5 border ${
                              isSubmitted && isCorrect
                                ? 'bg-emerald-600 border-emerald-400 text-white'
                                : isSubmitted && isSelected && !isCorrect
                                ? 'bg-red-600 border-red-400 text-white'
                                : 'bg-[#002855] border-[#163a70] text-slate-300'
                            }`}
                          >
                            {String.fromCharCode(65 + optIdx)}
                          </span>

                          <div className="flex-1 text-xs sm:text-sm font-medium leading-relaxed">
                            {option.text}
                          </div>

                          {isSubmitted && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          )}
                          {isSubmitted && isSelected && !isCorrect && (
                            <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* SUCCESS STATE FEEDBACK: Advance to Next Element */}
                  {quizState === 'passed_step' && (
                    <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/80 space-y-3 animate-fade-in">
                      <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wide">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Checkpoint Approved • Flawless Standard</span>
                      </div>
                      <p className="text-xs text-emerald-200 leading-relaxed font-medium">
                        {activeElement.quizScenario.options.find((o) => o.id === selectedOptionId)?.rationale}
                      </p>
                      <button
                        id="next-element-btn"
                        onClick={handleNextElement}
                        className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
                      >
                        <span>Proceed to Checkpoint #{currentQuizIndex + 2} of 9</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* FAILURE STATE: Strict Military Restart Trigger */}
                  {quizState === 'failed' && failureDetails && (
                    <div className="p-5 rounded-2xl bg-red-950/80 border-2 border-red-500 space-y-4 animate-fade-in shadow-2xl">
                      <div className="flex items-center gap-2 text-red-300 font-black text-sm tracking-wide">
                        <AlertTriangle className="w-5 h-5 text-red-400 animate-bounce" />
                        <span>INSPECTION DISCREPANCY RECORDED (GIG DETECTED)</span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#030914] border border-red-500/50 text-xs space-y-1.5">
                        <div className="text-red-400 font-bold">Deficiency Note:</div>
                        <p className="text-slate-200">
                          "{failureDetails.rationale}"
                        </p>
                        <div className="text-[#ffc72c] font-mono text-[11px] pt-1">
                          Official Standard: {failureDetails.failureRule}
                        </div>
                      </div>

                      <p className="text-xs text-red-200 leading-relaxed">
                        In accordance with Civil Air Patrol inspection protocol, a single discrepancy disqualifies your flight line readiness. <strong className="text-white">You must reset and restart your inspection from Element #1!</strong>
                      </p>

                      <button
                        id="restart-inspection-btn"
                        onClick={handleRestartInspection}
                        className="w-full py-3.5 px-4 rounded-xl bg-[#c8102e] hover:bg-[#a80c25] text-white font-black text-xs transition flex items-center justify-center gap-2 shadow-xl shadow-[#c8102e]/40"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>RESTART FLIGHT INSPECTION FROM ELEMENT #1</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 100% PERFECT INSPECTION COMPLETION MODAL / VIEW */}
          {quizState === 'completed' && (
            <div className="p-8 rounded-3xl bg-[#0a1e3d] border-2 border-emerald-500 shadow-2xl text-center space-y-6 max-w-2xl mx-auto animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
                <Award className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                  <Check className="w-3.5 h-3.5" />
                  <span>Official Endorsement Granted</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  100% Flawless Uniform Inspection!
                </h2>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Outstanding, Cadet! You navigated all 9 uniform inspection elements without a single deficiency or discrepancy. Your uniform and grooming meet the highest standards of Civil Air Patrol regulation CAPR 39-1.
                </p>
              </div>

              {/* 9 Element Seal Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-9 gap-2 pt-2">
                {UNIFORM_ELEMENTS.map((e) => (
                  <div key={e.id} className="p-2 rounded-xl bg-[#06142a] border border-emerald-500/40 flex flex-col items-center gap-1">
                    <img src={e.pngImage} alt={e.name} referrerPolicy="no-referrer" className="w-8 h-8 object-contain" />
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">#{e.number}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleRetakeExam}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#002855] hover:bg-[#003875] text-white font-bold text-xs border border-[#163a70] transition flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Re-Take Inspection Exam</span>
                </button>
                <button
                  onClick={() => setViewMode('gallery')}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#c8102e] hover:bg-[#a80c25] text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-[#c8102e]/30"
                >
                  <Eye className="w-4 h-4" />
                  <span>Explore 9 Elements Gallery</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW MODE 2: INTERACTIVE 9 UNIFORM ELEMENTS GALLERY */}
      {viewMode === 'gallery' && (
        <div className="space-y-6">
          {/* Quick Select Bar for all 9 elements */}
          <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
            {UNIFORM_ELEMENTS.map((elem) => {
              const isSelected = elem.id === selectedElementId;
              return (
                <button
                  key={elem.id}
                  onClick={() => setSelectedElementId(elem.id)}
                  className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-2 ${
                    isSelected
                      ? 'bg-[#c8102e] border-[#ffc72c] text-white shadow-lg shadow-[#c8102e]/40 scale-105 z-10'
                      : 'bg-[#0a1e3d] border-[#163a70] text-slate-300 hover:text-white hover:border-slate-500'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#06142a] flex items-center justify-center overflow-hidden border border-[#163a70]/60 p-1">
                    <img
                      src={elem.pngImage}
                      alt={elem.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-[11px] font-black leading-tight truncate w-full">
                    {elem.number}. {elem.name.split(' ')[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Deep-Dive Card for the Selected Gallery Element */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: High-Res PNG Display */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-[#0a1e3d] border border-[#163a70] shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-[#002855] text-[#ffc72c] border border-[#ffc72c]/40 font-mono">
                  Element #{galleryElement.number} of 9
                </span>
                <span className="text-xs text-slate-300 font-bold uppercase tracking-wider">
                  {galleryElement.category}
                </span>
              </div>

              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#030914] to-[#06142a] border-2 border-[#163a70] flex items-center justify-center p-6 min-h-[420px]">
                <img
                  src={galleryElement.pngImage}
                  alt={galleryElement.name}
                  referrerPolicy="no-referrer"
                  className="w-full max-w-[340px] h-auto object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.85)] rounded-xl"
                />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-200 bg-[#030914]/90 px-3.5 py-2 rounded-xl border border-[#163a70]">
                  <span className="font-bold text-white">{galleryElement.name}</span>
                  <span className="text-[#ffc72c] font-mono font-bold">Standard PNG</span>
                </div>
              </div>

              {/* Action Button to test directly in exam */}
              <button
                onClick={() => {
                  setCurrentQuizIndex(galleryElement.number - 1);
                  setSelectedOptionId(null);
                  setQuizState('active');
                  setViewMode('quiz');
                }}
                className="w-full py-3 rounded-xl bg-[#c8102e] hover:bg-[#a80c25] text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-[#c8102e]/30"
              >
                <Flame className="w-4 h-4 text-[#ffc72c]" />
                <span>Test Checkpoint #{galleryElement.number} in Practical Exam</span>
              </button>
            </div>

            {/* Right: Detailed Regulations, Gender Standards, and Inspection Criteria */}
            <div className="lg:col-span-7 space-y-5">
              <div className="p-6 rounded-3xl bg-[#0a1e3d] border border-[#163a70] shadow-xl space-y-5">
                <div>
                  <div className="text-xs font-bold text-[#ffc72c] uppercase tracking-wider">
                    {galleryElement.category} Inspection Spec
                  </div>
                  <h2 className="text-2xl font-black text-white mt-1">
                    {galleryElement.name}
                  </h2>
                </div>

                {/* Measurement Spec Box */}
                <div className="p-4 rounded-2xl bg-[#06142a] border border-[#163a70] flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-[11px] text-slate-400 uppercase font-bold">Regulation Requirement:</div>
                    <div className="text-sm font-black text-[#ffc72c] font-mono">
                      {galleryElement.measurementSpec}
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-lg bg-[#002855] text-white text-xs font-bold border border-[#163a70]">
                    CAPR 39-1
                  </div>
                </div>

                {/* Doctrine Reference Quote */}
                <div className="p-4 rounded-2xl bg-[#06142a] border border-[#163a70] space-y-1.5">
                  <div className="text-xs font-bold text-[#ffc72c] uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-[#ffc72c]" />
                    <span>Official Civil Air Patrol Regulation</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    "{galleryElement.referenceQuote}"
                  </p>
                </div>

                {/* Gender Specific Standard Box */}
                <div className="p-4 rounded-2xl bg-[#002855]/60 border border-[#163a70] space-y-2">
                  <div className="text-xs font-bold text-sky-300">
                    {gender === 'male' ? 'Male Cadet Rule' : 'Female Cadet Rule'}:
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {gender === 'male' ? galleryElement.maleRule : galleryElement.femaleRule}
                  </p>
                </div>

                {/* Inspector Checklist */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Inspector Checklist Points:
                  </div>
                  <ul className="space-y-2">
                    {galleryElement.inspectionTips.map((tip, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-slate-200 flex items-start gap-2.5 bg-[#06142a] p-3 rounded-xl border border-[#163a70]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
