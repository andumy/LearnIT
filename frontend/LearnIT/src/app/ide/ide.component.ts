import { Component, Input ,OnInit } from '@angular/core';
import 'codemirror/mode/clike/clike';
@Component({
  selector: 'ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.css']
})
export class IdeComponent implements OnInit {
    conf: any;
    constructor() {
        this.conf = {
            lineNumbers: true,
            mode: "text/x-csrc",
            matchBrackets: true
        }; 
    }

  ngOnInit() {
  }
   

}
