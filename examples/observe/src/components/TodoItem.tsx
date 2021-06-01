import * as React from "react";

import { useAppDispatch, useAppSelector, AppDispatch } from "store";
import { ToDoItem } from "types";
import { enterHandler } from "appUtil";
import { toggleItem, destroyItem, startEditItem, updateEditItem, undoEditItem, commitEditItem } from "store";

export interface TodoItemProps {
  item: ToDoItem;
}

interface ViewProps {
  item: ToDoItem;
  editing: boolean;
  dispatch: AppDispatch;
}

const ViewField = (p: ViewProps) =>
  <div className="view">
    <input
      className="toggle"
      type="checkbox"
      checked={p.item.completed}
      onChange={() => p.dispatch(toggleItem(p.item.itemId))}
    />
    <label onDoubleClick={() => p.dispatch(startEditItem(p.item.itemId))}>{p.item.text}</label>
    <button className="destroy" onClick={() => p.dispatch(destroyItem(p.item.itemId))} />
  </div>;

const EditField = (p: ViewProps) =>
  <input
    className="edit"
    value={p.item.text}
    onBlur={() => p.dispatch(undoEditItem())}
    onChange={e => p.dispatch(updateEditItem(e.target.value))}
    onKeyDown={enterHandler(p.dispatch, commitEditItem)}
  />;

export const TodoItem = (p: TodoItemProps) => {
  const dispatch = useAppDispatch();
  const vp = useAppSelector<ViewProps>(s => {
    const editing = p.item.itemId === s.editing?.itemId;
    const item = editing ? s.editing! : p.item;
    return {
      item,
      editing,
      dispatch
    };
  });
  const itemClassName = [(vp.editing ? "editing" : undefined), (vp.item.completed ? "completed" : undefined)]
    .filter(x => x)
    .join(" ");
  return (
    <li className={itemClassName}>
      <ViewField {...vp} />
      <EditField {...vp} />
    </li>
  );
};

/*
export const TodoItem = ({ itemId }: TodoItemProps) => {
    const p = useConnectedAppSelector<ViewProps>(s => {
        const item = s.toDoItems.find(x => x.itemId === itemId);
        const editing = s.editing?.itemId === itemIndex;
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
};
*/
