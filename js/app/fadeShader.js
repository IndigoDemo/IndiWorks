define(["three"], function(THREE) {
	FadeShader = {
		uniforms: {
			"tDiffuse": { type: "t", value: null },
			"tSize":    { type: "v2", value: new THREE.Vector2( 256, 256 ) },
			"amount": { type: "f", value: 0.7 },
			"color": { type: "v3", value: new THREE.Vector3( 1,1,1 ) }
		},

		vertexShader: [
			"varying vec2 vUv;",

			"void main() {",
				"vUv = uv;",
				"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
			"}"
		].join("\n"),

		fragmentShader: [
			"uniform sampler2D tDiffuse;",
			"uniform float amount;",
			"uniform vec3 color;",
			"varying vec2 vUv;",

			"void main() {",
				"gl_FragColor = vec4(mix(texture2D(tDiffuse,vUv).xyz, color, amount), 1);",
			"}"
		].join("\n")
	};

	return FadeShader;
});