define(["jsrocket"], function(JSRocket){
    var jsRocket = {
        BPM: 120,
        ROWS_PER_BEAT: 8,
        ROW_RATE: null,

        demoMode: false,
        syncDevice: null,
        row: 0,
        previousIntRow: null,
        audio: null,

        tracks: {
            clearR: 0,
            clearG: 0,
            clearB: 0,
            rotation: 0,
            distance: 400
        },

        app: null,

        init: function(app) {
            this.app = app;

            this.ROW_RATE = this.BPM / 60 * this.ROWS_PER_BEAT;
            this.syncDevice = new JSRocket.SyncDevice(this);

            this.audio = new Audio();

            this.prepareSync();
        },

        prepareSync: function() {
            if (this.demoMode) {
                this.syncDevice.setConfig({'rocketXML':'cube.rocket'})
                this.syncDevice.init('demo');
            } else {
                this.syncDevice.init();
            }

            this.syncDevice.on('ready', this.onSyncReady);
            this.syncDevice.on('update', this.onSyncUpdate);
            this.syncDevice.on('play', this.onPlay);
            this.syncDevice.on('pause', this.onPause);
        },

        prepareAudio: function() {
            this.audio.src = "assets/music/alpha_c_-_euh.ogg";
            this.audio.load();
            this.audio.preload = true;
            this.audio.addEventListener('canplay', this.onAudioReady(this));
        },

        onSyncReady: function(that) {
            that.prepareAudio();

            that.tracks['clearR'] = that.syncDevice.getTrack('clearR');
            that.tracks['clearG'] = that.syncDevice.getTrack('clearG');
            that.tracks['clearB'] = that.syncDevice.getTrack('clearB');
            that.tracks['rotation'] = that.syncDevice.getTrack('rotation');
            that.tracks['distance'] = that.syncDevice.getTrack('distance');
        },

        onAudioReady: function(that) {
            if (that.demoMode) {
                that.update();
                that.audio.play();
            } else {
                that.audio.pause();
                that.audio.currentTime = that.row / that.ROW_RATE;
            }
        },

        onSyncUpdate: function(that, row) {
            if (!isNaN(row)) {
                that.row = row;
            }
            that.update();
        },

        onPlay: function(that) {
            that.audio.currentTime = that.row / that.ROW_RATE;
            that.audio.play();
            that.update();
        },

        onPause: function(that) {
            that.row = that.audio.currentTime * that.ROW_RATE;
            window.cancelAnimationFrame(that.app.animate);
            that.audio.pause();
        },

        update: function() {
            if (this.audio.paused === false) {
                this.row = this.audio.currentTime * this.ROW_RATE;
                this.syncDevice.update(this.row);
            }

            if((this.demoMode === true)  || (this.audio.paused === false)) {
                window.requestAnimationFrame(this.app.animate);
            }  else {
                window.cancelAnimationFrame(this.app.animate);
            }
        }
    };

    return jsRocket;
});