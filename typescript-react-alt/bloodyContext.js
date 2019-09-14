import React, { useReducer, createContext, useContext } from "react";

const AddTodoBtn = () => {
  const dispatch = useContext(TodosDispatch);
  
  return (
    <div className="action-add">
      <button onClick={() => dispatch({ type: "add" })}>Add new todo</button>
    </div>
  );
};

const RemoveAllBtn = () => {
  const dispatch = useContext(TodosDispatch);
  
  return (
    <div className="action-remove-all">
      <button onClick={() => dispatch({ type: "removeAll" })}>Remove all todos</button>
    </div>
  );
};

const Actions = () => (
  <div className="actions-container">
    <AddTodoBtn />
    <RemoveAllBtn />
    //...more actions
  </div>
);

const TodosDispatch = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return { todos: [...state.todos, {}] };
    case "removeAll":
      return { todos: [] };
    default:
      return state;
  }
}; 

const TodoList = () => {
    
  const [state, dispatch] = useReducer(reducer);
  
  return (
    <div className="todo-list">
      <TodosDispatch.Provider value={dispatch}>
        <Actions />
        //...state.todos
      </TodosDispatch.Provider>
    </div>
  );
};