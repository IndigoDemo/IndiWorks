// Configure Require.js
var require = {
    // Default load path for js files
    baseUrl: 'js/app',
    shim: {
        // --- Use shim to mix together all THREE.js subcomponents
        'threeCore': { exports: 'THREE' },
        'TrackballControls': { deps: ['threeCore'], exports: 'THREE' },

        'effectComposer': { deps: ['threeCore'], exports: 'THREE' },
        'bloomPass': { deps: ['threeCore'], exports: 'THREE' },
        'renderPass': { deps: ['threeCore'], exports: 'THREE' },
        'copyShader': { deps: ['threeCore'], exports: 'THREE' },
        'shaderPass': { deps: ['threeCore'], exports: 'THREE' },
        'convolutionShader': { deps: ['threeCore'], exports: 'THREE' },
        'maskPass': { deps: ['threeCore'], exports: 'THREE' },
        'dotScreenPass': { deps: ['threeCore'], exports: 'THREE' },
        'dotScreenShader': { deps: ['threeCore'], exports: 'THREE' },

        // --- end THREE sub-components
        'detector': { exports: 'Detector' },
        'stats': { exports: 'Stats'},

        // NASA the fuck
        'jsrocket': {exports: 'JSRocket'}
    },
    // Third party code lives in js/lib
    paths: {
        // --- start THREE sub-components
        three: '../lib/three',
        threeCore: '../lib/three.min',
        TrackballControls: '../lib/controls/TrackballControls',

        effectComposer: '../lib/effectComposer',
        bloomPass: '../lib/bloomPass',
        renderPass: '../lib/renderPass',
        copyShader: '../lib/copyShader',
        shaderPass: '../lib/shaderPass',
        convolutionShader: '../lib/convolutionShader',
        maskPass: '../lib/maskPass',
        dotScreenPass: '../lib/dotScreenPass',
        dotScreenShader: '../lib/dotScreenShader',

        // --- end THREE sub-components
        detector: '../lib/Detector',
        stats: '../lib/stats.min',
        // Require.js plugins
        text: '../lib/text',
        shader: '../lib/shader',
        // Where to look for shader files
        shaders: '../shaders',
        // Rocket library
        jsrocket: '../lib/jsRocket.min',
    }
};
