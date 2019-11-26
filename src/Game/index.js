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

        if (x > 11 || x < 0 || y > 11 || y < 0) {
            return false
        } 

        if ((this.state.currentStructure[y][x] !== "*") && (this.state.currentStructure[y][x] !== "&")) {
            console.log("return false")
            return false
        } else {
            return true
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