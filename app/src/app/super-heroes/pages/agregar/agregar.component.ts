import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { SuperHeroe, Company } from '../../../interfaces/super-heroe.interface';
import { UiService } from '../../../services/ui.service';
import { SuperHeroesService } from '../../../services/super-heroes.service';
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [],
})
export class AgregarComponent implements OnInit {
  form: FormGroup;

  editar: boolean = false;

  superHeroe: SuperHeroe = {
    name: '',
    company: Company.Marvel,
    info: '',
    img: '',
  };

  companias = [
    {
      id: 'Marvel',
      text: 'Marvel',
    },
    {
      id: 'DC',
      text: 'DC',
    },
  ];

  constructor(
    private superHeroesService: SuperHeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private uiService: UiService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      company: ['', [Validators.required]],
      info: ['', [Validators.required]],
      img: ['', [Validators.required]],
    });

    if (!this.router.url.includes('editar')) {
      this.editar = true;
      return;
    }

    const id = this.activatedRoute.snapshot.params.id;

    this.superHeroesService.getSuperHeroeById(id).subscribe((superHeroe) => {
      this.superHeroe = superHeroe;

      this.editar = true;

      this.form.get('name').setValue(superHeroe.name);
      this.form.get('company').setValue(superHeroe.company);
      this.form.get('info').setValue(superHeroe.info);
      this.form.get('img').setValue(superHeroe.img);
    });
  }

  guardar() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.superHeroe.name = this.form.get('name').value;
    this.superHeroe.company = this.form.get('company').value;
    this.superHeroe.info = this.form.get('info').value;
    this.superHeroe.img = this.form.get('img').value;

    if (this.superHeroe.id) {
      this.superHeroesService
        .editarSuperHeroe(this.superHeroe)
        .subscribe((superHeroe) => {
          this.uiService.mostrarSnackBar(
            'Super Héroe actualizado exitosamente'
          );
          this.superHeroe = superHeroe;
          this.router.navigate(['/']);
        });
    } else {
      this.superHeroesService
        .agregarSuperHeroe(this.superHeroe)
        .subscribe((superHeroe) => {
          this.uiService.mostrarSnackBar('Super Héroe guardado exitosamente');
          this.superHeroe = superHeroe;
          this.router.navigate(['/']);
        });
    }
  }
}
