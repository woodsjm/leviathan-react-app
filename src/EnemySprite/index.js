import React, { Component } from 'react'
import { enemyStart } from '../Levels/Structures/plans.js' 
import './enemy.css'

const EnemySprite = (props) => {
    
    const enemies = props.enemies.map((enemy, idx) => {
            return (
                    <img className='sprite' id={idx} style={{top: `${enemy['top'] * 64}px`, left: `${enemy['left'] * 64}px`}} src={'/Leviathan-Sprites/tile004.png'} />
                )
        })
    return(
        <div>
            {enemies}
        </div>
        )
}

export default EnemySprite