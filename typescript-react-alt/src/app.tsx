import * as React from "react";
import {} from "AppPage";
import { AppContext, AppProvider } from "AppContext";
import { AppPage } from 'components/AppPage';


export const App = () =>
    <AppProvider>
        <AppPage />
    </AppProvider>
    ;

/*
export const App = (p: {}) =>
const [state, dispatch] = React.useReducer(reducer, initState());
    <Provider store={store}>
        <AppPage />
    </Provider>
    ;

Reducer<S, A> = (prevState: S, action: A) => S;
    function reducer(state, action) {
        console.log(state, action);
        if (action.type === "updateText") {
          return { ...state, entry: { ...state.entry, value: action.value } };
      
        } else if (action.type === "toPlayerClass") {
          return toPlayerClass(state);
        } else if (action.type === "welcome") {
      */