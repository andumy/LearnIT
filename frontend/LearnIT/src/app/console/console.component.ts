import { Component, OnInit ,Input } from '@angular/core';

@Component({
  selector: 'console-component',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})


export class ConsoleComponent implements OnInit {
  
   @Input() textConsole: string ;


  constructor() { }

  ngOnInit() {
  }

}
