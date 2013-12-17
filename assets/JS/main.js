//by: Jason Rissover

var stage;
var canvas;
var context;

var timer = 0;

var FPS = 30;
var UPS = 30;

var deck;
var hand;

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

        console.log(stage);

        context = canvas.getContext("2d");
        
        deck = new Deck();
        deck.shuffle();

        hand = deck.draw(5);

        //drawNewHand();
        
        window.addEventListener( 'resize', onWindowResize, false );

        setInterval( function() { update();         } , 1000/UPS );
        setInterval( function() { stage.update();   } , 1000/FPS ); 
        //draw();
}

function onWindowResize( event ) {
        canvas.height = window.innerHeight ;
        canvas.width = window.innerWidth ;
        
}
function drawNewHand(){
    stage.removeChild(hand[0].image);
    stage.removeChild(hand[1].image);
    stage.removeChild(hand[2].image);
    stage.removeChild(hand[3].image);
    stage.removeChild(hand[4].image);

    hand = deck.draw(5);


    hand[0].image.x = canvas.width * 0.05;
    hand[0].image.y = canvas.height * 0.75;
    hand[0].image.scaleX = (canvas.width  * 0.1) / hand[0].image.image.naturalWidth;
    hand[0].image.scaleY = (canvas.height * 0.2) / hand[0].image.image.naturalHeight;
   
    stage.addChild(hand[0].image);

    hand[1].image.x = canvas.width * 0.20;
    hand[1].image.y = canvas.height * 0.75;
    hand[1].image.scaleX = (canvas.width  * 0.1) / hand[1].image.image.naturalWidth;
    hand[1].image.scaleY = (canvas.height * 0.2) / hand[1].image.image.naturalHeight;
    stage.addChild(hand[1].image);

    hand[2].image.x = canvas.width * 0.35;
    hand[2].image.y = canvas.height * 0.75;
    hand[2].image.scaleX = (canvas.width  * 0.1) / hand[2].image.image.naturalWidth;
    hand[2].image.scaleY = (canvas.height * 0.2) / hand[2].image.image.naturalHeight;
    stage.addChild(hand[2].image);

    hand[3].image.x = canvas.width * 0.50;
    hand[3].image.y = canvas.height * 0.75;
    hand[3].image.scaleX = (canvas.width  * 0.1) / hand[3].image.image.naturalWidth;
    hand[3].image.scaleY = (canvas.height * 0.2) / hand[3].image.image.naturalHeight;
    stage.addChild(hand[3].image);

    hand[4].image.x = canvas.width * 0.65;
    hand[4].image.y = canvas.height * 0.75;
    hand[4].image.scaleX = (canvas.width  * 0.1) / hand[4].image.image.naturalWidth;
    hand[4].image.scaleY = (canvas.height * 0.2) / hand[4].image.image.naturalHeight;
    stage.addChild(hand[4].image);
}

function update(){

        timer+=1;

        if( timer%UPS == 0 )
        {
            drawNewHand();
        }

}