// Footer.jsx — fixed footer, cream serif type on ink
Object.assign(window, { Footer });

function Footer({ visible }) {
  return (
    <footer
      style={{
        ...footerStyles.footer,
        transform: visible ? "translateY(0)" : "translateY(100%)",
      }}
    >
      <span style={footerStyles.left}>Vancouver · Canada</span>
      {/* <span style={footerStyles.center}>Let&apos;s build together</span> */}
      <span style={footerStyles.right}><span style={{ fontSize: 22 }}>© 2026</span> Xirui Hu</span>
    </footer>
  );
}

const footerStyles = {
  footer: {
    position: "fixed",
    bottom: 0, left: 0, right: 0,
    zIndex: 10,
    background: "#8a1e1b",
    color: "#F2E6D6",
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 500,
    fontSize: 14,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    padding: "18px 64px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid rgba(168,54,45,0.55)",
    transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
  },
  left: {
    color: "#F2E6D6",
  },
  center: {
    color: "#b62824",
    fontFamily: "'Angela', serif",
    fontWeight: 400,
    fontSize: 16,
    letterSpacing: "0.32em",
    textTransform: "uppercase",
    textAlign: "center",
  },
  right: {
    color: "#F2E6D6",
  },
};
