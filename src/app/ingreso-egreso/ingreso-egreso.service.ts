import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthState } from '../auth/auth.reducer';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private afDB: AngularFirestore,
    private authService: AuthService) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso ) {
    const user = this.authService.getUser(); 
    return this.afDB.doc(`${user.uid}/ingreso-egreso`)
      .collection('items').add({...ingresoEgreso})
    
  }


}
