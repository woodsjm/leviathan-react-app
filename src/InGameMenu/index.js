import React, { Component } from 'react'
import 'augmented-ui/augmented.css'
import './in-game-menu.css'
import { Dropdown, Menu } from 'semantic-ui-react'
import Instructions from './instructions.js'

class InGameMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeItem: 'account',
            showInstructions: true
        }
    }

    render(props) {
        let instructions;
        if (this.state.showInstructions) {
            instructions = <Instructions />
        }
        return(
            <div className='In-Game-Menu-Container' augmented-ui='tl-clip br-clip exe'>
                <h1 className='menu-title'>MENU</h1>

                <div >
                    
                    <div className="menu-item" >
                        New Account
                    </div>

                    <div className="menu-item" >
                        Log Out
                    </div>
                    <div className="menu-item" >
                        Instructions
                    </div>
                </div>
                <div className='instructions-container'>
                    <div className='instructions' augmented-ui='t-clip b-clip exe'>
                        {instructions}
                    </div>
                </div>
            </div>
            )
    }
}

export default InGameMenu

// <h1>Menu</h1>
// <h3 onClick={props.changeUser}>Change User</h3>