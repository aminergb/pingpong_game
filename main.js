//the loop game :

import Ball from "./classes/classBall.js"
import RacketPlayer from "./classes/classRacket.js"
import { movePlayerWithMouse } from "./utils/utils.js"
//getting elements :
const ball = new Ball(document.querySelector('[data-ball]'))
const playerRacket = new RacketPlayer(document.querySelector('[data-player-racket]'))
const computerRacket = new RacketPlayer(document.querySelector('[data-computer-racket]'))
const playerScoreElem = document.querySelector('[data-player-score]')
const computerScoreElem = document.querySelector('[data-computer-score]')


//function for initializing the game or reset 
function setupGame() {
    ball.reset()
    playerRacket.reset()
    computerRacket.reset()
}
//creating an update loop 
let lastTime = null
function updateLoop(time) {
    if (lastTime === null) {
        lastTime = time

    }

    const delta = time - lastTime
    ball.update(delta, [playerRacket.rect, computerRacket.rect])
    computerRacket.updatePositionWithBall(delta, ball.y)
    movePlayerWithMouse(playerRacket)
    lastTime = time
    if (isLose()) {
        incrementScore()
        setupGame()


    }
    window.requestAnimationFrame(updateLoop)
}
//the start of all

setupGame()

window.requestAnimationFrame(updateLoop)

function isLose() {
    const ballRects = ball.rect()
    return (ballRects.right >= window.innerWidth || ballRects.left <= 0)

}
function incrementScore() {
    const ballRects = ball.rect()
    if (ballRects.right >= window.innerWidth) {
        playerRacket.score++
        playerScoreElem.textContent = playerRacket.score.toString()

    }
    if (ballRects.left <= window.innerWidth) {
        computerRacket.score++
        computerScoreElem.textContent = computerRacket.score.toString()

    }


}