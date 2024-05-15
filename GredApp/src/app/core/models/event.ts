import { Calendar } from "./calendar";
import { ID } from "./id";

export interface Event {
  _id?:ID,
  calendar?:Calendar,
  titulo?:string,
  fecha?:Date,
  fecha_final?:Date,
  hora?:Date
}
