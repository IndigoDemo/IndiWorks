class Tracks {
    constructor(syncClient) {
        this.cRot = syncClient.getTrack("c_rotation");
        this.cDist = syncClient.getTrack("c_distance");

        this.clearColor = {
            r: syncClient.getTrack("c_r"),
            g: syncClient.getTrack("c_g"),
            b: syncClient.getTrack("c_g"),
        };
    }
}

export default Tracks;
