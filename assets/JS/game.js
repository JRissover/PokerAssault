//by: Jason Rissover

var UPS = 30;

var time;
var timers;

var deck;
var hand;

var mainButtonLabel;

var background;
var battleground;

var scroll = 0;
var lastPos = 0;
var scrollAccel = 0;
var levelWidth;

var units;
var enemies;
var projectiles;

var progress = 0;

var reactionarySpawners;
var timerSpawners;

var updateID;

var levelNumber;

var arcade;




function initGame(level) {

    stage.removeAllChildren();

    time = Date.now();
    timers = [];

    progress = 0;

    battleground = new createjs.Container();
    stage.addChild(battleground);

    deck = new Deck();
    deck.shuffle();

    hand = new Array();
    units = new Array();
    enemies = new Array();
    projectiles = new Array();

    if(level == 0){
        levelNumber = 0;
        arcade = true;
        curLevel = 1;

        levelWidth = 2.0;


        background = new createjs.Bitmap(loader.getResult("landscape"));
        background.scaleX = (canvas.width  * levelWidth) / background.image.naturalWidth;
        background.scaleY = (canvas.height * 0.7) / background.image.naturalHeight;
        battleground.addChild(background);

        timers.push(0);
        timers.push(0);
        timers.push(1);
    }
    else{
        levelNumber = level;
        curLevel = levels[level];
        arcade = false;

        levelWidth = curLevel.width;

        background = new createjs.Bitmap(loader.getResult(curLevel.background));
        background.scaleX = (canvas.width  * levelWidth) / background.image.naturalWidth;
        background.scaleY = (canvas.height * 0.7) / background.image.naturalHeight;
        battleground.addChild(background);

        for(var i = 0; i < curLevel.decorativeObjects.length; i++){
            var dec = new createjs.Bitmap(loader.getResult(curLevel.decorativeObjects[i].image));
            dec.scaleX = (canvas.width  * urLevel.decorativeObjects[i].pwidth ) / dec.image.naturalWidth;
            dec.scaleY = (canvas.height * urLevel.decorativeObjects[i].pheight) / dec.image.naturalHeight;
            dec.x = urLevel.decorativeObjects[i].x;
            dec.y = urLevel.decorativeObjects[i].y;
            stage.addChild(dec);
        }

        for(var i = 0; i < curLevel.stationaryUnits.length; i++){
            var u;
            if(curLevel.stationaryUnits[i].attackType == "ranged"){
                u= new Unit( curLevel.stationaryUnits[i].sprite , curLevel.stationaryUnits[i].state,
                            curLevel.stationaryUnits[i].health , 0 , curLevel.stationaryUnits[i].damage , 
                            curLevel.stationaryUnits[i].range ,  curLevel.stationaryUnits[i].attackSpeed , 
                            curLevel.stationaryUnits[i].pwidth , curLevel.stationaryUnits[i].pheight,
                            curLevel.stationaryUnits[i].attackType,
                            new Projectile(loader.getResult(curLevel.stationaryUnits[i].projectile.image),
                                        curLevel.stationaryUnits[i].projectile.type, curLevel.stationaryUnits[i].projectile.speed,
                                        curLevel.stationaryUnits[i].projectile.pwidth , curLevel.stationaryUnits[i].projectile.pheight)
                            );
            }
            else{
            //spriteSheet ,state , health , speed , damage , range , attackSpeed, pwidth , pheight
                u= new Unit( curLevel.stationaryUnits[i].sprite , curLevel.stationaryUnits[i].state,
                            curLevel.stationaryUnits[i].health , 0 , curLevel.stationaryUnits[i].damage , 
                            curLevel.stationaryUnits[i].range ,  curLevel.stationaryUnits[i].attackSpeed , 
                            curLevel.stationaryUnits[i].pwidth , curLevel.stationaryUnits[i].pheight, 
                            curLevel.stationaryUnits[i].attackType);
            }
            u.x = curLevel.stationaryUnits[i].x;
            u.y = curLevel.stationaryUnits[i].y;
            stage.addChild(u);
        }

        reactionarySpawners = [];
        timerSpawners = [];

        for(var i = 0; i < curLevel.spawners.length; i++){

            if(curLevel.spawners[i].type == "reactionary"){
                reactionarySpawners.push( curLevel.spawners[i] );
            }
            else if(curLevel.spawners[i].type == "timer"){
                timerSpawners.push( curLevel.spawners[i] );
                timers.push(0);
            }
            
        }
    }

    
    //console.log(curLevel);


    

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

    var mainButton = new createjs.Shape();
    var g = mainButton.graphics;
    g.beginFill("#FFF");
    g.drawRoundRect(canvas.width * 0.775 , canvas.height * 0.75 , canvas.width  * 0.2 ,  canvas.height * 0.2 , 100 )
    g.endFill();
    stage.addChild(mainButton);

    mainButton.on("mousedown", function(evt) {
        if((touch && evt.pointerID == 0)|| !touch){
            mainButtonPress();
        }
        
    });
    
    mainButtonLabel = new createjs.Text("Draw", "20px Arial", "#000");
    mainButtonLabel.textAlign = "center";
    mainButtonLabel.x = canvas.width  * 0.8725;
    mainButtonLabel.y = canvas.height * 0.83;
    stage.addChild(mainButtonLabel);

    var quitButton = new createjs.Shape();
    var g = quitButton.graphics;
    g.beginFill("#FFF");
    g.drawRoundRect(canvas.width * 0.9 , canvas.height * 0.0 , canvas.width  * 0.1 ,  canvas.height * 0.1 , 100 )
    g.endFill();
    stage.addChild(quitButton);

    quitButton.on("mousedown", function(evt) {
        if((touch && evt.pointerID == 0)|| !touch){
            clearInterval(updateID);
            initMainMenu();
        }
        
    });

    quitButtonLabel = new createjs.Text("Quit", "18px Arial", "#000");
    quitButtonLabel.textAlign = "center";
    quitButtonLabel.x = canvas.width  * 0.945;
    quitButtonLabel.y = canvas.height * 0.03;
    stage.addChild(quitButtonLabel);

    

    updateID = setInterval( update , 1000/UPS );
}

