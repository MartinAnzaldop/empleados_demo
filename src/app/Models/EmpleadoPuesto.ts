import { Persona } from "./Persona";
import { Puesto } from "./Puesto";

export class EmpleadoPuesto{
  id: number = 0;
  puesto:  Puesto = new Puesto();
  persona: Persona = new Persona();
}
