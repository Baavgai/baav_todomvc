export * from "./storeConfig";
export * from "./actions";
export * from "./types/public";

import { AppState } from "types";
// import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "store/types/public";

// export type AppDispatch = Dispatch<Actions>;

// import { AppDispatchProp } from "store/types/public";

export const useAppSelector = <TSelected>(selector: (state: AppState) => TSelected, equalityFn?: (left: TSelected, right: TSelected) => boolean) =>
  useSelector<AppState, TSelected>(selector, equalityFn);

export const useAppDispatch = () =>
  useDispatch<AppDispatch>();


/*
import { AppState } from "types";
// import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
// import { Actions } from "store/types";

// export type AppDispatch = Dispatch<Actions>;

import { AppDispatchProp } from "store/types/public";


export const useAppSelector = <TSelected>(selector: (state: AppState) => TSelected, equalityFn?: (left: TSelected, right: TSelected) => boolean) =>
    useSelector<AppState, TSelected>(selector, equalityFn);

export const selectorConnect = <T>(selector: (state: AppState) => T) => {
    const dispatch = useDispatch();
    const dp: AppDispatchProp = { dispatch };
    return (state: AppState) => ({ ...selector(state), ...dp });
};

export const equalityFnConnect = <T>(equalityFn: (left: T, right: T) => boolean) =>
    (left: T & AppDispatchProp, right: T & AppDispatchProp) => equalityFn(right, left);

export const useConnectedAppSelector = <T extends AppDispatchProp>(selector: (state: AppState) => Omit<T, "dispatch">, equalityFn?: (left: Omit<T, "dispatch">, right: Omit<T, "dispatch">) => boolean) => {
    const exSelector = selectorConnect(selector);
    if (equalityFn) {
        return useAppSelector(exSelector, equalityFnConnect(equalityFn));
    } else {
        return useAppSelector(exSelector);
    }
};
*/
