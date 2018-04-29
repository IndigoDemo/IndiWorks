import Camera from "../core/camera";
import { Scene, BoxGeometry, Mesh, MeshBasicMaterial } from "three";

class demo {
    constructor() {
        this.camera = new Camera().camera;
        this.scene = new Scene();

        this.camera.position.z = 4;

        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial({ color: 0x00ff00 });

        const diameter = 100;
        const materials = [];
        const colors = [
            0x540024,
            0x7a0538,
            0xba0032,
            0xe9001c,
            0xff3700,
            0x2e0014
        ];

        for (var i = 0; i < 6; i++) {
            materials.push(new MeshBasicMaterial({ color: colors[i] }));
        }
        const cube = new Mesh(
            new BoxGeometry(diameter, diameter, diameter),
            materials
        );
        this.scene.add(cube);
    }
}

export default demo;
