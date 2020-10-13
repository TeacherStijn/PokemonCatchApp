import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initcap'
})
export class InitcapPipe implements PipeTransform {

  transform(value: any): any {
    return value.substring(0, 1).toUpperCase() + value.substring(1, value.length);
  }

}
