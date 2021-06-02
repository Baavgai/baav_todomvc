import * as React from "react";

export const enterHandler = (entryCall: () => void) => (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
        e.preventDefault();
        entryCall();
    }
};

/*
import * as React from "react";
import { AnyAction, Dispatch } from "redux";

export const enterHandler = (dispatch: Dispatch, actionCreator: () => AnyAction) => (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
        e.preventDefault();
        dispatch(actionCreator());
    }
};

*/