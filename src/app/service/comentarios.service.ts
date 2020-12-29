import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  baseUrl = environment.baseUrl;
 
  constructor(protected http: HttpClient) { }

  createComentario(data): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/calificacion`, data);
  }

  mostrarGrafica(data): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/calificacion/resumen`, data);
  }
  mostrarRequerimiento(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/pedidos/resumen`);
  }

}