
const plans = {
    1: `
*&*****&**mn
ab**&**&**po
dc*****&**ij
@+**&**&**lk
%#**?**&**ij
@+**&**&**lk
%#*****&**ij
ef**&**&**lk
hg***?*&**qr
****&**&**ts
*&*****&****
****&**&**&*`
,

    2: `
*&*****&****
****&**&**&*
*&*****&****
****&**&**&*
*&*****&****
****&**&**&*
*&*****&****
****&**&**&*
*&*****&****
****&**&**&*
*&*****&****
****&**&**&*
`
}

// Starting positions for each level
const startPos = {
    1: {top: 0, left: 0},
    2: {top: 0, left: 1}
}

const enemyStart = {
    1: [{top: 9, left: 4, health: 100, damage: 10, accuracy: 20}, {top: 7, left: 6, health: 100, damage: 10, accuracy: 20}]
}

const plan = (level) => {
    const plan = plans[level]
    return plan.trim().split('\n').map(l => [...l]);
}

export { plan, startPos, enemyStart }