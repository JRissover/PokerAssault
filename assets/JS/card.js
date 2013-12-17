/*
 * @author Jason Rissover
 *
 */

Card = function(value , suit) {

        this.value = value;
        this.suit = suit;
        this.image = new createjs.Bitmap("resources/sprites/classicCards/"+suit+"/"+value+".png");
        this.image.card = this;
        this.spawn = null;
        this.hold = false;

        this.image.on("mousedown", function(evt) {
                this.card.hold = !this.card.hold;
                console.log(suit+" "+value+ " : " + this.hold);
        });
}

