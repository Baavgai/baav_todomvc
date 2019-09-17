import * as React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "store";
import { enterHandler } from "appUtil";
import { addEntry, updateCurrentEntry } from "store/actionCreators";


const Input = () => {
    const p = useAppSelector(x => x);
    const dispatch = useDispatch();
    return (
        <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={p.newEntry}
            onKeyDown={enterHandler(dispatch, addEntry)}
            onChange={e => dispatch(updateCurrentEntry(e.target.value))}
            autoFocus={true}
        />);
};

export const Header = () =>
    <header className="header">
        <h1>todos</h1>
        <Input />
    </header>
    ;

