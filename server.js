//olek pierdol sie
var express = require("express")
var app = express()
const PORT = 3000;
app.use(express.json())
app.use(express.text())


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
