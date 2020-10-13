import { Component, OnInit } from '@angular/core';
import {PokemonService} from '../shared/services/pokemon.service';
import {Pokemon} from '../shared/models/models';

@Component({
  selector: 'app-zoekgebied',
  templateUrl: './zoekgebied.component.html',
  styleUrls: ['./zoekgebied.component.css']
})
export class ZoekgebiedComponent implements OnInit {

  latestFound: Pokemon;
  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
  }

  find(): void {
    this.pokemonService.getPokemon()
      .subscribe(
        (data) => {
          console.log(`Pokémon gevonden!`);
          this.latestFound = data;

          // check of hij al eerder gevonden is?
          // of Set maken met daarin -alle- gevangen
          // pokemon namen + aantal erbij?
          // (dus niet als extra prop van Pokemon)

          this.pokemonService.collectie.push(data);
        }
      );
  }

}
