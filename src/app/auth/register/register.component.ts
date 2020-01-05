import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }
  onSubmit(data): void {
    const  { mail , name, pass } = data;
    this.auth.crearUsuario(mail, name, pass);
    
  }
}
