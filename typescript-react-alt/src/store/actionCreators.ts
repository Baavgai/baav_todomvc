import { PetType, Page } from "store/types";

export const nav = (page: Page) => ({ type: "@@app/nav", page } as const);

export const updateName = (playerName: string) => ({ type: "@@app/updateName", playerName } as const);

export const choosePet = (pet?: PetType) => ( { type: "@@app/choosePet", pet } as const);

export const appLoad = () => ({ type: "@@app/load" } as const);
