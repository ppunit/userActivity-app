import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { connect } from 'react-redux'
import Login from './components/login/login'
import './App.scss';
import DashBoard from './components/dashboard/dashboard'
/**
 * App client Library
 */
class App extends React.Component {
  /**
   * 
   * @param {*} e 
   */
  logout(e) {
    this.props.dispatch({ type: "onLoginSuccess", target: false })
    if (this.props.history)
      this.props.history.push('/');
  }
  render() {


    return (
      <div className="App">
        <header className="App-header">
          <div><h3>Users Activity</h3></div>
          {Boolean(this.props.isLoginSuccess) ? <div className="logout-navigation-link" onClick={e => this.logout()}>Logout</div> : null}
        </header>
        <Router >
          <Switch>
            <Route exact path="/" strict component={Login} />
            <Route path="/dashboard" render={() => <DashBoard />}></Route>,
          </Switch>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoginSuccess: state.isLoginSuccess,
  }
}

export default connect(mapStateToProps)(App);
