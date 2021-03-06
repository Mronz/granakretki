// Podstawka całej planszy
class Board extends THREE.Mesh {
    constructor() {
        super() // wywołanie konstruktora klasy z której dziedziczymy czyli z Mesha

        const geometry = new THREE.BoxGeometry(300, 5, 300);

        var material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide, // dwustronny
            transparent: true,
            opacity: 1,
        })

        material.map = new THREE.TextureLoader().load('./gfx/paperTexture_1.png')
        this.field = new THREE.Mesh(geometry, material);
        return this.field
    }

}
