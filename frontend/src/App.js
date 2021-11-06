import './App.css';
import React from 'react';
import PropTypes from 'prop-types'

import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Header from './components/common/Header';

import MyPage from './containers/MyPage';
import Ranking from './containers/Ranking';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import FindAccount from './containers/FindAccount';
import Main from './containers/Main';

function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <Header></Header>
      <div className="App" >
        <Switch>
          <Route path='/' exact render={() => <Main />} />
          <Route path="/sign/login" exact render={() => <Signin />} />
          <Route path="/sign/join" exact render={() => <Signup />} />
          <Route path="/sign/findAccount" exact render={() => <FindAccount />} />
          <Route path='/mypage/:id' exact render={() => <MyPage />} />
          <Route path='/rank' exact render={() => <Ranking />} />
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
