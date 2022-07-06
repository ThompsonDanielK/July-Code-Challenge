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
        if (this.spades.total > 4 && this.findConsecutiveRanks(this.spades) > 4) {
            
        }
    }

    straightFlushChecker(suit) {
        const numberOfConsecutiveRanks = this.findConsecutiveRanks(suit);
    }

    findConsecutiveRanks(cards) {
        let consecutiveRanks = 0;
        let previousRank;        
        let sortedRankList = convertRanksToSortedNumericalList(rankList);
        for (let index = 0; index < sortedRankList.length; index++) {
            const rank = sortedRankList[index];
            if (rank - 1 == previousRank) {
                consecutiveRanks++;
            } else {
                consecutiveRanks = 0;
            }
            previousRank = rank;            
        }
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
            rankList.add(rank);
        }
        return rankList.sort(function(a, b){return a - b});
    }
}