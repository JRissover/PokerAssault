//by: Jason Rissover

var UPS = 30;

var deck;
var hand;

var mainButton;
var buttonLabel;

var background;
var battleground;

//var leftArrow;
//var rightArrow;

var scroll = 0;
var lastPos = 0;
var scrollAccel = 0;

var grantSpriteSheet;

var units;
var enemies;
var updateID;

var buttonTimer = 0;
var buttonTimeOut = 10;


function initGame() {


    stage.removeAllChildren();
    loadSprites();

    deck = new Deck();
    deck.shuffle();

    hand = new Array();
    units = new Array();
    enemies = new Array();

    var backgroundImage = new Image();
    backgroundImage.src = "resources/sprites/Landscape.jpg"
    backgroundImage.onload = backgroundLoad;

    battleground = new createjs.Container();
    stage.addChild(battleground);

    //var arrowImage = new Image();
   // arrowImage.src = "resources/sprites/arrow.png"
    //arrowImage.onload = loadArrows;

    mainButton = new createjs.Shape();
    var g = mainButton.graphics;
    g.beginFill("#FFF");
    g.drawRoundRect(canvas.width * 0.775 , canvas.height * 0.75 , canvas.width  * 0.2 ,  canvas.height * 0.2 , 100 )
    g.endFill();
    stage.addChild(mainButton);
    mainButton.on("pressup", function(evt) {

        //initMenu();
        if(buttonTimer >= buttonTimeOut){
            buttonTimer=0;
            mainButtonPress();
        }
        
    });
    
    buttonLabel = new createjs.Text("Draw", "20px Arial", "#000");
    buttonLabel.textAlign = "center";
    buttonLabel.x = canvas.width  * 0.8725;
    buttonLabel.y = canvas.height * 0.83;
    stage.addChild(buttonLabel);


    updateID = setInterval( update , 1000/UPS );
}

function loadSprites(){
    grantSpriteSheet = new createjs.SpriteSheet({
        "animations":
        {
            "run": [0, 25, "run"],
            "attack": [26, 63, "run"]},
            "images": ["resources/sprites/runningGrant.png"],
            "frames":
                {
                    "height": 292.5,
                    "width":165.75,
                    "regX": 82.875,
                    "regY": 292.5,
                    "count": 64
                }
    });
}

function backgroundLoad(e){
    background = new createjs.Bitmap(e.target);

    background.scaleX = (canvas.width  * 3.0) / background.image.naturalWidth;
    background.scaleY = (canvas.height * 0.7) / background.image.naturalHeight;

    battleground.addChild(background);

    background.x = 0;
    background.y = 0;

    background.on("pressmove", function(evt) {

        var dx = evt.stageX - lastPos;

        scrollAccel = dx;

        scroll += scrollAccel / 3.0;

        lastPos = evt.stageX;
    });
    background.on("mousedown", function(evt) {
        lastPos = evt.stageX;
    });
    background.on("pressup", function(evt) {
        scrollAccel = 0;
    });
}

/*
function loadArrows(e){

    leftArrow = new createjs.Bitmap(e.target);
    rightArrow = new createjs.Bitmap(e.target);

    rightArrow.scaleX = (canvas.width  * 0.075) / rightArrow.image.naturalWidth;
    rightArrow.scaleY = (canvas.height * 0.5) / rightArrow.image.naturalHeight;

    leftArrow.scaleX = -(canvas.width  * 0.075) / leftArrow.image.naturalWidth;
    leftArrow.scaleY = (canvas.height * 0.5) / leftArrow.image.naturalHeight;

    rightArrow.x = canvas.width  * 0.9;
    rightArrow.y = canvas.height * 0.1;

    leftArrow.x = canvas.width  * 0.1;
    leftArrow.y = canvas.height * 0.1;

    leftArrow.on("mousedown", function(evt) {
       scroll = 5;
    });
    leftArrow.on("pressup", function(evt) {
       scroll = 0;
    });

    rightArrow.on("mousedown", function(evt) {
        scroll = -5;
    });
    rightArrow.on("pressup", function(evt) {
        scroll = 0;
    });

    stage.addChild(rightArrow);
    stage.addChild(leftArrow);
}
*/

