"use client";
import { useEffect } from "react";
import Image from "next/image";

export default function Home() {
  useEffect(() => {
    // small entrance animation for hero content
    const t = setTimeout(() => {
      document.querySelector('.hero')?.classList.add('is-loaded');
    }, 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    // Preload demo GIFs in the background so they start instantly on hover.
    // Strategy: use IntersectionObserver to only preload gifs when their img enters viewport,
    // create a new Image() to fetch the gif into the browser cache without showing/playing it.
    const imgs = Array.from(document.querySelectorAll<HTMLImageElement>('.demo-gif-img'));
    if (!imgs.length) return;

    const preloadGif = (img: HTMLImageElement) => {
      const gif = img.dataset.gif;
      if (!gif || img.dataset.preloaded === '1') return;
      // Use the browser global Image constructor. `Image` is imported from 'next/image'
      // above, so reference `window.Image` to avoid the name collision.
      const loader = typeof window !== 'undefined' ? new window.Image() : new (globalThis as any).Image();
      loader.src = gif;
      // mark as preloaded to avoid double-loading
      img.dataset.preloaded = '1';
      // store loader reference to avoid GC if desired (optional)
      (img as any)._gifPreloader = loader;
    };

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const el = e.target as HTMLImageElement;
            preloadGif(el);
            observer.unobserve(el);
          }
        });
      }, { rootMargin: '200px' });

      imgs.forEach(img => io.observe(img));
      return () => io.disconnect();
    }

    // Fallback: preload all after small delay
    const fallbackTimer = setTimeout(() => imgs.forEach(preloadGif), 800);
    return () => clearTimeout(fallbackTimer);
  }, []);

  return (
    <>
      {/* Header */}
      <header style={{background: "#fff", borderBottom: "1px solid var(--line)", boxShadow: "0 4px 14px rgba(0,0,0,.04)", position: "sticky", top: 0, zIndex: 20}}>
        <div style={{maxWidth:1120, margin:"0 auto", padding:".75rem 1.5rem", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"1.5rem"}}>
          <div style={{display:"flex", alignItems:"center", gap:".75rem"}}>
            <Image src="/assets/img/logo-eg.png" alt="EG Health Solutions" width={40} height={40} style={{borderRadius:8, background:"#fff"}} />
            <div style={{display:"flex", flexDirection:"column"}}>
              <span style={{fontWeight:700, fontSize:"1.05rem"}}>EG Health Solutions</span>
              <span style={{fontSize:".8rem", color:"var(--muted)"}}>Agenda de turnos para médicos</span>
            </div>
          </div>
          <nav style={{display:"flex", gap:"1rem", fontSize:".95rem"}}>
            <a href="#presentacion">Inicio</a>
            <a href="#features">El sistema</a>
            <a href="#planes">Planes</a>
            <a href="#empezar">Cómo empezar</a>
          </nav>
          <a href="https://eghealthsolutions.vercel.app/" target="_blank" rel="noopener" style={{background:"#e7e2fa", color:"#5a3e9a", borderRadius:999, padding:".4rem .9rem", fontWeight:600, fontSize:".85rem", textDecoration:"none"}}>Ir al sistema</a>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="presentacion" className="hero" style={{padding:"4rem 0", background:"var(--bg)"}}>
          <div className="hero-inner" style={{maxWidth:1120, margin:"0 auto", padding:"0 1.5rem", display:"grid", gridTemplateColumns:"minmax(0,1.5fr) minmax(0,1fr)", gap:"3rem", alignItems:"flex-start"}}>
            <div className="hero-copy">
              <p style={{display:"inline-block", background:"#f3f1fb", border:"1px solid var(--line)", color:"var(--muted)", borderRadius:999, padding:".25rem .7rem", fontSize:".8rem", marginBottom:".85rem"}}>Agenda online para médicos y consultorios</p>
              <h1 className="hero-title" style={{fontSize:"2.25rem", lineHeight:1.2, marginBottom:".8rem"}}>
                ¿Seguís manejando tus turnos en hojas de cálculo,<br />cuadernos o chats sueltos? <span className="highlight">Simple y rápida.</span>
              </h1>
              <p className="hero-sub" style={{fontSize:"1rem", color:"var(--muted)", maxWidth:580, marginBottom:"1rem"}}>
                EG Health Solutions ordena tus turnos en un solo lugar y permitet diferenciar fácilmente entre pacientes nuevos, controles y turnos de urgencia.
              </p>
              <div className="hero-ctas" style={{display:"flex", gap:".75rem", margin:"1.4rem 0 1.7rem"}}>
                <a className="hero-cta primary" href="https://wa.me/541138492392?text=Quiero%20averiguar%20mas%20sobre%20EG%20Health%20Solutions" target="_blank" rel="noopener" style={{background:"#25D366", color:"#fff", borderRadius:999, padding:".55rem 1.2rem", fontWeight:600, textDecoration:"none"}}>Escribir por WhatsApp</a>
                <a className="hero-cta secondary" href="#features" style={{background:"#fff", color:"var(--ink)", border:"1px solid var(--line)", borderRadius:999, padding:".55rem 1.2rem", fontWeight:600, textDecoration:"none"}}>Mirá cómo funciona el sistema</a>
              </div>
            </div>
            <aside style={{background:"var(--card)", borderRadius:18, padding:"1.7rem 1.9rem", border:"1px solid var(--line)", boxShadow:"0 18px 40px rgba(17, 24, 39, 0.06)", fontSize:".95rem"}}>
              <h3 style={{margin:"0 0 .9rem", fontSize:"1.1rem"}}>Por qué elegir EG Health Solutions</h3>
              <ul style={{margin:0, paddingLeft:"1.1rem", color:"var(--muted)"}}>
                <li><strong style={{color:"var(--ink)"}}>Agenda pensada para la consulta real:</strong> primera vez, control, estudios, urgencias. Cada tipo de turno puede tener su propio tiempo.</li>
                <li><strong style={{color:"var(--ink)"}}>Huecos para urgencias sin caos:</strong> reservás espacios para “turnos en el acto” y los vas asignando según cómo viene el día.</li>
                <li><strong style={{color:"var(--ink)"}}>Todo en una sola vista:</strong> ves consultorios, horarios y estados de cada turno en un panel simple.</li>
                <li><strong style={{color:"var(--ink)"}}>Sin costo de implementación:</strong> solo pagás el abono mensual; te ayudamos a dejarla funcionando.</li>
              </ul>
            </aside>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" style={{padding:"4rem 0", background:"#edf0fb"}}>
          <div style={{maxWidth:1120, margin:"0 auto", padding:"0 1.5rem"}}>
            <h2 style={{fontSize:"1.8rem", marginBottom:".6rem"}}>El sistema en la práctica</h2>
            <div style={{display:"grid", gap:"1.7rem", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))"}}>
              <div style={{background:"var(--card)", borderRadius:14, border:"1px solid var(--line)", padding:"1.4rem 1.45rem", boxShadow:"0 8px 24px rgba(0,0,0,.04)"}}>
                <h3 style={{fontSize:"1.12rem", marginBottom:".45rem"}}>Panel de turnos por estado</h3>
                <p style={{fontSize:".95rem", color:"var(--muted)"}}>Ves tus turnos del día agrupados por estado: <strong>por llegar</strong>, <strong>en espera</strong>, <strong>en atención</strong> y <strong>atendidos</strong>. También distinguís qué turnos son primera consulta, control o urgencias para saber dónde necesitás más tiempo.</p>
                <img
                  src="/assets/img/vistainicio-static.png"
                  data-static="/assets/img/vistainicio-static.png"
                  data-gif="/assets/gif/vistainicio.gif"
                  alt="Vista del panel de turnos por estado"
                  className="demo-gif-img"
                  style={{ borderRadius: 12, marginTop: 16, width: "100%", height: "auto" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).src = (e.currentTarget as HTMLImageElement).dataset.gif || (e.currentTarget as HTMLImageElement).src)}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).src = (e.currentTarget as HTMLImageElement).dataset.static || (e.currentTarget as HTMLImageElement).src)}
                />
              </div>
              <div style={{background:"var(--card)", borderRadius:14, border:"1px solid var(--line)", padding:"1.4rem 1.45rem", boxShadow:"0 8px 24px rgba(0,0,0,.04)"}}>
                <h3 style={{fontSize:"1.12rem", marginBottom:".45rem"}}>Asignación y seguimiento de turnos</h3>
                <p style={{fontSize:".95rem", color:"var(--muted)"}}>Tu secretaria elige el tipo de turno (nuevo, control, urgencia), el consultorio y el horario. El sistema respeta la duración de cada tipo de turno y te ayuda a acomodar “turnos en el acto” sin encimar pacientes.</p>
                <img
                  src="/assets/img/videoturnos-static.png"
                  data-static="/assets/img/videoturnos-static.png"
                  data-gif="/assets/gif/videoturnos.gif"
                  alt="Asignación y actualización de turnos"
                  className="demo-gif-img"
                  style={{ borderRadius: 12, marginTop: 16, width: "100%", height: "auto" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).src = (e.currentTarget as HTMLImageElement).dataset.gif || (e.currentTarget as HTMLImageElement).src)}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).src = (e.currentTarget as HTMLImageElement).dataset.static || (e.currentTarget as HTMLImageElement).src)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="planes" style={{padding:"4rem 0", background:"var(--bg)"}}>
          <div style={{maxWidth:1120, margin:"0 auto", padding:"0 1.5rem"}}>
            <h2 style={{fontSize:"1.8rem", marginBottom:".6rem"}}>Planes y condiciones comerciales</h2>
            <div style={{display:"grid", gap:"1.7rem", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))"}}>
              <div style={{background:"var(--card)", borderRadius:14, border:"1px solid var(--line)", padding:"1.4rem 1.45rem", boxShadow:"0 8px 24px rgba(0,0,0,.04)", display:"flex", flexDirection:"column", position:"relative"}}>
                <h3>Plan Consultorio</h3>
                <p style={{fontWeight:700, margin:".45rem 0 .8rem"}}>$25.000 / mes</p>
                <ul style={{listStyle:"none", padding:0, marginBottom: ".9rem"}}>
                  <li>Agenda online para tus turnos</li>
                  <li>1 centro de atención incluido</li>
                  <li>1 asistente administrativo incluido</li>
                  <li>Estados y tipos de turno (nuevo, control, urgencia)</li>
                </ul>
                <p style={{fontSize:".86rem", color:"var(--muted)"}}>Para médicos que atienden en su propio consultorio y quieren dejar atrás las hojas de cálculo y los cuadernos, sin meterse en sistemas complicados.</p>
                <p style={{fontSize:".9rem", color:"var(--muted)"}}>Centro de atención adicional: <strong>$7.000</strong> / mes<br />Asistente administrativo adicional: <strong>$1.500</strong> / mes</p>
                <a href="https://wa.me/541138492392?text=Hola%2C%20quisiera%20recibir%20informaci%C3%B3n%20sobre%20el%20Plan%20Consultorio%20de%20EG%20Health%20Solutions." target="_blank" rel="noopener" style={{position:"absolute", bottom:10, right:10, width:32, height:32, borderRadius:999, background:"#25D366", display:"flex", alignItems:"center", justifyContent:"center", textDecoration:"none"}}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16} aria-hidden="true" focusable="false">
                    <path fill="#ffffff" d="M20.52 3.48A11.94 11.94 0 0 0 12 .5 11.94 11.94 0 0 0 3.48 3.48 11.94 11.94 0 0 0 .5 12c0 2.11.55 4.15 1.6 5.95L.5 23l4.67-1.22A11.94 11.94 0 0 0 12 23.5a11.94 11.94 0 0 0 8.52-3.48A11.94 11.94 0 0 0 23.5 12a11.94 11.94 0 0 0-3-8.52z"/>
                    <path fill="#25D366" d="M17.5 14.1c-.3-.15-1.75-.85-2.02-.95-.27-.1-.46-.15-.66.15-.18.27-.72.95-.88 1.14-.16.18-.32.2-.6.07-.27-.13-1.08-.4-2.06-1.27-.76-.66-1.27-1.48-1.42-1.75-.15-.27-.02-.42.12-.56.12-.12.27-.32.4-.48.13-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.66-1.6-.9-2.2-.24-.58-.48-.5-.66-.52l-.56-.01c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27s.98 2.63 1.12 2.81c.14.18 1.93 2.95 4.68 4.02 3.25 1.25 3.25.83 3.83.78.58-.05 1.75-.7 2-1.37.25-.67.25-1.24.18-1.37-.07-.13-.27-.18-.58-.33z"/>
                  </svg>
                </a>
              </div>
              <div style={{background:"var(--card)", borderRadius:14, border:"2px solid var(--brand-2)", boxShadow:"0 12px 32px rgba(0,0,0,.12)", padding:"1.4rem 1.45rem", display:"flex", flexDirection:"column", position:"relative"}}>
                <div style={{position:"absolute", top:12, right:12, fontSize:".7rem", textTransform:"uppercase", letterSpacing:".04em", background:"#f4f1ff", borderRadius:999, padding:".15rem .5rem", border:"1px solid var(--line)"}}>Más elegido</div>
                <h3>Plan Equipo</h3>
                <p style={{fontWeight:700, margin:".45rem 0 .8rem"}}>$70.000 / mes</p>
                <ul style={{listStyle:"none", padding:0, marginBottom: ".9rem"}}>
                  <li>Agenda compartida para varios profesionales</li>
                  <li>Configuración de múltiples consultorios o sedes</li>
                  <li>Perfiles diferenciados para secretaría y médicos</li>
                  <li>Estados y tipos de turno para todo el equipo</li>
                </ul>
                <p style={{fontSize:".86rem", color:"var(--muted)"}}>Para médicos que comparten secretaria o consultorio con otros colegas y necesitan ver todos los turnos en una sola agenda.</p>
                <p style={{fontSize:".9rem", color:"var(--muted)"}}>Centro de atención adicional: <strong>$5.000</strong> / mes<br />Asistente administrativo adicional: <strong>$1.500</strong> / mes</p>
                <a href="https://wa.me/541138492392?text=Hola%2C%20quisiera%20recibir%20informaci%C3%B3n%20sobre%20el%20Plan%20Equipo%20de%20EG%20Health%20Solutions." target="_blank" rel="noopener" style={{position:"absolute", bottom:10, right:10, width:32, height:32, borderRadius:999, background:"#25D366", display:"flex", alignItems:"center", justifyContent:"center", textDecoration:"none"}}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16} aria-hidden="true" focusable="false">
                    <path fill="#ffffff" d="M20.52 3.48A11.94 11.94 0 0 0 12 .5 11.94 11.94 0 0 0 3.48 3.48 11.94 11.94 0 0 0 .5 12c0 2.11.55 4.15 1.6 5.95L.5 23l4.67-1.22A11.94 11.94 0 0 0 12 23.5a11.94 11.94 0 0 0 8.52-3.48A11.94 11.94 0 0 0 23.5 12a11.94 11.94 0 0 0-3-8.52z"/>
                    <path fill="#25D366" d="M17.5 14.1c-.3-.15-1.75-.85-2.02-.95-.27-.1-.46-.15-.66.15-.18.27-.72.95-.88 1.14-.16.18-.32.2-.6.07-.27-.13-1.08-.4-2.06-1.27-.76-.66-1.27-1.48-1.42-1.75-.15-.27-.02-.42.12-.56.12-.12.27-.32.4-.48.13-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.66-1.6-.9-2.2-.24-.58-.48-.5-.66-.52l-.56-.01c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27s.98 2.63 1.12 2.81c.14.18 1.93 2.95 4.68 4.02 3.25 1.25 3.25.83 3.83.78.58-.05 1.75-.7 2-1.37.25-.67.25-1.24.18-1.37-.07-.13-.27-.18-.58-.33z"/>
                  </svg>
                </a>
              </div>
              <div style={{background:"var(--card)", borderRadius:14, border:"1px solid var(--line)", padding:"1.4rem 1.45rem", boxShadow:"0 8px 24px rgba(0,0,0,.04)", display:"flex", flexDirection:"column", position:"relative"}}>
                <h3>Plan Red de Profesionales</h3>
                <p style={{fontWeight:700, margin:".45rem 0 .8rem"}}>$150.000 / mes</p>
                <ul style={{listStyle:"none", padding:0, marginBottom: ".9rem"}}>
                  <li>Soporte para agendas en varios lugares de atención</li>
                  <li>Coordinación de múltiples profesionales</li>
                  <li>Tipos de turno personalizados y huecos para urgencias</li>
                  <li>Acompañamiento cercano al inicio</li>
                </ul>
                <p style={{fontSize:".86rem", color:"var(--muted)"}}>Para médicos que atienden en varios lugares o con varios profesionales y necesitan coordinar muchas agendas sin usar mil planillas.</p>
                <p style={{fontSize:".9rem", color:"var(--muted)"}}>Centro de atención adicional: <strong>$3.500</strong> / mes<br />Asistente administrativo adicional: <strong>$1.500</strong> / mes</p>
                <a href="https://wa.me/541138492392?text=Hola%2C%20quisiera%20recibir%20informaci%C3%B3n%20sobre%20el%20Plan%20Red%20de%20Profesionales%20de%20EG%20Health%20Solutions." target="_blank" rel="noopener" style={{position:"absolute", bottom:10, right:10, width:32, height:32, borderRadius:999, background:"#25D366", display:"flex", alignItems:"center", justifyContent:"center", textDecoration:"none"}}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16} aria-hidden="true" focusable="false">
                    <path fill="#ffffff" d="M20.52 3.48A11.94 11.94 0 0 0 12 .5 11.94 11.94 0 0 0 3.48 3.48 11.94 11.94 0 0 0 .5 12c0 2.11.55 4.15 1.6 5.95L.5 23l4.67-1.22A11.94 11.94 0 0 0 12 23.5a11.94 11.94 0 0 0 8.52-3.48A11.94 11.94 0 0 0 23.5 12a11.94 11.94 0 0 0-3-8.52z"/>
                    <path fill="#25D366" d="M17.5 14.1c-.3-.15-1.75-.85-2.02-.95-.27-.1-.46-.15-.66.15-.18.27-.72.95-.88 1.14-.16.18-.32.2-.6.07-.27-.13-1.08-.4-2.06-1.27-.76-.66-1.27-1.48-1.42-1.75-.15-.27-.02-.42.12-.56.12-.12.27-.32.4-.48.13-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.66-1.6-.9-2.2-.24-.58-.48-.5-.66-.52l-.56-.01c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27s.98 2.63 1.12 2.81c.14.18 1.93 2.95 4.68 4.02 3.25 1.25 3.25.83 3.83.78.58-.05 1.75-.7 2-1.37.25-.67.25-1.24.18-1.37-.07-.13-.27-.18-.58-.33z"/>
                  </svg>
                </a>
              </div>
            </div>
            <p style={{marginTop:"1.1rem", fontSize:".9rem", color:"var(--muted)"}}><strong>Sin costo de implementación.</strong> Pagás solo el abono mensual según el plan que elijas.<br /><strong>*Precios vigentes hasta diciembre de 2025.</strong></p>
          </div>
        </section>

        {/* Seguridad Section */}
        <section id="seguridad" style={{padding:"4rem 0", background:"#edf0fb"}}>
          <div style={{maxWidth:1120, margin:"0 auto", padding:"0 1.5rem"}}>
            <h2 style={{fontSize:"1.8rem", marginBottom:".6rem"}}>Seguridad y privacidad de tus datos</h2>
            <div style={{display:"grid", gap:"1.7rem", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))"}}>
              <div style={{background:"var(--card)", borderRadius:14, border:"1px solid var(--line)", padding:"1.4rem 1.45rem", boxShadow:"0 8px 24px rgba(0,0,0,.04)"}}>
                <h3>Accesos por usuario</h3>
                <p>Cada persona tiene su propio usuario y contraseña. Podés diferenciar entre médicos y secretaría y limitar quién puede ver o modificar los turnos.</p>
              </div>
              <div style={{background:"var(--card)", borderRadius:14, border:"1px solid var(--line)", padding:"1.4rem 1.45rem", boxShadow:"0 8px 24px rgba(0,0,0,.04)"}}>
                <h3>Datos separados por consultorio</h3>
                <p>La información de tu consultorio o centro se mantiene aislada de otros. Solo tu equipo ve los turnos de tus pacientes.</p>
              </div>
              <div style={{background:"var(--card)", borderRadius:14, border:"1px solid var(--line)", padding:"1.4rem 1.45rem", boxShadow:"0 8px 24px rgba(0,0,0,.04)"}}>
                <h3>Conexión segura</h3>
                <p>El sistema funciona sobre una conexión cifrada (HTTPS), la misma tecnología que usan los homebankings y las principales plataformas de servicios online.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Cómo empezar Section */}
        <section id="empezar" style={{padding:"4rem 0", background:"var(--bg)"}}>
          <div style={{maxWidth:1120, margin:"0 auto", padding:"0 1.5rem"}}>
            <h2 style={{fontSize:"1.8rem", marginBottom:".6rem"}}>Cómo empezar sin complicarte</h2>
            <div style={{display:"flex", flexDirection:"column", gap:"1.3rem"}}>
              <div style={{display:"flex", gap:".9rem", alignItems:"flex-start"}}>
                <span style={{width:28, height:28, borderRadius:999, background:"var(--brand)", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:".9rem", fontWeight:700, flexShrink:0}}>1</span>
                <div>
                  <h3 style={{fontSize:"1.05rem", marginBottom:".25rem"}}>Nos escribís por WhatsApp</h3>
                  <p>Nos contás dónde atendés, cuántos días y cómo manejan hoy los turnos (hojas de cálculo, cuadernos, grupos de WhatsApp, etc.).</p>
                </div>
              </div>
              <div style={{display:"flex", gap:".9rem", alignItems:"flex-start"}}>
                <span style={{width:28, height:28, borderRadius:999, background:"var(--brand)", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:".9rem", fontWeight:700, flexShrink:0}}>2</span>
                <div>
                  <h3 style={{fontSize:"1.05rem", marginBottom:".25rem"}}>Te mostramos el sistema</h3>
                  <p>Hacemos una demo remota y vemos juntos cómo se adapta a tu forma de trabajo: tipos de turno, duración, consultorios y horarios.</p>
                </div>
              </div>
              <div style={{display:"flex", gap:".9rem", alignItems:"flex-start"}}>
                <span style={{width:28, height:28, borderRadius:999, background:"var(--brand)", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:".9rem", fontWeight:700, flexShrink:0}}>3</span>
                <div>
                  <h3 style={{fontSize:"1.05rem", marginBottom:".25rem"}}>Lo dejamos funcionando</h3>
                  <p>Configuramos consultorios, tipos de turno (primera vez, control, urgencias) y usuarios. La implementación tiene <strong>costo 0</strong> y te acompañamos en los primeros días para que vos y tu secretaria se acostumbren rápido.</p>
                </div>
              </div>
            </div>
            <div style={{marginTop:"1.8rem"}}>
              <p style={{fontSize:"1.1rem", color:"var(--muted)", marginBottom:".6rem"}}>¿Querés ver cómo quedaría tu agenda armada en EG Health Solutions?</p>
              <a href="https://wa.me/541138492392?text=Quiero%20averiguar%20mas%20sobre%20EG%20Health%20Solutions" target="_blank" rel="noopener" style={{background:"#25D366", color:"#fff", borderRadius:999, padding:".55rem 1.2rem", fontWeight:600, textDecoration:"none"}}>Iniciar contacto por WhatsApp</a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{borderTop:"1px solid var(--line)", background:"#111827", color:"#e5e7eb", padding:"1.2rem 0 1.6rem", marginTop:"2.2rem"}}>
        <div style={{textAlign:"center", fontSize:".9rem"}}>
          <p>© {new Date().getFullYear()} eghealthsolutions.com — Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/541138492392?text=Quiero%20averiguar%20mas%20sobre%20EG%20Health%20Solutions"
        target="_blank"
        rel="noopener"
        aria-label="Contactar por WhatsApp"
        className="whatsapp-fab"
        style={{
          position: "fixed",
          right: "1.4rem",
          bottom: "1.4rem",
          width: 60,
          height: 60,
          borderRadius: 999,
          background: "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 10px 24px rgba(0,0,0,.25)",
          textDecoration: "none",
          zIndex: 50,
        }}
      >
        {/* SVG inline para un ícono nítido y sin fondo */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32} aria-hidden="true" focusable={false}>
          <path fill="#ffffff" d="M20.52 3.48A11.94 11.94 0 0 0 12 .5 11.94 11.94 0 0 0 3.48 3.48 11.94 11.94 0 0 0 .5 12c0 2.11.55 4.15 1.6 5.95L.5 23l4.67-1.22A11.94 11.94 0 0 0 12 23.5a11.94 11.94 0 0 0 8.52-3.48A11.94 11.94 0 0 0 23.5 12a11.94 11.94 0 0 0-3-8.52z"/>
          <path fill="#25D366" d="M17.5 14.1c-.3-.15-1.75-.85-2.02-.95-.27-.1-.46-.15-.66.15-.18.27-.72.95-.88 1.14-.16.18-.32.2-.6.07-.27-.13-1.08-.4-2.06-1.27-.76-.66-1.27-1.48-1.42-1.75-.15-.27-.02-.42.12-.56.12-.12.27-.32.4-.48.13-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.66-1.6-.9-2.2-.24-.58-.48-.5-.66-.52l-.56-.01c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27s.98 2.63 1.12 2.81c.14.18 1.93 2.95 4.68 4.02 3.25 1.25 3.25.83 3.83.78.58-.05 1.75-.7 2-1.37.25-.67.25-1.24.18-1.37-.07-.13-.27-.18-.58-.33z"/>
        </svg>
      </a>
    </>
  );
}
