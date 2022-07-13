let spades = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:0, consecutiveRanks:[]};
let hearts = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:0, consecutiveRanks:[]};
let clubs = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:0, consecutiveRanks:[]};
let diamonds = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:0, consecutiveRanks:[]};

function hand(holeCards, comCards) {
    let allCards = holeCards.concat(comCards);
    countCards(allCards);
    let suits = [clubs, diamonds, hearts, spades];
    suits.forEach(suit => {
        suit.consecutiveRanks = findConsecutiveRanks(suit);          
    });
    findWinningHands();
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
    let suits = [clubs, diamonds, hearts, spades];
    suits.forEach(suit => {           
        suit.consecutiveRanks = findConsecutiveRanks(suit);
    });
    if (straightFlushChecker()) {
        return;
    }
    let suitSameRanks = sameRankCounter();
    switch(suitSameRanks) {
        case 4:
            printWinner("Four-of-a-Kind");
            return;
        case 3:
            if (fullHouseChecker() || flushChecker() || straightChecker()) {
                return;
            } else {
                printWinner("Three-of-a-Kind");
                return;
            }
        case 2:
            printWinner("Pair");
            return;
        default:
            break;
    }
    if (flushChecker() || straightChecker()) {
        return;
    }
}

function straightFlushChecker() {
    let suits = [clubs, diamonds, hearts, spades];
    for(let index = 0; index < suits.length; index++) {
        if (suits[index].total > 4) {
            if (suits[index].consecutiveRanks.length > 4) {
                printWinner("Straight-Flush");                    
                return true;
            }
        }
    }
    return false;
}

function sameRankCounter() {
    let totalSameRanks = 0;
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
        } if (suitSameRanks > totalSameRanks) {
            totalSameRanks = suitSameRanks;
        }
    }
    return totalSameRanks;
}

function fullHouseChecker() {
    let suits = [clubs, diamonds, hearts, spades];
    let threeOfASuit = false;
    let twoOfASuit = false;
    suits.forEach(suit => {
        if (suit.total = 3) {
            threeOfASuit = true;
        } else if (suit.total = 2) {
            twoOfASuit = true;
        }
    });
    if ( threeOfASuit && threeOfASuit) {
        printWinner("Full House");
        return true;               
    }
    return false;
}

function flushChecker() {
    let suits = [clubs, diamonds, hearts, spades];
    suits.forEach(suit => {
        if (suit.total > 4) {                
            printWinner("Flush");                    
            return true;                
        }
    });
    return false;
}

function straightChecker() {
    let consecutiveRanks = sortByRank();
    if (consecutiveRanks.length > 4) {
        printWinner("Straight");
        return true;
    }
    return false;
}

function findConsecutiveRanks(cards) {
    let consecutiveRanks = [];    
    let sortedNumericalRankList = convertRanksToSortedNumericalList(cards);
    for (let index = 0; index < sortedNumericalRankList.length; index++) {
        if (index == sortedNumericalRankList.length - 1 && parseInt(sortedNumericalRankList[index - 1]) == parseInt(sortedNumericalRankList[index]) - 1) {
            consecutiveRanks.push(sortedNumericalRankList[index]);
        }
        if (parseInt(sortedNumericalRankList[index + 1]) == parseInt(sortedNumericalRankList[index]) - 1) {
            consecutiveRanks.push(sortedNumericalRankList[index]);
        } else if (parseInt(sortedNumericalRankList[index]) + 1 == parseInt(sortedNumericalRankList[index - 1])) {
            consecutiveRanks.push(sortedNumericalRankList[index]);
        }        
    }
    let convertedConsecutiveRanks = convertNumericalRankToSymbol(consecutiveRanks);
    return convertedConsecutiveRanks;
}

function convertRanksToSortedNumericalList(cards) {
    let rankList = [];
    for (let index = 0; index < Object.keys(cards).length - 2; index++) {
        let rank;
        const suitKey = Object.keys(cards)[index];
        if (cards[suitKey] > 0) {
            switch(suitKey) {
                case "A":
                    rank = 11;
                    break;
                case "J":
                    rank = 12;
                    break;
                case "Q":
                    rank = 13;
                    break;
                case "K":
                    rank = 14;
                    break;
                default:
                    rank = suitKey;
            }
            rankList.push(rank);
        }
    }
    return rankList.sort(function(a, b){return b - a});
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
    console.log({type:type, ranks});
}