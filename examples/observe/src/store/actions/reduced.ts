export const startEditItem = (itemId: number) =>
  ({ type: "@@app/startEditItem", itemId } as const);

export const undoEditItem = () =>
  ({ type: "@@app/undoEditItem" } as const);

export const updateEditItem = (editEntry: string) =>
  ({ type: "@@app/updateEditItem", editEntry } as const);

export const updateCurrentEntry = (currentEntry: string) =>
  ({ type: "@@app/updateCurrentEntry", currentEntry } as const);

