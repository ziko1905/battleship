import { placeFromEvent } from "."
import emptyUrl from "../media/cross.svg"
import PubSub from "pubsub-js";

export class GridController {
    static cellEvents = [];
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
    static clearGrid (specific) {
        const grid = specific || document.body
        grid.querySelectorAll(".cell").forEach((cell) => {
            cell.textContent = ""
            cell.className = "cell"
        })
    }
    static displayTurn () {
        const leftTitle = document.querySelector("#left-playing-div p")
        const rightTitle = document.querySelector("#right-playing-div p")
    
        leftTitle.classList.toggle("turn")
        rightTitle.classList.toggle("turn")
    }
    static addListenersToCells (computer=false) {
        let grid = document
        if (computer) grid = document.querySelector("#right-playing-div")
        grid.querySelectorAll(".cell").forEach((cell) => {
            // Last arguments represents witch cell was clicked, left or right side one
            // True for left
            const funct = () => placeFromEvent(+cell.getAttribute("data-row"), +cell.getAttribute("data-col"), document.getElementById("left-playing-div").contains(cell))
            GridController.cellEvents.push([cell, funct])
            cell.addEventListener("click", funct)
        })
    }
    static removeCellsListeners () {
        GridController.cellEvents.forEach((l) => l[0].removeEventListener("click", l[1]))
        GridController.cellEvents = []
    }
}

export class ShipContainerController {
    constructor (div, board, computer=false) {
        this.div = div
        this.container = div.querySelector(".ship-container")
        this.computer = computer
        this.ships = board.ships
        this.ships.sort((a, b) => b[2] - a[2])
        this.ships.forEach((ship) => {
            const shipElem = this.createShip(ship[2])
            this.container.appendChild(shipElem)
            PubSub.subscribe(ship[4].publish, () => {
                shipElem.remove()
            })
        })
        
    }
    createShip (length) {
        const ship = document.createElement("div");
        const size = getComputedStyle(this.div.querySelector(".cell")).height
        for (let n = 0; n < length; n++) {
            const block = document.createElement("div");
            block.style.height = size
            block.style.width = size

            ship.appendChild(block)
        }

        ship.className = "display-ship"
        return ship
    }
}



export const leftGrid = new GridController(document.querySelector("#left-playing-div .main-grid-div"))
export const rightGrid = new GridController(document.querySelector("#right-playing-div .main-grid-div"))

