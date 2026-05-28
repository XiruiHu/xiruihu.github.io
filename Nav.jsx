// Nav.jsx — all GSAP managed at Nav level so every strand (fill + separators) behaves identically

function VStrand() {
  return (
    <div className="nav-strand" style={{ flexShrink: 0, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      {/* thread running through the center */}
      <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", transform: "translateX(-50%)", width: 1, background: "#3a1a18", zIndex: 0 }} />
      {[0,1,2,3,4,5].map(function(i) {
        return <div key={i} style={{ position: "relative", zIndex: 1, width: 8, height: 8, borderRadius: "50%", background: "#b62824" }} />;
      })}
    </div>
  );
}

function DoubleStrand() {
  return (
    <div style={{ display: "flex", gap: 3, flexShrink: 0 }}>
      <VStrand />
      <VStrand />
    </div>
  );
}

function VStrandFill() {
  return (
    <div data-fill="true" style={{ flex: 1, minWidth: 0, overflow: "hidden", alignSelf: "stretch", display: "flex", alignItems: "center", gap: 9 }}>
      {Array.from({ length: 80 }).map(function(_, i) {
        return <VStrand key={i} />;
      })}
    </div>
  );
}

function Nav({ onSection }) {
  var navRef = React.useRef(null);
  var links = ["Work", "About", "Resume", "Email Me"];

  React.useEffect(function() {
    var nav = navRef.current;
    if (!nav) return;

    var strands = Array.from(nav.querySelectorAll(".nav-strand"));

    // Capture natural center X positions before any GSAP transforms
    var naturalCenters = strands.map(function(strand) {
      var rect = strand.getBoundingClientRect();
      return rect.left + rect.width / 2;
    });

    // Right edge of the fill container — strands near it get reduced attraction
    var fillEl = nav.querySelector("[data-fill]");
    var fillRight = fillEl ? fillEl.getBoundingClientRect().right : Infinity;

    // Start idle animations on every strand immediately (delay 0–1s so all are moving quickly)
    var tweens = strands.map(function(strand) {
      return gsap.to(strand, {
        x: gsap.utils.random(-8, 8),
        rotation: gsap.utils.random(-3, 3),
        duration: gsap.utils.random(2.5, 5.0),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: gsap.utils.random(0, 1.0),
        transformOrigin: "top center",
      });
    });

    var attractedSet = new Set();

    function startIdle(i) {
      tweens[i] = gsap.to(strands[i], {
        x: gsap.utils.random(-8, 8),
        rotation: gsap.utils.random(-3, 3),
        duration: gsap.utils.random(2.5, 5.0),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "top center",
      });
    }

    function release(i) {
      gsap.to(strands[i], {
        x: 0, rotation: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)",
        overwrite: true,
        onComplete: function() { startIdle(i); },
      });
    }

    function onMouseMove(e) {
      var cursorX = e.clientX;
      var RADIUS = 80;

      var dists = naturalCenters.map(function(cx, i) {
        return { i: i, dist: Math.abs(cursorX - cx) };
      });
      dists.sort(function(a, b) { return a.dist - b.dist; });

      var newSet = new Set();
      for (var k = 0; k < 3 && k < dists.length; k++) {
        if (dists[k].dist < RADIUS) newSet.add(dists[k].i);
      }

      attractedSet.forEach(function(i) {
        if (!newSet.has(i)) release(i);
      });

      newSet.forEach(function(i) {
        var distFromEdge = fillRight - naturalCenters[i];
        var factor = Math.max(0.08, Math.min(1, distFromEdge / 60));
        gsap.to(strands[i], {
          x: (cursorX - naturalCenters[i]) * factor,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out",
          overwrite: true,
        });
      });

      attractedSet = newSet;
    }

    function onMouseLeave() {
      attractedSet.forEach(release);
      attractedSet = new Set();
    }

    nav.addEventListener("mousemove", onMouseMove);
    nav.addEventListener("mouseleave", onMouseLeave);

    return function() {
      nav.removeEventListener("mousemove", onMouseMove);
      nav.removeEventListener("mouseleave", onMouseLeave);
      tweens.forEach(function(t) { t.kill(); });
    };
  }, []);

  // Hide on scroll down, reveal with blur on scroll up
  React.useEffect(function() {
    var nav = navRef.current;
    var blurEl = nav && nav.querySelector(".nav-blur-bg");
    if (!nav || !blurEl) return;

    var lastY = window.scrollY;

    function onScroll() {
      var y = window.scrollY;

      if (y <= 5) {
        gsap.to(nav,    { y: 0,   duration: 0.35, ease: "power2.out", overwrite: "auto" });
        gsap.to(blurEl, { opacity: 0, duration: 0.35, overwrite: "auto" });
      } else if (y > lastY) {
        gsap.to(nav,    { y: -65, duration: 0.28, ease: "power2.in",  overwrite: "auto" });
      } else if (y < lastY) {
        gsap.to(nav,    { y: 0,   duration: 0.38, ease: "power2.out", overwrite: "auto" });
        gsap.to(blurEl, { opacity: 1, duration: 0.38, overwrite: "auto" });
      }

      lastY = y;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return function() { window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <nav ref={navRef} style={NavS.nav}>
      <div className="nav-blur-bg" style={NavS.blurBg} />
      <img
        src="./brand_assests/AaGuDianKeBenSongYouMoBan/NewNewNewLogo.png"
        alt="Xirui Hu"
        style={NavS.logo}
      />
      <DoubleStrand />
      <VStrandFill />
      <div style={NavS.linkRow}>
        {links.map(function(link, i) {
          return (
            <React.Fragment key={link}>
              {i !== 0 && <DoubleStrand />}
              <a
                href="#"
                style={NavS.link}
                onClick={function(e) { e.preventDefault(); onSection && onSection(link); }}
              >
                {link}
              </a>
            </React.Fragment>
          );
        })}
        <DoubleStrand />
      </div>
    </nav>
  );
}

Object.assign(window, { Nav });

var NavS = {
  blurBg: {
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: "160%",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    background: "transparent",
    WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
    maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
    zIndex: 0,
    pointerEvents: "none",
    opacity: 0,
  },
  nav: {
    position: "fixed",
    top: 0, left: 0, right: 0,
    zIndex: 20,
    display: "flex",
    alignItems: "center",
    padding: "0 16px",
    height: 60,
    background: "transparent",
    gap: 0,
  },
  logo: {
    height: 34,
    width: "auto",
    flexShrink: 0,
    marginRight: 10,
  },
  linkRow: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
    position: "relative",
    zIndex: 2,
  },
  link: {
    fontFamily: "'Angela', 'Cormorant Garamond', serif",
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "#b62824",
    textDecoration: "none",
    cursor: "pointer",
    whiteSpace: "nowrap",
    padding: "0 12px",
    display: "inline-block",
    background: "transparent",
  },
};
