import { Component } from '@angular/core';
import { LoadingService } from 'src/app/services/loaging.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styles: [
    `
      .center-h {
        margin: 0 auto;
      }
    `,
  ],
})
export class LoadingComponent {
  constructor(public loadingService: LoadingService) {}
}
