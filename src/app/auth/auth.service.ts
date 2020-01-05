import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { SetUserAction } from './auth.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  subscription: Subscription = new Subscription();
  private user: User;
  constructor(
    private angularAuth: AngularFireAuth, 
    private router: Router,
    private afDB: AngularFirestore,
    private store$: Store<AppState>) {}

  initAuthListener() {
    this.angularAuth.authState.subscribe( 
      (res: firebase.User) => {
        if (res) {
          this.subscription =  this.afDB.doc(`${res.uid}/usuario`)
            .valueChanges().subscribe((user: any) => {
              const userObj = new User( user.nombre, user.mail ,user.uid);
              this.store$.dispatch(
               new SetUserAction( userObj)
              )
              this.user = userObj;
            });
        } else {
          this.user = null;
          this.subscription.unsubscribe();
        }
    }); 
  }
  crearUsuario(mail: string, nombre: string, pass: string){
    this.store$.dispatch(new ActivarLoadingAction());
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
              this.store$.dispatch(new DesactivarLoadingAction());
              this.router.navigate(['/login']);
            }).catch(error => {
              this.store$.dispatch(new DesactivarLoadingAction());
              swal.fire('Error al registrar el usuario',error.message,'error')
            })
          
          console.log(res)
        }).catch(error => {
          console.log(error);
          this.store$.dispatch(new DesactivarLoadingAction());
          swal.fire('Error al registrar el usuario',error.message,'error')
        });
  }

  iniciarSesion(mail: string, pass: string) {
    this.store$.dispatch(new ActivarLoadingAction());
    this.angularAuth.auth.
    signInWithEmailAndPassword(mail,pass).then(
      res => {
        this.store$.dispatch(new DesactivarLoadingAction());
        this.router.navigate(['/']);
    }).catch(error => {
      console.log(error);
      this.store$.dispatch(new DesactivarLoadingAction());
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

  getUser(): User {
    return {...this.user};
  }
}
