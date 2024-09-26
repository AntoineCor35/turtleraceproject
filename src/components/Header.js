import { Link } from 'react-router-dom';
import logo from '../styles/visuals/logo.png';

const Header = ({ isAuthenticated, onLogout }) => {
    
    return (
    <header>
      {/* Le logo renvoie vers la racine ("/") */}
      <Link to="/">
        <img src={logo} height={100} alt="Logo" />
      </Link>
      
      {isAuthenticated && (
        <>
          <Link to="/account" className="btn">Mon Compte</Link> {/* Lien vers la page de compte */}
          <button className="logout" onClick={onLogout}>
            Se déconnecter
          </button>
        </>
      )}
    </header>
  );
};

export default Header;
