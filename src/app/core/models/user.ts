import { ID } from "./id";

export interface User {
  _id?:ID,
  username?:string,
  password?:string,
  email?:string
}
