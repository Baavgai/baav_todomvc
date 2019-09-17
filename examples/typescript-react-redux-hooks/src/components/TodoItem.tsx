import * as React from "react";
import { ToDoItem as ToDoItemType, useConnectedAppSelector, AppDispatchProp } from "store";
import { enterHandler } from "appUtil";
import { toggleItem, destroyItem, startEditItem, updateEditItem, undoEditItem, commitEditItem } from "store/actionCreators";

export interface TodoItemProps {
    itemIndex: number;
}

interface ViewProps extends ToDoItemType, TodoItemProps, AppDispatchProp {
    editing: boolean;
    editEntry: string;
}

const ViewField = (p: ViewProps) =>
    <div className="view">
        <input
            className="toggle"
            type="checkbox"
            checked={p.completed}
            onChange={e => p.dispatch(toggleItem(p.itemIndex))}
        />
        <label onDoubleClick={e => p.dispatch(startEditItem(p.itemIndex))}>{p.text}</label>
        <button className="destroy" onClick={e => p.dispatch(destroyItem(p.itemIndex))} />
    </div>;

const EditField = (p: ViewProps) =>
    <input
        className="edit"
        value={p.editEntry}
        onBlur={e => p.dispatch(undoEditItem())}
        onChange={e => p.dispatch(updateEditItem(e.target.value))}
        onKeyDown={enterHandler(p.dispatch, commitEditItem)}
    />;

export const TodoItem = ({ itemIndex }: TodoItemProps) => {
    const p = useConnectedAppSelector<ViewProps>(s => {
        const { editEntry } = s;
        const item = s.toDoItems[itemIndex];
        const editing = s.editing === itemIndex;
        return {
            ...item,
            editing, editEntry,
            itemIndex,
        };
    });
    const itemClassName = [(p.editing ? "editing" : undefined), (p.completed ? "completed" : undefined)]
        .filter(x => x)
        .join(" ");
    return (
        <li className={itemClassName}>
            <ViewField {...p} />
            <EditField {...p} />
        </li>
    );
}
