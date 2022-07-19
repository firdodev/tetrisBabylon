import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import * as BABYLON from "@babylonjs/core"

import * as UTILS from "./utils";
import { Shape } from "./Shapes";

export class MainGame{
    private scene;
    private Shape: Shape;


    private timeStep = 0;
    private timeCheck = 60;


    private Map = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    constructor(scene: BABYLON.Scene){
        this.scene = scene;
        this.Shape = new Shape(this.scene);
        this.drawGrid();
        this.Shape.spawnShape();
    }

    private drawGrid(){
        for(let i = 0; i < this.Map.length -1; i++){
            for(let j = 0; j < this.Map[0].length; j++){
                let box = BABYLON.MeshBuilder.CreateBox("box",{width: 1, height: 1, depth: 0.5});
                box.position = new BABYLON.Vector3(j, -i, 50);
                // box.material = UTILS.Colors(this.scene).cyan;
                box.material = UTILS.Colors(this.scene).grey;
                box.visibility = 0.5;
                if(this.Map[i][j] == 1){
                    let mat = new BABYLON.StandardMaterial("mat", this.scene);
                    mat.diffuseColor = new BABYLON.Color3(0, 1, 0);
                    box.material = mat;
                }
            }
        }
    }
    private removeRow(row){
        for(let i=0;i<this.Map[0].length;i++){
            this.Map[row][i].dispose()
            this.Map[row][i] = 0
        }
        // if (scoreMultiplier < 3){
        //     scoreMultiplier+=1
        //     score += POINTS[0] * scoreMultiplier
        // }
        // else{
        //     score += 200
        //     scoreMultiplier = 0
        // }
        this.moveDown(this.Map, row)
    }

    private rotateShape(currXpos, currYpos){
        this.Shape.current_index += 1
        for (let x=0;x<this.Shape.runningshapes.length;x++){
            this.Shape.runningshapes[x].dispose()
        }
        if (this.Shape.current_index <= 3){
            let usingShape = this.Shape.shapes[this.Shape.random_num][this.Shape.current_index];
            this.Shape.runningshapes = []
            for (let i=0;i<usingShape.length;i++){
                for (let j = 0; j < usingShape[0].length; j++) {
                    if (usingShape[i][j] == 1) {
                        this.Shape.shape = BABYLON.MeshBuilder.CreateBox("box", {width: 1, height: 1, depth: 1});
                        this.Shape.shape.position = new BABYLON.Vector3(i-currXpos, -j+currYpos, 50);
                        this.Shape.shape.material = this.Shape.color
                        this.Shape.runningshapes.push(this.Shape.shape);
                    }
                }
            }            
        }
        else{
            let usingShape = this.Shape.shapes[this.Shape.random_num][0];
            this.Shape.current_index = 0
            this.Shape.runningshapes = []
            for (let i=0;i<usingShape.length;i++){
                for (let j = 0; j < usingShape[0].length; j++) {
                    if (usingShape[i][j] == 1) {
                        this.Shape.shape = BABYLON.MeshBuilder.CreateBox("box", {width: 1, height: 1, depth: 1});
                        this.Shape.shape.position = new BABYLON.Vector3(i-currXpos, -j+currYpos, 50);
                        this.Shape.shape.material = this.Shape.color
                        this.Shape.runningshapes.push(this.Shape.shape);
                    }
                }
            }  
        }

    }

    private moveDown(map, row){
        for(let i=row;i>0;i--){
            for(let j=0;j<map[0].length;j++){
                if (map[i][j] !== 0){
                    map[i][j].position.y -= 1
                    map[i + 1][j] = map[i][j]
                    map[i][j] = 0 
                }
            }
        }  
    }

    private checkRows(){
        for (let i=0;i<this.Map.length-1;i++){
            let result = this.Map[i].every(element => {
                if (element !== 0) {
                    return true;
                }
            });  
            if (result == true){
                this.removeRow(i)
            }        
        }
                    
    }

    public update(){
        if(this.timeStep >= this.timeCheck){
            for (let b=0;b<this.Map[0].length;b++){
                // if (this.Map[0][b] !== 0){
                //     location.replace("GameOver.html"+"?val="+score);
                // }
            }
            for (let i=0;i<this.Shape.runningshapes.length;i++){
                if (this.Map[this.Shape.runningshapes[i].position.y / -1 + 1][this.Shape.runningshapes[i].position.x] !== 0){
                    for(let i=0;i<this.Shape.runningshapes.length;i++){
                        this.Map[this.Shape.runningshapes[i].position.y / -1][this.Shape.runningshapes[i].position.x] = this.Shape.runningshapes[i]
                    }
                    this.Shape.canMoveDown = false
                    this.Shape.spawnShape()
                    this.checkRows()
                }
                else{
                    this.Shape.canMoveDown = true
                }                 
            }
            if (this.Shape.canMoveDown == true){
                for(let i=0;i<this.Shape.runningshapes.length;i++){
                    this.Shape.runningshapes[i].position.y -= 1
                } 
                this.Shape.canMoveDown = false               
            }

            this.timeStep = 0;
        }
        this.timeStep++;
    }

    keyDown(ev){
        if (ev.keyCode == 65){ 
            for (let i=0;i<this.Shape.runningshapes.length; i++){
                if (this.Shape.runningshapes[i].position.x <= 0){
                    return
                }
                else{
                    for (let i=0;i<this.Shape.runningshapes.length;i++){
                        let result = this.Shape.runningshapes.every(element => {
                            if (this.Map[element.position.y / -1][element.position.x - 1] == 0) {
                                return true;
                            }
                        });
                    if (result == true){
                        for(let i=0;i<this.Shape.runningshapes.length;i++){
                            this.Shape.runningshapes[i].position.x -= 1
                            if (this.Shape.runningshapes.length-1 ===i){
                                return
                            }
                        }
                    }
                    }                   
                }
            }                           
        }
        else if (ev.keyCode == 68){
            for (let i=0;i<this.Shape.runningshapes.length; i++){
                if (this.Shape.runningshapes[i].position.x >= 9){
                    return
                }
                else{
                    for (let i=0;i<this.Shape.runningshapes.length;i++){
                        let result = this.Shape.runningshapes.every(element => {
                            if (this.Map[element.position.y / -1][element.position.x + 1] == 0) {
                                return true;
                            }
                        });
                    if (result == true){
                        for(let i=0;i<this.Shape.runningshapes.length;i++){
                            this.Shape.runningshapes[i].position.x += 1
                            if (this.Shape.runningshapes.length-1 ===i){
                                return
                            }
                        }
                    }                
                    }                    
                }
            }
        }
        if (ev.keyCode == 83){
            let counter = 10
            this.timeStep += counter 
        }
        if (ev.key == "r"){
            this.rotateShape(this.Shape.runningshapes[0].position.x /-1, this.Shape.runningshapes[0].position.y)
        }
    }



}