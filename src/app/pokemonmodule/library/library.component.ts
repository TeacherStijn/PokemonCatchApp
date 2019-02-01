import {Component, HostListener, Input, OnInit} from '@angular/core';
import {PokemonService} from "../../../shared/services/pokemonservice";
import {Gevangen, Pokemon} from "../../../shared/models/pokemonapp.model";
import {SelectItem} from '../../../../node_modules/primeng/primeng';

@Component({
  selector: 'library-component',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  collectie: Gevangen[] = [];
  selectedPokemon: Pokemon;

  sortOptions: SelectItem[];
  sortKey: string;
  sortField: string;
  sortOrder: number;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.pokemonService.collection.subscribe(
      (value)=>{
        // niet op deze manier IVM .push() zorgt niet voor refresh
        // bij gebruik PrimeNG tabel. Shallow change detection;
        // this.collectie.push(value);

        // Nu herkent hij echt bijwerking van de variabele:
        this.collectie = [...this.collectie, value];

        /***********************************************************
         *
         * Begin IndexedDB, is nu enkel bijwerken bij elke nieuwe Poke op de 'lijn',
         * Straks met Observable, én uitlezen huidige IndexedDB,
         * voor vullen lokale collectie (ook in ngOnInit, voor subscribe).
         *
         **********************************************************/

        if (window.indexedDB) {
          let that = this;
          let db;

          let connRequest = window.indexedDB.open("Pokemon_DB", 1);

          connRequest.onsuccess = function (e) {
            console.log("Verbinding gemaakt");
            db = connRequest.result;

            let transactieSpace = db.transaction(["pokemonLibrary"], "readwrite");
            let currentStore = transactieSpace.objectStore("pokemonLibrary");
            let updateRequest = currentStore.put(value, value.pokemon.name);

            updateRequest.onsuccess = function (e) {
              console.table(e);
            }
            updateRequest.onerror = function (e) {
              console.dir(e);
            }
          }

          connRequest.onupgradeneeded = function (e) {
            console.log("Database bijwerken...");
            db = connRequest.result;
            console.log("objectStoreNames: " + db.objectStoreNames);
            if (!db.objectStoreNames.contains("pokemonLibrary")) {
              db.createObjectStore("pokemonLibrary");
            }
          }

          connRequest.onerror = function (e) {
            console.dir(e);
          }
        }
        /***********************************************************
         *
         * Einde IndexedDB
         *
         **********************************************************/
      }
    );

    this.sortOptions = [
      {label: 'Naam', value: 'name'}
      /*
          {label: 'Laagste Id Eerst', value: '!id'},
          {label: 'Hoogste Id Eerst', value: 'id'},
       */
    ];
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }


  upgradeCheck(poke: Pokemon){
    let teller: number = 0;
    this.collectie.forEach(
      function(elem,i){
        if (elem.pokemon.name == poke.name){
          teller++;
        }
      }
    );

    if (teller>=3){ return true; }
    return false;
  }

  upgrade(poke: Pokemon){
    // bovenstaande functie (/code) gebruiken voor >=3 check
    // loop om poke object te vinden met zelfde naam
    // dan telkens elementen eruit splice-en
    // tot slot nieuwe pokemon toevoegen (en trigger 'yay' moment!)
  }
}
