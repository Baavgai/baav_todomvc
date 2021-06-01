import { ofType, combineEpics, Epic } from "redux-observable";
// import { EpicActions as Actions } from "store/types/private";
import { AppState, DisplayState } from "types";
import { Actions as PublicActions } from "store/types/public";
import { mutateState } from "store/actions/private";
import { EMPTY, scheduled } from "rxjs";

import { map, switchMap } from "rxjs/operators";
import { getService } from "service";

type Actions =
  | PublicActions
  | ReturnType<typeof mutateState>


type AppEpic = Epic<Actions, Actions, AppState>;

//       (action$: ActionsObservable<Input>, state$: StateObservable<State>, dependencies: Dependencies): Observable<Output>;


const appLoad: AppEpic = (action$, state$) => action$.pipe(
  ofType("@@app/load"),
  switchMap(() => getService().loadItems("all")),
  map(data => mutateState({ ...state$.value, toDoItems: data }))
);

const commitEditItem: AppEpic = (action$, state$) => action$.pipe(
  ofType("@@app/commitEditItem"),
  switchMap(() => getService().updateItem(state$.value.editing!)),
  switchMap(() => getService().loadItems(state$.value.displayState)),
  map(data => mutateState({ ...state$.value, editing: undefined, toDoItems: data }))
);

const destroyItem: AppEpic = (action$, state$) => action$.pipe(
  ofType("@@app/destroyItem"),
  switchMap(action => action.type === "@@app/destroyItem" ? getService().deleteItem(action.itemId) : EMPTY),
  switchMap(() => getService().loadItems(state$.value.displayState)),
  map(data => mutateState({ ...state$.value, editing: undefined, toDoItems: data }))
);

const updateDisplayState: AppEpic = action$ => action$.pipe(
  ofType("@@app/updateDisplayState"),
  switchMap(action => {
    if (action.type !== "@@app/updateDisplayState") {
      return EMPTY;
    } else {
      const { displayState} = action;
      return getService().loadItems(displayState).then(toDoItems => ({toDoItems, displayState}));
    }
  }),
  map(changes => mutateState(changes))
);


const toggleItem: AppEpic = (action$, state$) => action$.pipe(
  ofType("@@app/toggleItem"),
  switchMap(action => {
    if (action.type !== "@@app/toggleItem") {
      return EMPTY;
    } else {
      return getService().toggleItem(action.itemId);
    }
  }),
  switchMap(() => getService().loadItems(state$.value.displayState)),
  map(data => mutateState({ ...state$.value, toDoItems: data }))
);

export const epics: Epic = combineEpics(appLoad, commitEditItem, destroyItem, updateDisplayState, toggleItem);

