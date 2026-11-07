import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import PackageCard from './components/PackageCard.jsx'
import Cotizador from './components/Cotizador.jsx'
import ContactForm from './components/ContactForm.jsx'
import AdminLogin from './components/AdminLogin.jsx'
import AdminPanel from './components/AdminPanel.jsx'
import ChatbotIA from './components/ChatbotIA.jsx'
import { initialPackages } from './data/initialPackages.js'

const solicitudesIniciales = [
  {
    id: 'sol-1',
    nombre: 'Valentina Ríos',
    telefono: '311 450 8890',
    tipoEvento: 'Baby Shower',
    fechaEvento: '2026-11-28',
    mensaje: 'Hola Laura, me gustaría cotizar el paquete Baby Shower Ternura en tonos rosa pastel y dorado.',
    atendido: false
  }
]

const slidesHero = [
  {
    subtitulo: "Hay una manera especial de celebrar...",
    titulo: "En Laura Decor llenamos tus momentos de magia",
    texto: "Desde arcos orgánicos y arreglos florales hasta montajes completos hechos a tu medida para que celebres junto a quienes más quieres.",
    imagen: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80",
    boton: "Explorar Catálogo"
  },
  {
    subtitulo: "Hoy estamos más cerca de tus celebraciones...",
    titulo: "Diseños pensados con amor para cada ocasión",
    texto: "Cumpleaños, baby showers, grados, aniversarios y bodas decoradas con tonos cálidos, flores y detalles personalizados.",
    imagen: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=80",
    boton: "Ver Paquetes"
  },
  {
    subtitulo: "Reserva en línea tu fecha especial",
    titulo: "Laura Decor, todo empezó con el corazón",
    texto: "Nos encargamos del diseño, transporte y montaje puntual para que tú solo te dediques a disfrutar de tu fiesta.",
    imagen: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1600&q=80",
    boton: "Pedir Cotización"
  }
]

