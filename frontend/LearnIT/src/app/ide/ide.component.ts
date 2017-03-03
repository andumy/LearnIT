import { Component, Output, EventEmitter ,OnInit } from '@angular/core';
import 'codemirror/mode/clike/clike';
@Component({
  selector: 'ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.css']
})
export class IdeComponent implements OnInit {

    @Output() ideEmiter: EventEmitter<string> = new EventEmitter<string>();
    content: string ;
    conf: any;
    
    constructor() {
        this.conf = {
            lineNumbers: true,
            mode: "text/x-csrc",
            matchBrackets: true
        }; 
    }
    
    emitIde() {
        console.log("2");
        this.ideEmiter.emit(this.content);
    }
  ngOnInit() {
  }
   

}
