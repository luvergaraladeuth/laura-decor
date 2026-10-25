import { useState } from 'react'

export default function AdminPanel({
  paquetes,
  setPaquetes,
  solicitudes,
  setSolicitudes,
  onCerrarSesion
}) {
  const [nombre, setNombre] = useState('')
  const [categoria, setCategoria] = useState('Cumpleaños')
  const [precio, setPrecio] = useState('')
  const [imagen, setImagen] = useState('')
  const [incluye, setIncluye] = useState('')
  const [destacado, setDestacado] = useState(false)

  function handleAgregarPaquete(event) {
    event.preventDefault()

    const nombreLimpio = nombre.trim()
    const incluyeLimpio = incluye.trim()

    if (!nombreLimpio || !precio || !incluyeLimpio) {
      return
    }

    const nuevoPaquete = {
      id: crypto.randomUUID(),
      nombre: nombreLimpio,
      categoria: categoria,
      precio: Number(precio),
      imagen:
        imagen.trim() ||
        'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
      incluye: incluyeLimpio,
      destacado: destacado
    }

    setPaquetes([nuevoPaquete, ...paquetes])

    setNombre('')
    setCategoria('Cumpleaños')
    setPrecio('')
    setImagen('')
    setIncluye('')
    setDestacado(false)
  }

  function handleToggleDestacado(id) {
    const actualizados = paquetes.map((item) =>
      item.id === id ? { ...item, destacado: !item.destacado } : item
    )
    setPaquetes(actualizados)
  }

  function handleEliminarPaquete(id) {
    const filtrados = paquetes.filter((item) => item.id !== id)
    setPaquetes(filtrados)
  }

  function handleToggleSolicitud(id) {
    const actualizadas = solicitudes.map((sol) =>
      sol.id === id ? { ...sol, atendido: !sol.atendido } : sol
    )
    setSolicitudes(actualizadas)
  }

  function handleEliminarSolicitud(id) {
    const filtradas = solicitudes.filter((sol) => sol.id !== id)
    setSolicitudes(filtradas)
  }

  return (
    <div className="admin-wrapper">
      <section className="panel admin-header-panel">
        <div>
          <p className="eyebrow">Zona de gestión interna</p>
          <h2>Panel Administrador – Laura Decor</h2>
          <p className="muted">
            Aquí puedes revisar las cotizaciones enviadas por clientes y agregar o eliminar paquetes del catálogo.
          </p>
        </div>

        <button type="button" className="btn-secundario" onClick={onCerrarSesion}>
          Cerrar sesión
        </button>
      </section>

      {/* Bloque 1: Solicitudes de Contacto recibidas */}
      <section className="panel">
        <div className="section-heading">
          <p className="eyebrow">Mensajes de clientes</p>
          <h2>Solicitudes de Contacto ({solicitudes.length})</h2>
        </div>

        {solicitudes.length === 0 ? (
          <p className="empty">No hay solicitudes pendientes en este momento.</p>
        ) : (
          <div className="admin-lista">
            {solicitudes.map((sol) => (
              <article
                key={sol.id}
                className={sol.atendido ? 'admin-item completado' : 'admin-item'}
              >
                <div className="admin-item-info">
                  <h4>
                    {sol.nombre} <span className="etiqueta-categoria">{sol.tipoEvento}</span>
                  </h4>
                  <p>
                    <strong>WhatsApp:</strong> {sol.telefono} | <strong>Fecha evento:</strong> {sol.fechaEvento}
                  </p>
                  <p className="muted">{sol.mensaje}</p>
                </div>

                <div className="admin-item-acciones">
                  <button
                    type="button"
                    className="btn-secundario"
                    onClick={() => handleToggleSolicitud(sol.id)}
                  >
                    {sol.atendido ? 'Marcar pendiente' : 'Marcar atendida'}
                  </button>
                  <button
                    type="button"
                    className="btn-eliminar"
                    onClick={() => handleEliminarSolicitud(sol.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Bloque 2: Agregar nuevo paquete y gestionar el catalogo */}
      <section className="panel">
        <div className="section-heading">
          <p className="eyebrow">Gestión del catálogo</p>
          <h2>Agregar nuevo paquete de decoración</h2>
        </div>

        <form className="admin-form" onSubmit={handleAgregarPaquete}>
          <div className="campos-dobles">
            <div className="campo-grupo">
              <label htmlFor="nuevo-nombre">Nombre del paquete:</label>
              <input
                id="nuevo-nombre"
                type="text"
                placeholder="Ej. Fiesta Infantil Safari"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
              />
            </div>

            <div className="campo-grupo">
              <label htmlFor="nuevo-categoria">Categoría:</label>
              <select
                id="nuevo-categoria"
                value={categoria}
                onChange={(event) => setCategoria(event.target.value)}
              >
                <option value="Cumpleaños">Cumpleaños</option>
                <option value="Baby Shower">Baby Shower</option>
                <option value="Grados">Grados</option>
                <option value="Bodas">Bodas</option>
              </select>
            </div>
          </div>

          <div className="campos-dobles">
            <div className="campo-grupo">
              <label htmlFor="nuevo-precio">Precio en pesos (COP):</label>
              <input
                id="nuevo-precio"
                type="number"
                placeholder="Ej. 350000"
                value={precio}
                onChange={(event) => setPrecio(event.target.value)}
              />
            </div>

            <div className="campo-grupo">
              <label htmlFor="nuevo-imagen">URL de foto (opcional):</label>
              <input
                id="nuevo-imagen"
                type="text"
                placeholder="https://..."
                value={imagen}
                onChange={(event) => setImagen(event.target.value)}
              />
            </div>
          </div>

          <div className="campo-grupo">
            <label htmlFor="nuevo-incluye">¿Qué incluye este paquete?:</label>
            <textarea
              id="nuevo-incluye"
              rows="3"
              placeholder="Describe los elementos del montaje..."
              value={incluye}
              onChange={(event) => setIncluye(event.target.value)}
            />
          </div>

          <div className="campo-check">
            <input
              id="nuevo-destacado"
              type="checkbox"
              checked={destacado}
              onChange={(event) => setDestacado(event.target.checked)}
            />
            <label htmlFor="nuevo-destacado">Marcar como paquete Favorito / Destacado</label>
          </div>

          <button type="submit" className="btn-principal" style={{ marginTop: '14px' }}>
            Guardar paquete en el catálogo
          </button>
        </form>

        <div className="section-heading" style={{ marginTop: '32px' }}>
          <h3>Paquetes actuales ({paquetes.length})</h3>
        </div>

        <div className="admin-lista">
          {paquetes.map((item) => (
            <article key={item.id} className="admin-item">
              <div className="admin-item-info">
                <h4>
                  {item.nombre} — <strong>${item.precio} COP</strong>
                </h4>
                <p className="muted">
                  Categoría: {item.categoria} | {item.destacado ? 'Destacado' : 'Estándar'}
                </p>
              </div>

              <div className="admin-item-acciones">
                <button
                  type="button"
                  className="btn-secundario"
                  onClick={() => handleToggleDestacado(item.id)}
                >
                  {item.destacado ? 'Quitar destacado' : 'Destacar'}
                </button>
                <button
                  type="button"
                  className="btn-eliminar"
                  onClick={() => handleEliminarPaquete(item.id)}
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
