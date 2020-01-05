import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthState } from '../auth/auth.reducer';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {
  ingresoEgresoListener = new Subscription();
  ingresoEgresoItemsSubscription = new Subscription();
  constructor(
    private afDB: AngularFirestore,
    private authService: AuthService,
    private store: Store<AppState>
    ) { }

  initIngresoEgresoListener() {
    this.ingresoEgresoListener = this.store.select('auth').pipe(
      filter(auth => auth.user != null )
    ).subscribe( auth => {
      this.setIngresoEgresoItems(auth.user.uid);
    })
  }
  private setIngresoEgresoItems(uid: string) {
    this.ingresoEgresoItemsSubscription = this.afDB
      .collection(`${uid}/ingreso-egreso/items`)
      .snapshotChanges()
      .pipe( 
        map(data => {
          return data.map( doc => ({
            uid: doc.payload.doc.id,
            ...doc.payload.doc.data()
          }))
        })
      )
      .subscribe((colection: any) => {
        console.log(colection)
        this.store.dispatch(
          new SetItemsAction(colection)
        )
      })
  }
  crearIngresoEgreso(ingresoEgreso: IngresoEgreso ) {
    const user = this.authService.getUser(); 
    return this.afDB.doc(`${user.uid}/ingreso-egreso`)
      .collection('items').add({...ingresoEgreso})
    
  }
   
  cancelarsuscripciones() {
    this.ingresoEgresoListener.unsubscribe();
    this.ingresoEgresoItemsSubscription.unsubscribe();
  }

  borrarIngresoEgreso(uid: string) {
    const user = this.authService.getUser();
      return this.afDB
      .doc(`${user.uid}/ingreso-egreso/items/${uid}`)
      .delete();
  }
  
}
