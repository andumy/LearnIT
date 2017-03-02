import { Component, OnInit } from '@angular/core';

export class ArrowListClass{
  pos: number;
  dir: string;
}

@Component({
  selector: 'arrows-component',
  templateUrl: './arrows.component.html',
  styleUrls: ['./arrows.component.css']
})

export class ArrowsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  position:number=0;
  arrowList: Array<ArrowListClass> = []; 
  arrowListSec: Array<ArrowListClass> = [];   
  i:number = 0;

  clicked(direction){      
    this.arrowList.push({
      pos:this.i,
      dir:direction
    });    
    this.i++;
  }

  destroy(id){
    this.arrowListSec = this.arrowList;
    this.arrowList = [];
    this.arrowListSec.splice(id,1);
    this.arrowList = this.arrowListSec;
    this.arrowListSec = [];
  }
}
