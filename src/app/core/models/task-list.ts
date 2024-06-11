import { Task } from './task';
import { ID } from "./id";

export interface TaskList {
  _id?:ID,
  nombre?:string,
  user_id?:string,
  tareas?:Task[],
}
