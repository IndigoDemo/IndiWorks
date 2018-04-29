import Camera from "../components/camera";
import {
    Scene,
    WebGLRenderer,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh
} from "three";

class demo {
    constructor() {
        this.camera = new Camera().camera;
        this.scene = new Scene();

        this.renderer = new WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        const container = document.getElementById("appContainer");
        container.appendChild(this.renderer.domElement);

        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new Mesh(geometry, material);
        this.scene.add(cube);

        this.animate = this.animate.bind(this);
    }

    animate() {
        requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
    }
}

export default demo;
