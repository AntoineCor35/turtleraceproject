import React, { useState, useEffect } from 'react';
import axios from 'axios';
import questionsData from '../data/questions.json'; // Importe les questions depuis le fichier JSON
import LeaderBoard from './LeaderBoard';
import RaceTrack from './RaceTrack';
import '../styles/QuizzApp.css';

function QuizApp() {
  const [level, setLevel] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(null);
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/questions');
        setTest(response.data);
      } catch (err) {
        setError(err);
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

  const shuffleAnswers = (question) => {
    const answers = [
      question.answer,
      question.false_answer1,
      question.false_answer2,
      question.false_answer3,
    ];
    return answers.sort(() => Math.random() - 0.5);
  };

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const startQuiz = (selectedLevel) => {
    setLevel(selectedLevel);
    setQuestions(shuffle(questionsData[2].data)); 
    setCorrectAnswers(0);
    setQuestionIndex(0);
    setTimeElapsed(0);
    setScore(null);
    setQuizStarted(true);
    setQuizFinished(false);
  };

  useEffect(() => {
    if (quizStarted && !quizFinished) {
      const timer = setInterval(() => {
        setTimeElapsed(prevTime => prevTime + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [quizStarted, quizFinished]);

  const handleAnswerClick = (selectedAnswer) => {
    if (selectedAnswer === currentQuestion.answer) {
      setCorrectAnswers(prevCorrectAnswers => prevCorrectAnswers + 1);
    }
    nextQuestion();
  };

  useEffect(() => {
    if (correctAnswers === levelThreshold[level]) {
      calculateScore();
      setQuizFinished(true);
    }
  }, [correctAnswers, level, timeElapsed]);

  const calculateScore = async () => {
    const finalScore = Math.max(10000 - 10 * timeElapsed, 0);
    setScore(finalScore);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const user_id = user?.id;
      if (user_id) {
        const response = await axios.post('http://127.0.0.1:8000/api/add_scores', {
          user_id: user_id,
          score: finalScore,
          difficulty: level
        });
        console.log('Score envoyé avec succès:', response.data);
        setQuizFinished(true);
      } else {
        console.error("User ID non trouvé");
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du score:', error);
    }
  };

  const nextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      alert('Plus de questions disponibles');
      resetQuiz();
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCorrectAnswers(0);
    setQuestionIndex(0);
    setTimeElapsed(0);
    setScore(null);
  };

  useEffect(() => {
    if (questions.length > 0 && quizStarted) {
      const currentQ = questions[questionIndex];
      setCurrentQuestion(currentQ);
      setShuffledAnswers(shuffleAnswers(currentQ));
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
          <LeaderBoard level={level} />
          <button className='replayAgain' onClick={resetQuiz}>Recommencer une partie</button>
        </div>
      ) : (
        <div className='quiz'>
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
