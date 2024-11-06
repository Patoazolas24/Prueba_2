import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private url_api = 'https://dummyjson.com/auth/products';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  obtener_productos(skip: number = 0): Observable<{ products: Product[], total: number, skip: number, limit: number }> {
    const headers = this.authService.obtener_headers(); // Incluye el token en la cabecera
    return this.http.get<{ products: Product[], total: number, skip: number, limit: number }>(
      `${this.url_api}?skip=${skip}&limit=30`, // Agrega el parámetro limit=30
      { headers }
    )
  }
}