import React, { Component } from 'react'
import Weapons from './Weapons'
import Medical from './Medical'


class Inventory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
            }
        }
    }

    componentDidMount(props) {
        this.setState({
            inventoryChanges: this.props.inventoryChanges
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.pickedUpItem !== prevProps.pickedUpItem){
            const backpack = this.state.backpack

            console.log("here is copied backpack", backpack)

            const itemType = this.props.pickedUpItem.type

            console.log(itemType)

            const slot = backpack[itemType].findIndex((e, idx) => {
                return e[idx] === null  
            })

            const newSlots = this.state.backpack
            newSlots[itemType].splice(slot, 1, this.props.pickedUpItem)
            console.log("here are the new slots", newSlots)
            this.setState({
                backpack: newSlots
            })
        }
    }

    render() {
        return(
            <div id='inventory-box'>
                <div >
                    <h1>Inventory</h1>
                        <Weapons weapons={this.state.backpack.weapon} />
                        <Medical medical={this.state.backpack.medical} />
                </div>
            </div>
        )
    }
}

export default Inventory