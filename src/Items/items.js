const items = {
    weapons: {
        handgun: {
            image: 'Leviathan-Items/Weapons/HandGun1.png',
            name: "ZR-500",
            damage: 50,
            accuracy: 50 
        },
        rifle: {
            name: "Mylan",
            damage: 75,
            accuracy: 25
        }
    },
    medical: {
        name: "Bandage",
        heal: 10
    }
}

const getItems = () => {
    return items
}

export { items }