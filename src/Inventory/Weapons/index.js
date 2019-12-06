import React from 'react'
import '../inventory.css'
import imageStyle from '../image.js'


const Weapons = (props) => {
    const gunList = props.weapons.map(value => {
        if (value !== null) {
            return (
                <div className='slots'>
                    <img style={imageStyle} src={value.image} />
                 </div>
                )
        } else {
            return (
                <div className='slots'>
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