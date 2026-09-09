export function vignette(): string {
  return `
    <defs>
      <radialGradient id="vig" cx="50%" cy="45%" r="65%">
        <stop offset="40%" stop-color="transparent"/>
        <stop offset="100%" stop-color="#050302" stop-opacity="0.85"/>
      </radialGradient>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
        <feBlend in="SourceGraphic" mode="multiply"/>
      </filter>
      <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#2a221c"/>
        <stop offset="100%" stop-color="#1a1510"/>
      </linearGradient>
      <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#3d3228"/>
        <stop offset="100%" stop-color="#241c16"/>
      </linearGradient>
      <linearGradient id="fog" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#8a9aaa" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#4a5560" stop-opacity="0.15"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#vig)" style="pointer-events:none"/>
  `;
}

export function roomShell(extra: string): string {
  return `
    <svg class="scene-svg" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="800" height="500" fill="#12100e"/>
      <rect x="60" y="40" width="680" height="300" fill="url(#wall)"/>
      <polygon points="0,500 60,340 740,340 800,500" fill="url(#floor)"/>
      <polygon points="0,0 800,0 740,40 60,40" fill="#0e0c0a"/>
      <polygon points="0,0 60,40 60,340 0,500" fill="#18140f"/>
      <polygon points="800,0 740,40 740,340 800,500" fill="#18140f"/>
      <g stroke="#2a2218" stroke-width="1" opacity="0.5">
        <line x1="100" y1="380" x2="700" y2="380"/>
        <line x1="80" y1="420" x2="720" y2="420"/>
        <line x1="50" y1="460" x2="750" y2="460"/>
      </g>
      ${extra}
      ${vignette()}
    </svg>
  `;
}
