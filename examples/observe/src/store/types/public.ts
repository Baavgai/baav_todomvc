import { EpicActions } from "store/types/EpicActions";
import { ReducerActions } from "store/types/ReducerActions";

import { Dispatch } from "redux";

export type Actions =
  | EpicActions
  | ReducerActions
  ;

export type AppDispatch = Dispatch<Actions>;

// export type AppDispatchProp = { dispatch: Dispatch<Actions> };