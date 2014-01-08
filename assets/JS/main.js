//by: Jason Rissover

var stage;
var canvas;
var context;

var timer = 0;

var FPS = 30;


var mainButton;
var buttonLabel;

init();

function init() {

    canvas = document.createElement( 'canvas' );
    document.body.appendChild( canvas );
    canvas.style.position = 'absolute';
    canvas.style.top = '0px';
    canvas.style.left = '0px';
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth ;

    stage = new createjs.Stage(canvas);
    createjs.Touch.enable(stage,true);

    context = canvas.getContext("2d");
    
    //initGame();
    initMenu();

    
    //window.addEventListener( 'resize', onWindowResize, false );

    
    setInterval( function() { stage.update();   } , 1000/FPS ); 
    //draw();
}

function initMenu(){

    stage.removeAllChildren();


    var startGameButton = new createjs.Shape();
    var g = startGameButton.graphics;
    g.beginFill("#FFF");
    g.drawRoundRect(canvas.width * 0.25 , canvas.height * 0.4 , canvas.width  * 0.5 ,  canvas.height * 0.1 , 100 )
    g.endFill();
    stage.addChild(startGameButton);
    startGameButton.on("mousedown", function(evt) {
        initGame();
    });

    var buttonLabel = new createjs.Text("Start Game", "30px Arial", "#000");
    buttonLabel.textAlign = "center";
    buttonLabel.x = canvas.width  * 0.5;
    buttonLabel.y = canvas.height * 0.425;
    stage.addChild(buttonLabel);



    var editDeckButton = new createjs.Shape();
    var g = editDeckButton.graphics;
    g.beginFill("#FFF");
    g.drawRoundRect(canvas.width * 0.25 , canvas.height * 0.6 , canvas.width  * 0.5 ,  canvas.height * 0.1 , 100 )
    g.endFill();
    stage.addChild(editDeckButton);
    editDeckButton.on("mousedown", function(evt) {
        //console.log("todo deck editor");
    });

    var editDeckButtonLabel = new createjs.Text("Edit Deck", "30px Arial", "#000");
    editDeckButtonLabel.textAlign = "center";
    editDeckButtonLabel.x = canvas.width  * 0.5;
    editDeckButtonLabel.y = canvas.height * 0.625;
    stage.addChild(editDeckButtonLabel);



    var exitGameButton = new createjs.Shape();
    var g = exitGameButton.graphics;
    g.beginFill("#FFF");
    g.drawRoundRect(canvas.width * 0.25 , canvas.height * 0.8 , canvas.width  * 0.5 ,  canvas.height * 0.1 , 100 )
    g.endFill();
    stage.addChild(exitGameButton);
    exitGameButton.on("mousedown", function(evt) {
        //console.log("todo exit button");
    });

    var exitGameButtonLabel = new createjs.Text("Exit Game", "30px Arial", "#000");
    exitGameButtonLabel.textAlign = "center";
    exitGameButtonLabel.x = canvas.width  * 0.5;
    exitGameButtonLabel.y = canvas.height * 0.825;
    stage.addChild(exitGameButtonLabel);

}



function onWindowResize( event ) {
        canvas.height = window.innerHeight ;
        canvas.width = window.innerWidth ;
        
}
