define('High', function() {
    return class High{
        constructor(rank) {
        this.rank = rank,
        this.hand = 'High',
        this.value = 0
    }
    };
});

define('Pair', function() {
    return class Pair{
        constructor(rank){
            this.rank = rank
            this.hand = 'Pair'
            this.value = 1
        }
    }
});

define('TwoPair', function() {
    return class TwoPair{
        constructor(first,second){
        this.first = first
        this.second = second
        this.hand = 'TwoPair',
        this.value = 2
        }
    }
});

define('ThreeOfKind', function() {
    return class ThreeOfKind{
        constructor(rank){
            this.rank = rank
            this.hand = 'ThreeOfKind',
            this.value = 3
        }
    }
});

define('Straight', function() {
    return class Straight{
        constructor(){
            this.hand = 'Straight',
            this.value = 4
        }
    }
});

define('Flush', function() {
    return class Flush{
        constructor(house){
            this.house = house
            this.hand = 'Flush',
            this.value = 5
        }

    }

});

define('Full', function() {
    return class Full{
        constructor(three, two){
            this.three = three,
            this.two = two
            this.hand = 'Full',
            this.value = 6
        }
    }
});

define('FourOfKind', function() {
    return class FourOfKind{
        constructor(rank){
            this.rank = rank
            this.hand = 'FourOfKind',
            this.value = 7
        }
    }
});

define('StraightFlush', function() {
    return class StraightFlush{
        constructor(house){
            this.house = house
            this.hand = 'StraightFlush',
            this.value = 8
        }
    }
});
