import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import auth from '../Auth';
import '../App.css';

class Nav extends Component {

  constructor(props){
    super(props);
  }

  logout = () => {
    auth.logout();
    this.props.history.replace('/');
  };

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">COOL READS</Link>
        </div>
        <ul className="nav navbar-nav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            {
              ( auth.isAuthenticated() ) ? <Link to="/list">List boomarks</Link> :  ''
            }
          </li>
          <li>
            {
              ( auth.isAuthenticated() ) ? <Link to="/create">Add boomark</Link> :  ''
            }
          </li>
          <li>
            {
              ( auth.isAuthenticated() ) ? <Link to="/delete">Delete boomark</Link> :  ''
            }
          </li>
          <li>
            {
              ( auth.isAuthenticated() ) ? <Link to="/list-saved-searches">List saved searches</Link> :  ''
            }
          </li>
          <li>
            {
              ( auth.isAuthenticated() ) ? <Link to="/create-saved-search">Add saved search</Link> :  ''
            }
          </li>
          <li>
            {
              ( auth.isAuthenticated() ) ? <Link to="/delete-saved-search">Delete saved search</Link> :  ''
            }
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li>
            {
             (auth.isAuthenticated()) ? (<button className="btn btn-danger log" onClick={() => this.logout()}>Log out </button>) : (<button className="btn btn-info log" onClick={() => auth.login()}>Log In</button>)
            }
          </li>
        </ul>
      </nav>
    );
  }
}

export default withRouter(Nav);