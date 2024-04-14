import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Puesto } from 'src/app/Models/Puesto';
import { PuestoService } from 'src/app/service/puesto.service';

@Component({
  selector: 'app-puestos',
  templateUrl: './puestos.component.html',
  styleUrls: ['./puestos.component.css']
})
export class PuestosComponent implements OnInit {
  PuestoForm: FormGroup;
  puestos: Puesto[] = [];
  puestoSeleccionado: Puesto | null = null;
  filtro: string = '';
  cantidad: number = 0;
  titulo: string = 'Agregar puesto';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private puestoService: PuestoService
  ) {
    this.PuestoForm = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarPuestos();
    this.obtenerPuestosFiltrados();
    this.cantidad = this.puestos.length;
  }

  cargarPuestos(): void {
    this.puestos = this.puestoService.obtenerPuesto();
  }

  guardarCambios(): void {
    if (this.PuestoForm.valid) {
      this.titulo = 'Agregar puesto';
      if (this.puestoSeleccionado) {
        // Editar puesto existente
        const puestoEditado: Puesto = {
          id: this.puestoSeleccionado.id,
          nombre: this.PuestoForm.get('nombre')?.value,
        };
        this.puestoService.editarPuesto(puestoEditado);
      } else {
        // Agregar nuevo puesto
        const nuevoPuesto: Puesto = {
          id: this.puestoService.generarNuevoId(),
          nombre: this.PuestoForm.get('nombre')?.value,
        };
        this.puestoService.agregarPuesto(nuevoPuesto);
      }
      this.cargarPuestos();
      this.PuestoForm.reset();
      this.puestoSeleccionado = null;
    } else {
      console.log('Formulario no válido');
    }
  }

  seleccionarPuesto(puesto: Puesto): void {
    this.titulo = 'Editar puesto';
    this.puestoSeleccionado = puesto;
    this.PuestoForm.patchValue({
      nombre: puesto.nombre,
    });
  }

  eliminarPuesto(id: number): void {
    this.puestoService.eliminarPuesto(id);
    this.cargarPuestos();
  }

  obtenerPuestosFiltrados(): Puesto[] {
    if (!this.filtro) {
      return this.puestoService.obtenerPuesto();
    }
    const filtroLower = this.filtro.toLowerCase();
    return this.puestos.filter(puesto =>
      puesto.nombre.toLowerCase().includes(filtroLower)
    );
  }
}
