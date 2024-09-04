export class Ship {
    constructor (length) {
        this.length = length;
        this.hp = length;
    }
    hit () {
        if (!this.hp) throw new Error("Ship already sank");
        this.hp--
    }
    isSunk () {
        return (!this.hp)
    }
}