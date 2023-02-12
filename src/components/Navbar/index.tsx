import { Link } from 'react-router-dom'
import './styles.css';

const Navbar = () => {
  return (
    <nav className="container-fluid p-0 primary-bg-color">
      <div className="container d-flex align-items-center justify-content-between" id="links-container">
        <Link to="/" className="text-black" id="banner-link">MovieFlix</Link>
        {/*{ authenticated && <Link to="/logout" className="text-black" id="logout-link">Sair</Link> } */}

      </div>
    </nav>
  );
}

export default Navbar;
