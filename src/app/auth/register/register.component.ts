import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {
  cargando = false;
  subscription: Subscription;
  constructor(public auth: AuthService, 
    public store$: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store$.select('ui').subscribe( state => 
      this.cargando = state.isLoading)
  }
  onSubmit(data): void {
    const  { mail , name, pass } = data;
    this.auth.crearUsuario(mail, name, pass);
    
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
