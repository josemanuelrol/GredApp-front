import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Observable, firstValueFrom } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private jwtHelperService = new JwtHelperService();

  private readonly baseUrlApi: string = environment.baseUrlApi;

  constructor() {
  };

  login(user: User):Promise<any> {
    return firstValueFrom(this.http.post<any>(`${this.baseUrlApi}/auth/login`, user))
  };

  register(user:User):Promise<any> {
    return firstValueFrom(this.http.post<any>(`${this.baseUrlApi}/auth/register`, user))
  };

  validateToken(){
    let token = localStorage.getItem('token')
    if(token && !this.jwtHelperService.isTokenExpired(token)){
      return true
    }else{
      return false
    }
  };

}
