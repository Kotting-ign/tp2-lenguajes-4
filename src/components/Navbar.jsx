import { NavLink, Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="navbar-container">
        {/* Brand / Logo */}
        <Link to="/" className="navbar-brand">
          <div className="brand-logo-icon">UC</div>
          <div className="brand-text">
            <span className="brand-title">Lenguaje IV</span>
            <span className="brand-badge">TP Nº 3</span>
          </div>
        </Link>

        {/* Navigation Menu */}
        <nav className="mi-menu" aria-label="Navegación principal">
          <ul className="navbar-links">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/servicios"
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                Servicios
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contacto"
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                Contacto
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Call to action / GitHub Link */}
        <div className="navbar-extra">
          <Link to="/contacto" className="btn btn-primary btn-sm nav-cta">
            Escribinos ✉
          </Link>
        </div>
      </div>
    </header>
  );
}