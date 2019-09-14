import React from "react";
import { ReducerState, ReducerAction, Dispatch } from "react";
import { reducer } from "reducer";
import { AppState, InitAppState } from "types";

export type AppContextType = [ReducerState<AppState>, Dispatch<ReducerAction<any>>];

export const AppContext = React.createContext<AppContextType>(undefined);

export const AppProvider: React.FC = ({children}) => {
    const [state, dispatch] = React.useReducer(reducer, InitAppState);
    // const [state, setState] = useState({});
    return (
        <AppContext.Provider value={[state, dispatch]}>
            {children}
        </AppContext.Provider>
    );
}


/*

// onst MusicPlayerContext = React.createContext([{}, () => {}]);
    function createContext<T>(
        defaultValue: T,
        calculateChangedBits?: (prev: T, next: T) => number
    ): Context<T>;

export interface ToDoItem {
    text: string;
    active: boolean;
}

export type DisplayState = "all" | "active" | "completed";

export interface AppState {
    toDoItems: ToDoItem[];
    displayState: DisplayState;
    currentEntry: string;
}

export const InitAppState: AppState = {
    toDoItems: [],
    displayState: "all",
    currentEntry: ""
};

function reducer(state, action) {
    console.log(state, action);
    if (action.type === "updateText") {
      return { ...state, entry: { ...state.entry, value: action.value } };
  
      */