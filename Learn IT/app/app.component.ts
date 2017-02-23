import {Component} from 'angular2/core';
import {SidemenuComponent} from './sideMenu.component';
import {HeaderComponent} from './header.component';

@Component({
    selector: 'my-app',
   templateUrl: 'app/app.component.html', 
   styleUrls: ['app/app.component.css'],
   directives: [HeaderComponent , SidemenuComponent]
})

export class AppComponent {
    
}