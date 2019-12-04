import React, { Component } from 'react'
import { plan } from '../Levels/Structures/plans.js'
import './character.css'


let top = 0
let left = 0


class Character extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tile: {x: 0, y: 0},
            position: {top: `${top}px`, left: `${left}px`}
        }
        this.handleArrowKeys = this.handleArrowKeys.bind(this)
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleArrowKeys, false)
    }

    handleArrowKeys = (event) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            this.move(event.key)
        } 
    }

    //=========BACKPACK ACTIONS========= 

    //=========ATTACKING SKILLS========= 

    //=========CHARACTER MOVEMENT=========

    move = (direction) => {
        const x = this.state.tile.x
        const y = this.state.tile.y

        if (direction === 'ArrowRight') {
            if ((this.props.check(x + 1, y) === true) && (x + 1 < 12)) {
                left += 64
                const position = {...this.state.position}
                position.left = `${left}px`

                this.setState({
                    tile: {x: x + 1, y: y},
                    position: {...position}
                })
            }

        } else if (direction === 'ArrowLeft') {
            if ((this.props.check(x - 1, y) === true) && (x - 1 >= 0)) {
                left -= 64
                const position = {...this.state.position}
                position.left = `${left}px`

                this.setState({
                    tile: {x: x - 1, y: y},
                    position: {...position}
                }) 
            }
            
        } else if (direction === 'ArrowDown') {
            
            if ((this.props.check(x, y + 1) === true) && (y + 1 < 12)) {
                top += 64
                const position = {...this.state.position}
                position.top = `${top}px`

                this.setState({
                    tile: {x: x, y: y + 1},
                    position: {...position}
                }) 
            }

        } else if (direction === 'ArrowUp') {
            if ((this.props.check(x, y - 1) === true) && (y - 1 >= 0)) {
                top -= 64
                const position = {...this.state.position}
                position.top = `${top}px`

                this.setState({
                    tile: {x: x, y: y - 1},
                    position: {...position}
                }) 
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

export default Character