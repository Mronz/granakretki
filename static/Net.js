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
        while (x == 0) {

            console.log("pytam");
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
                game.start()
                ui.changeStatus("Start")
            }
            else ui.changeStatus("waiting")
        }
    }
    updateBoard = (num, board) => {
        const data = JSON.stringify({ roomNumber: num, board:board })
        const options = {
            method: "POST",
            body: data
        };
        fetch("/UPDATE_ROOM", options)
            .then(response => response.json()) // konwersja na json
            .then(data => {
                game.turn = data.turn;
                game.board = data.board;
            }) // dane odpowiedzi z serwera
            .catch(error => console.log(error));
    }
}