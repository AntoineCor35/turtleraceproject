import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

const Root = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Gérer le chargement initial

  // Fonction pour mettre à jour l'état d'authentification après connexion
  const handleUserState = (newUser) => {
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser));
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log("Utilisateur trouvé dans le localStorage : ", user);
    
    if (user) {
      setIsAuthenticated(true); // Si un utilisateur est trouvé, mettre à jour l'état
    }
    setLoading(false); // On arrête le chargement après avoir vérifié le localStorage
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  // Pendant le chargement, on peut afficher un message ou un écran de chargement
  if (loading) {
    return <div>Chargement...</div>;
  }

  console.log("isAuthenticated dans Root : ", isAuthenticated);

  return (
    <>
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <main className="main">
        {/* Passer handleUserState à Outlet pour que SignIn puisse l'utiliser */}
        <Outlet context={{ isAuthenticated, handleUserState }} />
      </main>
      <Footer />
    </>
  );
};

export default Root;
