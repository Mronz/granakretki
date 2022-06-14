class Game {
    constructor() {
        // ustawienia sceny
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x000000);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // const axes = new THREE.AxesHelper(1000)
        // this.scene.add(axes)
        this.camera.position.set(1500, 1500, 1500)
        // this.camera.position.set(1500, 1500, 0)
        this.camera.lookAt(this.scene.position)
        this.raycaster = new THREE.Raycaster();
        this.mouseVector = new THREE.Vector2();
        this.renderer.domElement.id = "main";
        document.getElementById("root").append(this.renderer.domElement);

        this.renderer.setClearColor(0x888888); // kolor do ustawiania
        this.renderer.setSize(window.innerWidth, window.innerHeight); // skalowanie z rozmiarem okna
        // zmienne uzytkownika i planszy
        this.username;
        this.board;
        this.roomNumber = null;
        this.player;
        this.turn;
        this.name;
        this.enemy;
        this.holder = new Holder
        this.scene.add(this.holder) // Dodanie podstawki
        this.pawns = []
        this.positions;
        this.boradFields = []
        // tworzenie pol planszy
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                this.plate = new Board
                this.plate.name = "plate"
                this.plate.position.set(-400 + i * 300, 20, -400 + j * 300)
                this.plate.pos = i + '_' + j
                this.scene.add(this.plate) // Dodanie pola do planszy
                this.boradFields.push(this.plate)
            }

        }
        // pionki 1
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {

                this.pawn = new Pawn("orange")
                this.pawn.name = "orangePawn"
                this.pawn.helpingName = i + "orange" + j
                this.pawn.position.set(-1000 + i * 300, 20, -400 + j * 300)
                this.pawn.player = 1;
                this.scene.add(this.pawn)
                this.pawns.push(this.pawn)
            }
        }
        // pionki 2
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {

                this.pawn = new Pawn("green")
                this.pawn.name = "greenPawn"
                this.pawn.helpingName = i + "green" + j
                this.pawn.position.set(-1000 + i * 300, 20, 500 + j * 300)
                this.pawn.player = 2;
                this.scene.add(this.pawn)
                this.pawns.push(this.pawn)
            }
        }

        this.pos_z = -1000 // pomocnicze do dodania bloków
        this.pos_x = 800
        for (let i = 1; i <= 9; i++) { // Utworzenie bloków obok planszy
            this.winfield = new WinField(i, 10)
            if (i % 2) {
                this.winfield.position.set(this.pos_x, 16, this.pos_z)
                this.pos_z = this.pos_z + 300
            } else {
                this.winfield.position.set(this.pos_x, 16, this.pos_z)
                this.pos_x = this.pos_x - 300
            }

            if (this.pos_z == -400) {
                this.pos_z = -1000
            }
            this.scene.add(this.winfield)

        }

        this.titlePage = new WinField(0, 0) // Ustawienie Dodatkowego bloka graficznego
        this.titlePage.position.set(-400, 16, -700)
        this.scene.add(this.titlePage)

        this.x = 1 // Zmienne pomocnicze do animacji kamery
        this.y = 1800
        this.naktorymstoi
        this.kamera = setInterval(() => this.cameraAnimationInLobby(this.camera), 30) // xD, ale jestem zajebisty
        this.render() // wywołanie metody render
    }

    enemyMove = () => {
        // console.log(">  ")
        for (let i = 0; i < game.pawns.length; i++) {
            if (game.pawns[i].helpingName == game.name) {
                let pawnToMove = game.pawns[i]
                // console.log(pawnToMove)
                // console.log(game.positions)

                // pawnToMove.position.set(game.positions[0], game.positions[1], game.positions[2]);
                this.animation(game.positions[0], game.positions[1], game.positions[2], pawnToMove)
            }
        }
        let x = this.checkWin();
        if (x != null) {
            ui.changeStatus("Przeciwnik z Tobą wygrał frajerze!")
            document.removeEventListener("onmousedown")
        }


    }
    animation = (x, y, z, co) => {
        new TWEEN.Tween(co.position) // co
            .to({ x: x, y: y, z: z }, 500) // do jakiej pozycji, w jakim czasie
            .easing(TWEEN.Easing.Bounce.Out) // typ easingu (zmiana w czasie)
            .start()
    }

    start = () => {
        if (this.player == 1) {
            document.getElementById("status").innerHTML = "Grasz pomarańczowymi! Grasz przeciwko " + this.enemy
            clearInterval(this.kamera)
            this.camera.position.set(0, 2000, -2000)
            this.camera.lookAt(this.scene.position)
        } else {
            document.getElementById("status").innerHTML = "Grasz zielonymi! Grasz przeciwko " + this.enemy
            clearInterval(this.kamera)
            this.camera.position.set(0, 2000, 2000)
            this.camera.lookAt(this.scene.position)
        }


        if (this.turn != this.player) {
            net.waitingForTurn()
        }
        let selectedPawn = null;
        var pom = 0
        var kliekniete = [];
        var doRuszenia = 4;
        var pom2 = 0
        var klikniete2 = []

        document.addEventListener("mousedown", (event) => {
            this.mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
            this.raycaster.setFromCamera(this.mouseVector, this.camera);
            const intersects = this.raycaster.intersectObjects(this.scene.children);
            //console.log(intersects.length)
            if (this.turn == this.player) {

                if (intersects.length > 0) {

                    let object = intersects[0].object
                    // console.log(object);

                    if (this.player == 1) {
                        if (object.name == "orangePawn") {
                            selectedPawn = object
                            console.log(selectedPawn)

                            if ((object.position.x == -700 || object.position.x == -1000) && doRuszenia > 0) {
                                if (pom == 0) {
                                    selectedPawn.material.color = { r: 1, b: 0, g: 0 }
                                    kliekniete.push(selectedPawn)
                                } else if (pom >= 1) {

                                    kliekniete[pom - 1].material.color = { r: 1, g: 0.6470588235294118, b: 0 }
                                    selectedPawn.material.color = { r: 1, b: 0, g: 0 }
                                    kliekniete.push(selectedPawn)
                                }
                                pom++
                            } else if (doRuszenia == 0) {
                                selectedPawn = object

                                for (let i = 0; i < game.boradFields.length; i++) {
                                    if (game.boradFields[i].position.x == selectedPawn.position.x &&
                                        game.boradFields[i].position.z == selectedPawn.position.z
                                    ) {
                                        game.naktorymstoi = game.boradFields[i]
                                        console.log(game.naktorymstoi)
                                    }
                                }
                                if (pom2 == 0) {
                                    selectedPawn.material.color = { r: 1, b: 0, g: 0 }
                                    klikniete2.push(selectedPawn)
                                } else if (pom2 >= 1) {

                                    klikniete2[pom2 - 1].material.color = { r: 1, g: 0.6470588235294118, b: 0 }
                                    selectedPawn.material.color = { r: 1, b: 0, g: 0 }
                                    klikniete2.push(selectedPawn)
                                }
                                pom2++
                            }


                        }
                        else if (object.name == "plate" && selectedPawn != null) {
                            let pos = object.position
                            let pos_x = object.pos[0]
                            let pos_y = object.pos[2]

                            if (game.board[pos_x][pos_y] == 0) {

                                if ((selectedPawn.position.x == -700 || selectedPawn.position.x == -1000) && doRuszenia > 0) {
                                    // selectedPawn.position.set(pos.x, pos.y, pos.z);
                                    this.animation(pos.x, pos.y, pos.z, selectedPawn)
                                    doRuszenia--
                                    selectedPawn.material.color = { r: 1, g: 0.6470588235294118, b: 0 }
                                    let positionsToMove = [pos.x, pos.y, pos.z]
                                    // console.log(noktorymstoi.pos)
                                    game.board[pos_x][pos_y] = 1
                                    // console.log(object);
                                    // console.log(game.board);
                                    net.updateBoard(this.roomNumber, this.board, selectedPawn.helpingName, positionsToMove)
                                    selectedPawn = null;
                                    let x = this.checkWin();
                                    if (x != null) {
                                        ui.changeStatus("Wygrałeś na tego frajera!")
                                    }



                                    net.waitingForTurn()
                                } else if (doRuszenia == 0) {
                                    if ((selectedPawn.position.x == pos.x + 300 && selectedPawn.position.z == pos.z)
                                        || (selectedPawn.position.x == pos.x - 300 && selectedPawn.position.z == pos.z)
                                        || (selectedPawn.position.z == pos.z + 300 && selectedPawn.position.x == pos.x)
                                        || (selectedPawn.position.z == pos.z - 300 && selectedPawn.position.x == pos.x)
                                    ) {

                                        console.log(object)
                                        // selectedPawn.position.set(pos.x, pos.y, pos.z);
                                        this.animation(pos.x, pos.y, pos.z, selectedPawn)
                                        selectedPawn.material.color = { r: 1, g: 0.6470588235294118, b: 0 }
                                        let positionsToMove = [pos.x, pos.y, pos.z]
                                        game.board[pos_x][pos_y] = 1
                                        console.log(game.naktorymstoi)
                                        let pos1_x = game.naktorymstoi.pos[0]
                                        let pos1_y = game.naktorymstoi.pos[2]
                                        game.board[pos1_x][pos1_y] = 0

                                        net.updateBoard(this.roomNumber, this.board, selectedPawn.helpingName, positionsToMove)
                                        selectedPawn = null;
                                        let x = this.checkWin();
                                        if (x != null) {
                                            ui.changeStatus("Wygrałeś na tego frajera!")
                                        }
                                        net.waitingForTurn()

                                    }
                                }
                            }



                        }
                    }
                    else {
                        if (object.name == "greenPawn") {
                            selectedPawn = object
                            if ((object.position.x == -700 || object.position.x == -1000) && doRuszenia > 0) {
                                if (pom == 0) {
                                    console.log(selectedPawn.material.color)
                                    selectedPawn.material.color = { r: 1, b: 0, g: 0 }
                                    kliekniete.push(selectedPawn)
                                } else if (pom >= 1) {
                                    console.log(kliekniete)
                                    kliekniete[pom - 1].material.color = { r: 0, g: 0.5019607843137255, b: 0 }
                                    selectedPawn.material.color = { r: 1, b: 0, g: 0 }
                                    kliekniete.push(selectedPawn)
                                }
                                pom++
                            } else if (doRuszenia == 0) {

                                selectedPawn = object

                                for (let i = 0; i < game.boradFields.length; i++) {
                                    if (game.boradFields[i].position.x == selectedPawn.position.x &&
                                        game.boradFields[i].position.z == selectedPawn.position.z
                                    ) {
                                        game.naktorymstoi = game.boradFields[i]
                                    }
                                }
                                if (pom2 == 0) {
                                    selectedPawn.material.color = { r: 1, b: 0, g: 0 }
                                    klikniete2.push(selectedPawn)
                                } else if (pom2 >= 1) {

                                    klikniete2[pom2 - 1].material.color = { r: 0, g: 0.5019607843137255, b: 0 }
                                    selectedPawn.material.color = { r: 1, b: 0, g: 0 }
                                    klikniete2.push(selectedPawn)
                                }
                                pom2++

                            }
                        }
                        else if (object.name == "plate" && selectedPawn != null) {
                            let pos = object.position


                            let pos_x = object.pos[0]
                            let pos_y = object.pos[2]
                            if ((selectedPawn.position.x == -700 || selectedPawn.position.x == -1000) && doRuszenia > 0) {
                                if (game.board[pos_x][pos_y] == 0) {
                                    // selectedPawn.position.set(pos.x, pos.y, pos.z);
                                    this.animation(pos.x, pos.y, pos.z, selectedPawn)
                                    doRuszenia--
                                    selectedPawn.material.color = { r: 0, g: 0.5019607843137255, b: 0 }
                                    game.board[pos_x][pos_y] = 2
                                    let positionsToMove = [pos.x, pos.y, pos.z]
                                    // console.log(object);
                                    // console.log(game.board);

                                    net.updateBoard(this.roomNumber, this.board, selectedPawn.helpingName, positionsToMove)
                                    selectedPawn = null;

                                    let x = this.checkWin();
                                    if (x != null) {
                                        ui.changeStatus("Wygrałeś na tego frajera!")
                                    }

                                    net.waitingForTurn()
                                }
                            } else if (doRuszenia == 0) {
                                if ((selectedPawn.position.x == pos.x + 300 && selectedPawn.position.z == pos.z)
                                    || (selectedPawn.position.x == pos.x - 300 && selectedPawn.position.z == pos.z)
                                    || (selectedPawn.position.z == pos.z + 300 && selectedPawn.position.x == pos.x)
                                    || (selectedPawn.position.z == pos.z - 300 && selectedPawn.position.x == pos.x)
                                ) {

                                    console.log(object)
                                    // selectedPawn.position.set(pos.x, pos.y, pos.z);
                                    this.animation(pos.x, pos.y, pos.z, selectedPawn)
                                    selectedPawn.material.color = { r: 0, g: 0.5019607843137255, b: 0 }
                                    let positionsToMove = [pos.x, pos.y, pos.z]
                                    game.board[pos_x][pos_y] = 2

                                    let pos1_x = game.naktorymstoi.pos[0]
                                    let pos1_y = game.naktorymstoi.pos[2]
                                    game.board[pos1_x][pos1_y] = 0

                                    net.updateBoard(this.roomNumber, this.board, selectedPawn.helpingName, positionsToMove)
                                    selectedPawn = null;
                                    let x = this.checkWin();
                                    if (x != null) {
                                        ui.changeStatus("Wygrałeś na tego frajera!")
                                    }


                                    net.waitingForTurn()

                                }
                            }
                        }
                    }
                }

            } else if (this.turn != this.player) {
                // net.waitingForTurn()
            }
        })

    }



    updatePawns = () => {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (game.board == 1) {
                    //setposioosn
                }
            }

        }
    }


    cameraAnimationInLobby = (camera) => { // Obracanie w elipsie
        let kat = game.x * (Math.PI / 180);
        let x = game.y * Math.cos(kat)
        let y = 1800 * Math.sin(kat)
        camera.position.set(x, 1800, y)
        camera.lookAt(this.scene.position)
        game.x++
        if (game.y == -1800) {
            game.y = 1800
        }
        game.y--

    }

    cameraScale = () => { // Ustawienie kamery na środku, mimo zmniejszenia/powiększenia okna
        game.camera.aspect = window.innerWidth / window.innerHeight;
        game.camera.updateProjectionMatrix();
        game.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    render = () => { // render
        TWEEN.update();
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);

    }
    checkWin = () => {
        let actualBoard = game.board;
        let winner = null;
        for (let playerId = 1; playerId <= 2; playerId++) {
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 5; j++) {
                    if (actualBoard[i]?.[j] == playerId &&
                        actualBoard[i + 1]?.[j] == playerId &&
                        actualBoard[i + 2]?.[j] == playerId &&
                        actualBoard[i + 3]?.[j] == playerId) { // pionowo
                        winner = playerId;
                    }
                    else if (actualBoard[i]?.[j] == playerId &&
                        actualBoard[i]?.[j + 1] == playerId &&
                        actualBoard[i]?.[j + 2] == playerId &&
                        actualBoard[i]?.[j + 3] == playerId) { // poziomo
                        winner = playerId;
                    }
                    else if (actualBoard[i]?.[j] == playerId &&
                        actualBoard[i + 1]?.[j + 1] == playerId &&
                        actualBoard[i + 2]?.[j + 2] == playerId &&
                        actualBoard[i + 3]?.[j + 3] == playerId) { // ukos do prawej
                        winner = playerId;
                    }
                    else if (actualBoard[i]?.[j] == playerId &&
                        actualBoard[i + 1]?.[j - 1] == playerId &&
                        actualBoard[i + 2]?.[j - 2] == playerId &&
                        actualBoard[i + 3]?.[j - 3] == playerId) { // ukos do lewej
                        winner = playerId;
                    }
                    else if (actualBoard[i]?.[j] == playerId &&
                        actualBoard[i + 1]?.[j] == playerId &&
                        actualBoard[i + 1]?.[j + 1] == playerId &&
                        actualBoard[i]?.[j + 1] == playerId) { // kwadrat co kratke
                        winner = playerId;
                    }
                    else if (actualBoard[i]?.[j] == playerId &&
                        actualBoard[i + 2]?.[j] == playerId &&
                        actualBoard[i + 2]?.[j + 2] == playerId &&
                        actualBoard[i]?.[j + 2] == playerId) { // kwadrat co 2 kratki
                        winner = playerId;
                    }
                    else if (actualBoard[i]?.[j] == playerId &&
                        actualBoard[i + 3]?.[j] == playerId &&
                        actualBoard[i + 3]?.[j + 3] == playerId &&
                        actualBoard[i]?.[j + 3] == playerId) { // kwadrat co 3 kratki
                        winner = playerId;
                    }
                    else if (actualBoard[i]?.[j] == playerId &&
                        actualBoard[i + 4]?.[j] == playerId &&
                        actualBoard[i + 4]?.[j + 4] == playerId &&
                        actualBoard[i]?.[j + 4] == playerId) { // kwadrat co 4 kratki
                        winner = playerId;
                    }
                    else if (actualBoard[i]?.[j] == playerId &&
                        actualBoard[i + 1]?.[j - 1] == playerId &&
                        actualBoard[i + 1]?.[j + 1] == playerId &&
                        actualBoard[i + 2]?.[j] == playerId) { // romb co kratke
                        winner = playerId;
                    }
                    else if (actualBoard[i]?.[j] == playerId &&
                        actualBoard[i + 2]?.[j - 2] == playerId &&
                        actualBoard[i + 2]?.[j + 2] == playerId &&
                        actualBoard[i + 4]?.[j] == playerId) { // romb co 2 kratki
                        winner = playerId;
                    }
                }
            }
        }
        if (winner == 1) {
            console.log("wygrał 1");
            return 1
        }
        else if (winner == 2) {
            console.log("wygrał 2");
            return 2
        }
        else return null
    }
}