import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { SuperHeroesService } from 'src/app/services/super-heroes.service';

import { SuperHeroe } from '../../../interfaces/super-heroe.interface';

@Component({
  selector: 'app-super-heroe',
  templateUrl: './super-heroe.component.html',
  styles: [],
})
export class SuperHeroeComponent implements OnInit {
  superHeroe!: SuperHeroe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private superHeroesService: SuperHeroesService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.activatedRoute.params
        .pipe(
          switchMap(({ id }) => this.superHeroesService.getSuperHeroeById(id))
        )
        .subscribe((superHeroe) => (this.superHeroe = superHeroe));
    }, 1000);
  }
}
