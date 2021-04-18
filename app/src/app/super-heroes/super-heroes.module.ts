import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AgregarComponent } from './pages/agregar/agregar.component';
import { SuperHeroeComponent } from './pages/super-heroe/super-heroe.component';
import { MainComponent } from './pages/main/main.component';
import { ListadoComponent } from './pages/listado/listado.component';

import { SuperHeroesRoutingModule } from './super-heroes-routing.module';
import { MaterialModule } from '../material/material.module';
import { ComponentsModule } from './../components/components.module';

import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  declarations: [
    AgregarComponent,
    SuperHeroeComponent,
    MainComponent,
    ListadoComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SuperHeroesRoutingModule,
    MaterialModule,
    ComponentsModule,
    PipesModule,
    SharedModule,
    DirectivesModule,
  ],
})
export class SuperHeroesModule {}
