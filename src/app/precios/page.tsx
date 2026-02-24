import { defaultPlans } from "../plans-data";

export default function PreciosPage() {
  return (
    <main style={{ maxWidth: 1120, margin: "0 auto", padding: "2.5rem 1.5rem 3rem" }}>
      <header style={{ marginBottom: "1.5rem" }}>
        <p
          style={{
            display: "inline-block",
            background: "#f3f1fb",
            border: "1px solid var(--line)",
            color: "var(--muted)",
            borderRadius: 999,
            padding: ".25rem .7rem",
            fontSize: ".8rem",
            marginBottom: ".85rem",
          }}
        >
          Información comercial
        </p>
        <h1 style={{ fontSize: "2rem", lineHeight: 1.2, marginBottom: ".6rem" }}>Precios de EG Health Solutions</h1>
        <p style={{ color: "var(--muted)", maxWidth: 760 }}>
          Esta sección concentra únicamente la información de planes y condiciones. El sitio principal mantiene foco
          institucional y operativo.
        </p>
      </header>

      <section style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))" }}>
        {defaultPlans.map((plan) => {
          const highlight = Boolean(plan.highlight);
          return (
            <article
              key={plan.id}
              style={{
                background: "var(--card)",
                borderRadius: 14,
                border: highlight ? "2px solid var(--brand-2)" : "1px solid var(--line)",
                padding: "1.2rem 1.2rem 1.1rem",
                boxShadow: highlight ? "0 12px 32px rgba(0,0,0,.12)" : "0 8px 24px rgba(0,0,0,.04)",
                display: "flex",
                flexDirection: "column",
                gap: ".5rem",
              }}
            >
              <h2 style={{ fontSize: "1.1rem" }}>{plan.name}</h2>
              <p style={{ fontWeight: 700 }}>{plan.price}</p>
              {plan.pricePerProText && <p style={{ color: "var(--muted)", fontSize: ".92rem" }}>{plan.pricePerProText}</p>}
              <ul style={{ paddingLeft: "1rem", color: "var(--muted)", display: "grid", gap: ".3rem" }}>
                {plan.features.map((feature, index) => (
                  <li key={`${plan.id}-${index}`}>{feature}</li>
                ))}
              </ul>
              <p style={{ color: "var(--muted)", fontSize: ".9rem" }}>{plan.description}</p>
            </article>
          );
        })}
      </section>
    </main>
  );
}
