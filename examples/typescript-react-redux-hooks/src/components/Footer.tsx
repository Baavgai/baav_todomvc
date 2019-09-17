import * as React from "react";
import { AppState, DisplayState, useConnectedAppSelector, AppDispatchProp } from "store";
import { updateDisplayState, clearCompleted } from "store/actionCreators";

interface ViewProps extends AppState, AppDispatchProp {
    liveItemCount: number;
    canClear: boolean;
}
const ClearButton = ({ canClear, dispatch }: ViewProps) =>
    !canClear
        ? <></>
        :
        <button
            className="clear-completed"
            onClick={e => dispatch(clearCompleted())}>
            Clear completed
        </button>
    ;

const Count = (p: ViewProps) =>
    <span className="todo-count"><strong>{p.liveItemCount}</strong> {p.liveItemCount === 1 ? "item" : "items"} left</span>;

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
    const p = useConnectedAppSelector<ViewProps>(s => ({
        ...s,
        liveItemCount: s.toDoItems.filter(x => !x.completed).length,
        canClear: s.toDoItems.some(x => x.completed)
    }));
    return (
        <footer className="footer">
            <Count {...p} />
            <Filters {...p} />
            <ClearButton {...p} />
        </footer>
    );
};
