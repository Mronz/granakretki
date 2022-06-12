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
        this.board.position.set(200, 5, 200)
        this.scene.add(this.board) // Dodanie planszy - papier

        this.x = 1
        this.y = 1800

        //  this.kamera = setInterval(() => this.cameraAnimationInLobby(this.camera), 30) // xD, ale jestem zajebisty
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
}