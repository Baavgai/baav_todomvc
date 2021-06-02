import * as React from "react";

import { useAppController, useAppSelector, AppController } from "store";
import { ToDoItem } from "types";
import { enterHandler } from "appUtil";


export interface TodoItemProps {
  item: ToDoItem;
}

interface ViewProps extends AppController {
  item: ToDoItem;
  editing: boolean;
}

const ViewField = (p: ViewProps) =>
  <div className="view">
    <input
      className="toggle"
      type="checkbox"
      checked={p.item.completed}
      onChange={() => p.toggleItem(p.item.itemId)}
    />
    <label onDoubleClick={() => p.startEditItem(p.item.itemId)}>{p.item.text}</label>
    <button className="destroy" onClick={() => p.destroyItem(p.item.itemId)} />
  </div>;

const EditField = (p: ViewProps) =>
  <input
    className="edit"
    value={p.item.text}
    onBlur={() => p.undoEditItem()}
    onChange={e => p.updateEditItem(e.target.value)}
    onKeyDown={enterHandler(p.commitEditItem)}
  />;

export const TodoItem = (p: TodoItemProps) => {
  const ac = useAppController();
  const vp = useAppSelector<ViewProps>(s => {
    const editing = p.item.itemId === s.editing?.itemId;
    const item = editing ? s.editing! : p.item;
    return {
      item,
      editing,
      ...ac
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
