import Controller from "./core/controller";

const container = document.getElementById("appContainer");
container.querySelector("#loading").style.display = "none";

const demoMode = process.env["NODE_ENV"] === "production";

const sceneController = new Controller(demoMode);
