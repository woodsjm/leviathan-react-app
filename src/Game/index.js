import React, { Component } from 'react'
import Character from '../Character'
import './game.css';
import { plan } from '../Levels/Structures/plans.js'
import Level from '../Levels'
import Inventory from '../Inventory' 
import { items, getItemsToPopulate } from '../Items/items.js'

 
class Game extends React.Component {
    constructor() {
        super()
        this.state = { 
            pickedUpItem: null,
            currentLevel: 1,
            inventoryChanges: false  
        }
        this.checkTile = this.checkTile.bind(this)
        this.checkLoot = this.checkLoot.bind(this)
    }

    componentDidMount() {
        const currentStructure = plan(this.state.currentLevel)

        let itemToPopulate = 0
        let itemsInLevel = getItemsToPopulate()

        const lootPositions = currentStructure.reduce((arr, column, yIdx) => {
            column.reduce((acc, value, xIdx) => {
                if (value === '?') {
                    let obj = {x: xIdx, y: yIdx, item: itemsInLevel[itemToPopulate]}
                    arr.push(obj)
                    itemToPopulate++   
                } 
                return
            }, 0)
            return arr
        }, [])

        this.setState({
            currentStructure: plan(this.state.currentLevel),
            levelItems: lootPositions
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

    checkLoot = (x, y) => {
        for (let i = 0; i < this.state.levelItems.length; i++) {
            if (this.state.levelItems[i].x === x && this.state.levelItems[i].y === y) {
                
                let equipment = this.state.levelItems[i].item
                let copy = this.state.levelItems
                copy.splice(i, i + 1)
                this.setState({
                    levelItems: copy,
                    pickedUpItem: equipment
                })
                return 
            }
        }
        return 
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
                      <Character level={this.state.currentLevel} check={this.checkTile} checkForLoot={this.checkLoot}/>
                    </div>

                    <Inventory items={this.state.levelItems} pickedUpItem={this.state.pickedUpItem}/>

                </div>
            </div>
            )
    }
}

export default Game