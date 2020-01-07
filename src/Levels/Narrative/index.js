const constructBoilerPlateNarrative = (storyType1, element1, storyType2, element2) => {
    let narrative;
    
    if (storyType1 === 'loot') {
        narrative = `You picked up a ${element1}.`
        return narrative
    } else if (storyType1 === 'hitOpponent') {
        narrative = `You hit an enemy and dealt ${element1} in damage.`
    } else if (storyType1 === 'missedOpponent') {
        narrative = "You fired and missed"
    }

    let narrative2;

    if (storyType2 === 'hitByOpponent') {
        narrative2 = `You were hit by an enemy and were dealt ${element1}`
    } else if (storyType2 === 'opponentMissed') {
        narrative2 = "Enemy fired and missed"
    }

    return `${narrative}.${narrative2}`
}

export default constructBoilerPlateNarrative