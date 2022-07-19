import * as BABYLON from "@babylonjs/core";


export function getRandomInt(min:number, max:number){
    return Math.random() * (max - min) + min;
}

export const Colors = (scene: BABYLON.Scene) => {
    var red = new BABYLON.StandardMaterial("red", scene);
    red.diffuseTexture = new BABYLON.Texture("assets/img/red.png", scene);
    red.diffuseTexture.hasAlpha = true;
    red.backFaceCulling = false;
    
    var purple = new BABYLON.StandardMaterial("purple", scene);
    purple.diffuseTexture = new BABYLON.Texture("assets/img/purple.png", scene);
    purple.diffuseTexture.hasAlpha = true;
    purple.backFaceCulling = false;
    
    var green = new BABYLON.StandardMaterial("green", scene);
    green.diffuseTexture = new BABYLON.Texture("assets/img/green.png", scene);
    green.diffuseTexture.hasAlpha = true;
    green.backFaceCulling = false;
    
    var blue = new BABYLON.StandardMaterial("blue", scene);
    blue.diffuseTexture = new BABYLON.Texture("assets/img/blue.png", scene);
    blue.diffuseTexture.hasAlpha = true;
    blue.backFaceCulling = false;
    
    var yellow = new BABYLON.StandardMaterial("yellow", scene);
    yellow.diffuseTexture = new BABYLON.Texture("assets/img/yellow.png", scene);
    yellow.diffuseTexture.hasAlpha = true;
    yellow.backFaceCulling = false;
    
    var orange = new BABYLON.StandardMaterial("orange", scene);
    orange.diffuseTexture = new BABYLON.Texture("assets/img/orange.png", scene);
    orange.diffuseTexture.hasAlpha = true;
    orange.backFaceCulling = false;
    
    var cyan = new BABYLON.StandardMaterial("cyan", scene);
    cyan.diffuseTexture = new BABYLON.Texture("assets/img/cyan.png", scene);
    cyan.diffuseTexture.hasAlpha = true;
    cyan.backFaceCulling = false;
    var grey = new BABYLON.StandardMaterial("grey",scene);
    grey.alpha = 0.8;
    grey.diffuseColor = new BABYLON.Color3(127/255,127/255,127/255);

    return {
        red: red,
        purple: purple,
        green: green,
        blue: blue,
        yellow: yellow,
        orange: orange,
        cyan: cyan,
        grey: grey
    };
}
