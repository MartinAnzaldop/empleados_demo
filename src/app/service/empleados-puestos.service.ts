import { Injectable } from '@angular/core';
import { EmpleadoPuesto } from '../Models/EmpleadoPuesto';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosPuestosService {
  private empleadoKey = 'empleado';
  constructor() { }

  obtenerEmpleado(): EmpleadoPuesto[] {
    // Lee los datos de localStorage
    const empleadoJSON = localStorage.getItem(this.empleadoKey);
    if (empleadoJSON) {
      return JSON.parse(empleadoJSON) as EmpleadoPuesto[];
    }
    return [];
  }

  eliminarEmpleado(id: number): void {
    const empleado = this.obtenerEmpleado();
    const empleadoFiltradas = empleado.filter(empleado => empleado.id !== id);
    this.guardarEmpleado(empleadoFiltradas);
  }

  guardarEmpleado(empleado: EmpleadoPuesto[]): void {
    const empleadoJSON = JSON.stringify(empleado);
    localStorage.setItem(this.empleadoKey, empleadoJSON);
  }

  generarNuevoId(): number {
    const empleado = this.obtenerEmpleado();
    const ids = empleado.map(empleado => empleado.id);

    // Si la lista de IDs no está vacía, calcula el máximo ID
    if (ids.length > 0) {
        const maxId = Math.max(...ids); 
        return maxId + 1; // Retorna el máximo ID incrementado en 1
    } else {
        // Si no hay puestos, comienza con el ID 1
        return 1;
    }
}

  agregarEmpleado(nuevaEmpleado: EmpleadoPuesto): void {
    const empleado = this.obtenerEmpleado();
    empleado.push(nuevaEmpleado);
    this.guardarEmpleado(empleado);
  }

  editarEmpleado(empleadoEditada: EmpleadoPuesto): void {
    const empleado = this.obtenerEmpleado();

    const index = empleado.findIndex(empleado => empleado.id === empleadoEditada.id);
    if (index !== -1) {
      empleado[index] = empleadoEditada;
      this.guardarEmpleado(empleado);
    }
  }
}
