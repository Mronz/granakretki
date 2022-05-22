class Net {
    getRooms = () => {
        const options = {
            method: "POST"
        };
        fetch("/GET_ROOMS", options)
            .then(response => response.json()) // konwersja na json
            .then(data => ui.lobby(data)) // dane odpowiedzi z serwera
            .catch(error => console.log(error));
    }
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
        function status(data) {
            if (data.status == "start") {
                x++;
                // game.start()
                ui.changeStatus("Start")
            }
            else ui.changeStatus("waiting")
        }
    }
}