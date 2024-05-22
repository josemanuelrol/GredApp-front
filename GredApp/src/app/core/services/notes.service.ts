import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Note } from '../models/note';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private readonly baseUrlApi: string = environment.baseUrlApi;

  private http = inject(HttpClient);

  constructor() { }

  createNote(note:Note):Promise<any>{
    return firstValueFrom(this.http.post<any>(`${this.baseUrlApi}/nota`, note));
  }

  getAllNotes():Promise<Note[]>{
    return firstValueFrom(this.http.get<Note[]>(`${this.baseUrlApi}/notas`));
  }

  getNoteById(id:string):Promise<Note>{
    return firstValueFrom(this.http.get<Note>(`${this.baseUrlApi}/nota/${id}`));
  }

  getNotesByUser(idUser:string):Promise<Note[]>{
    return firstValueFrom(this.http.get<Note[]>(`${this.baseUrlApi}/user/${idUser}/notas`));
  }

  updateNote(id:string, note:Note):Promise<any>{
    return firstValueFrom(this.http.put<any>(`${this.baseUrlApi}/nota/${id}`, note));
  }

  deleteNote(id:string):Promise<any>{
    return firstValueFrom(this.http.delete<any>(`${this.baseUrlApi}/nota/${id}`));
  }
}
