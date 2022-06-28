import React, { useEffect, useState } from 'react';
import Snake from './Snake';
import Point from './Point';

import { initPoint, initGameState, initBody } from './constrant';

function Board({status, setStatus, direction, gameState, setGameState, highScore, setHighScore }) {
  const [body, setBody] = useState(initBody);

  const [point, setPoint] = useState(initPoint);

  const [score, setScore] = useState(0);

  useEffect(() => {
    let invertalId;
    if (status === 'running') {
      invertalId = setInterval(() => {
        move();
        positionCheck();
      }, 150);
    }
    return () => {
      clearInterval(invertalId);
    };
  }, [status, body]);

  useEffect(() => {
    spawnPoint();
  }, [score, gameState.end]);

  useEffect(() => {
    if (gameState.end) {
      let name = window.prompt('Enter Your Name: ');
      if (name) {
        setHighScore([
          ...highScore,
          {
            name,
            score,
          },
        ]);
      }
      let count = 0;
      while (true) {
        if (
          window.confirm(
            count <= 3 ? 'Play again ?' : '¯_(ツ)_/¯ (Yes, you do)'
          )
        ) {
          setGameState(initGameState);
          setBody(initBody);
          setPoint(initPoint);
          setScore(0);
          setStatus('pause')
          break;
        }
        count++;
      }
    }
  }, [gameState.end]);

  function positionCheck() {
    let [head, ..._restBody] = body;
    if (
      body.find(
        (bodyPart, index) =>
          index !== 0 && bodyPart.x === head.x && bodyPart.y === head.y
      )
    ) {
      setGameState({
        ...gameState,
        end: true,
      });
    }
    switch (gameState.mode) {
      case 'normal':
        if (
          head.x < 0 ||
          head.x >= gameState.maxX ||
          head.y < 0 ||
          head.y >= gameState.maxY
        ) {
          setGameState({
            ...gameState,
            end: true,
          });
        }
        break;
      case 'advance':
        break;
      default:
        throw new Error('Invalid Mode!');
    }
  }

  function spawnPoint(pos, score = 50) {
    if (pos) {
      setPoint(() => ({ ...pos, score }));
    } else {
      setPoint(() => {
        let newPoint;
        do {
          newPoint = {
            x: Math.floor(Math.random() * gameState.maxX),
            y: Math.floor(Math.random() * gameState.maxY),
          };
        } while (
          body.find(
            (bodyPart) => bodyPart.x === newPoint.x && bodyPart.y === newPoint.y
          )
        );
        return { ...newPoint, score };
      });
    }
  }

  function move() {
    let [head, ...restBody] = body;
    let oldPos = JSON.parse(JSON.stringify(head));

    let newHead = { ...head };

    switch (direction) {
      case 'left':
        newHead.x--;
        break;
      case 'right':
        newHead.x++;
        break;
      case 'up':
        newHead.y--;
        break;
      case 'down':
        newHead.y++;
        break;
    }

    if (gameState.mode === 'advance') {
      if (newHead.x < 0) {
        newHead.x = gameState.maxX - 1;
      }
      if (newHead.x == gameState.maxX) {
        newHead.x = 0;
      }
      if (newHead.y < 0) {
        newHead.y = gameState.maxY - 1;
      }
      if (newHead.y == gameState.maxY) {
        newHead.y = 0;
      }
    }

    if (newHead.x === point.x && newHead.y === point.y) {
      restBody.unshift({ ...head });
      setScore(() => score + point.score);
    }
    head = newHead;

    restBody = restBody.map((currPart) => {
      const newPos = JSON.parse(JSON.stringify(oldPos));
      oldPos = currPart;
      return newPos;
    });

    setBody([head, ...restBody]);
  }

  return (
    <div
      className="board"
      style={{ '--max-x': gameState.maxX, '--max-y': gameState.maxY }}
    >
      <Snake body={body} />
      <Point point={point} />
    </div>
  );
}

export default Board;
