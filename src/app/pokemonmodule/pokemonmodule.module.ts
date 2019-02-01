import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonComponent } from "./pokemonapp.component";
import { WorldComponent } from './world/world.component';
import { AvatarComponent } from './avatar/avatar.component';
import { LibraryComponent } from './library/library.component';
import { DetailComponent } from './library/detail/detail.component';
import {PokemonService} from "../../shared/services/pokemonservice";
import {HttpClientModule} from "@angular/common/http";
import {DataViewModule} from "primeng/dataview";
import {ButtonModule} from "primeng/button";
import {DropdownModule, FileUploadModule, TooltipModule} from "primeng/primeng";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Nametransform} from "../../shared/pipes/nametransform";
import {DatumFormatter} from "../../shared/pipes/datumformatter";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    DataViewModule,
    ButtonModule,
    TooltipModule,
    DropdownModule,
    BrowserAnimationsModule,
    FileUploadModule,
    FormsModule
  ],
  declarations: [
    PokemonComponent,
    WorldComponent,
    AvatarComponent,
    LibraryComponent,
    DetailComponent,
    Nametransform,
    DatumFormatter
  ],
  exports: [
    PokemonComponent,
    WorldComponent,
    AvatarComponent,
    LibraryComponent,
    DetailComponent
  ],
  providers: [
    // PokemonService
  ]
})
export class PokemonModule { }
