import Scene from "./scenes/demo";
const scene = new Scene();

const container = document.getElementById("appContainer");
container.querySelector("#loading").style.display = "none";

scene.animate();
