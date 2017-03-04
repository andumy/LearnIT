import { Injectable } from '@angular/core';

@Injectable()
export class LevelService {
  level:number = 1;

  constructor() { }
  addlevel(){
    this.level++;
  }
}
