import React, { Component } from 'react'

import { plan, startPos } from '../Levels/Structures/plans.js'

import './charactersprite.css'


class CharacterSprite extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            top: null,
            left: null,
            currentTileX: null,
            currentTileY: null
        }
    }

    componentDidMount(props) {
        document.addEventListener("keydown", this.handleInput, false)
        this.setUpCharacterSprite()
    }

    componentDidUpdate(previousProps) {
        const level = this.props.level
        const reset = this.props.reset
        if ((level !== previousProps.level) || (reset !== previousProps.reset)) {
            this.setUpCharacterSprite()  
        }
    }

    // ==============
    // Event Handlers
    // ==============

    handleInput = (event) => {
        if ( 37 <= event.keyCode <= 40) {
            this.controlCharacter(event.key)
        } 
    }

    // =============
    // Sprite Specific Methods
    // =============

    controlCharacter = async (arrow) => {
        try{
            await this.move(this.directCharacter(arrow))
        } catch(error) {
            console.log(error)
        } finally {
            this.props.checkForLoot(this.state.currentTileX, this.state.currentTileY)
        }
    }

    directCharacter = (arrow) => {
        const x = this.state.currentTileX
        const y = this.state.currentTileY

        switch (arrow) {
            case 'ArrowRight':
                if (this.props.checkTile(x + 1, y) && (x + 1 < 12)) {
                    return ['left', 64, x + 1]
                }
            case 'ArrowLeft':
                if (this.props.checkTile(x - 1, y) && (x - 1 >= 0)) {
                    return ['left', -64, x - 1]
                }

            case 'ArrowDown':
                if (this.props.checkTile(x, y + 1) && (y + 1 < 12)) {
                    return ['top', 64, y + 1]
                }

            case 'ArrowUp':
                if (this.props.checkTile(x, y - 1) && (y - 1 >= 0)) {
                    return ['top', -64, y - 1]
                }
        }
    }

    move = ([direction, change, newCoordinate]) => {
        let axis;
        direction === 'left' ? axis = 'currentTileX' : axis = 'currentTileY'
        this.setState({
            [direction]: this.state[direction] + change,
            [axis]: newCoordinate,
        })
        return
    }

    setUpCharacterSprite = () => {
        const level = this.props.level
        this.setState({
            top: startPos[level]['top'],
            left: startPos[level]['left'],
            currentTileX: 0,
            currentTileY: 0
        })

        return
    }

    render() {
        let sprite;
        let test;
        let s = this.state

        if (s.top !== null && s.left !== null) {
            sprite = <img 
                  className='sprite' id='player' 
                  data-x={this.state.currentTileX}
                  data-y={this.state.currentTileY}
                  style={{top: `${this.state.top}px`, left: `${this.state.left}px`}} 
                  src={'/Leviathan-Sprites/tile000.png'} 
                  /> 
        }

        return(
            <div >
                {sprite}
                {test}
            </div>
        )
    }
}

export default CharacterSprite