import * as React from "react";
import { appConnect, AppState, ConnectedProps } from "store";
import { TodoItem } from "components/TodoItem";

interface ViewPropData  {
    liveItems: number[];
}

type ViewProps = ConnectedProps<ViewPropData>;

const Input = (p: ViewProps) =>
    <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        onChange={e => console.log("toggleAll", e)}
        checked={p.liveItems.length === 0}
    />;

const TodoList = (p: ViewProps) =>
    <ul className="todo-list">
        {p.liveItems.map(x => <TodoItem key={x} {...p} itemIndex={x} />)}
    </ul>;

const ViewComponent = (p: ViewProps) =>
    p.liveItems.length === 0
        ? <></>
        :
        <section className="main">
            <Input {...p} />
            <label htmlFor="toggle-all" />
            <TodoList {...p} />
        </section>;

const mapStateToProps = (s: AppState): ViewPropData => {
    const liveItems = s.displayState === "all"
        ? s.toDoItems.map((_, i) => i)
        : s.toDoItems
            .map((x, idx) => ({ idx, keep: x.completed === (s.displayState === "completed")}))
            .filter(x => x.keep)
            .map(x => x.idx);
    return { liveItems };
};

export const Main = appConnect(mapStateToProps)(ViewComponent);
