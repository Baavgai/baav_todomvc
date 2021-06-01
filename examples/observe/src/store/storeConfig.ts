import { createStore, compose, Store, StoreEnhancer, applyMiddleware, Middleware} from "redux";
import { createEpicMiddleware } from "redux-observable";
import { AppState } from "types";
import { reducer } from "store/reducer";
import { epics } from "store/epics";
// import { appLoad } from "store";

const createEnhancer = (mid1: Middleware): StoreEnhancer => {
    if (typeof window === "undefined") {
        return applyMiddleware(mid1);
    } else {
        // eslint-disable-next-line no-underscore-dangle
        const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        return composeEnhancer(applyMiddleware(mid1));
    }
};

export function configureStore(): Store<AppState> {
  const epicMiddleware = createEpicMiddleware();
    const store = createStore(
        reducer,
        createEnhancer(epicMiddleware)
    );
    epicMiddleware.run(epics);
    return store;
}

