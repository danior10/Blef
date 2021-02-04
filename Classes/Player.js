class Player {
    // constructor(name){
    //     this.name = name;
    //     this.loses = 0;
    //     this.hand = new Array();

    // }

    constructor(username, id){
        this.username = username;
        this.loses = 0;
        this.hand = new Array();
        this.id= id;
        this.isReady = false
    }
    
    check(){

    }

    raise(){}

    getHand(){
        return this.hand
    }
}

module.exports = Player;