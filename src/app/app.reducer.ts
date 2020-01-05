import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import { ActionReducer, ActionReducerMap } from '@ngrx/store';

export interface AppState {
    ui: ui.State,
    auth: auth.AuthState
}

export const appReducer: ActionReducerMap<AppState> = {
    ui: ui.reducerUI,
    auth: auth.reducerAuth
}