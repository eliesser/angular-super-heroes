import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SuperHeroe } from '../../interfaces/super-heroe.interface';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styles: [],
})
export class ConfirmarComponent {
  constructor(
    private matDialogRef: MatDialogRef<ConfirmarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SuperHeroe
  ) {}

  confirmar() {
    this.matDialogRef.close(true);
  }

  cancelar() {
    this.matDialogRef.close();
  }
}
