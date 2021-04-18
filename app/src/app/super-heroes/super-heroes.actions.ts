import { Action } from '@ngrx/store';
import { SuperHeroe } from '../interfaces/super-heroe.interface';

export const INIT_SUPER_HEROE = '[Super Héroe] Init Super Héroe';
export const AGREGAR_SUPER_HEROE = '[Super Héroe] Agregar Super Héroe';
export const BORRAR_SUPER_HEROE = '[Super Héroe] Borrar Super Héroe';

export class initSuperHeroeAction implements Action {
  readonly type = INIT_SUPER_HEROE;
  constructor(public superHeroe: SuperHeroe[]) {}
}

export class agregarSuperHeroeAction implements Action {
  readonly type = AGREGAR_SUPER_HEROE;
  constructor(public superHeroe: SuperHeroe[]) {}
}

export class BorrarSuperHeroeAction implements Action {
  readonly type = BORRAR_SUPER_HEROE;
  constructor(public id: string) {}
}

export type Acciones =
  | initSuperHeroeAction
  | agregarSuperHeroeAction
  | BorrarSuperHeroeAction;
