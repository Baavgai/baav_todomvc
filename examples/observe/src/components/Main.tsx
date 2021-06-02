import * as React from "react";
import { useAppController, useAppSelector } from "store";
import { TodoItem } from "components/TodoItem";
import { ToDoItem as ItemType } from "types";


interface ViewProps {
  toggleAll: () => void;
  liveItems: ItemType[];
}

const Input = (p: ViewProps) =>
  <input
    id="toggle-all"
    className="toggle-all"
    type="checkbox"
    onChange={() => p.toggleAll()}
    checked={p.liveItems.length === 0}
  />;

const TodoList = (p: ViewProps) =>
  <ul className="todo-list">
    {p.liveItems.map(x => <TodoItem key={x.itemId} item={x} />)}
  </ul>;

const LiveView = (p: ViewProps) =>
  <section className="main">
    <Input {...p} />
    <label htmlFor="toggle-all" />
    <TodoList {...p} />
  </section>;


const Live = (p: { liveItems: ItemType[] }) => {
  const { toggleAll } = useAppController();
  return <LiveView {...p} toggleAll={toggleAll} />;
};

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
//  p.dispatch(toggleAll())}