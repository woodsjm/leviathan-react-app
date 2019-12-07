import React, { Component } from 'react'
import CharacterSprite from '../CharacterSprite'
import './game.css';
import { plan } from '../Levels/Structures/plans.js'
import Level from '../Levels'
import Character from '../Character' 
import { items, getItemsToPopulate } from '../Items/items.js'
import EnemySprite from '../EnemySprite'

 
class Game extends React.Component {
    constructor() {
        super()
        this.state = {
            timeToFight: false,
            pickedUpItem: null,
            currentLevel: 1,
            inventoryChanges: false,
            enemyTiles: []  
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
        const s = this.state.currentStructure
        if (x > 11 || x < 0 || y > 11 || y < 0) {
            return false
        }

        const tiles = this.state.enemyTiles
        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i].x === x && tiles[i].y === y) {
                this.fight()
                return false
            }
        }

        if ((s[y][x] !== "*") && (s[y][x] !== "&") && (s[y][x] !== "?")) {
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

    fight = () => {
        this.setState({
            timeToFight: !this.state.timeToFight
        })
    }

    fightResult = (damage, accuracy) => {
        const enemyDamage = Math.round(damage * (accuracy / 100))
        console.log(enemyDamage)
    }
    placeEnemy = (tile) => {
        const tileArr = this.state.enemyTiles
        tileArr.push(tile)
        this.setState({
            enemyTiles: tileArr
        })
    }

    render() {
        let level;
        if (this.state.currentStructure) {
            level = <Level level={this.state.currentStructure} handleClick={this.handleClick} />
        } 
        return(
            <div>
                <h1>{`Level ${this.state.currentLevel}`}</h1>
                <div style={{border: '2px solid green'}}></div>
                <div className="Main-Container">
                    <div className="Game-Box">
                      {level}
                      <CharacterSprite 
                          level={this.state.currentLevel}
                          check={this.checkTile} 
                          checkForLoot={this.checkLoot}
                      />
                      <EnemySprite 
                          level={this.state.currentLevel} 
                          check={this.checkTile} 
                          trackEnemyTile={this.placeEnemy}
                      />
                    </div>
                    <Character 
                        items={this.state.levelItems} 
                        pickedUpItem={this.state.pickedUpItem}
                        timeToFight={this.state.timeToFight}
                        attack={this.fightResult}
                    />
                </div>
            </div>
        )
    }
}

export default Game