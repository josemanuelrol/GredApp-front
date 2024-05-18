import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrlApi: string = environment.baseUrlApi;

  private http = inject(HttpClient);

  constructor() { }

  getUserById(id:String):Promise<User>{
    return firstValueFrom(this.http.get<User>(`${this.baseUrlApi}/user/${id}`));
  }

  updateUser(id:string, user:User):Promise<any>{
    return firstValueFrom(this.http.put<any>(`${this.baseUrlApi}/user/${id}`, user));
  }

  deleteUser(id:string):Promise<any>{
    return firstValueFrom(this.http.delete<any>(`${this.baseUrlApi}/${id}`));
  }

}
