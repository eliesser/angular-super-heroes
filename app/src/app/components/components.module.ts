import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { SuperHeroeCardComponent } from './super-heroe-card/super-heroe-card.component';

import { PipesModule } from '../pipes/pipes.module';
import { MaterialModule } from '../material/material.module';
import { ConfirmarComponent } from './confirmar/confirmar.component';

@NgModule({
  declarations: [SuperHeroeCardComponent, ConfirmarComponent],
  exports: [SuperHeroeCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    PipesModule,
  ],
})
export class ComponentsModule {}
