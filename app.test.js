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