import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RenderService } from "../render.service";

@Component({
  selector: 'render-component',
  templateUrl: './render.component.html',
  styleUrls: ['./render.component.css'],
  providers: [RenderService]
})
export class RenderComponent implements OnInit {
    Run: string = "Run";
    consoleData: string;

    @Output() consoleVal: EventEmitter<string> = new EventEmitter<string>();
    
    constructor(private _httpService: RenderService,) { }

  ngOnInit() {
  }

  onTestGet() {
      
      this._httpService.getData()
          .subscribe(
          data => this.Run = JSON.stringify(data),
          error => alert(error),
          () => console.log("finished")
          );
      
      
  }
}
