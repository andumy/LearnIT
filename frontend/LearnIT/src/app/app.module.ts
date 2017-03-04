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
    LabyrinthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CodemirrorModule,
    routes
  ],
  providers: [DataFetchService , LevelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
