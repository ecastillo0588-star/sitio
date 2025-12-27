 'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Badge from '../../../components/Badge'
import profileConfig from '../../../profiles/gabriela-castillo/config.json'

export default function GabrielaCastilloPage() {
  const [showChat, setShowChat] = useState(false)

  const [chatAvailable, setChatAvailable] = useState(true)
  const [checkingChat, setCheckingChat] = useState(false)
  const [contactForm, setContactForm] = useState({ name: '', phone: '', message: '' })

  const profesionalId = profileConfig.profesionalId
  const profesionalNombre = profileConfig.name
  const heroImage = profileConfig.heroImage

  const heroNovedades = [
    {
      titulo: 'Guía 2025 para chequeos preventivos',
      descripcion: 'Nuevos lineamientos en medicina familiar para controles anuales y screening temprano.'
    },
    {
      titulo: 'Telemedicina segura',
      descripcion: 'Atención virtual con historia clínica integrada y protocolos de privacidad actualizados.'
    },
    {
      titulo: 'Vacunación adultos 2025',
      descripcion: 'Refuerzos recomendados y esquema para pacientes con comorbilidades.'
    }
  ]

  const centrosMedicos = [
    {
      id: '8b09d4c3-5033-4ba8-8389-54c26b5e27d3',
      nombre: 'CIMEV',
      direccion: 'Bvar. Los Nogales 2320',
      telefono: '2665297220',
      email: 'cimev2023@gmail.com',
      horarios: 'Lunes, Miércoles y Viernes: 9:00 - 13:00',
      notas: 'Consultas presenciales y virtuales'
    },
    {
      id: '94a09bb0-a8fd-4205-8764-fc681d9f029b',
      nombre: 'VIAPSI',
      direccion: 'Chacabuco 1047',
      telefono: '2665127610',
      email: 'dracastillogabriela@gmail.com',
      horarios: 'Martes y Jueves: 15:00 - 19:00',
      notas: 'Consultas presenciales y virtuales'
    }
  ]

  const videos = [
    {
      titulo: 'Consejos para el cuidado de la piel',
      duracion: '5:30'
    },
    {
      titulo: 'Prevención de enfermedades comunes',
      duracion: '8:15'
    },
    {
      titulo: 'Alimentación saludable',
      duracion: '6:45'
    }
  ]

  const novedades = [
    {
      fecha: '26 Dic 2025',
      titulo: 'Consultas virtuales disponibles',
      descripcion: 'Atención por videollamada para controles y seguimiento, coordiná tu turno online.'
    },
    {
      fecha: '15 Dic 2025',
      titulo: 'Chequeos preventivos verano',
      descripcion: 'Agenda tu control anual y estudios básicos para iniciar el año con salud controlada.'
    },
    {
      fecha: '05 Dic 2025',
      titulo: 'Charlas de cuidado familiar',
      descripcion: 'Ciclo de encuentros sobre hábitos saludables y prevención en medicina familiar.'
    }
  ]

  const [activeTicker, setActiveTicker] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const id = setInterval(() => {
      setActiveTicker((prev) => (prev + 1) % heroNovedades.length)
    }, 4200)
    return () => clearInterval(id)
  }, [heroNovedades.length, isPaused])

  // Chat availability check: simple network ping with timeout.
  const iframeBase =
    process.env.NEXT_PUBLIC_WIDGET_URL ?? 'https://eghealthsolutions.vercel.app/paciente/chatbot-widget'
  const iframeSrc = `${iframeBase}?profesionalId=${profesionalId}&profesionalNombre=${encodeURIComponent(
    profesionalNombre
  )}`

  useEffect(() => {
    if (!showChat) return
    let cancelled = false
    const check = async () => {
      setCheckingChat(true)
      try {
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 1800)
        await fetch(iframeBase, { method: 'GET', mode: 'no-cors', signal: controller.signal })
        clearTimeout(timeout)
        if (!cancelled) setChatAvailable(true)
      } catch (e) {
        if (!cancelled) setChatAvailable(false)
      } finally {
        if (!cancelled) setCheckingChat(false)
      }
    }
    check()
    return () => {
      cancelled = true
    }
  }, [showChat])

  // Listen to messages from iframe widget (e.g., close request)
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (!e?.data) return
      if (e.data && e.data.type === 'CHAT_CLOSE') {
        setShowChat(false)
      }
    }

    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactForm((s) => ({ ...s, [name]: value }))
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const body = `Nombre: ${contactForm.name}%0D%0A%0D%0A${contactForm.message}`
    const mailto = `mailto:consultas@dracastillo.com?subject=${encodeURIComponent(
      'Solicitud de turno - ' + profesionalNombre
    )}&body=${body}`
    window.location.href = mailto
  }

  const handleChatOpen = () => {
    console.log('Abriendo chat con URL:', iframeSrc)
    setShowChat(true)
  }

  return (
    <div className="page">
      <header className="nav">
        <div className="nav-inner">
          <div className="logo">
            <div className="logo-mark">GC</div>
            <span className="logo-text">Dra. {profesionalNombre}</span>
          </div>
          <nav className="menu">
            <a href="#inicio">Inicio</a>
            <a href="#sobre-mi">Sobre mí</a>
            <a href="#centros">Centros</a>
            <a href="#recursos">Recursos</a>
            <a href="#novedades">Novedades</a>
          </nav>
        </div>
      </header>

      <section id="inicio" className="hero">
        <div className="hero-bg"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <span className="eyebrow">Médica General</span>
              <h1>Dra. {profesionalNombre}</h1>
              <p className="lead">
                Atención médica integral con más de 15 años de experiencia. Enfoque humano,
                seguimiento cercano y tratamientos basados en evidencia.
              </p>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                <Badge
                  icon={
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
                    </svg>
                  }
                  label="San Luis, Argentina"
                  variant="location"
                />
                <Badge
                  icon={
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm5 18a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM8 5h8v11H8V5z" />
                    </svg>
                  }
                  label="Atención virtual disponible"
                  variant="virtual"
                />
              </div>
              <div className="hero-actions">
                <button className="btn primary" onClick={handleChatOpen}>
                  Reservar turno
                </button>
                <a className="btn secondary" href="#sobre-mi">Conoce más</a>
              </div>
            </div>
            <div className="hero-image">
              <div className="image-wrapper">
                <Image src={heroImage} alt={`Foto de ${profesionalNombre}`} width={520} height={520} className="profile-img" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="obras-sociales" className="section insurers-section">
        <div className="container">
          <div className="section-head">
            <h2>Obras sociales</h2>
            <p>Atencion por las siguientes obras sociales presencial o virtual</p>
          </div>

          <div className="insurers-wrap" aria-hidden>
            <div className="insurers-track">
              <div className="insurer-item">Atención Particular</div>
              <div className="insurer-item">OSDE</div>
              <div className="insurer-item">SWISS MEDICAL GROUP</div>
              <div className="insurer-item">GALENO ARGENTINA</div>
              <div className="insurer-item">PAMI</div>
              <div className="insurer-item">SANCOR SALUD</div>
              <div className="insurer-item">OMINT / CONSOLIDAR</div>
              <div className="insurer-item">MEDICUS</div>
              <div className="insurer-item">UNIÓN PERSONAL</div>
              <div className="insurer-item">MEDIFE</div>
              <div className="insurer-item">JERÁRQUICOS SALUD</div>
              <div className="insurer-item">Y muchas más</div>
              {/* duplicate for seamless loop */}
              <div className="insurer-item">Atención Particular</div>
              <div className="insurer-item">OSDE</div>
              <div className="insurer-item">SWISS MEDICAL GROUP</div>
              <div className="insurer-item">GALENO ARGENTINA</div>
              <div className="insurer-item">PAMI</div>
              <div className="insurer-item">SANCOR SALUD</div>
              <div className="insurer-item">OMINT / CONSOLIDAR</div>
              <div className="insurer-item">MEDICUS</div>
              <div className="insurer-item">UNIÓN PERSONAL</div>
              <div className="insurer-item">MEDIFE</div>
              <div className="insurer-item">JERÁRQUICOS SALUD</div>
              <div className="insurer-item">Y muchas más</div>
            </div>
          </div>
        </div>
      </section>

      <section id="sobre-mi" className="section">
        <div className="container">
          <div className="section-head">
            <h2>Especialidades y servicios</h2>
            <p>Atención integral para toda la familia</p>
          </div>
          <div className="card-grid">
            <div className="card">
              <div className="icon-circle">✓</div>
              <h3>Medicina general</h3>
              <p>Diagnóstico y tratamiento de enfermedades frecuentes, controles de salud y prevención.</p>
            </div>
            <div className="card">
              <div className="icon-circle">❤</div>
              <h3>Atención familiar</h3>
              <p>Seguimiento integral de niños, adultos y adultos mayores con enfoque humano.</p>
            </div>
            <div className="card">
              <div className="icon-circle">🩺</div>
              <h3>Controles preventivos</h3>
              <p>Chequeos médicos, control de presión, laboratorio y planes de prevención personalizados.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="centros" className="section alt">
        <div className="container">
          <div className="section-head">
            <h2>Centros de atención</h2>
            <p>Consultorios equipados para brindarte la mejor atención. Atención presencial en la provincia de San Luis, Argentina y atención virtual para todo el país.</p>
          </div>
          <div className="card-grid">
            {centrosMedicos.map((centro) => (
              <div key={centro.id} className="card">
                <h3>{centro.nombre}</h3>
                <ul className="meta">
                  <li><strong>Dirección:</strong> {centro.direccion}</li>
                  <li><strong>Teléfono:</strong> {centro.telefono}</li>
                  <li><strong>Email:</strong> {centro.email}</li>
                  <li><strong>Horarios:</strong> {centro.horarios}</li>
                  <li><strong>Modalidad:</strong> {centro.notas}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="recursos" className="section">
        <div className="container">
          <div className="section-head">
            <h2>Recursos y videos</h2>
            <p>Contenido educativo sobre salud y bienestar</p>
          </div>
          <div className="card-grid">
            {videos.map((video) => (
              <div key={video.titulo} className="card video-card">
                <div className="video-thumb">
                  <div className="play">▶</div>
                  <span className="tag">{video.duracion}</span>
                </div>
                <h3>{video.titulo}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="novedades" className="section alt">
        <div className="container">
          <div className="section-head">
            <h2>Novedades</h2>
            <p>Actualizaciones y comunicados</p>
          </div>
          <div className="news-list">
            {novedades.map((novedad) => (
              <article key={novedad.titulo} className="news-item">
                <div className="news-meta">{novedad.fecha}</div>
                <h3>{novedad.titulo}</h3>
                <p>{novedad.descripcion}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <h3>Dra. {profesionalNombre}</h3>
              <p>Médica General especializada en atención familiar integral.</p>
            </div>
            <div>
              <h3>Enlaces</h3>
              <div className="links">
                <a href="#sobre-mi">Sobre mí</a>
                <a href="#centros">Centros</a>
                <a href="#recursos">Recursos</a>
                <a href="#novedades">Novedades</a>
              </div>
            </div>
            <div>
              <h3>Contacto</h3>
              <p>Contacto disponible al reservar turno.</p>
            </div>
          </div>
          <div className="footer-copy">
            <p>Powered by eghealthsolutions.</p>
          </div>
        </div>
      </footer>

      {!showChat && (
        <button aria-label="Abrir chat" className="chat-fab" onClick={handleChatOpen}>
          <span className="fab-label">Chat</span>
        </button>
      )}

      {showChat && (
        <div className="chat-overlay" role="dialog" aria-modal="true">
          <div className="chat-window">
            {/* Host header removed — widget (iframe) provides its own header for consistent embedding */}
            {checkingChat && (
              <div style={{ padding: 18 }}>
                Comprobando disponibilidad del chat...
              </div>
            )}

            {!checkingChat && chatAvailable && (
              <iframe className="chat-iframe" src={iframeSrc} title="Chatbot" />
            )}

            {!checkingChat && !chatAvailable && (
              <div className="chat-fallback" style={{ padding: 18 }}>
                <p>
                  El chat no está disponible en este momento. Dejá tus datos y te contactamos para
                  coordinar el turno.
                </p>
                <form onSubmit={handleContactSubmit} style={{ marginTop: 12, display: 'grid', gap: 8 }}>
                  <input name="name" placeholder="Nombre" value={contactForm.name} onChange={handleContactChange} required style={{ padding: 10, borderRadius: 8, border: '1px solid #ddd' }} />
                  <input name="phone" placeholder="Teléfono" value={contactForm.phone} onChange={handleContactChange} required style={{ padding: 10, borderRadius: 8, border: '1px solid #ddd' }} />
                  <textarea name="message" placeholder="Mensaje (opcional)" value={contactForm.message} onChange={handleContactChange} rows={4} style={{ padding: 10, borderRadius: 8, border: '1px solid #ddd' }} />
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button type="submit" className="btn primary">Enviar</button>
                    <button type="button" className="btn ghost" onClick={() => window.location.href = 'mailto:consultas@dracastillo.com'}>Enviar por mail</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        :root {
          --accent: #5937a8;
          --primary: #1a1a2a;
          --secondary: #666;
          --light: #f8f9ff;
          --white: #fff;
          --shadow: rgba(0,0,0,0.1);
        }

        .page {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          background: var(--light);
          color: var(--primary);
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .nav {
          position: sticky;
          top: 0;
          z-index: 20;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 700;
        }

        .logo-mark {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--accent), #7c3aed);
          color: white;
          display: grid;
          place-items: center;
          font-weight: 800;
          font-size: 18px;
        }

        .logo-text {
          color: var(--primary);
          font-size: 18px;
        }

        .menu {
          display: flex;
          gap: 24px;
          font-weight: 500;
        }

        .menu a {
          color: var(--secondary);
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .menu a:hover {
          color: var(--accent);
          background: rgba(89,55,168,0.05);
        }

        .hero {
          position: relative;
          padding: 100px 0;
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #f8f9ff 0%, #e8efff 100%);
          z-index: -1;
        }

        /* Insurers / Obras sociales marquee */
        .insurers-section { padding: 30px 0; background: transparent; }
        .insurers-wrap { position: relative; overflow: hidden; padding: 16px 0; }
        .insurers-track {
          display: flex;
          gap: 28px;
          align-items: center;
          white-space: nowrap;
          animation: scroll-left 28s linear infinite;
          will-change: transform;
        }

        .insurer-item {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 22px;
          border-radius: 999px;
          background: rgba(255,255,255,0.9);
          color: var(--primary);
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 0.6px;
          box-shadow: 0 8px 30px rgba(8,8,20,0.06);
          border: 1px solid rgba(0,0,0,0.04);
        }

        .insurers-wrap::before, .insurers-wrap::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 12%;
          pointer-events: none;
        }
        .insurers-wrap::before { left: 0; background: linear-gradient(90deg, rgba(248,249,255,1), rgba(248,249,255,0)); }
        .insurers-wrap::after { right: 0; background: linear-gradient(270deg, rgba(248,249,255,1), rgba(248,249,255,0)); }

        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .insurers-track { animation: none; }
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .hero-content {
          display: flex;
          align-items: center;
          gap: 80px;
          min-height: 500px;
        }

        .hero-text {
          flex: 1;
        }

        .eyebrow {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 12px;
        }

        .hero h1 {
          font-size: 56px;
          font-weight: 700;
          color: var(--primary);
          margin: 0 0 20px;
          line-height: 1.1;
        }

        .lead {
          font-size: 20px;
          color: var(--secondary);
          line-height: 1.6;
          margin-bottom: 40px;
          max-width: 600px;
        }

        .hero-actions {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 32px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 16px;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
        }

        .btn.primary {
          background: white;
          color: #5937a8;
          border: 2px solid #5937a8;
        }

        .btn.primary:hover {
          background: #5937a8;
          color: white;
        }

        .btn.secondary {
          background: white;
          color: #5937a8;
          border: 2px solid #5937a8;
        }

        .btn.secondary:hover {
          background: #5937a8;
          color: white;
        }

        .hero-image {
          flex: 1;
          display: flex;
          justify-content: center;
        }

        .image-wrapper {
          position: relative;
          width: 520px;
          height: 520px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 18px 60px rgba(0,0,0,0.14);
          display: grid;
          place-items: center;
        }

        .image-wrapper::after {
          content: '';
          position: absolute;
          inset: -10%;
          background: radial-gradient(circle at 30% 20%, rgba(124,58,237,0.22), transparent 60%),
            linear-gradient(135deg, rgba(89,55,168,0.08), rgba(124,58,237,0.06));
          z-index: 0;
        }

        .profile-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: relative;
          z-index: 1;
          -webkit-mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 100%);
          mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 100%);
        }

        .edu-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(89,55,168,0.08);
          color: var(--accent);
          font-weight: 600;
          margin-bottom: 24px;
        }

        .location-badge, .virtual-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.06);
          color: #fff;
          font-weight: 600;
          border: 1px solid rgba(255,255,255,0.06);
          backdrop-filter: blur(4px);
        }

        .location-badge {
          color: #ffd7b2;
          background: rgba(91,46,170,0.14);
          border-color: rgba(255,215,178,0.06);
        }

        .virtual-badge {
          color: #bfe9ff;
          background: rgba(18,122,255,0.08);
          border-color: rgba(18,122,255,0.06);
        }

        .section {
          padding: 100px 0;
          background: white;
        }

        .section.alt {
          background: #fafbfc;
        }

        .section-head {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-head h2 {
          font-size: 40px;
          font-weight: 700;
          color: var(--primary);
          margin: 0 0 16px;
        }

        .section-head p {
          font-size: 18px;
          color: var(--secondary);
          max-width: 600px;
          margin: 0 auto;
        }

        .card-grid {
          display: grid;
          gap: 30px;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          max-width: 1200px;
          margin: 0 auto;
        }

        .card {
          background: white;
          border-radius: 20px;
          padding: 40px 30px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
          border: 1px solid rgba(0,0,0,0.05);
        }

        .card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.12);
        }

        .icon-circle {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(89,55,168,0.1), rgba(124,58,237,0.1));
          color: var(--accent);
          display: grid;
          place-items: center;
          font-weight: 800;
          font-size: 24px;
          margin-bottom: 20px;
        }

        .card h3 {
          font-size: 24px;
          font-weight: 600;
          color: var(--primary);
          margin: 0 0 12px;
        }

        .card p {
          color: var(--secondary);
          line-height: 1.6;
          margin: 0;
        }

        .meta {
          list-style: none;
          padding: 0;
          margin: 20px 0 0;
          display: grid;
          gap: 8px;
        }

        .meta li {
          color: var(--secondary);
          font-size: 14px;
        }

        .meta strong {
          color: var(--primary);
        }

        .video-card {
          padding: 0;
          overflow: hidden;
        }

        .video-thumb {
          background: linear-gradient(135deg, var(--accent), #7c3aed);
          height: 200px;
          position: relative;
          display: grid;
          place-items: center;
          color: white;
        }

        .play {
          font-size: 48px;
          opacity: 0.9;
        }

        .tag {
          position: absolute;
          bottom: 16px;
          right: 16px;
          background: rgba(0,0,0,0.3);
          padding: 8px 12px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 14px;
        }

        .video-card h3 {
          padding: 24px 30px 30px;
          margin: 0;
          font-size: 20px;
        }

        .news-list {
          display: grid;
          gap: 24px;
          max-width: 800px;
          margin: 0 auto;
        }

        .news-item {
          background: white;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.06);
          border: 1px solid rgba(0,0,0,0.05);
        }

        .news-meta {
          color: var(--accent);
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .news-item h3 {
          font-size: 24px;
          font-weight: 600;
          color: var(--primary);
          margin: 0 0 12px;
        }

        .news-item p {
          color: var(--secondary);
          line-height: 1.6;
          margin: 0;
        }

        .footer {
          background: linear-gradient(135deg, #3b1b6a 0%, #5a2fa0 60%);
          color: #fff;
          padding: 60px 0 40px;
          box-shadow: inset 0 8px 40px rgba(0,0,0,0.18);
        }

        .footer-grid {
          display: grid;
          gap: 40px;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .footer h3 {
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 16px;
          color: #fff;
          text-shadow: 0 1px 0 rgba(0,0,0,0.2);
        }

        .links {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .links a {
          color: #ffffff;
          text-decoration: none;
          transition: color 0.15s ease, opacity 0.15s ease;
          opacity: 0.95;
          font-weight: 600;
        }

        .links a:hover {
          color: #fff;
          opacity: 1;
          text-decoration: underline;
        }

        .footer-copy {
          text-align: center;
          margin-top: 40px;
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          opacity: 1;
          letter-spacing: 0.2px;
        }

        /* ensure small text inside footer is clearly readable */
        .footer p, .footer .meta, .footer a, .footer .links a {
          color: #ffffff;
        }

        .chat-fab {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 100px;
          height: 44px;
          border-radius: 22px;
          background: white;
          color: #5937a8;
          border: 2px solid #5937a8;
          font-size: 16px;
          font-weight: 600;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 30;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chat-fab:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.2);
          background: #5937a8;
          color: white;
        }

        .chat-overlay {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          padding: 24px;
          background: rgba(0,0,0,0.5);
          z-index: 40;
        }

        .chat-window {
          width: min(450px, 90vw);
          height: 70vh;
          background: white;
          border-radius: 20px;
          border: 2px solid var(--accent);
          box-shadow: 0 25px 80px rgba(0,0,0,0.3);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .chat-header {
          background: var(--accent);
          color: white;
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .chat-title {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .chat-avatar {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: white;
          color: var(--accent);
          display: grid;
          place-items: center;
          font-weight: 800;
        }

        .chat-header p {
          margin: 0;
          font-size: 14px;
          opacity: 0.9;
        }

        .close {
          background: transparent;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          padding: 4px;
        }

        .chat-iframe {
          flex: 1;
          border: none;
        }

        @media (max-width: 768px) {
          .hero-content {
            flex-direction: column;
            text-align: center;
            gap: 60px;
          }

          .hero h1 {
            font-size: 40px;
          }

          .lead {
            font-size: 18px;
          }

          .hero-actions {
            justify-content: center;
          }

          .image-wrapper {
            width: 340px;
            height: 340px;
          }

          .menu {
            display: none;
          }

          .nav-inner {
            height: 70px;
          }

          .section {
            padding: 60px 0;
          }

          .card-grid {
            grid-template-columns: 1fr;
          }

          .chat-window {
            width: 100%;
            height: 80vh;
          }

          .chat-overlay {
            align-items: center;
            justify-content: center;
            padding: 20px;
          }
        }
      `}</style>
    </div>
  )
}
