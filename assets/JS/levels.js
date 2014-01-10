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
            "x":0 , "y":0 , "pwidth":0 , "pheight":0 
        },
        {   "sprite":"spritesheet" , "state": "idle" ,
            "health" : 1 , "damage" : 1 , "range" : 0.075 , "attackSpeed" : 1 , 
            "x":0 , "y":0 , "pwidth":0 , "pheight":0 
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
                    "pwidth":0 , "pheight":0 
                },
                { "sprite":"spritesheet" , "state": "run" ,
                    "health" : 1 , "damage" : 1 , "range" : 0.075 , "attackSpeed" : 1 , 
                    "pwidth":0 , "pheight":0 
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
                    "pwidth":0 , "pheight":0 
                },
                { "sprite":"spritesheet" , "state": "run" ,
                    "health" : 1 , "damage" : 1 , "range" : 0.075 , "attackSpeed" : 1 , "speed" : 1 , 
                    "pwidth":0 , "pheight":0 
                }
            ]
        }
    ]
    
};

levels[1] = {
    "background": "landscape",

    "width": 3.0, //lenght of level in screen pwidths

    "decorativeObjects" : [],
    "stationaryUnits" :   [],
    "spawners" :
    [ //spriteSheet ,state , health , speed , damage , range , attackSpeed, ppwidth , ppheight
        
        {   "type" : "reactionary", //reactionary spawners spawn in response to the player deploying
            "timer" : 0 , //does nothing for reactionary spawner
            "delay" : 500 , // time between untis in wave
            "x":2 , "y":0 , //position units are spawned at
            "wave" : [ // units are spawned in this order
                { "sprite":"grantSpriteSheet" , "state": "run" ,
                    "health" : 1 , "damage" : 1 , "range" : 0.075  , "attackSpeed" : 1000 ,  "speed" : 1 , 
                    "pwidth": 0.1 , "pheight":0.2 
                },
                { "sprite":"grantSpriteSheet" , "state": "run" ,
                    "health" : 1 , "damage" : 1 , "range" : 0.075  , "attackSpeed" : 1000 ,  "speed" : 1 , 
                    "pwidth": 0.1 , "pheight":0.2 
                }
            ]
        }
    ]
};

