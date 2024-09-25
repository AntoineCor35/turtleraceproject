import QuizzApp from "./QuizzApp";
import React, { useState } from 'react';
import Register from "./Register";

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // État pour suivre l'authentification

  // Simule la connexion de l'utilisateur
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Simule la déconnexion de l'utilisateur
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="HomePage">
      {!isAuthenticated ? (
        <div>
          <h1>Bienvenue sur la plateforme Quiz</h1>
          <p>Veuillez créer un compte ou vous connecter pour accéder au quiz.</p>
          <Register/>
          <button onClick={handleLogin}>Créer un compte / Se connecter</button>
        </div>
      ) : (
        <div>
          <button onClick={handleLogout}>Se déconnecter</button>
          <QuizzApp /> {/* Affiche le composant QuizApp si l'utilisateur est connecté */}
        </div>
      )}
    </div>
  );
}

export default Home;
