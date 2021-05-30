import * as React from "react";
import { ToDoItem as ToDoItemType, AppDispatchProp } from "store";
import { enterHandler } from "appUtil";
import { toggleItem, destroyItem, startEditItem, updateEditItem, undoEditItem, commitEditItem } from "store/actionCreators";

import { useAppReducer } from "store";

export interface TodoItemProps {
    itemIndex: number;
}

interface ViewProps extends ToDoItemType, TodoItemProps, AppDispatchProp {
    // editing: boolean;
    editEntry: string;
}

const ViewField = (p: ViewProps) =>
    <div className="view">
        <input
            className="toggle"
            type="checkbox"
            checked={p.completed}
            onChange={() => p.dispatch(toggleItem(p.itemIndex))}
        />
        <label onDoubleClick={() => p.dispatch(startEditItem(p.itemIndex))}>{p.text}</label>
        <button className="destroy" onClick={() => p.dispatch(destroyItem(p.itemIndex))} />
    </div>;

const EditField = (p: ViewProps) =>
    <input
        className="edit"
        value={p.editEntry}
        onBlur={() => p.dispatch(undoEditItem())}
        onChange={e => p.dispatch(updateEditItem(e.target.value))}
        onKeyDown={enterHandler(p.dispatch, commitEditItem)}
    />;

export const TodoItem = ({ itemIndex }: TodoItemProps) => {
    const s = useAppReducer();
    const { dispatch, editEntry } = s;
    const item = s.toDoItems[itemIndex];
    const p: ViewProps = {...item, editEntry, dispatch,  itemIndex };
    const className = [(s.editing === itemIndex ? "editing" : undefined), (item.completed ? "completed" : undefined)]
        .filter(x => x)
        .join(" ");
    return (
        <li className={className}>
            <ViewField {...p} />
            <EditField {...p} />
        </li>);

};
