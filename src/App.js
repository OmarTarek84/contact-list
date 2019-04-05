import React, { Component } from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import {Switch, Route, Redirect} from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import AddContact from './containers/AddContact/AddContact';
import Contacts from './containers/Contacts/Contacts';
import EditContact from './containers/EditContact/EditContact';
import SignUp from './containers/Auth/SignUp/SignUp';
import SignIn from './containers/Auth/SignIn/SignIn';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as authActionCreators from './store/actions/Auth';

class App extends Component {

  componentDidMount() {
    this.props.onAuthCheck();
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/home" exact component={Homepage}></Route>
        <Route path="/signup" exact component={SignUp}></Route>
        <Route path="/signin" exact component={SignIn}></Route>
        <Redirect from="/" to="/home" />
      </Switch>
    )
      
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/add" exact component={AddContact}></Route>
          <Route path="/home" exact component={Homepage}></Route>
          <Route path="/contacts" exact component={Contacts}></Route>
          <Route path="/logout" exact component={Logout}></Route>
          <Route path="/edit/:id" exact component={EditContact}></Route>
          <Redirect from="/" to="/home" />
        </Switch>
      )
    }
    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthCheck: () => dispatch(authActionCreators.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
