// Podstawka całej planszy
class Board extends THREE.Mesh {
    constructor() {
        super() // wywołanie konstruktora klasy z której dziedziczymy czyli z Mesha

        const geometry = new THREE.BoxGeometry(1500, 5, 1500);

        var material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide, // dwustronny
            transparent: true,
            opacity: 1,
        })

        material.map = new THREE.TextureLoader().load('./gfx/paperTexture.png')

        this.field = new THREE.Mesh(geometry, material);
        return this.field
    }

}
