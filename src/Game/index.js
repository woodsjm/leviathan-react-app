import React, { Component } from 'react'
import CharacterSprite from '../CharacterSprite'
import './game.css';
import { plan, enemyStart, grabEnemies } from '../Levels/Structures/plans.js'
import constructBoilerPlateNarrative from '../Levels/Narrative/index.js'
import Level from '../Levels'
import Character from '../Character' 
import { items, getItemsToPopulate } from '../Items/items.js'
import EnemySprite from '../EnemySprite'
import cloneDeep from 'lodash/cloneDeep'

import Chance from 'chance'

//Import chancejs library
// const Chance = require('chance')
let chance = new Chance()


class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timeToFight: false,
            pickedUpItem: null,
            currentLevel: 0,
            inventoryChanges: false,
            currentEnemy: {x: null, y: null},
            enemyTiles: [],
            enemies: null,
            completedLevel: false 
        }
        this.checkTile = this.checkTile.bind(this)
        this.checkLoot = this.checkLoot.bind(this)
    }

    componentDidMount(props) {
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
    }

    componentDidUpdate(prevProps) {
        if (prevProps.reset !== this.props.reset) {
            console.log("prevProps: ", prevProps)
            console.log("==========")
            console.log("this.props: ", this.props)
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
                currentLevel: this.props.currentLevel,
                completedLevel: false
            })
        }
    }

    checkTile = (x, y) => {
        const s = this.state.currentStructure
        if (x > 11 || x < 0 || y > 11 || y < 0) {
            return false
        }

        const enemies = this.state.enemies
        // Handle movement of an unconstructed level
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


                this.generateNarrative("loot", equipment.name)

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

    generateNarrative = (...args) => {
        let narrative = constructBoilerPlateNarrative(...args)
        this.setState({
            currentStory: narrative
        })

    }

    render() {
        let level;
        let characterSprite;
        if (this.state.currentStructure) {
            level = <Level structure={this.state.currentStructure} handleClick={this.handleClick} />
        } 

        if (this.state.currentLevel) {
            characterSprite = <CharacterSprite 
                                  level={this.state.currentLevel}
                                  check={this.checkTile} 
                                  checkForLoot={this.checkLoot}
                                  reset={this.props.reset}
                                />
        }

        let enemySprites;
        if (this.state.enemies) {
            enemySprites = <EnemySprite level={this.state.currentLevel} enemies={this.state.enemies} check={this.checkTile} />
        }

        let story;
        if (this.state.currentStory) {
            story = <h1>{this.state.currentStory}</h1>
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
                        level={this.state.currentLevel}
                        items={this.state.levelItems} 
                        pickedUpItem={this.state.pickedUpItem}
                        timeToFight={this.state.timeToFight}
                        attack={this.fightResult}
                        restartLevel={this.props.restartLevel}
                        reset={this.props.reset}
                        lives={this.props.lives}
                    />
                </div>
            </div>
        )
    }
}

export default Game