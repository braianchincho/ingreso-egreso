import * as ie from './ingreso-egreso.actions';
import { IngresoEgreso } from './ingreso-egreso.model';
import { State } from '@ngrx/store';

export interface IngresoEgresoState {
    items: IngresoEgreso[]
} 
const estadoInicial = {
    items: []
}
export function ingresoEgresoReducer (state = estadoInicial, action: ie.actions ): IngresoEgresoState{

    switch( action.type ) {
        case ie.SET_ITEMS:
            return {
                items: [
                    ...action.items
                        .map( item =>({...item}))
                ]
            }
        case ie.UNSET_ITEMS: 
            return {
                items: []
            }
        default: 
            return state;
            
    }
}