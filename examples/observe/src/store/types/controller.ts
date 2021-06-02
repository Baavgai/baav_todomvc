import { DisplayState } from "types";

export interface AppController {
  startEditItem: (itemId: number) => void;
  undoEditItem: () => void;
  updateEditItem: (editEntry: string) => void;
  updateCurrentEntry: (currentEntry: string) => void;

  updateDisplayState: (displayState: DisplayState) => void;
  addEntry: () => void;
  appLoad: () => void;
  clearCompleted: () => void;
  toggleItem: (itemId: number) => void;
  destroyItem: (itemId: number) => void;
  toggleAll: () => void;
  commitEditItem: () => void;
}
