//the loop game :

import { setupBall, updateBall, ball } from "../ball.js"
import { getElementRects } from "../propertyfunctions.js"
import { moveComputerRacket, setupRackets } from "../racket.js"
const playerScoreElem = document.querySelector('[data-player-score]')
const computerScoreElem = document.querySelector('[data-computer-score]')
let playerScore = 0
let computerScore = 0

//function for initializing the game or reset 
function setupGame() {
    setupBall()
    setupRackets()
}
//creating an update loop 
let lastTime = null
function updateLoop(time) {
    if (lastTime === null) {

        lastTime = time


    }

    const delta = time - lastTime
    updateBall(delta)
    moveComputerRacket(delta)
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
    const ballRects = getElementRects(ball)
    return (ballRects.right >= window.innerWidth || ballRects.left <= 0)

}
function incrementScore() {
    const ballRects = getElementRects(ball)
    if (ballRects.right >= window.innerWidth) {
        computerScore++
        playerScoreElem.textContent = computerScore.toString()

    }
    if (ballRects.left <= window.innerWidth) {
        playerScore++
        playerScoreElem.textContent = playerScore.toString()

    }


}