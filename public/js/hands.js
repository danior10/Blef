define('High', function() {
    return function High(rank){
        this.rank = rank
    };
});

define('Pair', function() {
    return function Pair(rank){
        this.rank = rank
    }
});

define('TwoPair', function() {
    return function TwoPair(first,second){
        this.first = first
        this.second = second
    }
});

define('ThreeOfKind', function() {
    return function ThreeOfKind(rank){
        this.rank = rank
    }
});

define('Straight', function() {
    return function Straight(){
    }
});

define('Flush', function() {
    return function Flush(house){
        this.house = house
    }

});

define('Full', function() {
    return function Full(three, two){
        this.three = three
        this.two = two
    }
});

define('FourOfKind', function() {
    return function FourOfKind(rank){
        this.rank = rank
    }
});

define('StraightFlush', function() {
    return function StraightFlush(house){
        this.house = house
    }
});
