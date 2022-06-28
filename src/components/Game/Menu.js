import React, { useState } from 'react';

function Menu({ gameState, setGameState }) {
  const [config, setConfig] = useState({
    maxX: gameState.maxX,
    maxY: gameState.maxY,
    mode: gameState.mode,
  });

  function handleSubmit(e) {
    e.preventDefault();
    setGameState(() => ({
      ...gameState,
      ...config,
    }));
    window.location = '/';
  }

  return (
    <form className="menu-form" onSubmit={handleSubmit}>
      <label htmlFor="maxX">Width:</label>
      <input
        type="number"
        name="maxX"
        value={config.maxX}
        onChange={(e) => setConfig({ ...config, maxX: e.target.value })}
      />
      <br />
      <label htmlFor="maxY">Height:</label>
      <input
        type="number"
        name="maxY"
        value={config.maxY}
        onChange={(e) => setConfig({ ...config, maxY: e.target.value })}
      />
      <br />
      <label htmlFor="gameMode">Game Mode:</label>
      <select
        value={config.mode}
        name="gameMode"
        onChange={(e) => setConfig({ ...config, mode: e.target.value })}
      >
        <option value="normal">Normal</option>
        <option value="advance">Advance</option>
      </select>
      <br />
      <input style={{marginTop: 10, padding: '5px 10px'}} type="submit" value="Set" />
    </form>
  );
}

export default Menu;
