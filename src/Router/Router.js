import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Main from '../Page/Main/Main.jsx';
import LoginSignup from '../Page/LoginSignup/LoginSignup'
import Home from '../Page/Home/Home';
import EditUserInfo from '../Page/EditUserInfo/EditUserInfo';
import Store from '../Page/Store/Store';
import ECigarette from '../Page/ECigarette/ECigarette';
import ShoppingCart from '../Page/ShoppingCart/ShoppingCart';
import PlaceOrder from "../Page/PlaceOrder/PlaceOrder";
import StaffHome from "../Page/StaffHome/StaffHome";
import ProcessOrder from "../Page/ProcessOrder/ProcessOrder";
import Liquor from "../Page/Liquor/Liquor";
import ECigaretteWarehouse from "../Page/ECigaretteWarehouse/ECigaretteWarehouse";
import LiquorWarehouse from "../Page/LiquorWarehouse/LiquorWarehouse";

const BaseRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/loginSignup" component={LoginSignup} />
            <Route exact path="/home" component={Home}/>
            <Route exact path="/editUserInfo" component={EditUserInfo}/>
            <Route exact path="/store" component={Store}/>
            <Route exact path="/eCigarette" component={ECigarette}/>
            <Route exact path="/liquor" component={Liquor}/>
            <Route exact path="/shoppingCart" component={ShoppingCart}/>
            <Route exact path="/placeOrder" component={PlaceOrder}/>
            <Route exact path="/staffHome" component={StaffHome}/>
            <Route exact path="/processOrder" component={ProcessOrder}/>
            <Route exact path="/eCigaretteWarehouse" component={ECigaretteWarehouse}/>
            <Route exact path="/liquorWarehouse" component={LiquorWarehouse}/>

        </Switch>
    </HashRouter>
)

export default BaseRoute;