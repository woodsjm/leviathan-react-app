import React, { Component } from 'react'
import { plan, startPos } from '../Levels/Structures/plans.js'
import './charactersprite.css'


class CharacterSprite extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            top: startPos[this.props.level]['top'],
            left: startPos[this.props.level]['left'],
            tile: {x: 0, y: 0},
            position: {top: `${startPos[this.props.level]['top']}px`, left: `${startPos[this.props.level]['left']}px`}
        }
        this.handleArrowKeys = this.handleArrowKeys.bind(this)
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleArrowKeys, false)
    }

    handleArrowKeys = (event) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            this.directCharacter(event.key)
        } 
    }
    //=========BACKPACK ACTIONS========= 

    //=========ATTACKING SKILLS========= 

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
        this.props.checkForLoot(this.state.tile.x, this.state.tile.y)
        return
    }

    directCharacter = (arrow) => {
        const x = this.state.tile.x
        const y = this.state.tile.y
        if (arrow === 'ArrowRight') {
            if ((this.props.check(x + 1, y) === true) && (x + 1 < 12)) {
                this.move('left', 64, {x: x + 1, y: y}, x, y)
            }
        } else if (arrow === 'ArrowLeft') {
            if ((this.props.check(x - 1, y) === true) && (x - 1 >= 0)) {
                this.move('left', -64, {x: x - 1, y: y}, x, y) 
            }   
        } else if (arrow === 'ArrowDown') {
            if ((this.props.check(x, y + 1) === true) && (y + 1 < 12)) {
                this.move('top', 64, {x: x, y: y + 1}, x, y)  
            }
        } else if (arrow === 'ArrowUp') {
            if ((this.props.check(x, y - 1) === true) && (y - 1 >= 0)) {
                this.move('top', -64, {x: x, y: y - 1}, x, y) 
            }
        }
    }

    render() {
        return(
            <div >
                <img className='sprite' style={{top: this.state.position.top, left: this.state.position.left}} src={'/Leviathan-Sprites/tile000.png'} />
            </div>
            )
    }
}

export default CharacterSprite