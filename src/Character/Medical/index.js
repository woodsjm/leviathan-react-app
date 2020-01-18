import React from 'react'
import '../character.css'
import imageStyle from '../image.js'



const Medical = (props) => {
    const medList = props.medical.map((value, idx) => {
        if (value[idx] === null) {
            return (
                <div className='slots' id='equipped-medical'>
                    <div style={imageStyle}  ></div>
                </div>
            )
        } else if (value[idx] !== null) {
            return (
            <div key={idx} className='slots' id='equipped-medical'>
                <img style={imageStyle} src={value.image} onClick={props.useMedicalItem.bind(null, idx)}/>
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