input.onButtonPressed(Button.A, function () {
    xloc += -1
    if (xloc < 0) {
        xloc = 0
    }
    xwing.set(LedSpriteProperty.X, xloc)
})
function doTorp () {
    torp = game.createSprite(xloc, 4)
    torp.turn(Direction.Left, 90)
    for (let index = 0; index < 4; index++) {
        torp.move(1)
        basic.pause(100)
    }
    torp.delete()
}
input.onButtonPressed(Button.AB, function () {
    doTorp()
})
input.onButtonPressed(Button.B, function () {
    xloc += 1
    if (xloc > 4) {
        xloc = 4
    }
    xwing.set(LedSpriteProperty.X, xloc)
})
let torp: game.LedSprite = null
let xwing: game.LedSprite = null
let xloc = 0
xloc = 2
xwing = game.createSprite(xloc, 4)
