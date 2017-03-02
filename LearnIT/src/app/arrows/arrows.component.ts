import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'arrows-component',
  templateUrl: './arrows.component.html',
  styleUrls: ['./arrows.component.css']
})
export class ArrowsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  arrowList: Array<string> = [];    

  clicked(direction){      
    this.arrowList.push(direction);  
  }
}
