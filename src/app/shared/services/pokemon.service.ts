import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Pokemon} from '../models/models';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  collectie: Pokemon[];

  constructor(private http: HttpClient) {
    this.collectie = this.getCollection();
  }


  /*
    Pokemon related functions
   */
  getAllPokemon(x?: number): Observable<Pokemon[]> {
    x = x === undefined ? 10 : x;
    const url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${x}`;
    return this.http.get<Pokemon[]>(url);
  }

  getPokemon(): Observable<Pokemon> {
    const random = Math.round(Math.random() * 700) + 1;
    const url = `https://pokeapi.co/api/v2/pokemon/${random}`;
    return this.http.get<Pokemon>(url);
  }

  getImage(pokemonName): Observable<string> {
    const url = `https://pokeapi.co/api/v2/pokemon-form/${pokemonName}`;
    return this.http.get<any>(url)
      .pipe(
        map(input=>input.sprites.front_default)
      );
  }

  getFromCollection(naam: string): Pokemon {
    return this.collectie.find(
      (e) => {
        return e.name === naam;
      }
    );
  }

  /*
    Pokemon Stats related functions
  */
  getAbility(url): Observable<Response> {
    // kan ability รณf move zijn?
    return this.http.get<Response>(url);
  }


  /*
    Collection related functions
   */
  getCollection(): any[] {
    const data = localStorage.getItem('pokemonCollectie');
    if (data != null) {
      return JSON.parse(data);
    } else {
      return [];
    }
  }

  saveCollection(): void {
    localStorage.setItem('pokemonCollectie', JSON.stringify(this.collectie));
  }

  deleteCollection(): void {
    localStorage.removeItem('pokemonCollectie');
    this.collectie = [];
  }
}
