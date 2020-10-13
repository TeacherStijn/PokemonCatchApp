import { Component, OnInit } from '@angular/core';
import {PokemonService} from '../shared/services/pokemon.service';
import {Pokemon} from '../shared/models/models';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  static aantalRandom = 3;
  meldingTekst: string;
  antwoorden: number = 0;
  vragen: number = 0;
  kleur: string = '';
  randomPokemon: Pokemon;
  randomNamenLijst: string[] = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.wieIsDezePokemon();
  }

  wieIsDezePokemon() {
    let willekeurig = Math.ceil(Math.random() * QuizComponent.aantalRandom - 1);
    this.pokemonService.getPokemon().subscribe(
      (data) => {
        this.randomPokemon = data;
        this.randomNamenLijst.splice(willekeurig, 0, this.randomPokemon.name);

        for (let i = 0; i < QuizComponent.aantalRandom - 1; i++) {
          this.pokemonService.getPokemon().subscribe(
            (data2) => {
              if (data2.name != this.randomPokemon.name) {
                willekeurig = Math.ceil(Math.random() * QuizComponent.aantalRandom - 1);
                this.randomNamenLijst.splice(willekeurig, 0, data2.name);
              }
            }
          );
        }

      }
    );
  }

  checkAntwoord(naam: string) {
    if (naam === this.randomPokemon.name) {
      this.kleur = "green";
      this.meldingTekst = 'Goed gedaan! :)';
      this.antwoorden++;
    } else {
      this.kleur = "red";
      this.meldingTekst = 'Helaas, het goede antwoord was: ' + this.randomPokemon.name;
    }

    this.vragen++;
    this.randomNamenLijst = [];
    this.wieIsDezePokemon();
  }
}
