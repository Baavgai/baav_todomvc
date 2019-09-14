import * as ac from "actionCreators";

export type Actions =
    | ReturnType<typeof ac.updateCurrentEntry>
    | ReturnType<typeof ac.updateDisplayState>
    | ReturnType<typeof ac.addEntry>
    ;
