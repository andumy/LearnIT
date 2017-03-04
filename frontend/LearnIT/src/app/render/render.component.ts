import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { RenderService } from "../render.service";
import { DataFetchService } from '../data-fetch.service';

@Component({
  selector: 'render-component',
  templateUrl: './render.component.html',
  styleUrls: ['./render.component.css'],
  providers: [RenderService]

})
export class RenderComponent implements OnInit {
    Run: string = "Run";
    getData: string;
    ideResult: string;
    @Output() consoleVal: EventEmitter<string> = new EventEmitter<string>();
    @Output() ideEm = new EventEmitter();

    constructor(private _httpService: RenderService, private dataTr: DataFetchService) { }

  ngOnInit() {
  }

  onGetServerData() {
      this._httpService.getData()
          .subscribe(
          data => this.getData = JSON.stringify(data),
          error => this.consoleVal.emit(error),
          );
     
  }
  onPushServerData() {
      this.ideEm.emit(null);
      this.ideResult = this.dataTr.getData();
      this.ideResult = this.oneLine(this.ideResult);
      
      this._httpService.pushData(this.ideResult)
          .subscribe(
          data => this.consoleVal.emit(data.output),
          error => this.consoleVal.emit(error),
      );
  }
  oneLine(text: string) {
      text = text.replace(`
`, '\n');
      console.log(text);
      return text;
  }
 
   
     
}