function spawnEnemyUnit(unitJSON , x , y){
    //spawns unit from json

    var u;
    if(unitJSON.attackType == "melee"){
        u = new Unit( spriteSheets[unitJSON.sprite] , unitJSON.state , unitJSON.health , -unitJSON.speed , unitJSON.damage , 
                (canvas.width  *unitJSON.range) ,  unitJSON.attackSpeed , -unitJSON.pwidth , unitJSON.pheight, unitJSON.attackType);
    }
    else if(unitJSON.attackType == "ranged"){
        
         u= new Unit( spriteSheets[unitJSON.sprite] , unitJSON.state, unitJSON.health , -unitJSON.speed , unitJSON.damage , 
                (canvas.width  *unitJSON.range) ,  unitJSON.attackSpeed , -unitJSON.pwidth , unitJSON.pheight, unitJSON.attackType,
                new Projectile(loader.getResult(unitJSON.projectile.image),
                            unitJSON.projectile.type, -unitJSON.projectile.speed,
                            -unitJSON.projectile.pwidth , unitJSON.projectile.pheight)
                );
    }

    
    u.x = x;
    u.y = y;

    enemies.push(u);
    battleground.addChild(u);
}


function mainButtonPress(){
    
    if(mainButtonLabel.text == "Re Draw"){
        
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

        mainButtonLabel.text = "Deploy";
    }
    else if(mainButtonLabel.text == "Draw"){

        hand = deck.draw(5);

        for(var i = 0; i < 5; i++){


            stage.addChild(hand[i]);

            hand[i].hold = false;

            hand[i].x = (canvas.width * 0.05) + (canvas.width * .15 * i);
            hand[i].y = canvas.height * 0.75;
            hand[i].scaleX = (canvas.width  * 0.1) / hand[i].image.naturalWidth;
            hand[i].scaleY = (canvas.height * 0.2) / hand[i].image.naturalHeight;


        }

        mainButtonLabel.text = "Re Draw";
    }
    else if(mainButtonLabel.text == "Deploy"){

        spawnHand();

        for(var i = 0; i < 5; i++){
            
            stage.removeChild(hand[i]);
        }

        mainButtonLabel.text = "Draw";
    }
    
    
}

