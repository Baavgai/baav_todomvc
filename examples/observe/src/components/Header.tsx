import * as React from "react";
import { useAppSelector, useAppController } from "store";
import { enterHandler } from "appUtil";


const Input = () => {
  const { addEntry, updateCurrentEntry } = useAppController();
  const p = useAppSelector(x => x);
  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      value={p.newEntry}
      onKeyDown={enterHandler(addEntry)}
      onChange={e => updateCurrentEntry(e.target.value)}
      autoFocus={true}
    />);
};

export const Header = () =>
  <header className="header">
    <h1>todos</h1>
    <Input />
  </header>
  ;

