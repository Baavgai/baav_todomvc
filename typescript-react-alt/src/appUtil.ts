import * as React from "react";
import { Actions, AppDispatch } from "store";

export const enterHandler = (dispatch: AppDispatch, actionCreator: () => Actions) => (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
        e.preventDefault();
        dispatch(actionCreator());
    }
};
