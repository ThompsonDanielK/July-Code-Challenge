const app = require('./app.js');

describe("Define Winning Hand Integration Tests", () => {
    test('["A♥", "K♥"], ["J♥", "5♥", "10♥", "Q♥", "3♥"]', () => {
        expect(app.hand(["A♥", "K♥"], ["J♥", "5♥", "10♥", "Q♥", "3♥"])).toEqual({type: 'Straight-Flush', ranks: ['K', 'Q', 'J', 'A', '10', '5', '3']});
    });

    test('["A♠", "A♥"], ["A♣", "A♦", "8♥", "4♠", "9♥"]', () => {
        expect(app.hand(["A♠", "A♥"], ["A♣", "A♦", "8♥", "4♠", "9♥"])).toEqual({type: 'Four-of-a-Kind', ranks: ['A', '9', '8', '4']});
    });

    test('["A♠", "A♥"], ["A♣", "8♦", "8♥", "4♠", "9♥"]', () => {
        expect(app.hand(["A♠", "A♥"], ["A♣", "8♦", "8♥", "4♠", "9♥"])).toEqual({type: 'Full House', ranks: ['A', '9', '8', '4']});
    });

    test('["A♥", "2♥"], ["J♥", "5♥", "10♥", "Q♥", "3♥"]', () => {
        expect(app.hand(["A♥", "2♥"], ["J♥", "5♥", "10♥", "Q♥", "3♥"])).toEqual({type: 'Flush', ranks: ['Q', 'J', 'A', '10', '5', '3', '2']});
    });

    test('["A♠", "K♦"], ["J♥", "5♥", "10♠", "Q♥", "3♥"]', () => {
        expect(app.hand(["A♠", "K♦"], ["J♥", "5♥", "10♠", "Q♥", "3♥"])).toEqual({type: 'Straight', ranks: ['K', 'Q', 'J', 'A', '10', '5', '3']});
    });

    test('["3♠", "3♦"], ["J♥", "5♥", "10♠", "Q♥", "3♥"]', () => {
        expect(app.hand(["3♠", "3♦"], ["J♥", "5♥", "10♠", "Q♥", "3♥"])).toEqual({type: 'Three-of-a-Kind', ranks: ['Q', 'J', '10', '5', '3']});
    });

    test('["3♠", "3♦"], ["J♥", "5♥", "4♠", "Q♥", "4♥"]', () => {
        expect(app.hand(["3♠", "3♦"], ["J♥", "5♥", "4♠", "Q♥", "4♥"])).toEqual({type: 'Two Pair', ranks: ['Q', 'J', '5', '4', '3']});
    });

    test('["3♠", "3♦"], ["J♥", "5♥", "9♠", "Q♥", "4♥"]', () => {
        expect(app.hand(["3♠", "3♦"], ["J♥", "5♥", "9♠", "Q♥", "4♥"])).toEqual({type: 'Pair', ranks: ['Q', 'J', '9', '5', '4', '3']});
    });

    test('["3♠", "2♦"], ["J♥", "5♥", "9♠", "Q♥", "4♥"]', () => {
        expect(app.hand(["3♠", "2♦"], ["J♥", "5♥", "9♠", "Q♥", "4♥"])).toEqual({type: 'High Card', ranks: ['Q', 'J', '9', '5', '4', '3', '2']});
    });
});

