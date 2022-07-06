export default class App {
    spades = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:0};
    hearts = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:0};
    clubs = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:0};
    diamonds = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:0};

    hand(holeCards, comCards) {
        let allCards = holeCards.concat(comCards);
        this.countCards(allCards);
    }

    countCards(cards) {
        cards.forEach(card => {
            const suit = card[card.length - 1];
            const rank = card.substring(0, card.length - 2)
            switch(suit) {
                case "♦":
                    diamonds[rank]++;
                    diamonds[total]++;
                    break;
                case "♣":
                    clubs[rank]++;
                    clubs[total]++;
                    break;
                case "♥":
                    hearts[rank]++;
                    hearts[total]++;
                    break;
                case "♠":
                    diamonds[rank]++;
                    diamonds[total]++;
                    break;
            }
        });
    }

    findWinningHands() {
        if (this.straightFlushChecker()) {
            return;
        } else if (fourOfAKindChecker()) {
            return;
        } else if (fullHouseChecker()) {
            return;
        }
    }

    straightFlushChecker() {
        let suits = [this.clubs, this.diamonds, this.hearts, this.spades];
        suits.forEach(suit => {
            if (suit.total > 4) {
                const consecutiveRanks = this.findConsecutiveRanks(suit);
                if (consecutiveRanks.length > 4) {
                    this.printWinner("Straight-Flush", consecutiveRanks);                    
                    return true;
                }
            }
        });
        return false;
    }

    fourOfAKindChecker() {
        suits.forEach(suit => {
            if (suit.total > 4) {
                const consecutiveRanks = this.findConsecutiveRanks(suit);
                this.printWinner("Four-Of-A-Kind", consecutiveRanks);
                return true;
            }
        });
        return false;
    }

    fullHouseChecker() {
        let suits = [this.clubs, this.diamonds, this.hearts, this.spades];
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
            const consecutiveRanks = this.findConsecutiveRanks(suit);
            this.printWinner("Full House", consecutiveRanks);
            return true;               
        }
        return false;
    }

    findConsecutiveRanks(cards) {
        let consecutiveRanks = [];
        let previousRank;        
        let sortedNumericalRankList = convertRanksToSortedNumericalList(rankList);
        for (let index = 0; index < sortedNumericalRankList.length; index++) {
            const rank = sortedNumericalRankList[index];
            if (rank - 1 == previousRank) {
                consecutiveRanks.push(rank);
            }
            previousRank = rank;            
        }
        consecutiveRanks = this.convertRanksToSortedStringListWithoutDuplicates(consecutiveRanks);
        return consecutiveRanks;
    }

    convertRanksToSortedNumericalList(cards) {
        let rankList = [];
        for (let index = 0; index < Object.keys(cards).length; index++) {
            let rank;
            suitKey = Object.keys(cards)[index];
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
        return rankList.sort(function(a, b){return a - b});
    }

    convertRanksToSortedStringListWithoutDuplicates(cards) {
        let rankList = [];
        for (let index = 0; index < Object.keys(cards).length; index++) {
            let rank;
            let suitKey = Object.keys(cards)[index];
            switch(suitKey) {
                case 11:
                    rank = "A";
                    break;
                case 12:
                    rank = "J";
                    break;
                case 13:
                    rank = "Q";
                    break;
                case 14:
                    rank = "K";
                    break;
                default:
                    rank = suitKey.toString();
            }
            rankList.push(rank);
        }
        let uniqueRankList = [...new Set(rankList)];
        return uniqueRankList;
    }

    printWinner(type, consecutiveRanks) {
        console.log({type:type,  ranks:consecutiveRanks});
    }
}