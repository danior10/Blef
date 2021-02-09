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
        $('#hands-container').removeClass('active')
        $('#ranks-container').addClass('active')
        hand = "High"
    })
    
    $('#Pair').on('click', ()=>{
        $('#hands-container').removeClass('active')
        $('#ranks-container').addClass('active')
        hand = "Pair"
    
    })
    
    $('#TwoPair').on('click', ()=>{
        $('#hands-container').removeClass('active')
        $('#ranks-container').addClass('active')
        hand = "TwoPair"
    })
    
    $('#ThreeOfKind').on('click', ()=>{
        $('#hands-container').removeClass('active')
        $('#ranks-container').addClass('active')
        hand = "ThreeOfKind"
    })
    
    $('#Straight').on('click', ()=>{
    
        $('#hands-container').removeClass('active')
        //Wyślij info o stricie do servera
        newHand = new Straight()
        socket.emit('rise', newHand)
    })
    
    $('#Flush').on('click', ()=>{
        $('#hands-container').removeClass('active')
        $('#colors-container').addClass('active')
        hand = "Flush"
    })
    
    $('#FullHouse').on('click', ()=>{
        $('#hands-container').removeClass('active')
        $('#ranks-container').addClass('active')
        hand = "Full"
    })
    
    $('#FourOfKind').on('click', ()=>{
        $('#hands-container').removeClass('active')
        $('#ranks-container').addClass('active')
        hand = "FourOfKind"
    })
    
    $('#StraightFlush').on('click', ()=>{
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
    
    
    socket.on('choose',(actualHand)=>{
        console.log('podbij albo sprawdz');
        recievedHand = actualHand
        if (actualHand == null) {
            for (let i = 0; i < hands.length; i++) {
                $("#" + hands[i]).removeClass('inactive')
            }
            for (let i = 0; i <= ranks.length; i++) {
                $("#" + ranks[i]).removeClass('inactive')
                
            }
        }
        if (actualHand.rank != "A") {
            for (let i = 0; i < actualHand.value; i++) {
                $("#" + hands[i]).addClass('inactive')
            }
            let index = ranks.indexOf(actualHand.rank)
            for (let i = 0; i <= index; i++) {
                $("#" + ranks[i]).addClass('inactive')
                
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

})



