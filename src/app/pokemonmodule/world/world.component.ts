import {Component, Input, OnInit} from '@angular/core';
import {PokemonService} from "../../../shared/services/pokemonservice";

@Component({
  selector: 'world-component',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css']
})
export class WorldComponent implements OnInit {

  @Input() status: boolean;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
  }

  vangkans(): boolean {
    // check vergelijking Level+XP zelf VS Level+XP enemy
    return true;
  }

  search() {
    if (this.vangkans()==true) {
      let nr = Math.ceil(Math.random() * 700);
      console.log(nr);
      this.pokemonService.getRandomPokemon(nr).subscribe(
        (result) => {
          this.pokemonService.collection.next(
            // Moet een 'Gevangen' type zijn, vandaar object met tijdstip
            {
              pokemon: result,
              tijdstip: new Date()
            }
          );
        }
      )
    }
  }

}
