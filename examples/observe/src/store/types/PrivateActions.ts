import { AppState, ToDoItem, DisplayState } from "types";

export type PrivateActions =
  | { type: "@fin/loadItems"; toDoItems: ToDoItem[]; displayState?: DisplayState }
  ;

/*
  | { type: "@fin/updateDisplayState"; toDoItems: ToDoItem[]; displayState: DisplayState }

*/