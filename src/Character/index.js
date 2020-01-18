import React, { Component } from 'react'
import Weapons from './Weapons'
import Medical from './Medical'
import Vitals from './Vitals'
import EquippedWeapon from './EquippedWeapon'
import ReactTypingEffect from 'react-typing-effect';
import Typewriter from 'typewriter-effect'
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
            <div className='cb-container' augmented-ui='tl-clip br-clip exe'>
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
                                <Medical medical={this.state.backpack.medical} />
                            </div>
                            <div>
                                <Vitals vitals={this.state.vitals}/>
                            </div>
                            <div style={{height: '16px'}}></div>
                    </div>
                <div className='Story-Box-container'>
                    <div className='Story-Box' augmented-ui='b-clip exe'>
                        <Typewriter
                          onInit={(typewriter) => {
                                typewriter.changeDelay(150).typeString("Welcome to Level One of Leviathan Wakes...")
                                .pauseFor(1000)
                                .typeString("<br display='block' margin='0px 0px'></br>")
                                  // .callFunction(() => {
                                  //   console.log('String typed out!');
                                  // })
                                  .pauseFor(2000)
                                  .typeString('Move around using the arrow keys.')
                                  .pauseFor(4000)
                                  .deleteAll()
                                  .callFunction(() => {
                                    console.log('All strings were deleted');
                                  })
                                  .start();
                              }}
                           />
                    </div>
                </div>
                    
                </div>
            </div>
        )
    }
}

export default Character

// <div>
// <h3>Lives Remaining: {this.props.lives}</h3>
// </div>