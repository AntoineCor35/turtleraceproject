import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import QuizzApp from './QuizzApp';
import SignIn from './SignIn';
import Register from './Register';
import '../styles/Home.css';

function Home() {
  const { isAuthenticated } = useOutletContext(); // Récupérer isAuthenticated depuis Root
  const [showSignIn, setShowSignIn] = useState(true); // État pour basculer entre SignIn et Register

  const toggleForm = () => {
    setShowSignIn(!showSignIn); // Basculer entre les deux formulaires
  };

  return (
    <div className="HomePage">
      {!isAuthenticated ? (
        <div className="home">
          <h1>Bienvenue sur la plateforme TurtlezFast</h1>
          <p>Veuillez {showSignIn ? "vous connecter" : "créer un compte"} pour accéder au quiz.</p>

          {/* Bouton pour basculer entre les formulaires */}
          <button className="login" onClick={toggleForm}>
            {showSignIn ? "Créer un compte" : "Se connecter"}
          </button>

          {showSignIn ? <SignIn /> : <Register />} {/* Affiche SignIn ou Register en fonction de l'état */}
        </div>
      ) : (
        <div>
          <QuizzApp /> {/* Affiche le quiz si l'utilisateur est connecté */}
        </div>
      )}
    </div>
  );
}

export default Home;
