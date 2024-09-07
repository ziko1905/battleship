import "./styles.css";
import PubSub from "pubsub-js";
import "./load.js"
import { GridController, ShipContainerController, leftGrid, rightGrid } from "./ui-controller.js"
import { ComputerPly, Player } from "./logic.js";
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
        GridController.displayTurn()
        if (this.next === this.left) {
            this.next = this.right
            computerPlay()
        } else this.next = this.left
    }

    isComputerPlaying () {
        return (this.right.logic instanceof ComputerPly)
    }
}

let ply1;
let ply2;
let turn;

function play() {
    GridController.clearGrid()
    ply1 = {
        logic: new Player(),
        grid: leftGrid,
        name: "Player",
    }
    ply2 = {
        logic: new ComputerPly(),
        grid: rightGrid,
        name: "Computer",
    }
    
    turn = new Turn(ply1, ply2)
    ply1.container = new ShipContainerController(document.querySelector("#left-playing-div"), ply1.logic.board)
    ply2.container = new ShipContainerController(document.querySelector("#right-playing-div"), ply2.logic.board, turn.isComputerPlaying())


    GridController.removeCellsListeners()
    GridController.addListenersToCells(turn.isComputerPlaying())
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
            error.show(2000)
        }
    } else if (!turn.isComputerPlaying()) {
        const wrongGrid = new ErrorMessage("Please select one cell of opponents grid")
        wrongGrid.show(2000)

    }
}

async function computerPlay () {
    while (!turn.isLeftTurn()) {
        const nextAttack = turn.getNext().logic.guessRandom()
        await new Promise(resolve => setTimeout(resolve, 1000))
        placeFromEvent(nextAttack[0], nextAttack[1], true)
    }
}

function declareWinner (msg, data) {
    WinningMessage.create(data.winnerName, data.winnerShipNumber, () => play())
}

export function randomize () {
    GridController.clearGrid(document.querySelector("#left-playing-div"))
    ply1 = {
        logic: new Player(),
        grid: leftGrid,
        name: "Player",
    }
    turn = new Turn(ply1, ply2);

    ply1.container = new ShipContainerController(document.querySelector("#left-playing-div"), ply1.logic.board, false, true)

    ply1.logic.placeShips()
    ply1.logic.board.getAllShips().forEach((ship) => ply1.grid.showShip(...ship))
}

PubSub.subscribe(WINNING_CHANNEL, declareWinner)