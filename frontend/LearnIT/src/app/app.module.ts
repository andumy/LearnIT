import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CodemirrorModule } from 'ng2-codemirror';
import { routes } from './app.router';


import { AppComponent } from './app.component';
import { LabyrinthComponent } from './labyrinth/labyrinth.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { IdeComponent } from './ide/ide.component';
import { ConsoleComponent } from './console/console.component';
import { RenderComponent } from './render/render.component';
import { DescriptionComponent } from './description/description.component';
import { ArrowsComponent } from './arrows/arrows.component';
import { DataFetchService } from './data-fetch.service';
import { LevelService } from './level.service';
import { dataPCService } from './data-pc.service';
import { Level1Component } from './level1/level1.component';
import { Level2Component } from './level2/level2.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SideMenuComponent,
    IdeComponent,
    ConsoleComponent,
    RenderComponent,
    DescriptionComponent,
    ArrowsComponent,
    LabyrinthComponent,
    Level1Component,
    Level2Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CodemirrorModule,
    routes
  ],
  providers: [DataFetchService, LevelService, dataPCService],
  bootstrap: [AppComponent]
})
export class AppModule { }
