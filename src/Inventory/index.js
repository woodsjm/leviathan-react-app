import React, { Component } from 'react'
import Weapons from './Weapons'
import Medical from './Medical'

const rando = {
    image: 'Leviathan-Items/Weapons/AssaultRifle1.png'
}


class Inventory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            backpack: { 
                weapons: 
                { slot1: this.props.items.weapons.handgun,
                  slot2: rando
                }
            }
        }
    }

    componentDidMount(props) {
        
    }

    
    render() {
        return(
            <div id='inventory-box'>
                <div >
                    <h1>Inventory</h1>
                        <Weapons weapons={this.state.backpack.weapons} />
                        <Medical />
                </div>

            </div>
            )
    }
}

export default Inventory