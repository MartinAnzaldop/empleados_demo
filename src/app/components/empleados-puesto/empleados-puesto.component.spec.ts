import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosPuestoComponent } from './empleados-puesto.component';

describe('EmpleadosPuestoComponent', () => {
  let component: EmpleadosPuestoComponent;
  let fixture: ComponentFixture<EmpleadosPuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadosPuestoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadosPuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
