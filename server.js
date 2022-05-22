let express = require("express")
let lobby = require("./static/serverModules")
let app = express()
const PORT = 3000;
app.use(express.static('static'))
// app.use(express.json())
// app.use(express.text())



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
            answear = { status: "start" }
        }
        else answear = { status: "wait" }
    })
    req.on("end", function (data) {
        res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
        res.end(JSON.stringify(answear, null, 5));
    })
})


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
