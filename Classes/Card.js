class Card {
    constructor(rank, house){
        this.rank = rank
        this.house = house
        this.value = this.getValue(this.rank);
    }
      
    getValue(rank) {
        switch (rank) {
            case "1":
                return 1;
            case "2":
                return 2;
            case "3":
                return 3;
            case "4":
                return 4;
            case "5":
                return 5;
            case "6":
                return 6;
            case "7":
                return 7;
            case "8":
                return 8;
            case "9":
                return 9;
            case "10":
                return 10;
            case "J":
                return 11;
            case "Q":
                return 12;
            case "K":
                return 13;
            case "A":     
                return 14;
            default:
                break;
        }
    }

    toString() {
        return `${this.rank} of ${this.house} has a value of ${this.value}`;
      }
}


// let card = new Card("J", "Diamonds");
// console.log(card.toString()); 
module.exports = Card;