/*
const addEntry: AppEpic = (action$, state$) => action$.pipe(
  ({ type: "@@app/addEntry" } as const);

export const clearCompleted = () =>
  ({ type: "@@app/clearCompleted" } as const);

export const toggleItem = (itemId: number) =>
  ({ type: "@@app/toggleItem", itemId } as const);


export const toggleAll = () =>
  ({ type: "@@app/toggleAll" } as const);


export const destroyItem = (itemId: number) =>
  ({ type: "@@app/destroyItem", itemId } as const);


  } else if (action.type === "@@app/commitEditItem") {
    const { toDoItems } = state;
    toDoItems[state.editing!].text = state.editEntry;
    return { ...state, editing: undefined, toDoItems };
const updateDisplayState: AppEpic = (action$, state$) => action$.pipe(
  ofType("@@app/updateDisplayState"),
  switchMap(action => action.type === "@@app/updateDisplayState" ? action.displayState : scheduled<DisplayState | undefined>(undefined)),
  switchMap(nextState => getService().updateItem(state$.value.editing!)),
  switchMap(() => getService().loadItems(state$.value.displayState)),
  map(data => mutateState({ ...state$.value, editing: undefined, toDoItems: data }))


const appLoad = (action$: ActionsObservable<Actions>) => action$.pipe(
AppState
export declare interface Epic<Input extends Action = any, Output extends Input = Input, State = any, Dependencies = any> {
  (action$: ActionsObservable<Input>, state$: StateObservable<State>, dependencies: Dependencies): Observable<Output>;
}

const pingEpic = action$ => action$.pipe(
  ofType('PING'),
  flatMap(action => ajax('https://example.com/pinger')),
  mapTo({ type: 'PONG' })
)

Now, we are going to update our original todo store by adding epics and retrieving users.

import { combineReducers, createStore } from 'redux'
import { ofType, combineEpics, createEpicMiddleware } from 'redux-observable';
import { map, flatMap } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'

// ...

const rootReducer = combineReducers({ user, todos })

const epicMiddleware = createEpicMiddleware();
const userEpic = action$ => action$.pipe(
  ofType('GET_USER'),
  flatMap(() => ajax.getJSON('https://foo.bar.com/get-user')),
  map(user => ({ type: 'GET_USER_SUCCESS', payload: user }))
)

const addTodoEpic = action$ => action$.pipe(
  ofType('ADD_TODO'),
  flatMap(action => ajax({
      url: 'https://foo.bar.com/add-todo',
      method: 'POST',
      body: { text: action.payload }
  })),
  map(data => data.response),
  map(todo => ({ type: 'ADD_TODO_SUCCESS', payload: todo }))
)
const completeTodoEpic = action$ => action$.pipe(
  ofType('COMPLETE_TODO'),
  flatMap(action => ajax({
      url: 'https://foo.bar.com/complete-todo',
      method: 'POST',
      body: { id: action.payload }
  })),
  map(data => data.response),
  map(todo => ({ type: 'COMPLEE_TODO_SUCCESS', payload: todo }))
)

const rootEpic = combineEpics(userEpic, addTodoEpic, completeTodoEpic)
const store = createStore(rootReducer, applyMiddleware(epicMiddleware))
epicMiddleware.run(rootEpic);


export const reducer: Reducer<AppState, Actions> = (state = InitAppState, action) => {
  // console.log("action", action);
  if (action.type === "@@app/addEntry") {
    return { ...state, newEntry: "", toDoItems: [...state.toDoItems, { text: state.newEntry, completed: false }] };

  } else if (action.type === "@@app/updateCurrentEntry") {
    return { ...state, newEntry: action.currentEntry };

  } else if (action.type === "@@app/updateDisplayState") {
    return { ...state, displayState: action.displayState };

  } else if (action.type === "@@app/load" && !state.loaded) {
    return {
      ...state,
      loaded: true,
      toDoItems: ["Get eggs.", "Get milk.", "Get bread.", "Make french toast."].map((text, i) => ({ text, completed: i < 2 }))
    };

  } else if (action.type === "@@app/clearCompleted") {
    return { ...state, toDoItems: state.toDoItems.filter(x => !x.completed) };

  } else if (action.type === "@@app/destroyItem") {
    const { toDoItems } = state;
    toDoItems.splice(action.itemIndex, 1);
    return { ...state, toDoItems };

  } else if (action.type === "@@app/startEditItem") {
    return { ...state, editing: action.itemIndex, editEntry: state.toDoItems[action.itemIndex].text };

  } else if (action.type === "@@app/commitEditItem") {
    const { toDoItems } = state;
    toDoItems[state.editing!].text = state.editEntry;
    return { ...state, editing: undefined, toDoItems };

  } else if (action.type === "@@app/undoEditItem") {
    return { ...state, editing: undefined };

  } else if (action.type === "@@app/updateEditItem") {
    return { ...state, editEntry: action.editEntry };

  } else if (action.type === "@@app/toggleItem") {
    return {
      ...state,
      toDoItems: state.toDoItems.map((x, i) => i === action.itemIndex ? ({ ...x, completed: !x.completed }) : x)
    };

  } else if (action.type === "@@app/toggleAll") {
    const completed = state.toDoItems.some(x => !x.completed);
    return { ...state, toDoItems: state.toDoItems.map(x => ({ ...x, completed })) };

  } else {
    return state;
  }
};

*/
