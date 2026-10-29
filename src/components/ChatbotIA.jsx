import { useState } from 'react'

export default function ChatbotIA({ paquetes }) {
  const [abierto, setAbierto] = useState(false)
  const [entrada, setEntrada] = useState('')
  const [mensajes, setMensajes] = useState([
    {
      id: 'msg-1',
      autor: 'bot',
      texto:
        '¡Hola! Soy el asistente virtual de Laura Decor. Escribe un número del 1 al 5 o hazme una pregunta sobre tu evento: 1) Cumpleaños, 2) Baby Shower, 3) Grados, 4) Bodas, 5) Precios y WhatsApp.'
    }
  ])

  function obtenerRespuesta(textoUsuario) {
    const limpio = textoUsuario.trim().toLowerCase()
    let respuesta

    // Estructura switch para las opciones del bot
    switch (limpio) {
      case '1':
        respuesta =
          'Para Cumpleaños te recomendamos el paquete "Arco Básico en Casa" ($220.000 COP) si es una reunión familiar, o "Cumpleaños Glam Dorado" ($380.000 COP) con fondo circular y 3 cilindros.'
        break
      case '2':
        respuesta =
          'Para Baby Shower nuestro favorito es "Baby Shower Ternura" ($420.000 COP), que incluye panel personalizado, cubos con letras BABY, arco pastel y mesa principal.'
        break
      case '3':
        respuesta =
          'Para Grados te sugerimos "Estación de Fotos y Dulces" ($290.000 COP) o el montaje completo "Celebración de Grado" ($450.000 COP) con luces LED y birrete decorativo.'
        break
      case '4':
        respuesta =
          'Para Bodas y Aniversarios contamos con el paquete "Boda y Aniversario Especial" ($780.000 COP) con flores de lujo, telas blancas con luces cálidas y 4 centros de mesa.'
        break
      case '5':
        respuesta =
          'Nuestros paquetes van desde $220.000 COP hasta $780.000 COP. Puedes usar el Cotizador de la página o escribirnos al WhatsApp +57 302 373 0786 y en Instagram @lauradecor15.'
        break
      default:
        // Busqueda por palabras clave con .includes()
        if (limpio.includes('cumple') || limpio.includes('arco')) {
          respuesta =
            'Si buscas decoración de cumpleaños o arcos de globos, tenemos opciones desde $220.000 COP ("Arco Básico en Casa") hasta $380.000 COP ("Cumpleaños Glam Dorado").'
        } else if (limpio.includes('baby') || limpio.includes('bebe') || limpio.includes('bautizo')) {
          respuesta =
            'Para recibir a tu bebé te encantará el paquete "Baby Shower Ternura" ($420.000 COP) en tonos pastel con letras BABY y bases para postres.'
        } else if (limpio.includes('grado') || limpio.includes('graduacion') || limpio.includes('foto')) {
          respuesta =
            'Para celebrar tu grado tenemos "Estación de Fotos y Dulces" ($290.000 COP) y "Celebración de Grado" ($450.000 COP) en tonos dorado y negro.'
        } else if (limpio.includes('boda') || limpio.includes('matrimonio') || limpio.includes('aniversario')) {
          respuesta =
            'Para bodas o aniversarios te recomendamos "Boda y Aniversario Especial" ($780.000 COP), que incluye arco floral, luces cálidas y centros de mesa.'
        } else if (limpio.includes('precio') || limpio.includes('cuanto') || limpio.includes('barato') || limpio.includes('economico')) {
          respuesta =
            `Actualmente tenemos ${paquetes.length} paquetes disponibles desde $220.000 COP. Si reservas con anticipación tienes 10% de descuento en nuestra Calculadora de Cotización.`
        } else if (limpio.includes('whatsapp') || limpio.includes('contacto') || limpio.includes('telefono') || limpio.includes('instagram')) {
          respuesta =
            'Puedes escribirnos directamente al WhatsApp +57 302 373 0786, seguirnos en Instagram como @lauradecor15 o dejarnos tus datos en el formulario de Contacto.'
        } else {
          respuesta =
            'Puedo ayudarte a elegir tu decoración ideal. Escribe 1 (Cumpleaños), 2 (Baby Shower), 3 (Grados), 4 (Bodas) o 5 (Precios y contacto), o cuéntame qué evento tienes.'
        }
        break
    }

    return respuesta
  }

  function enviarMensaje(texto) {
    const textoLimpio = texto.trim()
    if (!textoLimpio) {
      return
    }

    const nuevoMensajeUsuario = {
      id: crypto.randomUUID(),
      autor: 'usuario',
      texto: textoLimpio
    }

    const textoRespuesta = obtenerRespuesta(textoLimpio)

    const nuevoMensajeBot = {
      id: crypto.randomUUID(),
      autor: 'bot',
      texto: textoRespuesta
    }

    setMensajes([...mensajes, nuevoMensajeUsuario, nuevoMensajeBot])
    setEntrada('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    enviarMensaje(entrada)
  }

  return (
    <div className="chatbot-contenedor">
      {abierto && (
        <div className="chatbot-ventana">
          <div className="chatbot-header">
            <div>
              <strong>Asistente Laura Decor IA</strong>
              <p className="chatbot-sub">Recomendador de eventos</p>
            </div>
            <button
              type="button"
              className="chatbot-cerrar"
              onClick={() => setAbierto(false)}
            >
              ✕
            </button>
          </div>

          <div className="chatbot-mensajes">
            {mensajes.map((msg) => (
              <div
                key={msg.id}
                className={msg.autor === 'bot' ? 'burbuja-chat bot' : 'burbuja-chat usuario'}
              >
                {msg.texto}
              </div>
            ))}
          </div>

          <div className="chatbot-opciones-rapidas">
            <button type="button" onClick={() => enviarMensaje('1')}>1. Cumpleaños</button>
            <button type="button" onClick={() => enviarMensaje('2')}>2. Baby Shower</button>
            <button type="button" onClick={() => enviarMensaje('3')}>3. Grados</button>
            <button type="button" onClick={() => enviarMensaje('4')}>4. Bodas</button>
            <button type="button" onClick={() => enviarMensaje('5')}>5. Precios</button>
          </div>

          <form className="chatbot-input-barra" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Escribe una opción (1-5) o tu pregunta..."
              value={entrada}
              onChange={(event) => setEntrada(event.target.value)}
            />
            <button type="submit" className="btn-principal">
              Enviar
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className="chatbot-boton-flotante"
        onClick={() => setAbierto(!abierto)}
      >
        {abierto ? 'Cerrar Asistente' : '✨ Asistente IA'}
      </button>
    </div>
  )
}
