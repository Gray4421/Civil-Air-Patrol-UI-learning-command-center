import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Compass, 
  ChevronRight,
  ShieldAlert,
  ArrowUp,
  Activity,
  Flame,
  User,
  Zap,
  HelpCircle,
  Trophy,
  Volume1,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import capDrillField from '../assets/images/cap_drill_field_1789947245864.jpg';

export interface DrillActionChoice {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
  animationType: 'attention' | 'parade-rest' | 'dress-right' | 'ready-front' | 'right-face' | 'left-face' | 'about-face' | 'salute' | 'order-arms' | 'march' | 'column-right' | 'column-left' | 'flank-right' | 'flank-left' | 'rear-march' | 'halt' | 'stumble';
}

export interface DrillGameCommand {
  id: string;
  name: string;
  category: 'in-place' | 'marching';
  prepCommand: string;
  execCommand: string;
  voiceText: string;
  callFoot?: 'left' | 'right' | 'either';
  regulationStandard: string;
  choices: DrillActionChoice[];
}

const ACH1_COMMANDS: DrillGameCommand[] = [
  {
    id: 'ach1_1',
    name: 'Flight, ATTENTION',
    category: 'in-place',
    prepCommand: 'Flight',
    execCommand: 'ATTEN-TION!',
    voiceText: 'Flight, ATTENTION!',
    regulationStandard: 'CAPP 60-34 & AFMAN 36-2203: Heels together on line at a 45-degree angle. Legs straight but knees not locked. Thumbs along trouser seams with hands cupped naturally. Head and eyes fixed directly to the front. Immobile and silent.',
    choices: [
      {
        id: 'c1',
        text: 'Snap heels together at a 45° angle, cup hands along trouser seams, lock head and eyes front, remain silent and immobile.',
        isCorrect: true,
        explanation: 'Correct! The Position of Attention requires heels together on line at a 45° angle, hands cupped at trouser seams, and absolute immobility.',
        animationType: 'attention'
      },
      {
        id: 'c2',
        text: 'Move left foot 12 inches to the left, clasp hands behind back at belt level, keep silent.',
        isCorrect: false,
        explanation: 'Incorrect: That describes Parade REST, not the Position of Attention.',
        animationType: 'stumble'
      },
      {
        id: 'c3',
        text: 'Stand with feet shoulder-width apart, arms relaxed at your sides, and look around casually.',
        isCorrect: false,
        explanation: 'Incorrect: At Attention, feet must have heels together at 45°, arms pinned at seams, and head locked front.',
        animationType: 'stumble'
      },
      {
        id: 'c4',
        text: 'Raise right hand to eyebrow in salute and wait for dismissal.',
        isCorrect: false,
        explanation: 'Incorrect: That describes Hand Salute, not the basic position of Attention.',
        animationType: 'stumble'
      }
    ]
  },
  {
    id: 'ach1_2',
    name: 'Parade, REST',
    category: 'in-place',
    prepCommand: 'Parade',
    execCommand: 'REST!',
    voiceText: 'Parade, REST!',
    regulationStandard: 'CAPP 60-34: On the command REST, move the left foot smartly 12 inches to the left of the right foot. Clasp hands behind the back with the right hand inside the palm of the left hand, thumbs interlocked. Silent and immobile.',
    choices: [
      {
        id: 'c1',
        text: 'Move right foot 12 inches to the right, place hands in pockets, look at flight leader.',
        isCorrect: false,
        explanation: 'Incorrect: Never move the right foot; only the left foot moves 12 inches.',
        animationType: 'stumble'
      },
      {
        id: 'c2',
        text: 'Smartly move left foot 12 inches to the left, clasp right hand in palm of left hand behind back, interlock thumbs, remain silent and immobile.',
        isCorrect: true,
        explanation: 'Correct! Left foot steps 12 inches out, right hand rests in left palm with thumbs crossed, silent and motionless.',
        animationType: 'parade-rest'
      },
      {
        id: 'c3',
        text: 'Drop to one knee and rest your hands on your kneecap.',
        isCorrect: false,
        explanation: 'Incorrect: Parade Rest is an in-place standing position of rest.',
        animationType: 'stumble'
      },
      {
        id: 'c4',
        text: 'Pivot 90 degrees to the right and cross arms across chest.',
        isCorrect: false,
        explanation: 'Incorrect: Parade Rest maintains the forward orientation of the flight.',
        animationType: 'stumble'
      }
    ]
  },
  {
    id: 'ach1_3',
    name: 'Dress Right, DRESS',
    category: 'in-place',
    prepCommand: 'Dress Right',
    execCommand: 'DRESS!',
    voiceText: 'Dress Right, DRESS!',
    regulationStandard: 'CAPP 60-34: Raise the left arm laterally parallel to the ground, palm flat facing down. Simultaneously snap head 45 degrees to the right (except base element leader who looks straight front). Establish normal interval.',
    choices: [
      {
        id: 'c1',
        text: 'Raise right arm forward, turn head 90 degrees to the left, take two paces forward.',
        isCorrect: false,
        explanation: 'Incorrect: The left arm is raised laterally parallel to the deck, and head turns 45° to the right.',
        animationType: 'stumble'
      },
      {
        id: 'c2',
        text: 'Raise left arm laterally parallel to ground with palm down; snap head 45° right to align with the cadet to your right.',
        isCorrect: true,
        explanation: 'Correct! Normal interval is established with left arm raised parallel to deck and head snapped 45° right.',
        animationType: 'dress-right'
      },
      {
        id: 'c3',
        text: 'Raise both arms out to the sides and look straight down at your feet.',
        isCorrect: false,
        explanation: 'Incorrect: Only the left arm is raised to check interval.',
        animationType: 'stumble'
      },
      {
        id: 'c4',
        text: 'Extend right arm to touch the shoulder of the cadet in front of you.',
        isCorrect: false,
        explanation: 'Incorrect: Dress Right Dress aligns laterally with the cadet to your right, using the left arm for interval.',
        animationType: 'stumble'
      }
    ]
  },
  {
    id: 'ach1_4',
    name: 'Ready, FRONT',
    category: 'in-place',
    prepCommand: 'Ready',
    execCommand: 'FRONT!',
    voiceText: 'Ready, FRONT!',
    regulationStandard: 'CAPP 60-34: Smartly lower the left arm to the side without slapping the thigh, and snap head and eyes smartly back to the front, returning to the Position of Attention.',
    choices: [
      {
        id: 'c1',
        text: 'Smartly lower left arm along trouser seam without slapping leg, snap head and eyes smartly to the front at Attention.',
        isCorrect: true,
        explanation: 'Correct! Arm lowers smartly without slap, head snaps front back into locked Attention.',
        animationType: 'ready-front'
      },
      {
        id: 'c2',
        text: 'Slowly lower arm over 3 seconds and salute the flight leader.',
        isCorrect: false,
        explanation: 'Incorrect: Ready Front requires a snap motion returning directly to the Position of Attention.',
        animationType: 'stumble'
      },
      {
        id: 'c3',
        text: 'Keep left arm up and pivot 90 degrees to the left.',
        isCorrect: false,
        explanation: 'Incorrect: Ready Front terminates the alignment and brings you back to Attention.',
        animationType: 'stumble'
      },
      {
        id: 'c4',
        text: 'Slap left thigh with an open palm and turn head 45 degrees left.',
        isCorrect: false,
        explanation: 'Incorrect: Slapping the leg is a standard drill discrepancy.',
        animationType: 'stumble'
      }
    ]
  },
  {
    id: 'ach1_5',
    name: 'Right, FACE',
    category: 'in-place',
    prepCommand: 'Right',
    execCommand: 'FACE!',
    voiceText: 'Right, FACE!',
    regulationStandard: 'CAPP 60-34: Two-count movement. Count 1: Pivot 90 degrees to the right on the heel of the right foot and ball of the left foot. Count 2: Bring the left heel smartly alongside the right heel, heels together at 45 degrees at Attention.',
    choices: [
      {
        id: 'c1',
        text: 'Pivot 90° right on the heel of the right foot and ball of the left foot (Count 1); smartly snap left heel to right heel (Count 2).',
        isCorrect: true,
        explanation: 'Correct! Right Face pivots on the right heel and left ball, then snaps left heel cleanly to right heel at Attention.',
        animationType: 'right-face'
      },
      {
        id: 'c2',
        text: 'Pivot 90° right on the ball of the right foot and heel of the left foot, crossing legs.',
        isCorrect: false,
        explanation: 'Incorrect: The pivot is on the RIGHT heel and LEFT ball. Never cross legs during facing movements.',
        animationType: 'stumble'
      },
      {
        id: 'c3',
        text: 'Jump 90 degrees to the right landing on both feet at once.',
        isCorrect: false,
        explanation: 'Incorrect: Military drill facings are precise two-count foot pivots, never hops or jumps.',
        animationType: 'stumble'
      },
      {
        id: 'c4',
        text: 'Step forward two paces with left foot then turn right.',
        isCorrect: false,
        explanation: 'Incorrect: Right Face is an in-place facing movement that does not step forward.',
        animationType: 'stumble'
      }
    ]
  },
  {
    id: 'ach1_6',
    name: 'Left, FACE',
    category: 'in-place',
    prepCommand: 'Left',
    execCommand: 'FACE!',
    voiceText: 'Left, FACE!',
    regulationStandard: 'CAPP 60-34: Two-count movement. Count 1: Pivot 90 degrees to the left on the heel of the left foot and ball of the right foot. Count 2: Bring the right heel smartly alongside the left heel, heels together at 45 degrees.',
    choices: [
      {
        id: 'c1',
        text: 'Pivot 90° right on the left heel and swing arms outward.',
        isCorrect: false,
        explanation: 'Incorrect: Left Face turns 90° LEFT, not right, and arms remain pinned at sides.',
        animationType: 'stumble'
      },
      {
        id: 'c2',
        text: 'Pivot 90° left on the heel of the left foot and ball of the right foot (Count 1); smartly bring right heel alongside left (Count 2).',
        isCorrect: true,
        explanation: 'Correct! Left Face pivots 90° left on left heel and right ball, then snaps right heel to left at Attention.',
        animationType: 'left-face'
      },
      {
        id: 'c3',
        text: 'Take a step back with left foot and spin 180 degrees.',
        isCorrect: false,
        explanation: 'Incorrect: That resembles an improper About Face. Left Face is only a 90° turn to the left.',
        animationType: 'stumble'
      },
      {
        id: 'c4',
        text: 'Pivot on both toes simultaneously and wobble into place.',
        isCorrect: false,
        explanation: 'Incorrect: Pivoting on toes causes balance loss and violates CAP drill standards.',
        animationType: 'stumble'
      }
    ]
  },
  {
    id: 'ach1_7',
    name: 'About, FACE',
    category: 'in-place',
    prepCommand: 'About',
    execCommand: 'FACE!',
    voiceText: 'About, FACE!',
    regulationStandard: 'CAPP 60-34: Count 1: Move the ball of the right foot to a position approximately half a shoe length behind and slightly to the left of the left heel. Count 2: Pivot 180 degrees clockwise on the ball of the right foot and heel of the left foot.',
    choices: [
      {
        id: 'c1',
        text: 'Turn 180 degrees counter-clockwise by hopping on your left foot.',
        isCorrect: false,
        explanation: 'Incorrect: About Face is always executed CLOCKWISE, never counter-clockwise, and never involves hopping.',
        animationType: 'stumble'
      },
      {
        id: 'c2',
        text: 'Place ball of right foot half step behind left heel (Count 1); pivot 180° clockwise on right ball and left heel (Count 2) finishing at Attention.',
        isCorrect: true,
        explanation: 'Correct! Right ball placed behind left heel, smooth 180° clockwise pivot on right ball and left heel, heels finishing at 45° at Attention.',
        animationType: 'about-face'
      },
      {
        id: 'c3',
        text: 'Step forward on right foot and spin around on both heels.',
        isCorrect: false,
        explanation: 'Incorrect: Stepping forward unbalances the pivot and disrupts the rank alignment.',
        animationType: 'stumble'
      },
      {
        id: 'c4',
        text: 'Execute two consecutive Right Faces with a pause in between.',
        isCorrect: false,
        explanation: 'Incorrect: About Face is a single continuous two-count 180° movement.',
        animationType: 'stumble'
      }
    ]
  },
  {
    id: 'ach1_8',
    name: 'Hand, SALUTE',
    category: 'in-place',
    prepCommand: 'Hand',
    execCommand: 'SALUTE!',
    voiceText: 'Hand, SALUTE!',
    regulationStandard: 'CAPP 60-34: Count 1: Raise the right hand smartly in the most direct manner to the right eyebrow or outer corner of glasses frame. Upper arm parallel to ground, palm flat facing downward. Count 2: Retrace path back to Attention.',
    choices: [
      {
        id: 'c1',
        text: 'Raise left hand to the left temple with palm facing outward.',
        isCorrect: false,
        explanation: 'Incorrect: Salutes are strictly executed with the RIGHT hand only, palm tilted inward/downward.',
        animationType: 'stumble'
      },
      {
        id: 'c2',
        text: 'Smartly raise right hand to outside corner of right eyebrow/glasses, upper arm parallel to ground, hand flat and wrist straight; retrace path down cleanly on order.',
        isCorrect: true,
        explanation: 'Correct! Sharp right hand salute to eyebrow/glasses, upper arm parallel to ground, fingers extended and joined, straight wrist.',
        animationType: 'salute'
      },
      {
        id: 'c3',
        text: 'Touch middle of forehead with two fingers and flick wrist outward.',
        isCorrect: false,
        explanation: 'Incorrect: Two-finger salute is not an authorized Civil Air Patrol or USAF salute.',
        animationType: 'stumble'
      },
      {
        id: 'c4',
        text: 'Raise right hand to chin level and nod your head.',
        isCorrect: false,
        explanation: 'Incorrect: Hand must reach the right eyebrow or frame of eyeglasses with head erect.',
        animationType: 'stumble'
      }
    ]
  }
];

