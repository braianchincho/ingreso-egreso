import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularAuth: AngularFireAuth) {
    
   }

  crearUsuario(mail: string, nombre: string, pass: string){
     this.angularAuth.auth.
      createUserWithEmailAndPassword(mail,pass).then(
        res => console.table(res)
      );
  }
}
