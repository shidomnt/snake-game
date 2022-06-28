import React, { useState } from 'react';
import SnakeBody from './SnakeBody'

function Snake({ body }) {
  return (
    <div>
      {body.map(( bodyPart, index ) => <SnakeBody key={index} x={bodyPart.x} y={bodyPart.y} />)}
    </div>
  )
}

export default Snake;
