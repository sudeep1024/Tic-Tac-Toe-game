import React, { useState } from 'react';
import './App.css';

// Login Component
function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input 
            type="text" 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        {error && <p className="error">{error}</p>}
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

// Tic Tac Toe Component
function TicTacToe() {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);

  const winningLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  const handleClick = (index) => {
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    checkWinner(newBoard);
  };

  const checkWinner = (newBoard) => {
    for (let line of winningLines) {
      const [a, b, c] = line;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setWinner(newBoard[a]);
        setWinningLine(line);
        return;
      }
    }

    if (!newBoard.includes(null)) {
      setWinner('tie');
    }
  };

  const handleRestart = () => {
    setBoard(initialBoard);
    setWinner(null);
    setWinningLine([]);
    setXIsNext(true);
  };

  const renderSquare = (i) => {
    const isWinningSquare = winningLine.includes(i);
    let lineDirection = '';

    if (isWinningSquare) {
      if (winningLines[3].includes(i) || winningLines[4].includes(i) || winningLines[5].includes(i)) {
        lineDirection = 'vertical';
      } else if (winningLines[6].includes(i) || winningLines[7].includes(i)) {
        lineDirection = 'diagonal';
      }
    }

    return (
      <button className={`square ${isWinningSquare ? `winning-square ${lineDirection}` : ''}`} onClick={() => handleClick(i)}>
        {board[i]}
      </button>
    );
  };

  return (
    <div className="game">
      <h1 className="heading">TIC-TAC-TOE Game</h1>
      <div className="board">
        {Array.from({ length: 9 }).map((_, i) => renderSquare(i))}
      </div>
      <div className="status">
        {winner === 'tie' ? 'It\'s a Tie!' : winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`}
      </div>
      <button className="restart-button" onClick={handleRestart}>Re-match</button>
      <PortfolioLink />
    </div>
  );
}

// PortfolioLink Component
function PortfolioLink() {
  const openPortfolio = () => {
    window.open('https://portfolio-red-beta-50.vercel.app/', '_blank');
  };

  return (
    <button className="portfolio-button" onClick={openPortfolio}>
      Visit My Portfolio
    </button>
  );
}

// Instructions Component
function Instructions({ onStartGame }) {
  return (
    <div className="instructions">
      <h2>Instructions</h2>
      <p>Welcome to the Tic Tac Toe game!</p>
      <p>Click on a square to place your mark. The first player to get three of their marks in a row, column, or diagonal wins!</p>
      <p>Tic-tac-toe is a classic, simple game typically played between two players. It's a great way to pass the time and can be played almost anywhere. Here are the basic instructions on how to play:</p>
      <h3>Equipment</h3>
      <p>-&gt;Game Board: A grid of 3 x 3 squares.</p>
      <p>-&gt;Markers: One player uses X's, and the other uses O's.</p>
      <h3>Objective</h3>
      <p>The main goal is to get three of your markers in a row, either horizontally, vertically, or diagonally.</p>
      <h3>Setup</h3>
      <p>-&gt;Players decide who goes first. Traditionally, one player uses X and the other uses O.</p>
      <p>-&gt;The first player places their marker (X or O) in any one of the nine squares on the grid.</p>
      <h3>Gameplay</h3>
      <p>-&gt;Players take turns placing their markers on the grid.</p>
      <p>-&gt;Each square can only be used once.</p>
      <p>-&gt;The game continues until one player has three of their markers in a row or all nine squares are filled.</p>
      <h3>Winning the Game</h3>
      <p>-&gt;A player wins if they have three of their markers in a row horizontally, vertically, or diagonally.</p>
      <p>-&gt;If all nine squares are filled and no player has three in a row, the game is a tie.</p>
      <h3>Strategies</h3>
      <p>-&gt;Offense: Try to create a line of three markers while keeping an eye on potential opportunities to form a line.</p>
      <p>-&gt;Defense: Watch your opponent’s moves closely and block them if they are close to getting three in a row.</p>
      <p>-&gt;Forking: Create an opportunity where you have two ways to win (two non-blocked lines of two).</p>
      <p>-&gt;Center Control: Taking the center square gives several more opportunities for making three in a row.</p>
      <p>Tic-tac-toe is a game of observation and tactics. Even though it's straightforward, playing can sharpen your strategic thinking skills. Enjoy your game!</p>
      <button className="instructions-button" onClick={onStartGame}>Start Game</button>
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showGame, setShowGame] = useState(false);

  return (
    <div className="app">
      {!isLoggedIn ? (
        <Login setIsLoggedIn={setIsLoggedIn} />
      ) : showGame ? (
        <TicTacToe />
      ) : (
        <>
          <Instructions onStartGame={() => setShowGame(true)} />
        </>
      )}
    </div>
  );
}

export default App;
