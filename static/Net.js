class Net {
    // pobranie listy pokoji
    getRooms = () => {
        const options = {
            method: "POST"
        };
        fetch("/GET_ROOMS", options)
            .then(response => response.json()) // konwersja na json
            .then(data => ui.lobby(data)) // dane odpowiedzi z serwera
            .catch(error => console.log(error));
    }
    // wyslanie zapytania odnosne dolaczenia do wybranego pokoju
    enterRoom = (num, name) => {
        const data = JSON.stringify({ roomNumber: num, username: name })
        const options = {
            method: "POST",
            body: data
        };
        fetch("/ENTER_ROOM", options)
            .then(response => response.json()) // konwersja na json
            .then(data => ui.entering(data)) // dane odpowiedzi z serwera
            .catch(error => console.log(error));
    }
    // reset pokoju
    resetRoom = (num) => {
        const data = JSON.stringify({ roomNumber: num })
        const options = {
            method: "POST",
            body: data
        };
        fetch("/RESET_ROOM", options)
            .then(response => response.json()) // konwersja na json
            // .then(data => ui.entering(data)) // dane odpowiedzi z serwera
            .catch(error => console.log(error));
    }
    // wysylanie zapytania sprawdzajacego czy jest dwch graczy w pokoju i czy mozna rozpoczac
    asking = async () => {
        let x = 0;

        let div = document.createElement("div")
        div.id = "waitingForEnemy"
        div.innerHTML = "Waiting for Player 2..."
        document.body.appendChild(div)

        let loader = document.createElement("div")
        loader.id = "loader"
        div.appendChild(loader)



        while (x == 0) {

            // console.log("pytam");
            const data = JSON.stringify({ roomNumber: game.roomNumber })
            const options = {
                method: "POST",
                body: data
            };
            fetch("/ASK", options)
                .then(response => response.json()) // konwersja na json
                .then(data => status(data)) // dane odpowiedzi z serwera
                .catch(error => console.log(error));
            await new Promise(r => setTimeout(r, 500));
        }
        // sprawdzenie czy mozna rozpoczac gre
        function status(data) {
            if (data.status == "start") {
                x++;
                game.board = data.board
                game.turn = data.turn

                ui.changeStatus("Start")
                game.start()
                document.getElementById("waitingForEnemy").remove()
            }
            else ui.changeStatus("waiting")
        }
    }
    updateBoard = (num, board, name, positions) => {
        const data = JSON.stringify({ roomNumber: num, board: board, pawn: name, positions: positions })
        const options = {
            method: "POST",
            body: data
        };
        fetch("/UPDATE_ROOM", options)
            .then(response => response.json()) // konwersja na json
            .then(data => {
                game.turn = data.turn;
                game.board = data.board;
                game.name = data.name;
                game.positions = data.positions;
            }) // dane odpowiedzi z serwera
            .catch(error => console.log(error));
    }
    waitingForTurn = async () => {
        let x = 0;

        let div = document.createElement("div")
        div.id = "waitingForTurn"
        document.body.appendChild(div)

        let p = document.createElement("p")
        p.id = "timer"
        p.innerHTML = "Twój przeciwnik ma ruch, zostało mu 60 [s];"
        div.appendChild(p)
        var countDownDate = Date.now() + 61000

        var countDowning = setInterval(function () {
            var now = Date.now();

            var distance = countDownDate - now

            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            p.innerHTML = `Twój przeciwnik ma ruch, zostało mu ${seconds}[s];`

        })

        while (x == 0) {
            // console.log("czekom kurw");
            const data = JSON.stringify({ roomNumber: game.roomNumber, board: game.board, name: game.name, positions: game.positions })
            const options = {
                method: "POST",
                body: data
            };
            fetch("/ASK_TURN", options)
                .then(response => response.json()) // konwersja na json
                .then(data => {
                    // console.log(data);
                    if (data.status == "wait") {


                        // console.log("czekam");
                    } else if (data.status == "move") {
                        game.board = data.board
                        game.turn = data.turn
                        game.name = data.name
                        game.positions = data.positions
                        game.enemyMove();
                        x++;
                        clearInterval(countDowning)
                        document.getElementById("waitingForTurn").remove()
                    }
                }) // dane odpowiedzi z serwera
                .catch(error => console.log(error));
            await new Promise(r => setTimeout(r, 500));
        }
    }
}