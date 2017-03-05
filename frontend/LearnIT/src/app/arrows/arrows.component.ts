import { Component, OnInit } from '@angular/core';
import { DataFetchService } from '../data-fetch.service';

import { ArrowListClass } from '../classes/arrowList';

@Component({
    selector: 'arrows-component',
    templateUrl: './arrows.component.html',
    styleUrls: ['./arrows.component.css']
})

export class ArrowsComponent implements OnInit {

    constructor(private dataTr: DataFetchService) { }

    ngOnInit() {
    }

    position: number = 0;
    arrowList: Array<ArrowListClass> = []; 
    arrowListSec: Array<ArrowListClass> = [];   
    i:number = 0;

    clicked(direction) {    
        console.log(this.arrowList);
        this.arrowList.push({
            pos:this.i,
            dir:direction
        });    
        this.i++;
    }

    emitArrows() {        
        this.dataTr.addData(this.arrowList);
    }

    destroy(id){
        this.arrowListSec = this.arrowList;
        this.arrowList = [];
        this.arrowListSec.splice(id,1);
        this.arrowList = this.arrowListSec;
        console.log(this.arrowList);
        this.arrowListSec = [];
    }
}
