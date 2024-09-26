import QuizzApp from "./QuizzApp";
import React, { useState, useEffect } from 'react';
import SignIn from "./SignIn"; // Import du composant SignIn
import Register from "./Register"; // Import du composant Register
import '../styles/Home.css';

function Home() {
  // Récupère l'utilisateur dans le localStorage
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [isAuthenticated, setIsAuthenticated] = useState(false); // État pour suivre l'authentification
  const [showSignIn, setShowSignIn] = useState(true); // État pour basculer entre SignIn et Register

  useEffect(() => {
    // Vérifie si l'utilisateur est authentifié
    if (user && user.status === "success") {
      setIsAuthenticated(true); // Si le statut est "success", on considère que l'utilisateur est connecté
    }
  }, [user]); // L'effet se déclenche à chaque modification de l'utilisateur

  const handleUserState = (newUser) => {
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser)); // Sauvegarde dans le localStorage
  };

  // Simule la déconnexion de l'utilisateur
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('user'); // Supprime l'utilisateur du localStorage à la déconnexion
    setUser(null); // Réinitialise l'état user
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

          {showSignIn ? (
            <button className="login" onClick={() => handleUserState({ status: "success" })}>
              Se connecter
            </button>
          ) : (
            <button className="login" onClick={() => handleUserState({ status: "success" })}>
              Créer un compte
            </button>
          )}

          {showSignIn ? <SignIn userState={handleUserState} /> : <Register userState={handleUserState} />} {/* Affiche SignIn ou Register */}

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
