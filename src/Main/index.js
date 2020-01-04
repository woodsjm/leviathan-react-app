import React, { Component } from 'react'
import Game from '../Game'
import { enemyStart } from '../Levels/Structures/plans.js'

class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            refresh: false
        }
    }
    restart = () => {
        this.setState({
            refresh: !this.state.refresh
        })
    }
    render() {
        return (
            <div>
                <Game key={this.state.refresh} restartLevel={this.restart}/>
            </div>
            )
    }
}

export default Main
