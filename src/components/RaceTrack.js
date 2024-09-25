import { useEffect, useState } from "react";
import '../styles/RaceTrack.css';
import turtleImage from '../styles/visuals/TortueAqua.png';
 
const RaceTrack = ({ correctAnswers, level }) => {
  const [progress, setProgress] = useState(0); // Progress state to track the width or position
 
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
{/* <h2>Hello racetrack</h2> */}
{/* <p>Nombre de bonnes réponses : {correctAnswers}</p> */}
<p>Difficulté en cours : {level}</p>

    <div className="race-track-container">
        {/* Turtle image that moves based on progress */}
        <img
          src={turtleImage}
          className="turtle"
          style={{ left: `${progress}%` }}
          alt="Turtle"
        />
      </div>
 
      {/* Progress bar (or image) */}
    {/* <div className="testUn"> */}
        {/* This div represents the moving progress or image */}
    {/* <div className="testDeux" />
    </div> */}
</>
  );
};
 
export default RaceTrack;