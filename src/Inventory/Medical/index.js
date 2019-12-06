import React from 'react'
import '../inventory.css'
import imageStyle from '../image.js'


const Medical = (props) => {
    const medList = props.medical.map(value => {
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
            {medList}   
        </div>
    )
}

export default Medical