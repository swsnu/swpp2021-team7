import './App.css';
import React from 'react';
import PropTypes from 'prop-types'

import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Header from './components/common/Header';


import MyPage from './containers/MyPage';
import Ranking from './containers/Ranking';
import SearchResult from './containers/SearchResult';

function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <Header></Header>
      <div className="App" >
        <Switch>
          <Route path='/mypage/:id' exact render={() => <MyPage />} />
          <Route path='/rank' exact render={() => <Ranking />} />
          <Route path="/search/:id" exact component={SearchResult} />
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
