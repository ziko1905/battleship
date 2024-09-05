/* eslint-disable no-undef */
import { Ship } from "./logic";
import { GameBoard } from "./logic";

describe("Ships", () => {
    let ship;
    beforeEach(() => {
        ship = new Ship(3);
    })

    test("Ship exists", () => {
        expect(ship).toBeInstanceOf(Ship)
    })

    test("Ship sunk after three hits", () => {
        ship.hit()
        ship.hit()
        ship.hit()
        expect(ship.isSunk()).toBe(true);
    })

    test("Ship didn't sink after two hits, but then sinks", () => {
        ship.hit()
        ship.hit()
        expect(ship.isSunk()).toBe(false);
        ship.hit()
        expect(ship.isSunk()).toBe(true);
    })

    test("Hitting after specified length", () => {
        ship.hit()
        ship.hit()
        ship.hit()
        expect(() => ship.hit()).toThrow("Ship already sank")
    })
})

describe("Board", () => {
    let board;
    // [<y-cord>, <x-cord>, <ship-size>]
    let ships = [[0, 0, 5], [2, 2, 4], [8, 6, 3], [9, 6, 3], [5, 8, 2]]
    beforeEach(() => {
        board = new GameBoard()
        for (let s of ships) board.place(...s);
    })

    test("Positive ship validation", () => {
        for (let n of ships) {
            expect(board.isShip(n[0], n[1])).toBe(true)
        }
    })

    test("Negative ship validation", () => {
        expect(board.isShip(0, 6)).toBe(false)
        expect(board.isShip(2, 6)).toBe(false)
    })

    test("Non direct ship validation", () => {
        expect(board.isShip(0, 1)).toBe(true)
        expect(board.isShip(0, 4)).toBe(true)
        expect(board.isShip(2, 3)).toBe(true)
    })

    test("Invalid placement (wrong coordinates)", () => {
        expect(() => board.place(0, 10, 2)).toThrow("Wrong ship coordinates")
        expect(() => board.place(0, -10, 2)).toThrow("Wrong ship coordinates")
    })

    test("Invalid placement (invalid ship length)", () => {
        expect(() => board.place(0, 8, 5)).toThrow("Wrong ship length")
        expect(() => board.place(0, 9, -2)).toThrow("Wrong ship length")
    })

    test("Invalid placement (direct occupied cell)", () => {
        expect(() => board.place(2, 5, 1)).toThrow("Cell already occupied")
        expect(() => board.place(8, 6, 2)).toThrow("Cell already occupied")
    })

    test("Invalid placement (indirect occupied cell)", () => {
        expect(() => board.place(5, 7, 2)).toThrow("Cell already occupied")
        expect(() => board.place(2, 0, 3)).toThrow("Cell already occupied")
    })

    test("Ship validation after indirect invalid placement", () => {
        expect(() => board.place(5, 7, 2)).toThrow("Cell already occupied")
        expect(board.isShip(5, 7)).toBe(false)
    })
})