import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from 'src/app/Models/Persona';
import { PersonasService } from 'src/app/service/personas.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {
  PersonaForm: FormGroup;
  personas: Persona[] = [];
  personaSeleccionada: Persona | null = null;
  filtro: string = '';
  titulo: string = 'Agregar persona';
  cantidad: number = 0;

  constructor(private fb: FormBuilder, private _Persona: PersonasService) {
    this.PersonaForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.personas = this._Persona.obtenerPersonas();
    this.obtenerPersonasFiltradas();
    this.cantidad = this.personas.length;
  }

  guardarCambios(): void {
    if (this.PersonaForm.valid) {
      if (this.personaSeleccionada) {
        const personaEditada: Persona = {
          id: this.personaSeleccionada.id,
          nombre: this.PersonaForm.get('nombre')?.value,
          apellido: this.PersonaForm.get('apellido')?.value,
          fechaNacimiento: (this.PersonaForm.get('fechaNacimiento')?.value)
        };
        this.titulo = 'Agregar persona';
        this._Persona.editarPersona(personaEditada);
      } else {
        const nuevaPersona: Persona = {
          id: this._Persona.generarNuevoId(),
          nombre: this.PersonaForm.get('nombre')?.value,
          apellido: this.PersonaForm.get('apellido')?.value,
          fechaNacimiento: this.PersonaForm.get('fechaNacimiento')?.value
        };
        this._Persona.agregarPersona(nuevaPersona);
      }

      this.personas = this._Persona.obtenerPersonas();
      this.PersonaForm.reset();
      this.personaSeleccionada = null;
    } else {
      console.log('Formulario no válido');
    }
  }

  seleccionarPersona(persona: Persona): void {
    this.titulo = 'Editar persona';
    this.personaSeleccionada = persona;
    this.PersonaForm.patchValue({
      nombre: persona.nombre,
      apellido: persona.apellido,
      fechaNacimiento: persona.fechaNacimiento.toString().split('T')[0]
    });
  }

  eliminarPersona(id: number): void {
    this._Persona.eliminarPersona(id);
    this.personas = this._Persona.obtenerPersonas();
  }

  obtenerPersonasFiltradas(): Persona[] {
    if (!this.filtro || this.filtro.trim() === '') {
      return this._Persona.obtenerPersonas();
    }

    const filtroMin = this.filtro.toLowerCase().trim();

    return this.personas.filter((persona) => {
      const nombreMatch = persona.nombre.toLowerCase().includes(filtroMin);
      const apellidoMatch = persona.apellido.toLowerCase().includes(filtroMin);

      const fechaNacimientoStr = new Date(persona.fechaNacimiento).toISOString().split('T')[0];
      const fechaMatch = fechaNacimientoStr.includes(filtroMin);

      return nombreMatch || apellidoMatch || fechaMatch;
    });
  }
}
