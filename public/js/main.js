requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'public/js',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min',
        High: 'hands',
        Pair: 'hands',
        TwoPair: 'hands',
        ThreeOfKind: 'hands',
        Straight: 'hands',
        Flush: 'hands',
        Full: 'hands',
        FourOfKind: 'hands',
        StraightFlush: 'hands',
    }
});



require(['jquery','High','Pair','TwoPair','ThreeOfKind','Straight','Flush','Full','FourOfKind','StraightFlush'], function($, High, Pair, TwoPair, ThreeOfKind, Straight , Flush, Full, FourOfKind, StraightFlush){


    const socket = io();
    // const Hands = require('../../Hands/Hands');
    
    let hand
    let first,second
    let firstChosen = false
    let hands = ['High','Pair','TwoPair','ThreeOfKind','Straight','Flush','Full','FourOfKind','StraightFlush']
    let ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K","A"]
    let recievedHand
    let cardsImages = {
        '2C': "../img/PNG/2C.png",
        '2D': "../img/PNG/2D.png",
        '2H': "../img/PNG/2H.png",
        '2S': "../img/PNG/2S.png",
        '3C': "../img/PNG/3C.png",
        '3D': "../img/PNG/3D.png",
        '3H': "../img/PNG/3H.png",
        '3S': "../img/PNG/3S.png",
        '4C': "../img/PNG/4C.png",
        '4D': "../img/PNG/4D.png",
        '4H': "../img/PNG/4H.png",
        '4S': "../img/PNG/4S.png",
        '5C': "../img/PNG/5C.png",
        '5D': "../img/PNG/5D.png",
        '5H': "../img/PNG/5H.png",
        '5S': "../img/PNG/5S.png",
        '6C': "../img/PNG/6C.png",
        '6D': "../img/PNG/6D.png",
        '6H': "../img/PNG/6H.png",
        '6S': "../img/PNG/6S.png",
        '7C': "../img/PNG/7C.png",
        '7D': "../img/PNG/7D.png",
        '7H': "../img/PNG/7H.png",
        '7S': "../img/PNG/7S.png",
        '8C': "../img/PNG/8C.png",
        '8D': "../img/PNG/8D.png",
        '8H': "../img/PNG/8H.png",
        '8S': "../img/PNG/8S.png",
        '9C': "../img/PNG/9C.png",
        '9D': "../img/PNG/9D.png",
        '9H': "../img/PNG/9H.png",
        '9S': "../img/PNG/9S.png",
        '10C': "../img/PNG/10C.png",
        '10D': "../img/PNG/10D.png",
        '10H': "../img/PNG/10H.png",
        '10S': "../img/PNG/10S.png",
        'JC': "../img/PNG/JC.png",
        'JD': "../img/PNG/JD.png",
        'JH': "../img/PNG/JH.png",
        'JS': "../img/PNG/JS.png",
        'QC': "../img/PNG/QC.png",
        'QD': "../img/PNG/QD.png",
        'QH': "../img/PNG/QH.png",
        'QS': "../img/PNG/QS.png",
        'KC': "../img/PNG/KC.png",
        'KD': "../img/PNG/KD.png",
        'KH': "../img/PNG/KH.png",
        'KS': "../img/PNG/KS.png",
        'AC': "../img/PNG/AC.png",
        'AD': "../img/PNG/AD.png",
        'AH': "../img/PNG/AH.png",
        'AS': "../img/PNG/AS.png",
    }
    
    
    $('#game-form').on('submit', (e)=>{
        e.preventDefault()
        $('.landingPage').css('display', 'none')
        $('.game').css('display', 'block')
    
        let username = $('#username').val();
        socket.username = username
        socket.emit('username', username)
        console.log(socket.username);
    
    })
    
    socket.on('message', msg => {
        console.log(msg);
        console.log('****');
        // console.log(socket.id);
    });
    
    socket.on('players', (players)=>{
        // console.log('testing socket');
        // console.log(players);
        $('#table').empty()
        for (const player of players) {
            // $('#players').append(`<p>${player.username}</p>`) 
            if (player.isReady) {
                $('#table').append(`<tr><td style="text-align: right;">${player.username}</td><td style="color: green;">Ready</td></tr>`)    
            }else if(!player.isReady){
                $('#table').append(`<tr><td style="text-align: right;">${player.username}</td><td style="color: red;"> Not Ready</td></tr>`)    
            }   
        }
    });
    
    socket.on('start', ()=>{
        $('.game').css('display', 'none')
        $('#start').css('display', 'block')  
    });
    
    
    socket.on('showCards', (socketPlayer)=>{

        //Ty downie zapomniałeś, że w main.js nie ma tablicy graczy i tablicy socketów


        console.log('testujemy co nie dziala');
        let playerId = socket.id
        let playerHand = socketPlayer.hand
        // console.log(socketPlayer);

        let img = $(document.createElement('img'))
        let temp
        for (let i = 0; i < playerHand.length; i++) {
            switch (playerHand[i].house) {
                case "Clubs":
                    
                    temp = ((playerHand[i].rank) + "C")
                    img.attr('src', cardsImages[temp])
                    $('#cardsPlace').append(img)
                    break;
                case "Diamonds":
                    temp = ((playerHand[i].rank) + "D")
                    img.attr('src', cardsImages[temp])
                    $('#cardsPlace').append(img)
                    break;
                case "Hearts":
                    temp = ((playerHand[i].rank) + "H")
                    img.attr('src', cardsImages[temp])
                    $('#cardsPlace').append(img)
                    break;
                case "Spades":
                    temp = ((playerHand[i].rank) + "S")
                    img.attr('src', cardsImages[temp])
                    $('#cardsPlace').append(img)
                    break;
            
                default:
                    break;
            }            
        }
    })

    socket.on('choose',(actualHand)=>{
        for (let i = 0; i < hands.length; i++) {
            $("#" + hands[i]).removeClass('inactive')
        }
        for (let i = 0; i <= ranks.length; i++) {
            $("#" + ranks[i]).removeClass('inactive')
            
        }

        console.log('podbij albo sprawdz');

        recievedHand = actualHand
        // if (actualHand == null) {
        //     for (let i = 0; i < hands.length; i++) {
        //         $("#" + hands[i]).removeClass('inactive')
        //     }
        //     for (let i = 0; i <= ranks.length; i++) {
        //         $("#" + ranks[i]).removeClass('inactive')
                
        //     }
        // }
        if (actualHand.rank != "A") {
            for (let i = 0; i < actualHand.value; i++) {
                $("#" + hands[i]).addClass('inactive')
            }
        }else{
            for (let i = 0; i <= actualHand.value; i++) {
                $("#" + hands[i]).addClass('inactive')
            }
        }

        //wyświetl dostępne opcje(rise o
        //Wyświetl dwa buttony
        //W przypadku kliknięcia check, wyślij do serwera informacje o sprawdzeniu aktualnej ręki
        //W przypadku wybranie rise, wyświetl możliwe opcje do przebicia, nie pokazuj układów niższych niż aktualna reka
        //Po wybraniu wyższego układu, wyślij info do serwera o nowym układzie który obowiązuje
        //Po wybraniu przebicia ustaw klasę inactive dla wszystkich handów i dla poszczególnych układów w tych handach
        
    
    })

    $('#readyButton').on('click', ()=>{
        socket.emit('ready')
    })
    
    $('#rise').on('click', ()=>{
        // socket.emit('rise')
        $('#hands-container').addClass('active')
        $('.pop-up').addClass('active')
        $('#overlay').addClass('active')
    
    })
    
    $('#closeButton1').on('click', ()=>{
        $('#hands-container').removeClass('active')
        $('#overlay').removeClass('active')
        $('.pop-up').removeClass('active')
    })
    
    $('#closeButton2').on('click', ()=>{
        $('#ranks-container').removeClass('active')
        $('#overlay').removeClass('active')
        $('.pop-up').removeClass('active')
        for (let i = 0; i <= ranks.length; i++) {
            $("#" + ranks[i]).removeClass('inactive')
            
        }
    })
    
    $('#closeButton3').on('click', ()=>{
        $('#colors-container').removeClass('active')
        $('#overlay').removeClass('active')
        $('.pop-up').removeClass('active')
        
    })
    
    $('#check').on('click', ()=>{
        socket.emit('check', recievedHand)
    })
    
    
    $('#High').on('click', ()=>{
        fadeOutRanks(0)
        $('#hands-container').removeClass('active')
        $('#ranks-container').addClass('active')
        hand = "High"
    })
    
    $('#Pair').on('click', ()=>{
        fadeOutRanks(1)
        $('#hands-container').removeClass('active')
        $('#ranks-container').addClass('active')
        hand = "Pair"
    
    })
    
    $('#TwoPair').on('click', ()=>{
        fadeOutRanks(2)
        $('#hands-container').removeClass('active')
        $('#ranks-container').addClass('active')
        hand = "TwoPair"
    })
    
    $('#ThreeOfKind').on('click', ()=>{
        fadeOutRanks(3)
        $('#hands-container').removeClass('active')
        $('#ranks-container').addClass('active')
        hand = "ThreeOfKind"
    })
    
    $('#Straight').on('click', ()=>{
    
        fadeOutRanks(4)
        $('#hands-container').removeClass('active')
        //Wyślij info o stricie do servera
        newHand = new Straight()
        socket.emit('rise', newHand)
    })
    
    $('#Flush').on('click', ()=>{
        fadeOutRanks(5)
        $('#hands-container').removeClass('active')
        $('#colors-container').addClass('active')
        hand = "Flush"
    })
    
    $('#FullHouse').on('click', ()=>{
        fadeOutRanks(6)
        $('#hands-container').removeClass('active')
        $('#ranks-container').addClass('active')
        hand = "Full"
    })
    
    $('#FourOfKind').on('click', ()=>{
        fadeOutRanks(7)
        $('#hands-container').removeClass('active')
        $('#ranks-container').addClass('active')
        hand = "FourOfKind"
    })
    
    $('#StraightFlush').on('click', ()=>{
        fadeOutRanks(8)
        $('#hands-container').removeClass('active')
        $('#colors-container').addClass('active')
        hand = "StraightFlush"
    })
    
    
    function determineHand(hand, rank) {
        let newHand
        switch (hand) {
            case "High":
                console.log(hand);
                newHand = new High(rank)
                console.log(newHand.name);
                console.log(newHand);
                socket.emit('rise', newHand)
                break;
            case "Pair":
                newHand = new Pair(rank)
                socket.emit('rise', newHand)
                break;
        
            case "TwoPair":
                if (firstChosen) {
                    second = rank
                    firstChosen = false
                    newHand = new TwoPair(first,second)
                    socket.emit('rise', newHand)
    
                } else {
                    first = rank
                    firstChosen = true
                    alert('Chose second pair')
                }
                break;
        
            case "ThreeOfKind":
                newHand = new ThreeOfKind(rank)
                socket.emit('rise', newHand)
                break;
        
            case "Full":
                //dokonczyć
                if (firstChosen) {
                    second = rank
                    firstChosen = false
                    let newHand = new Full(first,second)
                    socket.emit('rise', newHand)
    
                } else {
                    first = rank
                    firstChosen = true
                    alert('Chose second pair')
                }
                break;
        
            case "FourOfKind":
                newHand = new FourOfKind(rank)
                socket.emit('rise', newHand)
                break;

            default:
                break;
        }
        
    }

    function determineColor(hand, color) {
        switch (hand) {
            case "Flush":
                newHand = new Flush(color)
                socket.emit('rise', newHand)
                break;
            
            case "StraightFlush":
                newHand = new StraightFlush(color)
                socket.emit('rise', newHand)
                break;
        
            default:
                break;
        }
        
    }
    
    function fadeOutRanks(hand){
        let index
        if (recievedHand != null) {
            if (recievedHand.value == 2) {
                index = ranks.indexOf(recievedHand.first)
                for (let i = 0; i <= index; i++) {
                    $("#" + ranks[i]).addClass('inactive')
                }
            }else if (recievedHand.value == 6) {
                index = ranks.indexOf(recievedHand.three)
                for (let i = 0; i <= index; i++) {
                    $("#" + ranks[i]).addClass('inactive')
                }
            }else{
                if (hand <= recievedHand.value) {
                    index = ranks.indexOf(recievedHand.rank)
                    for (let i = 0; i <= index; i++) {
                        $("#" + ranks[i]).addClass('inactive')
                    }
                }   
            }
        }
    }


    $('#2').on('click',()=>{
        console.log("wyswietlam zmienna hand");
        console.log(hand);
        determineHand(hand,"2")
        
    })
    
    $('#3').on('click',()=>{
        determineHand(hand,"3")
    })
    
    $('#4').on('click',()=>{
        determineHand(hand,"4")
    })
    
    $('#5').on('click',()=>{
        determineHand(hand,"5")
    })
    
    $('#6').on('click',()=>{
        determineHand(hand,"6")
    })
    
    $('#7').on('click',()=>{
        determineHand(hand,"7")
    })
    
    $('#8').on('click',()=>{
        determineHand(hand,"8")
    })
    
    $('#9').on('click',()=>{
        determineHand(hand,"9")
    })
    
    $('#10').on('click',()=>{
        determineHand(hand,"10")
    })
    
    $('#J').on('click',()=>{
        determineHand(hand,"J")
    })
    
    $('#Q').on('click',()=>{
        determineHand(hand,"Q")
    })
    
    $('#K').on('click',()=>{
        determineHand(hand,"K")
    })
    
    $('#A').on('click',()=>{
        determineHand(hand,"A")
    })
    
    $('#clubs').on('click',()=>{
        determineColor(hand, "Clubs")
    })

    $('#diamonds').on('click',()=>{
        determineColor(hand, "Diamonds")
    })

    $('#hearts').on('click',()=>{
        determineColor(hand,"Hearts")
    })
    
    $('#spades').on('click',()=>{
        determineColor(hand,"Spades")
    })
    
    


})



