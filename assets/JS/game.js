//by: Jason Rissover

var UPS = 30;

var deck;
var hand;

var mainButton;
var buttonLabel;

init();


function initGame() {
    deck = new Deck();
    deck.shuffle();

    hand = new Array();

    var mainButton = new createjs.Shape();
    var g = mainButton.graphics;
    g.beginFill("#FFF");
    g.drawRoundRect(canvas.width * 0.775 , canvas.height * 0.75 , canvas.width  * 0.2 ,  canvas.height * 0.2 , 100 )
    g.endFill();
    stage.addChild(mainButton);
    mainButton.on("mousedown", function(evt) {
        drawNewHand();
    });
    
    var buttonLabel = new createjs.Text("Draw", "20px Arial", "#000");
    buttonLabel.textAlign = "center";
    buttonLabel.x = canvas.width  * 0.8725;
    buttonLabel.y = canvas.height * 0.83;
    stage.addChild(buttonLabel);

    setInterval( function() { update();         } , 1000/UPS );
}

function onWindowResize( event ) {
        canvas.height = window.innerHeight ;
        canvas.width = window.innerWidth ;
        
}
function drawNewHand(){
    

    if(hand.length == 5){
        
        for(var i = 0; i < 5; i++){
            //console.log(hand[i])

            if(hand[i].hold){
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
    }
    else{

        hand = deck.draw(5);

        for(var i = 0; i < 5; i++){


            stage.addChild(hand[i]);

            hand[i].hold = false;

            hand[i].x = (canvas.width * 0.05) + (canvas.width * .15 * i);
            hand[i].y = canvas.height * 0.75;
            hand[i].scaleX = (canvas.width  * 0.1) / hand[i].image.naturalWidth;
            hand[i].scaleY = (canvas.height * 0.2) / hand[i].image.naturalHeight;


        }

    }


}

function update(){

        timer+=1;


}