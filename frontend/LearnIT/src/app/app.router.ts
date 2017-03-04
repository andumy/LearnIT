 import { ModuleWithProviders } from '@angular/core';
 import { Routes , RouterModule } from '@angular/router';

 import { AppComponent } from './app.component';
 import { IdeComponent } from './ide/ide.component';
 import { ArrowsComponent } from './arrows/arrows.component';

 export const router: Routes= [
    //  { path: '', redirectTo: 'level1',pathMatch: 'full'},
     { path: '', component: ArrowsComponent},
     { path: 'level2', component: IdeComponent}
    
 ];

 export const routes: ModuleWithProviders = RouterModule.forRoot(router);