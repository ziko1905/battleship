export function createGrids (firstPlyName, scndPlyName) {
    const leftDiv = document.createElement("div")
    const rightDiv = document.createElement("div")
    const leftGrid = new Grid()
    const rightGrid = new Grid()
    const leftName = document.createElement("p");
    const rightName = document.createElement("p");
    const leftContainer = new ShipContainer()
    const rightContainer = new ShipContainer()

    leftDiv.className = "playing-div"
    leftDiv.id = "left-playing-div"
    rightDiv.className = "playing-div"
    rightDiv.id = "right-playing-div"

    leftName.textContent = firstPlyName;
    rightName.textContent = scndPlyName;

    leftDiv.appendChild(leftGrid.getElement())
    leftDiv.appendChild(leftName)
    leftDiv.appendChild(leftContainer.getElement())
    rightDiv.appendChild(rightGrid.getElement())
    rightDiv.appendChild(rightName)
    rightDiv.appendChild(rightContainer.getElement())
    
    document.querySelector(".content").appendChild(leftDiv)
    document.querySelector(".content").appendChild(rightDiv)
}


class Grid {
    static SIZE = 10
    constructor () {
        this.mainDiv = document.createElement("div")
        this.mainDiv.className = "main-grid-div"
        this.mainDiv.setAttribute(`data-size`, Grid.SIZE)
        for (let m = 0; m < Grid.SIZE; m++) {
            for (let n = 0; n < Grid.SIZE; n++) {
                const cell = document.createElement("div")
                cell.className = "cell";
                this.mainDiv.appendChild(cell)
            }
        }
    }
    getElement () {
        return this.mainDiv
    }
}

class ShipContainer {
    constructor () {
        this.container = document.createElement("div")
        this.container.className = "ship-container"
    }
    getElement () {
        return this.container
    }
}

createGrids("Player", "Computer")