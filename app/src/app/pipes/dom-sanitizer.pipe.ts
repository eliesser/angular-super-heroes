import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSanitizer',
})
export class DomSanitizerPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}
  transform(img: string): unknown {
    if (!img) {
      img = 'assets/img/no-image.png';
    }

    return this.domSanitizer.bypassSecurityTrustStyle(
      `background-image: url('${img}')`
    );
  }
}
