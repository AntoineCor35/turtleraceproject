import React, { useState } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom'; // Utilisation du contexte pour obtenir handleUserState
import '../styles/SignIn.css';

const SignIn = () => {
  const { handleUserState } = useOutletContext(); // Récupération de handleUserState depuis Root
  const [formData, setFormData] = useState({
    mail: '',
    password: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', formData);
      const { status, user, message } = response.data;

      if (status === 'success') {
        handleUserState(user); // Mettre à jour l'état utilisateur dans Root
      } else {
        setError('Erreur de connexion: ' + message);
      }
    } catch (err) {
      setError('Erreur de connexion, veuillez vérifier vos identifiants.');
      console.error('Erreur lors de la connexion:', err);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Connexion</h2>
        <div className="input-container">
          <input
            type="email"
            name="mail"
            placeholder="Email"
            value={formData.mail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-button">
          Se connecter <span className="arrow">➔</span>
        </button>
        <a href="#" className="forgot-password">Mot de passe oublié ?</a>
      </form>
    </div>
  );
};

export default SignIn;
