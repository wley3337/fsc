import React, { Component } from 'react';
import { connect } from 'react-redux'
// import * as actions from '../redux/actions'
import LoginForm from '../components/LoginForm'
import CreateUserForm from '../components/CreateUserForm'
import HomeScreenButtons from '../components/HomeScreenButtons';
import ViewContainer from './ViewContainer';
import SelectionContainer from './SelectionContainer'
import NavBar from './NavBar'

import { Route } from 'react-router-dom'

class App extends Component {
 

  render() {
    return (
      <div className="compass">
          <Route exact path="/" render={() => <HomeScreenButtons />}/>
          <Route exact path="/login" component={  LoginForm } />
          <Route exact path="/create-user" component={  CreateUserForm } />
          
            {/* <Route exact path="/my-page" render={() => <NavBar/>} />
            <Route exact path="/my-page" render={() =>  <ViewContainer/> }/>
            <Route exact path="/my-page" render={() =>  <SelectionContainer/> }/> */}

             <Route path="/select" render={() => <NavBar/>} />
            <Route exact path="/select/my-page" render={() =>  <ViewContainer/> }/>
            <Route exact path="/select/public-notes" render={() =>  <SelectionContainer/> }/>
          
      </div>
    );
  }
}



export default App;
