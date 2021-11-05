import './App.css';
import React from 'react';
import PropTypes from 'prop-types'

import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import MyPage from './containers/MyPage';
import Ranking from './containers/Ranking';

function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <div className="App" >
        <Switch>
          <Route path='/mypage/:id' exact render={() => <MyPage/>} />
          <Route path='/rank' exact render={() => <Ranking/>} />
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </div >
    </ConnectedRouter>
  );
}

App.propTypes = {
  history: PropTypes.object
}

export default App;
