export * from "./actions";
export * from "./types";
// export * from "./reducer";

import * as React from "react";
import { Dispatch, useContext } from "react";
import { Actions } from "store/actions";
import { InitAppState, AppState } from "store/types";
import { reducer } from "store/reducer";

export type AppDispatch = Dispatch<Actions>;

export type AppDispatchProp = { dispatch: AppDispatch };

export type AppContextType = AppState & AppDispatchProp;

export const AppContext = React.createContext<AppContextType>({...InitAppState, dispatch: () => "dispatch not bound" });

export const initAppReducer = () => React.useReducer(reducer, InitAppState);

export const useAppReducer = () => useContext(AppContext);
