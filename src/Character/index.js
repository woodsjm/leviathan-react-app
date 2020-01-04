import React, { Component } from 'react'
import Weapons from './Weapons'
import Medical from './Medical'
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
                shields: 100
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
        //console.log(this.state.backpack.weapon)
        //console.log(weapon)
        if (weapon[idx] === null) {
            const attackResult = this.props.attack(0, 0)
            console.log(attackResult)
        } else if (weapon !== null) {
            const attackResult = this.props.attack(weapon['damage'], weapon['accuracy'])
        }
        // if (weapon !== null) {
        //     const attackResult = this.props.attack(weapon['damage'], weapon['accuracy'])
        //     // damage = weapon.damage
        //     // accuracy = weapon.accuracy
        // } else {
        //     const attackResult = this.props.attack(0, 0)
        // }
        
        //const attackResult = this.props.attack(0, 0)
        // console.log("Here is the result of attack", attackResult)
    }

    render() {
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
                    </div>
                    <div>
                        <h3>Stats</h3>


                    </div>
                </div>
            </div>
        )
    }
}

export default Character