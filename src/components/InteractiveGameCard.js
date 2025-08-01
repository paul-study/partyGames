import React, { useState } from 'react';
import './InteractiveGameCard.css';

const InteractiveGameCard = ({ game }) => {
  const [result, setResult] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [players, setPlayers] = useState([]);
  const [showPlayerInput, setShowPlayerInput] = useState(false);
  const [tempPlayerName, setTempPlayerName] = useState('');
  const [mathProblem, setMathProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [kingsCup, setKingsCup] = useState({
    deck: [],
    drawnCards: [],
    kingsDrawn: 0,
    currentPlayer: 0,
    gameStarted: false
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'hard': return '#F44336';
      default: return '#2196F3';
    }
  };

  const addPlayer = () => {
    if (tempPlayerName.trim() && !players.includes(tempPlayerName.trim())) {
      setPlayers([...players, tempPlayerName.trim()]);
      setTempPlayerName('');
      setShowPlayerInput(false);
    }
  };

  const removePlayer = (playerToRemove) => {
    setPlayers(players.filter(player => player !== playerToRemove));
  };

  const clearAllPlayers = () => {
    setPlayers([]);
    setResult('');
    setKingsCup({
      deck: [],
      drawnCards: [],
      kingsDrawn: 0,
      currentPlayer: 0,
      gameStarted: false
    });
  };

  // Truth or Dare data arrays
  const truthQuestions = [
    "What's the most embarrassing thing you've done while drunk?",
    "Who in this room would you most want to kiss?",
    "What's your biggest fear when it comes to relationships?",
    "Have you ever had a crush on someone in this room?",
    "What's the weirdest thing you've done when you were alone?",
    "What's your most embarrassing childhood memory?",
    "Who was your first kiss and how was it?",
    "What's the last lie you told?",
    "What's your biggest secret that you've never told anyone?",
    "Have you ever cheated on a test or assignment?",
    "What's the most trouble you've ever gotten into?",
    "Who in this room do you trust the most?",
    "What's your biggest regret?",
    "Have you ever had a paranormal experience?",
    "What's the most childish thing you still do?",
    "What's your worst habit?",
    "Who was your worst kiss?",
    "What's something you've never told your parents?",
    "What's your biggest insecurity?",
    "Have you ever been caught doing something you shouldn't have been doing?",
    "What's the weirdest dream you've ever had?",
    "Who in this room would you least want to be stuck in an elevator with?",
    "What's the most awkward date you've ever been on?",
    "Have you ever pretended to be sick to get out of something?",
    "What's your guilty pleasure that you're embarrassed about?",
    "Who's the last person you stalked on social media?",
    "What's the worst thing you've ever said about someone behind their back?",
    "Have you ever had a crush on a teacher or boss?",
    "What's the most illegal thing you've ever done?",
    "What's your biggest turn-off in a person?",
    "Have you ever peed in a pool?",
    "What's the longest you've gone without showering?",
    "Who would you hook up with if you were the last two people on earth?",
    "What's the most embarrassing thing in your browser history?",
    "Have you ever had a one-night stand?",
    "What's your most irrational fear?",
    "Who do you think is the hottest person in this room?",
    "What's the worst pickup line someone has used on you?",
    "Have you ever had a friends with benefits situation?",
    "What's the most immature thing you still do?",
    "Who was your first celebrity crush?",
    "What's the weirdest place you've ever hooked up?",
    "Have you ever sent a dirty text to the wrong person?",
    "What's your most embarrassing drunk text?",
    "Who in this room do you think would be the worst kisser?",
    "What's the grossest thing you've ever eaten?",
    "Have you ever been walked in on while hooking up?",
    "What's your worst 'walk of shame' story?",
    "Who's the most annoying person you follow on social media?",
    "What's the weirdest thing you've googled?"
  ];

  const dareChallenges = [
    "Do your best impression of someone in this room (take a drink if you can't guess who)",
    "Sing the chorus of your favorite song in a funny voice",
    "Do 10 push-ups or take 3 sips",
    "Call your mom and tell her you love her",
    "Let someone else post a status on your social media",
    "Do your best dance moves for 30 seconds",
    "Speak in an accent for the next 3 rounds",
    "Let the group go through your phone for 2 minutes",
    "Wear your clothes backwards for the next hour",
    "Do a cartwheel or take 2 drinks",
    "Let someone draw on your face with a washable marker",
    "Eat a spoonful of a condiment of the group's choice",
    "Do your best runway walk across the room",
    "Sing everything you say for the next 10 minutes",
    "Do an impression of your favorite celebrity",
    "Let someone style your hair however they want",
    "Do jumping jacks for 1 minute straight",
    "Talk in rhymes for the next 5 minutes",
    "Do your best yoga pose and hold it for 30 seconds",
    "Let the group choose an embarrassing song for you to dance to",
    "Text your ex and say 'I miss you'",
    "Do your best animal impression for everyone to guess",
    "Eat a raw egg or take 4 drinks",
    "Let someone pick your next Instagram post",
    "Do a dramatic reading of a text conversation",
    "Wear socks on your hands for the next hour",
    "Do the worm dance move",
    "Let someone choose who you have to compliment",
    "Pretend to be a food critic and review a snack dramatically",
    "Do your best magic trick",
    "Let someone tickle you for 30 seconds",
    "Act like your favorite Disney character for 2 minutes",
    "Do a fake commercial for something in the room",
    "Let the group pose you however they want and take a photo",
    "Sing 'Happy Birthday' in the style of a death metal song",
    "Do your best breakdancing move",
    "Let someone feed you something while blindfolded",
    "Act out your most embarrassing moment",
    "Do a trust fall with someone in the group",
    "Pretend to be a news anchor reporting on the party",
    "Do 20 sit-ups while singing the alphabet",
    "Let someone apply makeup to you (guys included!)",
    "Recreate your favorite TikTok dance",
    "Speak only in questions for the next 10 minutes",
    "Do your best slow-motion action scene",
    "Let someone choose a dare for the next person",
    "Pretend to be a robot for 5 minutes",
    "Do your best stand-up comedy routine for 2 minutes",
    "Let someone rearrange your dating app profile",
    "Act like you're underwater for the next 3 minutes"
  ];

  const executeGame = () => {
    if (isAnimating) return;
    
    // Check if enough players for games that need them
    if ((game.type === 'random-player' || game.type === 'spin-bottle' || game.type === 'roulette' || game.type === 'kings-cup') && players.length < 2) {
      setResult('❌ Need at least 2 players! Add players first.');
      return;
    }
    
    setIsAnimating(true);
    setResult('🎲 Rolling...');

    setTimeout(() => {
      let newResult = '';
      
      switch (game.type) {
        case 'random-player':
          const randomPlayer = players[Math.floor(Math.random() * players.length)];
          newResult = `🎯 ${randomPlayer} takes the shot!`;
          break;
          
        case 'dice-roll':
          const diceRoll = Math.floor(Math.random() * 6) + 1;
          newResult = `🎲 You rolled a ${diceRoll}! Take ${diceRoll} sip${diceRoll > 1 ? 's' : ''}!`;
          break;
          
        case 'spin-bottle':
          const spinner = players[Math.floor(Math.random() * players.length)];
          const target = players[Math.floor(Math.random() * players.length)];
          newResult = `🍾 Bottle points from ${spinner} to ${target}!`;
          break;
          
        case 'roulette':
          const isUnlucky = Math.random() < 0.2; // 20% chance
          if (isUnlucky) {
            const unluckyPlayer = players[Math.floor(Math.random() * players.length)];
            newResult = `💀 ${unluckyPlayer} got the unlucky spot! Finish your drink!`;
          } else {
            newResult = `🍀 Safe round! Everyone takes 1 sip.`;
          }
          break;
          
        case 'math-game':
          // Generate different types of math problems
          const problemType = Math.random();
          let question, correctAnswer;
          
          if (problemType < 0.25) {
            // Simple addition (answer <= 12)
            const num1 = Math.floor(Math.random() * 8) + 1; // 1-8
            const num2 = Math.floor(Math.random() * (12 - num1)) + 1; // ensure sum <= 12
            question = `${num1} + ${num2}`;
            correctAnswer = num1 + num2;
          } else if (problemType < 0.5) {
            // Simple subtraction (answer >= 1)
            const larger = Math.floor(Math.random() * 10) + 3; // 3-12
            const smaller = Math.floor(Math.random() * (larger - 1)) + 1; // 1 to (larger-1)
            question = `${larger} - ${smaller}`;
            correctAnswer = larger - smaller;
          } else if (problemType < 0.7) {
            // Multiplication (answer <= 12)
            const multipliers = [
              [2, [2, 3, 4, 5, 6]], // 2 × 2-6 = 4-12
              [3, [2, 3, 4]], // 3 × 2-4 = 6-12
              [4, [2, 3]], // 4 × 2-3 = 8-12
              [6, [2]], // 6 × 2 = 12
              [1, [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]] // 1 × anything = itself
            ];
            const selected = multipliers[Math.floor(Math.random() * multipliers.length)];
            const num1 = selected[0];
            const possibleNum2 = selected[1];
            const num2 = possibleNum2[Math.floor(Math.random() * possibleNum2.length)];
            question = `${num1} × ${num2}`;
            correctAnswer = num1 * num2;
          } else if (problemType < 0.85) {
            // Division (whole number results only, answer <= 12)
            const divisions = [
              [4, 2, 2], [6, 2, 3], [6, 3, 2], [8, 2, 4], [8, 4, 2],
              [9, 3, 3], [10, 2, 5], [10, 5, 2], [12, 2, 6], [12, 3, 4],
              [12, 4, 3], [12, 6, 2], [14, 2, 7], [16, 2, 8], [18, 2, 9],
              [20, 2, 10], [21, 3, 7], [22, 2, 11], [24, 2, 12]
            ];
            const validDivisions = divisions.filter(d => d[2] <= 12);
            const selected = validDivisions[Math.floor(Math.random() * validDivisions.length)];
            question = `${selected[0]} ÷ ${selected[1]}`;
            correctAnswer = selected[2];
          } else {
            // Mixed operations (2-3 numbers)
            const mixType = Math.random();
            if (mixType < 0.5) {
              // Addition and subtraction: a + b - c
              const num1 = Math.floor(Math.random() * 6) + 2; // 2-7
              const num2 = Math.floor(Math.random() * 4) + 1; // 1-4
              const num3 = Math.floor(Math.random() * 3) + 1; // 1-3
              
              const temp = num1 + num2;
              if (temp > num3 && (temp - num3) <= 12) {
                question = `${num1} + ${num2} - ${num3}`;
                correctAnswer = temp - num3;
              } else {
                // Fallback
                question = `${num1} + ${num2}`;
                correctAnswer = num1 + num2;
              }
            } else {
              // Multiplication and division: a × b ÷ c (where result is whole number)
              const base = Math.floor(Math.random() * 4) + 2; // 2-5
              const multiplier = Math.floor(Math.random() * 3) + 2; // 2-4
              const product = base * multiplier;
              if (product <= 24) {
                question = `${product} ÷ ${multiplier}`;
                correctAnswer = base;
              } else {
                // Fallback to simple multiplication
                question = `${base} × 2`;
                correctAnswer = base * 2;
              }
            }
          }
          
          // Ensure answer is between 1 and 12
          if (correctAnswer < 1 || correctAnswer > 12) {
            // Fallback to simple addition
            const a = Math.floor(Math.random() * 6) + 1; // 1-6
            const b = Math.floor(Math.random() * (12 - a)) + 1; // ensure sum <= 12
            question = `${a} + ${b}`;
            correctAnswer = a + b;
          }
          
          setMathProblem({
            question: question,
            answer: correctAnswer
          });
          newResult = `🧮 Quick! Solve this math problem:`;
          setIsAnimating(false);
          return;
          
        case 'kings-cup':
          if (!kingsCup.gameStarted) {
            initializeKingsCup();
          } else {
            drawKingsCard();
          }
          return;

        case 'truth-dare':
          const selectedPlayer = players[Math.floor(Math.random() * players.length)];
          const isThuth = Math.random() < 0.5;
          
          if (isThuth) {
            const randomTruth = truthQuestions[Math.floor(Math.random() * truthQuestions.length)];
            newResult = `🤔 TRUTH for ${selectedPlayer}:\n\n"${randomTruth}"\n\n${selectedPlayer} must answer honestly or take 2 drinks!`;
          } else {
            const randomDare = dareChallenges[Math.floor(Math.random() * dareChallenges.length)];
            newResult = `🎭 DARE for ${selectedPlayer}:\n\n"${randomDare}"\n\n${selectedPlayer} must complete the dare or take 3 drinks!`;
          }
          break;
          
        default:
          newResult = '🎉 Game executed!';
      }
      
      setResult(newResult);
      setIsAnimating(false);
    }, 1500);
  };

  const checkMathAnswer = () => {
    const userNum = parseInt(userAnswer);
    if (userNum === mathProblem.answer) {
      setResult(`✅ Correct! ${mathProblem.answer} is right! No drinks this time.`);
    } else {
      setResult(`❌ Wrong! The answer was ${mathProblem.answer}. Take ${mathProblem.answer} sips!`);
    }
    setMathProblem(null);
    setUserAnswer('');
  };

  const initializeKingsCup = () => {
    const suits = ['♠️', '♥️', '♦️', '♣️'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const newDeck = [];
    
    suits.forEach(suit => {
      ranks.forEach(rank => {
        newDeck.push({ rank, suit, id: `${rank}${suit}` });
      });
    });
    
    // Shuffle deck
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }
    
    setKingsCup({
      deck: newDeck,
      drawnCards: [],
      kingsDrawn: 0,
      currentPlayer: 0,
      gameStarted: true
    });
    setResult('🃏 Kings Cup started! Click "Draw Card" to begin.');
  };

  const getCardRule = (rank) => {
    const rules = {
      'A': { name: 'Waterfall', rule: 'Everyone drinks! Person who drew starts, others can\'t stop until person before them stops.' },
      '2': { name: 'You', rule: 'You choose someone to drink!' },
      '3': { name: 'Me', rule: 'You drink!' },
      '4': { name: 'Floor', rule: 'Everyone touches the floor! Last person drinks.' },
      '5': { name: 'Guys', rule: 'All guys drink!' },
      '6': { name: 'Chicks', rule: 'All girls drink!' },
      '7': { name: 'Heaven', rule: 'Everyone points up! Last person drinks.' },
      '8': { name: 'Mate', rule: 'Choose a drinking buddy! When you drink, they drink.' },
      '9': { name: 'Rhyme', rule: 'Say a word, others rhyme! First to fail drinks.' },
      '10': { name: 'Categories', rule: 'Name a category, others add to it! First to fail drinks.' },
      'J': { name: 'Make a Rule', rule: 'Create a new rule everyone must follow!' },
      'Q': { name: 'Questions', rule: 'Ask someone a question, they ask someone else. First to answer drinks!' },
      'K': { name: 'King', rule: 'Pour some of your drink in the center cup! 4th King drinks it all!' }
    };
    return rules[rank] || { name: 'Unknown', rule: 'Draw again!' };
  };

  const drawKingsCard = () => {
    if (kingsCup.deck.length === 0) {
      setResult('🃏 No more cards! Game over.');
      return;
    }

    const drawnCard = kingsCup.deck[0];
    const remainingDeck = kingsCup.deck.slice(1);
    const newDrawnCards = [...kingsCup.drawnCards, drawnCard];
    
    let newKingsDrawn = kingsCup.kingsDrawn;
    if (drawnCard.rank === 'K') {
      newKingsDrawn++;
    }

    const rule = getCardRule(drawnCard.rank);
    const currentPlayerName = players[kingsCup.currentPlayer] || 'Current Player';
    
    let resultMessage = `🃏 ${currentPlayerName} drew ${drawnCard.rank}${drawnCard.suit}\n\n`;
    resultMessage += `${rule.name}: ${rule.rule}`;
    
    if (drawnCard.rank === 'K') {
      if (newKingsDrawn === 4) {
        resultMessage += `\n\n💀 FOURTH KING! ${currentPlayerName} must drink the center cup!`;
      } else {
        resultMessage += `\n\n👑 King ${newKingsDrawn}/4 drawn!`;
      }
    }

    setKingsCup({
      deck: remainingDeck,
      drawnCards: newDrawnCards,
      kingsDrawn: newKingsDrawn,
      currentPlayer: (kingsCup.currentPlayer + 1) % players.length,
      gameStarted: true
    });

    setResult(resultMessage);
  };

  return (
    <div className="interactive-game-card">
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
        
        {result && (
          <div className={`result-display ${isAnimating ? 'animating' : ''}`}>
            {result}
          </div>
        )}

        {mathProblem && (
          <div className="math-problem-display">
            <div className="math-question">
              <h3>{mathProblem.question} = ?</h3>
            </div>
            <div className="math-input">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Your answer"
                className="math-answer-input"
                onKeyPress={(e) => e.key === 'Enter' && userAnswer && checkMathAnswer()}
              />
              <button 
                onClick={checkMathAnswer} 
                disabled={!userAnswer}
                className="check-answer-btn"
              >
                Check Answer
              </button>
            </div>
          </div>
        )}

        {(game.type === 'random-player' || game.type === 'spin-bottle' || game.type === 'roulette' || game.type === 'kings-cup' || game.type === 'truth-dare') && (
          <div className="player-management">
            <div className="players-list">
              <h5>Players: {players.length > 0 ? `(${players.length})` : '(None yet)'}</h5>
              {players.length > 0 ? (
                <>
                  <div className="players-grid">
                    {players.map((player, index) => (
                      <div key={index} className="player-chip">
                        <span>{player}</span>
                        <button 
                          onClick={() => removePlayer(player)}
                          className="remove-player"
                          title={`Remove ${player}`}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="clear-players-section">
                    <button 
                      onClick={clearAllPlayers}
                      className="clear-all-players-btn"
                      title="Remove all players"
                    >
                      🗑️ Clear All Players
                    </button>
                  </div>
                </>
              ) : (
                <div className="no-players-message">
                  <p>No players added yet. Add at least 2 players to play!</p>
                </div>
              )}
              
              {showPlayerInput ? (
                <div className="add-player-input">
                  <input
                    type="text"
                    value={tempPlayerName}
                    onChange={(e) => setTempPlayerName(e.target.value)}
                    placeholder="Enter player name"
                    onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
                    autoFocus
                  />
                  <button onClick={addPlayer} disabled={!tempPlayerName.trim()}>Add</button>
                  <button onClick={() => {
                    setShowPlayerInput(false);
                    setTempPlayerName('');
                  }}>Cancel</button>
                </div>
              ) : (
                <div className="player-controls">
                  <button 
                    onClick={() => setShowPlayerInput(true)}
                    className="add-player-btn"
                  >
                    + Add Player
                  </button>
                  {players.length > 0 && (
                    <button 
                      onClick={() => {
                        const lastPlayer = players[players.length - 1];
                        removePlayer(lastPlayer);
                      }}
                      className="remove-last-player-btn"
                    >
                      - Remove Last
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {game.type === 'kings-cup' && kingsCup.gameStarted && (
          <div className="kings-cup-status">
            <div className="game-progress">
              <div className="cards-left">Cards remaining: {kingsCup.deck.length}</div>
              <div className="kings-count">Kings drawn: {kingsCup.kingsDrawn}/4</div>
              <div className="current-player">
                Next player: {players[kingsCup.currentPlayer] || 'Unknown'}
              </div>
            </div>
            {kingsCup.drawnCards.length > 0 && (
              <div className="last-cards">
                <h5>Recently drawn:</h5>
                <div className="recent-cards">
                  {kingsCup.drawnCards.slice(-3).map((card, index) => (
                    <span key={index} className="drawn-card">
                      {card.rank}{card.suit}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Debug info for Kings Cup */}
        {game.type === 'kings-cup' && (
          <div style={{fontSize: '12px', color: '#666', marginTop: '10px', padding: '5px', backgroundColor: '#f0f0f0', borderRadius: '4px'}}>
            Debug: Type={game.type} | Players={players.length} | Started={kingsCup.gameStarted ? 'Yes' : 'No'}
          </div>
        )}

        <button 
          onClick={executeGame}
          disabled={isAnimating || mathProblem || ((game.type === 'random-player' || game.type === 'spin-bottle' || game.type === 'roulette' || game.type === 'kings-cup' || game.type === 'truth-dare') && players.length < 2)}
          className={`play-button ${isAnimating ? 'playing' : ''} ${((game.type === 'random-player' || game.type === 'spin-bottle' || game.type === 'roulette' || game.type === 'kings-cup' || game.type === 'truth-dare') && players.length < 2) ? 'disabled' : ''}`}
        >
          {(() => {
            if (isAnimating) return '🎲 Playing...';
            if (mathProblem) return 'Answer Above First';
            if ((game.type === 'random-player' || game.type === 'spin-bottle' || game.type === 'roulette' || game.type === 'kings-cup' || game.type === 'truth-dare') && players.length < 2) return 'Add 2+ Players First';
            if (game.type === 'dice-roll') return '🎲 Roll Dice';
            if (game.type === 'random-player') return '🎯 Pick Player';
            if (game.type === 'spin-bottle') return '🍾 Spin Bottle';
            if (game.type === 'roulette') return '💀 Play Roulette';
            if (game.type === 'math-game') return '🧮 New Problem';
            if (game.type === 'truth-dare') return '🎭 Truth or Dare';
            if (game.type === 'kings-cup') {
              return kingsCup.gameStarted ? '🃏 Draw Card' : '🃏 Start Kings Cup';
            }
            return '▶️ Play';
          })()}
        </button>
      </div>
    </div>
  );
};

export default InteractiveGameCard;
