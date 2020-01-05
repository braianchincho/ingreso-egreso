import { Action } from '@ngrx/store';
import { User } from './user.model';

export const SET_USER = '[auth] set user';
export const UNSET_USER = '[auth] unset user';

export class SetUserAction implements Action {
    readonly type = SET_USER;
    constructor(public user: User){}
}
export class UnSetUserAction implements Action {
    readonly type = UNSET_USER;
}
export type actions = SetUserAction | UnSetUserAction;