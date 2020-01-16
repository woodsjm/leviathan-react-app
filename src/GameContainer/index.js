import React, { Component } from 'react'
import InGameMenu from '../InGameMenu'
import Game from '../Game'
import './game-container.css'
import { enemyStart } from '../Levels/Structures/plans.js'


class GameContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            restart: false,
            lives: 10,
            level: 1,
            gameShowing: true
        }
    }

    restart = () => {
        this.setState({
            restart: !this.state.restart
        })
    }

    exitLevel = () => {
        this.setState({
            level: this.state.level + 1,
            restart: !this.state.restart
        })
    }

    render() {
        let game;
        if (this.state.gameShowing === true) {
            game = <Game key={this.state.restart} restartLevel={this.restart} currentLevel={this.state.level} lives={this.state.lives} exitLevel={this.exitLevel}/>
        }

        return (
            <div className='Game-Container' >

                <div className='Game-Container-Top' augmented-ui='tl-clip br-clip exe'>
                    <h1 className="app-name glitch"> The Expanse</h1>
                </div>
                <div className='Game-Container-Bottom' >
                    <InGameMenu />
                    {game}
                </div>
            </div>
            )
    }
}

export default GameContainer