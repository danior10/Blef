const Card = require('./Card')




class Deck {

    constructor(){
        this.houses = ["Clubs", "Diamonds", "Hearts","Spades"];
        this.ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        this.deck = this.createDeck();
    }

    createDeck() {
        const {houses, ranks} = this;
        const deck = [];
        for(let house of houses){
            for(let rank of ranks){
                let card = new Card(rank, house);
                deck.push(card)
            }
        }
        return deck;
    }

    getDeck(){
        const {deck} = this;
        for (let card of deck) {
            console.log(card.toString());
        }
    }

    toString() {
        const {deck} = this;
        for(let card of deck){
            console.log(card.toString())
        }
    }

    compareCards(a, b) {
        if (a.value < b.value)
           return -1
        if (a.value > b.value)
           return 1
        // a równe b
        return 0
     }

    sortCards(){
        this.deck.sort(this.compareCards)
    }

    shuffleDeck(){
        let array = this.deck  
        var currentIndex = array.length, temporaryValue, randomIndex;
          
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
          
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
          
        return array;
    }

    dealCard(){
        return this.deck.pop();
    }

}

module.exports = Deck;

const deck = new Deck();
deck.shuffleDeck(this.deck)

