import type { GameState } from './types';
import { roomShell } from './sceneShared';

export function parlorSvg(state: GameState): string {
  const fire = state.flags.fireplaceLit
    ? `<g>
         <ellipse cx="620" cy="310" rx="28" ry="18" fill="#c45c20" opacity="0.7">
           <animate attributeName="opacity" values="0.5;0.85;0.5" dur="1.2s" repeatCount="indefinite"/>
         </ellipse>
         <ellipse cx="620" cy="300" rx="14" ry="22" fill="#e8a040" opacity="0.8">
           <animate attributeName="ry" values="18;24;18" dur="0.8s" repeatCount="indefinite"/>
         </ellipse>
       </g>`
    : `<rect x="598" y="280" width="44" height="40" fill="#1a120e" stroke="#3a2e24"/>`;

  return roomShell(`
    <!-- sofa -->
    <g>
      <rect x="80" y="280" width="200" height="70" rx="8" fill="#3a2a22" stroke="#5a4030"/>
      <rect x="90" y="260" width="50" height="40" rx="6" fill="#4a3228"/>
      <rect x="220" y="260" width="50" height="40" rx="6" fill="#4a3228"/>
      <rect x="100" y="290" width="160" height="35" rx="4" fill="#2e2018"/>
    </g>
    <!-- painting -->
    <g>
      <rect x="350" y="90" width="120" height="100" fill="#1a1814" stroke="#8a7355" stroke-width="3"/>
      <rect x="360" y="100" width="100" height="80" fill="#2a3540"/>
      <!-- three crows -->
      <path d="M380 145 q8-12 16 0 q-6 4-16 0" fill="#0a0a0a"/>
      <path d="M405 140 q10-14 18 0 q-7 5-18 0" fill="#0a0a0a"/>
      <path d="M430 148 q8-10 14 0 q-5 3-14 0" fill="#0a0a0a"/>
      <ellipse cx="410" cy="160" rx="35" ry="8" fill="#6a7a88" opacity="0.4"/>
    </g>
    <!-- fireplace -->
    <g>
      <rect x="560" y="180" width="120" height="160" fill="#2a2018" stroke="#5a4535" stroke-width="2"/>
      <rect x="580" y="200" width="80" height="100" fill="#0e0a08"/>
      <rect x="555" y="335" width="130" height="12" fill="#4a3830"/>
      ${fire}
    </g>
    <!-- rug -->
    <ellipse cx="400" cy="420" rx="110" ry="35" fill="#4a3028" stroke="#6a4540" opacity="0.85"/>
    <ellipse cx="400" cy="420" rx="70" ry="20" fill="#3a2420" opacity="0.6"/>
    <!-- hatch on ceiling -->
    <g>
      <rect x="370" y="18" width="60" height="28" rx="2" fill="#2a2218" stroke="#7a6550" stroke-width="2"/>
      <circle cx="400" cy="32" r="4" fill="${state.flags.hatchUnlocked ? '#8fbc6a' : '#5a4030'}"/>
      ${state.flags.hatchUnlocked ? '<line x1="400" y1="46" x2="400" y2="90" stroke="#5a5040" stroke-width="2" stroke-dasharray="4 3"/>' : ''}
    </g>
    <!-- doors -->
    <g>
      <rect x="8" y="140" width="48" height="180" fill="#2a1e16" stroke="#6a5040"/>
      <circle cx="45" cy="230" r="4" fill="#c4a574"/>
      <text x="32" y="330" fill="#8a7355" font-size="11" text-anchor="middle" font-family="serif">书房</text>
    </g>
    <g>
      <rect x="744" y="140" width="48" height="180" fill="#2a1e16" stroke="#6a5040"/>
      <circle cx="755" cy="230" r="4" fill="#c4a574"/>
      <text x="768" y="330" fill="#8a7355" font-size="11" text-anchor="middle" font-family="serif">厨房</text>
    </g>
    <!-- fog at window-ish top -->
    <rect x="200" y="50" width="80" height="60" fill="url(#fog)" opacity="0.3"/>
  `);
}
