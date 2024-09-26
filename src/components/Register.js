import React, { useState } from 'react';
import axios from 'axios'; 
import { useOutletContext } from 'react-router-dom'; // Pour accéder à handleUserState
import '../styles/Register.css';

function Register() {
  const { handleUserState } = useOutletContext(); // Récupérer handleUserState depuis le contexte
  const [formData, setFormData] = useState({
    name: '',        
    mail: '',        
    password: '',
    turtles_id: '',  
  });
  const [error, setError] = useState(null); // Pour gérer les erreurs

  // Liste des tortues avec leur ID
  const turtles = [
    { id: 1, name: 'Leonardo' },
    { id: 2, name: 'Michel-Angelo' },
    { id: 3, name: 'Donatello' },
    { id: 4, name: 'Raphaël' },
    { id: 5, name: 'Franklin' },
    { id: 6, name: 'Vroom' },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fonction pour connecter l'utilisateur après inscription réussie
  const loginAfterRegister = async () => {
    try {
      const loginResponse = await axios.post('http://127.0.0.1:8000/api/login', {
        mail: formData.mail,
        password: formData.password,
      });

      const { status, user } = loginResponse.data;

      if (status === 'success') {
        console.log('Connexion réussie après inscription :', user);
        handleUserState(user); // Mettre à jour l'état utilisateur après connexion
      } else {
        setError('Erreur lors de la connexion après inscription');
      }
    } catch (loginError) {
      console.error('Erreur lors de la connexion après inscription :', loginError);
      setError('Erreur lors de la connexion après inscription');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envoyer les données du formulaire à l'API d'inscription
      const registerResponse = await axios.post('http://127.0.0.1:8000/users/api/create', formData);
      console.log('Inscription réussie :', registerResponse.data);

      // Si l'inscription est réussie, tenter de connecter l'utilisateur automatiquement
      await loginAfterRegister();
    } catch (registerError) {
      console.error('Erreur lors de l\'inscription :', registerError);
      setError('Erreur lors de l\'inscription. Veuillez réessayer.');
    }
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit} className="form">
        <h2 className='title'>Inscription</h2>
        <input
          type="text"
          name="name"
          placeholder="Nom d'utilisateur"
          value={formData.name}
          onChange={handleChange}
          className='input'
          required
        />
        <input
          type="email"
          name="mail"
          placeholder="Adresse mail"
          value={formData.mail}
          onChange={handleChange}
          className='input'
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          className='input'
          required
        />
        <select
          name="turtles_id"
          value={formData.turtles_id}
          onChange={handleChange}
          className='input'
          required
        >
          <option value="">Choisissez votre tortue</option>
          {turtles.map((turtle) => (
            <option key={turtle.id} value={turtle.id}>
              {turtle.name}
            </option>
          ))}
        </select>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="login-button">
          S'inscrire<span className="arrow">➔</span>
        </button>
      </form>
    </div>
  );
}

export default Register;
