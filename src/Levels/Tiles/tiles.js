const tileTypes = {
    '?': 'loot',
    '&': 'floor',
    '*': 'floor',
    'z': 'exit'
}

const tileImages = {

        '?': 'url(/Leviathan-Tiles/space.png',

        '!': 'url(/Leviathan-Tiles/Exit/escape-hatch.png',

        '*': 'url(/Leviathan-Tiles/Floor/basicFloor.png)',
        '&': 'url(/Leviathan-Tiles/Floor/stripedFloor.png)',

        // East Facing Wall
        '@': 'url(/Leviathan-Tiles/Walls/EastFacing/NW.png)',
        '+': 'url(/Leviathan-Tiles/tile169.png)',
        '#': 'url(/Leviathan-Tiles/Walls/EastFacing/SE.png)',
        '%': 'url(/Leviathan-Tiles/Walls/EastFacing/SW.png)',

        // NE Facing Corner
        'a': 'url(/Leviathan-Tiles/Walls/NECorner/NW.png',
        'b': 'url(/Leviathan-Tiles/Walls/NECorner/NE.png',
        'c': 'url(/Leviathan-Tiles/Walls/NECorner/SE.png',
        'd': 'url(/Leviathan-Tiles/Walls/NECorner/SW.png',

        // SE Facing Corner
        'e': 'url(/Leviathan-Tiles/Walls/SECorner/NW.png',
        'f': 'url(/Leviathan-Tiles/Walls/SECorner/NE.png',
        'g': 'url(/Leviathan-Tiles/Walls/SECorner/SE.png',
        'h': 'url(/Leviathan-Tiles/Walls/SECorner/SW.png',

        // West Facing Wall
        'i': 'url(/Leviathan-Tiles/Walls/WestFacing/NW.png)',
        'j': 'url(/Leviathan-Tiles/Walls/WestFacing/NE.png)',
        'k': 'url(/Leviathan-Tiles/Walls/WestFacing/SE.png)',
        'l': 'url(/Leviathan-Tiles/Walls/WestFacing/SW.png)',

        // NW Facing Corner
        'm': 'url(/Leviathan-Tiles/Walls/NWCorner/NW.png',
        'n': 'url(/Leviathan-Tiles/Walls/NWCorner/NE.png',
        'o': 'url(/Leviathan-Tiles/Walls/NWCorner/SE.png',
        'p': 'url(/Leviathan-Tiles/Walls/NWCorner/SW.png',

        // SW Facing Corner
        'q': 'url(/Leviathan-Tiles/Walls/SWCorner/NW.png',
        'r': 'url(/Leviathan-Tiles/Walls/SWCorner/NE.png',
        's': 'url(/Leviathan-Tiles/Walls/SWCorner/SE.png',
        't': 'url(/Leviathan-Tiles/Walls/SWCorner/SW.png',

        // North Facing Wall
        'u': 'url(/Leviathan-Tiles/Walls/NorthFacing/NW.png',
        'v': 'url(/Leviathan-Tiles/Walls/NorthFacing/NE.png',
        'w': 'url(/Leviathan-Tiles/Walls/NorthFacing/SE.png',
        'x': 'url(/Leviathan-Tiles/Walls/NorthFacing/SW.png',

        // South Facing Wall
        'y': 'url(/Leviathan-Tiles/Walls/SouthFacing/NW.png',
        'z': 'url(/Leviathan-Tiles/Walls/SouthFacing/NE.png',
        '>': 'url(/Leviathan-Tiles/Walls/SouthFacing/SE.png',
        '<': 'url(/Leviathan-Tiles/Walls/SouthFacing/SW.png',

        // Generator
        'A': 'url(/Leviathan-Tiles/Miscellaneous/Generator/NW.png',
        'B': 'url(/Leviathan-Tiles/Miscellaneous/Generator/NE.png',
        'C': 'url(/Leviathan-Tiles/Miscellaneous/Generator/SE.png',
        'D': 'url(/Leviathan-Tiles/Miscellaneous/Generator/SW.png',

        // Gravity Well
        'E': 'url(/Leviathan-Tiles/Miscellaneous/Well/NW.png',
        'F': 'url(/Leviathan-Tiles/Miscellaneous/Well/NE.png',
        'G': 'url(/Leviathan-Tiles/Miscellaneous/Well/SE.png',
        'H': 'url(/Leviathan-Tiles/Miscellaneous/Well/SW.png', 
     
}

export { tileImages, tileTypes }