function mainButtonPress(){
    
    if(buttonLabel.text == "Re Draw"){
        
        for(var i = 0; i < 5; i++){
            //console.log(hand[i])

            if(hand[i].hold){
                hand[i].y = canvas.height * 0.75;
                //console.log( hand[i].suit+" "+hand[i].value+ " : "  + " held");
            }
            else{

               //console.log( hand[i].suit+" "+hand[i].value+ " : "  + " not held");

                stage.removeChild(hand[i]);

                hand[i] = deck.draw(1);
                

                hand[i].hold = false;

                stage.addChild(hand[i]);

                hand[i].x = (canvas.width * 0.05) + (canvas.width * .15 * i);
                hand[i].y = canvas.height * 0.75;
                hand[i].scaleX = (canvas.width  * 0.1) / hand[i].image.naturalWidth;
                hand[i].scaleY = (canvas.height * 0.2) / hand[i].image.naturalHeight;


            }
        }

        buttonLabel.text = "Deploy";
    }
    else if(buttonLabel.text == "Draw"){

        hand = deck.draw(5);

        for(var i = 0; i < 5; i++){


            stage.addChild(hand[i]);

            hand[i].hold = false;

            hand[i].x = (canvas.width * 0.05) + (canvas.width * .15 * i);
            hand[i].y = canvas.height * 0.75;
            hand[i].scaleX = (canvas.width  * 0.1) / hand[i].image.naturalWidth;
            hand[i].scaleY = (canvas.height * 0.2) / hand[i].image.naturalHeight;


        }

        buttonLabel.text = "Re Draw";
    }
    else if(buttonLabel.text == "Deploy"){

        spawnHand();

        for(var i = 0; i < 5; i++){
            
            stage.removeChild(hand[i]);
        }

        buttonLabel.text = "Draw";
    }
    
    
}

function spawnHand(){
    //console.log("spawning");

    //sort hand

    var temphand = new Array();

    for(var j = 0; j < 5; j++){

        var val = 100;
        var index = -1;
        for(var i = 0; i < hand.length; i++){
            if(hand[i].value < val){
                val = hand[i].value;
                index = i;
            }
        }

        temphand.push(hand[index]);
        hand.splice(index,1);

    }

    hand = temphand;

    // optional redraw of sorted cards

    /*
    for(var i = 0; i < 5; i++){

        stage.removeChild(hand[i]);



        stage.addChild(hand[i]);

        hand[i].x = (canvas.width * 0.05) + (canvas.width * .15 * i);
        hand[i].y = canvas.height * 0.75;
        hand[i].scaleX = (canvas.width  * 0.1) / hand[i].image.naturalWidth;
        hand[i].scaleY = (canvas.height * 0.2) / hand[i].image.naturalHeight;
    }
    */

    //console.log(hand);



    //check flush

    var flush = 1;
    for(var i = 1; i < 5; i++){
        if(hand[i].suit != hand[0].suit){
            flush = 0;
        }
    }

    if(flush){
        console.log("flush");
    }

    //check straight
    var straight = 0;

    if( hand[0].value + 4 == hand[4].value &&
        hand[1].value + 3 == hand[4].value &&
        hand[2].value + 2 == hand[4].value &&
        hand[3].value + 1 == hand[4].value){

        console.log("straight");
        straight = 1;
    }


    // algorithm to find streaks in the sorted hand. such as a pair or a full house.
    // does this by itterating once adn counting streaks
    //  can only have up to two streaks

    // stores information about streaks in thse variables

    var on = 0; // state that determines what streak we are on. 1,2 or 0
    var lengthOne = 0; // length of first streak
    var lengthTwo = 0; // length of second streak
    var last; // value that is streaking

    for(var i = 0; i <5; i++){

        var cur = hand[i].value;

        if(on == 1){
            if(last == cur){
                lengthOne++;
            }
            else if(lengthOne > 1){
                lengthTwo = 1;
                on = 2;
            }
        }
        else if(on ==2){
            if(last == cur){
                lengthTwo++;
            }
           
        }
        else{
           
            lengthOne = 1;
            on = 1;
           
            
        }

        last = cur;
    }

    if(lengthOne == 5){
        console.log("5 of a Kind");
    }
    else if(lengthOne == 4){
        console.log("4 of a Kind");
    }
    else if( (lengthOne == 3 && lengthTwo == 2) || (lengthOne == 2 && lengthTwo == 3) ){
        console.log("Full House");
    }
    else if(lengthOne == 3 || lengthTwo == 3){
        console.log("3 of a Kind");
    }
    else if(lengthOne == 2 && lengthTwo == 2){
        console.log("2 pair");
    }
    else if(lengthOne == 2 || lengthTwo == 2){
        console.log("pair");
    }
    else{
        console.log("high of " + hand[4].value);
    }

    /*

    // check 5 of a kind

    if( hand[0].value == hand[1].value && hand[1].value == hand[2].value &&
        hand[2].value == hand[3].value && hand[3].value == hand[4].value){
        console.log("five of a kind");
    }

    // check 4 of a kind

    if( (hand[0].value == hand[1].value && hand[1].value == hand[2].value && hand[2].value == hand[3].value)||
        (hand[1].value == hand[2].value && hand[2].value == hand[3].value && hand[3].value == hand[4].value){
        console.log("five of a kind");
    }

    //check fullhouse
    if( hand[0].value == hand[1].value && hand[3].value == hand[4].value &&
        ( (hand[1].value==hand[2].value) || (hand[2].value==hand[3].value) )){
        console.log("fullhouse");
    }

    // check 3 of a kind

    if( (hand[0].value == hand[1].value && hand[1].value == hand[2].value)||
        (hand[2].value == hand[3].value && hand[3].value == hand[4].value){
        console.log("five of a kind");
    }
    */



    var amount = lengthOne;
    if(lengthTwo >1){
        amount += lengthTwo;
    }


    var health = amount + (10*straight) + (10*flush); 
    var speed = lengthOne + lengthTwo; 
    var damage = lengthOne + lengthTwo + (10*straight) + (10*flush); 
    var range = (canvas.width  * 0.075);
    var attackSpeed = 1000;
    var pwidth = 0.1 + (.1*straight) + (.1*flush); 
    var pheight= 0.2 + (.2*straight) + (.2*flush);

    //console.log("Amount = " + amount);

    for(var i = 0; i < amount; i++){
        setTimeout(function(){
            //var unit = new Unit(hand[0].spawn.spriteSheet,"run",hand[0].spawn.health , hand[0].spawn.speed , hand[0].spawn.damage , hand[0].spawn.range, hand[0].spawn.attackSpeed, hand[0].spawn.pwidth , hand[0].spawn.pheight);
            var unit = new Unit(hand[0].spawn.spriteSheet,"run",  health , speed , damage , range , attackSpeed, pwidth , pheight);

            unit.y = canvas.height * 0.6;
            unit.x = canvas.height * 0.1;

            battleground.addChild(unit);
            units.push(unit);
        }, 500*i);
    }

    // basic enemy opposition
    // temporary
    var enemy = new Unit(grantSpriteSheet, "run", 3 , -1 , 1 , (canvas.width  * 0.075) , 1000);
    enemy.scaleX = -enemy.scaleX;
    enemy.y = canvas.height * 0.6;
    enemy.x = canvas.height * 2;

    battleground.addChild(enemy);
    enemies.push(enemy);
}


