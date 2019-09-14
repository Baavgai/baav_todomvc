import { DisplayState } from "types";

export const updateCurrentEntry = (currentEntry: string) =>
    ({ type: "updateCurrentEntry", currentEntry } as const);

export const updateDisplayState = (displayState: DisplayState) =>
    ({ type: "updateDisplayState", displayState } as const);

export const addEntry = () =>
    ({ type: "addEntry" } as const);
