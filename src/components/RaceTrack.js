import { useEffect, useState } from "react";
import '../styles/RaceTrack.css';

// Import des images de tortues
import turtleImage1 from '../styles/visuals/turtle1.png';
import turtleImage2 from '../styles/visuals/turtle2.png';
import turtleImage3 from '../styles/visuals/turtle3.png';
import turtleImage4 from '../styles/visuals/turtle4.png';
import turtleImage5 from '../styles/visuals/turtle5.png';
import turtleImage6 from '../styles/visuals/turtle6.png';

const RaceTrack = ({ correctAnswers, level }) => {
  const [progress, setProgress] = useState(0); // Progress state to track the width or position
  const [user, setUser] = useState(null);
  const [turtleImage, setTurtleImage] = useState(null); // State for turtle image

  // Fonction pour mapper turtle_id à une image
  const getTurtleImage = (turtleId) => {
    switch (turtleId) {
      case 1:
        return turtleImage1;
      case 2:
        return turtleImage2;
      case 3:
        return turtleImage3;
      case 4:
        return turtleImage4;
      case 5:
        return turtleImage5;
      case 6:
        return turtleImage6;
      default:
        return turtleImage1; // Default image if turtleId is not found
    }
  };

  // Récupérer l'utilisateur et le turtle_id à partir du localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')); // Récupère les infos utilisateur depuis le localStorage
    setUser(storedUser);
    console.log(storedUser);

    if (storedUser && storedUser.turtles_id) {
      // Met à jour l'image de la tortue en fonction du turtle_id
      setTurtleImage(getTurtleImage(storedUser.turtles_id));
    }
  }, []);

  // Calculer le progrès basé sur le nombre de bonnes réponses et le niveau
  useEffect(() => {
    let totalAnswersRequired = 0;

    // Set the number of required correct answers based on the level
    if (level === 'easy') {
      totalAnswersRequired = 3;
    } else if (level === 'medium') {
      totalAnswersRequired = 5;
    } else if (level === 'hard') {
      totalAnswersRequired = 7;
    }

    // Calculate the percentage of the progress based on correct answers
    const progressPercentage = (correctAnswers / totalAnswersRequired) * 100;

    // Update the progress state
    setProgress(progressPercentage);
  }, [correctAnswers, level]); // Dependency array to trigger useEffect when correctAnswers or level changes

  return (
    <>
      <p>Difficulté en cours : {level}</p>

      <div className="race-track-container">
        {/* Turtle image that moves based on progress */}
        {turtleImage && (
          <img
            src={turtleImage} // Utilise l'image correspondant au turtle_id
            className="turtle"
            style={{ left: `${progress}%` }} // Position dynamique en fonction du progrès
            alt="Turtle"
          />
        )}
      </div>
    </>
  );
};

export default RaceTrack;
