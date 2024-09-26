import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Account = () => {
  const [user, setUser] = useState(null);
  const [scores, setScores] =useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')); // Récupère les infos utilisateur
    setUser(storedUser);
  }, []);

  useEffect(() => {
    const fetchScores = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/scores'); // Lien vers votre API
            setScores(response.data); // Mettre à jour l'état avec les données
        } catch (err) {
            setError(err); // Gérer l'erreur
            console.error("Erreur lors de la récupération des questions:", err);
        }
    };
    fetchScores();
  }, []);

  return (
    <div>
      {user ? (
        <>
          <h2>Bienvenue {user.name} !</h2>
          <p>Email : {user.mail}</p>
          <p>ID de la tortue : {user.turtles_id}</p>
        </>
      ) : (
        <p>Chargement des informations utilisateur...</p>
      )}
    </div>
  );
};

export default Account;
