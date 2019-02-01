import {Component, HostListener} from "@angular/core";

@Component({
  selector: 'pokemonapp-component',
  styleUrls: ['./pokemonapp.component.css'],
  templateUrl: './pokemonapp.component.html'
})
export class PokemonComponent {

  areWeLive: boolean = true;

  @HostListener('window:offline')
  offlineStatus(){
    this.areWeLive = false;
  }

  @HostListener('window:online')
  onlineStatus() {
    this.areWeLive = true;
  }

}
