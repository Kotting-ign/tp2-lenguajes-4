import { Link } from 'react-router-dom';

export default function Inicio() {
  return (
    <div className="page-container inicio-page">
      {/* Hero Section */}
      <section className="hero-banner">
        <div className="hero-content">
          <div className="hero-badge">Universidad Católica de Salta · Lenguaje IV</div>
          <h1 className="hero-title">
            Trabajo Práctico Nº 3 <br />
            <span className="gradient-text">Formularios y Validaciones en React</span>
          </h1>
          <p className="hero-description">
            Proyecto desarrollado para la cátedra de Lenguaje IV de la carrera de Ingeniería en Informática.
            Incluye enrutamiento SPA, un sistema completo de validación de entradas de usuario,
            restricción de longitud de mensaje, y reenvío directo a casillas de correo electrónico.
          </p>
          <div className="hero-actions">
            <Link to="/contacto" className="btn btn-primary btn-lg">
              Ir a la Página de Contacto <span>→</span>
            </Link>
            <Link to="/servicios" className="btn btn-outline btn-lg">
              Conocer Servicios
            </Link>
          </div>
        </div>

        <div className="hero-card-preview">
          <div className="code-card">
            <div className="code-card-header">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
              <span className="code-title">UCASAL · Ficha Técnica</span>
            </div>
            <div className="code-card-body">
              <div className="code-line">
                <span className="code-key">institución:</span> <span className="code-str">"UCASAL"</span>
              </div>
              <div className="code-line">
                <span className="code-key">carrera:</span> <span className="code-str">"Ingeniería en Informática"</span>
              </div>
              <div className="code-line">
                <span className="code-key">materia:</span> <span className="code-str">"Lenguaje IV"</span>
              </div>
              <div className="code-line">
                <span className="code-key">profesor:</span> <span className="code-str">"Lic. Carlos Pacheco"</span>
              </div>
              <div className="code-line">
                <span className="code-key">alumno:</span> <span className="code-str">"Ignacio Kotting"</span>
              </div>
              <div className="code-line">
                <span className="code-key">trabajo:</span> <span className="code-str">"TP Nº 3 (Ampliación TP2)"</span>
              </div>
              <div className="code-line">
                <span className="code-key">estado:</span> <span className="code-status">"Completado y Desplegado"</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Características / Objetivos del TP3 */}
      <section className="features-section">
        <div className="section-header">
          <span className="badge-pill">Requisitos del TP3</span>
          <h2 className="section-title">Objetivos y Funcionalidades Desarrolladas</h2>
          <p className="section-subtitle">
            Implementación sobre la base del TP2 con nuevas tecnologías y validaciones avanzadas.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✉</div>
            <h3>Formulario de Contacto</h3>
            <p>
              Componente modular integrado en la ruta <code>/contacto</code>, solicitando Nombre y Apellido,
              Correo Electrónico y Mensaje detallado.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Validaciones Personalizadas</h3>
            <p>
              Control en tiempo real de cada campo con expresiones regulares, mensajes de error contextuales
              e indicadores visuales de éxito o corrección.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📏</div>
            <h3>Límite de 300 Caracteres</h3>
            <p>
              Supervisión de longitud máxima en el mensaje con contador dinámico y barra de progreso que
              alerta al usuario al aproximarse o alcanzar el límite.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Reenvío de Correo</h3>
            <p>
              Integración con EmailJS y servicio directo para permitir enviar el mensaje a cualquier
              casilla de correo electrónico especificada.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🧭</div>
            <h3>React Router 7</h3>
            <p>
              Navegación fluida de una sola página (SPA) con rutas sincronizadas, estado activo en la barra
              de navegación y compatibilidad con GitHub Pages.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌐</div>
            <h3>GitHub Pages</h3>
            <p>
              Automatización de compilación con Vite y publicación continua en la plataforma de GitHub Pages
              para su evaluación online.
            </p>
          </div>
        </div>
      </section>

      {/* Call to action final */}
      <section className="cta-banner">
        <h2>¿Deseas probar el formulario en funcionamiento?</h2>
        <p>Visita la sección de contacto y envía un mensaje de prueba con cualquier correo electrónico.</p>
        <Link to="/contacto" className="btn btn-primary btn-lg">
          Probar Formulario de Contacto
        </Link>
      </section>
    </div>
  );
}