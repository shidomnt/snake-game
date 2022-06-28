import React from 'react';

function HighScore({ highScore }) {
  return (
    <React.Fragment>
      <ul className="leaderboard">
      <h1>Leaderboard</h1>
        {highScore.length
          ? highScore.map((record, index) => (
              <li key={index}>
                {record.name}: {record.score}
              </li>
            ))
          : 'It Empty Now :('}
      </ul>
    </React.Fragment>
  );
}

export default HighScore;
