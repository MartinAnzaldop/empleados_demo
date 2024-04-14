import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadoPuesto } from 'src/app/Models/EmpleadoPuesto';
import { Persona } from 'src/app/Models/Persona';
import { Puesto } from 'src/app/Models/Puesto';
import { EmpleadosPuestosService } from 'src/app/service/empleados-puestos.service';
import { PersonasService } from 'src/app/service/personas.service';
import { PuestoService } from 'src/app/service/puesto.service';

@Component({
  selector: 'app-empleados-puesto',
  templateUrl: './empleados-puesto.component.html',
  styleUrls: ['./empleados-puesto.component.css']
})
export class EmpleadosPuestoComponent implements OnInit {
  EmpleadoForm: FormGroup;
  empleado: EmpleadoPuesto[] = [];
  empleadoSeleccionado: EmpleadoPuesto | null = null;
  filtro: string = '';
  titulo: string = 'Agregar empleado';
  personas: Persona[] = [];
  puestos: Puesto[] = [];
  cantidad: number = 0;

  constructor(private fb: FormBuilder,
              private _Empleado: EmpleadosPuestosService,
              private _Persona: PersonasService,
              private _Puesto: PuestoService) {
    this.EmpleadoForm = this.fb.group({
      puesto: ['', Validators.required],
      persona: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.personas = this._Persona.obtenerPersonas();
    this.puestos = this._Puesto.obtenerPuesto();
    this.empleado = this._Empleado.obtenerEmpleado();
    this.obtenerEmpleadoFiltradas();
    this.cantidad = this.empleado.length;
  }

  guardarEmpleado(): void {
    if (this.EmpleadoForm.valid) {
      const puesto = this.EmpleadoForm.get('puesto')?.value;
      const persona = this.EmpleadoForm.get('persona')?.value;

      if (this.empleadoSeleccionado) {
        const empleadoEditado: EmpleadoPuesto = {
          id: this.empleadoSeleccionado.id,
          puesto,
          persona,
        };
        this.titulo = 'Agregar empleado';
        this._Empleado.editarEmpleado(empleadoEditado);
      } else {
        const nuevoEmpleado: EmpleadoPuesto = {
          id: this._Empleado.generarNuevoId(),
          puesto,
          persona,
        };
        this._Empleado.agregarEmpleado(nuevoEmpleado);
      }

      this.empleado = this._Empleado.obtenerEmpleado();
      this.EmpleadoForm.reset();
      this.empleadoSeleccionado = null;
    } else {
      console.log('Formulario no válido');
    }
  }

  seleccionarEmpleado(empleado: EmpleadoPuesto): void {
    const puestoSeleccionado = this.puestos.find(puesto => puesto.id === empleado.puesto.id);
    const personaSeleccionada = this.personas.find(persona => persona.id === empleado.persona.id);

    if (empleado) {
      this.titulo = 'Editar empleado';
      this.empleadoSeleccionado = empleado;
      this.EmpleadoForm.patchValue({
        persona: personaSeleccionada,
        puesto: puestoSeleccionado,
      });
    }
  }

  eliminarEmpleado(id: number): void {
    this._Empleado.eliminarEmpleado(id);
    this.empleado = this._Empleado.obtenerEmpleado();
  }

  obtenerEmpleadoFiltradas(): EmpleadoPuesto[] {
    if (!this.filtro) {
      return this._Empleado.obtenerEmpleado();
    }
    return this.empleado.filter(
      empleado => empleado.puesto.nombre.toLowerCase().includes(this.filtro.toLowerCase()) ||
                  empleado.persona.nombre.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }
}
