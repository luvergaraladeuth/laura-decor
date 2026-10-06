import { useState, useEffect } from 'react'
import {
  calcularPrecioConDescuento,
  calcularTotalPedido,
  calcularPrecioConImpuesto
} from '../utils/calculadora.js'

export default function Cotizador({ paquetes, paqueteInicial }) {
  const [idPaquete, setIdPaquete] = useState(paqueteInicial ? paqueteInicial.id : '1')
  const [cantidad, setCantidad] = useState(1)
  const [envio, setEnvio] = useState(40000)
  const [descuento, setDescuento] = useState(0)
  const [incluirIva, setIncluirIva] = useState(false)

  useEffect(() => {
    if (paqueteInicial && paqueteInicial.id) {
      setIdPaquete(paqueteInicial.id)
    }
  }, [paqueteInicial])

  const paqueteActual =
    paquetes.find((item) => item.id === idPaquete) || paquetes[0] || { nombre: 'Paquete', precio: 0 }

  // Calculo usando las 3 funciones de calculadora.js
  const precioConDescuento = calcularPrecioConDescuento(paqueteActual.precio, Number(descuento))
  const subtotalPedido = calcularTotalPedido(precioConDescuento, Number(cantidad), Number(envio))
  const totalFinal = incluirIva
    ? calcularPrecioConImpuesto(subtotalPedido, 19)
    : subtotalPedido

  return (
    <section id="cotizador" className="panel cotizador-panel">
      <div className="section-heading text-center">
        <p className="eyebrow">Presupuesto al instante</p>
        <h2>Calculadora de Cotización</h2>
        <p className="muted">
          Selecciona el paquete que más te guste y calcula el valor estimado de tu montaje.
        </p>
      </div>

      <div className="cotizador-grid">
        <div className="cotizador-controles">
          <div className="campo-grupo">
            <label htmlFor="select-paquete">1. Paquete de decoración:</label>
            <select
              id="select-paquete"
              value={idPaquete}
              onChange={(event) => setIdPaquete(event.target.value)}
            >
              {paquetes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nombre} (${item.precio} COP)
                </option>
              ))}
            </select>
          </div>

          <div className="campo-grupo">
            <label htmlFor="input-cantidad">2. Cantidad de estaciones / montajes:</label>
            <input
              id="input-cantidad"
              type="number"
              min="1"
              max="10"
              value={cantidad}
              onChange={(event) => setCantidad(event.target.value)}
            />
          </div>

          <div className="campo-grupo">
            <label htmlFor="select-envio">3. Zona de transporte y montaje:</label>
            <select
              id="select-envio"
              value={envio}
              onChange={(event) => setEnvio(event.target.value)}
            >
              <option value={0}>Recoger decoración en tienda ($0 COP)</option>
              <option value={40000}>Zona Urbana - Transporte y montaje ($40.000 COP)</option>
              <option value={75000}>Alrededores / Salón campestre ($75.000 COP)</option>
            </select>
          </div>

          <div className="campo-grupo">
            <label htmlFor="select-descuento">4. Promoción especial:</label>
            <select
              id="select-descuento"
              value={descuento}
              onChange={(event) => setDescuento(event.target.value)}
            >
              <option value={0}>Tarifa estándar (Sin descuento)</option>
              <option value={10}>Reserva anticipada - 10% de descuento</option>
              <option value={15}>Evento entre semana (Martes a Jueves) - 15% de descuento</option>
            </select>
          </div>

          <div className="campo-check">
            <input
              id="check-iva"
              type="checkbox"
              checked={incluirIva}
              onChange={(event) => setIncluirIva(event.target.checked)}
            />
            <label htmlFor="check-iva">Incluir factura electrónica con IVA (19%)</label>
          </div>
        </div>

        <div className="cotizador-resumen">
          <p className="eyebrow">Resumen de tu evento</p>
          <h3>{paqueteActual.nombre}</h3>

          <div className="resumen-fila">
            <span>Precio base del paquete:</span>
            <strong>${paqueteActual.precio} COP</strong>
          </div>

          <div className="resumen-fila">
            <span>Precio con descuento ({descuento}%):</span>
            <strong>${precioConDescuento} COP</strong>
          </div>

          <div className="resumen-fila">
            <span>Cantidad de montajes:</span>
            <strong>x {cantidad}</strong>
          </div>

          <div className="resumen-fila">
            <span>Transporte e instalación:</span>
            <strong>${envio} COP</strong>
          </div>

          <div className="resumen-fila">
            <span>Subtotal del pedido:</span>
            <strong>${subtotalPedido} COP</strong>
          </div>

          <div className="resumen-total">
            <span>Total estimado:</span>
            <strong>${Math.round(totalFinal)} COP</strong>
          </div>

          <div className="resumen-acciones">
            <a href="#contacto" className="btn-lolita-amarillo">
              Reservar esta fecha
            </a>
            <a
              href={`https://wa.me/573023730786?text=Hola%20Laura%20Decor,%20quiero%20cotizar%20el%20paquete%20${paqueteActual.nombre}%20por%20un%20total%20estimado%20de%20$${Math.round(totalFinal)}%20COP`}
              target="_blank"
              rel="noreferrer"
              className="btn-lolita-blanco"
            >
              Enviar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
