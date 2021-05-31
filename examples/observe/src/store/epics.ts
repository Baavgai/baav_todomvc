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
/* user and todos reducers defined as above */
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