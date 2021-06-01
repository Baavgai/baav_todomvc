import * as React from "react";

import { Provider } from "react-redux";
import { configureStore } from "store";
import { appLoad } from "store/actions";
import { AppPage } from "components/AppPage";
import { initService } from "service";

initService(["Get eggs.", "Get milk.", "Get bread.", "Make french toast."].map((text, i) => ({itemId: i + 1000, text, completed: i < 2 })), 0, 0);
const store = configureStore();

store.dispatch(appLoad());

export const App = () =>
    <Provider store={store}>
        <AppPage />
    </Provider>
    ;

/*
import * as React from "react";

import { Provider } from "react-redux";
import { configureStore } from "store";
import { appLoad } from "store/actionCreators";
import { AppPage } from "components/AppPage";

const store = configureStore();

store.dispatch(appLoad());

export const App = () =>
    <Provider store={store}>
        <AppPage />
    </Provider>
    ;

import * as React from "react";
import { AppContext, initAppReducer } from "store";
import { appLoad } from "store/actionCreators";
import { AppPage } from "components/AppPage";

export const App = () => {
    const [state, dispatch] = initAppReducer();
    if (!state.loaded) {
        dispatch(appLoad());
    }
    return (
        <AppContext.Provider value={{ ...state, dispatch }}>
            <AppPage />
        </AppContext.Provider>
    );
};
*/
