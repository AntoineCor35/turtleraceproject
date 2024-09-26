import React, { useState, useEffect } from 'react';
import axios from 'axios';
import questionsData from '../data/questions.json'; // Importe les questions depuis le fichier JSON
import LeaderBoard from './LeaderBoard';
import RaceTrack from './RaceTrack';
import '../styles/QuizzApp.css';

function QuizApp() {
  const [level, setLevel] = useState(null); // Niveau de difficulté sélectionné
  const [currentQuestion, setCurrentQuestion] = useState(null); // Question actuelle
  const [shuffledAnswers, setShuffledAnswers] = useState([]); // Réponses mélangées
  const [correctAnswers, setCorrectAnswers] = useState(0); // Nombre de bonnes réponses
  const [timeElapsed, setTimeElapsed] = useState(0); // Temps écoulé
  const [quizStarted, setQuizStarted] = useState(false); // Démarrage du quiz
  const [quizFinished, setQuizFinished] = useState(false); // Etat du quiz (terminé ou non)
  const [questionIndex, setQuestionIndex] = useState(0); // Index des questions
  const [questions, setQuestions] = useState([]); // Liste des questions mélangées
  const [score, setScore] = useState(null); // Stocke le score
  const [test, setTest] =useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/questions'); // Lien vers votre API
            setTest(response.data); // Mettre à jour l'état avec les données
        } catch (err) {
            setError(err); // Gérer l'erreur
            console.error("Erreur lors de la récupération des questions:", err);
        }
    };
    fetchQuestions();
  }, []);


  const levelThreshold = {
    easy: 3,
    medium: 5,
    hard: 7
  };

  // Fonction pour mélanger les réponses d'une question
  const shuffleAnswers = (question) => {
    const answers = [
      question.answer,
      question.false_answer1,
      question.false_answer2,
      question.false_answer3,
    ];
    return answers.sort(() => Math.random() - 0.5);
  };

  // Fonction pour mélanger les éléments d'un tableau
const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};


  // Lancer le quiz avec le niveau de difficulté choisi
  const startQuiz = (selectedLevel) => {
    setLevel(selectedLevel);
    setQuestions(shuffle(questionsData[2].data)); // Mélange toutes les questions
    setCorrectAnswers(0);
    setQuestionIndex(0);
    setTimeElapsed(0); // Réinitialiser le temps écoulé
    setScore(null); // Réinitialiser le score
    setQuizStarted(true);
    setQuizFinished(false); // Indique que le quiz est en cours
  };

  // Gestion du chronomètre (compte le temps écoulé)
  useEffect(() => {
    if (quizStarted && !quizFinished) {
      const timer = setInterval(() => {
        setTimeElapsed(prevTime => prevTime + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [quizStarted, quizFinished]);

  // Quand une réponse est sélectionnée
  const handleAnswerClick = (selectedAnswer) => {
    if (selectedAnswer === currentQuestion.answer) {
      setCorrectAnswers(correctAnswers + 1);
    }

    if (correctAnswers + 1 === levelThreshold[level]) {
      calculateScore();
    } else {
      nextQuestion();
    }
  };

  // Calculer le score basé sur le temps écoulé
  const calculateScore = async () => {
    const finalScore = Math.max(10000 - 10 * timeElapsed, 0); // Évite un score négatif
    setScore(finalScore);
  
    // Envoyer le score au backend
    try {
      const user = JSON.parse(localStorage.getItem('user')); // Parse l'objet JSON
      const user_id = user?.user?.id; // Accède à l'ID de l'utilisateur
  
      if (user_id) {
        const response = await axios.post('http://127.0.0.1:8000/api/add_scores', {
          user_id: user_id, // Inclure l'user_id
          score: finalScore,
          difficulty: level
        });
        console.log('Score envoyé avec succès:', response.data);
        setQuizFinished(true); // Marquer le quiz comme terminé
      } else {
        console.error("User ID non trouvé");
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du score:', error);
    }
  };
  
  
  // Charger la question suivante
  const nextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      alert('Plus de questions disponibles');
      resetQuiz();
    }
  };

  // Réinitialiser le quiz
  const resetQuiz = () => {
    setQuizStarted(false);
    setCorrectAnswers(0);
    setQuestionIndex(0);
    setTimeElapsed(0);
    setScore(null);
  };

  // Mettre à jour la question actuelle et mélanger les réponses
  useEffect(() => {
    if (questions.length > 0 && quizStarted) {
      const currentQ = questions[questionIndex];
      setCurrentQuestion(currentQ);
      setShuffledAnswers(shuffleAnswers(currentQ)); // Mélange les réponses une seule fois
    }
  }, [questionIndex, questions, quizStarted]);


  return (
    <div className="QuizApp">
      {!quizStarted ? (
        <div className='quiz'>
          <h1>Choisir la difficulté</h1>
          <button className='btnDifficulte' onClick={() => startQuiz('easy')}>Facile</button>
          <button className='btnDifficulte' onClick={() => startQuiz('medium')}>Moyen</button>
          <button className='btnDifficulte' onClick={() => startQuiz('hard')}>Difficile</button>
        </div>
      ) : quizFinished ? (
        <div className='quiz finished'>
          <h1>Bravo, vous avez terminé le quiz !</h1>
          <h2 className='endMessage'>Vous avez réalisé un score de <span>{score} points</span> pour une durée de <span>{timeElapsed} secondes</span> !</h2>
          {/* <p>Temps écoulé : </p> */}
          <LeaderBoard level={level} />
          <button className='replayAgain' onClick={resetQuiz}>Recommencer une partie</button>
        </div>
      ) : (
        <div className='quiz'>
          {/* <h1>Questions de culture générale !</h1> */}
          
          <RaceTrack correctAnswers={correctAnswers} level={level} />
          <h2>Temps écoulé: {timeElapsed} secondes</h2>
          <h2>Bonnes réponses : {correctAnswers}</h2>
          {currentQuestion && (
            <div className='questionZone'>
              <h3><span>{questionIndex+1}\</span>{currentQuestion.question}</h3>
              {shuffledAnswers.map((answer, index) => (
                <button className='btnAnswer' key={index} onClick={() => handleAnswerClick(answer)}>
                  {answer}
                </button>
              ))}
            </div>
          )}
          
        </div>
      )}
    </div>
  );
}

export default QuizApp;