import React, { useState } from "react";
import './App.css';
import ChoiceCard from './components/ChoiceCard';

export const choices = {
  Rock: {
    name: "Rock",
    img:
      "https://opengameart.org/sites/default/files/forum-attachments/very%20simple%20rock_0.png"
  },
  Scissors: {
    name: "Scissors",
    img: "http://www.pngmart.com/files/1/Scissors-PNG-Pic.png"
  },
  Paper: {
    name: "Paper",
    img: "http://pngimagesfree.com/Paper/Thumb/blank-note-paper-free-clipa.png"
  }
};

const getRamdomChoice = () => {
  let choiceNames = Object.keys(choices); 
  let randomIndex = Math.floor(Math.random() * 3);
  let choiceName = choiceNames[randomIndex];
  return choices[choiceName];
};

export const getFinalResult = userChoice => {
const aiChoice = getRamdomChoice().name;
let result;


if (userChoice === "Rock") {
  result = aiChoice === "Scissors" ? "Victory!" : "Defeat!";
}
if (userChoice === "Paper") {
  result = aiChoice === "Rock" ? "Victory!" : "Defeat!";
}
if (userChoice === "Scissors") {
  result = aiChoice === "Paper" ? "Victory!" : "Defeat!";
}

if (userChoice === aiChoice) result = "Tie game!";
console.log(result)
return [result, aiChoice];

};

function App() {
  const [userChoice, setUserChoice] = useState(null);
  const [aiChoice, setComputerChoice] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  const [prompt, setGamePrompt] = useState(null);
  const [previousWinner, setPreviousWinner] = useState(null);

  const onPlayer = playerChoice => {
  const [result, aiChoice] = getFinalResult(playerChoice);

  const newUserChoice = choices[playerChoice];
  const newComputerChoice = choices[aiChoice];

  setGamePrompt(result);
  setUserChoice(newUserChoice);
  setComputerChoice(newComputerChoice);
  gameHistory.push(result);
  setGameHistory(gameHistory);
  if (result === "Victory!") {
    setPreviousWinner("You");
  } else if (result === "Defeat!") {
    setPreviousWinner("Computer");
  } else {
    setPreviousWinner("Tie");
  }
  };
  
  return (
   <div >
   <ChoiceCard
   title="You"
   previousWinner={previousWinner}
   img={userChoice && userChoice.img}
 />
    <div className="d-flex justify-content-center">
    <button className="btn btn-success btn-lg">Start</button>
    <button className="btn btn-success btn-lg "
    onClick={()=>onPlayer('Rock')}>Rock</button>
    <button className="btn btn-success btn-lg"
    onClick={()=>onPlayer('Scissors')}>scissors</button>
    <button className="btn btn-success btn-lg"
    onClick={()=>onPlayer('Paper')}>paper</button>
    </div>
    <ChoiceCard
  title="Computer"
  previousWinner={previousWinner}
  img={aiChoice && aiChoice.img}
/>
  <h1>{prompt}</h1>
  <div className="col-md-4 themed-grid-col">
  <h3>History</h3>
  <ul>
    {gameHistory.map(result => {
      return <li>{result}</li>;
    })}
  </ul>
</div>
</div>
  );
}
    
export default App;









