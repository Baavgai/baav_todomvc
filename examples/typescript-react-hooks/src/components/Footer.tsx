import * as React from "react";

import { useAppReducer, AppContextType, DisplayState } from "store";
import { updateDisplayState, clearCompleted } from "store/actionCreators";

interface ViewProps extends AppContextType {
    itemsLeft: number;
    canClear: boolean;
}

const ClearButton = ({ canClear, dispatch }: ViewProps) =>
    !canClear
        ? <></>
        :
        <button
            className="clear-completed"
            onClick={() => dispatch(clearCompleted())}>
            Clear completed
        </button>
    ;

const Count = (p: ViewProps) =>
    <span className="todo-count"><strong>{p.itemsLeft}</strong> {p.itemsLeft === 1 ? "item" : "items"} left</span>;

const FilterItem = (p: ViewProps & { filterState: DisplayState }) =>
    <li><a href="#" onClick={() => p.dispatch(updateDisplayState(p.filterState))}
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
    const ctx = useAppReducer();
    const itemsLeft = ctx.toDoItems.filter(x => !x.completed).length;
    const canClear = ctx.toDoItems.some(x => x.completed);
    const p: ViewProps = { ...ctx, itemsLeft, canClear };

    return (
        <footer className="footer">
            <Count {...p} />
            <Filters {...p} />
            <ClearButton {...p} />
        </footer>
    );
};
