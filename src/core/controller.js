import { WebGLRenderer } from "three";
import { SyncDevice } from "../lib/jsRocket.min";
import Demo from "../scenes/demo";
import AudioPlayer from "./audio";
import Tracks from "./tracks";

const BPM = 120;
const ROWS_PER_BEAT = 8;
const ROW_RATE = BPM / 60 * ROWS_PER_BEAT;

class Controller {
    constructor(demoMode = false) {
        this.scenes = new Map();
        this.activeScene = null;
        this.demoMode = demoMode;

        this.syncClient = new SyncDevice();
        this.tracks = null;

        this.addScene("demo", new Demo());
        this.setScene("demo");

        this.renderer = new WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.render = this.render.bind(this);
        this.updateSize = this.updateSize.bind(this);

        this.audioController = new AudioPlayer(demoMode, this.render);

        const container = document.getElementById("appContainer");
        container.appendChild(this.renderer.domElement);

        window.addEventListener("resize", this.updateSize, false);

        this.prepareSync();
    }

    prepareSync() {
        if (this.demoMode) {
            this.syncClient.setConfig({ rocketXML: "indiworks.rocket" });
            this.syncClient.init("demo");
        } else {
            this.syncClient.init();
        }

        this.syncClient.on("ready", () => {
            this.tracks = new Tracks(this.syncClient);
            this.audioController.init("/media/alpha_c_-_euh.ogg");
        });
        this.syncClient.on(
            "update",
            row => (this.audioController.currentTime = row / ROW_RATE)
        );
        this.syncClient.on("play", () => this.audioController.play());
        this.syncClient.on("pause", () => this.audioController.pause());
    }

    updateSize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    setScene(id) {
        if (this.scenes.has(id)) {
            this.activeScene = this.scenes.get(id);
        } else {
            console.error(`Unkown scene referenced (${id})`);
        }
    }

    addScene(name, scene) {
        this.scenes.set(name, scene);
    }

    render() {
        const row = this.audioController.currentTime * ROW_RATE;

        if (!this.audioController.paused) {
            //otherwise we may jump into a point in the audio where there's
            //no timeframe, resulting in Rocket setting row 2 and we report
            //row 1 back - thus Rocket spasming out
            // this informs Rocket where we are
            this.syncClient.update(row);
        }

        if (this.activeScene) {
            const cRot = this.tracks.cRot.getValue(row);
            const cDist = this.tracks.cDist.getValue(row);

            const rot = (cRot || 0) / 180 * Math.PI;

            this.activeScene.camera.position.x = Math.cos(rot) * (cDist || 0);
            this.activeScene.camera.position.z = Math.sin(rot) * (cDist || 0);
            this.activeScene.camera.lookAt(this.activeScene.scene.position);

            this.renderer.render(
                this.activeScene.scene,
                this.activeScene.camera
            );
        }

        requestAnimationFrame(this.render);
    }
}

export default Controller;
