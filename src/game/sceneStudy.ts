import type { GameState } from './types';
import { roomShell } from './sceneShared';

export function studySvg(_state: GameState): string {
  return roomShell(`
    <!-- bookshelf -->
    <g>
      <rect x="70" y="100" width="100" height="230" fill="#2a1e14" stroke="#5a4030"/>
      <rect x="78" y="110" width="84" height="40" fill="#4a2018"/>
      <rect x="78" y="160" width="84" height="40" fill="#3a3020"/>
      <rect x="78" y="210" width="84" height="40" fill="#2a3040"/>
      <rect x="78" y="260" width="84" height="50" fill="#3a2818"/>
      <line x1="70" y1="155" x2="170" y2="155" stroke="#5a4030"/>
      <line x1="70" y1="205" x2="170" y2="205" stroke="#5a4030"/>
      <line x1="70" y1="255" x2="170" y2="255" stroke="#5a4030"/>
    </g>
    <!-- window with fog -->
    <g>
      <rect x="380" y="70" width="140" height="120" fill="#1a2228" stroke="#8a7355" stroke-width="3"/>
      <line x1="450" y1="70" x2="450" y2="190" stroke="#8a7355"/>
      <line x1="380" y1="130" x2="520" y2="130" stroke="#8a7355"/>
      <rect x="385" y="75" width="60" height="50" fill="url(#fog)"/>
      <rect x="455" y="75" width="60" height="50" fill="url(#fog)"/>
      <rect x="385" y="135" width="60" height="50" fill="url(#fog)" opacity="0.7"/>
      <rect x="455" y="135" width="60" height="50" fill="url(#fog)" opacity="0.7"/>
    </g>
    <!-- clock -->
    <g>
      <circle cx="640" cy="120" r="45" fill="#2a2418" stroke="#c4a574" stroke-width="3"/>
      <circle cx="640" cy="120" r="38" fill="#1a1810"/>
      <!-- hour hand ~7, minute ~35 -->
      <line x1="640" y1="120" x2="625" y2="145" stroke="#c4a574" stroke-width="3" stroke-linecap="round"/>
      <line x1="640" y1="120" x2="660" y2="145" stroke="#a08060" stroke-width="2" stroke-linecap="round"/>
      <circle cx="640" cy="120" r="3" fill="#c4a574"/>
      <text x="640" y="95" fill="#6a5a40" font-size="8" text-anchor="middle">12</text>
      <text x="665" y="125" fill="#6a5a40" font-size="8" text-anchor="middle">3</text>
      <text x="640" y="150" fill="#6a5a40" font-size="8" text-anchor="middle">6</text>
      <text x="615" y="125" fill="#6a5a40" font-size="8" text-anchor="middle">9</text>
    </g>
    <!-- desk -->
    <g>
      <rect x="250" y="280" width="260" height="20" fill="#3a2a1e" stroke="#5a4030"/>
      <rect x="260" y="300" width="30" height="70" fill="#2a1e14"/>
      <rect x="470" y="300" width="30" height="70" fill="#2a1e14"/>
      <rect x="290" y="305" width="180" height="50" fill="#241810" stroke="#4a3830"/>
      <circle cx="460" cy="330" r="5" fill="#c4a574"/>
      <!-- lamp -->
      <rect x="310" y="240" width="8" height="40" fill="#4a4030"/>
      <path d="M290 240 L338 240 L330 220 L298 220 Z" fill="#5a4030"/>
      <ellipse cx="314" cy="255" rx="20" ry="8" fill="#c4a574" opacity="0.15"/>
    </g>
    <!-- door back -->
    <g>
      <rect x="744" y="140" width="48" height="180" fill="#2a1e16" stroke="#6a5040"/>
      <circle cx="755" cy="230" r="4" fill="#c4a574"/>
      <text x="768" y="330" fill="#8a7355" font-size="11" text-anchor="middle" font-family="serif">客厅</text>
    </g>
  `);
}
