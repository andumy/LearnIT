import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RenderService } from "../render.service";
import { DataFetchService } from '../data-fetch.service';
import { LevelService } from '../level.service'

@Component({
  selector: 'render-component',
  templateUrl: './render.component.html',
  styleUrls: ['./render.component.css'],
  providers: [RenderService]

})
export class RenderComponent implements OnInit {
    levelDone:boolean = true;
    getData: string;
    ideResult: string;
    nextLevel: number;

    @Output() consoleVal: EventEmitter<string> = new EventEmitter<string>();
    @Output() ideEm = new EventEmitter();

    constructor(
        private _httpService: RenderService, 
        private dataTr: DataFetchService, 
        private levelService:LevelService, 
        private router: Router
        ) { }

  ngOnInit() {
      this.onGetServerData();
      console.log(this.getData);
     // document.getElementById("nextLevel").style.pointerEvents = "none";
  }
  compile(){
    
    switch(this.levelService.level){
        case 1:
            console.log(this.levelDone);
            break;
        case 2:
            this.levelDone = false;
            console.log(this.levelDone);
            this.ideEm.emit(null);
            this.ideResult = this.dataTr.getData();
            this.onPushServerData(this.ideResult);
        break;    
    }

            if(this.levelDone){
                this.levelService.addlevel()
                this.nextLevel = this.levelService.level;
                this.router.navigate(['/level'+this.nextLevel]);
            }   
            

  }
  onGetServerData() {
      this._httpService.getData()
          .subscribe(
          data => this.getData = data,
          error => this.consoleVal.emit(error),
          );
     
  }
  onPushServerData(dataSent:string) {
      
      this._httpService.pushData(dataSent , this.levelService.level)
          .subscribe(
          data => this.consoleVal.emit(data.output),
          error => this.consoleVal.emit(error),
      );
  }
  
 
   
     
}
