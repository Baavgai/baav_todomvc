import * as ac from "store/actionCreators";

export type Actions =
    | ReturnType<typeof ac.updateCurrentEntry>
    | ReturnType<typeof ac.updateDisplayState>
    | ReturnType<typeof ac.addEntry>
    | ReturnType<typeof ac.appLoad>
    | ReturnType<typeof ac.clearCompleted>
    | ReturnType<typeof ac.toggleItem>
    | ReturnType<typeof ac.destroyItem>
    | ReturnType<typeof ac.startEditItem>
    | ReturnType<typeof ac.undoEditItem>
    | ReturnType<typeof ac.commitEditItem>
    | ReturnType<typeof ac.updateEditItem>
    ;
