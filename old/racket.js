import { getCustomPropertyValue, setCustomProperty } from "./propertyfunctions.js"
const SPEED = 0.02
const playerRacket = document.querySelector('[data-player-racket]')
const computerRacket = document.querySelector('[data-computer-racket]')
const ball = document.querySelector('[data-ball]')

export function setupRackets() {
    setCustomProperty(playerRacket, "--position", 50)
    setCustomProperty(computerRacket, "--position", 50)
    movePlayerRacket()
}

function movePlayerRacket() {
    document.addEventListener('mousemove', (e) => {
        setCustomProperty(playerRacket, "--position", (e.y / window.innerHeight) * 100)
    })


}
export function moveComputerRacket(delta) {
    const modif = SPEED * delta * (getCustomPropertyValue(ball, "--y") - getCustomPropertyValue(computerRacket, "--position"))
    setCustomProperty(computerRacket, "--position", getCustomPropertyValue(computerRacket, "--position") + modif)

}
