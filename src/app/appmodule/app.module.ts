import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {PokemonModule} from "../pokemonmodule/pokemonmodule.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, PokemonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
