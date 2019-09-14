import * as React from "react";
import { ToDoItem as ToDoItemType, AppState, appConnect, ConnectedProps } from "store";
import { enterHandler } from "appUtil";
import { toggleItem, destroyItem, startEditItem, updateEditItem, undoEditItem, commitEditItem } from "store/actionCreators";

export interface TodoItemProps {
    itemIndex: number;
}

interface ViewPropsData extends ToDoItemType, TodoItemProps {
    editing: boolean;
    editEntry: string;
}

type ViewProps = ConnectedProps<ViewPropsData>;

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

const itemClassName = (p: ViewProps) =>
    [(p.editing ? "editing" : undefined), (p.completed ? "completed" : undefined)]
        .filter(x => x)
        .join(" ");

const ViewComponent = (p: ViewProps) =>
    <li className={itemClassName(p)}>
        <ViewField {...p} />
        <EditField {...p} />
    </li>;

const mapStateToProps = (s: AppState, { itemIndex }: TodoItemProps): ViewPropsData => {
    const { editEntry } = s;
    const item = s.toDoItems[itemIndex];
    const editing = s.editing === itemIndex;
    return {
        ...item,
        editing, editEntry,
        itemIndex,
    };
};

export const TodoItem = appConnect(mapStateToProps)(ViewComponent);
