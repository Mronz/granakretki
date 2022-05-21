class Pionek extends THREE.Mesh {

    constructor(kolor) {
        super()
        this._kolor = kolor
        this._txt = txt
        this.geometry = new THREE.SphereGeometry(5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
        this.material = new THREE.MeshBasicMaterial({
            color: this._kolor,
            //map: new THREE.TextureLoader().load(this._txt),
            side: THREE.DoubleSide,
            wireframe: false
        });
    }
    setPosition(i, j) {
        this.pos = i + "_" + j;
    }
    getPosition() {
        return this.pos;
    }
    getMaterial() {
        return this.material;
    }
}