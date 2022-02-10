import { getCustomPropertyValue, getElementRects, setCustomProperty } from "./propertyfunctions.js"
const INIT_VELOCITY = 0.01
const VELOCITY_INCR = 0.00001
export const ball = document.querySelector('[data-ball]')


let direction
let velocity

export function setupBall() {

    setCustomProperty(ball, "--y", 50)
    setCustomProperty(ball, "--x", 50)
    direction = { x: 0, y: 0 }
    //creating a path for the ball
    while (Math.abs(direction.x) <= .2 || Math.abs(getCustomPropertyValue(ball, direction.y)) >= .9) {
        const pathdirection = randomNumberBetween(0, 2 * Math.PI)

        direction = { x: Math.cos(pathdirection), y: Math.sin(pathdirection) }

    }
    velocity = INIT_VELOCITY
}



export function updateBall(delta) {
    //updating the path direction with the velocity and delta
    setCustomProperty(ball, "--x", getCustomPropertyValue(ball, "--x") + (direction.x * delta * velocity))
    setCustomProperty(ball, "--y", getCustomPropertyValue(ball, "--y") + (direction.y * delta * velocity))
    const ballRects = getElementRects(ball)
    const racketElemsRects = getRacketRects()
    velocity += VELOCITY_INCR * delta

    if (ballRects.bottom >= window.innerHeight || ballRects.top <= 0) {
        direction.y *= -1

    }
    if (racketElemsRects.some((racket) => isCollision(racket, ballRects)))
        direction.x *= -1

}
function randomNumberBetween(min, max) {
    return Math.random() * (max - min) + min
}
function isCollision(rect1, rect2) {
    return (rect1.left < rect2.right && rect1.top < rect2.bottom
        && rect1.right > rect2.left && rect1.bottom > rect2.top)
}
function getRacketRects() {
    return [...document.querySelectorAll('.paddle')].map(racket => racket.getBoundingClientRect())
}