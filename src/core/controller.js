import { WebGLRenderer, Color } from "three";
import OrbitControls from "orbit-controls-es6";
import { SyncDevice } from "../lib/jsRocket.min";
import Stats from "../lib/stats.min";
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

        this.renderer = new WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.addScene("demo", new Demo());
        this.setScene("demo");

        this.render = this.render.bind(this);
        this.updateSize = this.updateSize.bind(this);

        this.audioController = new AudioPlayer(demoMode, this.render);

        const container = document.getElementById("appContainer");
        container.appendChild(this.renderer.domElement);

        window.addEventListener("resize", this.updateSize, false);

        if (!demoMode) {
            this.stats = new Stats();
            this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
            document.body.appendChild(this.stats.dom);
        }

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

            if (!this.demoMode) {
                this.controls = new OrbitControls(
                    this.activeScene.camera,
                    this.renderer.domElement
                );

                this.controls.enabled = true;
                this.controls.maxDistance = 1500;
                this.controls.minDistance = 0;
            }
        } else {
            console.error(`Unkown scene referenced (${id})`);
        }
    }

    addScene(name, scene) {
        this.scenes.set(name, scene);
    }

    render() {
        if (!this.demoMode) {
            this.stats.begin();
        }
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

            // TODO Check for mouse-down event or something to set camera pos
            this.activeScene.camera.position.x = Math.cos(rot) * (cDist || 0);
            this.activeScene.camera.position.z = Math.sin(rot) * (cDist || 0);
            this.activeScene.camera.lookAt(this.activeScene.scene.position);

            const clearColor = new Color();
            clearColor.setRGB(
                (this.tracks.clearColor.r.getValue(row) || 0) / 255,
                (this.tracks.clearColor.g.getValue(row) || 0) / 255,
                (this.tracks.clearColor.b.getValue(row) || 0) / 255
            );

            this.renderer.setClearColor(clearColor);

            this.renderer.render(
                this.activeScene.scene,
                this.activeScene.camera
            );
        }

        if (!this.demoMode) {
            this.stats.end();
        }

        requestAnimationFrame(this.render);
    }
}

export default Controller;
