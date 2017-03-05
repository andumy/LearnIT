import { Component, OnInit } from '@angular/core';
import { ConsoleComponent } from '../console/console.component';
import { RenderComponent } from '../render/render.component';
import { DescriptionComponent } from '../description/description.component';
import { ArrowsComponent } from '../arrows/arrows.component';

@Component({
  selector: 'app-level1',
  templateUrl: './level1.component.html',
  styleUrls: ['./level1.component.css']
})
export class Level1Component implements OnInit {
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
