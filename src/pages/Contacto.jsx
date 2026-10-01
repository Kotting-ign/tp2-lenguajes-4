import FormularioContacto from '../components/FormularioContacto';

export default function Contacto() {
  return (
    <div className="page-container contacto-page">
      <header className="page-header">
        <span className="badge-pill">Cátedra Lenguaje IV</span>
        <h1 className="page-title">Contacto</h1>
        <p className="page-lead">
          Ponte en contacto con nosotros. Envía tus consultas, sugerencias o comentarios
          a través de nuestro formulario con validación en tiempo real y despacho directo a casilla de correo.
        </p>
      </header>

      <div className="contacto-layout">
        {/* Columna Izquierda: Información de contacto y contexto académico */}
        <aside className="contacto-info-panel">
          <div className="info-card highlight-card">
            <div className="card-badge">Información Académica</div>
            <h3>Universidad Católica de Salta</h3>
            <p className="info-meta">Facultad de Ingeniería · Ingeniería en Informática</p>
            <ul className="info-list">
              <li>
                <span className="info-icon">👨‍🏫</span>
                <div>
                  <strong>Docente:</strong>
                  <span>Lic. Carlos Pacheco</span>
                </div>
              </li>
              <li>
                <span className="info-icon">📚</span>
                <div>
                  <strong>Asignatura:</strong>
                  <span>Lenguaje IV</span>
                </div>
              </li>
              <li>
                <span className="info-icon">📝</span>
                <div>
                  <strong>Trabajo Práctico:</strong>
                  <span>TP Nº 3 · Formulario y Enrutamiento</span>
                </div>
              </li>
              <li>
                <span className="info-icon">👨‍💻</span>
                <div>
                  <strong>Alumno:</strong>
                  <span>Ignacio Kotting</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="info-card">
            <h4>Canales de Comunicación</h4>
            <div className="contact-methods">
              <div className="method-item">
                <span className="method-icon">📍</span>
                <div>
                  <strong>Ubicación</strong>
                  <span>Campus Castañares, Salta, Argentina</span>
                </div>
              </div>

              <div className="method-item">
                <span className="method-icon">✉</span>
                <div>
                  <strong>Correo Electrónico</strong>
                  <span>contacto@ucasal.edu.ar</span>
                </div>
              </div>

              <div className="method-item">
                <span className="method-icon">⏱</span>
                <div>
                  <strong>Horario de Atención</strong>
                  <span>Lunes a Viernes de 08:00 a 20:00 hs</span>
                </div>
              </div>
            </div>
          </div>

          <div className="info-card tip-card">
            <span className="tip-icon">💡</span>
            <div>
              <strong>Requisitos del formulario:</strong>
              <p>
                Todos los campos son obligatorios. El mensaje cuenta con un límite máximo de 300
                caracteres supervisado dinámicamente y se validan formatos de correo y nombres antes del envío.
              </p>
            </div>
          </div>
        </aside>

        {/* Columna Derecha: Componente de Formulario de Contacto */}
        <main className="contacto-form-col">
          <FormularioContacto />
        </main>
      </div>
    </div>
  );
}