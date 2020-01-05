import * as ui from './ui.actions'

export interface State {
    isLoading: boolean;
}

const intialState: State = {
    isLoading: false
}
export function reducerUI( state = intialState, action: ui.aciones): State {
    switch(action.type) {
        case ui.ACTIVAR_LOADING:
            return {
                isLoading: true
            };

        case ui.DESACTIVAR_LOADING: 
            return {
                isLoading: false 
            }
        default: return state;
    }
}