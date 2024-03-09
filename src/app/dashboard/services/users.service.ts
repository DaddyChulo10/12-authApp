import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environments } from 'src/environments/environments';
import { Users } from '../interfaces/users.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly baseUrl: string = environments.baseUrl
  private http = inject(HttpClient);
  public usuarios: Users[] | any = []

  getUsers(): Observable<Users[]> {
    const url = `${this.baseUrl}/auth/getPeaople`;
    const token = localStorage.getItem('token');
    if (!token) {
      return this.usuarios
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
    return this.http.get<Users[]>(url, { headers })

  }
}
