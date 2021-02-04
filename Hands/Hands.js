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