//by: Jason Rissover

var stage;
var canvas;
var context;

var timer = 0;

var FPS = 30;

var deck;
var hand;

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

    context = canvas.getContext("2d");
    
    initGame();

    
    window.addEventListener( 'resize', onWindowResize, false );

    setInterval( function() { update();         } , 1000/UPS );
    setInterval( function() { stage.update();   } , 1000/FPS ); 
    //draw();
}



function onWindowResize( event ) {
        canvas.height = window.innerHeight ;
        canvas.width = window.innerWidth ;
        
}
