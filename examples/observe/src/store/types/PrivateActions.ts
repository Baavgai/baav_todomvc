import { AppState } from "types";

export type PrivateActions =
  | { type: "@fin/mutateState"; changes: Partial<AppState> }
  ;

/*
| { type: "@fin/appLoad"; toDoItems: ToDoItem[]; }
  | { type: "@fin/mutateState"; changes: Partial<AppState> }
  | { type: "@priv/startEditItem"; itemId: number }
  | { type: "@priv/undoEditItem" }
  | { type: "@priv/updateEditItem"; editEntry: string }
  | { type: "@priv/updateCurrentEntry"; currentEntry: string }

*/