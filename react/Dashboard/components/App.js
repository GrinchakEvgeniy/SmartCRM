import React, { Component } from "react";
import LogIn from "./LogIn/LogIn";
import { Switch, Route } from 'react-router-dom'
import DashBoard from "./DashBoard/DashBoard";
import "./App.scss"

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/login' component={LogIn}/>
                <Route exact path='/dashboard' component={DashBoard}/>
            </Switch>
        );
    }
}

export default App;