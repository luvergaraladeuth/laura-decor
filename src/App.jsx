import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [mostrarAdmin, setMostrarAdmin] = useState(false)

  return (
    <div>
      <Header mostrarAdmin={mostrarAdmin} setMostrarAdmin={setMostrarAdmin} />

      <main className="container">
        {/* Seccion 1: Landing / Inicio */}
        <section id="inicio" className="panel hero-section">
          <div className="hero-text">
            <p className="eyebrow">Decoración de eventos y celebraciones</p>
            <h1>Hacemos que tu celebración luzca inolvidable con Laura Decor</h1>
            <p className="intro">
              Diseñamos espacios llenos de detalles con arcos de globos, arreglos florales,
              fondos personalizados y mesas principales para cumpleaños, grados, bodas y baby showers.
            </p>
            <div className="hero-actions">
              <a href="#catalogo" className="btn-principal">Ver Paquetes</a>
              <a href="#contacto" className="btn-secundario">Pedir Cotización</a>
            </div>
          </div>

          <div className="hero-image-box">
            <img src="./logo.jpeg" alt="Laura Decor Eventos" className="hero-logo" />
          </div>
        </section>

        {/* Seccion de propuesta de valor */}
        <section className="panel">
          <div className="section-heading">
            <p className="eyebrow">Nuestro servicio</p>
            <h2>¿Por qué decorar tu evento con nosotras?</h2>
            <p className="muted">Cuidamos cada detalle para que tú solo te preocupes por disfrutar.</p>
          </div>

          <div className="beneficios-grid">
            <div className="tarjeta-beneficio">
              <h3>1. Diseño a tu gusto</h3>
              <p>
                Elegimos juntas la paleta de colores, temática, flores y accesorios ideales para tu ocasión.
              </p>
            </div>

            <div className="tarjeta-beneficio">
              <h3>2. Montaje puntual</h3>
              <p>
                Llegamos con anticipación al lugar del evento, armamos toda la decoración y recogemos al día siguiente.
              </p>
            </div>

            <div className="tarjeta-beneficio">
              <h3>3. Presupuesto claro</h3>
              <p>
                Contamos con paquetes desde celebraciones en casa hasta recepciones completas en salón.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
