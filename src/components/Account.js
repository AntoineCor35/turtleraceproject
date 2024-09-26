import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Account = () => {
  const [user, setUser] = useState(null);
  const [scores, setScores] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')); // Récupère les infos utilisateur depuis le localStorage
    setUser(storedUser);
  }, []);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/scores'); // Appel à l'API pour récupérer les scores
        setScores(response.data); // Mettre à jour les scores dans l'état
      } catch (err) {
        setError(err); // Gérer l'erreur
        console.error("Erreur lors de la récupération des scores :", err);
      }
    };
    fetchScores();
  }, []);

  if (error) {
    return <p>Erreur lors du chargement des scores : {error.message}</p>;
  }

  if (!user || scores.length === 0) {
    return <p>Chargement des informations utilisateur et des scores...</p>;
  }

  // Filtrer les scores pour l'utilisateur actuel par `user_id`
  const userScores = scores.filter(score => score.user_id === user.id);

  // Séparer les scores par difficulté
  const easyScores = userScores.filter(score => score.difficulty.toLowerCase() === 'easy');
  const mediumScores = userScores.filter(score => score.difficulty.toLowerCase() === 'medium');
  const hardScores = userScores.filter(score => score.difficulty.toLowerCase() === 'hard');

  return (
    <div>
      <h2>Bienvenue {user.name} !</h2>
      <p>Email : {user.mail}</p>
      <p>ID de la tortue : {user.turtles_id}</p>

      <h3>Scores - Facile</h3>
      <table border="1" className='tableScore'>
        <thead>
          <tr>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {easyScores.length > 0 ? (
            easyScores.map((entry, index) => (
              <tr key={index}>
                <td>{entry.score}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">Aucun score pour la difficulté Facile</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Scores - Moyen</h3>
      <table border="1" className='tableScore'>
        <thead>
          <tr>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {mediumScores.length > 0 ? (
            mediumScores.map((entry, index) => (
              <tr key={index}>
                <td>{entry.score}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">Aucun score pour la difficulté Moyen</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Scores - Difficile</h3>
      <table border="1" className='tableScore'>
        <thead>
          <tr>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {hardScores.length > 0 ? (
            hardScores.map((entry, index) => (
              <tr key={index}>
                <td>{entry.score}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">Aucun score pour la difficulté Difficile</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Account;
