class GridController {
    constructor (selectedDiv) {
        this.div = selectedDiv
    }
    placeShip (m, n, length, vertical=false) {
        for (let i = 0; i < length; i++) {
            let cell
            if (vertical) cell = this.div.querySelector(`[data-row="${m+i}"][data-col="${n}"]`)
            else cell = this.div.querySelector(`[data-row="${m}"][data-col="${n+i}"]`)
            cell.classList.add("ship")
        }
    }
}

const leftGrid = new GridController(document.querySelector("#left-playing-div .main-grid-div"))
const rightGrid = new GridController(document.querySelector("#right-playing-div .main-grid-div"))

