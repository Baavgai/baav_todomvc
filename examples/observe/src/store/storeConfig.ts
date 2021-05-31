import { createStore, compose, Store, StoreEnhancer} from "redux";
import { AppState } from "types";
import { reducer } from "store/reducer";

const InitAppState: AppState = {
  toDoItems: [],
  loaded: false,
  displayState: "all",
  newEntry: "",
  editEntry: ""
};


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


import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import ping, { pingEpic } from './ping';
import users, { fetchUserEpic } from './users';

export const rootEpic = combineEpics(
  pingEpic,
  fetchUserEpic
);

export const rootReducer = combineReducers({
  ping,
  users
});