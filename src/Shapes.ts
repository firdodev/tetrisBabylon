import * as BABYLON from "@babylonjs/core";
import * as UTILS from "./utils";

export class Shape{
    private I = [
        [
        [1,1,1,1],
        ],
        [
        [1],
        [1],
        [1],
        [1],
        ],
        [
        [1,1,1,1],
        ],
        [
        [1],
        [1],
        [1],
        [1],
        ]
    ]
    private J = [
        [
        [1,1],
        [1,0],
        [1,0],
        ],
        [
        [1,0,0],
        [1,1,1],
        ],
        [
        [0,1],
        [0,1],
        [1,1],
        ],
        [
        [1,1,1],
        [0,0,1],
        ],
    ]
    private L = [
        [
        [1,0],
        [1,0],
        [1,1],
        ],
        [
        [0,0,1],
        [1,1,1],
        ],
        [
        [1,1],
        [0,1],
        [0,1],
        ],
        [
        [1,1,1],
        [1,0,0],
        ],
    ]
    private O = [
        [
        [1,1],
        [1,1],
        ],
        [
        [1,1],
        [1,1],
        ],
        [
        [1,1],
        [1,1],
        ],
        [
        [1,1],
        [1,1],
        ]
    ]
    private S = [
        [
        [1,0],
        [1,1],
        [0,1],
        ],
        [
        [0,1,1],
        [1,1,0],
        ],
        [
        [1,0],
        [1,1],
        [0,1],
        ],
        [
        [0,1,1],
        [1,1,0],
        ],
    ]
    private Z = [
        [
        [0,1],
        [1,1],
        [1,0],
        ],
        [
        [1,1,0],
        [0,1,1],
        ],
        [
        [0,1],
        [1,1],
        [1,0],
        ],
        [
        [1,1,0],
        [0,1,1],
        ],
    ]
    private B = [
        [
        [0,1],
        [1,1],
        [0,1],
        ],
        [
        [1,1,1],
        [0,1,0],
        ],
        [
        [1,0],
        [1,1],
        [1,0],
        ],
        [
        [0,1,0],
        [1,1,1],
        ],
    ]

    public shapes = new Array(this.Z,this.S,this.L,this.J,this.I,this.B,this.O);


    public random_num: any;
    public second_num: any;
    private first_instance: boolean = false;
    public shape: any;
    private current_shape: any;
    public color: any;
    private color2: any;
    public current_index: any;
    public runningshapes = []
    private runningNextshapes = []
    public canMoveDown: boolean;
    public canMoveLeft: boolean;
    public canMoveRight: boolean;

    private scene: BABYLON.Scene;
    constructor(scene: BABYLON.Scene){
        this.scene = scene;
    }

    public spawnShape(){
        if (this.first_instance == false){
            this.first_instance = true
            this.random_num = Math.round(UTILS.getRandomInt(0, 6));
            this.second_num = Math.round(UTILS.getRandomInt(0, 6));
        }
        else{
            this.random_num = this.second_num;
            this.second_num = Math.round(UTILS.getRandomInt(0, 6));
        }
        // random_number = Math.round(getRandomArbitrary(0, 6));
        var usingShape = this.shapes[this.random_num][0];
        if (this.random_num == 0){
            this.color = UTILS.Colors(this.scene).red;
        }
        else if (this.random_num ==1){
            this.color = UTILS.Colors(this.scene).green;
        }
        else if (this.random_num ==2){
            this.color = UTILS.Colors(this.scene).orange;
        }
        else if (this.random_num ==3){
            this.color = UTILS.Colors(this.scene).blue;
        }
        else if (this.random_num ==4){
            this.color = UTILS.Colors(this.scene).cyan;
        }
        else if (this.random_num ==5){
            this.color = UTILS.Colors(this.scene).purple;
        }
        else if (this.random_num ==6){
            this.color = UTILS.Colors(this.scene).yellow;
        }
        this.current_index = 0
        this.runningshapes = []
        for (let i=0;i<usingShape.length;i++){
            for (let j = 0; j < usingShape[0].length; j++) {
                if (usingShape[i][j] == 1) {
                    this.shape = BABYLON.MeshBuilder.CreateBox("box", {width: 1, height: 1, depth: 1});
                    this.shape.position = new BABYLON.Vector3(i, -j, 50);
                    this.shape.material = this.color;
                    this.runningshapes.push(this.shape);
                }
            }
        }
        this.nextShapeDraw()
        // curr_shape = shape
    }

    nextShapeDraw(){
        if (this.first_instance == false){
            this.first_instance = true
            var usingNextShape = this.shapes[this.random_num][0];
            if (this.random_num == 0){
                this.color2 = UTILS.Colors(this.scene).red;
            }
            else if (this.random_num ==1){
                this.color2 = UTILS.Colors(this.scene).green;
            }
            else if (this.random_num ==2){
                this.color2 = UTILS.Colors(this.scene).orange;
            }
            else if (this.random_num ==3){
                this.color2 = UTILS.Colors(this.scene).blue;
            }
            else if (this.random_num ==4){
                this.color2 = UTILS.Colors(this.scene).cyan;
            }
            else if (this.random_num ==5){
                this.color2 = UTILS.Colors(this.scene).purple;
            }
            else if (this.random_num ==6){
                this.color2 = UTILS.Colors(this.scene).yellow;
            }
            this.current_index = 0
            this.runningshapes = []
            for (let i=0;i<usingNextShape.length;i++){
                for (let j = 0; j < usingNextShape[0].length; j++) {
                    if (usingNextShape[i][j] == 1) {
                        this.shape = BABYLON.MeshBuilder.CreateBox("box", {width: 1, height: 1, depth: 1});
                        this.shape.position = new BABYLON.Vector3(i, -j, 50);
                        this.shape.material = this.color2;
                        this.runningshapes.push(this.shape);
                    }
                }
            }
        }
        else{
            for (let u=0;u<this.runningNextshapes.length;u++){
                this.runningNextshapes[u].dispose()
            }
            var usingNextShape = this.shapes[this.second_num][0];
            if (this.second_num == 0){
                this.color2 = UTILS.Colors(this.scene).red;
            }
            else if (this.second_num ==1){
                this.color2 = UTILS.Colors(this.scene).green;
            }
            else if (this.second_num ==2){
                this.color2 = UTILS.Colors(this.scene).orange;
            }
            else if (this.second_num ==3){
                this.color2 = UTILS.Colors(this.scene).blue;
            }
            else if (this.second_num ==4){
                this.color2 = UTILS.Colors(this.scene).cyan;
            }
            else if (this.second_num ==5){
                this.color2 = UTILS.Colors(this.scene).purple;
            }
            else if (this.second_num ==6){
                this.color2 = UTILS.Colors(this.scene).yellow;
            }
            this.current_index = 0;
            this.runningNextshapes = [];
            for (let i=0;i<usingNextShape.length;i++){
                for (let j = 0; j < usingNextShape[0].length; j++) {
                    if (usingNextShape[i][j] == 1) {
                        this.shape = BABYLON.MeshBuilder.CreateBox("box", {width: 1, height: 1, depth: 1});
                        this.shape.position = new BABYLON.Vector3(-10+i, -j, 50);
                        this.shape.material = this.color2
                        this.runningNextshapes.push(this.shape);
                    }
                }
            }            
        }
    }
}