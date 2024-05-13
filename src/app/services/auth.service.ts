import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable,BehaviorSubject } from 'rxjs';
import { environment } from "src/environments/environment";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getRole(): number | null {
    const access = localStorage.getItem('access');
    return access ? parseInt(access, 10) : null;
  }


  private readonly BASE_URL = environment.API_URL; // URL de tu backend
  private readonly LOGIN_URL = `${this.BASE_URL}/auth/login`;
  private readonly SECURE_DATA_URL = `${this.BASE_URL}/auth/verify`;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router:Router) {}

  setAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }


  login(loginData: any): Observable<any> {
    return this.http.post<any>(this.LOGIN_URL, loginData);
  }

  checkAuthentication(): Observable<any> {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({ 'x-access-token': token });
      return this.http.get(this.SECURE_DATA_URL, { headers });
    } else {
      return new Observable((observer) => observer.error('No token'));

    }
  }


  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.setAuthenticated(false);
  }

}

