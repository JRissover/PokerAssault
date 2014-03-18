/*
 * @author Jason Rissover
 *
 */

Card = function(value , suit, unit ) {

        //createjs.Bitmap.call( this , "resources/sprites/classicCards/"+suit+"/"+value+".png");
        

        createjs.Sprite.call( this ,spriteSheets["CardSheet"]);

        
        this.value = value;
       

        var frameIndex = 0 ;
        if(suit == "Red"){
            frameIndex = this.value - 1;
            this.spawn = unit || new Unit(spriteSheets["redSpriteSheet"], "run" , this.value ,0.1, this.value);
        }
        else if(suit == "Green"){
            frameIndex = 13 +  this.value - 1;
            this.spawn = unit || new Unit(spriteSheets["greenSpriteSheet"], "run" , this.value ,0.1, this.value);
        }
        else if(suit == "Blue"){
            frameIndex = 26 +  this.value - 1;
            this.spawn = unit || new Unit(spriteSheets["blueSpriteSheet"], "run" , this.value ,0.1, this.value);
        }
        else if(suit == "Black"){
            frameIndex = 39 +  this.value - 1;
            this.spawn = unit || new Unit(spriteSheets["blackSpriteSheet"], "run" , this.value ,0.1, this.value);
        }


        //console.log(frameIndex);

        this.gotoAndStop(frameIndex);  

        
        this.suit = suit;
        //Unit = function(spriteSheet ,state , health , speed , damage , range , attackSpeed, pwidth , pheight, attackType, projectile) {
        


        //this.spawn.regX = this.spawn.scaleX/2.0;

        this.hold = false;

        this.on("pressup", function(evt) {
                //this.card.hold = !this.card.hold;

                if(mainButtonLabel.text == "Re Draw"){

                    if((touch && evt.pointerID == 0)|| !touch){

                        this.hold = !this.hold;

                        if(this.hold){
                             this.y = canvas.height * 0.825;   
                        }
                        else{
                             this.y = canvas.height * 0.85;   
                        }
                    }

                }

                

                //console.log(suit+" "+value+ " : " + this.hold);
        });
}

Card.prototype = Object.create( createjs.Sprite.prototype);

