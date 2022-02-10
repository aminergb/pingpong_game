import { getCustomPropertyValue, setCustomProperty } from "../utils/propertyfunctions.js"
import { isCollision, randomNumberBetween } from "../utils/utils.js"

const INIT_VELOCITY = 0.01
const VELOCITY_INCR = 0.00001
export default class Ball {
    //everything we put inside the constructor will be considered as a property of the object :
    //example : this.ballElem 
    //if we have a function inside the constructor , everything declared inside that function will also be considered as a prop of the object
    constructor(ballElem) {
        this.ballElem = ballElem
        this.reset()
    }

    get y() {
        return getCustomPropertyValue(this.ballElem, "--y")
    }
    set y(value) {
        setCustomProperty(this.ballElem, "--y", value)
    }
    get x() {
        return getCustomPropertyValue(this.ballElem, "--x")
    }
    set x(value) {
        setCustomProperty(this.ballElem, "--x", value)
    }
    reset() {
        this.x = 50
        this.y = 50
        this.direction = { x: 0 }
        while (
            Math.abs(this.direction.x) <= 0.2 ||
            Math.abs(this.direction.x) >= 0.9
        ) {
            const heading = randomNumberBetween(0, 2 * Math.PI)
            this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
        }
        this.velocity = INIT_VELOCITY
    }
    rect() {
        return this.ballElem.getBoundingClientRect()
    }
    update(delta, paddleRects) {
        this.x += this.direction.x * this.velocity * delta
        this.y += this.direction.y * this.velocity * delta
        this.velocity += VELOCITY_INCR * delta
        console.log(this.x)
        const rect = this.rect()

        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            this.direction.y *= -1
        }

        if (paddleRects.some(r => isCollision(r, rect))) {
            this.direction.x *= -1
        }
    }

}