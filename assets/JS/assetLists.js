//by: Jason Rissover

function loadAssets(){

    manifest = [

        {src:"resources/sprites/Landscape.jpg", id:"landscape"},
        {src:"resources/sprites/runningGrant.png", id:"grant"},


        // plaiyng cards
        // id = suit+" "+value
        {src:"resources/sprites/classicCards/Clubs/1.png", id:"Clubs 1"},
        {src:"resources/sprites/classicCards/Clubs/2.png", id:"Clubs 2"},
        {src:"resources/sprites/classicCards/Clubs/3.png", id:"Clubs 3"},
        {src:"resources/sprites/classicCards/Clubs/4.png", id:"Clubs 4"},
        {src:"resources/sprites/classicCards/Clubs/5.png", id:"Clubs 5"},
        {src:"resources/sprites/classicCards/Clubs/6.png", id:"Clubs 6"},
        {src:"resources/sprites/classicCards/Clubs/7.png", id:"Clubs 7"},
        {src:"resources/sprites/classicCards/Clubs/8.png", id:"Clubs 8"},
        {src:"resources/sprites/classicCards/Clubs/9.png", id:"Clubs 9"},
        {src:"resources/sprites/classicCards/Clubs/10.png", id:"Clubs 10"},
        {src:"resources/sprites/classicCards/Clubs/11.png", id:"Clubs 11"},
        {src:"resources/sprites/classicCards/Clubs/12.png", id:"Clubs 12"},
        {src:"resources/sprites/classicCards/Clubs/13.png", id:"Clubs 13"},

        {src:"resources/sprites/classicCards/Diamonds/1.png", id:"Diamonds 1"},
        {src:"resources/sprites/classicCards/Diamonds/2.png", id:"Diamonds 2"},
        {src:"resources/sprites/classicCards/Diamonds/3.png", id:"Diamonds 3"},
        {src:"resources/sprites/classicCards/Diamonds/4.png", id:"Diamonds 4"},
        {src:"resources/sprites/classicCards/Diamonds/5.png", id:"Diamonds 5"},
        {src:"resources/sprites/classicCards/Diamonds/6.png", id:"Diamonds 6"},
        {src:"resources/sprites/classicCards/Diamonds/7.png", id:"Diamonds 7"},
        {src:"resources/sprites/classicCards/Diamonds/8.png", id:"Diamonds 8"},
        {src:"resources/sprites/classicCards/Diamonds/9.png", id:"Diamonds 9"},
        {src:"resources/sprites/classicCards/Diamonds/10.png", id:"Diamonds 10"},
        {src:"resources/sprites/classicCards/Diamonds/11.png", id:"Diamonds 11"},
        {src:"resources/sprites/classicCards/Diamonds/12.png", id:"Diamonds 12"},
        {src:"resources/sprites/classicCards/Diamonds/13.png", id:"Diamonds 13"},

        {src:"resources/sprites/classicCards/Hearts/1.png", id:"Hearts 1"},
        {src:"resources/sprites/classicCards/Hearts/2.png", id:"Hearts 2"},
        {src:"resources/sprites/classicCards/Hearts/3.png", id:"Hearts 3"},
        {src:"resources/sprites/classicCards/Hearts/4.png", id:"Hearts 4"},
        {src:"resources/sprites/classicCards/Hearts/5.png", id:"Hearts 5"},
        {src:"resources/sprites/classicCards/Hearts/6.png", id:"Hearts 6"},
        {src:"resources/sprites/classicCards/Hearts/7.png", id:"Hearts 7"},
        {src:"resources/sprites/classicCards/Hearts/8.png", id:"Hearts 8"},
        {src:"resources/sprites/classicCards/Hearts/9.png", id:"Hearts 9"},
        {src:"resources/sprites/classicCards/Hearts/10.png", id:"Hearts 10"},
        {src:"resources/sprites/classicCards/Hearts/11.png", id:"Hearts 11"},
        {src:"resources/sprites/classicCards/Hearts/12.png", id:"Hearts 12"},
        {src:"resources/sprites/classicCards/Hearts/13.png", id:"Hearts 13"},

        {src:"resources/sprites/classicCards/Spades/1.png", id:"Spades 1"},
        {src:"resources/sprites/classicCards/Spades/2.png", id:"Spades 2"},
        {src:"resources/sprites/classicCards/Spades/3.png", id:"Spades 3"},
        {src:"resources/sprites/classicCards/Spades/4.png", id:"Spades 4"},
        {src:"resources/sprites/classicCards/Spades/5.png", id:"Spades 5"},
        {src:"resources/sprites/classicCards/Spades/6.png", id:"Spades 6"},
        {src:"resources/sprites/classicCards/Spades/7.png", id:"Spades 7"},
        {src:"resources/sprites/classicCards/Spades/8.png", id:"Spades 8"},
        {src:"resources/sprites/classicCards/Spades/9.png", id:"Spades 9"},
        {src:"resources/sprites/classicCards/Spades/10.png", id:"Spades 10"},
        {src:"resources/sprites/classicCards/Spades/11.png", id:"Spades 11"},
        {src:"resources/sprites/classicCards/Spades/12.png", id:"Spades 12"},
        {src:"resources/sprites/classicCards/Spades/13.png", id:"Spades 13"}

    ];

    loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete", function(){
        createSpriteSheets();
        initMenu();
    });
    loader.loadManifest(manifest);
}

function createSpriteSheets(){

    spriteSheets = {};

    spriteSheets["grantSpriteSheet"] = new createjs.SpriteSheet({
        "animations":
        {
            "run": [0, 25, "run"],
            "attack": [26, 63, "run"]},
            "images": [loader.getResult("grant")],
            "frames":
                {
                    "height": 292.5,
                    "width":165.75,
                    "regX": 82.875,
                    "regY": 292.5,
                    "count": 64
                }
    });

}
