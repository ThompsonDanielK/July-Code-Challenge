const app = require('./app.js');

describe("Define Winning Hand Integration Tests", () => {
    test('["A♠", "K♦"], ["J♥", "5♥", "10♥", "Q♥", "3♥"]', () => {
        expect(app.hand(["A♠", "K♦"], ["J♥", "5♥", "10♥", "Q♥", "3♥"])).toEqual({type: 'Straight', ranks: ['K', 'Q', 'J','A', '10', '5','3']});
    });

    test('["A♥", "K♥"], ["J♥", "5♥", "10♥", "Q♥", "3♥"]', () => {
        expect(app.hand(["A♥", "K♥"], ["J♥", "5♥", "10♥", "Q♥", "3♥"])).toEqual({type: 'Straight-Flush', ranks: ['K', 'Q', 'J','A', '10', '5','3']});
    });
});