const ACH2_COMMANDS: DrillGameCommand[] = [
  {
    id: 'ach2_1',
    name: 'Forward, MARCH',
    category: 'marching',
    prepCommand: 'Forward',
    execCommand: 'MARCH!',
    voiceText: 'Forward, MARCH!',
    callFoot: 'left',
    regulationStandard: 'CAPP 60-34: Given from the halt. On MARCH, step off smartly on the LEFT foot taking a full 24-inch step. Swing arms coordinated 6 inches to the front and 3 inches to the rear.',
    choices: [
      {
        id: 'c1',
        text: 'Step off sharply with the LEFT foot, 24-inch step, natural 6-inch forward coordinated armswing, eyes straight ahead.',
        isCorrect: true,
        explanation: 'Correct! All forward marching commands from the halt step off on the LEFT foot with a 24-inch stride.',
        animationType: 'march'
      },
      {
        id: 'c2',
        text: 'Step off with the RIGHT foot taking a 30-inch step without arm swing.',
        isCorrect: false,
        explanation: 'Incorrect: Marching always steps off with the LEFT foot, not right, with 24-inch steps at Quick Time.',
        animationType: 'stumble'
      },
      {
        id: 'c3',
        text: 'Take a half-step with left foot and look down to check your boots.',
        isCorrect: false,
        explanation: 'Incorrect: Forward March requires a full 24-inch step with head and eyes locked front.',
        animationType: 'stumble'
      },
      {
        id: 'c4',
        text: 'Take two quick hops forward to establish cadence.',
        isCorrect: false,
        explanation: 'Incorrect: Never hop in drill. Step off cleanly on the left foot.',
        animationType: 'stumble'
      }
    ]
  },
  {
    id: 'ach2_2',
    name: 'Column Right, MARCH',
    category: 'marching',
    prepCommand: 'Column Right',
    execCommand: 'MARCH!',
    voiceText: 'Column Right, MARCH!',
    callFoot: 'right',
    regulationStandard: 'CAPP 60-34: Both preparatory and execution commands called as the RIGHT foot strikes the deck. The base element executes a 90-degree right turn on the ball of the right foot and takes up the half step.',
    choices: [
      {
        id: 'c1',
        text: 'Called on LEFT foot; pivot immediately 90° left and run forward.',
        isCorrect: false,
        explanation: 'Incorrect: Column Right must be called on the RIGHT foot, and turns right, not left.',
        animationType: 'stumble'
      },
      {
        id: 'c2',
        text: 'Called on RIGHT foot. Pivot 90° right on ball of right foot, take up half-step (12") while outside elements swing wide to maintain alignment.',
        isCorrect: true,
        explanation: 'Correct! Column Right is called on the RIGHT foot. The pivot is 90° right, transitioning to half-step until Forward MARCH is called.',
        animationType: 'column-right'
      },
      {
        id: 'c3',
        text: 'Halt in place, do a Right Face, then step off at normal step.',
        isCorrect: false,
        explanation: 'Incorrect: Column Right is executed while in continuous forward motion, never halted.',
        animationType: 'stumble'
      },
      {
        id: 'c4',
        text: 'Turn 180 degrees to the rear as a column.',
        isCorrect: false,
        explanation: 'Incorrect: Column Right changes direction 90 degrees to the right.',
        animationType: 'stumble'
      }
    ]
  },
  {
    id: 'ach2_3',
    name: 'Column Left, MARCH',
    category: 'marching',
    prepCommand: 'Column Left',
    execCommand: 'MARCH!',
    voiceText: 'Column Left, MARCH!',
    callFoot: 'left',
    regulationStandard: 'CAPP 60-34: Called as the LEFT foot strikes the ground. The base element executes a 90-degree left turn and takes up the half step until Forward MARCH is called.',
    choices: [
      {
        id: 'c1',
        text: 'Called on LEFT foot. Base element pivots 90° left, takes up half-step until all elements complete the turn and align.',
        isCorrect: true,
        explanation: 'Correct! Column Left is called on the LEFT foot. The base element pivots 90° left and maintains half step.',
        animationType: 'column-left'
      },
      {
        id: 'c2',
        text: 'Called on RIGHT foot; entire flight stops and faces left.',
        isCorrect: false,
        explanation: 'Incorrect: Column Left is called on the LEFT foot while marching.',
        animationType: 'stumble'
      },
      {
        id: 'c3',
        text: 'Pivot 90 degrees right and increase cadence to Double Time.',
        isCorrect: false,
        explanation: 'Incorrect: Column Left turns LEFT, maintaining Quick Time cadence.',
        animationType: 'stumble'
      },
      {
        id: 'c4',
        text: 'Each cadet turns left individually without waiting for the pivot point.',
        isCorrect: false,
        explanation: 'Incorrect: That would be a Left Flank, not a Column Left. In Column Left, cadets pivot at the same geographic spot.',
        animationType: 'stumble'
      }
    ]
  },
  {
    id: 'ach2_4',
    name: 'Right Flank, MARCH',
    category: 'marching',
    prepCommand: 'Right Flank',
    execCommand: 'MARCH!',
    voiceText: 'Right Flank, MARCH!',
    callFoot: 'right',
    regulationStandard: 'CAPP 60-34: Called as the RIGHT foot strikes the deck. Take one more step with left foot, pivot 90 degrees to the right on ball of left foot, and step off in the new direction with the right foot.',
    choices: [
      {
        id: 'c1',
        text: 'Called on RIGHT foot. Take one step with left foot, pivot 90° right on ball of left foot, step off in new direction with right foot.',
        isCorrect: true,
        explanation: 'Correct! Right Flank is called on the right foot; step on left, pivot 90° right on left ball, step off with right foot.',
        animationType: 'flank-right'
      },
      {
        id: 'c2',
        text: 'Called on LEFT foot. Turn 90° left and stop marching.',
        isCorrect: false,
        explanation: 'Incorrect: Right Flank is called on the right foot, and the flight continues marching in the new direction.',
        animationType: 'stumble'
      },
      {
        id: 'c3',
        text: 'Only the front rank turns 90° right; rear ranks continue forward.',
        isCorrect: false,
        explanation: 'Incorrect: Flank movements turn ALL cadets in the flight simultaneously.',
        animationType: 'stumble'
      },
      {
        id: 'c4',
        text: 'Halt in place, execute Right Face, and wait for Forward March.',
        isCorrect: false,
        explanation: 'Incorrect: Flank movements are executed on the fly without stopping.',
        animationType: 'stumble'
      }
    ]
  },
  {
    id: 'ach2_5',
    name: 'Left Flank, MARCH',
    category: 'marching',
    prepCommand: 'Left Flank',
    execCommand: 'MARCH!',
    voiceText: 'Left Flank, MARCH!',
    callFoot: 'left',
    regulationStandard: 'CAPP 60-34: Called as the LEFT foot strikes the ground. Take one more step with right foot, pivot 90 degrees to the left on the ball of right foot, and step off with left foot.',
    choices: [
      {
        id: 'c1',
        text: 'Called on RIGHT foot; pivot 180° to the rear.',
        isCorrect: false,
        explanation: 'Incorrect: Left Flank is called on the LEFT foot and turns 90° to the left.',
        animationType: 'stumble'
      },
      {
        id: 'c2',
        text: 'Called on LEFT foot. Take one step with right foot, pivot 90° left on ball of right foot, step off in new direction with left foot.',
        isCorrect: true,
        explanation: 'Correct! Called on the left foot; advance right foot, pivot 90° left on right ball, step off with left foot.',
        animationType: 'flank-left'
      },
      {
        id: 'c3',
        text: 'Jump 90° to the left and swing both arms backward.',
        isCorrect: false,
        explanation: 'Incorrect: No jumping. Pivot cleanly on the ball of the right foot while maintaining armswing.',
        animationType: 'stumble'
      },
      {
        id: 'c4',
        text: 'Halt and perform a Left Face.',
        isCorrect: false,
        explanation: 'Incorrect: Flank march is executed while in continuous march.',
        animationType: 'stumble'
      }
    ]
  },
  {
    id: 'ach2_6',
    name: 'To the Rear, MARCH',
    category: 'marching',
    prepCommand: 'To the Rear',
    execCommand: 'MARCH!',
    voiceText: 'To the Rear, MARCH!',
    callFoot: 'right',
    regulationStandard: 'CAPP 60-34: Called as the RIGHT foot strikes the ground. Take a 12-inch step with left foot, pivot 180 degrees to the right on balls of both feet, suspend armswing, step off with left foot.',
    choices: [
      {
        id: 'c1',
        text: 'Called on LEFT foot; stop in place and do About Face.',
        isCorrect: false,
        explanation: 'Incorrect: To the Rear March is called on the RIGHT foot while marching, not halted.',
        animationType: 'stumble'
      },
      {
        id: 'c2',
        text: 'Called on RIGHT foot. Take 12-inch step with left foot, pivot 180° to the right on balls of both feet, suspend armswing, step off on left foot in 24-inch step.',
        isCorrect: true,
        explanation: 'Correct! Called on right foot; advance left foot 12", pivot 180° to the right on balls of both feet, step off on left foot.',
        animationType: 'rear-march'
      },
      {
        id: 'c3',
        text: 'Pivot 180 degrees to the left while keeping arms swinging wildly.',
        isCorrect: false,
        explanation: 'Incorrect: The pivot is always to the RIGHT, and armswing is strictly suspended during the pivot.',
        animationType: 'stumble'
      },
      {
        id: 'c4',
        text: 'Take three backward steps then turn around.',
        isCorrect: false,
        explanation: 'Incorrect: Cadets pivot 180 degrees forward to reverse direction.',
        animationType: 'stumble'
      }
    ]
  },
  {
    id: 'ach2_7',
    name: 'Flight, HALT',
    category: 'marching',
    prepCommand: 'Flight',
    execCommand: 'HALT!',
    voiceText: 'Flight, HALT!',
    callFoot: 'either',
    regulationStandard: 'CAPP 60-34: Called on either foot as it strikes the deck. Advance the other foot one full 24-inch step, then bring the trailing foot smartly alongside the leading foot, heels together at 45 degrees at Attention.',
    choices: [
      {
        id: 'c1',
        text: 'Stop instantly on the exact foot the command was called, freezing without taking another step.',
        isCorrect: false,
        explanation: 'Incorrect: In military drill, you MUST take exactly ONE more full step before bringing trailing foot alongside.',
        animationType: 'stumble'
      },
      {
        id: 'c2',
        text: 'Given on either foot. Take exactly ONE more full 24-inch step, then bring trailing foot smartly alongside at 45° Attention; freeze silent and immobile.',
        isCorrect: true,
        explanation: 'Correct! On HALT, you take exactly one more pace, bring the trailing foot smartly to attention, and freeze.',
        animationType: 'halt'
      },
      {
        id: 'c3',
        text: 'Take three decelerating steps, slide feet together, and put hands on hips.',
        isCorrect: false,
        explanation: 'Incorrect: There is no gradual stopping. Exactly one step followed by a smart snap to attention.',
        animationType: 'stumble'
      },
      {
        id: 'c4',
        text: 'Turn 90 degrees to face the commander immediately upon hearing HALT.',
        isCorrect: false,
        explanation: 'Incorrect: The flight halts in place facing the original direction of march until a new command is given.',
        animationType: 'stumble'
      }
    ]
  }
];

