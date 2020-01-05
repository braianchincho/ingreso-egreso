import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private angularAuth: AngularFireAuth, 
    private router: Router,
    private afDB: AngularFirestore) {}
  initAuthListener() {
    this.angularAuth.authState.subscribe( 
      (res: firebase.User) => {
        console.log('authState: ', res);
    }); 
  }
  crearUsuario(mail: string, nombre: string, pass: string){
     this.angularAuth.auth.
      createUserWithEmailAndPassword(mail.trim(),pass.trim()).then(
        res => {
          const user: User = {
            uid: res.user.uid,
            nombre,
            mail
          }
          this.afDB.doc(`${user.uid}/usuario`)
            .set(user).then(res => {
              this.router.navigate(['/login']);
            }).catch(error => {
              swal.fire('Error al registrar el usuario',error.message,'error')
            })
          
          console.log(res)
        }).catch(error => {
          console.log(error);
          swal.fire('Error al registrar el usuario',error.message,'error')
        });
  }

  iniciarSesion(mail: string, pass: string) {
    this.angularAuth.auth.
    signInWithEmailAndPassword(mail,pass).then(
      res => {
        this.router.navigate(['/']);
    }).catch(error => {
      console.log(error)
      swal.fire('Error al iniciar sesión',error.message,'error')
    })
  }

  cerrarSesion() {
    this.angularAuth.auth.signOut();
    this.router.navigate(['/login']);
  }
  isAuth(): Observable<boolean> {
    return this.angularAuth.authState.pipe(
      map( fsUser => {
        const islogged = fsUser != null;
        if (!islogged) {
          this.router.navigate(['/login']);
        }
        return islogged;
      })
    )
  }
}
