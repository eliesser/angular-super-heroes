import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

import { Company, SuperHeroe } from '../../../interfaces/super-heroe.interface';
import { SuperHeroesService } from 'src/app/services/super-heroes.service';

import { ComponentsModule } from 'src/app/components/components.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { MaterialModule } from 'src/app/material/material.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { AgregarComponent } from './agregar.component';

class FakeRouter {
  navigate(params) {}

  get url() {
    return 'editar';
  }
}

describe('AgregarComponent', () => {
  let component: AgregarComponent;
  const servicio = new SuperHeroesService(null);
  let fixture: ComponentFixture<AgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarComponent],
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
      ],
      providers: [
        { provide: Router, useClass: FakeRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '14' } },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crear el componente AgregarComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Debería de crear un formulario con 4 elementos, name, compny, info e img', () => {
    expect(component.form.contains('name')).toBeTruthy();
    expect(component.form.contains('company')).toBeTruthy();
    expect(component.form.contains('info')).toBeTruthy();
    expect(component.form.contains('img')).toBeTruthy();
  });

  describe('Debería el formulario ser válido', () => {
    it('Debería ingresar el campo name es obligatorio', () => {
      const control = component.form.get('name');
      control.setValue('Spiderman');

      expect(control.value.length).toBeGreaterThanOrEqual(1);
    });

    it('Debería ingresar el campo company es obligatorio', () => {
      const control = component.form.get('company');
      control.setValue('Marvel');

      expect(control.value.length).toBeGreaterThanOrEqual(1);
    });

    it('Debería ingresar el campo info es obligatorio', () => {
      const control = component.form.get('info');
      control.setValue('El hombre araña');

      expect(control.value.length).toBeGreaterThanOrEqual(1);
    });

    it('Debería ingresar el campo img es obligatorio', () => {
      const control = component.form.get('img');
      control.setValue('imagen');

      expect(control.value.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('Debería el formulario ser inválido', () => {
    const superHeroe: SuperHeroe = {
      name: '',
      company: Company.Marvel,
      info: 'El hombre araña',
      img:
        'https://assets.entrepreneur.com/content/3x2/2000/20190927183318-Spiderman.jpeg',
    };

    const name = component.form.get('name');
    name.setValue(superHeroe.name);
    const company = component.form.get('company');
    company.setValue(superHeroe.company);
    const info = component.form.get('info');
    info.setValue(superHeroe.info);
    const img = component.form.get('img');
    img.setValue(superHeroe.img);

    component.guardar();

    expect(component.form.invalid).toBeTrue();
  });

  it('Debería de agregar un nuevo Super Héroe', () => {
    const superHeroe: SuperHeroe = {
      name: 'Spiderman',
      company: Company.Marvel,
      info: 'El hombre araña',
      img:
        'https://assets.entrepreneur.com/content/3x2/2000/20190927183318-Spiderman.jpeg',
    };

    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    router.navigate(['super-heroes/agregar']);

    expect(spy).toHaveBeenCalledWith(['super-heroes/agregar']);

    const espia = spyOn(servicio, 'agregarSuperHeroe').and.returnValue(
      Observable.from([superHeroe])
    );

    const name = component.form.get('name');
    name.setValue(superHeroe.name);
    const company = component.form.get('company');
    company.setValue(superHeroe.company);
    const info = component.form.get('info');
    info.setValue(superHeroe.info);
    const img = component.form.get('img');
    img.setValue(superHeroe.img);

    component.guardar();

    expect(component.superHeroe).toEqual(superHeroe);
  });

  it('Debería de editar el Super Héroe con id 15', () => {
    const superHeroe: SuperHeroe = {
      id: '15',
      name: 'Spiderman2',
      company: Company.Marvel,
      info: 'El hombre araña',
      img:
        'https://assets.entrepreneur.com/content/3x2/2000/20190927183318-Spiderman.jpeg',
    };

    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    router.navigate(['super-heroes/editar', superHeroe.id]);

    expect(spy).toHaveBeenCalledWith(['super-heroes/editar', superHeroe.id]);

    spyOn(servicio, 'editarSuperHeroe').and.returnValue(
      Observable.from([superHeroe])
    );

    component.superHeroe.id = superHeroe.id;
    const name = component.form.get('name');
    name.setValue(superHeroe.name);
    const company = component.form.get('company');
    company.setValue(superHeroe.company);
    const info = component.form.get('info');
    info.setValue(superHeroe.info);
    const img = component.form.get('img');
    img.setValue(superHeroe.img);

    component.guardar();

    expect(component.superHeroe).toEqual(superHeroe);
  });
});
