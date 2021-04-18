import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoadingComponent } from './loading/loading.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { NavbarComponent } from './navbar/navbar.component';

import { MaterialModule } from '../material/material.module';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    ErrorPageComponent,
    LoadingComponent,
    NavbarComponent,
    BreadcrumbComponent,
  ],
  exports: [
    ErrorPageComponent,
    LoadingComponent,
    NavbarComponent,
    BreadcrumbComponent,
  ],
  imports: [CommonModule, RouterModule, MaterialModule],
})
export class SharedModule {}
