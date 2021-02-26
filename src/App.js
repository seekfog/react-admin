import React, { Component } from 'react'
import Admin from './containers/admin/admin'
import Login from './containers/login/login'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
export default class App extends Component {

  render() {
    return (
      <BrowserRouter>
      <Switch>
        <Route path='/login' component={Login}></Route>
        <Route path='/' component={Admin}></Route>
      </Switch>
      </BrowserRouter>
    )
  }
}