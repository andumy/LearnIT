import { Component, OnInit } from '@angular/core';
import { Directive, Renderer, ElementRef } from '@angular/core';

export class Hero {
    top: Array<string>;    
}

@Component({
  selector: 'labyrinth-component',
  templateUrl: './labyrinth.component.html',
  styleUrls: ['./labyrinth.component.css']
})
export class LabyrinthComponent implements OnInit {

    constructor() { }

    dimensions: number = 10;

    cols: Array<Number> = new Array(this.dimensions);
    rows: Array<Number> = new Array(this.dimensions);

    enter: string;
    exit: string;
    actual: string;

    j: Hero = {
        top: [
            "1111111111", "2000000011", "1011111001", "1000001111", "1011101111", "1010000011", "1010111003", "1110000001", "1111111111", "1111111111"
        ]
    };

    m: Array<string> = ["Top", "Bottom", "Bottom", "Right","Left"];
    

    ngOnInit() { 

        setTimeout(() => {                      

            for (let i = 0; i < this.dimensions; i++) {
                let row = this.j.top[i].split("");                             
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

            let matrix = [];
            for (let i = 0; i < this.dimensions; i++) {
                let row = this.j.top[i].split("");
                matrix[i] = []; 
                for (let j = 0; j < this.dimensions; j++) {
                    matrix[i][j] = parseInt(row[j]);
                }
            }

            this.actual = this.enter;

            for (let i = 0; i < this.m.length; i++) {
                if (this.m[i] == "Right") {
                    if (matrix[parseInt(this.actual.split("")[0])][parseInt(this.actual.split("")[1])+1] == 0) {
                        document.getElementById("" + this.actual + "").classList.remove("selected");
                        let changeId = this.actual.split("")[0] + (parseInt(this.actual.split("")[1]) + 1).toString();
                        document.getElementById("" + changeId + "").classList.add("selected");
                        this.actual = changeId;
                       
                    }
                } else if (this.m[i] == "Left") {
                    if (matrix[parseInt(this.actual.split("")[0])][parseInt(this.actual.split("")[1]) - 1] == 0) {
                        document.getElementById("" + this.actual + "").classList.remove("selected");
                        let changeId = this.actual.split("")[0] + (parseInt(this.actual.split("")[1]) - 1).toString();
                        document.getElementById("" + changeId + "").classList.add("selected");
                        this.actual = changeId;
                       
                    }
                } else if (this.m[i] == "Top") {
                    if (matrix[parseInt(this.actual.split("")[0])-1][parseInt(this.actual.split("")[1])] == 0) {
                        document.getElementById("" + this.actual + "").classList.remove("selected");
                        let changeId = (parseInt(this.actual.split("")[0])-1).toString() + this.actual.split("")[1].toString();
                        document.getElementById("" + changeId + "").classList.add("selected");
                        this.actual = changeId;
                        
                    }
                } else if (this.m[i] == "Bottom") {
                    if (matrix[parseInt(this.actual.split("")[0])+1][parseInt(this.actual.split("")[1])] == 0) {
                        document.getElementById("" + this.actual + "").classList.remove("selected");
                        let changeId = (parseInt(this.actual.split("")[0])+1).toString() + this.actual.split("")[1];
                        document.getElementById("" + changeId + "").classList.add("selected");
                        this.actual = changeId;
                        
                    }
                }
            }

        }, 10);          
    };   

    
    
}
