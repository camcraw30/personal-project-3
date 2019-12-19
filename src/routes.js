import React from "react";
import LoginPage from "./components/LoginPage";
import Comments from "./components/Comments";
import Home from "./components/Home";
import {Switch, Route} from "react-router-dom";

export default (
    <Switch>
        <Route component={LoginPage} exact path="/" />
        <Route component={Home} path="/home" />
        <Route component={Comments} path="/comments" />
        <Route render={() => <h1>404 - Not Found</h1>} />
    </Switch>
)