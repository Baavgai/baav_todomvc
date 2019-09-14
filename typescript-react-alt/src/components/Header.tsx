import * as React from "react";


handleChange: function (event) {
    this.setState({newTodo: event.target.value});
},

handleNewTodoKeyDown: function (event) {
    if (event.keyCode !== ENTER_KEY) {
        return;
    }

    event.preventDefault();

    var val = this.state.newTodo.trim();

    if (val) {
        this.props.model.addTodo(val);
        this.setState({newTodo: ''});
    }
},

toggleAll: function (event) {
    var checked = event.target.checked;
    this.props.model.toggleAll(checked);
},


const Header = () =>
    <header className="header">
        <h1>todos</h1>
        <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.newTodo}
            onKeyDown={this.handleNewTodoKeyDown}
            onChange={this.handleChange}
            autoFocus={true}
        />

    </header>
    ;
