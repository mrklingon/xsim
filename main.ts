function doDroid (x: number) {
    xwing.set(LedSpriteProperty.X, x)
    xloc = x
    doTorp()
}
input.onButtonPressed(Button.A, function () {
    xloc += -1
    if (xloc < 0) {
        xloc = 0
    }
    xwing.set(LedSpriteProperty.X, xloc)
})
function doTorp () {
    torp = game.createSprite(xloc, 4)
    for (let value of Ties) {
        if (value.get(LedSpriteProperty.Y) < 4 && value.get(LedSpriteProperty.X) == xloc) {
            killTie(value)
            game.addScore(randint(2, 7))
        }
    }
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
    for (let index = 0; index < quant - Ties.length; index++) {
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
input.onGesture(Gesture.Shake, function () {
    droid += 1
    music.playTone(131, music.beat(BeatFraction.Whole))
    if (droid > 1) {
        droid = 0
    }
})
function killTie (tie: game.LedSprite) {
    if (Ties.length > 0) {
        blah = Ties.removeAt(Ties.indexOf(tie))
        blah.delete()
        basic.pause(randint(200, 600))
        mkTies(tcount)
    }
}
let blah: game.LedSprite = null
let nuTie: game.LedSprite = null
let torp: game.LedSprite = null
let tcount = 0
let Ties: game.LedSprite[] = []
let xwing: game.LedSprite = null
let xloc = 0
let droid = 0
basic.showString("X-Sim!")
images.createBigImage(`
    . . # # # . # . . .
    . . . # . . . . . #
    # # # # # . . . . .
    . . . # . . . . . .
    . . # # # . . # . .
    `).scrollImage(1, 200)
images.createBigImage(`
    . . . . . . . . . .
    . . . . . . . . . .
    . . . . . . . . . .
    . . . . . . . . . .
    . . . . . . . . . .
    `).scrollImage(1, 200)
droid = 0
let wait = 4000
xloc = 2
xwing = game.createSprite(xloc, 4)
Ties = []
tcount = 1
basic.pause(1000)
mkTies(tcount)
doTorp()
game.setLife(3)
basic.forever(function () {
    for (let value of Ties) {
        value.move(1)
        basic.pause(333)
        if (value.isTouching(xwing)) {
            game.removeLife(1)
        }
        if (4 == value.get(LedSpriteProperty.Y)) {
            killTie(value)
        }
    }
})
basic.forever(function () {
    if (droid == 1) {
        for (let index = 0; index <= 4; index++) {
            doDroid(index)
        }
    }
})
basic.forever(function () {
    if (game.isGameOver()) {
        droid = 0
    }
})
basic.forever(function () {
    basic.pause(wait / tcount)
    tcount += 1
    if (tcount > 4) {
        tcount = 4
    }
})
