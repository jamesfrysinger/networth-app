import { ACTION_NETWORTH, ACTION_SIGNIN } from "actions";
import { IContextState } from "types/contextTypes";

export const reducer = (
  state: IContextState,
  action: { type: string; payload: IContextState }
): IContextState => {
  switch (action.type) {
    case ACTION_NETWORTH:
      return { ...state, netWorth: action.payload.netWorth };
    case ACTION_SIGNIN:
      return { ...state, authorization: action.payload.authorization };
    default:
      return state;
  }
};
