import * as fromSuperHeroe from './super-heroes.actions';
import { SuperHeroe } from '../interfaces/super-heroe.interface';

const estadoInicial: SuperHeroe[] = [];

export function superHeroeReducer(
  state = estadoInicial,
  action: fromSuperHeroe.Acciones
): SuperHeroe[] {
  switch (action.type) {
    case fromSuperHeroe.INIT_SUPER_HEROE:
      return action.superHeroe.map((superHeroe) => {
        return {
          ...superHeroe,
        };
      });

    case fromSuperHeroe.AGREGAR_SUPER_HEROE:
      return [
        ...state,
        ...action.superHeroe.map((superHeroe) => {
          return {
            ...superHeroe,
          };
        }),
      ];

    case fromSuperHeroe.BORRAR_SUPER_HEROE:
      return state.filter((superHeroe) => superHeroe.id !== action.id);

    default:
      return state;
  }
}
