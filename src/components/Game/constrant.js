export const SNAKE_KEY = 'SNAKE_KEY';
export const SNAKE_SCORE_KEY = 'HIGHSCORE_KEY';

export const initBody = [
  {
    x: 0,
    y: 0,
  },
];

export const initPoint = {
  x: -99,
  y: -99,
  score: 50,
};

if (!window.localStorage.getItem(SNAKE_SCORE_KEY)) {
  window.localStorage.setItem(SNAKE_SCORE_KEY, JSON.stringify([]));
}

export const initHighScore = () =>
  JSON.parse(window.localStorage.getItem(SNAKE_SCORE_KEY));

if (!window.localStorage.getItem(SNAKE_KEY)) {
  window.localStorage.setItem(
    SNAKE_KEY,
    JSON.stringify({
      maxX: 10,
      maxY: 10,
      mode: 'normal', //normal | advance
    })
  );
}

export const initGameState = () => ({
  end: false,
  ...JSON.parse(window.localStorage.getItem(SNAKE_KEY)),
});
