import { createStore, compose, Store, StoreEnhancer} from "redux";
import { AppState, InitAppState } from "store/types";
import { reducer } from "store/reducer";


const createEnhancer = (): StoreEnhancer | undefined => {
    if (typeof window === "undefined") {
        return undefined;
    } else {
        // eslint-disable-next-line no-underscore-dangle
        const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        return composeEnhancer();
    }
};

export function configureStore(): Store<AppState> {
    const store = createStore(
        reducer,
        InitAppState,
        createEnhancer()
    );
    return store;
}
