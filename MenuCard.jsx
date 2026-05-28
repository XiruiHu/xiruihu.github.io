// MenuCard.jsx — project listings styled as a restaurant menu card
Object.assign(window, { MenuCard });

function MenuSVGFrame({ color }) {
  const W = 210, H = 100, r = 4, ix = 1.5;
  const inner = `M${ix+r} ${ix} L${W-ix-r} ${ix} A${r} ${r} 0 0 0 ${W-ix} ${ix+r} L${W-ix} ${H-ix-r} A${r} ${r} 0 0 0 ${W-ix-r} ${H-ix} L${ix+r} ${H-ix} A${r} ${r} 0 0 0 ${ix} ${H-ix-r} L${ix} ${ix+r} A${r} ${r} 0 0 0 ${ix+r} ${ix}Z`;
  return (
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",overflow:"visible",pointerEvents:"none"}} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <rect x="0" y="0" width={W} height={H} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" />
      <path d={inner} fill="none" stroke={color} strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

const SPECIAL = {
  id: 2,
  eyebrow: "MOBILE APP",
  title: "Where Food Travels",
  blurb: "Discover the origin stories of dishes around the world.",
  cover: "./brand_assests/Home_Page04.png",
};

const SIDE_PROJECTS = [
  {
    id: 1,
    eyebrow: "MOBILE APP",
    title: "Blink Box Tracking App",
    blurb: "Track, trade and show your blind box collection effortlessly.",
    cover: "./brand_assests/Boxdex Cover Image.png",
  },
  {
    id: 3,
    eyebrow: "WEB REDESIGN",
    title: "Monetization Transparency Research",
    blurb: "Untangling how monetization choices shape user trust.",
    cover: "./brand_assests/Home_Page01.png",
  },
];

function OrderButton() {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const btnBg     = pressed ? "#E0D2C0" : "#FAEFE0";
  const btnShadow = pressed ? "0 1px 0 rgba(0,0,0,0.18)" : hovered ? "0 6px 0 rgba(0,0,0,0.18)" : "0 4px 0 rgba(0,0,0,0.18)";
  const btnTx     = pressed ? "translateY(2px)" : hovered ? "translateY(-2px)" : "none";
  return (
    <button
      style={{ ...menuStyles.orderBtn, background: btnBg, boxShadow: btnShadow, transform: btnTx }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      Order
    </button>
  );
}

function SpecialProject({ project }) {
  return (
    <div style={menuStyles.specialCol}>
      <div style={menuStyles.todaysSpecialLabel}>TODAY'S SPECIAL</div>
      <img src={project.cover} alt={project.title} style={menuStyles.specialCover} />
      <div style={menuStyles.project}>
        <div style={menuStyles.projectBody}>
          <span style={menuStyles.eyebrow}>{project.eyebrow}</span>
          <h3 style={menuStyles.projTitle}>{project.title}</h3>
          <p style={menuStyles.blurb}>{project.blurb}</p>
        </div>
        <div style={menuStyles.actionRow}>
          <span style={menuStyles.price}>Free</span>
          <OrderButton />
        </div>
      </div>
    </div>
  );
}

function SideProject({ project }) {
  return (
    <div style={menuStyles.sideCard}>
      <img src={project.cover} alt={project.title} style={menuStyles.sideCover} />
      <div style={menuStyles.sideBody}>
        <span style={menuStyles.eyebrow}>{project.eyebrow}</span>
        <h3 style={{ ...menuStyles.projTitle, fontSize: 28 }}>{project.title}</h3>
        <p style={menuStyles.blurb}>{project.blurb}</p>
        <div style={menuStyles.actionRow}>
          <span style={menuStyles.price}>Free</span>
          <OrderButton />
        </div>
      </div>
    </div>
  );
}

function MenuCard() {
  return (
    <section style={menuStyles.section}>
      <div style={menuStyles.card}>
        <MenuSVGFrame color="#FAEFE0" />

        <div style={{ width: "100%", textAlign: "center", marginBottom: 40 }}>
          <div style={menuStyles.subtitle}>SELECT WORKS · UX / UI</div>
          <h2 style={{ fontFamily: "'Angela', serif", fontWeight: 400, fontSize: 72, lineHeight: 0.9, letterSpacing: "0.01em", color: "#FAEFE0", margin: "24px 0 8px" }}>MENU</h2>
        </div>

        <div style={menuStyles.layout}>
          <SpecialProject project={SPECIAL} />

          <div style={menuStyles.dividerV} />

          <div style={menuStyles.sideCol}>
            {SIDE_PROJECTS.map((p) => (
              <SideProject key={p.id} project={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const menuStyles = {
  section: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    padding: "120px 40px 80px",
  },
  card: {
    background: "#b62824",
    width: "100%",
    maxWidth: 1200,
    padding: "64px 80px 80px",
    position: "relative",
  },
  subtitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 600,
    fontSize: 13,
    letterSpacing: "0.32em",
    paddingLeft: "0.32em",
    color: "#FAEFE0",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 1px 1fr",
    gap: "0 48px",
    alignItems: "start",
  },
  dividerV: {
    width: 1,
    alignSelf: "stretch",
    background: "rgba(242,230,214,0.30)",
  },
  specialCol: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  todaysSpecialLabel: {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 600,
    fontSize: 11,
    letterSpacing: "0.36em",
    paddingLeft: "0.36em",
    color: "rgba(242,230,214,0.60)",
    textTransform: "uppercase",
    borderTop: "1px solid rgba(242,230,214,0.30)",
    paddingTop: 10,
  },
  specialCover: {
    width: "100%",
    aspectRatio: "1 / 1",
    objectFit: "cover",
    display: "block",
  },
  project: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  sideCol: {
    display: "flex",
    flexDirection: "column",
    gap: 32,
  },
  sideCard: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  sideCover: {
    width: "100%",
    aspectRatio: "16 / 9",
    objectFit: "cover",
    display: "block",
  },
  sideBody: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  projectBody: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    flex: 1,
  },
  eyebrow: {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 600,
    fontSize: 12,
    textTransform: "uppercase",
    color: "#FAEFE0",
    letterSpacing: "0.28em",
  },
  projTitle: {
    fontFamily: "'AlternateGothic', sans-serif",
    fontWeight: 400,
    fontSize: 35,
    color: "#FAEFE0",
    lineHeight: 1.1,
    margin: 0,
  },
  blurb: {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 700,
    fontSize: 17,
    lineHeight: 1.45,
    color: "#FAEFE0",
  },
  actionRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 12,
  },
  price: {
    fontFamily: "'Angela', serif",
    fontWeight: 400,
    fontStyle: "italic",
    fontSize: 22,
    color: "#FAEFE0",
  },
  orderBtn: {
    color: "#b62824",
    border: "none",
    borderRadius: 999,
    padding: "8px 24px",
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 600,
    fontSize: 15,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "transform 0.1s ease, box-shadow 0.1s ease, background 0.1s ease",
  },
};
