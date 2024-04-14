import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonasComponent } from './components/personas/personas.component';

import { EmpleadosPuestoComponent } from './components/empleados-puesto/empleados-puesto.component';
import { PuestosComponent } from './components/puestos/puestos.component';

const routes: Routes = [
  {path:'', redirectTo: '/Personas', pathMatch: 'full'},
  {path:'Personas', component: PersonasComponent},
  {path:'Puestos', component: PuestosComponent},
  {path:'Empleados', component: EmpleadosPuestoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
