import React, { useState } from 'react';
import './GameCard.css';

const GameCard = ({ game }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'hard': return '#F44336';
      default: return '#2196F3';
    }
  };

  const getDetailedInstructions = (gameTitle) => {
    const instructions = {
      "Never Have I Ever": "1. Sit in a circle\n2. Take turns saying 'Never have I ever...' followed by something you've never done\n3. Anyone who HAS done that thing takes a drink\n4. Great for learning secrets about your friends!\n5. Keep it fun and respectful",
      "Kings Cup": "1. Place cards face down around a cup\n2. Take turns drawing cards\n3. Each card has a rule (Ace=Waterfall, King=Pour drink in center cup, etc.)\n4. Person who draws the 4th King drinks the center cup\n5. Game ends when all cards are drawn",
      "Flip Cup": "1. Divide into two teams\n2. Each person has a cup with beer\n3. First person drinks, then flips cup upside down by flicking the rim\n4. Next teammate goes when cup is successfully flipped\n5. First team to finish wins!",
      "Beer Pong": "1. Set up cups in triangle formation on each end\n2. Take turns throwing ping pong balls\n3. Make it in a cup, opponent drinks and removes cup\n4. First team to eliminate all cups wins\n5. Re-rack when requested",
      "Quarters": "1. Sit around a table with a cup in center\n2. Bounce quarter off table into cup\n3. Make it = choose someone to drink\n4. Miss twice in a row = you drink\n5. Pass quarter to next player",
      "Truth or Drink": "1. Take turns asking personal questions\n2. Answer truthfully or take a drink\n3. Questions get more interesting as night goes on\n4. No judgment zone!\n5. Great for getting to know people better",
      "Rage Cage": "1. Two people start with balls and cups\n2. Bounce ball into your cup as fast as possible\n3. Pass cup and ball clockwise when you make it\n4. If you get lapped, chug the center cup\n5. Refill center cup and continue",
      "Power Hour": "1. Take a shot of beer every minute for 60 minutes\n2. Use a timer or Power Hour playlist\n3. That's about 5 beers total!\n4. Can modify to 30 minutes for beginners\n5. Stay hydrated and know your limits"
    };
    return instructions[gameTitle] || game.description;
  };

  return (
    <div className={`game-card ${isFlipped ? 'flipped' : ''}`}>
      <div className="card-inner">
        <div className="card-front">
          <div className="card-header">
            <h4 className="game-title">{game.title}</h4>
            <span 
              className="difficulty-badge"
              style={{ backgroundColor: getDifficultyColor(game.difficulty) }}
            >
              {game.difficulty}
            </span>
          </div>
          <div className="card-content">
            <p className="game-description">{game.description}</p>
            <div className="game-info">
              <div className="players-info">
                <span className="info-icon">👥</span>
                <span>{game.players}</span>
              </div>
            </div>
          </div>
          <button 
            className="flip-button"
            onClick={() => setIsFlipped(true)}
          >
            How to Play
          </button>
        </div>
        
        <div className="card-back">
          <div className="back-content">
            <h4>{game.title}</h4>
            <div className="instructions">
              <h5>How to Play:</h5>
              <div className="instruction-text">
                {getDetailedInstructions(game.title).split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
              <div className="game-details">
                <p><strong>Players:</strong> {game.players}</p>
                <p><strong>Difficulty:</strong> {game.difficulty}</p>
              </div>
            </div>
          </div>
          <button 
            className="flip-button back-button"
            onClick={() => setIsFlipped(false)}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
