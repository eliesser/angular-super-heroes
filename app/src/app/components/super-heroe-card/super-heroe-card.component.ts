import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UiService } from 'src/app/services/ui.service';
import { Store } from '@ngrx/store';

import { SuperHeroe } from '../../interfaces/super-heroe.interface';
import { ConfirmarComponent } from '../confirmar/confirmar.component';
import * as fromSuperHeroe from '../../super-heroes/super-heroes.actions';
import { AppState } from 'src/app/app.reducers';

import { SuperHeroesService } from 'src/app/services/super-heroes.service';

@Component({
  selector: 'app-super-heroe-card',
  templateUrl: './super-heroe-card.component.html',
  styles: [
    `
      mat-card {
        margin-top: 20px;
      }
    `,
  ],
})
export class SuperHeroeCardComponent {
  @Input() superHeroe!: SuperHeroe;

  constructor(
    private superHeroesService: SuperHeroesService,
    private uiService: UiService,
    public matDialog: MatDialog,
    private store: Store<AppState>
  ) {}

  borrar() {
    const dialogRef = this.matDialog.open(ConfirmarComponent, {
      width: '300px',
      data: this.superHeroe,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.superHeroesService
          .borrarSuperHeroe(this.superHeroe.id)
          .subscribe(() => {
            const action = new fromSuperHeroe.BorrarSuperHeroeAction(
              this.superHeroe.id
            );

            this.store.dispatch(action);
            this.uiService.mostrarSnackBar('Super Héroe borrado exitosamente');
          });
      }
    });
  }
}
