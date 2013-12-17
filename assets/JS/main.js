//by: Jason Rissover

var stage;
var canvas;
var context;

var num = 0;

var FPS = 30;
var UPS = 30;

var deck;




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

        

        window.addEventListener( 'resize', onWindowResize, false );

        setInterval( function() { update(); } , 1000/UPS );
        setInterval( function() { draw();   } , 1000/FPS );
        //draw();
}

function onWindowResize( event ) {
        canvas.height = window.innerHeight ;
        canvas.width = window.innerWidth ;
        
}

function draw(){
        stage.update();
       // context.fillStyle="#FFFFFF";
        //context.fillRect(0,0,canvas.width , canvas.height);


       
        //console.log(hand);
        // context.drawImage(hand[0].image , 0,0);


}

function update(){
        var hand = deck.draw(5);

        stage.addChild(hand[0].image);

}