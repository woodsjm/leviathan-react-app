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
*&*****&****
****&**&**&*
*&*****&****
@+**&**&**&*
%#*****&****
****&**&**&*
*&*****&****
****&**&**&*
*&*****&****
****&**&**&*
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
    
    return plan.trim().split('\n').map(l => [...l]);
}

export { plan }