import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { RenderService } from "../render.service";
import { DataFetchService } from '../data-fetch.service';
import { LevelService } from '../level.service'
import { dataPCService } from '../data-pc.service'


import { ArrowListClass } from '../classes/arrowList'; 


@Component({
    selector: 'render-component',
    templateUrl: './render.component.html',
    styleUrls: ['./render.component.css'],
    providers: [RenderService]

})
export class RenderComponent implements OnInit {
    levelDone: boolean = false;
    getData: string;
    ideResult: string;
    nextLevel: number;
    arrowResult: Array<ArrowListClass>;

    @Output() consoleVal: EventEmitter<string> = new EventEmitter<string>();
    @Output() ideEm = new EventEmitter();
    @Output() emitGetArrows = new EventEmitter();    
    @Output() emitSendMatrix = new EventEmitter();  

    constructor(
        private _httpService: RenderService,
        private dataTr: DataFetchService,
        private levelService: LevelService,
        private router: Router,
        private dataPC: dataPCService
    ) { }

    ngOnInit() {
        this.onGetServerData();                       
    }
    compile() {

        switch (this.levelService.level) {
            case 1:
                this.emitGetArrows.emit(null);
                this.arrowResult = this.dataTr.getData();
                this.dataPC.notifyOther(this.arrowResult);
                break;
            case 2:
                this.levelDone = false;
                console.log(this.levelDone);
                this.ideEm.emit(null);
                this.ideResult = this.dataTr.getData();
                this.onPushServerData(this.ideResult);
                break;
        }

        if (this.levelDone) {
            this.levelService.addlevel()
            this.nextLevel = this.levelService.level;
            this.router.navigate(['/level' + this.nextLevel]);
        }

    }
    onGetServerData() {
        this._httpService.getData()
            .subscribe(
            data => this.getData = data,
            error => this.consoleVal.emit(error),
        );

    }
    onPushServerData(dataSent: string) {
        this._httpService.pushData(dataSent, this.levelService.level)
            .subscribe(
            data => this.consoleVal.emit(data.output),
            error => this.consoleVal.emit(error),
        );
    }
}