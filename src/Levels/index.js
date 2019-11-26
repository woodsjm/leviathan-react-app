import React from 'react'
import './levels.css';
import { plan } from './Structures/plans.js'
import tileImages from './Tiles/tiles.js'

const Level = (props) => {

    let levelStructure = plan(props.level)

    console.log(levelStructure)

    


    let y = 12
    let x = 0 

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

                if (imageType === '*' || '&') {
                    return <div style={tileStyle} data-tile='floor' data-x={x} data-y={y}></div>
                } else {
                    return <div style={tileStyle} data-x={x} data-y={y}></div>
                }
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