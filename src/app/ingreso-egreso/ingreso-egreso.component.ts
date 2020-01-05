import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { VirtualTimeScheduler, Subscription } from 'rxjs';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
   form: FormGroup;
   tipo = 'ingreso';
   suscription = new Subscription();
   isLoading = false;
   constructor(
    private ingresoService: IngresoEgresoService,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.suscription = this.store.select('ui')
      .subscribe(state => this.isLoading = state.isLoading);
    this.form =  new FormGroup({
      'descripcion': new FormControl('' , Validators.required),
      'monto': new FormControl(0, Validators.min(1))
    });
  }
  ngOnDestroy(){
    this.suscription.unsubscribe();
  }
  ingresoEgreso(): void {
   
    const ingresoEgreso = new IngresoEgreso( 
      { 
        descripcion: this.form.value.descripcion,
        monto: this.form.value.monto,
        tipo: this.tipo
      }
    );
    this.store.dispatch(new ActivarLoadingAction());
    this.ingresoService.crearIngresoEgreso(ingresoEgreso)
      .then( ()  => {
         this.store.dispatch(new DesactivarLoadingAction());
         this.form.reset({'monto':0});
         swal.fire(`${this.tipo} cargado con exito`,'','success')
      }).catch(err => {
        this.store.dispatch(new DesactivarLoadingAction());
        swal.fire(`Error al registrar ${this.tipo} `,'','error')
      })
  }
}
