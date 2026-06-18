export default function FooterTopSection() {
  return (
    <section
      style={{
        width: "85%",
        maxWidth: "1200px",
        margin: "60px auto",
        padding: "50px 40px",
        borderRadius: "40px",
        background:
          "linear-gradient(135deg, #076da0ff 0%, #076da0ff 50%, #076da0ff 100%)",
        textAlign: "center",
        boxShadow: "0 25px 60px rgba(79,70,229,.15)",
      }}
    >
      <h2
        style={{
          color: "#fff",
          fontSize: "40px",
          fontWeight: 800,
          lineHeight: "1.2",
          marginBottom: "12px",
        }}
      >
        Let's Finalize Your Quote & Start Building
      </h2>

      <p
        style={{
          color: "rgba(255,255,255,0.9)",
          fontSize: "17px",
          maxWidth: "700px",
          margin: "0 auto 15px",
          lineHeight: "1.6",
        }}
      >
        You're almost there. Share your final requirements, confirm your
        quote, and let our team turn your vision into a powerful digital
        experience.
      </p>

      <div
        style={{
          color: "rgba(255,255,255,0.7)",
          fontSize: "14px",
          marginBottom: "25px",
        }}
      >
        Transparent pricing • Clear communication • Dedicated support
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() =>
            window.open("https://wa.me/918925450473", "_blank")
          }
          style={{
            background: "#FFD21F",
            color: "#111",
            border: "none",
            padding: "14px 30px",
            borderRadius: "999px",
            fontSize: "16px",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 8px 20px rgba(255,210,31,.25)",
            transition: "0.3s ease",
          }}
        >
          Confirm Your Quote →
        </button>

        <button
          onClick={() =>
            (window.location.href = "tel:+918925450473")
          }
          style={{
            background: "transparent",
            color: "#fff",
            border: "1px solid rgba(255,255,255,.35)",
            padding: "14px 30px",
            borderRadius: "999px",
            fontSize: "16px",
            fontWeight: 700,
            cursor: "pointer",
            transition: "0.3s ease",
          }}
        >
          📞 Talk to Our Team
        </button>
      </div>
    </section>
  );
}