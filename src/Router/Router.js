import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Main from '../page/Main/Main.jsx';
import LoginSignup from '../page/LoginSignup/LoginSignup'

const BaseRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/loginSignup" component={LoginSignup} />

        </Switch>
    </HashRouter>
)

export default BaseRoute;