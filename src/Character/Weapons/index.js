import React from 'react'
import '../character.css'
// import '../../augmented.css'
import imageStyle from '../image.js'


const Weapons = (props) => {
    let defaultSlotId = 'not-equipped'
    const gunList = props.weapons.map((value, idx) => {
        let slotId = 'not-equipped'
        if (value !== null) {
            if (props.equippedWeapon == idx) {
                slotId = 'equipped'
            }
            // let weaponExists = <img style={imageStyle} src={value.image} />
            // let weaponDoesNotExist = 
            let image;  
            if (value.image) {
                image = <img style={imageStyle} src={value.image} /> 
            } else {
                image = <div style={imageStyle}></div>
            }

            return (
                <div key={idx} id={slotId} className='slots' onClick={props.equipWeapon.bind(null, idx)} >
                    {image}
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
        <div className='inventory-type' >
            {gunList}   
        </div>
    )
}

export default Weapons

