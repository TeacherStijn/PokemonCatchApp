import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'nameTransform'
})
export class Nametransform implements PipeTransform {
  transform (input: string): string {
    return input + ' pokémon!'
  }
}
