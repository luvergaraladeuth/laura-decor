export default function PackageCard({ paquete, onSeleccionar }) {
  const imagenPaquete =
    paquete.imagen ||
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80"

  return (
    <article className={paquete.destacado ? "tarjeta-paquete destacado" : "tarjeta-paquete"}>
      <div className="tarjeta-img-box">
        <img src={imagenPaquete} alt={paquete.nombre} className="tarjeta-img" />
        <div className="tarjeta-badges">
          <span className="etiqueta-categoria">{paquete.categoria.toUpperCase()}</span>
          {paquete.destacado && <span className="etiqueta-destacado">Favorito</span>}
        </div>
      </div>

      <div className="tarjeta-body">
        <h3>{paquete.nombre}</h3>
        <p className="tarjeta-descripcion">{paquete.incluye}</p>

        <div className="tarjeta-footer">
          <p className="tarjeta-precio">${paquete.precio} COP</p>
          <a
            href="#cotizador"
            className="btn-principal"
            onClick={() => onSeleccionar(paquete)}
          >
            Cotizar paquete
          </a>
        </div>
      </div>
    </article>
  )
}
