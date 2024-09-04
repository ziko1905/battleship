import { experiments } from "webpack";
import { Ship } from "./logic";

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