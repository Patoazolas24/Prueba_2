import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url_api = "https://dummyjson.com/auth/login"

  constructor(
    //inyeccion de servicio
    private http: HttpClient
  ) { }

 // Metodo del login
 login(username: string, password: string): Observable<User>{
  const headers = new HttpHeaders({'Content-Type': 'application/json'})
  const body = { username, password}

  // envia a la api y esta retorna la respuesta: TOKEN
  return this.http.post<User>(this.url_api, body, { headers });
  }

  // Insert token
  insertar_token(token: string ): void {
    localStorage.setItem('accessToken', token)
  }

  // obtener el token
  obtener_token(): string | null{
    return localStorage.getItem('accessToken')
  }

  // Metodod que obtienen headers y token para otras solicitudes
  obtener_headers(): HttpHeaders{
    const token = this.obtener_token();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:`Bearer ${token}`,
    });


  }

  cerrarSesion(): void{
    localStorage.removeItem('accessToken')
  }
}
