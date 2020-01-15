import React from 'react'
import 'augmented-ui/augmented.css'
import './in-game-menu.css'

const InGameMenu = () => {
    return(
        <div className='In-Game-Menu-Container' augmented-ui='tl-clip br-clip exe'>
            <div className='menu'>
                <h1>Ingame Menu</h1>
            </div>
        </div>
        )
}

export default InGameMenu