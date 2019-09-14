import * as React from "react";
import { appConnect } from "store";
import { Page as MainPage } from "components/MainPage";


const FooterInfo = () =>
    <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>Refactored from several extant examples by <a href="https://github.com/baavgai">Baavgai</a></p>
    </footer>;


const Footer = () =>
    <footer className="footer">
        <span className="todo-count"></span>
        <ul className="filters">
            <li><a href="#/" className="selected">All</a></li>
            <li><a href="#/active">Active</a></li>
            <li><a href="#/completed">Completed</a></li>
        </ul>
        <button className="clear-completed">Clear completed</button>
    </footer>;


const Header = () =>
    <header className="header">
        <h1>todos</h1>
        <input className="new-todo" placeholder="What needs to be done?" autofocus={true}></input>
    </header>
    ;

const Main = () =>
    <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list"></ul>
    </section>
    ;

const ViewComponent = (p) =>
    <section className="todoapp">
        <Header />
        <Main />
        <Footer />
    </section>
    ;

export const AppPage = appConnect(x => x)(ViewComponent);

