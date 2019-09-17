export * from "./storeConfig";
export * from "./actions";
export * from "./types";

import { AppState } from "store/types";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "store/actions";

export type AppDispatch = Dispatch<Actions>;

export type AppDispatchProp = { dispatch : Dispatch<Actions> };

export const useAppSelector = <TSelected>(selector: (state: AppState) => TSelected, equalityFn?: (left: TSelected, right: TSelected) => boolean) =>
    useSelector<AppState, TSelected>(selector, equalityFn);

export const selectorConnect = <T>(selector: (state: AppState) => T) => {
    const dispatch: AppDispatch = useDispatch();
    const dp: AppDispatchProp = { dispatch };
    return (state: AppState) => ({ ...selector(state), ...dp });
};

export const equalityFnConnect = <T>(equalityFn: (left: T, right: T) => boolean) =>
    (left: T & AppDispatchProp, right: T & AppDispatchProp) => equalityFn(right, left);

export const useConnectedAppSelector = <T extends AppDispatchProp>(selector: (state: AppState) => Omit<T, "dispatch">, equalityFn?: (left: Omit<T, "dispatch">, right: Omit<T, "dispatch">) => boolean) => {
    // const dispatch = useDispatch();
    // const exSelector = (state: AppState) => ({ ...selector(state), dispatch });
    const exSelector = selectorConnect(selector);
    if (equalityFn) {
        // const exEq = (left: T & DispatchProp, right: T & DispatchProp) => equalityFn(right, left);
        return useAppSelector(exSelector, equalityFnConnect(equalityFn));
    } else {
        return useAppSelector(exSelector);
    }
    
};

// , equalityFn?: (left: T, right: T) => boolean
// export const useAppDispatch = () => useDispatch<Actions>();
// export const useAppDispatch = (action: Actions) => useDispatch<Actions>(action);
// <AppState, T>(f: (appState: AppState) => TStateProps) => connect(f);
// import { DispatchProp } from "react-redux";
// import { connect } from "react-redux";
// import { AppState } from "store/types";

// export type ConnectedProps<TProps> = TProps & DispatchProp;
// export const appConnect = <TStateProps, TOwnProps = {}>(f: (appState: AppState, ownProps?: TOwnProps) => TStateProps) => connect(f);

/*
export const useConnectedAppSelector = <T>(selector: (state: AppState) => T, equalityFn?: (left: T, right: T) => boolean) => {
    // const dispatch = useDispatch();
    // const exSelector = (state: AppState) => ({ ...selector(state), dispatch });
    const exSelector = selectorConnect(selector);
    if (equalityFn) {
        // const exEq = (left: T & DispatchProp, right: T & DispatchProp) => equalityFn(right, left);
        return useAppSelector(exSelector, equalityFnConnect(equalityFn));
    } else {
        return useAppSelector(exSelector);
    }
    
};

*/