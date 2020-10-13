import { Component, OnInit } from '@angular/core';
import {Pokemon} from '../shared/models/models';
import {PokemonService} from '../shared/services/pokemon.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-overzicht',
  templateUrl: './overzicht.component.html',
  styleUrls: ['./overzicht.component.css']
})
export class OverzichtComponent implements OnInit {

  defaultFoto = "https://i.ytimg.com/vi/DzZSAW8d8gk/maxresdefault.jpg";
  selectedPokemon: Pokemon;
  currentFoto: string;
  teller: number = 0;

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (data) => {
        if (data.naam) {
          console.log('Triggered al!');
          this.selectedPokemon = this.pokemonService.getFromCollection(data.naam);
          this.currentFoto = this.selectedPokemon.sprites.front_default;
        }
      }
    );
  }

  setFoto(ev: any, name: string) {
    if (ev.target.src == this.defaultFoto) {
      this.pokemonService.getImage(name)
        .subscribe(
          data => ev.target.src = data
        )
    }
  }

  select(pokemon: Pokemon) {
    this.selectedPokemon = pokemon;
    this.currentFoto = this.selectedPokemon.sprites.front_default;
  }

  getPropertiesAsString(input): string {
    let reeks = '';

    for (const prop in input) {
      if ( input[prop] instanceof Object) {
        this.getPropertiesAsString(input[prop]);
      }

      reeks += JSON.stringify(input[prop]);
    }

    return reeks;
  }

  getPropertiesAsArray(input): string[] {
    const reeks = [];

    for (const prop in input) {
      console.log(`Prop: ${prop} met waarde: ${input[prop]}`)
      if ( input[prop] instanceof Object) {
        this.getPropertiesAsArray(input[prop]);
      }

      if (input[prop] != null) {
        reeks.push(input[prop]);
      }
    }
    console.dir(reeks);
    return reeks;
  }

  rotate(input: string) {
    const reeks = this.getPropertiesAsArray(this.selectedPokemon.sprites);

    if (input == 'left') {
      if (this.teller == 0) {
        this.teller = reeks.length - 1;
      }
      this.teller--;
    } else if (input == 'right') {
      if (this.teller == reeks.length - 1) {
        this.teller = 0;
      }
      this.teller++;
    }

    this.currentFoto = reeks[this.teller];
  }
}
