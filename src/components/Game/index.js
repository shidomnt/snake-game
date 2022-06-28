import React, { useState, useEffect } from 'react';
import Board from './Board';
import HighScore from './HighScore';
import Menu from './Menu';

import './index.css';
import {
  initGameState,
  initHighScore,
  SNAKE_KEY,
  SNAKE_SCORE_KEY,
} from './constrant';

function Game() {
  const [gameState, setGameState] = useState(initGameState);

  const [highScore, setHighScore] = useState(initHighScore);

  const [direction, setDirection] = useState('');

  const [status, setStatus] = useState('pause');

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const { maxX, maxY, mode } = gameState;
    window.localStorage.setItem(
      SNAKE_KEY,
      JSON.stringify({
        maxX: Math.max(2, maxX),
        maxY: Math.max(2, maxY),
        mode,
      })
    );
  }, [gameState]);

  useEffect(() => {
    window.localStorage.setItem(SNAKE_SCORE_KEY, JSON.stringify(highScore));
  }, [gameState]);

  function handleKeyPress(e) {
    const keyPress = String(e.keyCode);

    const directionKey = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down',
    };

    const forbindKey = {
      left: '39',
      right: '37',
      up: '40',
      down: '38',
    };

    const functionalKey = {
      27: () => {
        setStatus('pause');
        setDirection('');
      },
    };

    if (
      Object.keys(directionKey).includes(keyPress) &&
      keyPress !== forbindKey[direction]
    ) {
      setDirection(() => directionKey[keyPress]);
      setStatus('running');
    }

    if (Object.keys(functionalKey).includes(keyPress)) {
      functionalKey[keyPress]();
    }
  }

  return (
    <div className="game-wrapper">
      <div>
        <Board
          gameState={gameState}
          setGameState={setGameState}
          highScore={highScore}
          setHighScore={setHighScore}
          direction={direction}
          status={status}
          setStatus={setStatus}
        />
        <Menu gameState={gameState} setGameState={setGameState} />
      </div>
      <HighScore highScore={highScore} />
    </div>
  );
}

export default Game;
