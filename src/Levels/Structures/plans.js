/* 

Walls

EastFacing:
    NE: !
    NW: @
    SE: #
    SW: %

*/


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


const plan = (level) => {
    const plan = plans[level]

    console.log(plan)
    
    return plan.trim().split('\n').map(l => [...l]);
}

export { plan }