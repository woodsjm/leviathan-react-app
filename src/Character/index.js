import React, { Component } from 'react'

import EquippedWeapon from './EquippedWeapon'
import Medical from './Medical'
import messages from '../Levels/Narrative/index.js'
import Typewriter from 'typewriter-effect'
import Vitals from './Vitals'
import Weapons from './Weapons'

import './character.css'


class Character extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            equippedWeapon: 0,
            pickedUpItem: null,
            backpack: { 
                weapon: [ 
                { 0: null},
                { 1: null}
                ],
                medical: [
                { 0: null},
                { 1: null}
                ]
            },
            vitals: {
                health: 100,
                shield: 100
            },
            lives: 5
        }
    }

    componentDidMount(props) {
        this.setState({
            inventoryChanges: this.props.inventoryChanges
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.timeToFight !== prevProps.timeToFight) {
            this.attack()
        }

        if (this.props.pickedUpItem !== prevProps.pickedUpItem){
            const backpack = this.state.backpack
            const itemType = this.props.pickedUpItem.type
            const slot = backpack[itemType].findIndex((e, idx) => {
                return e[idx] === null  
            })
            const newSlots = this.state.backpack
            newSlots[itemType].splice(slot, 1, this.props.pickedUpItem)
            this.setState({
                backpack: newSlots
            })
        }
    }

    equipWeapon = (idx) => {
        this.setState({
            equippedWeapon: idx
        })
    }

    attack = () => {
        const idx = this.state.equippedWeapon
        const weapon = this.state.backpack.weapon[idx]
        let attackResult;

        if (weapon[idx] === null) {
            attackResult = this.props.attack(0, 0)  
        } else if (weapon !== null) {
            attackResult = this.props.attack(weapon['damage'], weapon['accuracy'])
        }
        
        if (attackResult) {
            let vitals = {...this.state.vitals}
            vitals.health = vitals.health - attackResult
            if (vitals.health <= 0) {
                this.die()
            } else {
                this.setState({vitals}) 
            }
        }
    }

    die = () => {
        this.props.restartLevel()
        this.resetCharacter()

        return
    }

    handleMedicalItem = (idx) => {
        if (this.state.backpack.medical[idx].name === "MedKit") {
            this.useMedPack(idx)
        }
    }

    useMedPack = (idx) => {
        let health = this.state.vitals.health
        if (health >= 100) {
            return
        } else if (health > 0 && health < 100) {
            let state = this.state
            state.vitals.health = state.vitals.health + state.backpack.medical[idx].heal
            state.backpack.medical[idx] = {[idx]: null}
            this.setState({state})
        }
    }

    resetCharacter = () => {
        this.setState(state => ({
            equippedWeapon: 0,
            pickedUpItem: null,
            backpack: {
                weapon: [
                {0: null},
                {1: null}
                ],
                medical: [
                {0: null},
                {1: null}
                ]
            },
            vitals: {
                health: 100,
                shield: 100
            },
            lives: 5
        }));

        return
    }

    render(props) {

        return(
            <div className='cb-container' >
                <div className='character-box'>
                    <div >
                        <h1 className="text">INVENTORY</h1>  
                            <div>
                                <Weapons weapons={this.state.backpack.weapon} equipWeapon={this.equipWeapon} equippedWeapon={this.state.equippedWeapon}/>
                            </div>
                            <div>
                                <EquippedWeapon equippedWeapon={this.state.equippedWeapon} weapons={this.state.backpack.weapon}/>
                            </div>
                            <div style={{height: '10px'}}></div>
                            <div>
                                <Medical useMedicalItem={this.handleMedicalItem} medical={this.state.backpack.medical} />
                            </div>
                            <div>
                                <Vitals vitals={this.state.vitals}/>
                            </div>
                            <div style={{height: '16px'}}></div>
                    </div>
                <div className='Story-Box-container'>
                    <div className='Story-Box'>

                        <Typewriter
                          onInit={(typewriter) => {

                                typewriter.changeDelay(150).typeString(messages[this.props.level].first)
                                .pauseFor(1000)
                                .typeString("<br display='block' margin='0px 0px'></br>")
                                  // .callFunction(() => {
                                  //   console.log('String typed out!');
                                  // })
                                  .pauseFor(2000)
                                  .typeString(messages[this.props.level].second)
                                  .pauseFor(2000)
                                  .deleteAll()
                                  .callFunction(() => {
                                    return
                                  })
                                  .start()}}
                        />
                        
                    </div>
                </div>
                    
                </div>
            </div>
        )
    }
}

export default Character