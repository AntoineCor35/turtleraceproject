import React, { useState, useEffect } from 'react';
import scoreUser from '../data/scores.json';
import axios from 'axios';
import '../styles/LeaderBoard.css'

const LeaderBoard = () => {

    const [test, setTest] =useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
                {scoreUser.map((entry, index) => (
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