import { ID } from "./id";
import { TaskList } from "./task-list";

export interface Task {
  _id?:ID
  titulo?:string,
  descripcion?:string,
  fecha?:Date,
  prioridad?:number,
  completed?:boolean
}