describe("countCards Unit Tests", () => {
    test('["3♠", "2♦", "J♥", "5♥", "9♠", "Q♥", "4♥"]', () => {
        const suit = {2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:0, consecutiveRanks:[]};
        let handSortedBySuit = {clubs:{...suit}, diamonds:{...suit}, hearts:{...suit}, spades:{...suit}};

        let expected = {
            clubs:{2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:0, consecutiveRanks:[]},
            diamonds:{2:1, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:1, consecutiveRanks:[]},
            hearts:{2:0, 3:0, 4:1, 5:1, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":1, "Q":1, "K":0, total:4, consecutiveRanks:[]},
            spades:{2:0, 3:1, 4:0, 5:0, 6:0, 7:0, 8:0, 9:1, 10:0, "A":0, "J":0, "Q":0, "K":0, total:2, consecutiveRanks:[]}
        };
        expect(app.countCards(["3♠", "2♦", "J♥", "5♥", "9♠", "Q♥", "4♥"], handSortedBySuit)).toEqual(expected);
    });

    test('["3♠", "2♣", "J♥", "4♣", "9♠", "2♥", "4♥"]', () => {
        const suit = {2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:0, consecutiveRanks:[]};
        let handSortedBySuit = {clubs:{...suit}, diamonds:{...suit}, hearts:{...suit}, spades:{...suit}};

        let expected = {
            clubs:{2:1, 3:0, 4:1, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:2, consecutiveRanks:[]},
            diamonds:{2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:0, consecutiveRanks:[]},
            hearts:{2:1, 3:0, 4:1, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":1, "Q":0, "K":0, total:3, consecutiveRanks:[]},
            spades:{2:0, 3:1, 4:0, 5:0, 6:0, 7:0, 8:0, 9:1, 10:0, "A":0, "J":0, "Q":0, "K":0, total:2, consecutiveRanks:[]}
        };
        expect(app.countCards(["3♠", "2♣", "J♥", "4♣", "9♠", "2♥", "4♥"], handSortedBySuit)).toEqual(expected);
    });
});

describe("findWinningHands Unit Tests", () => {
    test('Two Pair', () => {
        let ops = {
            clubs:{2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:0, consecutiveRanks:[]},
            diamonds:{2:0, 3:0, 4:0, 5:1, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:1, consecutiveRanks:[]},
            hearts:{2:0, 3:1, 4:0, 5:1, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":1, "Q":1, "K":0, total:4, consecutiveRanks:[]},
            spades:{2:0, 3:1, 4:0, 5:0, 6:0, 7:0, 8:0, 9:1, 10:0, "A":0, "J":0, "Q":0, "K":0, total:2, consecutiveRanks:[]}
        };
        expect(app.findWinningHands(ops)).toEqual({type: "Two Pair", ranks: ["Q", "J", "9", "5", "3"]});
    });

    test('Straight', () => {
        let ops = {
            clubs:{2:1, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":1, "J":0, "Q":0, "K":0, total:2, consecutiveRanks:[]},
            diamonds:{2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":1, total:1, consecutiveRanks:[]},
            hearts:{2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:1, "A":0, "J":0, "Q":1, "K":0, total:2, consecutiveRanks:[]},
            spades:{2:1, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":1, "Q":0, "K":0, total:2, consecutiveRanks:[]}
        };
        expect(app.findWinningHands(ops)).toEqual({type: "Straight", ranks: ["K", "Q", "J", "A", "10", "2"]});
    });
});

describe("straightFlushChecker Unit Tests", () => {
    test('Positive Case', () => {
        let ops = {
            clubs:{2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:0, consecutiveRanks:[]},
            diamonds:{2:0, 3:1, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:1, consecutiveRanks:[]},
            hearts:{2:1, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:1, consecutiveRanks:[]},
            spades:{2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:1, "A":1, "J":1, "Q":1, "K":1, total:5, consecutiveRanks:["K", "Q", "J", "A", "10"]}
        };
        expect(app.straightFlushChecker(ops)).toBeTruthy();
    });

    test('Negative Case', () => {
        let ops = {
            clubs:{2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:0, consecutiveRanks:[]},
            diamonds:{2:0, 3:1, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:1, consecutiveRanks:[]},
            hearts:{2:1, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:1, consecutiveRanks:[]},
            spades:{2:0, 3:0, 4:0, 5:1, 6:0, 7:0, 8:0, 9:0, 10:1, "A":1, "J":1, "Q":1, "K":0, total:5, consecutiveRanks:["Q", "J", "A", "10"]}
        };
        expect(app.straightFlushChecker(ops)).toBeFalsy();
    });
});

describe("fullHouseChecker Unit Tests", () => {
    test('Positive Case', () => {
        let ops = [3, 2];
        expect(app.fullHouseChecker(ops)).toBeTruthy();
    });

    test('Negative Case', () => {
        let ops = [3];
        expect(app.fullHouseChecker(ops)).toBeFalsy();
    });
});

describe("straightChecker Unit Tests", () => {
    test('Positive Case', () => {
        let ops = {
            clubs:{2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":1, "J":0, "Q":0, "K":0, total:1, consecutiveRanks:[]},
            diamonds:{2:0, 3:1, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:1, consecutiveRanks:[]},
            hearts:{2:1, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:1, consecutiveRanks:[]},
            spades:{2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:1, "A":0, "J":1, "Q":1, "K":1, total:5, consecutiveRanks:["K", "Q", "J", "10"]}
        };
        expect(app.straightChecker(ops)).toBeTruthy();
    });

    test('Negative Case', () => {
        let ops = {
            clubs:{2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:0, consecutiveRanks:[]},
            diamonds:{2:0, 3:1, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:1, consecutiveRanks:[]},
            hearts:{2:1, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:1, consecutiveRanks:[]},
            spades:{2:0, 3:0, 4:0, 5:1, 6:0, 7:0, 8:0, 9:0, 10:1, "A":1, "J":1, "Q":1, "K":0, total:5, consecutiveRanks:["Q", "J", "A", "10"]}
        };
        expect(app.straightChecker(ops)).toBeFalsy();
    });
});

describe("twoPairChecker Unit Tests", () => {
    test('Positive Case', () => {
        let ops = [2, 2];
        expect(app.twoPairChecker(ops)).toBeTruthy();
    });

    test('Negative Case', () => {
        let ops = [3];
        expect(app.twoPairChecker(ops)).toBeFalsy();
    });
});

describe("sameRankCounter Unit Tests", () => {
    test('No Same Ranks', () => {
        let ops = {
            clubs:{2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":1, "J":0, "Q":0, "K":0, total:1, consecutiveRanks:[]},
            diamonds:{2:0, 3:1, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:1, consecutiveRanks:[]},
            hearts:{2:1, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:1, consecutiveRanks:[]},
            spades:{2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:1, "A":0, "J":1, "Q":1, "K":1, total:5, consecutiveRanks:["K", "Q", "J", "10"]}
        };
        expect(app.sameRankCounter(ops)).toEqual([]);
    });

    test('One Same Rank', () => {
        let ops = {
            clubs:{2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:0, consecutiveRanks:[]},
            diamonds:{2:1, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:1, consecutiveRanks:[]},
            hearts:{2:1, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:1, consecutiveRanks:[]},
            spades:{2:0, 3:0, 4:0, 5:1, 6:0, 7:0, 8:0, 9:0, 10:1, "A":1, "J":1, "Q":1, "K":0, total:5, consecutiveRanks:["Q", "J", "A", "10"]}
        };
        expect(app.sameRankCounter(ops)).toEqual([2]);
    });

    test('Two Same Ranks', () => {
        let ops = {
            clubs:{2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":1, "K":0, total:1, consecutiveRanks:[]},
            diamonds:{2:1, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:1, consecutiveRanks:[]},
            hearts:{2:1, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:1, consecutiveRanks:[]},
            spades:{2:0, 3:0, 4:0, 5:1, 6:0, 7:0, 8:0, 9:0, 10:1, "A":0, "J":1, "Q":1, "K":0, total:4, consecutiveRanks:["Q", "J", "10"]}
        };
        expect(app.sameRankCounter(ops)).toEqual([2, 2]);
    });
});

describe("findConsecutiveRanks Unit Tests", () => {
    test('[14, 13, 12, 9, 8]', () => {
        let ops = [14, 13, 12, 9, 8];
        expect(app.findConsecutiveRanks(ops)).toEqual(["K", "Q", "J"]);
    });

    test('[3]', () => {
        let ops = [3];
        expect(app.findConsecutiveRanks(ops)).toEqual([]);
    });
});

describe("convertRanksToSortedNumericalList Unit Tests", () => {
    test('["J", "Q", "K", 8, 9]', () => {
        const ops = {2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:1, 9:1, 10:0, "A":0, "J":1, "Q":1, "K":1, total:5, consecutiveRanks:[]};
        expect(app.convertRanksToSortedNumericalList(ops)).toEqual([14, 13, 12, 9, 8]);
    });

    test('["J", "A", "K", 2, 9, 8]', () => {
        const ops = {2:1, 3:0, 4:0, 5:0, 6:0, 7:0, 8:1, 9:1, 10:0, "A":1, "J":1, "Q":0, "K":1, total:6, consecutiveRanks:[]};
        expect(app.convertRanksToSortedNumericalList(ops)).toEqual([14, 12, 11, 9, 8, 2]);
    });
});

describe("convertRankToNumber Unit Tests", () => {
    test('["K"]', () => {
        let ops = ["K"];
        expect(app.convertRankToNumber(ops)).toEqual([14]);
    });

    test('["Q"]', () => {
        let ops = ["Q"];
        expect(app.convertRankToNumber(ops)).toEqual([13]);
    });

    test('["J"]', () => {
        let ops = ["J"];
        expect(app.convertRankToNumber(ops)).toEqual([12]);
    });

    test('["A"]', () => {
        let ops = ["A"];
        expect(app.convertRankToNumber(ops)).toEqual([11]);
    });

    test('[2]', () => {
        let ops = [2];
        expect(app.convertRankToNumber(ops)).toEqual([2]);
    });
});

describe("convertNumericalRankToSymbol Unit Tests", () => {
    test('[14]', () => {
        let ops = [14];
        expect(app.convertNumericalRankToSymbol(ops)).toEqual(["K"]);
    });

    test('[13]', () => {
        let ops = [13];
        expect(app.convertNumericalRankToSymbol(ops)).toEqual(["Q"]);
    });

    test('[12]', () => {
        let ops = [12];
        expect(app.convertNumericalRankToSymbol(ops)).toEqual(["J"]);
    });

    test('[11]', () => {
        let ops = [11];
        expect(app.convertNumericalRankToSymbol(ops)).toEqual(["A"]);
    });

    test('[2]', () => {
        let ops = [2];
        expect(app.convertNumericalRankToSymbol(ops)).toEqual(["2"]);
    });
});

describe("sortByRank Unit Tests", () => {
    test('Test 1', () => {
        let ops = {
            clubs:{2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:0, consecutiveRanks:[]},
            diamonds:{2:0, 3:0, 4:0, 5:1, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:1, consecutiveRanks:[]},
            hearts:{2:0, 3:1, 4:0, 5:1, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":1, "Q":1, "K":0, total:4, consecutiveRanks:[]},
            spades:{2:0, 3:1, 4:0, 5:0, 6:0, 7:0, 8:0, 9:1, 10:0, "A":0, "J":0, "Q":0, "K":0, total:2, consecutiveRanks:[]}
        };
        expect(app.sortByRank(ops)).toEqual(["Q", "J", "9", "5", "5", "3", "3"]);
    });

    test('Test 2', () => {
        let ops = {
            clubs:{2:1, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":1, "J":0, "Q":0, "K":0, total:2, consecutiveRanks:[]},
            diamonds:{2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":1, total:1, consecutiveRanks:[]},
            hearts:{2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:1, "A":0, "J":0, "Q":1, "K":0, total:2, consecutiveRanks:[]},
            spades:{2:1, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":1, "Q":0, "K":0, total:2, consecutiveRanks:[]}
        };
        expect(app.sortByRank(ops)).toEqual(["K", "Q", "J", "A", "10", "2", "2"]);
    });
});

describe("printWinner Unit Tests", () => {
    test('Test 1', () => {
        let opsType = "Two Pair";
        let opsHand = {
            clubs:{2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:0, consecutiveRanks:[]},
            diamonds:{2:0, 3:0, 4:0, 5:1, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":0, total:1, consecutiveRanks:[]},
            hearts:{2:0, 3:1, 4:0, 5:1, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":1, "Q":1, "K":0, total:4, consecutiveRanks:[]},
            spades:{2:0, 3:1, 4:0, 5:0, 6:0, 7:0, 8:0, 9:1, 10:0, "A":0, "J":0, "Q":0, "K":0, total:2, consecutiveRanks:[]}
        };
        expect(app.printWinner(opsType, opsHand)).toEqual({type: "Two Pair", ranks: ["Q", "J", "9", "5", "3"]});
    });

    test('Test 2', () => {
        let opsType = "Straight";
        let opsHand = {
            clubs:{2:1, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":1, "J":0, "Q":0, "K":0, total:2, consecutiveRanks:[]},
            diamonds:{2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":0, "Q":0, "K":1, total:1, consecutiveRanks:[]},
            hearts:{2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:1, "A":0, "J":0, "Q":1, "K":0, total:2, consecutiveRanks:[]},
            spades:{2:1, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, "A":0, "J":1, "Q":0, "K":0, total:2, consecutiveRanks:[]}
        };
        expect(app.printWinner(opsType, opsHand)).toEqual({type: "Straight", ranks: ["K", "Q", "J", "A", "10", "2"]});
    });
});