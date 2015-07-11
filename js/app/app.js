define(["three", "camera", "controls", "light", "material", "renderer", "scene", "jsRocket", "fadePass"],
    function (THREE, camera, controls, light, material, renderer, scene, jsRocket, FadePass) {
        var app = {
            composer: undefined,
            fadePass: undefined,

            init: function () {
                jsRocket.init(this);

                var cube = new THREE.Mesh(
                    new THREE.BoxGeometry( 100, 100, 100 ),
                    new THREE.MeshFaceMaterial(material.solid) );

                scene.add(cube);

                app.initPostProcessing(scene);
                window.requestAnimationFrame(this.animate);
            },

            initPostProcessing: function(scene) {
                console.log(THREE);
                composer = new THREE.EffectComposer(renderer);
                renderModel = new THREE.RenderPass(scene, camera);

                var copyPass = new THREE.ShaderPass(THREE.CopyShader);
                copyPass.renderToScreen = true;

                var effectDotScreen = new THREE.BloomPass(0.7, 25, 7, 512);
                effectDotScreen.renderToScreen = false;

                fadePass = new FadePass();

                composer.addPass(renderModel);
                composer.addPass(effectDotScreen);
                composer.addPass(fadePass);
                composer.addPass(copyPass);
            },

            animate: function() {
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

                /*renderer.setClearColor(color);
                renderer.render(scene, camera);*/

                fadePass.amount = jsRocket.tracks.fadeAmount.getValue(jsRocket.row);
                if(scene.fadeColor !== undefined)
                    fadePass.color = scene.fadeColor;

                renderer.setClearColor(color);
                renderer.clear();
                renderer.autoClear = false;
                composer.render();
            }
        };
        return app;
    });
