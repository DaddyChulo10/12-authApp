import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environments } from 'src/environments/environments';
import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../interfaces';
import { RegisterUser } from '../interfaces/registerUser.interface';
import { RegisterUserspost } from '../interfaces/register.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly baseUrl: string = environments.baseUrl
  private http = inject(HttpClient);
  private _currentUser = signal<User | null>(null)
  private _authStatus = signal<AuthStatus>(AuthStatus.checking)
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor() {
    this.checkAuthStatus().subscribe()
  }

  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user)
    this._authStatus.set(AuthStatus.authenticated)
    localStorage.setItem('token', token)

    return true
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`
    const body = { email: email, password: password }
    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map((resultado) => this.setAuthentication(resultado.user, resultado.token)),
        catchError(err => {
          console.log(err)
          return throwError(() => err.error.message)
        })
      )
  }


  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/check-token`
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout()
      return of(false)
    }
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
    return this.http.get<CheckTokenResponse>(url, { headers })
      .pipe(
        map((resultado) => this.setAuthentication(resultado.user, resultado.token)),
        catchError(() => {
          this._authStatus.set(AuthStatus.notAuthenticated)
          return of(false)
        })
      )
  }

  logout() {
    localStorage.removeItem('token')
    this._currentUser.set(null)
    this._authStatus.set(AuthStatus.notAuthenticated)
  }


  register(registerUser: RegisterUser): Observable<boolean> {
    const url = `${this.baseUrl}/auth/register`
    return this.http.post<boolean | any>(url, registerUser)
      .pipe(
        catchError((error) => {
          return of(false)
        })
      )
  }

}
