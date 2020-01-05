import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { VirtualTimeScheduler } from 'rxjs';
import { IngresoEgreso } from './ingreso-egreso.model';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit {
   form: FormGroup;
   tipo = 'ingreso';
  constructor() { }

  ngOnInit() {
    this.form =  new FormGroup({
      'descripcion': new FormControl('' , Validators.required),
      'monto': new FormControl(0, Validators.min(1))
    });
  }
  ingresoEgreso(): void {
   
    const ingresoEgreso = new IngresoEgreso( 
      { 
        descripcion: this.form.value.descripcion,
        monto: this.form.value.monto,
        tipo: this.tipo
      }
    );
    console.log(ingresoEgreso)
  }
}
