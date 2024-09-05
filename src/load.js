export function createGrids () {
    const gridsDiv = document.createElement("div")
    const leftGrid = new Grid()
    const rightGrid = new Grid()

    gridsDiv.appendChild(leftGrid)
    gridsDiv.appendChild(rightGrid)
    
    document.querySelector(".content").appendChild(gridsDiv)
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
        return this.mainDiv
    }
}

createGrids()