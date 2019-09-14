import { DispatchProp } from "react-redux";

export type Page = "loading" | "start" | "askName" | "askPet" | "showPet" | "done";

export type PetType = "dog" | "cat" | "snake" | "none";

export interface AppState {
    appName: string;
    pageTitle: string;
    playerName: string;
    pet?: PetType;
    page: Page;
}

export type AppStateEx = AppState & DispatchProp;

export const InitAppState: AppState = {
    appName: "Silly State Demo!",
    playerName: "",
    page: "loading",
    pageTitle: "loading"
};
