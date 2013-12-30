/*
 * @author Jason Rissover
 *
 */

Card = function(value , suit, spawn) {

        createjs.Bitmap.call( this , "resources/sprites/classicCards/"+suit+"/"+value+".png");

        //this = new createjs.Bitmap("resources/sprites/classicCards/"+suit+"/"+value+".png");

        this.value = value;
        this.suit = suit;
        //this.image = new createjs.Bitmap("resources/sprites/classicCards/"+suit+"/"+value+".png");
        //this.image.card = this;
        this.spawn = spawn;
        this.hold = false;

        this.on("mousedown", function(evt) {
                //this.card.hold = !this.card.hold;

                if(buttonLabel.text == "Re Draw"){

                        this.hold = !this.hold;

                        if(this.hold){
                             this.y = canvas.height * 0.735;   
                        }
                        else{
                             this.y = canvas.height * 0.75;   
                        }

                }

                

                //console.log(suit+" "+value+ " : " + this.hold);
        });
}

Card.prototype = Object.create( createjs.Bitmap.prototype);

