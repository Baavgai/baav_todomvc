import * as React from "react";
import { useAppDispatch, useAppSelector } from "store";
import * as ac from "store/actions";
import { DisplayState } from "types";

interface ViewProps {
  displayState: DisplayState;
  liveItemCount: number;
  canClear: boolean;
  updateDisplayState: (displayState: DisplayState) => void;
  clearCompleted: () => void;
}
const ClearButton = (p: ViewProps) =>
  !p.canClear
    ? <></>
    :
    <button
      className="clear-completed"
      onClick={() => p.clearCompleted()}>
      Clear completed
        </button>
  ;

const Count = (p: ViewProps) =>
  <span className="todo-count"><strong>{p.liveItemCount}</strong> {p.liveItemCount === 1 ? "item" : "items"} left</span>;

const FilterItem = (p: ViewProps & { filterState: DisplayState }) =>
  <li><a href="#" onClick={() => p.updateDisplayState(p.filterState)}
    className={p.displayState === p.filterState ? "selected" : ""}>{
      p.filterState === "all"
        ? "All"
        : (p.filterState === "active") ? "Active" : "Completed"
    }</a>
  </li>;

const Filters = (p: ViewProps) =>
  <ul className="filters">
    <FilterItem {...p} filterState="all" />
    <FilterItem {...p} filterState="active" />
    <FilterItem {...p} filterState="completed" />
  </ul>;

export const Footer = () => {
  const dispatch = useAppDispatch();
  const p = useAppSelector<ViewProps>(s => ({
    displayState: s.displayState,
    liveItemCount: s.toDoItems.filter(x => !x.completed).length,
    canClear: s.toDoItems.some(x => x.completed),
    updateDisplayState: x => dispatch(ac.updateDisplayState(x)),
    clearCompleted: () => dispatch(ac.clearCompleted())
  }));
  return (
    <footer className="footer">
      <Count {...p} />
      <Filters {...p} />
      <ClearButton {...p} />
    </footer>
  );
};
