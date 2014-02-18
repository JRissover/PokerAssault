//by: Jason Rissover

levels = [];

//level 0 is a templates
levels[0] = {

    "background": "image ID",

    "length": 1.5, //lenght of level in screen pwidths

    "decorativeObjects" : // to be made into bitmaps
    [
        { "image":"image id" , "x":0 , "y":0 , "pwidth":0 , "pheight":0 },
        { "image":"image id" , "x":0 , "y":0 , "pwidth":0 , "pheight":0 }
    ],
    "stationaryUnits" :
    [ //spriteSheet ,state , health , speed , damage , range , attackSpeed, ppwidth , ppheight
        {   "sprite":"spritesheet" , "state": "idle" ,
            "health" : 1 , "damage" : 1 , "range" : 0.075 , "attackSpeed" : 1 , 
            "x":0 , "y":0 , "pwidth":0 , "pheight":0 , "attackType" : "melee"
        },
        {   "sprite":"spritesheet" , "state": "idle" ,
            "health" : 1 , "damage" : 1 , "range" : 0.075 , "attackSpeed" : 1 , 
            "x":0 , "y":0 , "pwidth":0 , "pheight":0 , "attackType" : "melee"
        }
    ],
    "spawners" :
    [ //spriteSheet ,state , health , speed , damage , range , attackSpeed, ppwidth , ppheight
        
        {   "type" : "reactionary", //reactionary spawners spawn in response to the player deploying
            "timer" : 0 , //does nothing for reactionary spawner
            "delay" : 500 , // time between untis in wave
            "x":0 , "y":0 , //position units are spawned at
            "wave" : [ // units are spawned in this order
                { "sprite":"spritesheet" , "state": "run" ,
                    "health" : 1 , "damage" : 1 , "range" : 0.075 , "attackSpeed" : 1 , 
                    "pwidth":0 , "pheight":0 , "attackType" : "melee"
                },
                { "sprite":"spritesheet" , "state": "run" ,
                    "health" : 1 , "damage" : 1 , "range" : 0.075 , "attackSpeed" : 1 , 
                    "pwidth":0 , "pheight":0 , "attackType" : "ranged",
                    "projectile": { "image": "imageID", "type" : "straight OR lob" , "speed" : 0.1 , 
                                    "pwidth":0.05 , "pheight":0.05 }
                }
            ]
        },
        {   "type" : "timer", // spawns units evey so often
            "timer" : 1000 , // frequency of unit spawns ms
            "delay" : 500 , // time between untis in wave
            "x":0 , "y":0 , //position units are spawned at
            "wave" : [ // units are spawned in this order
                { "sprite":"spritesheet" , "state": "run" ,
                    "health" : 1 , "damage" : 1 , "range" : 0.075 , "attackSpeed" : 1 , "speed" : 1 , 
                    "pwidth":0 , "pheight":0 , "attackType" : "melee"
                },
                { "sprite":"spritesheet" , "state": "run" ,
                    "health" : 1 , "damage" : 1 , "range" : 0.075 , "attackSpeed" : 1 , "speed" : 1 , 
                    "pwidth":0 , "pheight":0 , "attackType" : "melee"
                }
            ]
        }
    ]
    
};

levels[1] = {
    "background": "landscape",

    "health": 25,

    "width": 1.0, //lenght of level in screen pwidths

    "decorativeObjects" : [],
    "stationaryUnits" :   [],
    "spawners" :
    [ //spriteSheet ,state , health , speed , damage , range , attackSpeed, ppwidth , ppheight
        
        {   "type" : "reactionary", //reactionary spawners spawn in response to the player deploying
            "timer" : 0 , //does nothing for reactionary spawner
            "delay" : 500 , // time between untis in wave
            "x":1 , "y":0 , //position units are spawned at
            "wave" : [ // units are spawned in this order
                { "sprite":"grantSpriteSheet" , "state": "run" ,
                    "health" : 1 , "damage" : 1 , "range" : 0.075  , "attackSpeed" : 1500 ,  "speed" : 0.1 , 
                    "pwidth": 0.1 , "pheight":0.2 , "attackType" : "ranged",
                    "projectile": { "image": "arrow", "type" : "straight" , "speed" : 0.05 , 
                                    "pwidth":0.05 , "pheight":0.05 }
                }
            ]
        }
    ]
};

levels[2] = {
    "background": "landscape",

    "health": 50,

    "width": 2.0, //lenght of level in screen pwidths

    "decorativeObjects" : [],
    "stationaryUnits" :   [],
    "spawners" :
    [ //spriteSheet ,state , health , speed , damage , range , attackSpeed, ppwidth , ppheight
        
        {   "type" : "timer", // spawns units evey so often
            "timer" : 5000 , // frequency of unit spawns ms
            "delay" : 500 , // time between untis in wave
            "x":2 , "y":0 , //position units are spawned at
            "wave" : [ // units are spawned in this order
                { "sprite":"grantSpriteSheet" , "state": "run" ,
                    "health" : 1 , "damage" : 1 , "range" : 0.075  , "attackSpeed" : 1500 ,  "speed" : 0.1 , 
                    "pwidth": 0.1 , "pheight":0.2 , "attackType" : "melee"
                }
            ]
        }
    ]
};

levels[3] = {
    "background": "landscape",

    "health": 100,

    "width": 3.0, //lenght of level in screen pwidths

    "decorativeObjects" : [],
    "stationaryUnits" :   [],
    "spawners" :
    [ //spriteSheet ,state , health , speed , damage , range , attackSpeed, ppwidth , ppheight
        {   "type" : "reactionary", //reactionary spawners spawn in response to the player deploying
            "timer" : 0 , //does nothing for reactionary spawner
            "delay" : 500 , // time between untis in wave
            "x":3 , "y":0 , //position units are spawned at
            "wave" : [ // units are spawned in this order
                { "sprite":"grantSpriteSheet" , "state": "run" ,
                    "health" : 1 , "damage" : 1 , "range" : 0.075  , "attackSpeed" : 1500 ,  "speed" : 0.1 , 
                    "pwidth": 0.1 , "pheight":0.2 , "attackType" : "melee"
                }
            ]
        },
        {   "type" : "timer", // spawns units evey so often
            "timer" : 5000 , // frequency of unit spawns ms
            "delay" : 500 , // time between untis in wave
            "x":3 , "y":0 , //position units are spawned at
            "wave" : [ // units are spawned in this order
                { "sprite":"grantSpriteSheet" , "state": "run" ,
                    "health" : 1 , "damage" : 1 , "range" : 0.075  , "attackSpeed" : 1500 ,  "speed" : 0.1 , 
                    "pwidth": 0.1 , "pheight":0.2 , "attackType" : "melee"
                }
            ]
        }
    ]
};
