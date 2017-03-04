import { Injectable, } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { LevelService } from './level.service';
import 'rxjs/add/operator/map'

@Injectable()
export class RenderService {
  
    constructor(private _http: Http, private levelService:LevelService) { }

    getData() {
        return this._http.get('https://learnit.fwd.wf/core/init/maze/' + this.levelService.level)
                    .map(res => res.json())
    }

    pushData(data: string, level: number) {
        switch(level){
            case 1:
                
                break;
            case 2:
            
                var params = {
                code: data
            };
            
                var paramsString = JSON.stringify(params);
                var serverSendData = paramsString.replace(/\\n/g, "\\n")
                                                    .replace(/\\'/g, "\\'")
                                                    .replace(/\\"/g, '\\"')
                                                    .replace(/\\&/g, "\\&")
                                                    .replace(/\\r/g, "\\r")
                                                    .replace(/\\t/g, "\\t")
                                                    .replace(/\\b/g, "\\b")
                                                    .replace(/\\f/g, "\\f");
                
                var headers = new Headers();
                headers.append('Content-Type', 'application/x-www-form-urlencoded');
                break;
        }
        return this._http.post('https://learnit.fwd.wf/core/run', serverSendData, {
                    headers: headers
                })
                
                    .map(res => res.json());
            
           
    }
}
