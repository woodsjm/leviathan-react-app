import React from 'react'
import './instructions.css'

const Instructions = () => {
    return(
        <div style={{margin: '10px 0px 10px 0px'}}>
            <p style={{fontSize: '16px', textAlign: 'left'}}>Your goal is to reach the exit alive after killing all 
               enemies on the map.</p>
            <p style={{fontSize: '16px', textAlign: 'left'}}>
               You can move your character using the arrow keys and collect 
               loot items by walking onto a black tile. To attack, move towards an enemy that is on an adjacent tile.</p>
            <p style={{fontSize: '16px', textAlign: 'left'}}> 
               A weapon held in an inventory slot must
               be equipped to be used in battle. To use a med pack in inventory
               simply click it.</p>

            <hr></hr>

            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{margin: '15px 0px 0px 0px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    
                    <div className="loot-img img-container">
                    </div>

                    <div>
                        <p style={{fontSize: '25px', textAlign: 'center', color: 'purple', bottom: '0'}}>Loot Box</p>
                    </div>

                    <div style={{margin: '10px 0px'}}></div>


                    

                    <div className="exit-img img-container">
                    </div>

                    <div>
                        <p style={{fontSize: '25px', textAlign: 'center', color: 'purple', bottom: '0'}}>Level Exit</p>
                    </div>

                </div>
                <div>
                    
                </div>
            </div>   

        </div>
        )
}

export default Instructions

// <img src='/Leviathan-Tiles/space.png' width='64px' heigth='64px'/>