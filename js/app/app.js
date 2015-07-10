define(["three", "camera", "controls", "geometry", "light", "material", "renderer", "scene", "jsRocket"],
    function (THREE, camera, controls, geometry, light, material, renderer, scene, jsRocket) {
        var app = {
            init: function () {
                jsRocket.init(this);

                var cube = new THREE.Mesh(
                    new THREE.BoxGeometry( 100, 100, 100 ),
                    new THREE.MeshFaceMaterial(material.solid) );

                scene.add(cube);
                window.requestAnimationFrame(this.animate);
            },
            animate: function() {
                try {
                    jsRocket.update();
                }
                catch(err)
                { 
                    return;
                }
                finally
                {
                    window.requestAnimationFrame(app.animate);
                }

                var rot = (jsRocket.tracks.rotation.getValue(jsRocket.row) || 0) / 180 * Math.PI,
                    color = new THREE.Color();

                color.setRGB((jsRocket.tracks.clearR.getValue(jsRocket.row) || 0) / 255,
                    (jsRocket.tracks.clearG.getValue(jsRocket.row) || 0) / 255,
                    (jsRocket.tracks.clearB.getValue(jsRocket.row) || 0) / 255);

                camera.position.x = Math.cos(rot) * (jsRocket.tracks.distance.getValue(jsRocket.row) || 0);
                camera.position.z = Math.sin(rot) * (jsRocket.tracks.distance.getValue(jsRocket.row) || 0);
                camera.lookAt(scene.position);

                renderer.setClearColor(color);
                renderer.render(scene, camera);
            }
        };
        return app;
    });
