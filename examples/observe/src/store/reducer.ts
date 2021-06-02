import { Reducer } from "redux";
import { AppState } from "types";
import { PrivateActions } from "store/types/PrivateActions";
import { ReducerActions } from "store/types/Actions";

type Actions =
  | PrivateActions
  | ReducerActions
  ;

const InitAppState: AppState = {
  toDoItems: [],
  displayState: "all",
  newEntry: ""
};
// loaded: false,


export const reducer: Reducer<AppState, Actions> = (state = InitAppState, action): AppState => {
  if (action.type === "startEditItem") {
    const found = state.toDoItems.find(x => x.itemId === action.itemId);
    if (found === undefined) {
      return state;
    } else {
      return { ...state, editing: found };
    }
  } else if (action.type === "undoEditItem") {
    return { ...state, editing: undefined };

  } else if (action.type === "updateEditItem") {
    if (state.editing === undefined) {
      return state;
    } else {
      return { ...state, editing: { ...state.editing, text: action.editEntry } };
    }

  } else if (action.type === "updateCurrentEntry") {
    return { ...state, newEntry: action.currentEntry };

  // } else if (action.type === "@fin/mutateState") {    return { ...state, ...action.changes };
  } else if (action.type === "@fin/loadItems") {
    return { ...state, toDoItems: action.toDoItems, displayState: action.displayState ?? state.displayState };

  // } else if (action.type === "@fin/updateDisplayState") {    return { ...state, toDoItems: action.toDoItems, displayState: action.displayState };

  } else {
    return state;
  }
};
