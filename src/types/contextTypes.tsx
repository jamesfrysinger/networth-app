import { Dispatch } from "react";

export interface IAuthorizationState {
  status: boolean;
  firebase: {};
}
export interface IContextState {
  authorization: IAuthorizationState;
  netWorth: number;
}
export interface IContext {
  state: IContextState;
  dispatch: Dispatch<{ type: string; payload: IContextState }>;
}
