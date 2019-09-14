import { createStore, compose, Store, StoreEnhancer, AnyAction } from "redux";
import { AppState, InitAppState } from "store/types";
import { reducer } from "store/reducer";
import { Reducer } from "react";

const createEnhancer = (): StoreEnhancer | undefined => {
    if (typeof window === "undefined") {
        return undefined;
    } else {
        const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        return composeEnhancer();
    }
};

export function configureStore(): Store<AppState> {
    const store = createStore(
        (reducer as Reducer<AppState, AnyAction>),
        InitAppState,
        createEnhancer()
    );
    return store;
}
