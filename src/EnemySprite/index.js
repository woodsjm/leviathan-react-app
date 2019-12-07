import React, { Component } from 'react'
import { enemyStart } from '../Levels/Structures/plans.js' 
import './enemy.css'

class EnemySprite extends React.Component {
        constructor(props) {
        super(props)
        this.state = {
            alive: true,
            tile: {x: (enemyStart[this.props.level]['left']), y: (enemyStart[this.props.level]['top'])},
            position: {top: `${enemyStart[this.props.level]['top'] * 64}px`, left: `${enemyStart[this.props.level]['left'] * 64}px`}
        }
    }

    componentDidMount(props) {
        this.props.trackEnemyTile(this.state.tile)
    }

    //=========CHARACTER MOVEMENT=========

    move = (direction, change, tile, x, y) => {
        let vector = this.state[direction] + change
        const position = {...this.state.position}
        position[direction] = `${vector}px`
        this.setState({
            [direction]: vector,
            tile: tile,
            position: {...position}
        })
        return
    }

    

    render() {
        const sprite = <img className='sprite' style={{top: this.state.position.top, left: this.state.position.left}} src={'/Leviathan-Sprites/tile004.png'} />
        return(
            <div >
                {this.state.alive === true
                    ? sprite :
                    null}
            </div>
            )
    }
}

export default EnemySprite