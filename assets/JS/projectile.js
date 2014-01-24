/*
 * @author Jason Rissover
 *
 */



Projectile = function( image ,projectileType , speed , pwidth , pheight) {

        createjs.Bitmap.call( this ,image);

        this.projType = projectileType || "straight";
        this.live = true;
        this.innitialVelocity  = speed  || (canvas.width  *0.1);

        if(this.projType == "lob"){
                this.vx = Math.cos(this.rotation) * this.innitialVelocity;
                this.vy = Math.sin(this.rotation) * this.innitialVelocity;
                this.gravity = 0.2;
        }
        else if (this.projType == "straight"){
                this.vx = this.innitialVelocity;
                //console.log("vel: "+this.innitialVelocity);
                this.vy = 0;
                this.gravity = 0;
        }

        this.pwidth = pwidth ||0.1;
        this.pheight= pheight||0.2;

        //this.regX = this.image.naturalWidth/2.0;
        //this.regy = this.image.naturalHeight/2.0;

        this.scaleX = (canvas.width  * this.pwidth) / this.image.naturalWidth;
        this.scaleY = (canvas.height * this.pheight) / this.image.naturalHeight;

}

Projectile.prototype = Object.create( createjs.Bitmap.prototype);

function updateProjectile(proj , dt){
        proj.vy -= proj.gravity;
        proj.x += proj.vx * dt;
        proj.y += proj.vy * dt;
}