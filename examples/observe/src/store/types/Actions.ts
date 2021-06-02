import { DisplayState } from "types";

export type ReducerActions =
  | { type: "startEditItem"; itemId: number }
  | { type: "undoEditItem" }
  | { type: "updateEditItem"; editEntry: string }
  | { type: "updateCurrentEntry"; currentEntry: string }
  ;

export type EpicActions =
  | { type: "appLoad" }
  | { type: "updateDisplayState"; displayState: DisplayState }
  | { type: "addEntry" }
  | { type: "clearCompleted" }
  | { type: "toggleItem"; itemId: number }
  | { type: "destroyItem"; itemId: number }
  | { type: "toggleAll" }
  | { type: "commitEditItem" }
  ;
