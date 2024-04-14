import { TestBed } from '@angular/core/testing';

import { EmpleadosPuestosService } from './empleados-puestos.service';

describe('EmpleadosPuestosService', () => {
  let service: EmpleadosPuestosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpleadosPuestosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
