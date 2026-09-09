import type { GameState } from './types';
import { vignette } from './sceneShared';

export function atticSvg(_state: GameState): string {
  return `
    <svg class="scene-svg" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="800" height="500" fill="#0e0c0a"/>
      <!-- slanted roof -->
      <polygon points="0,200 400,20 800,200 800,500 0,500" fill="#1a1510"/>
      <polygon points="40,200 400,50 760,200" fill="#221c16" stroke="#3a3028"/>
      <!-- beams -->
      <line x1="150" y1="140" x2="150" y2="400" stroke="#3a3028" stroke-width="8"/>
      <line x1="650" y1="140" x2="650" y2="400" stroke="#3a3028" stroke-width="8"/>
      <line x1="100" y1="200" x2="700" y2="200" stroke="#2a2418" stroke-width="6"/>
      <!-- floor -->
      <rect x="80" y="380" width="640" height="120" fill="#241c16"/>
      <g stroke="#2a2218" stroke-width="1" opacity="0.5">
        <line x1="100" y1="420" x2="700" y2="420"/>
        <line x1="100" y1="460" x2="700" y2="460"/>
      </g>
      <!-- chest -->
      <g>
        <rect x="140" y="310" width="140" height="80" rx="4" fill="#3a2a1e" stroke="#6a5040"/>
        <rect x="140" y="300" width="140" height="20" fill="#4a3428" stroke="#6a5040"/>
        <circle cx="210" cy="345" r="6" fill="#c4a574"/>
      </g>
      <!-- mirror -->
      <g>
        <rect x="450" y="140" width="100" height="140" rx="4" fill="#2a2824" stroke="#8a7355" stroke-width="3"/>
        <rect x="460" y="150" width="80" height="120" fill="#1a2830"/>
        <ellipse cx="500" cy="200" rx="25" ry="40" fill="#2a3840" opacity="0.6"/>
        <rect x="470" y="180" width="60" height="50" fill="url(#fog)" opacity="0.5"/>
      </g>
      <!-- exit door glowing -->
      <g>
        <rect x="320" y="200" width="120" height="180" fill="#1a2218" stroke="#8fbc6a" stroke-width="2"/>
        <rect x="335" y="220" width="90" height="140" fill="#0e1810"/>
        <ellipse cx="380" cy="290" rx="30" ry="50" fill="#4a6a50" opacity="0.25">
          <animate attributeName="opacity" values="0.15;0.35;0.15" dur="3s" repeatCount="indefinite"/>
        </ellipse>
        <circle cx="415" cy="290" r="5" fill="#8fbc6a"/>
        <text x="380" y="400" fill="#8fbc6a" font-size="12" text-anchor="middle" font-family="serif">雾中木门</text>
      </g>
      <!-- trapdoor -->
      <rect x="640" y="400" width="80" height="50" fill="#2a1e14" stroke="#5a4030"/>
      <text x="680" y="430" fill="#8a7355" font-size="10" text-anchor="middle" font-family="serif">↓ 客厅</text>
      <!-- floating dust / fog -->
      <ellipse cx="400" cy="160" rx="200" ry="40" fill="#6a7a88" opacity="0.08"/>
      ${vignette()}
    </svg>
  `;
}
