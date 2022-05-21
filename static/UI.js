class Ui {

    constructor() {
        this.status()
        this.loginInterface()
        //this.resize();
    }
    //pasek statusu
    status() {
        let header = document.createElement("div");
        header.id = "status";
        header.innerHTML = "Status";
        document.getElementById("root").append(header)
    }
    // podanie nazwy uzytkownika
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
        inp.value += "Dalej";
        inp.onclick = function () { }
        loginWindow.append(inp);

        document.getElementById("root").append(loginWindow);
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