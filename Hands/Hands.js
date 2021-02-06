// define('High', function() {
//     return function High(rank){
//         this.rank = rank
//     };
// });

// define('Pair', function() {
//     return function Pair(rank){
//         this.rank = rank
//     }
// });

// define('TwoPair', function() {
//     return function TwoPair(first,second){
//         this.first = first
//         this.second = second
//     }
// });

// define('ThreeOfKind', function() {
//     return function ThreeOfKind(rank){
//         this.rank = rank
//     }
// });

// define('Straight', function() {
//     return function Straight(){
//     }
// });

// define('Flush', function() {
//     return function Flush(house){
//         this.house = house
//     }

// });

// define('Full', function() {
//     return function Full(three, two){
//         this.three = three
//         this.two = two
//     }
// });

// define('FourOfKind', function() {
//     return function FourOfKind(rank){
//         this.rank = rank
//     }
// });

// define('StraightFlush', function() {
//     return function StraightFlush(house){
//         this.house = house
//     }
// });




class High{
    constructor(rank) {
        this.rank = rank
    }
}

class Pair{
    constructor(rank) {
        this.rank = rank
    }
}

class TwoPair{
    constructor(first, second) {
        this.first = first,
        this.second = second
    }
}

class ThreeOfKind{
    constructor(rank) {
        this.rank = rank
    }
}

class Straight{
}

class Flush{
    constructor(house) {
        this.house = house
    }
}

class Full{
    constructor(three, two) {
        this.three = three,
        this.two = two
    }
}

class FourOfKind{
    constructor(rank) {
        this.rank = rank
    }
}

class StraightFlush{
    constructor(house) {
        this.house = house
    }
}

module.exports = {
    High: High,
    Pair: Pair,
    TwoPair: TwoPair,
    ThreeOfKind: ThreeOfKind,
    Straight: Straight,
    Flush: Flush,
    Full: Full,
    FourOfKind: FourOfKind,
    StraightFlush: StraightFlush
}