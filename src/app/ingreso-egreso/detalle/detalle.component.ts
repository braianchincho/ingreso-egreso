import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgresoService } from '../ingreso-egreso.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit {

  constructor(
    private store$: Store<AppState>,
    public ingresoergrespoService: IngresoEgresoService
    ) { }

  ngOnInit() {
  }

  borrarIngreso(uid: string) {
    this.ingresoergrespoService
      .borrarIngresoEgreso(uid).then(
        res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        });
  }

}
