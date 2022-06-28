import React, {useState} from "react"

function SnakeBody({x, y}){
  return(
    <div className="snake-body" style={{'--x': x, '--y': y}}>
    </div>
    )
}

export default SnakeBody
