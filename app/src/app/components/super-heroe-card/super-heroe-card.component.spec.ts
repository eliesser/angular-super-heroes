import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

import { Company, SuperHeroe } from '../../interfaces/super-heroe.interface';
import { SuperHeroesService } from 'src/app/services/super-heroes.service';

import { ComponentsModule } from 'src/app/components/components.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { MaterialModule } from 'src/app/material/material.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { SuperHeroeCardComponent } from './super-heroe-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { appReducers } from 'src/app/app.reducers';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmarComponent } from '../confirmar/confirmar.component';

export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of(true),
    };
  }
}

describe('SuperHeroeCardComponent', () => {
  let component: SuperHeroeCardComponent;
  const servicio = new SuperHeroesService(null);
  let fixture: ComponentFixture<SuperHeroeCardComponent>;
  const matDialog = new MatDialogMock();
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuperHeroeCardComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot([]),
        MaterialModule,
        ComponentsModule,
        PipesModule,
        SharedModule,
        DirectivesModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        StoreModule.forRoot(appReducers),
      ],
      providers: [{ provide: MatDialog, useValue: matDialog }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperHeroeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([MatDialog], (d: MatDialog) => {
    dialog = d;
  }));

  it('Debería crear el componente SuperHeroeCardComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Debería de borrar el Super Héroe con id 15', () => {
    let afterCloseCallback: jasmine.Spy;

    const superHeroe: SuperHeroe = {
      id: '15',
      name: 'Spiderman2',
      company: Company.Marvel,
      info: 'El hombre araña',
      img:
        'https://assets.entrepreneur.com/content/3x2/2000/20190927183318-Spiderman.jpeg',
    };

    component.superHeroe = superHeroe;

    const espia = spyOn(servicio, 'borrarSuperHeroe').and.returnValue(
      Observable.from([])
    );

    const dialogRef = dialog.open(ConfirmarComponent, {
      width: '300px',
      data: superHeroe,
    });

    component.borrar();

    spyOn(matDialog, 'open');

    afterCloseCallback = jasmine.createSpy('afterClose callback');
    dialogRef.afterClosed().subscribe(afterCloseCallback);

    //expect(espia).toHaveBeenCalled();
    /* expect(matDialog.open).toHaveBeenCalled(); */
  });
});
