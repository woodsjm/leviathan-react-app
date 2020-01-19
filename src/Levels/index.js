import React from 'react'
import './levels.css';
import { plan } from './Structures/plans.js'
import tileImages from './Tiles/tiles.js'


const tileTypes = {
    '?': 'loot',
    '&': 'floor',
    '*': 'floor',
    'z': 'exit'
}

const Level = (props) => {

    let levelStructure = props.structure
    let y = 12
    let x = 0

    console.log("Here props.structure: ", levelStructure) 

    const tiles = levelStructure.map(row => {
        return (
            row.map((imageType) => { 
                const tileStyle = {
                position: 'relative',
                width: '64px',
                height: '64px',
                textAlign: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundImage: tileImages[imageType]
                }
                if (x === 12) {
                    y -= 1
                    x = 0
                }
                x += 1
                
                return <div style={tileStyle} data-tile={tileTypes[imageType]} data-x={x} data-y={y} onClick={props.handleClick}></div>
            })    
        )   
    })

    return(
        <div>
            <div className='map_level'>
                {tiles}
            </div>
        </div>
    )
}

export default Level