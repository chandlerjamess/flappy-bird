
const birdElem = document.querySelector('[data-bird]')
const bird_speed = 0.5
const jumpDuration = 125
let timeSinceLastJump = Number.POSITIVE_INFINITY

export function setupBird() {
    setTop(window.innerHeight / 2)
    document.removeEventListener('keydown', handleJump)
    document.addEventListener('keydown', handleJump)
}

export function updateBird(delta) {
    if(timeSinceLastJump < jumpDuration) {
        setTop(getTop() - bird_speed * delta)
    } else {
        setTop(getTop() + bird_speed * delta)
    }

    timeSinceLastJump += delta
}

export function getbirdRect() {
    return birdElem.getBoundingClientRect()
}

function setTop(top) {
    birdElem.style.setProperty('--bird-top', top)
}

function getTop() {
    return parseFloat(getComputedStyle(birdElem).getPropertyValue
    ('--bird-top'))
}

function handleJump(e) {
    if(e.code !== 'Space') return

    timeSinceLastJump = 0
}