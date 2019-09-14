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
