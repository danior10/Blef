const hands = require('../Hands/Hands')
// const Full = require('../Hands/Full')

class Rise{
    constructor(hand) {
        this.hand = hand
    }
}

let full = new hands.Full('A', 'K')
let rise = new Rise(full)

console.log(rise);
// console.log(full instanceof hands.Pair);
// let rise = new Rise(full)
// console.log(full);

// const Hands = {
//     high:1,
//     pair: 2,
//     twoPairs: 3,
//     threeOfKind: 4,
//     straight: 5,
//     flush:6,
//     full:7,
//     fourOfKind:8,
//     straightFlush:9
// }
module.exports = Rise;