import { Component, OnInit } from '@angular/core';
import { ConsoleComponent } from '../console/console.component';
import { RenderComponent } from '../render/render.component';
import { DescriptionComponent } from '../description/description.component';
import { IdeComponent } from '../ide/ide.component';

@Component({
  selector: 'app-level3',
  templateUrl: './level3.component.html',
  styleUrls: ['./level3.component.css']
})
export class Level3Component implements OnInit {
ideText: string;

    consoleResult: string = `
           Nothing to be done (all items are up-to-date).


-------------- Run: Debug in LearnIT (compiler: GNU GCC Compiler)---------------

    `;
    IdeGet(message: string): void {
        this.ideText = message;
        

    }

    ConsolePrint(message: string): void {
        this.consoleResult = message;
    }
  constructor() { }

  ngOnInit() {
  }

}
