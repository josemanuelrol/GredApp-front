import { TaskList } from '../models/task-list';
import { Task } from '../models/task';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { first, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksListsService {

  private readonly baseUrlApi: string = environment.baseUrlApi;

  private http = inject(HttpClient);

  constructor() { }

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

  getTasksByUser(idUser:string):Promise<TaskList[]>{
    return firstValueFrom(this.http.get<TaskList[]>(`${this.baseUrlApi}/user/${idUser}/listaTareas`));
  }

  updateTaskList(id:string, taskList:TaskList):Promise<any>{
    return firstValueFrom(this.http.put<any>(`${this.baseUrlApi}/listaTareas/${id}`, taskList));
  }

  deleteTaskList(id:string):Promise<any>{
    return firstValueFrom(this.http.delete<any>(`${this.baseUrlApi}/listaTareas/${id}`));
  }

  //TASKS

  getTasks(idList:string):Promise<Task[]>{
    return firstValueFrom(this.http.get<Task[]>(`${this.baseUrlApi}/listaTareas/${idList}/getTasks`));
  }

  getTaskById(idList:string, idTask:string):Promise<Task>{
    return firstValueFrom(this.http.get<Task>(`${this.baseUrlApi}/listaTareas/${idList}/getTask/${idTask}`));
  }

  addTask(idList:string, task:Task):Promise<any>{
    return firstValueFrom(this.http.put<any>(`${this.baseUrlApi}/listaTareas/${idList}/addTask`, task));
  }

  updateTask(idList:string, idTask:string, task:Task):Promise<any>{
    return firstValueFrom(this.http.put<any>(`${this.baseUrlApi}/listaTareas/${idList}/updateTask/${idTask}`, task));
  }

  deleteTask(idList:string, idTask:string):Promise<any>{
    return firstValueFrom(this.http.put<any>(`${this.baseUrlApi}/listaTareas/${idList}/deleteTask/${idTask}`, {}))
  }

}
