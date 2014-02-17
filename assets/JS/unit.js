/*
 * @author Jason Rissover
 *
 */

Unit = function(spriteSheet ,state , health , speed , damage , range , attackSpeed, pwidth , pheight, attackType, projectile) {

        createjs.Sprite.call( this ,spriteSheet,state);

        this.health = health || 3;
        this.speed  = speed  || 0.1;
        this.damage = damage || 1;
        this.range  = range  || (canvas.width  * 0.075);
        this.attackSpeed = attackSpeed || 1000;
        this.attackType = attackType || "melee";
        if(this.attackType == "ranged"){
                this.projectile = projectile;
        }

        this.pwidth = pwidth ||0.1;
        this.pheight= pheight||0.2;

        this.scaleX = (canvas.width  * this.pwidth) / this.spriteSheet._frameWidth;
        this.scaleY = (canvas.height * this.pheight) / this.spriteSheet._frameHeight;

}

Unit.prototype = Object.create( createjs.Sprite.prototype);

function updatePlayerUnit(unit,dt){


    if(unit.currentAnimation == "run"){

        var inRange = false;
        var dx;
        var target;
        var min = 1000000; 
        for(var j = 0; j < enemies.length; j++){
            dx = Math.abs(enemies[j].x -unit.x);
            if(dx < unit.range){
               inRange = true;
                if(dx < min){
                    min = dx;
                    target = enemies[j];
                }
            }
        }

        if(inRange){
            var attacker = unit;
            
            unit.gotoAndPlay("attack");

            if(unit.attackType == "ranged"){

                //var proj = new Projectile(loader.getResult("arrow"), "straight", (min/unit.attackSpeed),0.05, 0.05);
                var proj = new Projectile(unit.projectile.image,unit.projectile.projType, unit.projectile.innitialVelocity, 
                               unit.projectile.pwidth,  unit.projectile.pheight);
                proj.x = unit.x;
                proj.y = unit.y + (canvas.height * unit.pheight * 0.75) ;
                projectiles.push(proj);
                battleground.addChild(proj);
                setTimeout(function(){
                        target.health -= attacker.damage;
                        proj.live = false;
                },unit.attackSpeed);
            }
            else if(unit.attackType == "melee"){
                setTimeout(function(){
                        target.health -= attacker.damage;
                },unit.attackSpeed);
            }
        }
        else{
            unit.x += (canvas.width  *unit.speed) / dt;
            if(unit.x > progress){
                progress = unit.x;
            }
            if(unit.x > canvas.width*levelWidth){
                unit.health = 0;
                score += 4 * unit.damage;
            }
        }
    }
}
function updateEnemyUnit(unit,dt){
    if(unit.currentAnimation == "run"){

        inRange = false;
        var dx;
        var target;
        var min = 1000000;
        for(var j = 0; j < units.length; j++){
            dx = Math.abs(units[j].x -unit.x);
            if(dx < unit.range){
                inRange = true;
                if(dx < min){
                    min = dx;
                    target = units[j];
                }
            }
        }

        if(inRange){
            var attacker = unit;
            
            unit.gotoAndPlay("attack");
            if(unit.attackType == "ranged"){
                var proj = new Projectile(unit.projectile.image,unit.projectile.projType, unit.projectile.innitialVelocity, 
                               unit.projectile.pwidth,  unit.projectile.pheight);
                proj.x = unit.x;
                proj.y = unit.y -(canvas.height * unit.pheight * 0.75) ;
                projectiles.push(proj);
                battleground.addChild(proj);
                setTimeout(function(){
                        target.health -= attacker.damage;
                        proj.live = false;
                },unit.attackSpeed);
            }
            else if(unit.attackType == "melee"){
                setTimeout(function(){
                        target.health -= attacker.damage;
                },unit.attackSpeed);
            }
        }
        else{
            unit.x += (canvas.width  *unit.speed) / dt;
            if(unit.x < 0){
                unit.health = 0;
                score -= unit.damage;
            }
        }
    }
}

