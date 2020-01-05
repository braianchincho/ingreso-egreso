import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as ingresoEgreso from './ingreso-egreso/ingreso-egreso.reducer';
import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import { IngresoEgreso } from './ingreso-egreso/ingreso-egreso.model';

export interface AppState {
    ui: ui.State,
    auth: auth.AuthState,
    items: ingresoEgreso.IngresoEgresoState
}

export const appReducer: ActionReducerMap<AppState> = {
    ui: ui.reducerUI,
    auth: auth.reducerAuth,
    items: ingresoEgreso.ingresoEgresoReducer
}