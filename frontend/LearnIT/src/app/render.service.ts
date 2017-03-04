import { Injectable, } from '@angular/core';
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/map'

@Injectable()
export class RenderService {
  
    constructor(private _http: Http) { }

    getData() {
        return this._http.get('https://learnit.fwd.wf/core/run')
                    .map(res => res.json())
    }

    pushData(data: string) {
        var params = '{"code":\"'+ data +'"}';
        console.log(params);
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post('https://learnit.fwd.wf/core/run', params, {
            headers: headers
        })
            .map(res => res.json());
    }
}
