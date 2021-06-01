import * as ac from "store/actions/epic";

export type EpicActions =
  | ReturnType<typeof ac.commitEditItem>
  | ReturnType<typeof ac.updateDisplayState>
  | ReturnType<typeof ac.addEntry>
  | ReturnType<typeof ac.appLoad>
  | ReturnType<typeof ac.clearCompleted>
  | ReturnType<typeof ac.toggleItem>
  | ReturnType<typeof ac.destroyItem>
  | ReturnType<typeof ac.toggleAll>
  ;

