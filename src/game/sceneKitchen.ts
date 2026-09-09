import type { GameState } from './types';
import { roomShell } from './sceneShared';

export function kitchenSvg(state: GameState): string {
  const gear = state.flags.gearPlaced
    ? `<circle cx="430" cy="300" r="10" fill="none" stroke="#c4a574" stroke-width="2"/>
       <circle cx="430" cy="300" r="3" fill="#c4a574"/>`
    : '';
  const crank = state.flags.crankPlaced
    ? `<line x1="440" y1="300" x2="465" y2="285" stroke="#8a6a40" stroke-width="3"/>
       <circle cx="468" cy="283" r="5" fill="#6a5030"/>`
    : '';
  const glow = state.flags.musicBoxPlayed
    ? `<ellipse cx="420" cy="290" rx="40" ry="20" fill="#c4a574" opacity="0.2">
         <animate attributeName="opacity" values="0.1;0.3;0.1" dur="2s" repeatCount="indefinite"/>
       </ellipse>`
    : '';

  return roomShell(`
    <!-- cupboard -->
    <g>
      <rect x="70" y="120" width="110" height="200" fill="#2a1e16" stroke="#5a4030" stroke-width="2"/>
      <line x1="125" y1="120" x2="125" y2="320" stroke="#5a4030"/>
      <circle cx="115" cy="220" r="4" fill="${state.flags.cupboardUnlocked ? '#4a6a40' : '#c4a574'}"/>
      <circle cx="135" cy="220" r="4" fill="${state.flags.cupboardUnlocked ? '#4a6a40' : '#c4a574'}"/>
    </g>
    <!-- table + music box -->
    <g>
      <rect x="300" y="320" width="240" height="16" fill="#3a2a1e" stroke="#5a4030"/>
      <rect x="320" y="336" width="20" height="50" fill="#2a1e14"/>
      <rect x="500" y="336" width="20" height="50" fill="#2a1e14"/>
      ${glow}
      <rect x="380" y="275" width="80" height="45" rx="4" fill="#3a3028" stroke="#8a7355" stroke-width="2"/>
      <rect x="390" y="282" width="60" height="20" fill="#1a1814" stroke="#5a5040"/>
      ${gear}${crank}
      <text x="420" y="355" fill="#6a5a48" font-size="10" text-anchor="middle" font-family="serif">八音盒</text>
    </g>
    <!-- stove -->
    <g>
      <rect x="560" y="100" width="140" height="80" fill="#2a2824" stroke="#5a5048"/>
      <circle cx="595" cy="135" r="18" fill="#1a1814" stroke="#4a4038"/>
      <circle cx="655" cy="135" r="18" fill="#1a1814" stroke="#4a4038"/>
      <rect x="580" y="180" width="100" height="60" fill="#22201c" stroke="#4a4038"/>
    </g>
    <!-- sink -->
    <g>
      <rect x="560" y="250" width="140" height="70" fill="#3a4044" stroke="#6a7074"/>
      <ellipse cx="630" cy="280" rx="40" ry="18" fill="#1a2228"/>
      <rect x="620" y="240" width="20" height="20" fill="#5a6064"/>
      <rect x="625" y="230" width="10" height="15" fill="#7a8084"/>
    </g>
    <!-- door -->
    <g>
      <rect x="8" y="140" width="48" height="180" fill="#2a1e16" stroke="#6a5040"/>
      <circle cx="45" cy="230" r="4" fill="#c4a574"/>
      <text x="32" y="330" fill="#8a7355" font-size="11" text-anchor="middle" font-family="serif">客厅</text>
    </g>
  `);
}
