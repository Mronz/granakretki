let express = require("express")
let lobby = require("./static/serverModules")
let app = express()
const PORT = 3000;
const mongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;

mongoClient.connect("mongodb+srv://dbUser:komar123@granakretki.oagfqoh.mongodb.net/?retryWrites=true&w=majority", (err, db) => {
    if (err) console.log(err)
    else {
        console.log("connected to mongodb!");
        //console.log(db)
        db.createCollection("nazwakolekcji", (err, coll) => {
            console.log("kolekcja powstała, sprawdź w konsoli klienta mongo")
        })
    }
})



app.use(express.static('static'))

app.post("/GET_ROOMS", (req, res) => {
    req.on("data", function (data) { console.log(lobby) })
    req.on("end", function (data) {
        res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
        res.end(JSON.stringify(lobby, null, 5));
    })
})

app.post("/ENTER_ROOM", (req, res) => {
    let answear;
    req.on("data", function (data) {
        console.log("data: " + data)
        data = JSON.parse(data)
        let room = lobby[data.roomNumber];
        let name = data.username;
        if (room.player1 == null) {
            room.player1 = name;
            answear = { status: "entered", room: data.roomNumber, player: 1 }
        }
        else if (room.player2 == null) {
            room.player2 = name;
            answear = { status: "entered", room: data.roomNumber, player: 2 }
        }
        else {
            answear = { status: "busy" }
        }

    })
    req.on("end", function (data) {
        res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
        res.end(JSON.stringify(answear, null, 5));
    })
})

app.post("/ASK", (req, res) => {
    let answear;
    req.on("data", function (data) {
        data = JSON.parse(data)
        let room = lobby[data.roomNumber];
        if (room.player1 != null && room.player2 != null) {
            answear = { status: "start", board: room.board, turn: room.turn, player1: room.player1, player2: room.player2 }
        }
        else answear = { status: "wait" }
    })
    req.on("end", function (data) {
        res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
        res.end(JSON.stringify(answear, null, 5));
    })
})
app.post("/RESET_ROOM", (req, res) => {
    req.on("data", function (data) {
        data = JSON.parse(data)
        let room = lobby[data.roomNumber];
        room.player1 = null
        room.player2 = null
        room.board = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ]
        room.turn = 1
        console.log("Reset pokoju: " + data.roomNumber);
    })
    req.on("end", function (data) {
        res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
        res.end(JSON.stringify("OK", null, 5));
    })
})


app.post("/UPDATE_ROOM", (req, res) => {
    let answear
    req.on("data", function (data) {
        data = JSON.parse(data)
        lobby[data.roomNumber].board = data.board
        lobby[data.roomNumber].turn == 1 ? lobby[data.roomNumber].turn = 2 : lobby[data.roomNumber].turn = 1
        lobby[data.roomNumber].name = data.pawn
        lobby[data.roomNumber].positions = data.positions
        answear = { turn: lobby[data.roomNumber].turn, board: lobby[data.roomNumber].board, name: lobby[data.roomNumber].name, positions: lobby[data.roomNumber].positions }
    })
    req.on("end", function (data) {
        res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
        res.end(JSON.stringify(answear, null, 5));
    })
})

app.post("/ASK_TURN", (req, res) => {
    let answear;
    req.on("data", function (data) {
        data = JSON.parse(data)
        // console.log(data)
        if (JSON.stringify(lobby[data.roomNumber].board) == JSON.stringify(data.board)) {
            answear = { status: "wait" }
        } else {
            answear = { status: "move", board: lobby[data.roomNumber].board, turn: lobby[data.roomNumber].turn, name: lobby[data.roomNumber].name, positions: lobby[data.roomNumber].positions }
        }
    })
    req.on("end", function (data) {
        res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
        res.end(JSON.stringify(answear, null, 5));
    })
})


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})


