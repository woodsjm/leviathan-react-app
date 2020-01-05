import React, { Component } from 'react'
import Game from '../Game'
import { enemyStart } from '../Levels/Structures/plans.js'

class Main extends React.Component {
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
            <div>
                <h1>{`Level ${this.state.level}`}</h1>
                {game}
            </div>
            )
    }
}

export default Main