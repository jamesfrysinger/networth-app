import { FC, ReactNode, createContext, useContext, useReducer } from "react";
import { reducer } from "reducers/reducer";
import { IContext } from "types/contextTypes";

const defaultValue: IContext = {
  state: {
    authorization: {
      status: false,
      firebase: {},
    },
    netWorth: 0,
  },
  dispatch: () => {},
};

const AppContext = createContext<IContext>(defaultValue);

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultValue.state);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
