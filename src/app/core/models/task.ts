import { ID } from "./id";

export interface Task {
  _id?:ID
  titulo?:string,
  descripcion?:string,
  fecha?:Date,
  completed?:boolean
}