export const DrillSimulatorView: React.FC = () => {
  const { user, recordDrillScore } = useAuth();
  const [selectedTrack, setSelectedTrack] = useState<'ach1' | 'ach2' | 'gauntlet'>('ach1');
  const [commandIndex, setCommandIndex] = useState<number>(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);
  
  // Drill Game Metrics
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [highestStreak, setHighestStreak] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  // Animation States
  const [activeAnimation, setActiveAnimation] = useState<string>('attention');
  const [formationFacing, setFormationFacing] = useState<number>(0); // 0 = North, 90 = East, 180 = South, 270 = West
  const [isMarchingLoop, setIsMarchingLoop] = useState<boolean>(false);
  const [cadenceFoot, setCadenceFoot] = useState<'left' | 'right'>('left');
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [flightLeaderSpeaking, setFlightLeaderSpeaking] = useState<boolean>(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const cadenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeCommandList = selectedTrack === 'ach1' 
    ? ACH1_COMMANDS 
    : selectedTrack === 'ach2' 
      ? ACH2_COMMANDS 
      : [...ACH1_COMMANDS, ...ACH2_COMMANDS];

  const currentCommand = activeCommandList[commandIndex] || activeCommandList[0];

  // Marching Cadence metronome loop: 110 steps per minute (approx ~545ms per step)
  useEffect(() => {
    if (isMarchingLoop) {
      cadenceTimerRef.current = setInterval(() => {
        setCadenceFoot((prev) => {
          const next = prev === 'left' ? 'right' : 'left';
          if (audioEnabled) {
            playFootstepClick(next === 'left');
          }
          return next;
        });
      }, 545);
    } else {
      if (cadenceTimerRef.current) clearInterval(cadenceTimerRef.current);
    }
    return () => {
      if (cadenceTimerRef.current) clearInterval(cadenceTimerRef.current);
    };
  }, [isMarchingLoop, audioEnabled]);

  // Trigger flight leader voice whenever command changes
  useEffect(() => {
    speakFlightLeaderCommand(currentCommand);
  }, [commandIndex, selectedTrack]);

  const speakFlightLeaderCommand = (cmd: DrillGameCommand) => {
    setFlightLeaderSpeaking(true);
    // Play preparatory whistle/beep
    playCommandSnapSound(true);

    if (audioEnabled && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(cmd.voiceText);
        utterance.rate = 1.05;
        utterance.pitch = 1.0;
        utterance.volume = 0.9;
        utterance.onend = () => setFlightLeaderSpeaking(false);
        utterance.onerror = () => setFlightLeaderSpeaking(false);
        window.speechSynthesis.speak(utterance);
      } catch {
        setFlightLeaderSpeaking(false);
      }
    } else {
      setTimeout(() => setFlightLeaderSpeaking(false), 1200);
    }
  };

  const playFootstepClick = (isLeft: boolean) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(isLeft ? 440 : 330, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio context policy
    }
  };

  const playCommandSnapSound = (isPrep: boolean) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = isPrep ? 'triangle' : 'square';
      osc.frequency.setValueAtTime(isPrep ? 520 : 680, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch {
      // Ignore audio failure
    }
  };

  // Player picks what to do!
  const handleSelectChoice = (choice: DrillActionChoice) => {
    if (isAnswered) return;
    setSelectedChoiceId(choice.id);
    setIsAnswered(true);
    setIsCorrectAnswer(choice.isCorrect);

    // Trigger action animation immediately
    setActiveAnimation(choice.animationType);

    if (choice.isCorrect) {
      playCommandSnapSound(false);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > highestStreak) setHighestStreak(newStreak);
      setScore((prev) => prev + 100 + newStreak * 20);
      setCorrectCount((prev) => prev + 1);

      // Adjust formation state according to the command
      if (choice.animationType === 'right-face' || choice.animationType === 'column-right' || choice.animationType === 'flank-right') {
        setFormationFacing((prev) => (prev + 90) % 360);
      } else if (choice.animationType === 'left-face' || choice.animationType === 'column-left' || choice.animationType === 'flank-left') {
        setFormationFacing((prev) => (prev - 90 + 360) % 360);
      } else if (choice.animationType === 'about-face' || choice.animationType === 'rear-march') {
        setFormationFacing((prev) => (prev + 180) % 360);
      }

      if (choice.animationType === 'march' || choice.animationType === 'column-right' || choice.animationType === 'column-left' || choice.animationType === 'flank-right' || choice.animationType === 'flank-left') {
        setIsMarchingLoop(true);
      } else if (choice.animationType === 'halt' || choice.animationType === 'ready-front' || choice.animationType === 'attention' || choice.animationType === 'order-arms') {
        setIsMarchingLoop(false);
      }
    } else {
      // Discrepancy!
      setStreak(0);
      setScore((prev) => Math.max(0, prev - 25));
      setIsMarchingLoop(false);
    }
  };

  const handleNextCommand = () => {
    if (commandIndex + 1 < activeCommandList.length) {
      setCommandIndex(commandIndex + 1);
      setSelectedChoiceId(null);
      setIsAnswered(false);
      setIsCorrectAnswer(null);
      // Reset animation to neutral or previous stable state
      setActiveAnimation(isMarchingLoop ? 'march' : 'attention');
    } else {
      // Round Complete
      setGameOver(true);
      const total = activeCommandList.length;
      const finalPct = Math.round((correctCount / total) * 100);
      recordDrillScore(
        selectedTrack === 'ach1' 
          ? 'Achievement 1 In-Place Drill' 
          : selectedTrack === 'ach2' 
            ? 'Achievement 2 Marching Drill' 
            : 'Cadet Drill Gauntlet', 
        finalPct
      );

      if (finalPct >= 73) {
        confetti({ particleCount: 80, spread: 70 });
      }
    }
  };

  const handleRestartGame = () => {
    setCommandIndex(0);
    setSelectedChoiceId(null);
    setIsAnswered(false);
    setIsCorrectAnswer(null);
    setScore(0);
    setStreak(0);
    setCorrectCount(0);
    setGameOver(false);
    setFormationFacing(0);
    setIsMarchingLoop(false);
    setActiveAnimation('attention');
  };

  const handleSwitchTrack = (track: 'ach1' | 'ach2' | 'gauntlet') => {
    setSelectedTrack(track);
    setCommandIndex(0);
    setSelectedChoiceId(null);
    setIsAnswered(false);
    setIsCorrectAnswer(null);
    setScore(0);
    setStreak(0);
    setCorrectCount(0);
    setGameOver(false);
    setFormationFacing(0);
    setIsMarchingLoop(false);
    setActiveAnimation('attention');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Top Banner Header */}
      <div className="relative rounded-3xl overflow-hidden bg-[#0a1e3d] border border-[#163a70] shadow-2xl p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-full sm:w-2/5 h-full opacity-20 sm:opacity-30 pointer-events-none overflow-hidden">
          <img
            src={capDrillField}
            alt="Cadet Flight Drill Field"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1e3d] via-[#0a1e3d]/85 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c8102e]/20 border border-[#c8102e]/40 text-white text-xs font-bold shadow-sm">
              <Compass className="w-3.5 h-3.5 text-[#ffc72c]" />
              <span>Interactive Flight Line Drill Simulator</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Flight Command & Execution Game
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
              Listen as the Flight Leader barks out drill commands in real time. Choose the exact footwork, arm movements, and timing to execute the action smartly in ranks!
            </p>
          </div>

          {/* Game Stats & Cadence Widget */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-[#06142a] border border-[#163a70] flex items-center gap-3 shadow-md">
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Score</div>
                <div className="text-lg font-black text-[#ffc72c] font-mono">{score}</div>
              </div>
              <div className="w-px h-8 bg-[#163a70]" />
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Flame className="w-3 h-3 text-[#c8102e]" /> Streak
                </div>
                <div className="text-lg font-black text-white font-mono">{streak}x</div>
              </div>
            </div>

            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className={`p-3 rounded-2xl border transition flex items-center justify-center ${
                audioEnabled 
                  ? 'bg-[#002855] text-[#ffc72c] border-[#ffc72c]/50 shadow-md' 
                  : 'bg-[#06142a] text-slate-400 border-[#163a70]'
              }`}
              title={audioEnabled ? 'Mute Flight Leader Voice & Cadence' : 'Enable Flight Leader Voice & Cadence'}
            >
              {audioEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Game Mode Track Selector */}
      <div className="flex flex-wrap items-center gap-3 border-b border-[#163a70] pb-3">
        <button
          onClick={() => handleSwitchTrack('ach1')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            selectedTrack === 'ach1'
              ? 'bg-[#c8102e] text-white shadow-lg shadow-[#c8102e]/30'
              : 'bg-[#0a1e3d] text-slate-300 hover:text-white border border-[#163a70]'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Track 1: In-Place Fundamentals (Ach 1)</span>
        </button>

        <button
          onClick={() => handleSwitchTrack('ach2')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            selectedTrack === 'ach2'
              ? 'bg-[#c8102e] text-white shadow-lg shadow-[#c8102e]/30'
              : 'bg-[#0a1e3d] text-slate-300 hover:text-white border border-[#163a70]'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Track 2: Marching Flight Drill (Ach 2)</span>
        </button>

        <button
          onClick={() => handleSwitchTrack('gauntlet')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            selectedTrack === 'gauntlet'
              ? 'bg-[#c8102e] text-white shadow-lg shadow-[#c8102e]/30'
              : 'bg-[#0a1e3d] text-slate-300 hover:text-white border border-[#163a70]'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-[#ffc72c]" />
          <span>Track 3: Full Drill Gauntlet</span>
        </button>
      </div>

      {/* Main Game Stage */}
      {!gameOver ? (
        <div className="space-y-6">
          {/* Flight Leader Command Callout Stage */}
          <div className="relative rounded-3xl bg-gradient-to-r from-[#0a1e3d] via-[#0d2852] to-[#0a1e3d] border-2 border-[#163a70] p-6 shadow-2xl overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Flight Leader Avatar & Speech Bubble */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#002855] to-[#163a70] border-2 flex items-center justify-center shadow-xl transition-all duration-300 ${
                    flightLeaderSpeaking ? 'border-[#ffc72c] scale-105 ring-4 ring-[#ffc72c]/30' : 'border-[#163a70]'
                  }`}>
                    <span className="text-xs font-black text-[#ffc72c] text-center leading-tight">
                      FLT<br />LEADER
                    </span>
                  </div>
                  {flightLeaderSpeaking && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffc72c] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-[#ffc72c]"></span>
                    </span>
                  )}
                </div>

                {/* Animated Speech Callout Bubble */}
                <div className="relative bg-[#06142a] border border-[#163a70] px-5 py-3 rounded-2xl shadow-xl space-y-0.5">
                  <div className="text-[10px] text-slate-400 uppercase font-black tracking-wider flex items-center gap-2">
                    <span>COMMAND OF THE FLIGHT LEADER</span>
                    <button
                      onClick={() => speakFlightLeaderCommand(currentCommand)}
                      className="text-[#ffc72c] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Volume1 className="w-3 h-3" /> Re-hear
                    </button>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-white tracking-wide font-mono flex items-center gap-2">
                    <span className="text-[#ffc72c]">{currentCommand.prepCommand},</span>
                    <span className="text-[#c8102e] uppercase">{currentCommand.execCommand}</span>
                  </div>
                </div>
              </div>

              {/* Progress & Category */}
              <div className="text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-1">
                <span className="text-xs font-mono font-bold text-[#ffc72c]">
                  Command {commandIndex + 1} of {activeCommandList.length}
                </span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#002855] text-slate-300 border border-[#163a70]">
                  {currentCommand.category === 'in-place' ? 'In-Place Movement' : 'Marching Footwork'}
                </span>
              </div>
            </div>
          </div>

          {/* Center Stage: Split Screen (Formation View + Action Cam + Choices) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Visual Formation & Cadet Action Animation */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Formation Drone Radar */}
              <div className="p-5 rounded-3xl bg-[#0a1e3d] border border-[#163a70] shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#ffc72c]" />
                    <span>Flight Formation Grid (Top-Down)</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-300">
                    <span>Heading:</span>
                    <span className="text-[#ffc72c] font-bold">{formationFacing}° ({formationFacing === 0 ? 'N' : formationFacing === 90 ? 'E' : formationFacing === 180 ? 'S' : 'W'})</span>
                  </div>
                </div>

                {/* Animated Field Canvas */}
                <div className="relative rounded-2xl bg-gradient-to-b from-[#030914] to-[#06142a] border border-[#163a70] p-6 min-h-[260px] flex flex-col items-center justify-center overflow-hidden shadow-inner">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#163a70_1px,transparent_1px),linear-gradient(to_bottom,#163a70_1px,transparent_1px)] bg-[size:1.75rem_1.75rem] opacity-25" />

                  {/* Flight Leader In Front */}
                  <div className="relative z-10 mb-6 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#c8102e]/30 border-2 border-[#ffc72c] flex items-center justify-center shadow-lg shadow-[#c8102e]/20">
                      <span className="text-[8px] font-black text-[#ffc72c]">FLT CC</span>
                    </div>
                    <span className="text-[9px] text-[#ffc72c] font-bold mt-0.5">3 Paces Centered</span>
                  </div>

                  {/* Two Elements Formation */}
                  <div className="relative z-10 space-y-4 text-center">
                    {/* Element 1 */}
                    <div className="flex items-center gap-4 justify-center">
                      {[1, 2, 3].map((cadetNum) => {
                        const isPlayer = cadetNum === 2;
                        return (
                          <div
                            key={cadetNum}
                            style={{ transform: `rotate(${formationFacing}deg)` }}
                            className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center shadow-lg transition-all duration-500 relative ${
                              isPlayer
                                ? 'bg-[#002855] border-2 border-[#ffc72c] ring-2 ring-[#ffc72c]/40 shadow-[#ffc72c]/20'
                                : 'bg-[#081b38] border border-[#163a70]'
                            } ${isMarchingLoop ? 'animate-bounce' : ''}`}
                          >
                            <ArrowUp className={`w-3.5 h-3.5 ${isPlayer ? 'text-[#ffc72c]' : 'text-blue-300'}`} />
                            <span className="text-[8px] font-black text-white">
                              {isPlayer ? 'YOU' : `C-${cadetNum}`}
                            </span>
                            {isPlayer && (
                              <span className="absolute -top-2 -right-2 px-1 rounded bg-[#c8102e] text-[7px] font-bold text-white">
                                C-2
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Element 2 */}
                    <div className="flex items-center gap-4 justify-center">
                      {[4, 5, 6].map((cadetNum) => (
                        <div
                          key={cadetNum}
                          style={{ transform: `rotate(${formationFacing}deg)` }}
                          className={`w-11 h-11 rounded-xl bg-[#081b38] border border-[#163a70] flex flex-col items-center justify-center shadow-lg transition-all duration-500 ${
                            isMarchingLoop ? 'animate-bounce' : ''
                          }`}
                        >
                          <ArrowUp className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-[8px] font-bold text-slate-300">C-{cadetNum}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cadence Indicator */}
                  {isMarchingLoop && (
                    <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] text-slate-300 bg-[#030914]/90 px-3 py-1 rounded-xl border border-[#163a70]">
                      <span className="font-mono text-[#ffc72c] font-bold">Quick Time 110 BPM</span>
                      <span className="font-mono font-bold">STEP: {cadenceFoot.toUpperCase()} FOOT</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Animated Cadet Posture & Action Stage */}
              <div className="p-5 rounded-3xl bg-[#0a1e3d] border border-[#163a70] shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#ffc72c]" />
                    <span>Your Cadet Execution Cam</span>
                  </div>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                    isAnswered 
                      ? isCorrectAnswer 
                        ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50'
                        : 'bg-[#c8102e]/30 text-red-300 border border-[#c8102e]/50'
                      : 'bg-[#002855] text-slate-300 border border-[#163a70]'
                  }`}>
                    {activeAnimation.toUpperCase()}
                  </span>
                </div>

                {/* Cadet Animation Display */}
                <div className="relative rounded-2xl bg-gradient-to-b from-[#030914] to-[#06142a] border border-[#163a70] p-6 min-h-[220px] flex items-center justify-center overflow-hidden">
                  {/* Dynamic Silhouette / Uniform Figure with State-Based SVG Animations */}
                  <div className={`transition-all duration-300 flex flex-col items-center ${
                    activeAnimation === 'stumble' ? 'animate-wiggle text-red-400' : 'text-slate-200'
                  }`}>
                    {/* Head & Flight Cap */}
                    <div className={`relative transition-transform duration-300 ${
                      activeAnimation === 'dress-right' ? 'rotate-45 translate-x-2' : ''
                    }`}>
                      {/* Flight Cap */}
                      <div className="w-10 h-3 bg-[#002855] rounded-t-full border border-[#163a70] mx-auto shadow-sm" />
                      {/* Face */}
                      <div className="w-8 h-8 rounded-full bg-[#e0b084] border border-[#b88050] mx-auto shadow-sm flex items-center justify-center">
                        <div className="flex gap-1.5">
                          <div className="w-1 h-1 bg-slate-800 rounded-full" />
                          <div className="w-1 h-1 bg-slate-800 rounded-full" />
                        </div>
                      </div>
                    </div>

                    {/* Torso & Uniform Shirt / Tie */}
                    <div className="relative mt-1">
                      <div className="w-16 h-16 rounded-xl bg-[#002855] border border-[#163a70] shadow-md relative overflow-hidden flex flex-col items-center">
                        {/* Tie & Collar */}
                        <div className="w-2.5 h-10 bg-[#06142a] mx-auto" />
                        {/* Ribbons & Nametag */}
                        <div className="absolute top-3 left-2 w-3.5 h-1.5 bg-[#c8102e] rounded-xs" />
                        <div className="absolute top-3 right-2 w-3.5 h-1.5 bg-[#002855] border border-blue-300 rounded-xs" />
                      </div>

                      {/* Left Arm */}
                      <div
                        className={`absolute top-1 left-0 w-3 bg-[#002855] border border-[#163a70] rounded-lg transition-all duration-300 ${
                          activeAnimation === 'dress-right'
                            ? '-translate-x-12 -rotate-90 origin-top-left w-14 h-3'
                            : activeAnimation === 'parade-rest'
                              ? 'translate-x-2 translate-y-3 rotate-45 h-10'
                              : 'h-14'
                        }`}
                      />

                      {/* Right Arm */}
                      <div
                        className={`absolute top-1 right-0 w-3 bg-[#002855] border border-[#163a70] rounded-lg transition-all duration-300 ${
                          activeAnimation === 'salute'
                            ? '-translate-x-1 -translate-y-2 -rotate-135 origin-top-right w-3 h-12 border-[#ffc72c]'
                            : activeAnimation === 'parade-rest'
                              ? '-translate-x-2 translate-y-3 -rotate-45 h-10'
                              : 'h-14'
                        }`}
                      />
                    </div>

                    {/* Legs & Low Quarters */}
                    <div className="flex gap-2 mt-1">
                      {/* Left Leg */}
                      <div
                        className={`w-4 bg-[#0a1e3d] border border-[#163a70] rounded-b-md transition-all duration-300 flex flex-col justify-end ${
                          activeAnimation === 'parade-rest'
                            ? '-translate-x-4 h-16'
                            : isMarchingLoop && cadenceFoot === 'left'
                              ? '-translate-y-2 h-14'
                              : 'h-16'
                        }`}
                      >
                        <div className="w-5 h-2 bg-black rounded-b-sm -ml-0.5 shadow-sm" />
                      </div>

                      {/* Right Leg */}
                      <div
                        className={`w-4 bg-[#0a1e3d] border border-[#163a70] rounded-b-md transition-all duration-300 flex flex-col justify-end ${
                          activeAnimation === 'about-face'
                            ? 'translate-x-2 translate-y-1 h-17'
                            : isMarchingLoop && cadenceFoot === 'right'
                              ? '-translate-y-2 h-14'
                              : 'h-16'
                        }`}
                      >
                        <div className="w-5 h-2 bg-black rounded-b-sm -ml-0.5 shadow-sm" />
                      </div>
                    </div>
                  </div>

                  {/* Feedback overlay badge inside Action Cam */}
                  {isAnswered && (
                    <div className="absolute top-2 left-2 right-2 flex items-center justify-between bg-[#030914]/90 p-2.5 rounded-xl border border-[#163a70] backdrop-blur">
                      <div className="flex items-center gap-2">
                        {isCorrectAnswer ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-[#c8102e]" />
                        )}
                        <span className={`text-xs font-bold ${isCorrectAnswer ? 'text-emerald-300' : 'text-red-300'}`}>
                          {isCorrectAnswer ? 'Sharp & Precise Form!' : 'Form Discrepancy (Gig)'}
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#ffc72c]">
                        {isCorrectAnswer ? '+100 PTS' : '-25 PTS'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Right Column: Player Tactical Action Choices */}
            <div className="lg:col-span-6 space-y-5">
              <div className="p-6 rounded-3xl bg-[#0a1e3d] border border-[#163a70] shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-black text-[#ffc72c] uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>YOUR ACTION AS CADET IN RANK</span>
                    </span>
                    <h2 className="text-lg font-black text-white">
                      How do you execute: &ldquo;{currentCommand.name}&rdquo;?
                    </h2>
                  </div>

                  {currentCommand.callFoot && (
                    <div className="px-2.5 py-1 rounded-lg bg-[#06142a] border border-[#163a70] text-[11px] font-mono font-bold text-[#ffc72c]">
                      Foot: {currentCommand.callFoot.toUpperCase()}
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Select the exact footwork, posture, arm movement, and count mandated by CAPP 60-34:
                </p>

                {/* 4 Choices Grid */}
                <div className="space-y-3 pt-1">
                  {currentCommand.choices.map((choice, idx) => {
                    const isSelected = selectedChoiceId === choice.id;
                    const showFeedback = isAnswered;

                    let btnStyle = 'bg-[#06142a] border-[#163a70] hover:border-[#ffc72c]/60 hover:bg-[#002855]/40 text-slate-200';

                    if (showFeedback) {
                      if (choice.isCorrect) {
                        btnStyle = 'bg-emerald-950/40 border-emerald-500 text-white shadow-lg ring-1 ring-emerald-500/50';
                      } else if (isSelected && !choice.isCorrect) {
                        btnStyle = 'bg-red-950/40 border-[#c8102e] text-white shadow-lg ring-1 ring-red-500/50';
                      } else {
                        btnStyle = 'bg-[#06142a]/60 border-[#163a70]/40 text-slate-500 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={choice.id}
                        disabled={isAnswered}
                        onClick={() => handleSelectChoice(choice)}
                        className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 ${btnStyle}`}
                      >
                        <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 transition-colors ${
                          showFeedback && choice.isCorrect
                            ? 'bg-emerald-600 text-white'
                            : showFeedback && isSelected && !choice.isCorrect
                              ? 'bg-[#c8102e] text-white'
                              : 'bg-[#002855] text-[#ffc72c]'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </div>

                        <div className="space-y-1 flex-1">
                          <p className="text-xs font-semibold leading-relaxed">
                            {choice.text}
                          </p>

                          {showFeedback && (isSelected || choice.isCorrect) && (
                            <p className={`text-[11px] pt-1 font-normal ${
                              choice.isCorrect ? 'text-emerald-300' : 'text-red-300'
                            }`}>
                              {choice.explanation}
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Regulation Spec & Next Step Button */}
                {isAnswered && (
                  <div className="pt-3 border-t border-[#163a70] space-y-4">
                    <div className="p-3.5 rounded-xl bg-[#06142a] border border-[#163a70] text-xs text-slate-300 space-y-1">
                      <div className="font-bold text-[#ffc72c] flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5" />
                        <span>Official Regulation Standard:</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {currentCommand.regulationStandard}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        onClick={handleRestartGame}
                        className="text-xs text-slate-400 hover:text-white transition flex items-center gap-1"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Restart Track</span>
                      </button>

                      <button
                        onClick={handleNextCommand}
                        className="py-2.5 px-6 rounded-xl bg-[#c8102e] hover:bg-[#a80c25] text-white font-bold text-xs transition flex items-center gap-2 shadow-lg shadow-[#c8102e]/30"
                      >
                        <span>
                          {commandIndex + 1 < activeCommandList.length
                            ? 'Next Drill Command'
                            : 'View Final Drill Scorecard'}
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      ) : (
        /* Round Finished Summary Scorecard */
        <div className="max-w-xl mx-auto p-8 rounded-3xl bg-[#0a1e3d] border border-[#163a70] shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#002855] border-2 border-[#ffc72c] mx-auto flex items-center justify-center text-[#ffc72c] shadow-lg">
            <Trophy className="w-8 h-8 text-[#ffc72c]" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-white">Drill Practical Evaluation Finished</h2>
            <p className="text-xs text-slate-300 mt-1">
              Passing requirement according to CAPP 60-34: 73%
            </p>
          </div>

          {(() => {
            const total = activeCommandList.length;
            const pct = Math.round((correctCount / total) * 100);
            const passed = pct >= 73;

            return (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-[#06142a] border border-[#163a70] space-y-2">
                  <div className="text-4xl font-black text-white font-mono">{pct}%</div>
                  <div className="text-xs text-slate-300">
                    {correctCount} of {total} Commands Executed with Flawless Precision
                  </div>
                  <div className="flex justify-center gap-4 text-xs font-mono text-slate-300 pt-2 border-t border-[#163a70]/60">
                    <span>Total Score: <strong className="text-[#ffc72c]">{score} pts</strong></span>
                    <span>Max Streak: <strong className="text-white">{highestStreak}x</strong></span>
                  </div>

                  <div
                    className={`inline-block mt-3 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      passed
                        ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/60'
                        : 'bg-[#c8102e]/30 text-red-300 border border-[#c8102e]/60'
                    }`}
                  >
                    {passed ? 'QUALIFIED / DRILL PASSED' : 'RETEST RECOMMENDED'}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={handleRestartGame}
                    className="py-2.5 px-6 rounded-xl bg-[#c8102e] hover:bg-[#a80c25] text-white text-xs font-bold shadow-lg shadow-[#c8102e]/30 transition"
                  >
                    Drill Again
                  </button>
                  <button
                    onClick={() => handleSwitchTrack(selectedTrack === 'ach1' ? 'ach2' : 'ach1')}
                    className="py-2.5 px-5 rounded-xl bg-[#002855] hover:bg-[#003875] text-white text-xs font-bold border border-[#163a70] transition"
                  >
                    Switch Track
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
