import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoading: boolean = false;

  constructor() {
    this.hide();
  }

  show() {
    this.isLoading = true;
  }

  hide() {
    this.isLoading = false;
  }
}
