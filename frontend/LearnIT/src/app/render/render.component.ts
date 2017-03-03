import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { RenderService } from "../render.service";

@Component({
  selector: 'render-component',
  templateUrl: './render.component.html',
  styleUrls: ['./render.component.css'],
  providers: [RenderService]
})
export class RenderComponent implements OnInit {
    Run: string = "Run";

    @Input() ideResult: string;
    @Output() consoleVal: EventEmitter<string> = new EventEmitter<string>();
    @Output() ideEm = new EventEmitter();

    constructor(private _httpService: RenderService) { }

  ngOnInit() {
  }

  onGetServerData() {
      this._httpService.getData()
          .subscribe(
          //data => this.consoleVal.emit(data.output),
          error => this.consoleVal.emit(error),
          );
     
  }
  onPushServerData() {
      console.log("1");
      this.ideEm.emit(null);
      this._httpService.pushData(this.ideResult)
          .subscribe(
          data => this.consoleVal.emit(data.output),
          error => this.consoleVal.emit(error),
      );
  }

 
   
     
}
