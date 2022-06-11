// Podstawka całej planszy
class Holder extends THREE.Mesh {
    constructor() {
        super() // wywołanie konstruktora klasy z której dziedziczymy czyli z Mesha

        const geometry = new THREE.BoxGeometry(2000, 10, 2000);

        var material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide, // dwustronny
            transparent: true,
            opacity: 1,
        })

        material.map = new THREE.TextureLoader().load('./gfx/cardboardTexture.png')

        this.field = new THREE.Mesh(geometry, material);
        return this.field
    }

}
