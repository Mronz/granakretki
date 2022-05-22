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
}