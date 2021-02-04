const Card = require('../Classes/Card')
const Stack = require('../Classes/Stack')

class Checker{
    constructor(collection) {
        this.collection = collection
    }

    getCollection(){
        for (const card of this.collection) {
            console.log(card);
        }
    }

    isHigh(rank){
        const collection = this.collection;
        for (let card of collection) {
            if (card.rank === rank) {
                return true;
            } else {
                continue;
            }
        }
        return false;
    }

    isPair(rank){
        const collection = this.collection;
        let count = 0;
        for (const card of collection) {
            if (card.rank === rank) {
                count++;
            } else {
                continue;
            }
        }
        return (count >= 2) ? true : false 
    }

    isTwoPairs(first, second){
        if (this.isPair(first) && this.isPair(second)) {
            return true;
        } else {
            return false;
        }
    }

    isThreeOfKind(rank){
        const collection = this.collection;
        let count = 0;
        for (const card of collection) {
            if (card.rank === rank) {
                count++;
            }
        }
        return (count >= 3)? true: false
    }

    hasAce(collect){
        for (const card of collect) {
            if (card.rank === 'A') {
                collect.splice(0,0, new Card("1",card.house));
                break;
            }
        }
        return collect;
    }

    isStraight(){
        const collection = this.collection;
        collection.sortCards();
        let count = 1;
        let max = 0;
        let coll = collection.stack;
        coll = this.hasAce(coll)

        for (let i = 0; i < coll.length -1; i++) {
            if (coll[i+1].value === ((coll[i].value) + 1) ){
                count++;
            }else{
                if(count > max) max = count;
                count = 1;
            }
            if(count > max) max = count;
        }
        return (max >= 5) ? true: false
    }

    isFlush(house){
        const collection = this.collection;
        let count = 0;
        for (const card of collection) {
            if (card.house === house) {
                count++;
            }
        }
        return (count >= 5) ? true: false
    }

    isFullHouse(three, pair){
        return (this.isThreeOfKind(three) && (this.isPair(pair)))? true:false
    }

    isFourOfKind(rank){
        const collection = this.collection;
        let count = 0;
        for (const card of collection) {
            if (card.rank === rank) {
                count++;
            }
        }
        return (count >= 4)? true: false
    }

    isStraightFlush(){
        const collection = this.collection;
        collection.sortCards();
        let count = 1;
        let max = 0;
        let coll = collection.stack;
        coll = this.hasAce(coll)
        console.log(coll);

        for (let i = 0; i < coll.length -1; i++) {
            if ((coll[i+1].value === ((coll[i].value) + 1)) && (coll[i+1].house === (coll[i].house)) ){
                count++;
            }else{
                if(count > max) max = count;
                count = 1;
            }
            if(count > max) max = count;
        }
        return (max >= 5) ? true: false
    }

}

module.exports = Checker;
// const card1 = new Card('A', 'Clubs') 
// const card2 = new Card('2', 'Clubs')
// const card3 = new Card('3', 'Hearts') 
// const card4 = new Card('4', 'Hearts') 
// const card5 = new Card('5', 'Hearts') 
// const card6 = new Card('6', 'Hearts') 
// const card7 = new Card('7', 'Hearts') 
// const card8 = new Card('8', 'Clubs')
// const card9 = new Card('9', 'Clubs')

// const stack = new Stack();
// stack.stack = [card1, card2, card3, card4, card5, card6, card7, card8, card9]
// console.log('**********');

// const ch = new Checker(stack)
// console.log(`Is there straight flush? ` + ch.isStraightFlush());