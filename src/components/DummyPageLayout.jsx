const sectionStyle = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "14px",
  padding: "18px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
};

export default function DummyPageLayout({ title, subtitle, points }) {
  return (
    <main
      style={{
        minHeight: "70vh",
        background:
          "linear-gradient(135deg, #f8fbff 0%, #f5f8f4 55%, #fffaf4 100%)",
        padding: "40px 16px",
      }}
    >
      <div style={{ maxWidth: "980px", margin: "0 auto" }}>
        <div
          style={{
            ...sectionStyle,
            borderLeft: "6px solid #0f766e",
            marginBottom: "18px",
          }}
        >
          <h1
            style={{
              margin: "0 0 8px",
              fontSize: "32px",
              fontWeight: 800,
              color: "#0f172a",
              lineHeight: 1.2,
            }}
          >
            {title}
          </h1>
          <p style={{ margin: 0, color: "#475569", fontSize: "16px" }}>
            {subtitle}
          </p>
        </div>

        <section style={sectionStyle}>
          <h2 style={{ margin: "0 0 12px", fontSize: "20px", color: "#1e293b" }}>
            Temporary Content
          </h2>
          <ul style={{ margin: 0, paddingLeft: "18px", color: "#334155" }}>
            {points.map((point) => (
              <li key={point} style={{ marginBottom: "8px", lineHeight: 1.5 }}>
                {point}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
