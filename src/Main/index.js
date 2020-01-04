import React, { Component } from 'react'
import Game from '../Game'
import { enemyStart } from '../Levels/Structures/plans.js'

class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            restart: false,
            lives: 10,
            level: 1
        }
    }
    restart = () => {
        this.setState({
            restart: !this.state.restart
        })
    }
    render() {
        
        return (
            <div>
                <h1>{`Level ${this.state.level}`}</h1>
                <Game key={this.state.restart} restartLevel={this.restart} />

            </div>
            )
    }
}

export default Main