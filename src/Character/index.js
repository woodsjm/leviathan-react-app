import React, { Component } from 'react'
import Weapons from './Weapons'
import Medical from './Medical'
import Vitals from './Vitals'
import EquippedWeapon from './EquippedWeapon'
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
            this.setState({vitals})
        }
    }

    render() {
        if (this.state.vitals.health <= 0) {
            this.props.restartLevel()
        }
        return(
            <div id='character-box'>
                <div>
                    <div>
                        <h3>Inventory</h3>  
                            <div>
                                <Weapons weapons={this.state.backpack.weapon} equipWeapon={this.equipWeapon} equippedWeapon={this.state.equippedWeapon}/>
                            </div>
                            <div>
                                <EquippedWeapon equippedWeapon={this.state.equippedWeapon} weapons={this.state.backpack.weapon}/>
                            </div>
                            <div>
                                <Medical medical={this.state.backpack.medical} />
                            </div>
                            <div>
                                <Vitals vitals={this.state.vitals}/>
                            </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Character