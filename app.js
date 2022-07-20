function hand(holeCards, comCards) {
    const suit = {2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:0, consecutiveRanks:[]};
    const allCards = holeCards.concat(comCards);
    let handSortedBySuit = {clubs:{...suit}, diamonds:{...suit}, hearts:{...suit}, spades:{...suit}};
    handSortedBySuit = countCards(allCards, handSortedBySuit);
    Object.keys(handSortedBySuit).forEach(suit => {
        const sortedNumericalRankList = convertRanksToSortedNumericalList(handSortedBySuit[suit]);
        handSortedBySuit[suit].consecutiveRanks = findConsecutiveRanks(sortedNumericalRankList);          
    });
    return findWinningHands(handSortedBySuit);
}

function countCards(cards, handSortedBySuit) {
    cards.forEach(card => {
        const suit = card[card.length - 1];
        const rank = card.substring(0, card.length - 1);
        switch(suit) {
            case "♦":
                handSortedBySuit.diamonds[rank]++;
                handSortedBySuit.diamonds.total++;
                break;
            case "♣":
                handSortedBySuit.clubs[rank]++;
                handSortedBySuit.clubs.total++;
                break;
            case "♥":
                handSortedBySuit.hearts[rank]++;
                handSortedBySuit.hearts.total++;
                break;
            case "♠":
                handSortedBySuit.spades[rank]++;
                handSortedBySuit.spades.total++;
                break;
        }
    });
    return handSortedBySuit;
}

function findWinningHands(handSortedBySuit) {
    if (straightFlushChecker(handSortedBySuit)) {
        return printWinner("Straight-Flush", handSortedBySuit);                    
    }
    const suitSameRanks = sameRankCounter(handSortedBySuit);
    const highestNumberOfSameRanks = Math.max(...suitSameRanks);
    switch(highestNumberOfSameRanks) {
        case 4:
            return printWinner("Four-of-a-Kind", handSortedBySuit);
        case 3:
            if (fullHouseChecker(suitSameRanks)) {
                return printWinner("Full House", handSortedBySuit);
            } else if (flushChecker(handSortedBySuit)) {
                return printWinner("Flush", handSortedBySuit);                   
            } else if (straightChecker(handSortedBySuit)) {
                return printWinner("Straight", handSortedBySuit);
            } else {
                return printWinner("Three-of-a-Kind", handSortedBySuit);
            }
        case 2:
            if (flushChecker(handSortedBySuit)) {
                return printWinner("Flush", handSortedBySuit);                   
            } else if (straightChecker(handSortedBySuit)) {
                return printWinner("Straight", handSortedBySuit);
            } else if (twoPairChecker(suitSameRanks)) {
                return printWinner("Two Pair", handSortedBySuit);
            } else {
                    return printWinner("Pair", handSortedBySuit);
                }            
        default:
            if (flushChecker(handSortedBySuit)) {
                return printWinner("Flush", handSortedBySuit);                   
            } else if (straightChecker(handSortedBySuit)) {
                return printWinner("Straight", handSortedBySuit);
            }
            return printWinner("High Card", handSortedBySuit);
    }    
}

function straightFlushChecker(handSortedBySuit) {
    const keys = Object.keys(handSortedBySuit);
    for(let index = 0; index < keys.length; index++) {
        if (handSortedBySuit[keys[index]].total > 4) {
            if (handSortedBySuit[keys[index]].consecutiveRanks.length > 4) {
                return true;
            }
        }
    }
    return false;
}

function fullHouseChecker(suitsSameRanks) {
    if (suitsSameRanks.includes(3) && suitsSameRanks.includes(2)) {
        return true;
    }
    return false
}

function flushChecker(handSortedBySuit) {
    let keys = Object.keys(handSortedBySuit);
    let hasFlush = false;
    keys.forEach(suit => {
        if (handSortedBySuit[suit].total > 4) {                
            hasFlush = true;                
        }
    });
    return hasFlush;
}

function straightChecker(handSortedBySuit) {
    const sortedRanks = sortByRank(handSortedBySuit);
    const sortedRanksNoDuplicates = [...new Set(sortedRanks)];
    const sortedNumericalRanksNoDuplicates = convertRankToNumber(sortedRanksNoDuplicates);
    const consecutiveRanks = findConsecutiveRanks(sortedNumericalRanksNoDuplicates);
    if (consecutiveRanks.length > 4) {
        return true;
    }
    return false;
}

