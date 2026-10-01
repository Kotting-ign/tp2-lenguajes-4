import { Link } from 'react-router-dom';

export default function Servicios() {
  const servicios = [
    {
      id: 1,
      icono: '💻',
      titulo: 'Desarrollo Web Frontend',
      subtitulo: 'React, Single Page Applications y Modern JS',
      descripcion:
        'Construcción de interfaces interactivas, modulares y de alto rendimiento utilizando React 19, Vite, y arquitectura de componentes reutilizables.',
      etiquetas: ['React', 'Vite', 'React Router', 'HTML5/CSS3']
    },
    {
      id: 2,
      icono: '🛡',
      titulo: 'Validación y Seguridad en Formularios',
      subtitulo: 'Validaciones cliente-servidor y UX interactiva',
      descripcion:
        'Diseño de formularios controlados con validaciones avanzadas, sanitización de datos, expresiones regulares y feedback instantáneo al usuario.',
      etiquetas: ['Formularios', 'Regex', 'Control de Estado', 'UX']
    },
    {
      id: 3,
      icono: '📬',
      titulo: 'Integración de Servicios de Correo',
      subtitulo: 'EmailJS, APIs REST y Despacho Automatizado',
      descripcion:
        'Conexión de aplicaciones web con servicios de mensajería electrónica directa, permitiendo notificaciones en tiempo real sin requerir un servidor dedicado.',
      etiquetas: ['EmailJS', 'APIs REST', 'Fetch', 'Notificaciones']
    },
    {
      id: 4,
      icono: '📱',
      titulo: 'Diseño Responsivo y UI/UX',
      subtitulo: 'Experiencias adaptables a móviles, tablets y escritorios',
      descripcion:
        'Maquetación fluida y accesible con CSS moderno (Grid, Flexbox, variables CSS, micro-interacciones) garantizando óptima visualización en cualquier pantalla.',
      etiquetas: ['Mobile First', 'CSS Grid', 'Flexbox', 'Accesibilidad']
    },
    {
      id: 5,
      icono: '☁️',
      titulo: 'Despliegue y CI/CD en GitHub Pages',
      subtitulo: 'Publicación automatizada y control de versiones',
      descripcion:
        'Configuración de repositorios Git, flujos de empaquetado de producción con Vite y despliegue continuo en la nube para acceso público inmediato.',
      etiquetas: ['Git', 'GitHub Pages', 'Deploy', 'Vite Build']
    },
    {
      id: 6,
      icono: '⚡',
      titulo: 'Optimización y Rendimiento Web',
      subtitulo: 'Carga rápida, Core Web Vitals y mejores prácticas',
      descripcion:
        'Auditoría y optimización de código, minimización de dependencias innecesarias, carga diferida de recursos y cumplimiento de estándares web actuales.',
      etiquetas: ['Performance', 'Clean Code', 'SPA', 'Vite']
    }
  ];

  return (
    <div className="page-container servicios-page">
      <header className="page-header">
        <span className="badge-pill">Propuesta Profesional</span>
        <h1 className="page-title">Nuestros Servicios</h1>
        <p className="page-lead">
          Soluciones de desarrollo de software e ingeniería informática enfocadas en calidad,
          diseño de experiencia de usuario y arquitectura web moderna.
        </p>
      </header>

      <div className="servicios-grid">
        {servicios.map((s) => (
          <article key={s.id} className="servicio-card">
            <div className="servicio-header">
              <span className="servicio-icono">{s.icono}</span>
              <span className="servicio-id">0{s.id}</span>
            </div>
            <h3 className="servicio-titulo">{s.titulo}</h3>
            <span className="servicio-subtitulo">{s.subtitulo}</span>
            <p className="servicio-descripcion">{s.descripcion}</p>
            <div className="servicio-tags">
              {s.etiquetas.map((tag, idx) => (
                <span key={idx} className="tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <section className="cta-banner" style={{ marginTop: '3.5rem' }}>
        <h2>¿Tienes un proyecto o consulta en mente?</h2>
        <p>Estamos a tu disposición para brindarte asesoramiento técnico y académico.</p>
        <Link to="/contacto" className="btn btn-primary btn-lg">
          Contáctanos Ahora <span>→</span>
        </Link>
      </section>
    </div>
  );
}