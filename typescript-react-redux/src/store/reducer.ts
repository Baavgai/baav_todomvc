import { Reducer } from "redux";
import { AppState, InitAppState } from "store/types";
import { Actions } from "store/actions";

export const reducer: Reducer<AppState, Actions> = (state = InitAppState, action) => {
    // console.log("action", action);
    if (action.type === "@@app/addEntry") {
        return { ...state, newEntry: "", toDoItems: [...state.toDoItems, { text: state.newEntry, completed: false }] };

    } else if (action.type === "@@app/updateCurrentEntry") {
        return { ...state, newEntry: action.currentEntry };

    } else if (action.type === "@@app/updateDisplayState") {
        return { ...state, displayState: action.displayState };

    } else if (action.type === "@@app/load") {
        return {
            ...state,
            toDoItems: ["Get eggs.", "Get milk.", "Get bread.", "Make french toast."].map((text, i) => ({ text, completed: i < 2 }))
        };

    } else if (action.type === "@@app/clearCompleted") {
        return { ...state, toDoItems: state.toDoItems.filter(x => !x.completed) };

    } else if (action.type === "@@app/destroyItem") {
        const { toDoItems } = state;
        toDoItems.splice(action.itemIndex, 1);
        return { ...state, toDoItems };

    } else if (action.type === "@@app/startEditItem") {
        return { ...state, editing: action.itemIndex, editEntry: state.toDoItems[action.itemIndex].text };

    } else if (action.type === "@@app/commitEditItem") {
        const { toDoItems } = state;
        toDoItems[state.editing!].text = state.editEntry;
        return { ...state, editing: undefined, toDoItems };

    } else if (action.type === "@@app/undoEditItem") {
        return { ...state, editing: undefined };

    } else if (action.type === "@@app/updateEditItem") {
        return { ...state, editEntry: action.editEntry };

    } else if (action.type === "@@app/toggleItem") {
        return {
            ...state,
            toDoItems: state.toDoItems.map((x, i) => i === action.itemIndex ? ({ ...x, completed: !x.completed }) : x)
        };

    } else {
        return state;
    }
};
