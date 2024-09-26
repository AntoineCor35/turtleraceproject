import QuizzApp from "./QuizzApp";
import React, { useState } from 'react';
import SignIn from "./SignIn"; // Import du composant SignIn
import Register from "./Register"; // Import du composant Register
import '../styles/Home.css';

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // État pour suivre l'authentification
  const [showSignIn, setShowSignIn] = useState(true); // État pour basculer entre SignIn et Register

  // Simule la connexion de l'utilisateur
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Simule la déconnexion de l'utilisateur
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Fonction pour basculer entre SignIn et Register
  const toggleForm = () => {
    setShowSignIn(!showSignIn);
  };

  return (
    <div className="HomePage">
      {!isAuthenticated ? (
        <div className="home">
          <h1>Bienvenue sur la plateforme TurtlezFast</h1>
          <p>Veuillez {showSignIn ? "vous connecter" : "créer un compte"} pour accéder au quiz.</p>

          <button className="login" onClick={toggleForm}>
            {showSignIn ? "Créer un compte" : "Se connecter"}
          </button>

          <button className="login" onClick={handleLogin}>
            {showSignIn ? "Se connecter" : "Créer un compte"} {/* Action principale */}
          </button>
          
          {showSignIn ? <SignIn /> : <Register />} {/* Affiche SignIn ou Register */}

        </div>
      ) : (
        <div>
          <button className="logout" onClick={handleLogout}>Se déconnecter</button>
          <QuizzApp /> {/* Affiche le composant QuizApp si l'utilisateur est connecté */}
        </div>
      )}
    </div>
  );
}

export default Home;
