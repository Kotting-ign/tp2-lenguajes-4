import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inicio from './pages/Inicio';
import Servicios from './pages/Servicios';
import Contacto from './pages/Contacto';
import './App.css';

export default function App() {
  // En Vite con GitHub Pages, import.meta.env.BASE_URL toma el valor de vite.config.js (ej: '/tp2-lenguajes-4/')
  const baseUrl = import.meta.env.BASE_URL || '/';

  return (
    <BrowserRouter basename={baseUrl}>
      <div className="app-wrapper">
        <Navbar />

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/contacto" element={<Contacto />} />
            {/* Ruta comodín para redirigir al inicio en caso de 404 */}
            <Route path="*" element={<Inicio />} />
          </Routes>
        </main>

        <footer className="site-footer">
          <div className="footer-container">
            <div className="footer-col footer-about">
              <div className="footer-brand">
                <span className="footer-brand-icon">UC</span>
                <div>
                  <h4>Lenguaje IV · TP Nº 3</h4>
                  <p>Universidad Católica de Salta</p>
                </div>
              </div>
              <p className="footer-desc">
                Proyecto desarrollado por <strong>Ignacio Kotting</strong> para la cátedra de Lenguaje IV,
                a cargo del docente <strong>Lic. Carlos Pacheco</strong>.
              </p>
            </div>

            <div className="footer-col">
              <h5>Navegación</h5>
              <ul className="footer-links">
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/servicios">Servicios</Link></li>
                <li><Link to="/contacto">Contacto y Formulario</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h5>Enlaces y Recursos</h5>
              <ul className="footer-links">
                <li>
                  <a
                    href="https://github.com/Kotting-ign/tp2-lenguajes-4"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Repositorio GitHub ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://Kotting-ign.github.io/tp2-lenguajes-4/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub Pages Online ↗
                  </a>
                </li>
                <li>
                  <a href="https://www.ucasal.edu.ar" target="_blank" rel="noreferrer">
                    Portal UCASAL ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              © {new Date().getFullYear()} UCASAL · Facultad de Ingeniería · Trabajo Práctico Nº 3
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}