// ----- MODEL --------
export const StateEnum = { OPEN: 1, CLOSED: 2, MARKED: 3 };
export class Tile { constructor(state = StateEnum.CLOSED) { this.state = state; }}
export class Mine extends Tile {}
export class Clue extends Tile {
    constructor(value, state) {
        super(state);
        this.value = value;
    }
}
// ----- END MODEL ----------