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
                if(arcade){
                    score += 4 * unit.damage;
                }
                else{
                    score -= unit.damage;
                }
                
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
                life -= unit.damage;
            }
        }
    }
}

function spawnEnemyUnit(unitJSON , x , y){
    //spawns unit from json

    var u;
    if(unitJSON.attackType == "melee"){
        u = new Unit( spriteSheets[unitJSON.sprite] , unitJSON.state , unitJSON.health , -unitJSON.speed , unitJSON.damage , 
                (canvas.width  *unitJSON.range) ,  unitJSON.attackSpeed , -unitJSON.pwidth , unitJSON.pheight, unitJSON.attackType);
    }
    else if(unitJSON.attackType == "ranged"){
        
         u= new Unit( spriteSheets[unitJSON.sprite] , unitJSON.state, unitJSON.health , -unitJSON.speed , unitJSON.damage , 
                (canvas.width  *unitJSON.range) ,  unitJSON.attackSpeed , -unitJSON.pwidth , unitJSON.pheight, unitJSON.attackType,
                new Projectile(loader.getResult(unitJSON.projectile.image),
                            unitJSON.projectile.type, -unitJSON.projectile.speed,
                            -unitJSON.projectile.pwidth , unitJSON.projectile.pheight)
                );
    }

    
    u.x = x;
    u.y = y;

    enemies.push(u);
    battleground.addChild(u);
}

