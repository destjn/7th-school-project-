enum ActionKind {
    Walking,
    Idle,
    Jumping,
    Walk_front,
    Walk_up,
    Walk_right,
    Walk_left
}
namespace SpriteKind {
    export const Scenery = SpriteKind.create()
    export const NPC = SpriteKind.create()
    export const Item = SpriteKind.create()
    export const Complete = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Item, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeScoreBy(1)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile1`, function (sprite, location) {
    Clearlevel()
})
function Random () {
    for (let index = 0; index < 15; index++) {
        Trash = sprites.create(img`
            . . c c c c . . 
            . c b d a e c . 
            c 5 d e d d e c 
            c b b e d d d e 
            c 9 d b e d b c 
            c c 9 d b b b c 
            c c c b e d 7 c 
            . e b e c c c . 
            `, SpriteKind.Item)
        tiles.placeOnRandomTile(Trash, sprites.dungeon.floorLight2)
    }
    tiles.setWallAt(tiles.getTileLocation(11, 1), true)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.NPC, function (sprite, otherSprite) {
    Dialogue_mode = true
    game.showLongText("Hey young man thank you for coming here, can you help me clean the cafeteria?", DialogLayout.Center)
    story.showPlayerChoices("Yes", "No")
    if (story.checkLastAnswer("Yes")) {
        Random()
        Janitor.setKind(SpriteKind.Complete)
        game.showLongText("Collect 15 trash around the cafeteria.", DialogLayout.Center)
    } else if (story.checkLastAnswer("No")) {
        game.showLongText("............", DialogLayout.Bottom)
    }
    Dialogue_mode = false
    pause(1000)
})
function Createlevel () {
    if (Level == 1) {
        game.splash("Bye mom!")
        tiles.setCurrentTilemap(tilemap`level6`)
    } else if (Level == 2) {
        tiles.setCurrentTilemap(tilemap`level8`)
    } else if (Level == 3) {
        tiles.setCurrentTilemap(tilemap`level1`)
    } else if (Level == 4) {
        tiles.setCurrentTilemap(tilemap`level12`)
        tiles.placeOnRandomTile(Main_character, assets.tile`myTile28`)
        Janitor = sprites.create(img`
            . . . . f f f f f . . . 
            . . f f 1 1 1 1 1 f . . 
            . f 1 1 1 1 1 1 1 1 f . 
            f 1 1 1 1 1 1 1 1 1 1 f 
            f 1 1 1 1 1 1 1 4 1 1 f 
            f 1 1 1 1 1 1 4 4 1 1 f 
            f 1 1 1 4 4 4 4 4 1 f f 
            f f 4 e 4 f f 4 4 1 f f 
            . f 4 d 4 d d d d f f . 
            . f f f 4 d d b b f . . 
            . . f e e 4 4 4 e f . . 
            . . 4 d d e b b c f . . 
            . . e d d e b b c f . . 
            . . f e e f e e e f . . 
            . . . f f f f f f . . . 
            . . . . f f f . . . . . 
            `, SpriteKind.NPC)
        tiles.placeOnRandomTile(Janitor, assets.tile`myTile44`)
        Dialogue_mode = false
        story.spriteSayText(Janitor, "Hey young man! Over here.....")
    } else if (Level == 5) {
        tiles.setCurrentTilemap(tilemap`level11`)
        tiles.placeOnRandomTile(Main_character, assets.tile`myTile28`)
    }
    tiles.placeOnRandomTile(Main_character, assets.tile`myTile12`)
    scene.setBackgroundColor(15)
}
function Start_game () {
    Level = 1
    Main_character = sprites.create(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f e e f f f . . . . 
        . . . f f f e e e e f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f 1 1 1 1 1 1 1 1 1 1 f . . 
        . . f e e f f f f f f e e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 1 1 b b 1 1 f 4 e . . 
        . . 4 d f 1 1 1 b 1 1 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `, SpriteKind.Player)
    scene.cameraFollowSprite(Main_character)
    controller.moveSprite(Main_character)
    Createlevel()
    Idle = animation.createAnimation(ActionKind.Idle, 200)
    animation.attachAnimation(Main_character, Idle)
    Idle.addAnimationFrame(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f e e f f f . . . . 
        . . . f f f e e e e f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f 1 1 1 1 1 1 1 1 1 1 f . . 
        . . f e e f f f f f f e e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 1 1 b b 1 1 f 4 e . . 
        . . 4 d f 1 1 1 b 1 1 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `)
    Idle.addAnimationFrame(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f e e f f f . . . . 
        . . . f f f e e e e f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f 1 1 1 1 1 1 1 1 1 1 f . . 
        . . f e e f f f f f f e e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f f f 4 4 f f f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 1 1 b b 1 1 f 4 e . . 
        . . 4 d f 1 1 1 b 1 1 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `)
    Idle.addAnimationFrame(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f e e f f f . . . . 
        . . . f f f e e e e f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f 1 1 1 1 1 1 1 1 1 1 f . . 
        . . f e e f f f f f f e e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f f f 4 4 f f f e f f . 
        . f e e 4 f f d d f f 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 1 1 b b 1 1 f 4 e . . 
        . . 4 d f 1 1 1 b 1 1 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `)
    Idle.addAnimationFrame(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f e e f f f . . . . 
        . . . f f f e e e e f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f 1 1 1 1 1 1 1 1 1 1 f . . 
        . . f e e f f f f f f e e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f f f 4 4 f f f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 1 1 b b 1 1 f 4 e . . 
        . . 4 d f 1 1 1 b 1 1 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `)
    Idle.addAnimationFrame(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f e e f f f . . . . 
        . . . f f f e e e e f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f 1 1 1 1 1 1 1 1 1 1 f . . 
        . . f e e f f f f f f e e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 1 1 b b 1 1 f 4 e . . 
        . . 4 d f 1 1 1 b 1 1 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `)
    Idle.addAnimationFrame(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f e e f f f . . . . 
        . . . f f f e e e e f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f 1 1 1 1 1 1 1 1 1 1 f . . 
        . . f e e f f f f f f e e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 1 1 b b 1 1 f 4 e . . 
        . . 4 d f 1 1 1 b 1 1 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `)
    Idle.addAnimationFrame(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f e e f f f . . . . 
        . . . f f f e e e e f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f 1 1 1 1 1 1 1 1 1 1 f . . 
        . . f e e f f f f f f e e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 1 1 b b 1 1 f 4 e . . 
        . . 4 d f 1 1 1 b 1 1 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `)
    animation.setAction(Main_character, ActionKind.Idle)
    Walk_front = animation.createAnimation(ActionKind.Walk_front, 200)
    animation.attachAnimation(Main_character, Walk_front)
    Walk_front.addAnimationFrame(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f e e f f f . . . . 
        . . . f f f e e e e f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f 1 1 1 1 1 1 1 1 1 1 f . . 
        . . f e e f f f f f f e e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 1 1 b b 1 1 f 4 e . . 
        . . 4 d f 1 1 1 b 1 1 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `)
    Walk_front.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f f e e f f f . . . . 
        . . . f f f e e e e f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f 1 1 1 1 1 1 1 1 1 1 f . . 
        . f f e e f f f f f f e e f f . 
        . f f f f f e e e e f f f f f . 
        . . f e f b f 4 4 f b f e f . . 
        . . f e 4 1 f d d f 1 4 e f . . 
        . . . f e 4 d d d d 4 e f e . . 
        . . f e f 1 1 b b e d d 4 e . . 
        . . e 4 f 1 1 1 b e d d e . . . 
        . . . . f 4 4 5 5 f e e . . . . 
        . . . . f f f f f f f . . . . . 
        . . . . f f f . . . . . . . . . 
        `)
    Walk_front.addAnimationFrame(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f e e f f f . . . . 
        . . . f f f e e e e f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f 1 1 1 1 1 1 1 1 1 1 f . . 
        . . f e e f f f f f f e e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 1 1 b b 1 1 f 4 e . . 
        . . 4 d f 1 1 1 b 1 1 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `)
    Walk_front.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f f e e f f f . . . . 
        . . . f f f e e e e f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f 1 1 1 1 1 1 1 1 1 1 f . . 
        . f f e e f f f f f f e e f f . 
        . f f f f f e e e e f f f f f . 
        . . f e f b f 4 4 f b f e f . . 
        . . f e 4 1 f d d f 1 4 e f . . 
        . . e f e 4 d d d d 4 e f . . . 
        . . e 4 d d e b b 1 1 f e f . . 
        . . . e d d e 1 b 1 1 f 4 e . . 
        . . . . e e f 5 5 4 4 f . . . . 
        . . . . . f f f f f f f . . . . 
        . . . . . . . . . f f f . . . . 
        `)
    Walk_up = animation.createAnimation(ActionKind.Walk_up, 200)
    animation.attachAnimation(Main_character, Walk_up)
    Walk_up.addAnimationFrame(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f e e e e f f . . . . 
        . . . f e e e f f e e e f . . . 
        . . f f f f f 1 1 f f f f f . . 
        . . f f e 1 e 1 1 e 1 e f f . . 
        . . f e 1 f 1 f f 1 f 1 e f . . 
        . . f f f 1 1 e e 1 1 f f f . . 
        . f f e f 1 f e e f 1 f e f f . 
        . f e e f f e e e e f e e e f . 
        . . f e e e e e e e e e e f . . 
        . . . f e e e e e e e e f . . . 
        . . e 4 f f f f f f f f 4 e . . 
        . . 4 d f 1 1 1 1 1 1 f d 4 . . 
        . . 4 4 f 4 4 4 4 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `)
    Walk_up.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f e e e e f f . . . . 
        . . . f e e e f f e e e f . . . 
        . . . f f f f 1 1 f f f f . . . 
        . . f f e 1 e 1 1 e 1 e f f . . 
        . . f e 1 f 1 f f f 1 f e f . . 
        . . f f f 1 f e e 1 1 f f f . . 
        . . f e 1 f f e e 1 f e e f . . 
        . f f e f f e e e f e e e f f . 
        . f f e e e e e e e e e e f f . 
        . . . f e e e e e e e e f . . . 
        . . . e f f f f f f f f 4 e . . 
        . . . 4 f 1 1 1 1 1 e d d 4 . . 
        . . . e f f f f f f e e 4 . . . 
        . . . . f f f . . . . . . . . . 
        `)
    Walk_up.addAnimationFrame(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f e e e e f f . . . . 
        . . . f e e e f f e e e f . . . 
        . . f f f f f 1 1 f f f f f . . 
        . . f f e 1 e 1 1 e 1 e f f . . 
        . . f e 1 f 1 f f 1 f 1 e f . . 
        . . f f f 1 1 e e 1 1 f f f . . 
        . f f e f 1 f e e f 1 f e f f . 
        . f e e f f e e e e f e e e f . 
        . . f e e e e e e e e e e f . . 
        . . . f e e e e e e e e f . . . 
        . . e 4 f f f f f f f f 4 e . . 
        . . 4 d f 1 1 1 1 1 1 f d 4 . . 
        . . 4 4 f 4 4 4 4 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `)
    Walk_up.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f e e e e f f . . . . 
        . . . f e e e f f e e e f . . . 
        . . . f f f f 1 1 f f f f . . . 
        . . f f e 1 e 1 1 e 1 e f f . . 
        . . f e f 1 f f f 1 f 1 e f . . 
        . . f f f 1 1 e e f 1 f f f . . 
        . . f e e f 1 e e f f 1 e f . . 
        . f f e e e f e e e f f e f f . 
        . f f e e e e e e e e e e f f . 
        . . . f e e e e e e e e f . . . 
        . . e 4 f f f f f f f f e . . . 
        . . 4 d d e 1 1 1 1 1 f 4 . . . 
        . . . 4 e e f f f f f f e . . . 
        . . . . . . . . . f f f . . . . 
        `)
    Walk_right = animation.createAnimation(ActionKind.Walk_right, 200)
    animation.attachAnimation(Main_character, Walk_right)
    Walk_right.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f e f . . . 
        . . . f f e e e e f e e e f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f 1 1 1 1 1 1 1 f . 
        . . . f e e e e f f f f e e f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e 4 d d d d f . . . 
        . . . . 4 d d e 4 4 4 e f . . . 
        . . . . e d d e 1 1 1 1 f . . . 
        . . . . f e e f 4 4 5 5 f f . . 
        . . . . f f f f f f f f f f . . 
        . . . . . f f . . . f f f . . . 
        `)
    Walk_right.addAnimationFrame(img`
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f e f . . . 
        . . . f f e e e e f e e e f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f 1 1 1 1 1 1 1 f . 
        . . . f e e e e f f f f e e f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e 4 d d d d f . . . 
        . . . . f f e e 4 4 4 e f . . . 
        . . . . . 4 d d e 1 1 b f . . . 
        . . . . . e d d e 1 1 1 f . . . 
        . . . . . f e e f 4 5 5 f . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . . . f f f . . . . . . 
        `)
    Walk_right.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f e f . . . 
        . . . f f e e e e f e e e f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f 1 1 1 1 1 1 1 f . 
        . . . f e e e e f f f f e e f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e e e d d d f . . . 
        . . . . . f 4 d d e 4 e f . . . 
        . . . . . f e d d e 1 1 f . . . 
        . . . . f f f e e f 5 5 f f . . 
        . . . . f f f f f f f f f f . . 
        . . . . . f f . . . f f f . . . 
        `)
    Walk_right.addAnimationFrame(img`
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f e f . . . 
        . . . f f e e e e f e e e f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f 1 1 1 1 1 1 1 f . 
        . . . f e e e e f f f f e e f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e 4 d d d d f . . . 
        . . . . f f e e 4 4 4 e f . . . 
        . . . . . 4 d d e 1 1 b f . . . 
        . . . . . e d d e 1 1 1 f . . . 
        . . . . . f e e f 4 5 5 f . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . . . f f f . . . . . . 
        `)
    Walk_left = animation.createAnimation(ActionKind.Walk_left, 200)
    animation.attachAnimation(Main_character, Walk_left)
    Walk_left.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . f e f e e e e f f . . . . 
        . . f e e e f e e e e f f . . . 
        . . f e e e e f f e e e f . . . 
        . f 1 1 1 1 1 1 1 f f f f . . . 
        . f e e f f f f e e e e f . . . 
        . f f f e e e f f f f f f f . . 
        . f e e 4 4 f b e 4 4 e f f . . 
        . . f e d d f 1 4 d 4 e e f . . 
        . . . f d d d d 4 e e e f . . . 
        . . . f e 4 4 4 e d d 4 . . . . 
        . . . f 1 1 1 1 e d d e . . . . 
        . . f f 5 5 4 4 f e e f . . . . 
        . . f f f f f f f f f f . . . . 
        . . . f f f . . . f f . . . . . 
        `)
    Walk_left.addAnimationFrame(img`
        . . . . f f f f f f . . . . . . 
        . . . f e f e e e e f f . . . . 
        . . f e e e f e e e e f f . . . 
        . . f e e e e f f e e e f . . . 
        . f 1 1 1 1 1 1 1 f f f f . . . 
        . f e e f f f f e e e e f . . . 
        . f f f e e e f f f f f f f . . 
        . f e e 4 4 f b e 4 4 e f f . . 
        . . f e d d f 1 4 d 4 e e f . . 
        . . . f d d d d 4 e e e f . . . 
        . . . f e 4 4 4 e e f f . . . . 
        . . . f b 1 1 e d d 4 . . . . . 
        . . . f 1 1 1 e d d e . . . . . 
        . . . f 5 5 4 f e e f . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . . . . f f f . . . . . . . 
        `)
    Walk_left.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . f e f e e e e f f . . . . 
        . . f e e e f e e e e f f . . . 
        . . f e e e e f f e e e f . . . 
        . f 1 1 1 1 1 1 1 f f f f . . . 
        . f e e f f f f e e e e f . . . 
        . f f f e e e f f f f f f f . . 
        . f e e 4 4 f b e 4 4 e f f . . 
        . . f e d d f 1 4 d 4 e e f . . 
        . . . f d d d e e e e e f . . . 
        . . . f e 4 e d d 4 f . . . . . 
        . . . f 1 1 e d d e f . . . . . 
        . . f f 5 5 f e e f f f . . . . 
        . . f f f f f f f f f f . . . . 
        . . . f f f . . . f f . . . . . 
        `)
    Walk_left.addAnimationFrame(img`
        . . . . f f f f f f . . . . . . 
        . . . f e f e e e e f f . . . . 
        . . f e e e f e e e e f f . . . 
        . . f e e e e f f e e e f . . . 
        . f 1 1 1 1 1 1 1 f f f f . . . 
        . f e e f f f f e e e e f . . . 
        . f f f e e e f f f f f f f . . 
        . f e e 4 4 f b e 4 4 e f f . . 
        . . f e d d f 1 4 d 4 e e f . . 
        . . . f d d d d 4 e e e f . . . 
        . . . f e 4 4 4 e e f f . . . . 
        . . . f b 1 1 e d d 4 . . . . . 
        . . . f 1 1 1 e d d e . . . . . 
        . . . f 5 5 4 f e e f . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . . . . f f f . . . . . . . 
        `)
    Gamestarted = true
}
info.onScore(15, function () {
    tiles.setWallAt(tiles.getTileLocation(11, 1), false)
    sprites.destroy(Janitor, effects.disintegrate, 500)
    for (let Value of sprites.allOfKind(SpriteKind.NPC)) {
        sprites.destroy(Value)
    }
    game.showLongText("Thanks for the help young man. I will just put the trash in the dumpster outside the school", DialogLayout.Center)
    game.showLongText("Hey! You have completed your first activity and you have been rewarded with 15 points. ", DialogLayout.Center)
    game.showLongText("The goal of the game is to find 4 more NPCs to complete 4 more activity to win the Game. Have Fun!", DialogLayout.Center)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile3`, function (sprite, location) {
    Clearlevel()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile29`, function (sprite, location) {
    Clearlevel()
})
function Clearlevel () {
    for (let Value of sprites.allOfKind(SpriteKind.NPC)) {
        sprites.destroy(Value)
    }
    for (let Value of sprites.allOfKind(SpriteKind.Item)) {
        sprites.destroy(Value)
    }
    Level += 1
    Createlevel()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile14`, function (sprite, location) {
    Clearlevel()
})
let Gamestarted = false
let Walk_left: animation.Animation = null
let Walk_right: animation.Animation = null
let Walk_up: animation.Animation = null
let Walk_front: animation.Animation = null
let Idle: animation.Animation = null
let Main_character: Sprite = null
let Level = 0
let Janitor: Sprite = null
let Dialogue_mode = false
let Trash: Sprite = null
let Scene_2_school_out_side: Sprite = null
let Scene_2_school_inside: Sprite = null
let Scene_one_car: Sprite = null
let Scene_one_school: Sprite = null
story.queueStoryPart(function () {
    story.printCharacterText("Today is the last day of school", "You")
    effects.starField.startScreenEffect(500)
    scene.setBackgroundImage(img`
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999991111ddd9999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999991111111dddd99999999999999999999999999999999999999999999999999999999999
        9999999999999999999999dd999999999999999999999999999999999999999999999999999999999999999999111111111ddd9999999999999999999999999999999999999999999999999999999999
        999999999999999999911ddddd999999999999999999999999999999999999999999999999999999999999999111111111111dd999999999999999999999999999999999999999999999999999999999
        9999999999999999991111111dd9999999999999999999999999999999999999999999999999999999ddddddd111111111111dd999999999999999999999999999999999999999999999999999999999
        99999999999999999911111111d99999999999999999999999999999999999999999999999999999dddddddddd11111111111dd199999999999999999999999999999999999999999999999999999999
        99999999999999999111111111dd191ddd9999999999999999999999999999999999999999999999dd111111d1111111111111d111999999999999999999999999999999999999999999999999999999
        99999999999999999111111111dd11ddddddddd9999999999999999999999999999999999999999dd111111111111111111111111119ddd9999999999999999999999999999999999999999999999999
        99999999999999999111111111dd11111111ddddd99999999999999999999999999999999999991dd11111111111111111111111111dddddd99999999999999999999999999999999999999999999999
        999999991dddddddd1111111111d11111111ddddd1999999999999999999999999999999999999dd11111111111111111111111111dd111ddd9999999999999999999999999999999999999999999999
        9999999ddddddddddd1111111111111111111111111999999999999999999999999999999999991d11111111111111111111111111dd1111dd9999999999999999999999999999999999999999999999
        9999991dd11111111dd111111111111111111111111199999999999999999999999999999999dddd11111111dd11111111111111111111111dd999999999999999999999999999999999999999999999
        999999dd1111111111111111111111111111111111119999999999999999999999999999999ddd1dd111111dd111111111111111111111111dd999999999999999999999999999999999999999999999
        99999dd1111111111111111111111111111111111111999999999999999999999999999999ddd1111111111dd111111111111111111111111dd999999999999999999999999999999999999999999999
        99999dd1111111111111111111111dd1111111111111999999999999999999999999999999dd1111111111111111111111111111111111111dd999999999999999999999999999999999999999999999
        99999111111111111111111111111dd1111111111111999999999999999999999999999999d1111111111111111111111111111111111111dd9999999999999999999999999999999999999999999999
        999991111111111111111111111111dd1111111111b1999999999999999999999999999999d1111111111111111111111111111111111111dd9999999999999999999999999999999999999999999999
        999999111111111111111111111111dd11bbb111bbb999999999999999999999999999999911111111111111111111111111dd111111111dd99999999999999999999999911dddd99999999999999999
        999999111111111111111111111111ddbbbbbbbbbb9999999999999999999999999999999911111111111111111111111111dd111111111d1999999999999999999999911111ddddd999999999999999
        99999991bb1111111111bbb111111bbb99999119999999999999999999999999999999999991111111111111111111111111dd11111111111999999999999999999999111111111ddd99111119999999
        99999999bbbbbbbbbbbbbbbbbbbbbbb999999999999999999999999999999999999999999999bbbbbbbbbbb1111111111111dd111111111199999999999999999ddddd1111111111ddd1111dd1199999
        9999999991bbbbbbbbbb9991bbbbb19999999999999999999999999999999999999999999999bbbbbbbbbbbbb11111111111ddbbbbbbbbb99999999999999999ddddddddd11111111dd1111dddd19999
        999999999999999999999999911199999999999999999999999999999999999999999999999999999999999bbbb1111111bbdbbbbbbb99999999999999999991d111111dd11111111dd1111111dd9999
        99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999bbbbbbbbbbbb9999999999999999999d999991111111111111111111111111111dd9999
        9999999999999999999999999999999999999999999999999999999999ddddd99999999999999999999999999999bbbbb9999999999999999999dddddddddd1111111111111111111111111111dd1999
        999999999999999999999999999999999999999999999999dddddddddddddddddd9999999999999999999999999999999999999999999999999ddd11111ddddd11111111111111111111111111dd9999
        999999999999999999999999999999999999999999999911ddd111dddd111111dddd9999999999999999999999999999999999999999999999911111111111dd11111111111111111111111111dd9999
        999999999999999999999999999999999999ddddddddd1111111111dd111111111ddd999999999999999999999999999999999959999999999911111111111111111111111111111111111111dd19999
        99999999999999999999999999999999991dddddd1ddddd111111111111111111111dd119999999999999999999999999999999999999999999111111111111111111111111dd11111111111dd199999
        999999999999999999999999999999991111111111111dddd11111111111111111111d111111dd9999999999999999999999999999999999999111111111111111111111111dd11111111111d1199999
        99999999999999999999999999999991dd1111111111111dd11111111111111111111d111111dddd999999999999999999999999999999999999111111111111111111111ddddd111111111b19999999
        999999999999999999999999991ddddddddd1111111111111111111111111111111111111111111dd999999999999919999999999999999999999bbbbbbbbbbbbb111bbbbbbbbbbbbbbbbbbb99999999
        99999999999999999999999991111111111111111111111111111111111111dd1111111111111111dd99999999999999999999999999999999999bbb9999999bbbbbbbbbbbb99999999bbb9999999999
        99999999999999999999999991111111111111111111111111111111111111dd11111111111111111d999999999999999999999999999999999999999999999999999999999999999999999999999999
        999999999999999999999999111111111111111111111111111111111111111dd1111111111111111d999999999999999999999999999999999999999999999999999999999999999999999999999999
        999999999999999999999999911111111111111111111111111111111111111dd11111111111111111999999999999999999999999999999999999999999999999999999999999999999999999999999
        999999999999999999999999911111111111bbbbb1111dd1111bbbbbbbbbb11d111111111111111111999999999999999999999999999999999999999999999999999999999999999999999999999999
        999999999999999999999999991bbb111bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb119999999999999999999999999999999999999999999999999999999999999999999999999999999
        999999999999999999999999999bbbbbbbbb9999999bb9999999999999999999bbbbbbbbbbbbbbbb99999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999919999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        999c999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        99cc999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999993999999999999999993399999999999
        9999999999999999999999939999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999993339333399999999999999993393999ccc9c9
        99999c99999999999999933393999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999933333393399999999999993333339999c99cc
        9999cc93399999999993333333999999999999999999999999999999993399999999999999999999999999999999999999999999999999999999999999993335333999999999999933333b3399ccc99c
        99c9933333cc9999999333333399999999999999999999999999999993333399999999999999999999999999999999999999999999999999999999999993335553339999999999993333553339cc9999
        9cc93333333399999993335333339999999999999999cc99999ccc99933333399cc999999999999999999999999999999999cc999999999cc99999999993335533339999999999999335553339ccc999
        cc9c93353333cc999993355533399999cc9999999999cc99999999933355333999999999cc9cc999999cc99999999c999999cc9999c9999ccc99999999999333333999999c9999993333533c99ccccc9
        c99cc3555339cc99c93333533333c999cc99cc9999999999999999933353333999999999c999c99999999999c9999c999999999999c9999c9999999cccc93333333cc999ccc99999333333ccccccccc9
        9cc9333333399cc99933333333399999999cc999999c999999cc999333333399977777c9997777799cc99999cc99999c999c9cc9999cc99999ccc99cccc97333739cc9999cc999999333333cccccc999
        9ccc33333339cc99999933333399999cc99999999c9999999999999333333397777777799c7777799cc9999999c999cc99999999999cc9999999c999cc9977777799c9999cc999cc999979399cc9cc99
        ccccc977339ccc99997797777c99999cc99999999c9999999a99999939337777777777977c7777ddddd999cc9cc999c999cc99999969999999999999999977777999cc9999c999cc999777799cc9cc99
        cc997777799c979997779777799999999aa79c9977999777aa99777777777777777777c9977777ddddd7799c9aa997c999779c79996979cc977cc7aa9c9997779997cc9999c99999779777799cc9cc99
        c779777779777777979777777797c7796a7797c977797777aaaa777777777777777777c9977777ddddd77779a6a97777997797799969797c977c779a6c7797797777c77c77999c7a7aa777cc99cccc99
        9777977779777a7777c777797797c779aaa7777777777777777777777777777777777777777777ddddd777777aa777777777777777aa777777777aa7aa777777777777777777997a7a7779979c7797c9
        9779977777777aa777777777777777777777777777777777777777777777777777777777777777ddddd777777777777777777aa77777777777777aa77777777777777777777777777a777777cc7797c9
        777777777777777777dddddddddd77a7777777777777777777777777777777777777777777777dddddd777777777777777777aa777777777777777777777777777777777777777777777777777777777
        77777777777777dddddddddddddddda7777777777777777777777777777777777777777777777dddddd777777777aa77777777777777777777777777777777777777a777777777777777777777777777
        777777777777dddddddddddddddddddd77777777aa7777777777777777aaaa777777777dddddddddddd7777777777a77777777777777777777777777777777777777a777777777777777777777777777
        777777777ddddddddddddddddddddddddd777777aa7777777777777777a77777777777ddddddddddddd77777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777ddddddddddddddddddddddddddddd77777777777777777777777777777777dddddddddddddd7777777777777777777777777777777777777777777777777777777777777777777aa777777777
        7777777ddddddddddddddd77ddddddddddddd7777777777777777777777777777ddddddddddddddddd7777777777777777777777777aa777777777777777777777777777777777777777777777777777
        7777777ddddddddddddd777777dddddddddddddddddd7777777777777ddddddddddddddddddddddddd777777aa777777777777777777777777777777777aa77777777777777777777777777777777777
        7777777dddddddddddddd7777777ddddddddddddddddddd77777777dddddddddddddddddddddddddd7777777a77777777777777777777777777777777777777777777777777777777777777777777777
        777777adddddddddddddd7777aa777ddddddddddddddddddddddddddddddddddddddddddddddddddd7777777777777777777777a77777777777777777777777777777777777777777777777777777777
        777777adddddddddddddd77777777777dddddddddddddddddddddddddddddddddddddddddddddddd7777777777777777777777aa777777777777777777777777777777777aa777777777777777777777
        7777777dddddddddddddd777777777777ddddddddddddddddddddddddddddddddddddddddddd77777777777777777777777777777777777777777777777777777777777777a777777777777777777777
        7777777ddddddddddddddd7777777777777dddddddddddddddddddddddddddddddddddddddd7777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        77777777dddddddddddddd77777777777777dddddd7dddddddddddddddddddddddddddddddd777777777aa77777777777777777777777777777777777777777777777777777777777777777777777777
        77777777ddddddddddddddd7777777777777777777777777777dddddddddddddddddddddd777777777777b77777777777777777777777777777777777777777777777777777777777777777aa7777777
        77777777ddddddddddddddd777777777777777777777777777777777dddddddddddddd7777777777777777777777777777777777777777777aa777777777777777777777777777777777777777777777
        777777777dddddddddddddd777777777777777777aa777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        777777777dddddddddddddd777777777777777777a7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777ddddddddddddd7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a777777777777777777777777777777
        fffffffffffffffffffffdd77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffff55555555555555ffffffffff5555555555555555555fffffffffffffff5555555555555555555ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffff55555555555555ffffffffff5555555555555555555fffffffffffffff5555555555555555555fffffffffff5555555555555555555555ffffffffffffffff5555555555555555555555fffffff
        fffff55555555555555ffffffffff5555555555555555555fffffffffffffff5555555555555555555fffffffffff5555555555555555555555ffffffffffffffff5555555555555555555555fffffff
        fffff55555555555555ffffffffff5555555555555555555fffffffffffffff5555555555555555555fffffffffff5555555555555555555555ffffffffffffffff5555555555555555555555fffffff
        fffff55555555555555ffffffffff5555555555555555555fffffffffffffff5555555555555555555fffffffffff5555555555555555555555ffffffffffffffff5555555555555555555555fffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5555555555555555555555ffffffffffffffff5555555555555555555555fffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        `)
    Scene_one_school = sprites.create(img`
        ..............................
        ..............................
        ..............................
        ..............................
        ..............................
        ..............................
        ..............................
        ..............................
        ...cccccccccccccccccccccccc...
        ...cddddddddddddddddddddddc...
        ...cbbbbbbbbbbbbbbbbbbbbbbc...
        ...cbbbbbbbbbbbbbbbbbbbbbbc...
        ...cb19bb91bbbbbbbb91bb91bc...
        ...cb91bb19bbbbbbbb19bb19bc...
        ...cbbbbbbbbbbbbbbbbbbbbbbc...
        ...cb91bb19bbeeeebb19bb91bfc..
        ...cb19bb91bbeeeebb91bb19bfc..
        ...cbbebbbebbeeeebbebbbebb5c..
        ...cddeeeeeddccccddeeeeedd5c..
        ...cbbebbbebbddddbbebbbebb5c..
        `, SpriteKind.Scenery)
    scaling.scaleByPercent(Scene_one_school, 100, ScaleDirection.Uniformly, ScaleAnchor.Middle)
    Scene_one_school.setPosition(14, 57)
    story.spriteMoveToLocation(Scene_one_school, 80, 60, 50)
    Scene_one_car = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . 5 5 5 5 5 5 5 5 . . . . 
        . . . 5 c 5 5 5 5 5 5 4 5 . . . 
        . . 5 c c 5 5 5 5 5 5 4 c 5 . . 
        d 5 4 c c 5 4 4 4 4 4 4 c c 5 . 
        5 5 4 c b e e e e e e e 5 c 5 . 
        5 5 4 b e e b b b e b b e 5 5 . 
        5 5 5 5 e b b b b e b b b e 5 . 
        5 5 5 e 5 5 5 5 5 e 5 5 5 e e . 
        d d 5 e f e e e f e e e e e e . 
        d 5 e e e f e e f e e e e e e . 
        e e e e e e f f f e e e e e e . 
        e e e f f f e e e e f f f f e . 
        . e f f f f f e e f f f f f . . 
        . . f f f f . . . . f f f . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Scenery)
    Scene_one_car.setPosition(142, 102)
    story.spriteMoveToLocation(Scene_one_car, 23, 102, 50)
})
story.queueStoryPart(function () {
    tiles.destroySpritesOfKind(SpriteKind.Scenery)
    pause(200)
    Scene_2_school_inside = sprites.create(img`
        ..............................
        ..............................
        ..............................
        ..............................
        ..............................
        ..............................
        ..............................
        ..............................
        ...cccccccccccccccccccccccc...
        ...c...d11d.......d11d....c...
        ...c......................c...
        ...c2.1.1.1.111.111.1.1.1fc...
        ...cf.1.1.1.1.1.1.1.11....c...
        ...c..1.1.1.1.1.11..1.1...c...
        ...c7..1.1..111.1.1.1..1..c...
        ...c7......................c..
        ...c.......e.e.e.e.........c..
        ...ceee...eeeeeeee.........c..
        ...cdddddddddddddddddddddd.c..
        ...cbbbbbbbbbbbbbbbbbbbbbb.c..
        `, SpriteKind.Scenery)
    scaling.scaleByPercent(Scene_2_school_inside, 100, ScaleDirection.Uniformly, ScaleAnchor.Middle)
    Scene_2_school_out_side = sprites.create(img`
        ..............................
        ..............................
        ..............................
        ..............................
        ..............................
        ..............................
        ..............................
        ..............................
        ...cccccccccccccccccccccccc...
        ...cddddddddddddddddddddddc...
        ...cbbbbbbbbbbbbbbbbbbbbbbc...
        ...cbbbbbbbbbbbbbbbbbbbbbbc...
        ...cb19bb91bbbbbbbb91bb91bc...
        ...cb91bb19bbbbbbbb19bb19bc...
        ...cbbbbbbbbbbbbbbbbbbbbbbc...
        ...cb91bb19bbeeeebb19bb91bfc..
        ...cb19bb91bbeeeebb91bb19bfc..
        ...cbbebbbebbeeeebbebbbebb5c..
        ...cddeeeeeddccccddeeeeedd5c..
        ...cbbebbbebbddddbbebbbebb5c..
        `, SpriteKind.Scenery)
    scaling.scaleByPercent(Scene_2_school_out_side, 100, ScaleDirection.Uniformly, ScaleAnchor.Middle)
    story.spriteMoveToLocation(Scene_2_school_out_side, 200, 60, 40)
    story.printText("Meaning....... more WORK!", 0, 0)
    pause(5000)
    story.printText("But I can do it, plus this is the VERY last day of School. Right?", 80, 110)
})
story.queueStoryPart(function () {
    tiles.destroySpritesOfKind(SpriteKind.Scenery)
    Start_game()
})
game.onUpdate(function () {
    if (Gamestarted) {
        if (Main_character.vy > 0) {
            animation.setAction(Main_character, ActionKind.Walk_front)
        } else if (Main_character.vy < 0) {
            animation.setAction(Main_character, ActionKind.Walk_up)
        } else if (Main_character.vx > 0) {
            animation.setAction(Main_character, ActionKind.Walk_right)
        } else if (Main_character.vx < 0) {
            animation.setAction(Main_character, ActionKind.Walk_left)
        } else {
            animation.setAction(Main_character, ActionKind.Idle)
        }
    }
})
forever(function () {
    if (Dialogue_mode == false) {
        controller.moveSprite(Main_character)
    } else if (Dialogue_mode == true) {
        controller.moveSprite(Main_character, 0, 0)
    }
})