function spawnHand(){

    // sort hand

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
    // does this by itterating once and counting streaks
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

    var amount = lengthOne;
    if(lengthTwo >1){
        amount += lengthTwo;
    }


    var health = amount + (10*straight) + (10*flush); 
    var speed = 0.1; 
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

    if(arcade){
        var enemy = new Unit( spriteSheets["grantSpriteSheet"] , "run" , curLevel , -((2*Math.random()) +1) , curLevel , 
                 (canvas.width  *0.075) ,  1000 , -((0.1*Math.random()) +.05) , ((0.2*Math.random()) +.1));
        enemy.x = canvas.width  *2.0;
        enemy.y = canvas.height *0.6;

        enemies.push(enemy);
        battleground.addChild(enemy);
    }
    else{
        for(var i = 0; i < reactionarySpawners.length; i++){
            var curSpawner = reactionarySpawners[i];
            if(progress < canvas.width*curSpawner.x){
                for(var j = 0; j < reactionarySpawners[i].wave.length; j++){
                    var curSpawn = curSpawner.wave[j];
                    setTimeout( 
                        function(){
                            spawnEnemyUnit(curSpawn , canvas.width*curSpawner.x , canvas.height *0.6);
                        }
                         , curSpawner.delay * j);
                }
            }
            
        }
    }

    
}


function update(){

    var oldTime = time;
    time = Date.now();
    var dt = time - oldTime;

    //console.log("progress: "+progress);

    

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
            if(battleground.x > - canvas.width  * (levelWidth-1.0)){
                if(battleground.x + scroll > - canvas.width  *(levelWidth-1.0)){
                    battleground.x += scroll;
                }
                else{
                    battleground.x = -canvas.width  * (levelWidth-1.0);
                    scroll = 0;
                }
            }
        }
        scroll *= 0.8;
        if(Math.abs(scroll) <= 0.1){
            scroll = 0;
        }
    }

    if(arcade){
        timers[0] += dt;
        timers[1] += dt;

        if(timers[0] >= 5000 * curLevel){
            curLevel +=1; // difficulty / level

            if(curLevel % 10 == 0){
                //every 10 levels spawnspeed goes up
                timers[2] +=1
            }
            timers[0] = 0;
        }

        if(timers[1] >= 10000 / timers[2]){

            var enemy = new Unit( spriteSheets["grantSpriteSheet"] , "run" , curLevel , -((2*Math.random()) +1) , curLevel , 
                     (canvas.width  *0.075) ,  1000 , -((0.1*Math.random()) +.05) , ((0.2*Math.random()) +.1));
            enemy.x = canvas.width  *2.0;
            enemy.y = canvas.height *0.6;

            enemies.push(enemy);
            battleground.addChild(enemy);

            timers[1] = 0;
        }
        
    }
    else{
        if(progress > canvas.width  *levelWidth){
            
            if(levelNumber >= levelProgress && levelProgress +1 <levels.length){
                levelProgress +=1;
            }
            clearInterval(updateID);
            initLevelSelectMenu(); 
        }

        for(var i = 0; i < timerSpawners.length; i++){
            timers[i] += dt;
            var curSpawner = timerSpawners[i];
            if(timers[i] >= timerSpawners[i].timer && progress < canvas.width*curSpawner.x){
                timers[i] = 0;
                for(var j = 0; j < timerSpawners[i].wave.length; j++){
                    var curSpawn = curSpawner.wave[j];
                    setTimeout( 
                        function(){
                            spawnEnemyUnit(curSpawn , canvas.width*curSpawner.x , canvas.height *0.6);
                        }
                     , curSpawner.delay * j);
                }
            }
        }
    }

    var inRange = false;

    for(var i = 0; i < units.length; i++){

        if(units[i].health <= 0){
            battleground.removeChild(units[i]);
            units.splice(i,1);
            i--;
        }
        else{
            updatePlayerUnit(units[i],dt);
        }
    }

   
    for(var i = 0; i < enemies.length; i++){

        if(enemies[i].health <= 0){
            battleground.removeChild(enemies[i]);
            enemies.splice(i,1);
            i--;
        }
        else{
            updateEnemyUnit(enemies[i],dt)
        }
    }

    for(var i = 0; i < projectiles.length; i++){

        if(projectiles[i].live){
            updateProjectile(projectiles[i],dt);
        }
        else{
            battleground.removeChild(projectiles[i]);
            projectiles.splice(i,1);
            i--;
        }
    }
}