import { DisplayState } from "store";

export const updateCurrentEntry = (currentEntry: string) =>
    ({ type: "@@app/updateCurrentEntry", currentEntry } as const);

export const updateDisplayState = (displayState: DisplayState) =>
    ({ type: "@@app/updateDisplayState", displayState } as const);

export const addEntry = () =>
    ({ type: "@@app/addEntry" } as const);

export const appLoad = () =>
    ({ type: "@@app/load" } as const);

export const clearCompleted = () =>
    ({ type: "@@app/clearCompleted" } as const);

export const toggleItem = (itemIndex: number) =>
    ({ type: "@@app/toggleItem", itemIndex } as const);

export const destroyItem = (itemIndex: number) =>
    ({ type: "@@app/destroyItem", itemIndex } as const);

export const startEditItem = (itemIndex: number) =>
    ({ type: "@@app/startEditItem", itemIndex } as const);

export const undoEditItem = () =>
    ({ type: "@@app/undoEditItem" } as const);

export const commitEditItem = () =>
    ({ type: "@@app/commitEditItem" } as const);

export const updateEditItem = (editEntry: string) =>
    ({ type: "@@app/updateEditItem", editEntry } as const);

export const toggleAll = () =>
    ({ type: "@@app/toggleAll" } as const);
