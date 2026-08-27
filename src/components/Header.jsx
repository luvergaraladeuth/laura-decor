export default function Header({ mostrarAdmin, setMostrarAdmin }) {
  return (
    <header className="header">
      <div className="container header-content">
        <a href="#inicio" className="brand" onClick={() => setMostrarAdmin(false)}>
          <img src="./logo.jpeg" alt="Logo Laura Decor" className="brand-logo" />
          <div>
            <span className="brand-title">Laura Decor</span>
            <p className="muted">Decoración de eventos y fiestas</p>
          </div>
        </a>

        <nav className="nav-links">
          <a href="#inicio" onClick={() => setMostrarAdmin(false)}>Inicio</a>
          <a href="#catalogo" onClick={() => setMostrarAdmin(false)}>Catálogo</a>
          <a href="#cotizador" onClick={() => setMostrarAdmin(false)}>Cotizador</a>
          <a href="#contacto" onClick={() => setMostrarAdmin(false)}>Contacto</a>
          <button
            type="button"
            className="btn-secundario"
            onClick={() => setMostrarAdmin(!mostrarAdmin)}
          >
            {mostrarAdmin ? "Ver Página" : "Panel Admin"}
          </button>
        </nav>
      </div>
    </header>
  )
}
