import * as React from "react";
import { useAppReducer } from "store";
import { enterHandler } from "appUtil";
import { addEntry, updateCurrentEntry } from "store/actionCreators";

export const Header = () => {
    const p = useAppReducer();
    return (
        <header className="header">
            <h1>todos</h1>
            <input
                className="new-todo"
                placeholder="What needs to be done?"
                value={p.newEntry}
                onKeyDown={enterHandler(p.dispatch, addEntry)}
                onChange={e => p.dispatch(updateCurrentEntry(e.target.value))}
                autoFocus={true}
            />
        </header>
    );
};