function update(){
    

    if(buttonTimer <= buttonTimeOut){
        buttonTimer+=1;
    }

    

    // adjusts scroll

    if(scroll !=0){
        if(scroll >0){
            if(battleground.x < 0){
                if(battleground.x + scroll < 0){
                    battleground.x += scroll;
                }
                else{
                    battleground.x = 0;
                    scroll = 0;
                }
            }
        }
        else{
            if(battleground.x > - canvas.width  * 2.0){
                if(battleground.x + scroll > - canvas.width  * 2.0){
                    battleground.x += scroll;
                }
                else{
                    battleground.x = -canvas.width  * 2.0;
                    scroll = 0;
                }
            }
        }
        scroll *= 0.8;
        if(Math.abs(scroll) <= 0.1){
            scroll = 0;
        }
    }

    var inRange = false;

    for(var i = 0; i < units.length; i++){

        // first check if dead
        if(units[i].health <= 0){
            
            battleground.removeChild(units[i]);
            units.splice(i,1);
            i--;
        }
        else{

            if(units[i].currentAnimation == "run"){

                inRange = false;
                var dx;
                var target;
                var min = 1000000; 
                for(var j = 0; j < enemies.length; j++){
                    dx = Math.abs(enemies[j].x -units[i].x);
                    if(dx < units[i].range){
                       inRange = true;
                        if(dx < min){
                            min = dx;
                            target = enemies[j];
                        }
                    }
                }

                if(inRange){
                    var attacker = units[i];
                    
                    units[i].gotoAndPlay("attack");
                    setTimeout(function(){
                        target.health -= attacker.damage;
                    },units[i].attackSpeed);
                }
                else{
                    units[i].x += units[i].speed;
                }
            }
        }

        
        //console.log( units[i]);
    }

    if(enemies.length == 0){
        //clearInterval(updateID);
        //initMenu();
    }
   
    for(var i = 0; i < enemies.length; i++){
        // first check if dead
        if(enemies[i].health <= 0){
            
            battleground.removeChild(enemies[i]);
            enemies.splice(i,1);
            i--;
        }
        else{
            if(enemies[i].currentAnimation == "run"){

                inRange = false;
                var dx;
                var target;
                var min = 1000000;
                for(var j = 0; j < units.length; j++){
                    dx = Math.abs(units[j].x -enemies[i].x);
                    if(dx < enemies[i].range){
                        inRange = true;
                        if(dx < min){
                            min = dx;
                            target = units[j];
                        }
                    }
                }

                if(inRange){
                    var attacker = enemies[i];
                    
                    enemies[i].gotoAndPlay("attack");
                    setTimeout(function(){
                        target.health -= attacker.damage;
                    },enemies[i].attackSpeed);
                }
                else{
                    enemies[i].x += enemies[i].speed;
                }
            }
            
        }
    }
    
    
}