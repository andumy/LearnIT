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
    levelDone:boolean = false;
    getData: string;
    outData: string;
    ideResult: string;
    nextLevel: number;

    @Output() consoleVal: EventEmitter<string> = new EventEmitter<string>();
    @Output() ideEm = new EventEmitter();
    @Output() ideRec = new EventEmitter();
    @Output() descEm = new EventEmitter();
    constructor(
        private _httpService: RenderService, 
        private dataTr: DataFetchService, 
        private levelService:LevelService, 
        private router: Router
        ) {
             
         }

  ngOnInit() {
    this.onGetServerData();
    setTimeout(() => {
        switch(this.levelService.level){
            case 1:
                this.dataTr.addData(this.getData['description']);
                this.descEm.emit(null);
            break;

            case 2:
                this.dataTr.addData(this.getData['description']);
                this.descEm.emit(null);
                this.dataTr.addData(this.getData['framework']);
                this.ideRec.emit(null);
            break;

            case 3:
                this.dataTr.addData(this.getData['description']);
                this.descEm.emit(null);
                this.dataTr.addData(this.getData['framework']);
                this.ideRec.emit(null);
            break;

        }
                
                }, 1000);
  }
  compile(){
    
    switch(this.levelService.level){
        case 1:
        this.levelDone = true; 
            this.newLevel();
        break;
        
        case 2:
            this.ideEm.emit(null);
            this.ideResult = this.dataTr.getData();
            
            this.onPushServerData(this.ideResult);
           
            setTimeout(() => {
                 
                this.consoleVal.emit(this.outData);
                if(this.outData == "Hello") this.levelDone = true;
                {
                   
                    this.newLevel();
                }
                }, 2000);
            
        break;    

        case 3:
            this.ideEm.emit(null);
            this.ideResult = this.dataTr.getData();
            
            this.onPushServerData(this.ideResult);
           
            setTimeout(() => {
                
                this.consoleVal.emit(this.outData);
                if(this.outData == "Hello") this.levelDone = true;
                {
                   
                    this.newLevel();
                }
                }, 2000);
        break;
    }
    
            
            

  }

  newLevel()
  {
    if(this.levelDone){
                this.levelService.addlevel()
                this.nextLevel = this.levelService.level;
                this.router.navigate(['/level'+this.nextLevel]);
                this.levelDone = false;
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
          data => this.outData = data.output,
          error => this.consoleVal.emit(error),
      );
  }
  
 
   
     
}
