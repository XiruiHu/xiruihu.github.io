// Hero.jsx — responsive canvas, all positions from 2388×1668 reference spec
Object.assign(window, { Hero });

const A = "./brand_assests/AaGuDianKeBenSongYouMoBan/Assets/";

function Hero({ onEnter }) {
  const sectionRef = React.useRef(null);

  React.useEffect(() => {}, []);

  return (
    <section ref={sectionRef} style={S.hero}>
      <style>{`
        @keyframes bounce-down {
          0%, 100% { transform: translateY(0);   opacity: 1;   }
          50%       { transform: translateY(7px); opacity: 0.5; }
        }
        .hero-arrow { animation: bounce-down 1.5s ease-in-out infinite; }
      `}</style>
      <div style={S.inner}>

        <div style={S.subtitle}>UX/UI, VISUAL DESIGNER</div>

      {/* Centre */}
      <img src={A + "XIRUI%20HU@2x.png"}               alt="XIRUI HU" style={S.xiruiHu}     />
      <img src={A + "Middle%20Profile%20Photo@2x.png"}  alt="Xirui Hu" style={S.profilePhoto} />
      <img src={A + "Chinese%20Name@2x.png"}            alt="胡希瑞"   style={S.chineseName}  />

      {/* Left side */}
      <img src={A + "Four%20Vertical%20Chinese%20Characters@2x.png"} alt="" style={S.payFirst}  data-parallax="shrink" />
      <img src={A + "No%20Smoking%20Sign@2x.png"}                    alt="" style={S.noSmoking} data-parallax="shrink" />
      <img src={A + "Left%20Side%20Table%20and%20Chairs@2x.png"}     alt="" style={S.tableL}    data-parallax="shrink" />

      {/* Right side */}
      <img src={A + "Portfolio%20Sticker@2x.png"}                 alt="" style={S.sticker} data-parallax="shrink" />
      <img src={A + "Right%20side%20Table%20and%20Chairs@2x.png"} alt="" style={S.tableR}  data-parallax="shrink" />

      {/* Scroll indicator */}
      <div style={S.orderLabel}>
        <span style={S.orderText}>Order</span>
        <span className="hero-arrow" style={S.orderArrow}>
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
            <line x1="7" y1="0" x2="7" y2="15" stroke="#b62824" strokeWidth="1.5" strokeLinecap="round"/>
            <polyline points="2,10 7,16 12,10" fill="none" stroke="#b62824" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>

      {/* Bottom */}
      <img src={A + "MiddleLowerTable%402x.png"} alt="" style={S.tableBottom} data-parallax="grow" />
</div>
    </section>
  );
}

/* All left/top/width/height are % of the 2388×1668 reference canvas */
const img = (left, top, width, extra = {}) => ({
  position: "absolute",
  left: `${left}%`,
  top: `${top}%`,
  width: `${width}%`,
  height: "auto",        // ← let the image scale naturally
  objectFit: "contain",
  objectPosition: "top left",
  pointerEvents: "none",
  display: "block",
  ...extra,
});

const S = {
  hero: {
  position: "relative",
  width: "100%",
  paddingBottom: "69.85%",  // (1668 ÷ 2388) × 100 = 69.85%
  marginTop: 104,
  background: "transparent",
  overflow: "visible",
},
  cornerL:      img(4.61,   2.37,  8.08),
  cornerR:      img(87.48,  7.68,  8.04),
  xiruiHu:      img(39.07,  7.39, 21.48, { zIndex: 3 }),
  profilePhoto: img(40.87, 15.78, 18.26, { zIndex: 2 }),
  chineseName:  img(41.79, 42.46, 16.46),
  payFirst:     img(20.84, 11.44,  2.74),
  noSmoking:    img(10.83, 16.24,  2.31),
  tableL:       img( 5.35, 24.00, 21.70),
  sticker:      img(84.80, 15.00,  7.94),
  tableR:       img(72.23, 21.87, 19.75),
  tableBottom:  img(35.00, 77.06, 30.00, { height: "42.68%" }),

  orderLabel: {
    position: "absolute",
    left: "50%",
    top: "54%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    pointerEvents: "none",
  },
  orderText: {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 600,
    fontSize: "clamp(9px, 0.85vw, 14px)",
    letterSpacing: "0.38em",
    textTransform: "uppercase",
    color: "#b62824",
  },
  orderArrow: {
    display: "block",
    lineHeight: 1,
  },
inner: {                  // ← add this
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  subtitle: {
    position: "absolute",
    left: "36.90%",
    top: "3.63%",
    width: "26.12%",
    height: "1.84%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 600,
    fontSize: "clamp(8px, 0.9vw, 16px)",
    letterSpacing: "0.36em",
    textTransform: "uppercase",
    color: "#b62824",
    whiteSpace: "nowrap",
    pointerEvents: "none",
  },
};
