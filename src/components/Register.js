import React, { useState } from 'react';
import axios from 'axios'; 
import '../styles/Register.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',        // Utilise "name" pour correspondre au champ d'utilisateur
    mail: '',        // Utilise "mail" pour l'email
    password: '',
    turtles_id: '',  // Utilise "turtles_id" pour l'ID de la tortue
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envoyer les données du formulaire à l'API
      const response = await axios.post('http://127.0.0.1:8000/users/api/create', formData);
      console.log('Inscription réussie :', response.data);
      // Vous pouvez ajouter ici un message de succès ou rediriger l'utilisateur
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      // Vous pouvez ajouter ici un message d'erreur
    }
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit} className="form">
        <h2 className='title'>Inscription</h2>
        <input
          type="text"
          name="name" // Utilise "name" pour correspondre au formData
          placeholder="Nom d'utilisateur"
          value={formData.name}
          onChange={handleChange}
          className='input'
        />
        <input
          type="email"
          name="mail" // Utilise "mail" pour correspondre au formData
          placeholder="Adresse mail"
          value={formData.mail}
          onChange={handleChange}
          className='input'
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          className='input'
        />
        <select
          name="turtles_id" // Utilise "turtles_id" pour correspondre au formData
          value={formData.turtles_id}
          onChange={handleChange} // Utilise handleChange directement pour simplifier
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
        <button type="submit" className="login-button">
          S'inscrire<span className="arrow">➔</span>
        </button>
      </form>
    </div>
  );
}

export default Register;
