/*
 * @author Jason Rissover
 *
 */

Card = function(value , suit) {

        this.value = value;
        this.suit = suit;
        this.image = new createjs.Bitmap("resources/sprites/classicCards/"+suit+"/"+value+".png");
        this.spawn = null;
}