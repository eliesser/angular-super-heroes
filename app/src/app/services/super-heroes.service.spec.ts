import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { SuperHeroesService } from './super-heroes.service';
import { Company, SuperHeroe } from '../interfaces/super-heroe.interface';

import { environment } from '../../environments/environment.prod';

const apiUrl = environment.apiUrl;

describe('SuperHeroesService', () => {
  let httpTestingController: HttpTestingController;
  let superHeroesService: SuperHeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SuperHeroesService],
    });

    httpTestingController = TestBed.get(HttpTestingController);
  });

  beforeEach(inject([SuperHeroesService], (service: SuperHeroesService) => {
    superHeroesService = service;
  }));

  it('Debería crear el servicio SuperHeroesService', () => {
    expect(superHeroesService).toBeTruthy();
  });

  it('Debería de listar los Super Héroes', () => {
    const superHeroes: SuperHeroe[] = [
      {
        name: 'Spiderman',
        company: Company.Marvel,
        info: 'El hombre araña',
        img:
          'https://assets.entrepreneur.com/content/3x2/2000/20190927183318-Spiderman.jpeg',
      },
    ];

    let result: SuperHeroe[];
    superHeroesService
      .getSuperHeroes('')
      .subscribe((t: SuperHeroe[]) => (result = t));

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${apiUrl}/super-heroes?name_like=&_page=1&_limit=8&_sort=id&_order=desc`,
    });

    req.flush([superHeroes]);

    expect(result[0][0]).toEqual(superHeroes[0]);
  });

  it('Debería de listar un Super Héroes', () => {
    const superHeroe: SuperHeroe = {
      name: 'Spiderman',
      company: Company.Marvel,
      info: 'El hombre araña',
      img:
        'https://assets.entrepreneur.com/content/3x2/2000/20190927183318-Spiderman.jpeg',
    };

    let result: SuperHeroe;
    superHeroesService
      .getSuperHeroeById(superHeroe.id)
      .subscribe((t: SuperHeroe) => (result = t));

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${apiUrl}/super-heroes/${superHeroe.id}`,
    });

    req.flush([superHeroe]);

    expect(result[0]).toEqual(superHeroe);
  });

  it('Debería de agregar un nuevo Super Héroe', () => {
    const superHeroe: SuperHeroe = {
      name: 'Spiderman',
      company: Company.Marvel,
      info: 'El hombre araña',
      img:
        'https://assets.entrepreneur.com/content/3x2/2000/20190927183318-Spiderman.jpeg',
    };

    let result: SuperHeroe;
    superHeroesService
      .agregarSuperHeroe(superHeroe)
      .subscribe((t: SuperHeroe) => (result = t));

    const req = httpTestingController.expectOne({
      method: 'POST',
      url: `${apiUrl}/super-heroes`,
    });

    req.flush([superHeroe]);

    expect(result[0]).toEqual(superHeroe);
  });

  it('Debería de editar un Super Héroe', () => {
    const superHeroe: SuperHeroe = {
      id: '1',
      name: 'Spiderman',
      company: Company.Marvel,
      info: 'El hombre araña',
      img:
        'https://assets.entrepreneur.com/content/3x2/2000/20190927183318-Spiderman.jpeg',
    };

    let result: SuperHeroe;
    superHeroesService
      .editarSuperHeroe(superHeroe)
      .subscribe((t: SuperHeroe) => (result = t));

    const req = httpTestingController.expectOne({
      method: 'PUT',
      url: `${apiUrl}/super-heroes/${superHeroe.id}`,
    });

    req.flush([superHeroe]);

    expect(result[0]).toEqual(superHeroe);
  });

  it('Debería de borrar un Super Héroe', () => {
    const superHeroe: SuperHeroe = {
      id: '1',
      name: 'Spiderman',
      company: Company.Marvel,
      info: 'El hombre araña',
      img:
        'https://assets.entrepreneur.com/content/3x2/2000/20190927183318-Spiderman.jpeg',
    };

    let result: SuperHeroe;
    superHeroesService
      .borrarSuperHeroe(superHeroe.id)
      .subscribe((t: SuperHeroe) => (result = t));

    const req = httpTestingController.expectOne({
      method: 'DELETE',
      url: `${apiUrl}/super-heroes/${superHeroe.id}`,
    });

    req.flush([superHeroe]);

    expect(result[0]).toEqual(superHeroe);
  });
});
