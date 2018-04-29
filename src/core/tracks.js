class Tracks {
    constructor(syncClient) {
        this.cRot = syncClient.getTrack("c_rotation");
        this.cDist = syncClient.getTrack("c_distance");
    }
}

export default Tracks;
