import { Component, Input, OnInit, OnChanges, EventEmitter, Output  } from '@angular/core';
import { Directive, Renderer, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { dataPCService } from '../data-pc.service';
import { DataFetchService } from '../data-fetch.service';
import { LevelService } from '../level.service'

import { ArrowListClass } from '../classes/arrowList';

export class Hero {
    top: Array<string>;    
}

@Component({
  selector: 'labyrinth-component',
  templateUrl: './labyrinth.component.html',
  styleUrls: ['./labyrinth.component.css']
})
export class LabyrinthComponent implements OnInit {  

    private subscription: Subscription;

    constructor(
        private dataPC: dataPCService,
        private dataTr: DataFetchService,
        private levelService: LevelService
    ) { }

    @Output() onFinish = new EventEmitter();

    dimensions: number = 10;

    cols: Array<Number> = new Array(this.dimensions);
    rows: Array<Number> = new Array(this.dimensions);  

    com: Array<string> = [];

    listMaze: Hero = {
        top: []
    };


    @Input() maze: any;

    @Input() lvl2: any;

    enter: string;
    exit: string;
    actual: string;
    itiration: number = 0;    

    ngOnChanges(changes: any) {
       
        if (this.maze != undefined) {
            if (this.levelService.level == 1) {
                this.maze = this.maze.input['matrix'];
                for (let i = 0; i < this.maze.length; i++) {
                    let list = "";
                    for (let j = 0; j < this.maze[i].length; j++) {
                        list = list + this.maze[i][j];
                    }
                    this.listMaze.top.push(list);
                }                
            } else if (this.levelService.level == 2) {
                if (this.itiration != 1) {
                    this.maze = this.maze.input['matrix'];
                    for (let i = 0; i < this.maze.length; i++) {
                        let list = "";
                        for (let j = 0; j < this.maze[i].length; j++) {
                            list = list + this.maze[i][j];
                        }
                        this.listMaze.top.push(list);
                    }  
                    this.itiration++;
                }
                              
            } else if (this.levelService.level == 3) {
                if (this.itiration != 1) {
                    this.maze = this.maze.input['matrix'];
                    for (let i = 0; i < this.maze.length; i++) {
                        let list = "";
                        for (let j = 0; j < this.maze[i].length; j++) {
                            list = list + this.maze[i][j];
                        }
                        this.listMaze.top.push(list);
                    }
                    this.itiration++;
                }

            }
            this.generateMaze();                        
        }  

        if (this.lvl2 != undefined) {
            this.com = [];

            for (let i = 0; i < this.lvl2.length; i++) {
                if (this.lvl2[i] == "1") {
                    this.com.push("up");
                } else if (this.lvl2[i] == "3") {
                    this.com.push("down");
                } else if (this.lvl2[i] == "2") {
                    this.com.push("right");
                } else if (this.lvl2[i] == "4") {
                    this.com.push("left");
                }
            }
            console.log(this.com);
            this.activateMaza();            
        }  
    }    

    ngOnInit() {
        this.subscription = this.dataPC.notifyObservable$.subscribe((res) => {            
            this.com = [];           
            if (this.levelService.level == 1) {
                for (let i = 0; i < res.length; i++) {
                    this.com.push(res[i].dir);
                }
            } 
            
            this.activateMaza();
        });                  
    };

    generateMaze() {
        for (let i = 0; i < this.dimensions; i++) {
            let row = this.listMaze.top[i].split("");
            for (let j = 0; j < this.dimensions; j++) {
                if (+row[j] == 1) {
                    document.getElementById("" + i + "" + j + "").style.border = "1px solid #aaaaaa";
                    document.getElementById("" + i + "" + j + "").style.backgroundColor = "#dddddd";
                }
                if (+row[j] == 2) {
                    this.enter = "" + i + "" + "" + j + "";
                } else if (+row[j] == 3) {
                    this.exit = "" + i + "" + "" + j + "";
                }
                if ((+row[j] == 0) && (+row[j] != 2) && (i == 0)) {
                    document.getElementById("" + i + "" + j + "").style.borderTop = "1px solid #aaaaaa";
                    document.getElementById("" + i + "" + j + "").style.backgroundColor = "#dddddd";
                }
            }
        }        
        document.getElementById("" + this.enter + "").classList.add("selected");
    }

    activateMaza() {        
        let matrix = [];
        for (let i = 0; i < this.dimensions; i++) {
            let row = this.listMaze.top[i].split("");
            matrix[i] = [];
            for (let j = 0; j < this.dimensions; j++) {
                matrix[i][j] = parseInt(row[j]);
            }
        }

        this.actual = this.enter;

        for (let i = 0; i < this.com.length; i++) {            
            this.forFunction(i,matrix);            
        }
        
    }

    forFunction(i, matrix) {       
        setTimeout(() => {
            console.log(i);
            if (this.com[i] == "right") {
                if ((matrix[parseInt(this.actual.split("")[0])][parseInt(this.actual.split("")[1]) + 1] == 0) || (matrix[parseInt(this.actual.split("")[0])][parseInt(this.actual.split("")[1]) + 1] == 3)) { 
                    document.getElementById("" + this.actual + "").classList.remove("selected");  
                    let changeId = this.actual.split("")[0] + (parseInt(this.actual.split("")[1]) + 1).toString();                    
                    document.getElementById("" + changeId + "").className += "selected";
                    this.actual = changeId;                                      
                }                
            } else if (this.com[i] == "left") {
                if (matrix[parseInt(this.actual.split("")[0])][parseInt(this.actual.split("")[1]) - 1] == 0) {
                    document.getElementById("" + this.actual + "").classList.remove("selected");
                    let changeId = this.actual.split("")[0] + (parseInt(this.actual.split("")[1]) - 1).toString();
                    document.getElementById("" + changeId + "").className += "selected";
                    this.actual = changeId;                    
                }
            } else if (this.com[i] == "up") {
                if (matrix[parseInt(this.actual.split("")[0]) - 1][parseInt(this.actual.split("")[1])] == 0) {
                    document.getElementById("" + this.actual + "").classList.remove("selected");
                    let changeId = (parseInt(this.actual.split("")[0]) - 1).toString() + this.actual.split("")[1].toString();
                    document.getElementById("" + changeId + "").className += "selected";
                    this.actual = changeId;                   
                }
            } else if (this.com[i] == "down") {
                if (matrix[parseInt(this.actual.split("")[0]) + 1][parseInt(this.actual.split("")[1])] == 0) {
                    document.getElementById("" + this.actual + "").classList.remove("selected");
                    let changeId = (parseInt(this.actual.split("")[0]) + 1).toString() + this.actual.split("")[1];
                    document.getElementById("" + changeId + "").className += "selected";
                    this.actual = changeId;
                }
            }
            if (i == this.com.length - 1) {
                this.endIt();
            }
        }, i*300)
    };

    endIt() {
        if (this.actual == this.exit) {            
            this.onFinish.emit(null);
        } else {           
            document.getElementById("" + this.actual + "").classList.remove("selected");
            this.actual = this.enter;
            document.getElementById("" + this.enter + "").classList.add("selected");
        }
    }
}
