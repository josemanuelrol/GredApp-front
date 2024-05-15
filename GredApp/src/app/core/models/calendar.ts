import { ID } from "./id";

export interface Calendar {
  _id?:ID,
  nombre?:string,
  user_id?:string,
  eventos?:Event[]
}
