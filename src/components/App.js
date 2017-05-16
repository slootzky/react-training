import React, { Component } from 'react';
import './App.css';
import Popular from './Popular';
import * as ReactRouter from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import Battle from './Battle';

const Roter = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;
const Switch = ReactRouter.Switch;

class App extends Component {
  render() {
    return (
      <Roter>
        <div className="container">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/battle" component={Battle} />
            <Route path="/popular" component={Popular} />
            <Route render={() => <p>Not Found</p>} />
          </Switch>
        </div>
      </Roter>
    );
  }
}

export default App;
