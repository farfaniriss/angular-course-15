import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: 'domSeguro'
})
export class DomSeguroPipe implements PipeTransform {

  constructor(private domSan: DomSanitizer){}

  transform(value: string): any {
    let url = "https://www.youtube.com/embed/";
    
    return this.domSan.bypassSecurityTrustResourceUrl(url + value);
  }

}
