import { Event } from '../models/event';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private dataUpdated = new Subject<void>();

  private readonly baseUrlApi: string = environment.baseUrlApi;

  private http = inject(HttpClient);

  constructor() { }

  // EVENTS

  createEvent(event:Event):Promise<any>{
    return firstValueFrom(this.http.post<any>(`${this.baseUrlApi}/evento`, event));
  }

  getEvents():Promise<Event[]>{
    return firstValueFrom(this.http.get<Event[]>(`${this.baseUrlApi}/eventos`));
  }

  getUserEvents(user_id:string):Promise<Event[]>{
    return firstValueFrom(this.http.get<Event[]>(`${this.baseUrlApi}/user/${user_id}/eventos`));
  }

  getEventById(id:string):Promise<Event>{
    return firstValueFrom(this.http.get<Event>(`${this.baseUrlApi}/evento/${id}`));
  }

  updateEvent(id:string, event:Event):Promise<any>{
    return firstValueFrom(this.http.put<any>(`${this.baseUrlApi}/evento/${id}`,event));
  }

  deleteEvent(id:string):Promise<any>{
    return firstValueFrom(this.http.delete<any>(`${this.baseUrlApi}/evento/${id}`));
  }

  emitDataUpdated(){
    this.dataUpdated.next();
  }

  onDataUpdate():Observable<any>{
    return this.dataUpdated.asObservable();
  }

}
