export default function PackageCard({ paquete, onSeleccionar }) {
  return (
    <article className={paquete.destacado ? "tarjeta-paquete destacado" : "tarjeta-paquete"}>
      <div className="tarjeta-header">
        <span className="etiqueta-categoria">{paquete.categoria.toUpperCase()}</span>
        {paquete.destacado && <span className="etiqueta-destacado">Más pedido</span>}
      </div>

      <h3>{paquete.nombre}</h3>
      <p className="tarjeta-descripcion">{paquete.incluye}</p>

      <div className="tarjeta-footer">
        <p className="tarjeta-precio">${paquete.precio} COP</p>
        <a
          href="#cotizador"
          className="btn-principal"
          onClick={() => onSeleccionar(paquete)}
        >
          Calcular precio
        </a>
      </div>
    </article>
  )
}
