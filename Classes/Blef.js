const Card = require('./Card')
const Stack = require('./Stack')
const Deck = require('./Deck')
const Player = require('./Player')
const readline = require('readline');
const Choice = require('./Choice')

let players = new Array();

/* 

*   Mieć graczy przynajmniej dwóch,
*   stworzyć deck, potasować, rozdać
*   

*/

const p1 = new Player('Daniel')
const p2 = new Player('Mateusz')
const p3 = new Player('Kamil')
players.push(p1,p2,p3)

let deck = new Deck();
deck.shuffleDeck();
deck.shuffleDeck();
p1.hand.push(deck.dealCard())
p2.hand.push(deck.dealCard())
p3.hand.push(deck.dealCard())
p1.hand.push(deck.dealCard())
p2.hand.push(deck.dealCard())
p3.hand.push(deck.dealCard())

for (const player of players) {
    console.log(player.hand);
    console.log('********');
}

let gameIsOn = true;
while (gameIsOn){
    let actualHand;
    let isPlaying = 0;
    for (const player of players) {
        let madeAChoice = false
        console.log("You can check or raise. What you gonna do ?" +
        "\nEnter 1 to check or 2 to raise");
        while(!madeAChoice){
            makeChoice()
        }
    } 
    /* 
*   każdy z graczy po koleji musi wykonać ruch albo przebić albo sprawdzić
*   
*   
*/


}
