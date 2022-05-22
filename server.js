//olek pierdol sie
let express = require("express")
let lobby = require("./static/serverModules")
let app = express()
const PORT = 3000;
app.use(express.static('static'))
app.use(express.json())
app.use(express.text())



app.post("/GET_ROOMS", (req, res) => {

    req.on("data", function (data) { console.log(lobby) })
    req.on("end", function (data) {
        res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
        res.end(JSON.stringify(lobby, null, 5));
    })
})


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
