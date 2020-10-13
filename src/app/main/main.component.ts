import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {PokemonService} from '../shared/services/pokemon.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  geoLocatie$: Observable<{lat: number, long: number}>;

  constructor(private pokemonService: PokemonService) {

    /*

    Waar zit de eindgebruiker?

    */
    this.geoLocatie$ = new Observable(
      (obs) => {

        let zoekId: number;

        if (navigator.geolocation) {
          zoekId = navigator.geolocation.watchPosition(
            (data) => {
              let pos = {
                lat: data.coords.latitude,
                long: data.coords.longitude,
                toString: function() { return `Lat: ${this.lat} en Long: ${this.long}`}
              }
              obs.next(pos);
            },
            (err) => {
              obs.error("Niet gelukt: " + err)
            }
          );
        }

        return {
          // Niet nodig bij async pipe!
          unsubscribe(): void {
            navigator.geolocation.clearWatch(zoekId);
          }
        }
      }
    );
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
  }

  // @HostListener('window:beforeunload', ['$event'])
  // doSomething($event) {
  //
  //   $event.returnValue=true;
  // }

  @HostListener('window:beforeunload', ['$event'])
  tabClose($event) {
    $event.returnValue = "Wilt u uw gegevens niet opslaan?";
    this.pokemonService.saveCollection();
  }

  wissen(): void {
    if (window.confirm("Wilt u uw hele collectie wissen?")) {
      this.pokemonService.deleteCollection();
    }
  }
}
