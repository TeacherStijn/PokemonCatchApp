import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'datumTransform'
})
export class DatumFormatter implements PipeTransform {
  transform(datum: Date): string{

    let tussentijds: string;
    tussentijds = `
      ${datum.getDate()}-
      ${datum.getMonth()+ 1}-
      ${datum.getFullYear()}@
      ${datum.getHours()}:
      ${datum.getMinutes()}
    `;
    return tussentijds;

    // of grofweg: toLocaleDateString()
  }
}
