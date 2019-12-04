import React from 'react'
import '../inventory.css'

const Weapons = (props) => {

    const keys = Object.keys(props.weapons)
    
    const gunList = keys.map(value => {

        const image = {
            height: '50px',
            width: '60px',
        }
        
        return (
            <div className='slots'>
                <img style={image} src={props.weapons[value].image} />
            </div>
            )
    })

    


    return(
        <div className='inventory-type'>
            

            {gunList}

            
        </div>
        )
}

export default Weapons