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
function mkTies (quant: number) {
    for (let index = 0; index < quant; index++) {
        nuTie = game.createSprite(randint(0, 4), 0)
        nuTie.turn(Direction.Right, 90)
        Ties.push(nuTie)
    }
}
input.onButtonPressed(Button.B, function () {
    xloc += 1
    if (xloc > 4) {
        xloc = 4
    }
    xwing.set(LedSpriteProperty.X, xloc)
})
function killTie (tie: game.LedSprite) {
    blah = Ties.removeAt(Ties.indexOf(tie))
    blah.delete()
    basic.pause(randint(200, 600))
    mkTies(1)
}
let blah: game.LedSprite = null
let nuTie: game.LedSprite = null
let torp: game.LedSprite = null
let Ties: game.LedSprite[] = []
let xwing: game.LedSprite = null
let xloc = 0
xloc = 2
xwing = game.createSprite(xloc, 4)
Ties = []
let tcount = 1
basic.pause(1000)
mkTies(tcount)
doTorp()
game.setLife(10)
basic.forever(function () {
    for (let value of Ties) {
        value.move(1)
        basic.pause(200)
        if (4 == value.get(LedSpriteProperty.Y)) {
            killTie(value)
        }
    }
})
