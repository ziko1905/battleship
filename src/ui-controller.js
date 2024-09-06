import { placeFromEvent } from "."
import emptyUrl from "../media/cross.svg"

document.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("click", () => {
        // Last arguments represents witch cell was clicked, left or right side one
        // True for left
        placeFromEvent(+cell.getAttribute("data-row"), +cell.getAttribute("data-col"), document.getElementById("left-playing-div").contains(cell))
    })
})

export function clearGrid (specific) {
    const grid = specific || document.body
    grid.querySelectorAll(".cell").forEach((cell) => {
        cell.textContent = ""
        cell.className = "cell"
    })
}

class GridController {
    constructor (selectedDiv) {
        this.div = selectedDiv
    }
    showShip (m, n, length, vertical=false) {
        for (let i = 0; i < length; i++) {
            let cell
            if (vertical) cell = this.div.querySelector(`[data-row="${m+i}"][data-col="${n}"]`)
            else cell = this.div.querySelector(`[data-row="${m}"][data-col="${n+i}"]`)
            cell.classList.add("ship");
        }
    }
    reviewEmpty (m, n) {
        const cell = this.div.querySelector(`[data-row="${m}"][data-col="${n}"]`)
        const emptyImg = document.createElement("img")

        emptyImg.src = emptyUrl

        cell.appendChild(emptyImg)
    }
    reviewShip (m, n) {
        const cell = this.div.querySelector(`[data-row="${m}"][data-col="${n}"]`)
        const shipImg = document.createElement("img")

        shipImg.src = emptyUrl

        cell.classList.add("ship")
        cell.appendChild(shipImg)
    }
}

export function displayTurn () {
    const leftTitle = document.querySelector("#left-playing-div p")
    const rightTitle = document.querySelector("#right-playing-div p")

    leftTitle.classList.toggle("turn")
    rightTitle.classList.toggle("turn")
}

export const leftGrid = new GridController(document.querySelector("#left-playing-div .main-grid-div"))
export const rightGrid = new GridController(document.querySelector("#right-playing-div .main-grid-div"))

