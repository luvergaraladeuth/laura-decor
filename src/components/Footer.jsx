export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-col">
          <div className="footer-brand">
            <img src="./logo.jpeg" alt="Laura Decor" className="footer-logo" />
            <div>
              <p className="footer-title">Laura Decor</p>
              <p className="footer-tagline">Experiencias memorables hechas una a una con mucho amor.</p>
            </div>
          </div>
          <p className="footer-text">
            Síguenos en nuestras redes y entérate de todas nuestras novedades:
          </p>
          <div className="footer-socials">
            <a
              href="https://instagram.com/lauradecor15"
              target="_blank"
              rel="noreferrer"
              className="social-circle"
            >
              IG
            </a>
            <a
              href="https://wa.me/573023730786"
              target="_blank"
              rel="noreferrer"
              className="social-circle"
            >
              WA
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Nuestros Servicios</h4>
          <ul className="footer-list">
            <li><a href="#catalogo">Decoración de Cumpleaños</a></li>
            <li><a href="#catalogo">Baby Showers y Bautizos</a></li>
            <li><a href="#catalogo">Grados y Aniversarios</a></li>
            <li><a href="#catalogo">Bodas y Recepciones</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Contacto Directo</h4>
          <p className="footer-text"><strong>WhatsApp:</strong> +57 302 373 0786</p>
          <p className="footer-text"><strong>Instagram:</strong> @lauradecor15</p>
          <p className="footer-text"><strong>Atención:</strong> Lunes a Sábado (8:00 am – 7:00 pm)</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright © 2026 Laura Decor – Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
