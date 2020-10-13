import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ZoekgebiedComponent } from './zoekgebied/zoekgebied.component';
import { OverzichtComponent } from './overzicht/overzicht.component';
import { QuizComponent } from './quiz/quiz.component';
import {routes} from './app.routes';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { InitcapPipe } from './initcap.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ZoekgebiedComponent,
    OverzichtComponent,
    QuizComponent,
    InitcapPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
