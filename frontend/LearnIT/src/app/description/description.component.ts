import { Component, Output, EventEmitter ,OnInit } from '@angular/core';
import { DataFetchService } from '../data-fetch.service';

@Component({
  selector: 'descriptioncmp',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

    descriptionData: string ;
    content: string;
    conf: any;
    
    constructor(private dataTr: DataFetchService) { }
    
    emDesc(){
        this.descriptionData = this.dataTr.getData();
    }
 

  ngOnInit() {
  }

}
