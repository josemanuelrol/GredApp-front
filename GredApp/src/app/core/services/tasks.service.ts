import { TaskList } from './../models/task-list';
import { Task } from './../models/task';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { first, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private readonly baseUrlApi: string = environment.baseUrlApi;

  private http = inject(HttpClient);

  constructor() { }

  // TAKS

  createTask(task:Task):Promise<any>{
    return firstValueFrom(this.http.post<any>(`${this.baseUrlApi}/tarea`,task));
  }

  getTasks():Promise<Task[]>{
    return firstValueFrom(this.http.get<Task[]>(`${this.baseUrlApi}/tareas`));
  }

  getTaskById(id:string):Promise<Task>{
    return firstValueFrom(this.http.get<Task>(`${this.baseUrlApi}/tarea/${id}`));
  }

  updateTask(id:string, task:Task):Promise<any>{
    return firstValueFrom(this.http.put<any>(`${this.baseUrlApi}/tarea/${id}`, task));
  }

  deleteTask(id:string):Promise<any>{
    return firstValueFrom(this.http.delete<any>(`${this.baseUrlApi}/tarea/${id}`));
  }

  // TASKLIST

  createTaskList(taskList:TaskList):Promise<any>{
    return firstValueFrom(this.http.post<any>(`${this.baseUrlApi}/listaTareas`,taskList));
  }

  getAllTaskLists():Promise<TaskList[]>{
    return firstValueFrom(this.http.get<TaskList[]>(`${this.baseUrlApi}/listasTareas`));
  }

  getTaskListById(id:string):Promise<TaskList>{
    return firstValueFrom(this.http.get<TaskList>(`${this.baseUrlApi}/listaTareas/${id}`));
  }

  updateTaskList(id:string, taskList:TaskList):Promise<any>{
    return firstValueFrom(this.http.put<any>(`${this.baseUrlApi}/listaTareas/${id}`, taskList));
  }

  deleteTaskList(id:string):Promise<any>{
    return firstValueFrom(this.http.delete<any>(`${this.baseUrlApi}/listaTareas/${id}`));
  }


}
