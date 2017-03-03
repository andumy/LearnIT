import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
    consoleResult: string = "initial log from parent";

    onNotify(message: string) {
        alert(message);
    }
    

}
