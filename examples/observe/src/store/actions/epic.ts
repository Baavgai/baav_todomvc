import { DisplayState } from "types";

export const updateDisplayState = (displayState: DisplayState) =>
  ({ type: "@@app/updateDisplayState", displayState } as const);

export const addEntry = () =>
  ({ type: "@@app/addEntry" } as const);

export const appLoad = () =>
  ({ type: "@@app/load" } as const);

export const clearCompleted = () =>
  ({ type: "@@app/clearCompleted" } as const);

export const toggleItem = (itemId: number) =>
  ({ type: "@@app/toggleItem", itemId } as const);

export const destroyItem = (itemId: number) =>
  ({ type: "@@app/destroyItem", itemId } as const);

export const toggleAll = () =>
  ({ type: "@@app/toggleAll" } as const);

export const commitEditItem = () =>
  ({ type: "@@app/commitEditItem" } as const);
