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
