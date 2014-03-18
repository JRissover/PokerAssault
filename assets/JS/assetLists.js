//by: Jason Rissover

function loadAssets(){

    manifest = [

        {src:"resources/sprites/Landscape.jpg", id:"landscape"},
        {src:"resources/sprites/runningGrant.png", id:"grant"},
        {src:"resources/sprites/arrow.png", id:"arrow"},
        {src:"resources/sprites/greenSpriteSheet.png", id:"greenSheet"},
        {src:"resources/sprites/redSpriteSheet.png", id:"redSheet"},
        {src:"resources/sprites/blackSpriteSheet.png", id:"blackSheet"},
        {src:"resources/sprites/blueSpriteSheet.png", id:"blueSheet"},


        // plaiyng cards
        // id = suit+" "+value
        {src:"resources/sprites/CardSheet.png", id:"cards"}

    ];

    loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete", function(){
        createSpriteSheets();
        initMainMenu();
    });
    loader.loadManifest(manifest);
}

function createSpriteSheets(){

    spriteSheets = {};

    spriteSheets["grantSpriteSheet"] = new createjs.SpriteSheet({
        "images": [loader.getResult("grant")],
        "animations":
        {
            "run": [0, 25, "run"],
            "attack": [26, 63, "run"]
        },
        "frames":
        {
            "height": 292.5,
            "width":165.75,
            "regX": 82.875,
            "regY": 292.5,
            "count": 64
        }
    });

    spriteSheets["greenSpriteSheet"] = new createjs.SpriteSheet({
        "images": [loader.getResult("greenSheet")],
        "animations":
        {
            "attack": [0, 5, "run"],
            "run": [6, 11, "run"]
        },
        "frames":
        {
            "height": 200.0,
            "width": 150.0,
            "regX": 75.0,
            "regY": 200.0,
            "count": 12
        }
    });
    spriteSheets["redSpriteSheet"] = new createjs.SpriteSheet({
        "images": [loader.getResult("redSheet")],
        "animations":
        {
            "attack": [0, 5, "run"],
            "run": [6, 11, "run"]
        },
        "frames":
        {
            "height": 200.0,
            "width": 150.0,
            "regX": 75.0,
            "regY": 200.0,
            "count": 12
        }
    });
    spriteSheets["blackSpriteSheet"] = new createjs.SpriteSheet({
        "images": [loader.getResult("blackSheet")],
        "animations":
        {
            "attack": [0, 5, "run"],
            "run": [6, 11, "run"]
        },
        "frames":
        {
            "height": 200.0,
            "width": 150.0,
            "regX": 75.0,
            "regY": 200.0,
            "count": 12
        }
    });
    spriteSheets["blueSpriteSheet"] = new createjs.SpriteSheet({
        "images": [loader.getResult("blueSheet")],
        "animations":
        {
            "attack": [0, 5, "run"],
            "run": [6, 11, "run"]
        },
        "frames":
        {
            "height": 200.0,
            "width": 150.0,
            "regX": 75.0,
            "regY": 200.0,
            "count": 12
        }
    });

    spriteSheets["CardSheet"] = new createjs.SpriteSheet({
        "images": [loader.getResult("cards")],
        "frames":
        {
            "height": 300.0,
            "width": 200.0,
            "regX": 100.0,
            "regY": 150.0
        }
    });

}
