import { ID } from "./id";

export interface Event {
  _id?:ID,
  user_id?:string,
  titulo?:string,
  fecha?:string,
  allDay?:boolean
}
