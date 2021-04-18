import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SuperHeroe } from '../interfaces/super-heroe.interface';

import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class SuperHeroesService {
  pagina = 0;

  constructor(private http: HttpClient) {}

  getSuperHeroes(
    search: string,
    buscando: boolean = false
  ): Observable<SuperHeroe[]> {
    if (buscando) {
      this.pagina = 0;
    }
    this.pagina++;
    return this.http.get<SuperHeroe[]>(
      `${apiUrl}/super-heroes?name_like=${search}&_page=${this.pagina}&_limit=8&_sort=id&_order=desc`
    );
  }

  getSuperHeroeById(id: string): Observable<SuperHeroe> {
    return this.http.get<SuperHeroe>(`${apiUrl}/super-heroes/${id}`);
  }

  agregarSuperHeroe(superHeroe: SuperHeroe): Observable<SuperHeroe> {
    return this.http.post<SuperHeroe>(`${apiUrl}/super-heroes`, superHeroe);
  }

  editarSuperHeroe(superHeroe: SuperHeroe): Observable<SuperHeroe> {
    return this.http.put<SuperHeroe>(
      `${apiUrl}/super-heroes/${superHeroe.id}`,
      superHeroe
    );
  }

  borrarSuperHeroe(id: string): Observable<any> {
    return this.http.delete<any>(`${apiUrl}/super-heroes/${id}`);
  }
}
