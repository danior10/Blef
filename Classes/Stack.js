class Stack {
    constructor(){
        this.stack = new Array();
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
        this.stack.sort(this.compareCards)
    }
}

module.exports = Stack;