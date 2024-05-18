import { Calendar } from './../models/calendar';
import { Event } from './../models/event';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

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

  getEventById(id:string):Promise<Event>{
    return firstValueFrom(this.http.get<Event>(`${this.baseUrlApi}/evento/${id}`));
  }

  updateEvent(id:string, event:Event):Promise<any>{
    return firstValueFrom(this.http.put<any>(`${this.baseUrlApi}/evento/${id}`,event));
  }

  deleteEvent(id:string):Promise<any>{
    return firstValueFrom(this.http.delete<any>(`${this.baseUrlApi}/evento/${id}`));
  }

  // CALENDARS

  createCalendar(calendar:Calendar):Promise<any>{
    return firstValueFrom(this.http.post<any>(`${this.baseUrlApi}/calendario`,calendar));
  }

  getCalendars():Promise<Calendar[]>{
    return firstValueFrom(this.http.get<Calendar[]>(`${this.baseUrlApi}/calendarios`));
  }

  getCalendarById(id:string):Promise<Calendar>{
    return firstValueFrom(this.http.get<Calendar>(`${this.baseUrlApi}/calendario/${id}`));
  }

  updateCalendar(id:string, calendar:Calendar):Promise<any>{
    return firstValueFrom(this.http.put<any>(`${this.baseUrlApi}/calendario/${id}`, calendar));
  }

  deleteCalendar(id:string):Promise<any>{
    return firstValueFrom(this.http.delete<any>(`${this.baseUrlApi}/calendario/${id}`));
  }
}
