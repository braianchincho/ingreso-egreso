import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent {

  constructor(private auth: AuthService) { }

  cerrarSesion() {
    this.auth.cerrarSesion();
  }

}
