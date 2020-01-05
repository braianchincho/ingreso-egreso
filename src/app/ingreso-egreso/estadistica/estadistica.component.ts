import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {
  ingresos: number;
  egresos: number;

  cuantoIngreso: number;
  cuantoEgreso: number;
  public doughnutChartLabels: Label[] = ['ingresos', 'egresos'];
  public doughnutChartData = [];

  subscription = new Subscription();
  constructor(private store$: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store$
      .select('items')
      .subscribe(
        ingresosEgreso => {
          this.contarIngresosEgresos(ingresosEgreso.items);
          this.sumarIngresoEgreso(ingresosEgreso.items);
        }
      )
  }
  contarIngresosEgresos(items: IngresoEgreso[]) {
    const ingresosFilter =  items
      .filter(item => item.tipo === 'ingreso');
    this.cuantoIngreso = ingresosFilter.length;

    const egresosFilter =  items
     .filter(item => item.tipo === 'egreso')
    this.cuantoEgreso = egresosFilter.length;

    this.doughnutChartData = [this.cuantoIngreso , this.cuantoEgreso] ;

  }
  sumarIngresoEgreso(items: IngresoEgreso[]) {
    this.egresos = items
    .filter(item => item.tipo === 'egreso').
    reduce(
      (a, current) => a + current.monto,
      0);

    this.ingresos = items
      .filter(item => item.tipo === 'ingreso')
      .reduce(
        (a, current) => a + current.monto,
        0);
  }

}
