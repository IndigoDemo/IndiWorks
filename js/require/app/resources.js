define(["three"], function(THREE) {
    var modelsBaseUrl = "assets/models/";
    var texturesBaseUrl = "assets/textures/";

    var models = {
    };

    var textures = {
    }

    var finishedModels = {},
        finishedTextures = {};

    var modelsDone = false,
        texturesDone = false;

    var loadCallback = function() {};

    var updateStatus = function() {
        if(modelsDone && texturesDone)
            loadCallback();
    }

    var loadModels = function() {
        var manager = new THREE.LoadingManager();
        manager.onLoad = function() {
            modelsDone = true;
            updateStatus();
        }

        for (var name in models) {
            var url = models[name];

            var loader = new THREE.JSONLoader();
            loader.load(modelsBaseUrl + url, function(model) {
                finishedModels[name] = model;
                manager.itemEnd(url);
            });
            manager.itemStart(url);
        }
    }

    var loadTextures = function() {
        var manager = new THREE.LoadingManager();
        manager.onLoad = function() {
            texturesDone = true;
            updateStatus();
        }

  /*      var loader1 = new THREE.TextureLoader(manager);
        var loader2 = new THREE.TextureLoader(manager);
        var loader3 = new THREE.TextureLoader(manager);
        var loader4 = new THREE.TextureLoader(manager);

        loader1.load(texturesBaseUrl + 'nipples.png', function(texture) {
            finishedTextures['nipples'] = texture;
        });

        loader2.load(texturesBaseUrl + 'calligraphy.png', function(texture) {
            finishedTextures['calligraphy'] = texture;
        });

        loader3.load(texturesBaseUrl + 'intro.png', function(texture) {
            finishedTextures['intro'] = texture;
        });

        loader4.load(texturesBaseUrl + 'credits.png', function(texture) {
            finishedTextures['credits'] = texture;
        });*/
    }


    return {
        getModel: function(name) {
            return finishedModels[name];
        },

        getTexture: function(name) {
            return finishedTextures[name];
        },

        load: function(onDone) {
            loadCallback = onDone;
            loadModels();
            loadTextures();
        }
    };
});
