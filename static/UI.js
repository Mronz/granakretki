class Ui {

    constructor() {
        this.status()
        this.nickInput()
        //this.resize();
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
        inp.onclick = () => {
            this.lobby()
            //game.username = document.getElementById("nick");
        }
        loginWindow.append(inp);

        document.getElementById("root").append(loginWindow);
    }


    lobby() {
        if (document.getElementById("loginWindow")) document.getElementById("loginWindow").remove();
        let lobbyWindow = document.createElement("div");
        lobbyWindow.id = "loginWindow";
        lobbyWindow.style.width = "300px";
        lobbyWindow.style.height = "300px";

        // let txt = document.createElement("div");
        // txt.innerHTML = "Grasz jako " + game.username;
        // lobbyWindow.append(txt);

        txt = document.createElement("div");
        txt.innerHTML = "Pokoje";
        lobbyWindow.append(txt);


        let table = document.createElement("table");
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.innerHTML = "room#1";
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = "user1"; // uzytkownik1 w pokoju
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = "user2"; // uzytkownik2 w pokoju
        tr.appendChild(td);
        td = document.createElement("td");
        let bt = document.createElement("button");
        bt.innerText = "Dołącz";
        td.appendChild(bt);
        tr.appendChild(td);
        table.appendChild(tr)

        lobbyWindow.append(table);

        document.getElementById("root").append(lobbyWindow);
    }




    resize() {
        window.onresize = () => {
            console.log("resize");
            game.camera.aspect = window.innerWidth / window.innerHeight;
            game.camera.updateProjectionMatrix();
            game.renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }
}