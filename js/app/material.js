define( ["three", "texture"], function ( THREE, texture ) {
    // Shader objects support redefining of #defines.
    // See `simple.frag` file, where `faceColor` is already defined to be white, and we are overriding it to red here

    var materials = [],
        colors = [0x540024, 0x7A0538, 0xBA0032, 0xE9001C, 0xFF3700, 0x2e0014];

    for (var i = 0; i < 6; i++) {
        materials.push(new THREE.MeshBasicMaterial({ color:colors[i] }));
    }

    return {
        solid: materials
    };
} );
