
import { Injectable } from '@angular/core';
import { Puesto } from '../Models/Puesto';

@Injectable({
  providedIn: 'root'
})
export class PuestoService {
  private puestoKey = 'puesto';

  constructor() { }

  obtenerPuesto(): Puesto[] {
    
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


    if (ids.length > 0) {
        const maxId = Math.max(...ids);
        return maxId + 1;
    } else {

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
