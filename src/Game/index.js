import React, { Component } from 'react'
import Character from '../Character'
import './game.css';
import { plan } from '../Levels/Structures/plans.js'
import Level from '../Levels'
 

class Game extends React.Component {
    constructor() {
        super()
        this.state = {
            currentLevel: 1
        }
        this.checkTile = this.checkTile.bind(this)
    }

    componentDidMount() {
        this.setState({
            currentStructure: plan(this.state.currentLevel)
        })
    }

    checkTile = (x, y) => {

        if (x > 12 || x < 1 || y > 12 || y < 1) {
            return false
        } else {
            return this.state.currentStructure[x - 1][y - 1]
        }
    }


    render() {
        return(
            <div>
                <h1>Here is Level One.</h1>

                <div className="Game-Box">
                  <Level level={this.state.currentLevel} />
                  <Character level={this.state.currentLevel} check={this.checkTile}/>
                </div>
            </div>
            )
    }
}

export default Game