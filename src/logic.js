import PubSub from "pubsub-js";

export class Ship {
    constructor (length, publish) {
        this.length = length;
        this.hp = length;
        this.publish = publish;
    }
    hit () {
        if (!this.hp) throw new Error("Ship already sank");
        this.hp--
        if (!this.hp) {
            PubSub.publishSync(this.publish)
        }
    }
    isSunk () {
        return (!this.hp)
    }
}

export class GameBoard {
    static #shipId = 0;
    static #BOARD_SIZE = 10
    constructor () {
        // Board represented as m * n grid
        this.aliveShips = 0;
        for (let m = 0; m < GameBoard.#BOARD_SIZE; m++) {
            this[m] = {}
            for (let n = 0; n < GameBoard.#BOARD_SIZE; n++) { 
                this[m][n] = new BoardCell()
            }
        }
    }
    place (m, n, length) {
        this.checkPlace(m, n)
        this.checkLength(n, length)
        let _cells = []
        const pubSubChannel = `board-channel-${GameBoard.#shipId++}`;
        const newShip = new Ship(length, pubSubChannel)
        this.token = PubSub.subscribe(pubSubChannel, () => this.sinkAnother())
        try {
            for (let i = 0; i < length; i++) {
                this.checkPlace(m, n+i)
                this[m][n+i].makeShip(newShip)
                _cells.push(this[m][n+i])
            }
            this.aliveShips++
        } catch (error) {
            _cells.forEach((cell) => cell.unmakeShip())
            throw error
        }
    }
    isShip (m, n) {
        return this[m][n].isShip()
    }
    checkPlace (m, n) {
        if ((m < 0 || m > GameBoard.#BOARD_SIZE - 1) || (n < 0 || n > GameBoard.#BOARD_SIZE - 1)) throw new Error("Wrong ship coordinates") 
        else if (this[m][n].isShip()) throw new Error("Cell already occupied")
    }
    checkLength (n, length) {
        if (length < 1 || n + length - 1 > GameBoard.#BOARD_SIZE) throw new Error("Wrong ship length")
    }
    receiveAttack (m, n) {
        if (this[m][n].isChecked()) throw new Error("Cell already checked")
        this[m][n].check()
        if (this[m][n].isShip()) this[m][n].ship.hit()
        return this.isShip(m, n)
    }
    areAllSunk () {
        return !this.aliveShips
    }
    sinkAnother () {
        this.aliveShips--
    }
}

class BoardCell{
    constructor () {
        this.checked = false
        this.ship = false
    }
    makeShip (shipObj) {
        this.ship = shipObj
    }
    unmakeShip () {
        this.ship = false
    }
    isShip () {
        return !!this.ship
    }
    isChecked () {
        return this.checked
    }
    check () {
        this.checked = true
    }
}
