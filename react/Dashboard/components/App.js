import React, { Component } from "react";
import LogIn from "./LogIn/LogIn";
import { Switch, Route } from 'react-router-dom'

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/login' component={LogIn}/>
            </Switch>
        );
    }
}

export default App;