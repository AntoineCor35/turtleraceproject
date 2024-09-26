import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/LeaderBoard.css';

const LeaderBoard = ({ level }) => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredAndSortedData, setFilteredAndSortedData] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/scores');
        const fetchedScores = response.data;

        // Filtrer et trier les scores par niveau de difficulté
        const filteredAndSorted = fetchedScores
          .filter(user => user.difficulty.toLowerCase() === level.toLowerCase()) // Utilisation de level prop
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);

        setScores(fetchedScores);
        setFilteredAndSortedData(filteredAndSorted);
      } catch (err) {
        setError(err);
        console.error("Erreur lors de la récupération des scores :", err);
      } finally {
        setLoading(false);
      }
    };
    fetchScores();
  }, [level]); // Utilisation de level comme dépendance

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
              <td>{entry.user}</td>
              <td>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;
