import "./styles.css";
import PubSub from "pubsub-js";
import "./load.js"
import { clearGrid, displayTurn, leftGrid, rightGrid } from "./ui-controller.js"
import { Player } from "./logic.js";
import { ErrorMessage, WinningMessage } from "./load.js";

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

let ply1;
let ply2;
let turn;

function play() {
    clearGrid()
    ply1 = {
        logic: new Player(),
        grid: leftGrid,
        name: "Player",
    }
    
    ply2 = {
        logic: new Player(),
        grid: rightGrid,
        name: "Computer",
    }

    turn = new Turn(ply1, ply2)

    ply1.logic.placeShips()
    ply1.logic.board.getAllShips().forEach((ship) => ply1.grid.showShip(...ship))

    ply2.logic.placeShips()
}

play()

export function placeFromEvent (m, n, left) {
    if (turn.isLeftTurn() !== left) {
        try {
            const ply = turn.getNextAttacked()
            if (ply.logic.board.receiveAttack(m, n)) {
                ply.grid.reviewShip(m, n)
                if (ply.logic.board.areAllSunk()) {
                    PubSub.publish(WINNING_CHANNEL, {winnerName: turn.getNext().name, winnerShipNumber: turn.getNext().logic.board.aliveShips})
                }
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

function declareWinner (msg, data) {
    WinningMessage.create(data.winnerName, data.winnerShipNumber, () => play())
}

PubSub.subscribe(WINNING_CHANNEL, declareWinner)