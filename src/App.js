import React, { useState } from 'react';
import './App.css';
import GameCard from './components/GameCard';
import InteractiveGameCard from './components/InteractiveGameCard';
import Header from './components/Header';

function App() {
  const [games] = useState([
    {
      id: 1,
      title: "Never Have I Ever",
      description: "Take turns saying things you've never done. Anyone who HAS done it takes a drink. Great for learning secrets!",
      players: "3-12 players",
      difficulty: "Easy"
    },
    {
      id: 2,
      title: "Kings Cup",
      description: "Draw cards from a deck, each card has a rule. Break the rule, take a drink. Last person to draw a King drinks the center cup.",
      players: "4-10 players",
      difficulty: "Medium"
    },
    {
      id: 3,
      title: "Flip Cup",
      description: "Team relay race where you drink your beer and flip your cup upside down by flicking the rim. First team to finish wins!",
      players: "6-16 players",
      difficulty: "Medium"
    },
    {
      id: 4,
      title: "Beer Pong",
      description: "Throw ping pong balls into cups of beer across a table. Make a shot, opponent drinks. Classic party game!",
      players: "4-8 players",
      difficulty: "Medium"
    },
    {
      id: 5,
      title: "Quarters",
      description: "Bounce a quarter off the table into a cup. Make it in, someone drinks. Miss twice, you drink.",
      players: "3-8 players",
      difficulty: "Hard"
    },
    {
      id: 6,
      title: "Truth or Drink",
      description: "Like truth or dare, but instead of dares, you drink if you won't answer the truth question.",
      players: "3-10 players",
      difficulty: "Easy"
    },
    {
      id: 7,
      title: "Rage Cage",
      description: "Fast-paced game where you bounce balls into cups while racing others. Get lapped and you chug the center cup!",
      players: "6-20 players",
      difficulty: "Hard"
    },
    {
      id: 8,
      title: "Power Hour",
      description: "Take a shot of beer every minute for 60 minutes. Sounds easy? That's 5 beers in an hour!",
      players: "2+ players",
      difficulty: "Hard"
    }
  ]);

  const [interactiveGames] = useState([
    {
      id: 'random-shots',
      title: "Random Shot Generator",
      description: "Click to randomly select who takes the next shot! Perfect for group decisions.",
      type: "random-player",
      difficulty: "Easy"
    },
    {
      id: 'drink-dice',
      title: "Drinking Dice",
      description: "Roll the dice to see how many sips you take! Higher numbers = more drinks.",
      type: "dice-roll",
      difficulty: "Medium"
    },
    {
      id: 'spin-bottle',
      title: "Digital Spin the Bottle",
      description: "Spin the bottle digitally! Perfect for truth or dare or choosing who drinks next.",
      type: "spin-bottle",
      difficulty: "Easy"
    },
    {
      id: 'drink-roulette',
      title: "Drink Roulette",
      description: "Russian roulette but with drinks! One player gets selected randomly for a special challenge.",
      type: "roulette",
      difficulty: "Hard"
    },
    {
      id: 'sip-calculator',
      title: "Sip Calculator",
      description: "Solve math problems with +, -, ×, ÷ operations! Wrong answer = take sips equal to the correct answer (max 12).",
      type: "math-game",
      difficulty: "Medium"
    },
    {
      id: 'truth-or-dare-generator',
      title: "Truth or Dare Generator",
      description: "Spin the wheel to choose Truth or Dare, then get a random challenge! Perfect for getting to know each other better.",
      type: "truth-dare",
      difficulty: "Medium"
    }
  ]);

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <section className="hero">
          <h2>Epic Drinking Games for Your Party! 🍺</h2>
          <p>Discover the best drinking games that will make your party legendary. Drink responsibly and have fun!</p>
        </section>
        
        <section className="games-section">
          <h3>Popular Drinking Games</h3>
          <div className="games-grid">
            {games.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        <section className="games-section">
          <h3>Interactive Digital Games 🎲</h3>
          <p className="section-description">
            These games use the website to make random decisions, generate numbers, and pick players!
          </p>
          <div className="games-grid">
            {interactiveGames.map(game => (
              <InteractiveGameCard key={game.id} game={game} />
            ))}
          </div>
        </section>
      </main>
      
      <footer className="footer">
        <p>&copy; 2025 Drinking Games. Made with ❤️ for epic parties! Please drink responsibly.</p>
      </footer>
    </div>
  );
}

export default App;
