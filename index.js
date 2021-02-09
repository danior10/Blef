const express = require('express');
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const path = require('path');
const Check = require('./Classes/Check');
const Player = require('./Classes/Player');
const Deck = require('./Classes/Deck');
const Hands = require('./Hands/Hands')
const Checker = require('./Utils/Checker')

let players = new Array();
let sockets = new Array();
let count = 0;
let gameIsOn = false
let round = 0;
let actualHand

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(__dirname + '/'));


app.get('/', (req, res) =>{
    res.render('index')
    // res.sendFile(__dirname + '/views/index.html')
})

app.get('/test', (req,res)=>{
    res.render('test')
})
app.get('/game', (req, res) =>{
    res.render('game', players)
})

app.get('/toGame', (req, res) =>{
    const {username} = req.query;
    n1 = username;
    console.log(`**** ${username} connected ****`);
    let player = {
        name: username,
        id: count
    }
    players.push(player)
    count++;
    res.redirect('/game')
})

io.on('connection', (socket) => {
    console.log('a user connected');
    let player = new Player('player', socket.id)
    players.push(player)
    sockets.push(socket)

    console.log(socket.id);
    socket.emit('message', `siemasz ${player.username} with id: ${player.id}:D`)
    
    socket.on('username', username =>{
        console.log(username);
        console.log('******');
        console.log(socket.username);
        for (const player of players) {
            if (player.id == socket.id) {
                console.log(`Adding username to this socket`);
                player.username = username
            }
        }
        console.log(players);
        io.emit('players', players)
    })

    socket.on('ready', ()=>{
        for (const player of players) {
            if(player.id == socket.id){
                player.isReady = true
            }
        }
        io.emit('players', players)
        gameIsOn = allReady();
        if (gameIsOn) {
            io.emit('start')
            startRound()
            // console.log('printing sockets');
            // console.log(sockets);
        }
    })

    socket.on('disconnect',()=>{
        for (let i = 0; i < players.length; i++) {
            if (players[i]['id'] == socket.id) {
                console.log('znalazlem tego gracza mozna usunac' + ` ${players[i]["username"]} with id ${players[i]["id"]}`);
                console.log('a więc usuwam....');
                players.splice(i,1)
            }
        }
        for (let i = 0; i < sockets.length; i++) {
            if (sockets[i]['id'] == socket.id) {
                console.log('znalazlem tego gracza mozna usunac' + ` with id ${sockets[i]["id"]}`);
                console.log('a więc usuwam....');
                sockets.splice(i,1)
            }
        }
        io.emit('players', players)
    } )
 
    socket.on('reconnect', ()=>{
        console.log('reconnected successfully');
    })

    socket.on('rise', (hand)=>{
        console.log('Podbijam');
        console.log(hand);
        console.log(hand.hand);
        actualHand = hand
        console.log(actualHand);
        round++;
        if (round>= players.length) {
            round=0
        }
        sockets[round].emit('choose', actualHand)
    })

    socket.on('check', (hand)=>{
        console.log('Sprawdzam');
        let allCards = new Array();
        for (const player of players) {
            allCards = allCards.concat(player.hand)
        }
        let checker = new Checker(allCards)
        let isOnTable = false;
        switch (hand.rank) {
            case "High":
                isOnTable = checker.isHigh()
                break;
        
            case "Pair":
                isOnTable = checker.isPair()
                break;
        
            case "TwoPair":
                isOnTable = checker.isTwoPairs()
                break;
        
            case "ThreeOfKind":
                isOnTable = checker.isThreeOfKind()
                break;
        
            case "Straight":
                isOnTable = checker.isStraight()
                break;
        
            case "Flush":
                isOnTable = checker.isFlush()
                break;
        
            case "Full":
                isOnTable = checker.isFullHouse()
                break;
        
            case "FourOfKind":
                isOnTable = checker.isFourOfKind()
                break;
        
            case "StraightFlush":
                isOnTable = checker.isStraightFlush()
                break;
        
            default:
                break;
        }
        let checkingPlayerId = socket.id
        if (isOnTable) {
            //jeżeli sprawdzany układ jest na stole to sprawdzający ciagnie karte wiecej czyli aktualny socket.id
            for (const player of players) {
                if (player.id == socket.id) {
                    player.loses++;
                    socket.emit('message', "Przejebałeś lamusie")
                }
            }    
        }else{
            //sprawdzanego układu nie ma, ciągnie kartę przegrany i rozdaje czyli player o indexie -1 niż aktualny socket.id
            let losingIndex
            for (const player of players) {
                if (player.id == socket.id) {
                    if (players.indexOf(player) == 0) {
                        losingIndex = players.length - 1
                    }else{
                        losingIndex = (players.indexOf(player) - 1)
                    }
                }
            }  
            players[losingIndex].loses++
            sockets[losingIndex].emit('message', "Przejebałeś lamusie")
        }
        console.log('przegrany dostaje dodatkową kartę i zaczyna kolejkę');
        for (const player of players) {
            player.hand.length = 0
        }
        startRound();

        //Stwórz tablice wszystkich kart na rekach graczy
        //Uzyć checkera do sprawdzenia czy dany hand jest w tych kartach
        //W zależności kto przegra, dodać mu przegraną
        round = false
    })  


});

