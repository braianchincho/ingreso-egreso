import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
  cargando = false;
  subscription: Subscription;
  constructor(private auth: AuthService,public store$: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store$.select('ui').subscribe(state => this.cargando = state.isLoading);
  }

  onSubmit(data) {
    const { mail, pass } = data;
    this.auth.iniciarSesion(mail,pass)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
