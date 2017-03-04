import { Component, Output, EventEmitter ,OnInit } from '@angular/core';
import { DataFetchService } from '../data-fetch.service';
import 'codemirror/mode/clike/clike';

@Component({
  selector: 'ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.css']
})
export class IdeComponent implements OnInit {

   content: string;
    conf: any;
    
    constructor(private dataTr: DataFetchService) {
        
        this.conf = {
            lineNumbers: true,
            mode: "text/x-csrc",
            matchBrackets: true
        }; 
    }
    
    emitIde() {
        this.dataTr.addData(this.content);
    }
  ngOnInit() {
  }
   

}
