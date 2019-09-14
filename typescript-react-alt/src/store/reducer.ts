import { Reducer } from "redux";
import { AppState, InitAppState } from "store/types";
import { Actions } from "store/actions";

export const reducer: Reducer<AppState, Actions> = (state = InitAppState, action) => {
    switch (action.type) {
        case "@@app/load":
            return { ...state, page: "start" };
        case "@@app/updateName":
            return { ...state, playerName: action.playerName };
        case "@@app/nav":
            if (action.page === "start") {
                return { ...state, page: action.page, playerName: "" };
            } else {
                return { ...state, page: action.page };
            }
        case "@@app/choosePet":
            return { ...state, pet: action.pet, page: "showPet" };
        default:
            return state;
    }
};
