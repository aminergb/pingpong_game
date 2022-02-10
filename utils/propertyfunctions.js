export function getCustomPropertyValue(elem, property) {
    return parseFloat(getComputedStyle(elem).getPropertyValue(property)) || 0
}
export function setCustomProperty(elem, property, value) {
    elem.style.setProperty(property, value)
}
export function incrementCustomProperty(elem, prop, inc) {
    setCustomProperty(elem, prop, getCustomPropertyValue(elem, prop) + inc)
}
export function getElementRects(elem) {
    return elem.getBoundingClientRect()
}