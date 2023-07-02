function bright () {
    return Math.map(input.lightLevel(), 0, 255, 32, 255)
}
function digitsf () {
    return [
    images.createImage(`
        . # . . .
        # . # . .
        # . # . .
        # . # . .
        . # . . .
        `),
    images.createImage(`
        . # . . .
        # # . . .
        . # . . .
        . # . . .
        # # # . .
        `),
    images.createImage(`
        # # . . .
        . . # . .
        . # # . .
        # . . . .
        # # # . .
        `),
    images.createImage(`
        # # . . .
        . . # . .
        . # . . .
        . . # . .
        # # . . .
        `),
    images.createImage(`
        # . # . .
        # . # . .
        # # # # .
        . . # . .
        . . # . .
        `),
    images.createImage(`
        # # # . .
        # . . . .
        # # . . .
        . . # . .
        # # . . .
        `),
    images.createImage(`
        . # . . .
        # . . . .
        # # . . .
        # . # . .
        . # . . .
        `),
    images.createImage(`
        # # # . .
        . . # . .
        . # . . .
        . # . . .
        . # . . .
        `),
    images.createImage(`
        . # . . .
        # . # . .
        . # . . .
        # . # . .
        . # . . .
        `),
    images.createImage(`
        . # . . .
        # . # . .
        . # # . .
        . . # . .
        . # . . .
        `)
    ]
}
function activity () {
    timeanddate.numericTime(function (hour, minute, second, month, day, year) {
        col = hour
    })
    if (col <= 7) {
        return "Sleep"
    } else if (col <= 8) {
        return "School"
    } else if (col <= 15) {
        return "Homework"
    } else if (col <= 19) {
        return "Pyjamas"
    }
    return "Sleep!" + col
}
function showDoing () {
    if (false) {
        showDigits(hhmm())
        basic.pause(1000)
        scrollbit.clear()
        scrollbit.drawText(
        doing,
        0,
        0,
        bright()
        )
        scrollbit.show()
        basic.pause(1000)
        scrollbit.clear()
        scrollbit.show()
    } else {
        scrolly("" + timeanddate.time(timeanddate.TimeFormat.HHMM24hr) + "-" + doing)
    }
}
timeanddate.onMinuteChanged(function () {
    if (!(input.logoIsPressed())) {
        basic.showIcon(IconNames.Sword)
        newdo = activity()
        if (newdo == doing) {
            showDigits(hhmm())
            basic.pause(1000)
            scrollbit.clear()
            scrollbit.show()
        } else {
            doing = newdo
            music.play(music.createSoundExpression(WaveShape.Sine, 5000, 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            showDoing()
        }
        basic.clearScreen()
    }
})
function hhmm () {
    bits = timeanddate.time(timeanddate.TimeFormat.HHMM24hr).split(":")
    t = ""
    for (let value of bits) {
        t = "" + t + value
    }
    return timeanddate.time(timeanddate.TimeFormat.HHMM24hr)
}
function showDigits (text: string) {
    scrollbit.clear()
    col = 0
    for (let index = 0; index <= text.length - 1; index++) {
        char = text.charAt(index)
        if (char == ":") {
            width = 2
            glyph = images.createImage(`
                . . . . .
                # . . . .
                . . . . .
                # . . . .
                . . . . .
                `)
        } else {
            width = 4
            glyph = digits[parseFloat(char)]
        }
        scrollbit.setImage(
        glyph,
        col,
        0,
        bright()
        )
        col += width
    }
    scrollbit.show()
}
function scrolly (text: string) {
    brightness = bright()
    col = 4 + scrollbit.cols() + 5 * text.length
    for (let index = 0; index <= col; index++) {
        scrollbit.clear()
        scrollbit.drawText(
        text,
        scrollbit.cols() - index,
        0,
        brightness
        )
        scrollbit.show()
        basic.pause(150)
    }
    scrollbit.clear()
    scrollbit.show()
}
input.onSound(DetectedSound.Quiet, function () {
    basic.showIcon(IconNames.EighthNote)
    showDoing()
    basic.clearScreen()
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (1 == bump) {
        basic.showLeds(`
            . . # . .
            . # . # .
            # . . . #
            . . # . .
            . # . # .
            `)
    } else {
        basic.showLeds(`
            . # . # .
            . . # . .
            # . . . #
            . # . # .
            . . # . .
            `)
    }
    while (input.logoIsPressed()) {
        if (input.buttonIsPressed(Button.A)) {
            timeanddate.advanceBy(bump, timeanddate.TimeUnit.Hours)
        } else if (input.buttonIsPressed(Button.B)) {
            timeanddate.advanceBy(bump, timeanddate.TimeUnit.Minutes)
        }
        showDigits(hhmm())
        basic.pause(200)
    }
    bump = 0 - bump
    basic.clearScreen()
    scrollbit.clear()
    scrollbit.show()
})
let brightness = 0
let glyph: Image = null
let width = 0
let char = ""
let t = ""
let bits: string[] = []
let newdo = ""
let col = 0
let bump = 0
let doing = ""
let digits: Image[] = []
digits = digitsf()
doing = activity()
bump = 1
