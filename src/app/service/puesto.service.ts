
import { Injectable } from '@angular/core';
import { Puesto } from '../Models/Puesto';

@Injectable({
  providedIn: 'root'
})
export class PuestoService {
  private puestoKey = 'puesto';

  constructor() { }

  obtenerPuesto(): Puesto[] {
    // Lee los datos de localStorage
    const puestoJSON = localStorage.getItem(this.puestoKey);
    if (puestoJSON) {

      return JSON.parse(puestoJSON) as Puesto[];
    }
    return [];
  }

  eliminarPuesto(id: number): void {
    const puesto = this.obtenerPuesto();
    const puestoFiltradas = puesto.filter(puesto => puesto.id !== id);
    this.guardarPuesto(puestoFiltradas);
  }

  guardarPuesto(puesto: Puesto[]): void {
    const puestoJSON = JSON.stringify(puesto);
    localStorage.setItem(this.puestoKey, puestoJSON);
  }

  generarNuevoId(): number {
    const puestos = this.obtenerPuesto();
    const ids = puestos.map(puesto => puesto.id);

    // Si la lista de IDs no está vacía, calcula el máximo ID
    if (ids.length > 0) {
        const maxId = Math.max(...ids); // Calcula el máximo ID existente en la lista de IDs
        return maxId + 1; // Retorna el máximo ID incrementado en 1
    } else {
        // Si no hay puestos, comienza con el ID 1
        return 1;
    }
}


  agregarPuesto(nuevaPuesto: Puesto): void {
    const puesto = this.obtenerPuesto();
    puesto.push(nuevaPuesto);
    this.guardarPuesto(puesto);
  }

  editarPuesto(puestoEditada: Puesto): void {
    const puesto = this.obtenerPuesto();

    const index = puesto.findIndex(puesto => puesto.id === puestoEditada.id);
    if (index !== -1) {
      puesto[index] = puestoEditada;
      this.guardarPuesto(puesto);
    }
  }
}
