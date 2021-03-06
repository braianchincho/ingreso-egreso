import { Component} from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent {

  constructor(public auth: AuthService, public store: Store<AppState>) { }

  cerrarSesion() {
    this.auth.cerrarSesion();
  }

}
