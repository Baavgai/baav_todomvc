import * as React from "react";
import { appConnect } from "store";
import { Page as MainPage } from "components/MainPage";


const FooterInfo = () =>
    <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>Refactored from several extant examples by <a href="https://github.com/baavgai">Baavgai</a></p>
    </footer>;
