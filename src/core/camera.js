import { PerspectiveCamera } from "three";

class Camera {
    constructor() {
        this.camera = new PerspectiveCamera(
            74,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this.reset = this.reset.bind(this);
        this.updateSize = this.updateSize.bind(this);

        this.reset();
        this.updateSize();

        window.addEventListener("resize", this.updateSize, false);
    }

    reset() {
        this.camera.position.set(0, 0, 400);
        this.camera.rotation.set(0, 0, 0);
    }

    updateSize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }
}

export default Camera;
