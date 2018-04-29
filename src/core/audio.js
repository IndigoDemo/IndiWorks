class AudioController {
    constructor(demoMode, render) {
        this.audio = new Audio();

        this.demoMode = demoMode;
        this.render = render;

        this.onAudioReady = this.onAudioReady.bind(this);
    }

    init(path) {
        this.audio.src = path;
        this.audio.load();
        this.audio.preload = true;
        this.audio.addEventListener("canplay", () => this.onAudioReady());
    }

    play() {
        this.audio.play();
    }

    get paused() {
        return this.audio.paused;
    }

    pause() {
        this.audio.pause();
    }

    get currentTime() {
        return this.audio.currentTime;
    }

    set currentTime(time) {
        this.audio.currentTime = time;
    }

    onAudioReady() {
        if (this.demoMode) {
            this.play();
        }

        this.render();
    }
}

export default AudioController;
