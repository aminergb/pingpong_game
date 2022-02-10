import { getCustomPropertyValue, setCustomProperty } from "../utils/propertyfunctions.js"

const SPEED = 0.02
export default class RacketPlayer {
    #score
    #racketElem
    constructor(racketElem) {
        this.#racketElem = racketElem
        this.#score = 0
        this.reset()

    }
    get racketElem() {

        return this.#racketElem
    }

    get score() {
        return this.#score
    }
    set score(score) {
        this.#score = score
    }
    get position() {
        return getCustomPropertyValue(this.racketElem, "--position")

    }
    set position(value) {
        setCustomProperty(this.racketElem, "--position", value)
    }
    get rect() {
        return this.racketElem.getBoundingClientRect()
    }

    reset() {
        this.position = 50
    }
    updatePositionWithBall(delta, ballHeight) {
        this.position += SPEED * delta * (ballHeight - this.position)
    }

}