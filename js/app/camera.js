define( ["three", "renderer"], function ( THREE, renderer ) {
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

    camera.reset = function() {
        camera.position.set(0, 0, 400);
        camera.rotation.set(0, 0, 0);
    }

    camera.reset();

    var updateSize = function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.updateProjectionMatrix();
    };
    window.addEventListener( 'resize', updateSize, false );
    updateSize();

    return camera;
} );
