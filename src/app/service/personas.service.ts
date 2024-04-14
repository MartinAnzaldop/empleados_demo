import { Injectable } from '@angular/core';
import { Persona } from '../Models/Persona';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  private personasKey = 'personas';
  constructor() {}

  obtenerPersonas(): Persona[] {

    const personasJSON = localStorage.getItem(this.personasKey);
    if (personasJSON) {

      return JSON.parse(personasJSON) as Persona[];
    }
    return [];
  }

  eliminarPersona(id: number): void {
    const personas = this.obtenerPersonas();
    const personasFiltradas = personas.filter(persona => persona.id !== id);
    this.guardarPersonas(personasFiltradas);
  }

  guardarPersonas(personas: Persona[]): void {
    const personasJSON = JSON.stringify(personas);
    localStorage.setItem(this.personasKey, personasJSON);
  }

  generarNuevoId(): number {
    const personas = this.obtenerPersonas();
    const ids = personas.map(personas => personas.id);


    if (ids.length > 0) {
        const maxId = Math.max(...ids);
        return maxId + 1;
    } else {
        
        return 1;
    }
}


  agregarPersona(nuevaPersona: Persona): void {
    const personas = this.obtenerPersonas();
    personas.push(nuevaPersona);
    this.guardarPersonas(personas);
  }


  editarPersona(personaEditada: Persona): void {
    const personas = this.obtenerPersonas();

    const index = personas.findIndex(persona => persona.id === personaEditada.id);
    if (index !== -1) {
      personas[index] = personaEditada;
      this.guardarPersonas(personas);
    }
  }
}
