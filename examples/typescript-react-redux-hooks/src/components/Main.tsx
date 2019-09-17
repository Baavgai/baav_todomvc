import * as React from "react";
import { useConnectedAppSelector, AppDispatchProp } from "store";
import { TodoItem } from "components/TodoItem";
import { toggleAll } from "store/actionCreators";

interface ViewProps extends AppDispatchProp {
    liveItems: number[];
}
const Input = (p: ViewProps) =>
    <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        onChange={e => p.dispatch(toggleAll())}
        checked={p.liveItems.length === 0}
    />;

const TodoList = (p: ViewProps) =>
    <ul className="todo-list">
        {p.liveItems.map(x => <TodoItem key={x} itemIndex={x} />)}
    </ul>;


export const Main = () => {
    const p = useConnectedAppSelector<ViewProps>(s => {
        const liveItems = s.displayState === "all"
            ? s.toDoItems.map((_, i) => i)
            : s.toDoItems
                .map((x, idx) => ({ idx, keep: x.completed === (s.displayState === "completed") }))
                .filter(x => x.keep)
                .map(x => x.idx);
        return { liveItems };
    });
    return p.liveItems.length === 0
        ? <></>
        : (
            <section className="main">
                <Input {...p} />
                <label htmlFor="toggle-all" />
                <TodoList {...p} />
            </section>
        );


};
