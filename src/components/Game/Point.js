import React from 'react';

function Point({point}) {
  return <div className="point" style={{'--x': point.x, '--y':point.y}}></div>;
}

export default Point;
