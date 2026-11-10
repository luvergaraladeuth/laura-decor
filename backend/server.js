import express from 'express'
import cors from 'cors'
import { initialPackages } from '../src/data/initialPackages.js'

const app = express()
const PORT = 3000

// Middlewares para permitir conexion con el Frontend (CORS) y leer JSON
app.use(cors())
app.use(express.json())

// Datos en memoria del servidor
let paquetes = [...initialPackages]
let solicitudesContacto = []

// 1. Ruta GET para obtener los paquetes del catalogo
app.get('/api/paquetes', (req, res) => {
  res.json(paquetes)
})

// 2. Ruta POST para agregar un nuevo paquete desde el Panel Admin
app.post('/api/paquetes', (req, res) => {
  const { nombre, categoria, precio, imagen, incluye, destacado } = req.body

  if (!nombre || !precio || !incluye) {
    return res.status(400).json({ error: 'Faltan datos obligatorios del paquete' })
  }

  const nuevoPaquete = {
    id: String(Date.now()),
    nombre,
    categoria: categoria || 'Cumpleaños',
    precio: Number(precio),
    imagen: imagen || '',
    incluye,
    destacado: Boolean(destacado)
  }

  paquetes.unshift(nuevoPaquete)
  res.status(201).json(nuevoPaquete)
})

// 3. Ruta GET para ver las solicitudes de contacto en el Panel Admin
app.get('/api/contacto', (req, res) => {
  res.json(solicitudesContacto)
})

// 4. Ruta POST que recibe los datos del formulario de Contacto
app.post('/api/contacto', (req, res) => {
  const { nombre, telefono, tipoEvento, fechaEvento, mensaje } = req.body

  if (!nombre || !telefono || !mensaje) {
    return res.status(400).json({ error: 'Nombre, telefono y mensaje son obligatorios' })
  }

  const nuevaSolicitud = {
    id: String(Date.now()),
    nombre,
    telefono,
    tipoEvento: tipoEvento || 'Cumpleaños',
    fechaEvento: fechaEvento || 'Por definir',
    mensaje,
    atendido: false
  }

  solicitudesContacto.unshift(nuevaSolicitud)
  res.status(201).json({
    mensaje: 'Solicitud recibida correctamente en el servidor',
    solicitud: nuevaSolicitud
  })
})

app.listen(PORT, () => {
  // Servidor escuchando en http://localhost:3000
})
