import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs/index";
import {Gevangen, Pokemon} from "../models/pokemonapp.model";

@Injectable({
  providedIn: 'root'
})

export class PokemonService {
  collection: Subject<Gevangen> = new Subject<Gevangen>();

  constructor(private http: HttpClient){
  }

  // get en set Observables als WRAPPER om de IndexedDB noSQL heen;

  //...
  //...
  //...


  getRandomPokemon(id: number): Observable<Pokemon>{
    console.log("Zoeken naar Pokemon: " + id);
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  }

  getPokemon(name: string): Observable<Pokemon>{
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${name}/`);
  }

  getAllPokemon(): Observable<Pokemon[]>{
    return this.http.get<Pokemon[]>(`https://pokeapi.co/api/v2/pokemon/`);
  }
}
