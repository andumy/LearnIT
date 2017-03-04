 import { ModuleWithProviders } from '@angular/core';
 import { Routes , RouterModule } from '@angular/router';

 import { AppComponent } from './app.component';
 import { Level1Component } from './level1/level1.component';
 import { Level2Component } from './level2/level2.component';
 import { ArrowsComponent } from './arrows/arrows.component';

 export const router: Routes= [
    //  { path: '', redirectTo: 'level1',pathMatch: 'full'},
     { path: '', component: Level1Component},
     { path: 'level2', component: Level2Component}
    
 ];

 export const routes: ModuleWithProviders = RouterModule.forRoot(router);