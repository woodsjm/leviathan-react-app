import React, { Component } from 'react'

import { enemyStart } from '../Levels/Structures/plans.js'
import Game from '../Game'
import InGameMenu from '../InGameMenu'

import '../augmented.css'
import './game-container.css'


class GameContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            level: 1,
            lives: 10,
            gameShowing: true,
            restart: false
        }
    }

    exitLevel = (childState) => {
        if (childState.completedLevel === true) {
            this.setState(state => ({
                level: state.level + 1,
                restart: !state.restart
            }));
            return

        } else {
            return
        }
    }

    restart = () => {
        this.setState(state => ({
            restart: !state.restart
        }));
    }

    render() {
        let game;

        if (this.state.gameShowing === true) {
            game = <Game 
                        currentLevel={this.state.level} 
                        exitLevel={this.exitLevel}
                        lives={this.state.lives} 
                        reset={this.state.restart} 
                        restartLevel={this.restart} 
                    />
        }

        return (
            <div className='Game-Container' >
                <div className='Game-Container-Top' augmented-ui="br-clip bl-clip exe">
                    <h1 className="app-name glitch" > The Expanse</h1>
                </div>
                <div className='Game-Container-Bottom' >
                    <InGameMenu changeUser={this.props.changeUser} logout={this.props.logout}/>
                    {game}
                </div>
            </div>
        )
    }
}

export default GameContainer