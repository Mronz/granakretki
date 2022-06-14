// części graficzne do wygrania
class WinField extends THREE.Mesh {
    constructor(x, pom) {
        super() // wywołanie konstruktora klasy z której dziedziczymy czyli z Mesha
        this.x = x
        const geometry = new THREE.BoxGeometry(240, 5, 240);

        var material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide, // dwustronny
            transparent: true,
            opacity: 1,
        })
        if (pom == 10) {
            material.map = new THREE.TextureLoader().load(`./gfx/winningPositions/winPosition_${this.x}.png`)
        } else {
            material.map = new THREE.TextureLoader().load(`./gfx/titlePage.png`)
        }

        this.field = new THREE.Mesh(geometry, material);
        return this.field
    }

}
