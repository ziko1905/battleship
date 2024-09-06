import "./styles.css";
import "./load.js"
import { leftGrid, rightGrid } from "./ui-controller.js"
import { Player } from "./logic.js";

export class Turn {
    constructor (ply1, ply2) {
        this.left = ply1;
        this.right = ply2;
        this.next = ply1;
    }

    isLeftTurn () {
        return this.next === this.left
    }

    getNext () {
        return this.next
    }

    getNextAttacked () {
        return this.next == this.left ? this.right : this.left
    }

    changeTurn () {
        this.next = this.next === this.left ? this.right : this.left
    }
}

const ply1 = {
    logic: new Player(),
    grid: leftGrid
}

const ply2 = {
    logic: new Player(),
    grid: rightGrid
}

const turn = new Turn(ply1, ply2)

// Predetermined ships values
const leftShips = [[0, 0, 5], [2, 2, 4, true], [8, 6, 3], [9, 6, 3], [5, 8, 2, true]]
const rightShips = [[0, 2, 2, true], [2, 0, 3, true], [6, 6, 3], [3, 2, 4], [9, 0, 5]]

for (let i = 0; i < 5; i++) {
    ply1.logic.board.place(...leftShips[i])
    ply1.grid.showShip(...leftShips[i])
}

for (let j = 0; j < 5; j++) {
    ply2.logic.board.place(...rightShips[j])
}

export function placeFromEvent (m, n, left) {
    if (turn.isLeftTurn() !== left) {
        try {
            const ply = turn.getNextAttacked()
            if (ply.logic.board.receiveAttack(m, n)) ply.grid.reviewShip(m, n)
            else {
                ply.grid.reviewEmpty(m, n)
                turn.changeTurn()
            }
        } catch (error) {
            console.log(error)
        }
    }
}