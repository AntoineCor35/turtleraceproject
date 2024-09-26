import { Link } from 'react-router-dom';
import logo from '../styles/visuals/logo.png';
import '../styles/Header.css'

const Header = ({ isAuthenticated, onLogout }) => {
    
    return (
    <header>
      {/* Le logo renvoie vers la racine ("/") */}
        <div className='header'>
          <Link to="/">
            <img className='logo' src={logo} height={100} alt="Logo" />
          </Link>
            {isAuthenticated && (
            <>
              {/* <Link to="/account" className="btn">Mon Compte</Link> Lien vers la page de compte */}
              <Link to="/account" className='link'>
                <button className='btn mon_compte'>Mon Compte</button>
              </Link> {/* Lien vers la page de compte */}
              <button className="btn logout" onClick={onLogout}>
                Se déconnecter
              </button>
            </>
          )}
        </div>
      
      
    </header>
  );
};

export default Header;
