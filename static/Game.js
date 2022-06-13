class Game {
    constructor() {
        // ustawienia sceny
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x000000);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        const axes = new THREE.AxesHelper(1000)
        this.scene.add(axes)
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
        this.holder = new Holder
        this.scene.add(this.holder) // Dodanie podstawki
        this.board = new Board
        this.board.position.set(200, 16, 200)
        this.scene.add(this.board) // Dodanie planszy - papier


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

        this.pawn = new Pawn("orange")
        this.pawn.position.set(-400, 20, -400)
        this.scene.add(this.pawn)

        for (let i = 0; i < 8; i++) {

        }

        this.x = 1 // Zmienne pomocnicze do animacji kamery
        this.y = 1800
        this.kamera = setInterval(() => this.cameraAnimationInLobby(this.camera), 30) // xD, ale jestem zajebisty
        this.render() // wywołanie metody render
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
        }
        else if (winner == 2) {
            console.log("wygrał 2");
        }
    }
}