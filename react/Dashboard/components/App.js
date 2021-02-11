import React, {Component} from "react";
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import rootReducer from './redux/reducers/reducers';
import LogIn from "./LogIn/LogIn";
import {Switch, Route} from 'react-router-dom'
import DashBoard from "./DashBoard/DashBoard";
import "./App.scss"


const store = createStore(rootReducer, applyMiddleware(thunk));

class App extends Component {
    render() {
        return (

            <Provider store={store}>
                <Switch>
                    <Route exact path='/login' component={LogIn}/>
                    <Route exact path='/dashboard' component={DashBoard}/>
                    {/*<Route exact path='/dashboard/profile' component={Profile}/>*/}
                </Switch>
            </Provider>
        );
    }
}

export default App;