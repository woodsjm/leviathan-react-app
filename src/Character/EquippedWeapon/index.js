import React from 'react'
import './equippedWeapon.css'

const EquippedWeapon = (props) => {
    let weapon = props.weapons[props.equippedWeapon]
    let damage = 0;
    let accuracy = 0;

    if (weapon.damage !== undefined && weapon.accuracy !== undefined) {
        damage = weapon.damage
        accuracy = weapon.accuracy
    }
   
    return(
        <div className='box'>
            <div className='title-box'>
                <div className='title'>
                    Equipped Stats
                </div>
            </div>
            <div className='container'>
                <div className='weapon-stats-box'>
                    <div>
                        <p>Damage: {`${damage}`}</p>
                    </div>
                    <div>
                        <p>Accuracy: {`${accuracy}`}</p>
                    </div>
                </div>
            </div>
        </div>
        )
} 

export default EquippedWeapon