import * as React from "react";

import { useAppController, useAppSelector } from "store";
import { ToDoItem } from "types";
import { enterHandler } from "appUtil";


export interface TodoItemProps {
  item: ToDoItem;
}

// interface ViewProps extends AppController {  item: ToDoItem;  editing: boolean;}

const ViewField = (p: TodoItemProps) => {
  const { toggleItem, startEditItem, destroyItem } = useAppController();
  return (
    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        checked={p.item.completed}
        onChange={() => toggleItem(p.item.itemId)}
      />
      <label onDoubleClick={() => startEditItem(p.item.itemId)}>{p.item.text}</label>
      <button className="destroy" onClick={() => destroyItem(p.item.itemId)} />
    </div>);
};


const EditField = (p: TodoItemProps) => {
  const { undoEditItem, updateEditItem, commitEditItem } = useAppController();
  return (
    <input
      className="edit"
      value={p.item.text}
      onBlur={() => undoEditItem()}
      onChange={e => updateEditItem(e.target.value)}
      onKeyDown={enterHandler(commitEditItem)}
    />);
};

export const TodoItem = (p: TodoItemProps) => {
  // const ac = useAppController();
  const { editing, item } = useAppSelector(s => {
    const isEditing = p.item.itemId === s.editing?.itemId;
    return { editing: isEditing, item: isEditing ? s.editing! : p.item };
  });
  const itemClassName = [(editing ? "editing" : undefined), (item.completed ? "completed" : undefined)].filter(x => x).join(" ");
  return (
    <li className={itemClassName}>
      <ViewField item={item} />
      <EditField item={item} />
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
