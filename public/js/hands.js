define('High', function() {
    return class High{
        constructor(rank) {
        this.rank = rank,
        this.hand = 'High'
    }
    };
});

define('Pair', function() {
    return class Pair{
        constructor(rank){
            this.rank = rank
            this.hand = 'Pair'
        }
    }
});

define('TwoPair', function() {
    return class TwoPair{
        constructor(first,second){
        this.first = first
        this.second = second
        this.hand = 'TwoPair'
        }
    }
});

define('ThreeOfKind', function() {
    return class ThreeOfKind{
        constructor(rank){
            this.rank = rank
            this.hand = 'ThreeOfKind'
        }
    }
});

define('Straight', function() {
    return class Straight{
        constructor(){
            this.hand = 'Straight'
        }
    }
});

define('Flush', function() {
    return class Flush{
        constructor(house){
            this.house = house
            this.hand = 'Flush'
        }

    }

});

define('Full', function() {
    return class Full{
        constructor(three, two){
            this.three = three,
            this.two = two
            this.hand = 'Full'
        }
    }
});

define('FourOfKind', function() {
    return class FourOfKind{
        constructor(rank){
            this.rank = rank
            this.hand = 'FourOfKind'
        }
    }
});

define('StraightFlush', function() {
    return class StraightFlush{
        constructor(house){
            this.house = house
            this.hand = 'StraightFlush'
        }
    }
});
