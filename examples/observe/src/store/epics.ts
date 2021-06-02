import { ofType, combineEpics, Epic } from "redux-observable";
import { AppState, ToDoItem, DisplayState } from "types";
import { EpicActions, ReducerActions } from "store/types/Actions";
import { PrivateActions } from "store/types/PrivateActions";
import { EMPTY, of } from "rxjs";
import { map, mergeMap, switchMap } from "rxjs/operators";
import { getService } from "service";

type Actions = EpicActions | ReducerActions | PrivateActions;

const actionLoadItems = (toDoItems: ToDoItem[], displayState?: DisplayState): Actions =>
  ({ type: "@fin/loadItems", toDoItems, displayState });

const actionLoadItemsNs = (toDoItems: ToDoItem[]) => actionLoadItems(toDoItems);

const actionSetNewEntry = (currentEntry: string): Actions =>
  ({ type: "updateCurrentEntry", currentEntry });

const actionUndoEditItem = (): Actions =>
  ({ type: "undoEditItem" });


export const epics: Epic = combineEpics<Actions, Actions, AppState>(
  action$ => action$.pipe(
    ofType("appLoad"),
    switchMap(() => getService().loadItems("all")),
    map(actionLoadItemsNs)
  ),

  (action$, state$) => action$.pipe(
    ofType("addEntry"),
    switchMap(() => getService().addItem(state$.value.newEntry)),
    switchMap(() => getService().loadItems(state$.value.displayState)),
    mergeMap(toDoItems => of(
      actionSetNewEntry(""),
      actionLoadItems(toDoItems)
    ))
  ),
  // map(toDoItems => mutateState({ newEntry: "", toDoItems }))

  (action$, state$) => action$.pipe(
    ofType("commitEditItem"),
    switchMap(() => getService().updateItem(state$.value.editing!)),
    switchMap(() => getService().loadItems(state$.value.displayState)),
    mergeMap(toDoItems => of(
      actionUndoEditItem(),
      actionLoadItems(toDoItems)
    ))
  ),

  action$ => action$.pipe(
    switchMap(action => action.type === "updateDisplayState"
      ? getService().loadItems(action.displayState).then(toDoItems => actionLoadItems(toDoItems, action.displayState))
      : EMPTY)
  ),

  (action$, state$) => action$.pipe(
    switchMap(action => action.type === "toggleItem" ? getService().toggleItem(action.itemId) : EMPTY),
    switchMap(() => getService().loadItems(state$.value.displayState)),
    map(actionLoadItemsNs)
  ),

  (action$, state$) => action$.pipe(
    ofType("toggleAll"),
    switchMap(() => getService().toggleAll()),
    switchMap(() => getService().loadItems(state$.value.displayState)),
    map(actionLoadItemsNs)
  ),

  (action$, state$) => action$.pipe(
    ofType("clearCompleted"),
    switchMap(() => getService().clearCompleted()),
    switchMap(() => getService().loadItems(state$.value.displayState)),
    map(actionLoadItemsNs)
  ),

  (action$, state$) => action$.pipe(
    switchMap(action => action.type === "destroyItem" ? getService().deleteItem(action.itemId) : EMPTY),
    switchMap(() => getService().loadItems(state$.value.displayState)),
    mergeMap(toDoItems => of(
      actionUndoEditItem(),
      actionLoadItems(toDoItems)
    ))
  )
);
