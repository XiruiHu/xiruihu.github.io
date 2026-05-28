// Frame.jsx — decorative Chinese-style border ornaments
Object.assign(window, { FretCorner, PlumBlossom, FretLine, DiamondCorner });

function FretCorner({ size = 56, color = "#b62824", rotate = 0, strokeWidth = 2 }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 56 56"
      fill="none" stroke={color} strokeWidth={strokeWidth}
      style={{ transform: `rotate(${rotate}deg)`, display: "block" }}
      aria-hidden="true"
    >
      <path d="M 0 0 L 56 0 M 0 0 L 0 56" />
      <path d="M 56 10 L 10 10 L 10 56" />
      <rect x="18" y="18" width="14" height="14" />
      <rect x="22" y="22" width="6" height="6" fill={color} stroke="none" />
      <path d="M 28 0 L 28 6 M 0 28 L 6 28" />
    </svg>
  );
}

function PlumBlossom({ size = 28, color = "#b62824", centerColor }) {
  const cc = centerColor || color;
  const r = 11, pr = 5.5;
  const petals = [0,1,2,3,4].map(i => {
    const a = (i * 72 - 90) * Math.PI / 180;
    return { cx: Math.cos(a) * r, cy: Math.sin(a) * r };
  });
  return (
    <svg width={size} height={size} viewBox="-16 -16 32 32" style={{ display: "block" }} aria-hidden="true">
      {petals.map((p, i) => <circle key={i} cx={p.cx} cy={p.cy} r={pr} fill={color} />)}
      <circle cx="0" cy="0" r="2.4" fill={cc === color ? "#F2E6D6" : cc} />
    </svg>
  );
}

function DiamondCorner({ size = 14, color = "#b62824" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" style={{ display: "block" }} aria-hidden="true">
      <polygon points="7,1 13,7 7,13 1,7" fill={color} />
    </svg>
  );
}

function FretLine({ color = "#b62824", height = 14, opacity = 1 }) {
  return (
    <svg width="100%" height={height} viewBox="0 0 32 14" preserveAspectRatio="xMidYMid meet"
      style={{ display: "block", opacity }} aria-hidden="true">
      <g>
        <rect x="0"  y="6" width="2" height="2" fill={color} />
        <rect x="4"  y="6" width="2" height="2" fill={color} />
        <rect x="8"  y="2" width="2" height="6" fill={color} />
        <rect x="10" y="2" width="6" height="2" fill={color} />
        <rect x="20" y="6" width="2" height="2" fill={color} />
        <rect x="24" y="6" width="2" height="2" fill={color} />
        <rect x="28" y="2" width="2" height="6" fill={color} />
      </g>
    </svg>
  );
}
