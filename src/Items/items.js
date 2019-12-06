const items = [
    {weapons: [
        {
            type: 'weapon',
            image: 'Leviathan-Items/Weapons/HandGun1.png',
            name: "ZR-500",
            damage: 50,
            accuracy: 50 
            
        },
        {
            type: 'weapon',
            image: 'Leviathan-Items/Weapons/AssaultRifle1.png',
            name: "Mylan",
            damage: 75,
            accuracy: 25
            
        }
    ]},
    {emergency: [
        {   
            type: 'medical',
            image: 'Leviathan-Items/Medical/MedKit.png',
            name: "MedKit",
            heal: 10
        }
    ]}
]


const getItemsToPopulate = () => {

    const levelItems = []

    for (let i = 0; i < items.length; i++) {
        
        let max = (items[i][Object.keys(items[i])].length) - 1
        let key = Object.keys(items[i])
        let randNum = Math.floor(Math.random() * ((max - 0) + 1) + 0)
        levelItems.push(items[i][key][randNum])
    }
    
    return levelItems
}

export { items, getItemsToPopulate }