export default function App() {
  const [mostrarAdmin, setMostrarAdmin] = useState(false)
  const [adminAutenticado, setAdminAutenticado] = useState(false)
  const [slideActual, setSlideActual] = useState(0)

  // Estado de los paquetes del catalogo (guardados en localStorage)
  const [paquetes, setPaquetes] = useState(() => {
    const guardados = localStorage.getItem('laura_decor_paquetes_v3')
    return guardados ? JSON.parse(guardados) : initialPackages
  })

  const [categoriaActiva, setCategoriaActiva] = useState('Todas')
  const [busqueda, setBusqueda] = useState('')
  const [paqueteSeleccionado, setPaqueteSeleccionado] = useState(initialPackages[0])

  const [solicitudes, setSolicitudes] = useState(() => {
    const guardadas = localStorage.getItem('laura_decor_solicitudes')
    return guardadas ? JSON.parse(guardadas) : solicitudesIniciales
  })

  useEffect(() => {
    localStorage.setItem('laura_decor_paquetes_v3', JSON.stringify(paquetes))
  }, [paquetes])

  useEffect(() => {
    localStorage.setItem('laura_decor_solicitudes', JSON.stringify(solicitudes))
  }, [solicitudes])

  function agregarSolicitud(nuevaSolicitud) {
    setSolicitudes([nuevaSolicitud, ...solicitudes])
  }

  // Filtrar paquetes por categoria y por texto de busqueda (.toLowerCase() y .includes())
  const paquetesFiltrados = paquetes.filter((paquete) => {
    const coincideCategoria =
      categoriaActiva === 'Todas' || paquete.categoria === categoriaActiva
    const coincideTexto =
      paquete.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      paquete.incluye.toLowerCase().includes(busqueda.toLowerCase())

    return coincideCategoria && coincideTexto
  })

  const banner = slidesHero[slideActual]

  return (
    <div>
      <Header mostrarAdmin={mostrarAdmin} setMostrarAdmin={setMostrarAdmin} />

      {mostrarAdmin ? (
        <main className="container">
          {!adminAutenticado ? (
            <AdminLogin
              onLoginExitoso={() => setAdminAutenticado(true)}
              onCancelar={() => setMostrarAdmin(false)}
            />
          ) : (
            <AdminPanel
              paquetes={paquetes}
              setPaquetes={setPaquetes}
              solicitudes={solicitudes}
              setSolicitudes={setSolicitudes}
              onCerrarSesion={() => {
                setAdminAutenticado(false)
                setMostrarAdmin(false)
              }}
            />
          )}
        </main>
      ) : (
        <>
          {/* Banner principal de ancho completo estilo De Lolita */}
          <section
            id="inicio"
            className="hero-banner"
            style={{ backgroundImage: `url(${banner.imagen})` }}
          >
        <div className="hero-overlay">
          <div className="container hero-banner-content">
            <p className="hero-eyebrow">{banner.subtitulo}</p>
            <h1>{banner.titulo}</h1>
            <p className="hero-description">{banner.texto}</p>

            <div className="hero-actions">
              <a href="#catalogo" className="btn-lolita-amarillo">{banner.boton}</a>
              <a href="#contacto" className="btn-lolita-blanco">Hablar con nosotras</a>
            </div>

            <div className="hero-dots">
              {slidesHero.map((item, index) => (
                <button
                  key={item.titulo}
                  type="button"
                  className={slideActual === index ? "hero-dot activo" : "hero-dot"}
                  onClick={() => setSlideActual(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Seccion Acerca de Nosotros estilo De Lolita */}
      <section id="acerca" className="acerca-section">
        <div className="container acerca-grid">
          <div className="acerca-texto">
            <p className="eyebrow">Nuestra esencia</p>
            <h2>Acerca de nosotros</h2>
            <p>
              Somos un emprendimiento colombiano apasionado por transformar espacios y hacer que
              cada celebración se convierta en un recuerdo lleno de alegría. En <strong>Laura Decor</strong> cuidamos
              cada flor, cada arco de globos y cada detalle de tu mesa principal como si fuera nuestra propia fiesta.
            </p>
            <p>
              Acompañamos a las familias en sus momentos más importantes: desde la dulce espera de un
              baby shower hasta cumpleaños, grados, aniversarios y bodas inolvidables.
            </p>
            <a href="#catalogo" className="btn-lolita-celeste">Conoce nuestros montajes</a>
          </div>

          <div className="acerca-imagen-col">
            <div className="acerca-marco-circular">
              <img src="./logo.jpeg" alt="Laura Decor" className="acerca-logo-img" />
            </div>
            <p className="acerca-frase-corazon">Laura Decor, todo empezó con el corazón.</p>
          </div>
        </div>
      </section>

      {/* Seccion Mosaico 2x2 de Servicios estilo De Lolita */}
      <section id="servicios" className="mosaico-section">
        <div className="container">
          <div className="section-heading text-center">
            <p className="eyebrow">Experiencias memorables</p>
            <h2>Nuestras Líneas de Decoración</h2>
            <p className="muted">Diseñamos ambientes cálidos y elegantes tanto en casa como en salones de eventos.</p>
          </div>

          <div className="mosaico-fila">
            <div
              className="mosaico-bloque mosaico-con-boton"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=900&q=80")'
              }}
            >
              <div className="mosaico-capa">
                <a
                  href="#catalogo"
                  className="btn-mosaico"
                  onClick={() => setCategoriaActiva('Cumpleaños')}
                >
                  Fiestas & Cumpleaños
                </a>
              </div>
            </div>

            <div
              className="mosaico-bloque mosaico-foto"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=80")'
              }}
            />
          </div>

          <div className="mosaico-fila">
            <div
              className="mosaico-bloque mosaico-foto"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80")'
              }}
            />

            <div
              className="mosaico-bloque mosaico-con-boton"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80")'
              }}
            >
              <div className="mosaico-capa">
                <a
                  href="#catalogo"
                  className="btn-mosaico"
                  onClick={() => setCategoriaActiva('Bodas')}
                >
                  Bodas, Grados & Baby Showers
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container">
        {/* Seccion 2: Catalogo de paquetes */}
        <section id="catalogo" className="panel catalogo-panel">
          <div className="section-heading text-center">
            <p className="eyebrow">Nuestro Menú de Decoración</p>
            <h2>Catálogo de Paquetes</h2>
            <p className="muted">
              Explora nuestras opciones hechas una a una con mucho amor o filtra según tu celebración.
            </p>
          </div>

          <div className="filtros-barra">
            <div className="categorias-botones">
              {['Todas', 'Cumpleaños', 'Baby Shower', 'Grados', 'Bodas'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={categoriaActiva === cat ? 'btn-principal' : 'btn-secundario'}
                  onClick={() => setCategoriaActiva(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <input
              type="text"
              className="input-busqueda"
              placeholder="Buscar paquete (ej. arco, flores, grado)..."
              value={busqueda}
              onChange={(event) => setBusqueda(event.target.value)}
            />
          </div>

          {paquetesFiltrados.length === 0 ? (
            <p className="empty">No encontramos paquetes con esa búsqueda.</p>
          ) : (
            <div className="catalogo-grid">
              {paquetesFiltrados.map((paquete) => (
                <PackageCard
                  key={paquete.id}
                  paquete={paquete}
                  onSeleccionar={(item) => setPaqueteSeleccionado(item)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Seccion 3: Cotizador interactivo */}
        <Cotizador paquetes={paquetes} paqueteInicial={paqueteSeleccionado} />

        {/* Seccion 4: Formulario de Contacto real */}
        <ContactForm onAgregarSolicitud={agregarSolicitud} />
      </main>
        </>
      )}

      <ChatbotIA paquetes={paquetes} />
      <Footer
        onAbrirAdmin={() => {
          setMostrarAdmin(true)
          window.scrollTo(0, 0)
        }}
      />
    </div>
  )
}
