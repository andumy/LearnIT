import { Injectable } from '@angular/core';

@Injectable()
export class DataFetchService {
    data: any;

    addData(value: any)
    {
        this.data = value;
    }

    getData()
    {
        return this.data;
    }
  constructor() { }

}
