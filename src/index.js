import "./styles.css";
import PubSub from "pubsub-js";
import "./load.js"
import { leftGrid, rightGrid } from "./ui-controller.js"
import { Player } from "./logic.js";

const ply1 = {
    logic: new Player(),
    grid: leftGrid
}

const ply2 = {
    logic: new Player(),
    grid: rightGrid
}

// Predetermined ships values
const leftShips = [[0, 0, 5], [2, 2, 4, true], [8, 6, 3], [9, 6, 3], [5, 8, 2, true]]
const rightShips = [[0, 2, 2, true], [2, 0, 3, true], [6, 6, 3], [3, 2, 4], [9, 0, 5]]

for (let i = 0; i < 5; i++) {
    ply1.logic.board.place(...leftShips[i])
    ply1.grid.placeShip(...leftShips[i])
}

for (let j = 0; j < 5; j++) {
    ply2.logic.board.place(...rightShips[j])
    ply2.grid.placeShip(...rightShips[j])
}