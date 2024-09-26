import { Outlet, useNavigate } from 'react-router-dom'; // Import de useNavigate pour la redirection
import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

const Root = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialisation de useNavigate

  // Fonction pour mettre à jour l'état d'authentification après connexion
  const handleUserState = (newUser) => {
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser));
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Fonction de déconnexion avec redirection
  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/'); // Redirige vers la page d'accueil ou une autre page
  };

  // Pendant le chargement, on peut afficher un message ou un écran de chargement
  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <main className="main">
        {/* Passer handleUserState à Outlet pour que SignIn et Register puissent l'utiliser */}
        <Outlet context={{ isAuthenticated, handleUserState }} />
      </main>
      <Footer />
    </>
  );
};

export default Root;
