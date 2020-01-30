import React, { Component } from 'react'

import Chance from 'chance'
import Character from '../Character' 
import CharacterSprite from '../CharacterSprite'
import cloneDeep from 'lodash/cloneDeep'
import EnemySprite from '../EnemySprite'
import { enemyStart, plan } from '../Levels/Structures/plans.js'
import { getItemsToPopulate, items } from '../Items/items.js'
import Level from '../Levels'

import './game.css';

let chance = new Chance()


class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            completedLevel: false, 
            currentEnemy: {x: null, y: null},
            currentLevel: 0,
            enemies: null,
            enemyTiles: [],
            inventoryChanges: false,
            pickedUpItem: null,
            timeToFight: false
        }
        this.checkTile = this.checkTile.bind(this)
        this.checkLoot = this.checkLoot.bind(this)
    }

    componentDidMount(props) {
        this.setupGameBoard()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.reset !== this.props.reset) {
            this.setupGameBoard()
        }
    }

    checkTile = (x, y) => {
        const s = this.state.currentStructure
        if (x > 11 || x < 0 || y > 11 || y < 0) {
            return false
        }

        // Handle movement with an unconstructed level
        const enemies = this.state.enemies
        if (enemies === undefined || enemies === null) {
            return false
        }

        for (let i = 0; i < enemies.length; i++) {
            if (enemies[i]['left'] === x && enemies[i]['top'] === y) { 
                this.fight(i)
                return false
            }
        }

        if ((s[y][x] === "*") || (s[y][x] === "&") || (s[y][x] === "?")) {
            return true
        } else if ((s[y][x] === "!") && (this.state.completedLevel === true)) {
            this.props.exitLevel(this.state)
            return false
        } else {
            return false
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

    fight = (i) => {
        this.setState({
            timeToFight: !this.state.timeToFight,
            currentEnemy: i
        })
    }

    fightResult = (damage, accuracy) => {
        // Result if no weapon equipped
        if (damage === 0 && accuracy === 0) {
            return this.state.enemies[this.state.currentEnemy].damage
        }

        let damageGiven = this.state.enemies[this.state.currentEnemy].damage
        const outcomeOfShot = chance.weighted(['hit', 'miss'], [accuracy, 10])
        const outcomeOfBeingShotAt = chance.weighted(['hit', 'miss'], [this.state.enemies[this.state.currentEnemy].accuracy, 10])
        
        if (outcomeOfShot === 'hit') {
            const enemies = this.state.enemies
            enemies[this.state.currentEnemy].health -= damage

            if (enemies[this.state.currentEnemy].health <= 0) {
                enemies.splice(this.state.currentEnemy, 1)
            }

            this.setState({
                enemies: enemies
            })
        }

        if (this.state.enemies.length === 0) {
            this.setState({completedLevel: true})
        }

        return outcomeOfBeingShotAt === 'hit' ? damageGiven : false    
    }

    setupGameBoard = () => {
        const currentStructure = plan(this.props.currentLevel)
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

        const enemiesArr = cloneDeep(enemyStart[this.props.currentLevel])

        this.setState({
            currentStructure: plan(this.props.currentLevel),
            levelItems: lootPositions,
            enemies: enemiesArr,
            currentLevel: this.props.currentLevel    
        })

        return
    }

    render() {
        let characterSprite;
        let enemySprites;
        let level;

        if (this.state.currentStructure) {
            level = <Level handleClick={this.handleClick} structure={this.state.currentStructure} />
        } 

        if (this.state.currentLevel) {
            characterSprite = <CharacterSprite 
                                  check={this.checkTile} 
                                  checkForLoot={this.checkLoot}
                                  level={this.state.currentLevel}
                                  reset={this.props.reset}
                                />
        }

        if (this.state.enemies) {
            enemySprites = <EnemySprite level={this.state.currentLevel} enemies={this.state.enemies} check={this.checkTile} />
        }

        return(
            <div>
                <div className="Main-Container">
                    <div className="Game-Box" >
                        <div className="Map" >
                          {level}
                          {characterSprite}
                          {enemySprites}
                        </div>
                    </div>
                    <Character 
                        attack={this.fightResult}
                        items={this.state.levelItems} 
                        level={this.state.currentLevel}
                        lives={this.props.lives}
                        pickedUpItem={this.state.pickedUpItem}
                        reset={this.props.reset}
                        restartLevel={this.props.restartLevel}
                        timeToFight={this.state.timeToFight}
                    />
                </div>
            </div>
        )
    }
}

export default Game