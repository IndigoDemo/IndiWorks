// Start the app
require( ['detector', 'app'], function ( Detector, app ) {
  if ( ! Detector.webgl ) {
    Detector.addGetWebGLMessage();
    container.innerHTML = "";
  }

  // Initialize our app and start the animation loop (animate is expected to call itself)
  app.init();
} );