http.listen(3000, () => {
    console.log("Listening on port 3000");
})

function dealCards(deck){
    for (let player of players) {
        if (player.loses != 0) {
            for(let i=0;i<=player.loses;i++){
                player.hand.push(deck.dealCard())
                
            }
        }else if(player.loses == 0){
            player.hand.push(deck.dealCard())
            
        }
    }
    console.log(players);
}

function startRound(){

    let deck = new Deck();
    deck.shuffleDeck();
    deck.shuffleDeck();
    round = 0;
    dealCards(deck);
    for (const socket of sockets) {
        console.log(socket.id);
    }
    actualHand = null
    console.log('****');
    console.log('****');
    console.log(sockets[round].id);
    console.log('****');
    console.log('****');
    sockets[round].emit('message', "sprawdzanko")
    sockets[round].emit('choose', actualHand)

}

function allReady() {
    let ready
    let isReady = 0;
    for (const player of players) {
        if (player.isReady) isReady++;
    }
    if (isReady == players.length) {
        ready = true
    }   
    return ready
}

function gameBegins() {
    let test = true
    while (test) {
        if (gameIsOn) {
            console.log('****');
            console.log(`CZAS ZACZAĆ GRE!!!!!!`);
            console.log('****');
        }
        test=false
    }

    let isOn = true
    while (isOn) {
        let deck = new Deck();
        deck.shuffleDeck();
        deck.shuffleDeck();
        for (let player of players) {
            if (player.loses != 0) {
                for(let i=0;i<=player.loses;i++){
                    player.hand.push(deck.dealCard())
                    
                }
            }else if(player.loses == 0){
                player.hand.push(deck.dealCard())
                
            }
            console.log("Wypisuje graczy....");
            console.log(players);
            isOn = false
        }
 
        let round = true;
        while (round) {
            let actualHand
            for (let socket of sockets) {
                let choiceIsMade = false
                // let socketId = player.id
                // console.log(socketId);
                // // io.broadcast.to(socketId).emit('choose', actualHand);
                socket.emit('choose', actualHand);
                socket.on('rise',()=>{
                    console.log('PODBIJAM');
                })
                socket.on('check',()=>{
                    console.log('SPRAWDZAM');
                    round = false
                    })

                }
            
            // for (let player of players) {
            //     let choiceIsMade = false
            //     let socketId = player.id
            //     console.log(socketId);
            //     // // io.broadcast.to(socketId).emit('choose', actualHand);
            //     io.to(socketId).emit('choose', actualHand);
            //     // while (!choiceIsMade) {

            //     // }
            //     round = false
            // }            
    

        }
    }

}
