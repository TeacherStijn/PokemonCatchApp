import { Component, OnInit } from '@angular/core';
import {PokemonService} from "../../../shared/services/pokemonservice";

@Component({
  selector: 'avatar-component',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {

  image: any = 'https://i.somethingawful.com/inserts/news/images/06-2004/04-dnd6.jpg';
  statsArray: { naam: string, waarde: string | number }[] = [
    // onzin invulling (later nog aanpasssen)
    { naam: 'Sterkste Pokémon', waarde: 'Pikachu' }
  ];
  wieIsDeze: string[] = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    /***** Wie is deze Pokémon? klaarmaken ********/
    let goed = Math.ceil(Math.random() * 700);
    this.pokemonService.getRandomPokemon(goed).subscribe(
      // hier totaal 3 streams opzetten en mergen. Bij klaar na merge,
      // array vullen en tonen (in log) met namen.
    )




    /****** Einde Wie is deze Pokémon? ************/



    /***********************************************************
     *
     * Begin IndexedDB, nog WRAPPEN in Observable
     *
     **********************************************************/
    let that = this;
    if (window.indexedDB) {
      let db;

      let connRequest = window.indexedDB.open("Pokemon_DB", 1);

      connRequest.onsuccess = function (e) {
        console.log("Verbinding gemaakt");
        db = connRequest.result;

        let transactieSpace = db.transaction(["pokemonLibrary"], "readonly");
        let currentStore = transactieSpace.objectStore("pokemonLibrary");
        let selectie = currentStore.getAll();

        selectie.onsuccess = function (e) {
          //console.table(e.target.result);
          let max = { naam: '', max: 0}
          e.target.result.forEach(function(elem){
            if (elem.base_experience >= max.max){
              max.max = elem.base_experience;
              max.naam = elem.name;
            }
          });

          that.statsArray = [
            ...that.statsArray,
            { naam: 'Meeste XP gained', waarde: `${max.max} (${max.naam})` }
          ]
        }
        selectie.onerror = function (e) {
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

  updateImage(file): void {
    console.table(file);
    let that = this;

    // Even base64 van maken ivm file -> src attribuut
    var reader = new FileReader();
    reader.readAsDataURL(file.target.files[0]);

    reader.onload = function () {
      that.image = reader.result;
    };

    reader.onerror = function (error) {
      console.log('Iets misgegaan bij inlezen Avatar bestand: ', error);
    };
  }
}
