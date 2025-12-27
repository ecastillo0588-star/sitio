"use client";

import { useEffect, useMemo, useState } from "react";
import { Plan, defaultPlans } from "../../plans-data";

const STORAGE_KEY = "eghealth-plans";

function loadPlans(): Plan[] {
  if (typeof window === "undefined") return defaultPlans;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPlans;
    const parsed = JSON.parse(raw) as Plan[];
    if (!Array.isArray(parsed)) return defaultPlans;
    return parsed;
  } catch (err) {
    return defaultPlans;
  }
}

export default function PlanEditorPage() {
  const [plans, setPlans] = useState<Plan[]>(defaultPlans);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setPlans(loadPlans());
  }, []);

  const selectedPlan = useMemo(() => plans[selectedIndex] ?? plans[0], [plans, selectedIndex]);

  const updatePlan = (updater: (plan: Plan) => Plan) => {
    setPlans((prev) => {
      const next = [...prev];
      next[selectedIndex] = updater(prev[selectedIndex]);
      return next;
    });
  };

  const persist = (nextPlans: Plan[], msg = "Guardado en localStorage") => {
    setPlans(nextPlans);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPlans, null, 2));
      } catch (err) {
        setMessage("No se pudo guardar en localStorage");
        return;
      }
    }
    setMessage(msg);
    setTimeout(() => setMessage(""), 1800);
  };

  const handleFieldChange = (field: keyof Plan, value: string | boolean) => {
    updatePlan((plan) => ({ ...plan, [field]: value }));
  };

  const handleFeatureChange = (idx: number, value: string) => {
    updatePlan((plan) => {
      const features = [...plan.features];
      features[idx] = value;
      return { ...plan, features };
    });
  };

  const addFeature = () => {
    updatePlan((plan) => ({ ...plan, features: [...plan.features, "Nueva característica"] }));
  };

  const removeFeature = (idx: number) => {
    updatePlan((plan) => {
      const features = plan.features.filter((_, i) => i !== idx);
      return { ...plan, features };
    });
  };

  const copyJson = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(plans, null, 2));
      setMessage("JSON copiado al portapapeles");
      setTimeout(() => setMessage(""), 1800);
    } catch (err) {
      setMessage("No se pudo copiar (permisos del navegador)");
    }
  };

  const resetDefaults = () => {
    persist(defaultPlans, "Restaurado a los valores por defecto");
    setSelectedIndex(0);
  };

  const saveLocal = () => {
    persist(plans, "Guardado en localStorage");
  };

  return (
    <main style={{ maxWidth: 1180, margin: "0 auto", padding: "2rem 1.5rem 3rem" }}>
      <header style={{ marginBottom: "1.4rem" }}>
        <p style={{ fontSize: ".9rem", color: "var(--muted)" }}>
          Editor local de planes (no se publica). Guarda en localStorage y copiá el JSON para pegarlo en
          <strong> src/app/plans-data.ts</strong> cuando quieras subir cambios.
        </p>
      </header>

      <section style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "1.5rem" }}>
        <aside style={{ border: "1px solid var(--line)", borderRadius: 12, padding: "1rem", background: "var(--card)" }}>
          <h3 style={{ marginTop: 0, marginBottom: ".5rem" }}>Planes</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
            {plans.map((plan, idx) => (
              <button
                key={plan.id}
                onClick={() => setSelectedIndex(idx)}
                style={{
                  border: idx === selectedIndex ? "2px solid var(--brand-2)" : "1px solid var(--line)",
                  background: idx === selectedIndex ? "#f6f3ff" : "#fff",
                  borderRadius: 10,
                  padding: ".65rem .8rem",
                  textAlign: "left",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                {plan.name}
              </button>
            ))}
          </div>
          <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: ".5rem" }}>
            <button onClick={saveLocal} style={{ padding: ".65rem .8rem", borderRadius: 10, border: "1px solid var(--line)", cursor: "pointer", fontWeight: 600 }}>
              Guardar en localStorage
            </button>
            <button onClick={copyJson} style={{ padding: ".65rem .8rem", borderRadius: 10, border: "1px solid var(--line)", cursor: "pointer", fontWeight: 600 }}>
              Copiar JSON
            </button>
            <button onClick={resetDefaults} style={{ padding: ".65rem .8rem", borderRadius: 10, border: "1px solid var(--line)", cursor: "pointer", fontWeight: 600, background: "#fdf3f0" }}>
              Restaurar valores por defecto
            </button>
          </div>
          {message && <p style={{ marginTop: ".9rem", color: "var(--ink)", fontSize: ".9rem" }}>{message}</p>}
        </aside>

        {selectedPlan && (
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 340px", gap: "1.2rem", alignItems: "start" }}>
            <div style={{ border: "1px solid var(--line)", borderRadius: 12, padding: "1rem 1rem 1.2rem", background: "#fff" }}>
              <h3 style={{ marginTop: 0 }}>Editar plan</h3>
              <div style={{ display: "grid", gap: ".8rem" }}>
                <label style={{ display: "grid", gap: ".35rem" }}>
                  <span>Nombre</span>
                  <input
                    value={selectedPlan.name}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                    style={{ padding: ".55rem .6rem", borderRadius: 8, border: "1px solid var(--line)" }}
                  />
                </label>
                <label style={{ display: "grid", gap: ".35rem" }}>
                  <span>Precio</span>
                  <input
                    value={selectedPlan.price}
                    onChange={(e) => handleFieldChange("price", e.target.value)}
                    style={{ padding: ".55rem .6rem", borderRadius: 8, border: "1px solid var(--line)" }}
                  />
                </label>
                <label style={{ display: "grid", gap: ".35rem" }}>
                  <span>Badge (opcional)</span>
                  <input
                    value={selectedPlan.badge ?? ""}
                    onChange={(e) => handleFieldChange("badge", e.target.value)}
                    placeholder="Más elegido"
                    style={{ padding: ".55rem .6rem", borderRadius: 8, border: "1px solid var(--line)" }}
                  />
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                  <input
                    type="checkbox"
                    checked={Boolean(selectedPlan.highlight)}
                    onChange={(e) => handleFieldChange("highlight", e.target.checked)}
                  />
                  <span>Destacar tarjeta</span>
                </label>
                <label style={{ display: "grid", gap: ".35rem" }}>
                  <span>Descripción</span>
                  <textarea
                    value={selectedPlan.description}
                    onChange={(e) => handleFieldChange("description", e.target.value)}
                    rows={3}
                    style={{ padding: ".55rem .6rem", borderRadius: 8, border: "1px solid var(--line)", resize: "vertical" }}
                  />
                </label>
                <label style={{ display: "grid", gap: ".35rem" }}>
                  <span>Extras (admite &lt;strong&gt; y &lt;br/&gt;)</span>
                  <textarea
                    value={selectedPlan.extrasHtml}
                    onChange={(e) => handleFieldChange("extrasHtml", e.target.value)}
                    rows={3}
                    style={{ padding: ".55rem .6rem", borderRadius: 8, border: "1px solid var(--line)", resize: "vertical" }}
                  />
                </label>
                <label style={{ display: "grid", gap: ".35rem" }}>
                  <span>Link de WhatsApp</span>
                  <input
                    value={selectedPlan.whatsappUrl}
                    onChange={(e) => handleFieldChange("whatsappUrl", e.target.value)}
                    style={{ padding: ".55rem .6rem", borderRadius: 8, border: "1px solid var(--line)" }}
                  />
                </label>

                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: ".4rem" }}>
                    <span>Características</span>
                    <button onClick={addFeature} style={{ padding: ".35rem .65rem", borderRadius: 6, border: "1px solid var(--line)", cursor: "pointer" }}>
                      + Agregar
                    </button>
                  </div>
                  <div style={{ display: "grid", gap: ".35rem" }}>
                    {selectedPlan.features.map((feat, idx) => (
                      <div key={`${selectedPlan.id}-feat-${idx}`} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: ".4rem", alignItems: "center" }}>
                        <input
                          value={feat}
                          onChange={(e) => handleFeatureChange(idx, e.target.value)}
                          style={{ padding: ".5rem .6rem", borderRadius: 8, border: "1px solid var(--line)" }}
                        />
                        <button
                          onClick={() => removeFeature(idx)}
                          style={{ padding: ".45rem .6rem", borderRadius: 8, border: "1px solid var(--line)", cursor: "pointer", background: "#fff" }}
                        >
                          Borrar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ border: "1px solid var(--line)", borderRadius: 12, padding: "1rem 1rem 1.2rem", background: "var(--bg)" }}>
              <h3 style={{ marginTop: 0, marginBottom: ".6rem" }}>Vista previa</h3>
              <div
                style={{
                  background: "var(--card)",
                  borderRadius: 14,
                  border: selectedPlan.highlight ? "2px solid var(--brand-2)" : "1px solid var(--line)",
                  padding: "1.2rem 1.2rem 1.6rem",
                  boxShadow: selectedPlan.highlight ? "0 12px 32px rgba(0,0,0,.12)" : "0 8px 24px rgba(0,0,0,.04)",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  minHeight: 300,
                }}
              >
                {selectedPlan.badge && (
                  <div style={{ position: "absolute", top: 12, right: 12, fontSize: ".7rem", textTransform: "uppercase", letterSpacing: ".04em", background: "#f4f1ff", borderRadius: 999, padding: ".15rem .5rem", border: "1px solid var(--line)" }}>
                    {selectedPlan.badge}
                  </div>
                )}
                <h4 style={{ margin: 0 }}>{selectedPlan.name}</h4>
                <p style={{ fontWeight: 700, margin: ".4rem 0 .75rem" }}>{selectedPlan.price}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: ".85rem" }}>
                  {selectedPlan.features.map((f, idx) => (
                    <li key={`${selectedPlan.id}-preview-${idx}`}>{f}</li>
                  ))}
                </ul>
                <p style={{ fontSize: ".9rem", color: "var(--muted)", marginTop: "auto" }}>{selectedPlan.description}</p>
                <p style={{ fontSize: ".9rem", color: "var(--muted)" }} dangerouslySetInnerHTML={{ __html: selectedPlan.extrasHtml }} />
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
