import * as React from "react";
import { appConnect, AppState, ConnectedProps } from "store";
import { enterHandler } from "appUtil";
import { addEntry, updateCurrentEntry } from "store/actionCreators";

type ViewProps = ConnectedProps<AppState>;

const Input = (p: ViewProps) =>
    <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={p.newEntry}
        onKeyDown={enterHandler(p.dispatch, addEntry)}
        onChange={e => p.dispatch(updateCurrentEntry(e.target.value))}
        autoFocus={true}
    />;

const ViewComponent = (p: ViewProps) =>
    <header className="header">
        <h1>todos</h1>
        <Input {...p} />
    </header>
    ;

const mapStateToProps = (s: AppState) => s;

export const Header = appConnect(mapStateToProps)(ViewComponent);
