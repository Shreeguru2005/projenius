export default function FooterTopSection() {

  return (
    /* Outer wrapper — overflow visible so man escapes the section clip */
    <div style={{ position: "relative", overflow: "visible", marginTop: 80 }}>

      {/* ── MAN IMAGE — outside section so overflow:hidden won't clip him ── */}
      <img
        src="/images/about-main-image.png"
        alt="Team reviewing a project together"
        style={{
          position: "absolute",
          bottom: 42,
          left: "17%",
          transform: "translateX(-50%)",
          width: "min(500px, 42vw)",
          height: 350,
          objectFit: "cover",
          objectPosition: "center",
          borderRadius: 38,
          border: "14px solid rgba(255,255,255,0.92)",
          zIndex: 10,
          pointerEvents: "none",
          boxShadow: "0 28px 80px rgba(15,23,42,0.18)",
        }}
      />

      {/* ── STAT CARDS ── */}

      {/* Audience card */}
      <div style={{
        position: "absolute", bottom: 40, left: "2%", width: 168,
        background: "#fff", borderRadius: 14, padding: "12px 16px",
        zIndex: 11, boxShadow: "0 8px 32px rgba(0,0,0,0.4)"
      }}>
        <div style={{ fontSize: 10, color: "#888", marginBottom: 4 }}>New Audience Members</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#111" }}>1.2k ↗</div>
        <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
          {["#f87171","#60a5fa","#fbbf24"].map((c, i) => (
            <div key={i} style={{
              width: 22, height: 22, borderRadius: "50%",
              background: c, border: "2px solid #fff"
            }} />
          ))}
        </div>
        <svg viewBox="0 0 130 30" style={{ width: "100%", height: 30, marginTop: 6 }}>
          <polyline
            points="0,25 20,20 35,22 50,15 65,18 80,10 100,12 130,5"
            fill="none" stroke="#f97316" strokeWidth="2" strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Business Goal card */}
      <div style={{
        position: "absolute", bottom: 40, left: "14%", width: 155,
        background: "#fff", borderRadius: 14, padding: "12px 16px",
        zIndex: 11, boxShadow: "0 8px 32px rgba(0,0,0,0.4)"
      }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: "#111" }}>98%</div>
        <div style={{ fontSize: 11, color: "#666", marginBottom: 8 }}>Business Goal</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 44 }}>
          {[65, 50, 100, 55, 40, 28].map((h, i) => (
            <div key={i} style={{
              flex: 1, height: `${h}%`,
              borderRadius: "3px 3px 0 0",
              background: i === 2 ? "#3b82f6" : i < 2 ? "#93c5fd" : "#bfdbfe"
            }} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          {["Jan","Feb","Mar","Apl","May"].map(m => (
            <span key={m} style={{ fontSize: 8, color: "#999" }}>{m}</span>
          ))}
        </div>
      </div>

      {/* ── MAIN SECTION ── */}
      <section style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        minHeight: 500,
        overflow: "hidden",
        padding: "0 5%",
        background: "linear-gradient(135deg, #f5fbff 0%, #eef8fd 48%, #ffffff 100%)",
      }}>

        {/* White / blue design surface */}
        <div style={{
          position: "absolute", right: "-2%", top: "50%",
          transform: "translateY(-50%)",
          width: "58%", height: "110%",
          background: "linear-gradient(135deg, #dff5fb 0%, #eff8ff 52%, #e4f3fb 100%)",
          borderRadius: "52% 48% 40% 60% / 55% 45% 55% 45%",
          border: "1px solid rgba(102,199,221,0.16)",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.45)",
          zIndex: 1
        }} />

        <div style={{
          position: "absolute",
          inset: "32px 3% 28px 3%",
          borderRadius: 42,
          background:
            "linear-gradient(rgba(13,20,36,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(13,20,36,0.05) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
          maskImage: "radial-gradient(circle at 62% 42%, #000 0%, transparent 70%)",
          zIndex: 0,
          pointerEvents: "none",
        }} />

        {/* Left spacer */}
        <div style={{ width: "48%", zIndex: 2 }} />

        {/* RIGHT — form */}
        <div style={{
          position: "relative", zIndex: 3,
          width: "46%", padding: "48px 0 48px 81px",
          color: "#111827",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, marginBottom: 16 }}>
            <span style={{
              width: 8, height: 8, background: "#25bfe6",
              borderRadius: "50%", display: "inline-block"
            }} />
            Contact us
          </div>

          <h2 style={{
            fontSize: 38, fontWeight: 800, lineHeight: 1.2,
            marginBottom: 16, color: "#0f172a"
          }}>
            We will provide<br />awesome services
          </h2>

          <p style={{
            fontSize: 13, color: "#475569",
            marginBottom: 30, lineHeight: 1.65, maxWidth: 360
          }}>
            We understand the importance of approaching each work
            integrally and believe in the power of simple.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            <input placeholder="NAME"  style={inputStyle} />
            <input placeholder="PHONE" style={inputStyle} />
            <input placeholder="SUBJECT" style={{ ...inputStyle, width: "100%", flex: "none" }} />

            {/* ── PREMIUM ANIMATED CTA BUTTON ── */}
            <button
              className="btn"
              style={{ width: "100%", padding: "16px 32px" }}
              aria-label="Start Consult"
            >
              Let's Get Started ↗
            </button>
          </div>
        </div>

      </section>
    </div>
  );
}

const inputStyle = {
  flex: 1,
  minWidth: 130,
  padding: "14px 22px",
  borderRadius: 40,
  border: "none",
  background: "rgba(255,255,255,0.90)",
  color: "#111",
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: "0.07em",
  outline: "none",
};
