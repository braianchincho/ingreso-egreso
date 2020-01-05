import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import { IngresoEgreso } from '../ingreso-egreso.model';

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
@Pipe({name: 'ordenar'})
export class OrdenarPipe implements PipeTransform {
  transform(value: IngresoEgreso[], fiel: string) {
     value.sort((a: any,b: any) => {
      if (a[fiel] === b[fiel]) {
        return 0;
      } else if (a[fiel] > b[fiel]) {
        return 1;
      } else {
        return -1;
      }
    })
    return value;
  }
}