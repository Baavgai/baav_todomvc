import * as React from "react";
import { appConnect } from "store";
import { Page as MainPage } from "components/MainPage";

const Main = () =>
    <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list"></ul>
    </section>
    ;
