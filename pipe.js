
const hole_height = 300
const pipe_width = 120
let pipes = []
let timeSinceLastPipe
const pipe_interval = 1500
const pipe_speed = 0.75
let passedPipeCount

export function setupPipes() {
    document.documentElement.style.setProperty('--pipe-width', pipe_width)
    document.documentElement.style.setProperty('--hole-height', hole_height)
    pipes.forEach(pipe => pipe.remove())
    timeSinceLastPipe = pipe_interval
    passedPipeCount = 0
}

export function updatePipes(delta) {
    timeSinceLastPipe += delta

    if(timeSinceLastPipe > pipe_interval) {
        timeSinceLastPipe -= pipe_interval
        createPipe()
    }

    pipes.forEach(pipe => {
        if(pipe.left + pipe_width < 0) {
            passedPipeCount++
            return pipe.remove()
        }
        pipe.left = pipe.left - delta * pipe_speed
    })
}

export function getPassedPipesCount() {
    return passedPipeCount
}

export function getPipesRects() {
     return pipes.flatMap(pipe => pipe.rects())
}

function createPipe() {
    const pipeElem = document.createElement('div')
    const topElem = createPipeSegment('top')
    const bottomElem = createPipeSegment('bottom')
    pipeElem.append(topElem)
    pipeElem.append(bottomElem)
    pipeElem.classList.add('pipe')
    pipeElem.style.setProperty(
        '--hole-top', 
        randomNumberBetween(hole_height * 1.5, window.innerHeight - hole_height * 0.5
        )
    )
    const pipe = {
        get left() {
            return parseFloat(getComputedStyle(pipeElem).getPropertyValue
            ('--pipe-left'))
        },
        set left(value) {
            pipeElem.style.setProperty('--pipe-left', value)
        },
        remove() {
            pipes = pipes.filter(p => p !== pipe)
            pipeElem.remove()
        },
        rects() {
            return [
                topElem.getBoundingClientRect(),
                bottomElem.getBoundingClientRect()
            ]
        }
    }
    pipe.left = window.innerWidth
    document.body.append(pipeElem)
    pipes.push(pipe)
}

function createPipeSegment(position) {
    const segment = document.createElement('div')
    segment.classList.add('segment', position)
    return segment
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}