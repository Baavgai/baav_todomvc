import * as React from "react";
import { useAppController, useAppSelector } from "store";
import { TodoItem } from "components/TodoItem";
import { ToDoItem as ItemType } from "types";


interface ViewProps {
  liveItems: ItemType[];
}

const Input = (p: ViewProps) => {
  const { toggleAll } = useAppController();

  return (<input
    id="toggle-all"
    className="toggle-all"
    type="checkbox"
    onChange={toggleAll}
    checked={p.liveItems.length === 0}
  />);
};

const TodoList = (p: ViewProps) =>
  <ul className="todo-list">
    {p.liveItems.map(x => <TodoItem key={x.itemId} item={x} />)}
  </ul>;

const Live = (p: ViewProps) =>
  <section className="main">
    <Input {...p} />
    <label htmlFor="toggle-all" />
    <TodoList {...p} />
  </section>;

export const Main = () => {
  const liveItems = useAppSelector<ItemType[]>(s =>
    s.displayState === "all"
      ? s.toDoItems
      : s.toDoItems
        .map(x => ({ item: x, keep: x.completed === (s.displayState === "completed") }))
        .filter(x => x.keep)
        .map(x => x.item));
  return liveItems.length === 0 ? <></> : <Live liveItems={liveItems} />;
};
