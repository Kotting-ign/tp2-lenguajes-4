import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="mi-menu">
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/servicios">Servicios</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
      </ul>
    </nav>
  );
}