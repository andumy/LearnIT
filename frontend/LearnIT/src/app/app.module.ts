import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CodemirrorModule } from 'ng2-codemirror';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { IdeComponent } from './ide/ide.component';
import { ConsoleComponent } from './console/console.component';
import { RenderComponent } from './render/render.component';
import { DescriptionComponent } from './description/description.component';
import { ArrowsComponent } from './arrows/arrows.component';
import { DataFetchService } from './data-fetch.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SideMenuComponent,
    IdeComponent,
    ConsoleComponent,
    RenderComponent,
    DescriptionComponent,
    ArrowsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CodemirrorModule
  ],
  providers: [DataFetchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
