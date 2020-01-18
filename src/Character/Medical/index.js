import React from 'react'
import '../character.css'
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
        <div className='inventory-type' augmented-ui='tl-clip tr-clip br-clip bl-clip exe'>
            {medList}   
        </div>
    )
}

export default Medical