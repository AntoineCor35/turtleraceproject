import React, { useState, useEffect } from 'react';
import scoreUser from '../data/scores.json';
import axios from 'axios';
import '../styles/LeaderBoard.css'

const LeaderBoard = () => {

    const [test, setTest] =useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [difficulty] = useState({level});

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/scores'); // Lien vers votre API
                setTest(response.data); // Mettre à jour l'état avec les données
            } catch (err) {
                setError(err); // Gérer l'erreur
                console.error("Erreur lors de la récupération des questions:", err);
            }
        };
        fetchScores();
      }, []);

        // Trier les données par score décroissant lors de l'initialisation
        const [sortedData, setSortedData] = useState(
            [...scoreUser].sort((a, b) => b.score - a.score)
        );

        // Fonction pour trier par nom
        const sortByName = () => {
            const sorted = [...sortedData].sort((a, b) => a.username.localeCompare(b.username));  // Tri alphabétique
            setSortedData(sorted);
        };


        // Filtrer les données par difficulté et trier par score décroissant
        const filteredAndSortedData = scoreUser
        .filter(user => user.difficulty === difficulty)  // Filtrer par difficulté
        .sort((a, b) => b.score - a.score);  // Trier par score décroissant

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
                                <td>{entry.username}</td>
                                <td>{entry.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    )
}

export default LeaderBoard;