import { ActionReducerMap } from '@ngrx/store';

import { SuperHeroe } from './interfaces/super-heroe.interface';

import * as fromSuperHeroeReducer from './super-heroes/super-heroes.reducer';

export interface AppState {
  superHeroes: SuperHeroe[];
}

export const appReducers: ActionReducerMap<AppState> = {
  superHeroes: fromSuperHeroeReducer.superHeroeReducer,
};
