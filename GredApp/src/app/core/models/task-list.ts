import { ID } from "./id";

export interface TaskList {
  _id?:ID,
  nombre?:string,
  user_id?:string,
  tasks?:Task[],
  icon?:string
}
