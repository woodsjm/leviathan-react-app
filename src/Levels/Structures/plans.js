const plans = {
    1: `
**********mn
ab***AB***po
dc***DC***ij
@+*&&&****lk
%#*&?&****ij
@+*&&&****lk
%#********ij
ef**&&&***lk
hg**&?&***qr
****&&EF**ts
******HG****
***********!`
,

    2: `
&&*****?****
uvuvuvuvab&*
xwxwxwxwdc**
yzyzyzyzef&*
<><><><>hg**
****&**&**&*
*&mnuvuvuvuv
**poxwxwxwxw
*&qryzyzyzyz
**ts<><><><>
*&*?***&****
****&**&**&!`,

    3: `
*&*****&****
****&**&**&*
*&*****&****
**AB&**&**&*
*&DC***&****
****&**&**&*
*&*****&****
****&**&**&*
*&*****&****
****&**&**&*
*&*****&****
****&**&**&*
`,

    4: `
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
const startPos = {1: {top: 0, left: 0}, 2: {top: 0, left: 0}, 3: {top: 0, left: 0}}

const enemyStart = {
    1: [{top: 9, left: 4, health: 100, damage: 10, accuracy: 20}, {top: 7, left: 6, health: 100, damage: 10, accuracy: 20}],
    2: [{top: 5, left: 3, health: 100, damage: 10, accuracy: 20}, {top: 5, left: 8, health: 100, damage: 10, accuracy: 20}, {top: 11, left: 2, health: 100, damage: 10, accuracy: 20}]
}

const plan = (level) => {
    const plan = plans[level]
    return plan.trim().split('\n').map(l => [...l]);
}

export { enemyStart, plan, startPos }