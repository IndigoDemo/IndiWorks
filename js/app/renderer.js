define(["three"], function(THREE) {
    var renderer = new THREE.WebGLRenderer({
        clearColor: 0x000000,
        antialiasing: true
    });
    renderer.setSize(1920, 1080);
    document.body.appendChild(renderer.domElement);

    return renderer;
});
