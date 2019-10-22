import React from 'react'
import './levels.css';

const Level1 = () => {

    const tileImageNum = 1

    const tileStyle = {

        position: 'relative',
        width: '64px',
        height: '64px',
        textAlign: 'center',

        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundImage: `url(/Leviathan-Tiles/tile${tileImageNum}.png)`

    }

    return(
        <div>

            <h1>
            Here is Level One.
            </h1>

            <div className='map_level'>

                <div className='map_row'>

                    <div className='outerspace_tile' style={tileStyle} data-x='0' data-y='0'>
                        <img className='sprite' src={'/Leviathan-Sprites/tile000.png'} />
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Level1

// <img className='tile' src={'/Leviathan-Tiles/tile000.png'}/>