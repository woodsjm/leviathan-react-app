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
            showInstructions: false
        }
    }

    toggleInstructions = () => {
        this.setState({showInstructions: !this.state.showInstructions})
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
                    <div className="menu-item" onClick={this.props.logout}>
                        Log Out
                    </div>
                    <div className="menu-item" onClick={this.toggleInstructions}>
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