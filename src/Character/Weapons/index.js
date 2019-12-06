import React from 'react'
import '../inventory.css'
import imageStyle from '../image.js'


const Weapons = (props) => {
    let defaultSlotId = 'not-equipped'
    const gunList = props.weapons.map((value, idx) => {
        let slotId = 'not-equipped'
        if (value !== null) {
            if (props.equippedWeapon == idx) {
                slotId = 'equipped'
            }
            return (
                <div key={idx} id={slotId} className='slots' onClick={props.equipWeapon.bind(null, idx)} >
                    <img style={imageStyle} src={value.image} />
                 </div>
                )
        } else {
            return (
                <div id={slotId} className='slots'>
                    <div style={imageStyle}></div>
                </div>
            )
        }    
    })
    return(
        <div className='inventory-type'>
            {gunList}   
        </div>
    )
}

export default Weapons