import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
// Contexto
import UserContext from './App/contexts/user';

// Css
import './App/App.css';

// Componentes
import Home from './App/Home';
import Login from './App/Login';

class App extends Component {
  constructor(props) {
    super(props);

    // Bind de los métodos
    this.updateUser = this.updateUser.bind(this);

    this.state = {
      loading: true,
      albums: [],
      signedIn: false,
      updateUser: this.updateUser
    }
  }

  updateUser(signedIn, user) {
    this.setState(() => ({ signedIn }));
  }

  render() {
    return (

     <Router>
      <UserContext.Provider value={this.state}>
        <div className="App container">
          <Route path="/" exact component={Home}/>
          <Route path="/login" exact component={Login}/>
        </div>
      </UserContext.Provider>
    </Router>
    );
  }
}

export default App;

