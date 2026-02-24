import Image from "next/image";

const pilares = [
  {
    titulo: "Interoperabilidad SOAP",
    texto: "Conexión con ecosistemas clínicos y administrativos para continuidad asistencial sin fricción.",
  },
  {
    titulo: "Talleres de acompañamiento",
    texto: "Diseño, calendarización y seguimiento de programas terapéuticos grupales en el mismo flujo operativo.",
  },
  {
    titulo: "Gestión multi-centro",
    texto: "Control unificado de sedes, staff y agendas, con trazabilidad por centro y visión consolidada de red.",
  },
  {
    titulo: "Integración con WhatsApp",
    texto: "Comunicación ágil con pacientes y equipos para acelerar confirmaciones y coordinación operativa.",
  },
  {
    titulo: "Recordatorios automáticos",
    texto: "Recordatorios de turnos para reducir ausentismo y mejorar la asistencia diaria por profesional y sede.",
  },
  {
    titulo: "Adaptabilidad mobile",
    texto: "Experiencia optimizada para celulares y tablets, ideal para recepción, dirección y trabajo en movimiento.",
  },
];

const pagos = [
  "Caja diaria por centro y profesional",
  "Conciliación de cobros manuales y digitales",
  "Estados de pago por turno y por taller",
  "Comprobantes, notas y trazabilidad administrativa",
  "Recordatorios y confirmaciones por WhatsApp",
  "Operación completa desde dispositivos móviles",
];

export default function HomePage() {
  return (
    <>
      <header className="siteHeader">
        <div className="siteContainer siteHeaderInner">
          <a href="#inicio" className="brandWrap">
            <Image
              src="/assets/img/logo-eg.png"
              alt="EG Health Solutions"
              width={44}
              height={44}
              className="brandLogo"
            />
            <span className="brandText">
              <strong>EG Health Solutions</strong>
              <small>Plataforma institucional de gestión clínica</small>
            </span>
          </a>

          <nav className="siteNav">
            <a href="#plataforma">Plataforma</a>
            <a href="#pagos">Pagos</a>
            <a href="#capas">Capacidades</a>
            <a href="#contacto">Contacto</a>
            <a href="/precios">Precios</a>
          </nav>

          <a
            href="https://eghealthsolutions.vercel.app/auth/login"
            target="_blank"
            rel="noopener"
            className="headerAction"
          >
            Ir al sistema
          </a>
        </div>
      </header>

      <main>
        <section id="inicio" className="heroModern">
          <div className="heroGlow heroGlowOne" />
          <div className="heroGlow heroGlowTwo" />

          <div className="siteContainer heroGrid">
            <div className="heroCopy">
              
              <h1>
                Gestioná <span>operación clínica</span>,
                <br />
                pagos administrativos y expansión <span>multi-centro</span>
                <br />
                desde un mismo sistema.
              </h1>
              <p className="heroLead">
                EG Health Solutions unifica agenda, trazabilidad operativa y administración para instituciones con una
                o múltiples sedes. Integración SOAP, WhatsApp, recordatorios automáticos de turnos y adaptabilidad
                mobile para sostener continuidad asistencial en toda la red.
              </p>

              <div className="heroActions">
                <a
                  href="https://wa.me/541138492392?text=Quiero%20una%20demo%20institucional%20de%20EG%20Health%20Solutions"
                  target="_blank"
                  rel="noopener"
                  className="btnPrimaryHero"
                >
                  Solicitar demo ejecutiva
                </a>
                <a href="#pagos" className="btnGhostHero">
                  Ver módulo de pagos
                </a>
              </div>

              <div className="heroKpis">
                <article>
                  <strong>360°</strong>
                  <span>Visión integral de la operación</span>
                </article>
                <article>
                  <strong>1 plataforma</strong>
                  <span>Turnos, talleres, pagos y staff</span>
                </article>
                <article>
                  <strong>Multi-centro</strong>
                  <span>Escalable para redes médicas</span>
                </article>
              </div>
            </div>

            <div className="heroVisual">
              <article className="visualCard visualMain">
                <Image
                  src="/assets/img/vistainicio-static.png"
                  alt="Panel operativo de EG Health Solutions"
                  width={900}
                  height={560}
                />
              </article>
              <article className="visualCard visualSecondary">
                <Image
                  src="/assets/img/videoturnos-static.png"
                  alt="Gestión de turnos y estados"
                  width={700}
                  height={420}
                />
              </article>
              <div className="floatingChip chipOne">Interoperabilidad SOAP</div>
              <div className="floatingChip chipTwo">Gestión administrativa de pagos</div>
            </div>
          </div>
        </section>

        <section id="plataforma" className="impactStrip">
          <div className="siteContainer impactGrid">
            <h2>
              EG Health Solutions impulsa una gestión clínica
              <br />
              <span>más segura, trazable y confiable para tu institución.</span>
            </h2>
            <p>
              Mejor servicio para pacientes y equipos: control operativo en tiempo real, trazabilidad por rol y
              procesos administrativos claros para sostener calidad asistencial en cada centro.
            </p>
          </div>
        </section>

        <section id="pagos" className="paymentsSection">
          <div className="siteContainer paymentsGrid">
            <div className="paymentsCopy">
              <p className="sectionTag">GESTIÓN ADMINISTRATIVA DE PAGOS</p>
              <h3>
                Control financiero
                <br />
                <span>clínico en tiempo real</span>
              </h3>
              <p>
                Centralizá cobros, estados de pago y comprobantes desde una consola moderna. El área administrativa
                visualiza situación por turno, profesional, taller y centro sin perder trazabilidad.
              </p>
              <ul>
                {pagos.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="paymentsCards">
              <article>
                <strong>Turnos</strong>
                <p>Seguimiento de copagos, parciales, completos y excedidos con estado visible para recepción.</p>
              </article>
              <article>
                <strong>Talleres</strong>
                <p>Registro por sesión o mensualidad, con cobertura, medio de pago y resumen por inscripción.</p>
              </article>
              <article>
                <strong>Dirección</strong>
                <p>Métricas exportables para análisis de ingresos, productividad y performance operativa por sede.</p>
              </article>
              <article>
                <strong>WhatsApp + Mobile</strong>
                <p>Recordatorios de turnos y confirmaciones en canales cotidianos, con gestión desde cualquier dispositivo.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="capas" className="capabilitiesSection">
          <div className="siteContainer">
            <div className="sectionHead">
              <p className="sectionTag">CAPACIDADES ESTRATÉGICAS</p>
              <h3>Arquitectura moderna para instituciones exigentes</h3>
            </div>

            <div className="capabilitiesGrid">
              {pilares.map((pilar) => (
                <article key={pilar.titulo} className="pillarCard">
                  <div className="pillarDot" />
                  <h4>{pilar.titulo}</h4>
                  <p>{pilar.texto}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contacto" className="ctaBand">
          <div className="siteContainer ctaBandInner">
            <h3>
              Si querés un sistema clínico sólido,
              <br />
              necesitás seguridad, trazabilidad y operación real en cada centro.
            </h3>
            <a
              href="https://wa.me/541138492392?text=Quiero%20avanzar%20con%20la%20propuesta%20moderna%20de%20EG%20Health%20Solutions"
              target="_blank"
              rel="noopener"
            >
              Avanzar con propuesta
            </a>
          </div>
        </section>
      </main>

      <footer className="siteFooter">
        <div className="siteContainer">
          © 2026 EG Health Solutions — Diseño y operación clínica de nueva generación. Buenos Aires - Argentina
        </div>
      </footer>
    </>
  );
}
