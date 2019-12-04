import React, { Component } from 'react'
import Character from '../Character'
import './game.css';
import { plan } from '../Levels/Structures/plans.js'
import Level from '../Levels'
import Inventory from '../Inventory' 
import { items } from '../Items/items.js'

 

class Game extends React.Component {
    constructor() {
        super()
        this.state = {
            currentLevel: 1,
            levelItems: items  
        }
        this.checkTile = this.checkTile.bind(this)
    }

    componentDidMount() {
        const currentStructure = plan(this.state.currentLevel)
        
        const lootPositions = currentStructure.reduce((arr, row, xIdx) => {
            row.reduce((acc, value, yIdx) => {
                if (value === '?') {
                    let obj = {x: xIdx, y: yIdx}
                    arr.push(obj)   
                } 
                return
            }, 0)
            return arr
        }, [])

        this.setState({
            currentStructure: plan(this.state.currentLevel),
            lootPositions: lootPositions
        })
    }

    checkTile = (x, y) => {
        if (x > 11 || x < 0 || y > 11 || y < 0) {
            return false
        } 

        if ((this.state.currentStructure[y][x] !== "*") && (this.state.currentStructure[y][x] !== "&") && (this.state.currentStructure[y][x] !== "?")) {
            return false
        } else {
            return true
        }
    }

    handleInventory = (direction, inventoryAction, item) => {

        
    }

    handleClick = (event) => {
        
    }
    render() {

        let level;
        if (this.state.currentStructure) {
            level = <Level level={this.state.currentStructure} handleClick={this.handleClick} />
        } 

        return(
            <div>
                <h1>Here is Level One.</h1>

                <div style={{border: '2px solid green'}}></div>

                <div className="Main-Container">


                    <div className="Game-Box">
                      {level}
                      <Character level={this.state.currentLevel} check={this.checkTile}/>
                    </div>

                    <Inventory items={this.state.levelItems}/>

                </div>
            </div>
            )
    }
}

export default Game