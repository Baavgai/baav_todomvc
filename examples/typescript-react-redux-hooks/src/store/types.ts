export interface ToDoItem {
    text: string;
    completed: boolean;
}

export type DisplayState = "all" | "active" | "completed";

export interface AppState {
    toDoItems: ToDoItem[];
    displayState: DisplayState;
    newEntry: string;
    editEntry: string;
    editing?: number;
    loaded: boolean;
}

export const InitAppState: AppState = {
    toDoItems: [],
    loaded: false,
    displayState: "all",
    newEntry: "",
    editEntry: ""
};
