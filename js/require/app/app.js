define(["three", "camera", "controls", "light", "material", "renderer", "scene", "jsRocket", "fadePass", "stats"],
    function (THREE, camera, controls, light, material, renderer, scene, jsRocket, FadePass, Stats) {
        var app = {
            demo: false,
            stats: null,

            composer: undefined,
            fadePass: undefined,

            init: function () {
                if (app.demo === false) {
                    this.stats = new Stats();
                    this.stats.setMode(0); // 0: fps, 1: ms, 2: mb
                    this.stats.domElement.style.position = 'absolute';
                    this.stats.domElement.style.left = '0px';
                    this.stats.domElement.style.top = '0px';
                }

                jsRocket.init(this);

                document.body.appendChild(this.stats.domElement);

                var cube = new THREE.Mesh(
                    new THREE.BoxGeometry( 100, 100, 100 ),
                    new THREE.MeshFaceMaterial(material.solid) );

                scene.add(cube);

                app.initPostProcessing(scene);
                window.requestAnimationFrame(this.animate);
            },

            initPostProcessing: function(scene) {
                composer = new THREE.EffectComposer(renderer);
                renderModel = new THREE.RenderPass(scene, camera);

                var copyPass = new THREE.ShaderPass(THREE.CopyShader);
                copyPass.renderToScreen = true;

                var bloomPass = new THREE.BloomPass(0.5, 25, 7, 512);
                bloomPass.renderToScreen = false;

                fadePass = new FadePass();

                composer.addPass(renderModel);
                composer.addPass(bloomPass);
                composer.addPass(fadePass);
                composer.addPass(copyPass);
            },

            animate: function() {
                if (app.stats) {
                    app.stats.begin();
                }

                var failed = false;
                try {
                    jsRocket.update();
                }
                catch(err)
                {
                    failed = true;
                }
                finally
                {
                    window.requestAnimationFrame(app.animate);
                }

                if(failed)
                    return;

                var rot = (jsRocket.tracks.rotation.getValue(jsRocket.row) || 0) / 180 * Math.PI,
                    color = new THREE.Color();

                color.setRGB((jsRocket.tracks.clearR.getValue(jsRocket.row) || 0) / 255,
                    (jsRocket.tracks.clearG.getValue(jsRocket.row) || 0) / 255,
                    (jsRocket.tracks.clearB.getValue(jsRocket.row) || 0) / 255);

                camera.position.x = Math.cos(rot) * (jsRocket.tracks.distance.getValue(jsRocket.row) || 0);
                camera.position.z = Math.sin(rot) * (jsRocket.tracks.distance.getValue(jsRocket.row) || 0);
                camera.lookAt(scene.position);

                fadePass.opacity = jsRocket.tracks.fadeAmount.getValue(jsRocket.row);
                fadePass.color = new THREE.Vector3(
                    jsRocket.tracks.fadeColorR.getValue(jsRocket.row),
                    jsRocket.tracks.fadeColorG.getValue(jsRocket.row),
                    jsRocket.tracks.fadeColorB.getValue(jsRocket.row)
                );

                renderer.setClearColor(color);
                renderer.clear();
                composer.render();

                if (app.stats) {
                    app.stats.end();
                }
            }
        };
        return app;
    });
