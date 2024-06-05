import { ID } from "./id";

export interface Note {
  _id?:ID,
  user_id?:string,
  titulo:string,
  contenido?:string,
}
