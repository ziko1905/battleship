import { placeFromEvent } from "."
import emptyUrl from "../media/cross.svg"

document.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("click", () => {
        // Last arguments represents witch cell was clicked, left or right side one
        // True for left
        placeFromEvent(+cell.getAttribute("data-row"), +cell.getAttribute("data-col"), document.getElementById("left-playing-div").contains(cell))
    })
})

class GridController {
    constructor (selectedDiv) {
        this.div = selectedDiv
    }
    placeShip (m, n, length, vertical=false) {
        for (let i = 0; i < length; i++) {
            let cell
            if (vertical) cell = this.div.querySelector(`[data-row="${m+i}"][data-col="${n}"]`)
            else cell = this.div.querySelector(`[data-row="${m}"][data-col="${n+i}"]`)
        }
    }
    reviewEmpty (m, n) {
        const cell = this.div.querySelector(`[data-row="${m}"][data-col="${n}"]`)
        const emptyImg = document.createElement("img");

        emptyImg.src = emptyUrl

        cell.appendChild(emptyImg)
    }
    reviewShip (m, n) {
        const cell = this.div.querySelector(`[data-row="${m}"][data-col="${n}"]`)
        cell.classList.add("ship");
    }

}

export const leftGrid = new GridController(document.querySelector("#left-playing-div .main-grid-div"))
export const rightGrid = new GridController(document.querySelector("#right-playing-div .main-grid-div"))

