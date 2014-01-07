/*
 * @author Jason Rissover
 *
 */

Unit = function(spriteSheet ,state , health , speed , damage , range , attackSpeed, pwidth , pheight) {

        createjs.Sprite.call( this ,spriteSheet,state);

        this.health = health || 3;
        this.speed  = speed  || 2;
        this.damage = damage || 1;
        this.range  = range  || (canvas.width  * 0.075);
        this.attackSpeed = attackSpeed || 1000;

        this.pwidth = pwidth ||0.1;
        this.pheight= pheight||0.2;

        this.scaleX = (canvas.width  * this.pwidth) / this.spriteSheet._frameWidth;
        this.scaleY = (canvas.height * this.pheight) / this.spriteSheet._frameHeight;

}

Unit.prototype = Object.create( createjs.Sprite.prototype);

