import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/LeaderBoard.css';

const LeaderBoard = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [difficulty] = useState('easy'); // Choisir la difficulté (tu peux le changer ici)
  const [filteredAndSortedData, setFilteredAndSortedData] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true); // Démarrer le chargement
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/scores'); // Appel API pour récupérer les scores
        const fetchedScores = response.data;
        
        // Filtrer et trier les scores, en gérant la casse pour la difficulté
        const filteredAndSorted = fetchedScores
          .filter(user => user.difficulty.toLowerCase() === difficulty.toLowerCase()) // Normaliser la casse
          .sort((a, b) => b.score - a.score) // Trier par score décroissant
          .slice(0, 10); // Limiter à 10 résultats

        setScores(fetchedScores); // Mettre à jour l'état des scores
        setFilteredAndSortedData(filteredAndSorted); // Mettre à jour les données filtrées et triées
      } catch (err) {
        setError(err); // Gérer l'erreur
        console.error("Erreur lors de la récupération des scores :", err);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };
    fetchScores();
  }, [difficulty]);

  // Gestion de l'affichage si chargement ou erreur
  if (loading) return <p>Chargement des scores...</p>;
  if (error) return <p>Erreur lors du chargement des scores : {error.message}</p>;

  return (
    <div>
      <h2>Les Scores</h2>
      <table border="1" className='tableScore'>
        <thead>
          <tr>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.user}</td> {/* Utilise `entry.user` pour le nom */}
              <td>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;
