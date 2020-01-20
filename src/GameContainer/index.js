import React, { Component } from 'react'
import InGameMenu from '../InGameMenu'
// import '../augmented.css'
import Game from '../Game'
import './game-container.css'
import { enemyStart } from '../Levels/Structures/plans.js'


class GameContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            restart: false,
            lives: 10,
            level: 1,
            gameShowing: true,
        }
    }

    restart = () => {
        this.setState({
            restart: !this.state.restart
        })
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

    render() {
        let game;
        if (this.state.gameShowing === true) {
            game = <Game reset={this.state.restart} restartLevel={this.restart} currentLevel={this.state.level} lives={this.state.lives} exitLevel={this.exitLevel}/>
        }

        return (
            <div className='Game-Container' >

                <div className='Game-Container-Top' augmented-ui='tl-clip br-clip exe'>
                    <h1 className="app-name glitch"> The Expanse</h1>
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