export default function Header({ setMostrarAdmin }) {
  return (
    <header className="header">
      <div className="container header-content">
        <a href="#inicio" className="brand" onClick={() => setMostrarAdmin(false)}>
          <img src="./logo.jpeg" alt="Logo Laura Decor" className="brand-logo" />
          <div>
            <span className="brand-title">Laura Decor</span>
            <p className="brand-subtitle">Decoramos con el corazón</p>
          </div>
        </a>

        <nav className="nav-links">
          <a href="#inicio" onClick={() => setMostrarAdmin(false)}>Inicio</a>
          <a href="#acerca" onClick={() => setMostrarAdmin(false)}>Acerca de</a>
          <a href="#servicios" onClick={() => setMostrarAdmin(false)}>Servicios</a>
          <a href="#catalogo" onClick={() => setMostrarAdmin(false)}>Catálogo</a>
          <a href="#cotizador" onClick={() => setMostrarAdmin(false)}>Cotizador</a>
          <a href="#contacto" className="btn-header-pill" onClick={() => setMostrarAdmin(false)}>
            Contacto
          </a>
        </nav>
      </div>
    </header>
  )
}
