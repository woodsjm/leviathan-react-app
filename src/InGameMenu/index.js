import React from 'react'
import 'augmented-ui/augmented.css'
import './in-game-menu.css'

const InGameMenu = (props) => {
    return(
        <div className='In-Game-Menu-Container' augmented-ui='tl-clip br-clip exe'>
            <div className='menu'>
                <h1 className='menu-text'>Ingame Menu</h1>
                <h3 onClick={props.changeUser}>Change User</h3>
            </div>
        </div>
        )
}

export default InGameMenu