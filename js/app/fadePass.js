define(["three", "fadeShader"], function(THREE, FadeShader) {
    FadePass = function() {
        var shader = FadeShader;

        this.color = new THREE.Vector3(1, 1, 1);
        this.amount = 0;

        this.uniforms = THREE.UniformsUtils.clone(shader.uniforms);

        this.material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: shader.vertexShader,
            fragmentShader: shader.fragmentShader
        });

        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        this.scene = new THREE.Scene();

        this.enabled = true;
        this.renderToScreen = false;
        this.needsSwap = true;

        this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), null);
        this.scene.add(this.quad);
    }

    FadePass.prototype = {
        render: function(renderer, writeBuffer, readBuffer, delta, maskActive) {
            this.uniforms["tDiffuse"].value = readBuffer;
            this.uniforms["tSize"].value.set(readBuffer.width, readBuffer.height);
            this.uniforms["amount"].value = this.amount;
            this.uniforms["color"].value.copy(this.color);

            this.quad.material = this.material;

            if (this.renderToScreen) {
                renderer.render(this.scene, this.camera);
            } else {
                renderer.render(this.scene, this.camera, writeBuffer, false);
            }
        }
    };

    return FadePass;
});
