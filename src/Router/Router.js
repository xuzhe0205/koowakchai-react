import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Main from '../Page/Main/Main.jsx';
import LoginSignup from '../Page/LoginSignup/LoginSignup'
import Home from '../Page/Home/Home';
import EditUserInfo from '../Page/EditUserInfo/EditUserInfo';
import Store from '../Page/Store/Store';
import ECigarette from '../Page/ECigarette/ECigarette';

const BaseRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/loginSignup" component={LoginSignup} />
            <Route exact path="/home" component={Home}/>
            <Route exact path="/editUserInfo" component={EditUserInfo}/>
            <Route exact path="/store" component={Store}/>
            <Route exact path="/eCigarette" component={ECigarette}/>
        </Switch>
    </HashRouter>
)

export default BaseRoute;