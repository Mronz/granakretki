class Room {
    constructor() {
        this.player1 = null
        this.player2 = null
        this.board = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ]
        this.turn = 1
    }
}

let rooms = []
for (let i = 0; i < 4; i++) rooms.push(new Room)

module.exports = rooms