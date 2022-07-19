import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import * as BABYLON from "@babylonjs/core";

import {MainGame} from "./MainGame";


class App {
    private MainGame;
    constructor() {
        // create the canvas html element and attach it to the webpage
        var canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);

        // initialize babylon scene and engine
        var engine = new BABYLON.Engine(canvas, true);
        var scene = new BABYLON.Scene(engine);

        var camera: BABYLON.FreeCamera = new BABYLON.FreeCamera("Camera", BABYLON.Vector3.Zero(), scene);
        camera.position = new BABYLON.Vector3(5.047015550432089,-10.942254670104042, 17.896466813938037);
        camera.detachControl();

        var light1: BABYLON.HemisphericLight = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);


        this.MainGame = new MainGame(scene);


        // hide/show the Inspector
        window.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    scene.debugLayer.show();
                }
            }

            if(ev.key == "e"){
                console.log("Camera position: " + camera.position);
            }

            this.MainGame.keyDown(ev);
        });

        // run the main render loop
        engine.runRenderLoop(() => {
            scene.render();
            engine.resize();

            this.MainGame.update();
        });
    }
}
new App();

