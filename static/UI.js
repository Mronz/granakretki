class Ui {

    constructor() {
        this.status()
        this.nickInput()
        //this.resize();
        this.cameraScale();
    }
    //Ustawianie kamery w zależności od rozmiaru okna
    cameraScale() {
        window.onresize = function () {
            game.cameraScale()
        }
    }
    //pasek statusu
    status() {
        let header = document.createElement("div");
        header.id = "status";
        header.innerHTML = "Status";
        document.getElementById("root").append(header)
    }
    // okno z podaniem nazwy uzytkownika
    nickInput() {
        let loginWindow = document.createElement("div");
        loginWindow.id = "loginWindow";

        let txt = document.createElement("div");
        txt.innerHTML = "Podaj nick";

        loginWindow.append(txt);

        let inp = document.createElement("input");
        inp.setAttribute("type", "text");
        inp.id = "nick";

        loginWindow.append(inp);

        inp = document.createElement("input");
        inp.setAttribute("type", "submit");
        inp.id = "send";
        inp.value = "Dalej";
        inp.onclick = async () => {
            game.username = document.getElementById("nick").value;

            while (true) {
                await net.getRooms();
                await new Promise(r => setTimeout(r, 500));
                if (game.roomNumber != null) break;
            }
        }
        loginWindow.append(inp);
        document.getElementById("root").append(loginWindow);
    }

    // generwoanie looby
    lobby(data) {
        if (document.getElementById("loginWindow")) document.getElementById("loginWindow").remove();
        let lobbyWindow = document.createElement("div");
        lobbyWindow.id = "loginWindow";
        lobbyWindow.style.width = "300px";
        lobbyWindow.style.height = "300px";

        let txt = document.createElement("div");
        txt.innerHTML = "Pokoje";
        lobbyWindow.append(txt);
        let table = document.createElement("table");
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        th.innerHTML = "nr pokoju";
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "gracz 1";
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "gracz 2";
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "dołączanie";
        tr.appendChild(th);
        table.appendChild(tr)

        for (let i = 0; i < data.length; i++) {
            let room = data[i];
            let tr = document.createElement("tr");
            let td = document.createElement("td");
            td.innerHTML = "room#" + i;
            tr.appendChild(td);
            td = document.createElement("td");
            // uzytkownik1 w pokoju
            if (room.player1 == null) td.innerHTML = "-";
            else td.innerHTML = room.player1;
            tr.appendChild(td);
            td = document.createElement("td");
            // uzytkownik2 w pokoju
            if (room.player2 == null) td.innerHTML = "-";
            else td.innerHTML = room.player2;
            tr.appendChild(td);
            td = document.createElement("td");
            let bt = document.createElement("button");
            bt.onclick = () => {
                net.enterRoom(i, game.username)
            }
            bt.innerText = "Dołącz";
            // bt.id = i;
            td.appendChild(bt);
            bt = document.createElement("button");
            bt.onclick = () => {
                net.resetRoom(i)
            }
            bt.innerText = "Reset";
            td.appendChild(bt);
            tr.appendChild(td);
            table.appendChild(tr)
        }
        lobbyWindow.append(table);

        document.getElementById("root").append(lobbyWindow);
    }
    // wchodzenie do pokoju
    entering(data) {
        if (data.status == 'entered') {
            game.player = data.player;
            game.roomNumber = data.room;
            if (document.getElementById("loginWindow")) document.getElementById("loginWindow").remove();
            net.asking()
        }
    }

    // zmiana statusu
    changeStatus(info) {
        let status = document.getElementById('status')
        status.innerHTML = info;
    }

}