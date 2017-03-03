import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
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

}
