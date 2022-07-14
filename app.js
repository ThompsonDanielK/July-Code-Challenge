let spades = {};
let hearts = {};
let clubs = {};
let diamonds = {};

function hand(holeCards, comCards) {
    spades = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:0, consecutiveRanks:[]};
    hearts = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:0, consecutiveRanks:[]};
    clubs = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:0, consecutiveRanks:[]};
    diamonds = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:0, consecutiveRanks:[]};
    const allCards = holeCards.concat(comCards);
    countCards(allCards);
    let suits = [clubs, diamonds, hearts, spades];
    suits.forEach(suit => {
        const sortedNumericalRankList = convertRanksToSortedNumericalList(suit);
        suit.consecutiveRanks = findConsecutiveRanks(sortedNumericalRankList);          
    });
    return findWinningHands();
}

function countCards(cards) {
    cards.forEach(card => {
        const suit = card[card.length - 1];
        const rank = card.substring(0, card.length - 1);
        switch(suit) {
            case "♦":
                diamonds[rank]++;
                diamonds.total++;
                break;
            case "♣":
                clubs[rank]++;
                clubs.total++;
                break;
            case "♥":
                hearts[rank]++;
                hearts.total++;
                break;
            case "♠":
                spades[rank]++;
                spades.total++;
                break;
        }
    });
}

function findWinningHands() {
    if (straightFlushChecker()) {
        return printWinner("Straight-Flush");                    
    }
    const suitSameRanks = sameRankCounter();
    const highestNumberOfSameRanks = Math.max(...suitSameRanks);
    switch(highestNumberOfSameRanks) {
        case 4:
            return printWinner("Four-of-a-Kind");
        case 3:
            if (fullHouseChecker(suitSameRanks)) {
                return printWinner("Full House");
            } else if (flushChecker()) {
                return printWinner("Flush");                   
            } else if (straightChecker()) {
                return printWinner("Straight");
            } else {
                return printWinner("Three-of-a-Kind");
            }
        case 2:
            if (flushChecker()) {
                return printWinner("Flush");                   
            } else if (straightChecker()) {
                return printWinner("Straight");
            } else {
                if (suitSameRanks.length > 1) {
                    let numberOfPairs = 0;
                    for (let index = 0; index < suitSameRanks.length; index++) {
                        if (suitSameRanks[index] == 2) {
                            numberOfPairs++;
                        }
                        if (numberOfPairs > 1) {
                            return printWinner("Two Pair");
                        }
                    }
                } else {
                    return printWinner("Pair");
                }
            }
        default:
            break;
    }
    if (flushChecker()) {
        return printWinner("Flush");                   
    } else if (straightChecker()) {
        return printWinner("Straight");
    }
    return printWinner("High Card")
}

function straightFlushChecker() {
    let suits = [clubs, diamonds, hearts, spades];
    for(let index = 0; index < suits.length; index++) {
        if (suits[index].total > 4) {
            if (suits[index].consecutiveRanks.length > 4) {
                return true;
            }
        }
    }
    return false;
}

function sameRankCounter() {
    let totalSameRanks = [];
    for (let index = 0; index < Object.keys(spades).length - 2; index++) {
        let suitSameRanks = 0;
        if (Object.values(spades)[index] > 0) {
            suitSameRanks++;
        } if (Object.values(hearts)[index] > 0) {
            suitSameRanks++;
        } if (Object.values(clubs)[index] > 0) {
            suitSameRanks++;
        } if (Object.values(diamonds)[index] > 0) {
            suitSameRanks++;
        } if (suitSameRanks > 1) {
            totalSameRanks.push(suitSameRanks);
        }
    }
    return totalSameRanks;
}

function fullHouseChecker(suitsSameRanks) {
    if (suitsSameRanks.includes(3) && suitsSameRanks.includes(2)) {
        return true;
    }
    return false
}

function flushChecker() {
    let suits = [clubs, diamonds, hearts, spades];
    let hasFlush = false;
    suits.forEach(suit => {
        if (suit.total > 4) {                
            hasFlush = true;                
        }
    });
    return hasFlush;
}

function straightChecker() {
    const sortedRanks = sortByRank();
    const sortedRanksNoDuplicates = [...new Set(sortedRanks)];
    const sortedNumericalRanksNoDuplicates = convertRankToNumber(sortedRanksNoDuplicates);
    const consecutiveRanks = findConsecutiveRanks(sortedNumericalRanksNoDuplicates);
    if (consecutiveRanks.length > 4) {
        return true;
    }
    return false;
}

function findConsecutiveRanks(sortedNumericalRankList) {
    let consecutiveRanks = [];
    let longestConsecutiveRanks = [];    
    for (let index = 0; index < sortedNumericalRankList.length; index++) {
        if (index == sortedNumericalRankList.length - 1 && parseInt(sortedNumericalRankList[index - 1]) == parseInt(sortedNumericalRankList[index]) - 1) {
            consecutiveRanks.push(sortedNumericalRankList[index]);
        } else if (index === 0 && parseInt(sortedNumericalRankList[index + 1]) == parseInt(sortedNumericalRankList[index]) - 1) {
            consecutiveRanks.push(sortedNumericalRankList[index]);
        } else if (index < sortedNumericalRankList.length - 2 && 
                    parseInt(sortedNumericalRankList[index - 1]) == parseInt(sortedNumericalRankList[index]) + 1 ||
                    parseInt(sortedNumericalRankList[index + 1]) == parseInt(sortedNumericalRankList[index]) - 1) {
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
                numberRank = rank;
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

function sortByRank() {
    let ranks = [];
    let suits = [clubs, diamonds, hearts, spades];
    suits.forEach(suit => {
        let numericalList = convertRanksToSortedNumericalList(suit);
        ranks = ranks.concat(numericalList);           
    });
    ranks.sort(function(a, b){return b - a});
    return convertNumericalRankToSymbol(ranks);
}

function printWinner(type) {
    const ranksList = sortByRank();
    const ranks = [...new Set(ranksList)];
    return {type:type, ranks};
}

module.exports = {
    hand,
    countCards,
    findWinningHands,
    straightFlushChecker,
    sameRankCounter,
    fullHouseChecker,
    flushChecker,
    straightChecker,
    findConsecutiveRanks,
    convertRanksToSortedNumericalList,
    convertNumericalRankToSymbol,
    sortByRank,
    printWinner
}