import * as auth from './auth.actions';
import { User } from './user.model';


export interface AuthState {
    user: User
}

const initialState = {
    user: null
}

export function reducerAuth (state = initialState, action: auth.actions): AuthState {
    switch( action.type ) {
        case auth.SET_USER: 
            return {
                user: {...action.user}
            };
        case auth.UNSET_USER: 
         return null;
        default: 
            return state;
    }
}