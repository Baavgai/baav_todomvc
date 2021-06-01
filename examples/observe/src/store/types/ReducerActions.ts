import * as ac from "store/actions/reduced";

export type ReducerActions =
  | ReturnType<typeof ac.startEditItem>
  | ReturnType<typeof ac.undoEditItem>
  | ReturnType<typeof ac.updateEditItem>
  | ReturnType<typeof ac.updateCurrentEntry>
  ;

