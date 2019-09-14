import * as ac from "store/actionCreators";

export type Actions =
    | ReturnType<typeof ac.nav>
    | ReturnType<typeof ac.updateName>
    | ReturnType<typeof ac.choosePet>
    | ReturnType<typeof ac.appLoad>
    ;
