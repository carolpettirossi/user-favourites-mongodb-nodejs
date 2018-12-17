import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';

import ListBookmarks from './components/ListBookmarks';
import CreateBookmark from './components/CreateBookmark';
import DeleteBookmark from './components/DeleteBookmark';
import Callback from './components/Callback';
import Home from './components/Home';
import GuardedRoute from './components/GuardedRoute';
import Nav from './components/Nav';

import ListSavedSearches from './components/ListSavedSearches';
import CreateSavedSearch from './components/CreateSavedSearch';
import DeleteSavedSearch from './components/DeleteSavedSearch';

import auth from './Auth';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    tryingSilent: true
  };

  async componentDidMount() {
    if (this.props.location.pathname === '/callback') return;
    try {
      await auth.silentAuth();
      this.setState({ tryingSilent: false });
      this.forceUpdate();
    } catch (err) {
      if (err.error === 'login_required') return;
      console.log(err.error);
    }
  }

  render() {
    if (!this.state.tryingSilent) {
      return (
        <div>
          <Nav />
          <Route exact path='/' component={Home} />
          <Route exact path='/callback' component={Callback} />
          <GuardedRoute exact path='/list' component={ListBookmarks} />
          <GuardedRoute exact path='/create' component={CreateBookmark} />
          <GuardedRoute exact path='/delete' component={DeleteBookmark} />
          <GuardedRoute exact path='/list-saved-searches' component={ListSavedSearches} />
          <GuardedRoute exact path='/create-saved-search' component={CreateSavedSearch} />
          <GuardedRoute exact path='/delete-saved-search' component={DeleteSavedSearch} />
        </div>
      );
    }

    return (<div>Loading....</div>);
  }
}

export default withRouter(App);
