//by: Jason Rissover

function loadAssets(){

    manifest = [

        {src:"resources/sprites/Landscape.jpg", id:"landscape"},
        {src:"resources/sprites/runningGrant.png", id:"grant"},
        {src:"resources/sprites/arrow.png", id:"arrow"},


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
