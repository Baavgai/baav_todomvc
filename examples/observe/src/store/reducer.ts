import { Reducer } from "redux";
import { AppState } from "types";
import { PrivateActions } from "store/types/PrivateActions";
import { ReducerActions } from "store/types/ReducerActions";

type Actions =
  | PrivateActions
  | ReducerActions
  ;


const InitAppState: AppState = {
  toDoItems: [],
  loaded: false,
  displayState: "all",
  newEntry: ""
};


export const reducer: Reducer<AppState, Actions> = (state = InitAppState, action): AppState => {
  console.log("reducer action", action);

  if (action.type === "@@app/startEditItem") {
    const found = state.toDoItems.find(x => x.itemId === action.itemId);
    if (found === undefined) {
      return state;
    } else {
      return { ...state, editing: found };
    }
  } else if (action.type === "@@app/undoEditItem") {
    return { ...state, editing: undefined };

  } else if (action.type === "@@app/updateEditItem") {
    if (state.editing === undefined) {
      return state;
    } else {
      return { ...state, editing: {...state.editing, text: action.editEntry } };
    }

  } else if (action.type === "@@app/mutateState") {
    return { ...state, ...action.changes };

  } else {
    return state;
  }
};

/*
  } else if (action.type === "@@app/toggleItem") {
    return {
      ...state,
      toDoItems: state.toDoItems.map((x, i) => i === action.itemIndex ? ({ ...x, completed: !x.completed }) : x)
    };

  } else if (action.type === "@@app/toggleAll") {
    const completed = state.toDoItems.some(x => !x.completed);
    return { ...state, toDoItems: state.toDoItems.map(x => ({ ...x, completed })) };
  if (action.type === "@@app/addEntry") {
    return { ...state, newEntry: "", toDoItems: [...state.toDoItems, { text: state.newEntry, completed: false }] };

  } else if (action.type === "@@app/updateCurrentEntry") {
    return { ...state, newEntry: action.currentEntry };

  } else if (action.type === "@@app/updateDisplayState") {
    return { ...state, displayState: action.displayState };

  } else if (action.type === "@@app/load" && !state.loaded) {
    return {
      ...state,
      loaded: true,
      toDoItems: ["Get eggs.", "Get milk.", "Get bread.", "Make french toast."].map((text, i) => ({ text, completed: i < 2 }))
    };

  } else if (action.type === "@@app/clearCompleted") {
    return { ...state, toDoItems: state.toDoItems.filter(x => !x.completed) };

  } else if (action.type === "@@app/destroyItem") {
    const { toDoItems } = state;
    toDoItems.splice(action.itemIndex, 1);
    return { ...state, toDoItems };

*/