function twoPairChecker(suitSameRanks) {
    if (suitSameRanks.length > 1) {
        let numberOfPairs = 0;
        for (let index = 0; index < suitSameRanks.length; index++) {
            if (suitSameRanks[index] == 2) {
                numberOfPairs++;
            }
            if (numberOfPairs > 1) {
                return true;
            }
        }
    }
    return false;
}

function sameRankCounter(handSortedBySuit) {
    const suitKeys = Object.keys(handSortedBySuit.spades);
    let totalSameRanks = [];
    for (let index = 0; index < suitKeys.length - 2; index++) {
        const key = suitKeys[index]; 
        let suitSameRanks = 0;
        if (handSortedBySuit.spades[key] > 0) {
            suitSameRanks++;
        } if (handSortedBySuit.hearts[key] > 0) {
            suitSameRanks++;
        } if (handSortedBySuit.clubs[key] > 0) {
            suitSameRanks++;
        } if (handSortedBySuit.diamonds[key] > 0) {
            suitSameRanks++;
        } if (suitSameRanks > 1) {
            totalSameRanks.push(suitSameRanks);
        }
    }
    return totalSameRanks;
}

function findConsecutiveRanks(sortedNumericalRankList) {
    let consecutiveRanks = [];
    let longestConsecutiveRanks = [];    
    for (let index = 0; index < sortedNumericalRankList.length; index++) { 
        if ((index == 0 && (sortedNumericalRankList[index] == sortedNumericalRankList[index + 1] + 1))
            || (index == sortedNumericalRankList.length - 1 && (sortedNumericalRankList[index] == sortedNumericalRankList[index - 1] - 1))
            || (sortedNumericalRankList[index] == sortedNumericalRankList[index - 1] - 1)) {
            consecutiveRanks.push(sortedNumericalRankList[index]);
        } else {
            consecutiveRanks = [];
        }
        if (consecutiveRanks.length > longestConsecutiveRanks.length) {
            longestConsecutiveRanks = consecutiveRanks;
        }      
    }
    const convertedConsecutiveRanks = convertNumericalRankToSymbol(longestConsecutiveRanks);
    return convertedConsecutiveRanks;
}

function convertRanksToSortedNumericalList(cards) {
    let rankList = [];
    for (let index = 0; index < Object.keys(cards).length - 2; index++) {
        let rank = [];
        const suitKey = Object.keys(cards)[index];
        if (cards[suitKey] > 0) {
            let suitKeyArray = [suitKey];
            rank = convertRankToNumber(suitKeyArray);
            rankList = rankList.concat(rank);
        }
    }
    return rankList.sort(function(a, b){return b - a});
}

function convertRankToNumber(ranks) {
    let rankList = [];
    ranks.forEach(rank => {
        let numberRank;
        switch(rank) {
            case "A":
                numberRank = 11;
                break;
            case "J":
                numberRank = 12;
                break;
            case "Q":
                numberRank = 13;
                break;
            case "K":
                numberRank = 14;
                break;
            default:
                numberRank = parseInt(rank);
        }
        rankList.push(numberRank);
    });
    return rankList;
}

function convertNumericalRankToSymbol(ranks) {
    let convertedRankList = [];
    ranks.forEach(rank => {
        let convertedRank;
        switch(rank) {
            case 11:
                convertedRank = "A";
                break;
            case 12:
                convertedRank = "J";
                break;
            case 13:
                convertedRank = "Q";
                break;
            case 14:
                convertedRank = "K";
                break;
            default:
                convertedRank = rank.toString();
        }
        convertedRankList.push(convertedRank);
    });
    return convertedRankList;
}

function sortByRank(handSortedBySuit) {
    let keys = Object.keys(handSortedBySuit);
    let ranks = [];
    keys.forEach(suit => {
        let numericalList = convertRanksToSortedNumericalList(handSortedBySuit[suit]);
        ranks = ranks.concat(numericalList);           
    });
    ranks.sort(function(a, b){return b - a});
    return convertNumericalRankToSymbol(ranks);
}

function printWinner(type, handSortedBySuit) {
    const ranksList = sortByRank(handSortedBySuit);
    const ranks = [...new Set(ranksList)];
    return {type:type, ranks};
}

module.exports = {
    hand,
    countCards,
    findWinningHands,
    straightFlushChecker,
    fullHouseChecker,
    flushChecker,
    straightChecker,
    twoPairChecker,
    sameRankCounter,
    findConsecutiveRanks,
    convertRanksToSortedNumericalList,
    convertNumericalRankToSymbol,
    sortByRank,
    printWinner
}