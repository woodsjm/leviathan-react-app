import React, { Component } from 'react'
import { plan } from '../Levels/Structures/plans.js'
import './character.css'

let top = 16
let left = 16


class Character extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tile: {x: 1, y: 12},
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

    //=========CHARACTER MOVEMENT METHODS=========

    move = (direction) => {
        const x = this.state.tile.x
        const y = this.state.tile.y

        if (direction === 'ArrowRight') {
            if ((this.props.check(x + 1, y) === '*' || '&') && x + 1 < 13) {
                left += 64
                const position = {...this.state.position}
                position.left = `${left}px`

                this.setState({
                    tile: {x: x + 1, y: y},
                    position: {...position}
                })
            }

        } else if (direction === 'ArrowLeft') {
            if ((this.props.check(x - 1, y) === '*' || '&') && x - 1 > 0) {
                left -= 64
                const position = {...this.state.position}
                position.left = `${left}px`

                this.setState({
                    tile: {x: x - 1, y: y},
                    position: {...position}
                }) 
            }
            
        } else if (direction === 'ArrowDown') {
            if ((this.props.check(x, y - 1) === '*' || '&') && y - 1 > 0) {
                top += 64
                const position = {...this.state.position}
                position.top = `${top}px`

                this.setState({
                    tile: {x: x, y: y - 1},
                    position: {...position}
                }) 
            }

        } else if (direction === 'ArrowUp') {
            if ((this.props.check(x, y + 1) === '*' || '&') && y + 1 < 13) {
                top -= 64
                const position = {...this.state.position}
                position.top = `${top}px`

                this.setState({
                    tile: {x: x, y: y + 1},
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