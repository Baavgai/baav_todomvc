import { AppState } from "types";

export const mutateState = (changes: Partial<AppState>) =>
    ({ type: "@@app/mutateState", changes } as const);
