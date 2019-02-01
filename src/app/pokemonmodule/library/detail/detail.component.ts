import {
  Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Pokemon} from "../../../../shared/models/pokemonapp.model";
import {isUndefined} from "util";

@Component({
  selector: 'detail-component',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnChanges {

  @Input() detailPokemon: Pokemon;
  detailPokemonArray: Pokemon[];

  @ViewChild('afbeelding') afbeelding: ElementRef;
  srcReeks: string[] = [];
  pos: number = 0;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(verandering: SimpleChanges){
    if (verandering.detailPokemon.previousValue != verandering.detailPokemon.currentValue){
      console.log("Image reeks bijwerken...");
      this.srcReeks = [
        this.detailPokemon.sprites.front_default,
        this.detailPokemon.sprites.back_default,
        this.detailPokemon.sprites.front_shiny,
        this.detailPokemon.sprites.back_shiny
      ];

      this.detailPokemonArray = [this.detailPokemon];
    }
  }

  @HostListener('window:keyup', ['$event'])
  toetsGedrukt(e){
    let toets = e.key; // relatief nieuw in Js :))
    console.log(toets);
    if (toets=='ArrowLeft'){
      if (!isUndefined(this.afbeelding)) {
        console.log("beginpos: " + this.pos);
        this.pos = this.srcReeks.indexOf(this.afbeelding.nativeElement.src);
        this.pos = this.pos<=0?this.srcReeks.length-1:this.pos-1;
        this.afbeelding.nativeElement.src = this.srcReeks[this.pos];
        console.log("eindpos:" + this.pos);
      }
    }
    if (toets=='ArrowRight'){
      if (!isUndefined(this.afbeelding)) {
        console.log("beginpos: " + this.pos);
        this.pos = this.srcReeks.indexOf(this.afbeelding.nativeElement.src);
        this.pos = this.pos>=this.srcReeks.length-1?0:this.pos+1;
        this.afbeelding.nativeElement.src = this.srcReeks[this.pos];
        console.log("eindpos:" + this.pos);
      }
    }
  }
}
