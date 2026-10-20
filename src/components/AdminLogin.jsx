import { useState } from 'react'

// Las credenciales se leen desde el archivo .env (que esta en .gitignore)
const ADMIN_USER = import.meta.env.VITE_ADMIN_USER
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS

export default function AdminLogin({ onLoginExitoso, onCancelar }) {
  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')
  const [error, setError] = useState('')

  function handleLogin(event) {
    event.preventDefault()

    if (usuario.trim().toLowerCase() === ADMIN_USER && clave.trim() === ADMIN_PASS) {
      setError('')
      onLoginExitoso()
    } else {
      setError('Usuario o contraseña incorrectos. Intenta de nuevo.')
    }
  }

  return (
    <section className="panel login-panel">
      <div className="login-box">
        <p className="eyebrow">Acceso interno</p>
        <h2>Ingreso al Panel Admin</h2>
        <p className="muted">
          Zona exclusiva para administrar los paquetes del catálogo y revisar las solicitudes de clientes.
        </p>

        {error && <p className="alerta-error">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="campo-grupo">
            <label htmlFor="admin-user">Usuario:</label>
            <input
              id="admin-user"
              type="text"
              placeholder="Ingresa tu usuario"
              value={usuario}
              onChange={(event) => setUsuario(event.target.value)}
            />
          </div>

          <div className="campo-grupo">
            <label htmlFor="admin-pass">Contraseña:</label>
            <input
              id="admin-pass"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={clave}
              onChange={(event) => setClave(event.target.value)}
            />
          </div>

          <div className="login-botones">
            <button type="submit" className="btn-lolita-amarillo">
              Iniciar sesión
            </button>
            <button type="button" className="btn-secundario" onClick={onCancelar}>
              Volver a la página
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
