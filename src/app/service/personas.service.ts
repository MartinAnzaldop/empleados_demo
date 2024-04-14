import { Injectable } from '@angular/core';
import { Persona } from '../Models/Persona';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  private personasKey = 'personas';
  constructor() {}
    // Método para obtener la lista de personas
  obtenerPersonas(): Persona[] {
    // Lee los datos de localStorage
    const personasJSON = localStorage.getItem(this.personasKey);
    if (personasJSON) {
      // Convierte los datos JSON a una lista de objetos Persona
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

    // Si la lista de IDs no está vacía, calcula el máximo ID
    if (ids.length > 0) {
        const maxId = Math.max(...ids); // Calcula el máximo ID existente en la lista de IDs
        return maxId + 1; // Retorna el máximo ID incrementado en 1
    } else {
        // Si no hay puestos, comienza con el ID 1
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
