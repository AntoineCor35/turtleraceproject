import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

      return (<h2>Les Scores</h2>)
}

export default LeaderBoard;