import logo from '../styles/visuals/logo.png';

const Header = ({ isAuthenticated, onLogout }) => {
  console.log("isAuthenticated dans Header : ", isAuthenticated); // Vérification
  return (
    <header>
      <img src={logo} height={100} alt="Logo" />
      {isAuthenticated && (
        <button className="logout" onClick={onLogout}>
          Se déconnecter
        </button>
      )}
    </header>
  );
};

export default Header;
