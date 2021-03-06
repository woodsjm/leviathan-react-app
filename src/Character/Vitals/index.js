import React from 'react'
import './vitals.css'

const Vitals = (props) => {
    let health = props.vitals['health'];
    let shield = props.vitals.shield
   
    return(
        <div className='box'>
            <div className='title-box'>
                <div className='title' id="title-name">
                    Player Vitals
                </div>
            </div>
            <div className='container'>
                <div className='vitals-stats-box' >
                    <div>
                        <p>Health: {`${health}`}</p>
                    </div>
                    <div>
                        <p>Shield: {`${shield}`}</p>
                    </div>
                </div>
            </div>
        </div>
        )
} 

export default Vitals