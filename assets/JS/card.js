/*
 * @author Jason Rissover
 *
 */

Card = function(value , suit) {



        createjs.Bitmap.call( this , "resources/sprites/classicCards/"+suit+"/"+value+".png");

        //this = new createjs.Bitmap("resources/sprites/classicCards/"+suit+"/"+value+".png");

        this.value = value;
        this.suit = suit;
        //this.image = new createjs.Bitmap("resources/sprites/classicCards/"+suit+"/"+value+".png");
        //this.image.card = this;
        this.spawn = null;
        this.hold = false;

        this.on("mousedown", function(evt) {
                //this.card.hold = !this.card.hold;
                this.hold = !this.hold;
                //console.log(suit+" "+value+ " : " + this.hold);
        });
}

Card.prototype = Object.create( createjs.Bitmap.prototype);

