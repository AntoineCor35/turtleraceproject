import React, { useState } from 'react';
import axios from 'axios'; // Importer Axios

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

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
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Inscription</h2>
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          value={formData.username}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Adresse mail"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          S'inscrire
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#fdf4e9',
  },
  form: {
    backgroundColor: '#fbf7b4',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '300px',
  },
  title: {
    marginBottom: '20px',
    color: '#000',
  },
  input: {
    marginBottom: '15px',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    width: '100%',
    backgroundColor: '#fff',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#c9ed74',
    color: '#000',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    fontSize: '16px',
    fontWeight: 'bold',
  },
};

export default Register;
