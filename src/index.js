import "./styles.css";
import PubSub from "pubsub-js";
import "./load.js"
import { displayTurn, leftGrid, rightGrid } from "./ui-controller.js"
import { Player } from "./logic.js";
import { ErrorMessage } from "./load.js";

const WINNING_CHANNEL = "win"

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
        displayTurn()
        this.next = this.next === this.left ? this.right : this.left
    }
}

const ply1 = {
    logic: new Player(),
    grid: leftGrid,
    name: "Player",
}

const ply2 = {
    logic: new Player(),
    grid: rightGrid,
    name: "Computer",
}

const turn = new Turn(ply1, ply2)

// Predetermined ships values
const leftShips = [[0, 0, 5], [2, 2, 4, true], [8, 6, 3], [9, 6, 3], [5, 8, 2, true]]

for (let i = 0; i < 5; i++) {
    ply1.logic.board.place(...leftShips[i])
    ply1.grid.showShip(...leftShips[i])
}

ply2.logic.placeShips()
ply2.logic.board.getAllShips().forEach((ship) => ply2.grid.showShip(...ship))

export function placeFromEvent (m, n, left) {
    if (turn.isLeftTurn() !== left) {
        try {
            const ply = turn.getNextAttacked()
            if (ply.logic.board.receiveAttack(m, n)) {
                ply.grid.reviewShip(m, n)
                if (ply.logic.board.areAllSunk()) PubSub.publish(WINNING_CHANNEL, turn.getNext())
            }
            else {
                ply.grid.reviewEmpty(m, n)
                turn.changeTurn()
            }
        } catch (errorMsg) {
            const error = new ErrorMessage(errorMsg)
            error.show()
            setTimeout(() => error.remove(), 3000)
        }
    }
}

function declareWinner (winner) {
    
}