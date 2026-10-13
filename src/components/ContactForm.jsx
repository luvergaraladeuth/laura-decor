import { useState } from 'react'

export default function ContactForm({ onAgregarSolicitud }) {
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [tipoEvento, setTipoEvento] = useState('Cumpleaños')
  const [fechaEvento, setFechaEvento] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')
  const [enviado, setEnviado] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()

    const nombreLimpio = nombre.trim()
    const telefonoLimpio = telefono.trim()
    const mensajeLimpio = mensaje.trim()

    if (!nombreLimpio || !telefonoLimpio || !mensajeLimpio) {
      setError('Por favor completa tu nombre, WhatsApp y los detalles de tu celebración.')
      setEnviado(false)
      return
    }

    const nuevaSolicitud = {
      id: crypto.randomUUID(),
      nombre: nombreLimpio,
      telefono: telefonoLimpio,
      tipoEvento: tipoEvento,
      fechaEvento: fechaEvento || 'Por definir',
      mensaje: mensajeLimpio,
      atendido: false
    }

    onAgregarSolicitud(nuevaSolicitud)

    setNombre('')
    setTelefono('')
    setTipoEvento('Cumpleaños')
    setFechaEvento('')
    setMensaje('')
    setError('')
    setEnviado(true)
  }

  return (
    <section id="contacto" className="panel contacto-panel">
      <div className="contacto-grid">
        <div className="contacto-info-col">
          <p className="eyebrow">Hablemos de tu celebración</p>
          <h2>Contáctenos</h2>
          <p className="intro">
            Cuéntanos qué fecha tienes en mente, qué colores te gustan y en qué lugar será tu evento.
            Te responderemos con una propuesta pensada especialmente para ti.
          </p>

          <div className="contacto-tarjetas-mini">
            <div className="contacto-item">
              <h4>WhatsApp Directo</h4>
              <p>+57 302 373 0786</p>
            </div>

            <div className="contacto-item">
              <h4>Instagram</h4>
              <p>@lauradecor15</p>
            </div>

            <div className="contacto-item">
              <h4>Horario de Atención</h4>
              <p>Lunes a Sábado: 8:00 am – 7:00 pm</p>
            </div>
          </div>
        </div>

        <form className="contacto-form" onSubmit={handleSubmit}>
          <h3>Agenda tu cotización</h3>

          {error && <p className="alerta-error">{error}</p>}
          {enviado && (
            <p className="alerta-exito">
              ¡Gracias por escribirnos! Tu solicitud quedó registrada en nuestro sistema y te contactaremos pronto.
            </p>
          )}

          <div className="campo-grupo">
            <label htmlFor="contacto-nombre">Tu nombre completo:</label>
            <input
              id="contacto-nombre"
              type="text"
              placeholder="Ej. Camila Gómez"
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
            />
          </div>

          <div className="campo-grupo">
            <label htmlFor="contacto-telefono">Número de WhatsApp / Teléfono:</label>
            <input
              id="contacto-telefono"
              type="text"
              placeholder="Ej. 300 123 4567"
              value={telefono}
              onChange={(event) => setTelefono(event.target.value)}
            />
          </div>

          <div className="campos-dobles">
            <div className="campo-grupo">
              <label htmlFor="contacto-tipo">Tipo de celebración:</label>
              <select
                id="contacto-tipo"
                value={tipoEvento}
                onChange={(event) => setTipoEvento(event.target.value)}
              >
                <option value="Cumpleaños">Cumpleaños</option>
                <option value="Baby Shower">Baby Shower</option>
                <option value="Grados">Grado</option>
                <option value="Bodas">Boda / Aniversario</option>
                <option value="Otro evento">Otro evento</option>
              </select>
            </div>

            <div className="campo-grupo">
              <label htmlFor="contacto-fecha">Fecha del evento:</label>
              <input
                id="contacto-fecha"
                type="date"
                value={fechaEvento}
                onChange={(event) => setFechaEvento(event.target.value)}
              />
            </div>
          </div>

          <div className="campo-grupo">
            <label htmlFor="contacto-mensaje">Cuéntanos qué idea o temática quieres:</label>
            <textarea
              id="contacto-mensaje"
              rows="4"
              placeholder="Ej. Quiero un arco en tonos beige y dorado para 30 invitados..."
              value={mensaje}
              onChange={(event) => setMensaje(event.target.value)}
            />
          </div>

          <button type="submit" className="btn-lolita-amarillo btn-ancho">
            Enviar solicitud
          </button>
        </form>
      </div>
    </section>
  )
}
