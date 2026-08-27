import { useState } from 'react'
import Header from './components/Header.jsx'

export default function App() {
  const [mostrarAdmin, setMostrarAdmin] = useState(false)

  return (
    <div>
      <Header mostrarAdmin={mostrarAdmin} setMostrarAdmin={setMostrarAdmin} />
      <main className="container">
        <h1>Laura Decor</h1>
        <p>Decoración de eventos y fiestas especiales</p>
      </main>
    </div>
  )
}
