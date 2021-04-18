import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { SuperHeroesService } from './../../../services/super-heroes.service';
import { SuperHeroe } from '../../../interfaces/super-heroe.interface';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/app.reducers';
import * as fromSuperHeroe from '../../super-heroes.actions';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [],
})
export class ListadoComponent implements OnInit, AfterViewInit {
  @ViewChild('inputSearch', { static: false })
  inputSearch: ElementRef;

  paginas: boolean = false;
  superHeroes: SuperHeroe[] = [];
  search: string = '';

  constructor(
    private superHeroesService: SuperHeroesService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.superHeroes = state.superHeroes;
    });

    this.nuevaConsulta('');
  }

  ngAfterViewInit() {
    fromEvent(this.inputSearch.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((search: string) => {
        this.nuevaConsulta(search);
      });
  }

  nuevaConsulta(search: string) {
    const action = new fromSuperHeroe.initSuperHeroeAction([]);
    this.store.dispatch(action);

    this.search = search;
    this.getSuperHeroes(true);
  }

  getSuperHeroes(buscando) {
    this.superHeroesService
      .getSuperHeroes(this.search.trim(), buscando)
      .subscribe((superHeroes) => {
        this.paginas = superHeroes.length < 8 ? false : true;

        const action = new fromSuperHeroe.agregarSuperHeroeAction(superHeroes);
        this.store.dispatch(action);
      });
  }
}
