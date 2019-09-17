import * as React from "react";
import { Header } from "components/Header";
import { Footer } from "components/Footer";
import { Main } from "components/Main";

export const AppPage = () =>
    <section className="todoapp">
        <Header />
        <Main />
        <Footer />
    </section>;
