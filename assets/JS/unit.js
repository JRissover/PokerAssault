/*
 * @author Jason Rissover
 *
 */

Unit = function(spriteSheet , health , speed , damage , range) {

        createjs.Sprite.call( this ,spriteSheet);

        this.health = health || 1;
        this.speed  = speed  || 1;
        this.damage = damage || 1;
        this.range  = range  || 1;

}

Unit.prototype = Object.create( createjs.Sprite.prototype);

