import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map'

@Injectable()
export class RenderService {
  
    constructor(private _http: Http) { }

    getData() {
        return this._http.get('http://127.0.0.1:8000/core/run')
                    .map(res => res.json())
    }

    postJSON() {

    }
}
