import './App.css';
import React from 'react';
import PropTypes from 'prop-types'

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Header from './components/common/Header';

import MyPage from './containers/MyPage';
import Ranking from './containers/Ranking';
import SearchResult from './containers/SearchResult';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import Main from './containers/Main';

// video indexing / searching / result
import VideoIndexing from './containers/VideoIndexing';
import VideoSearching from './containers/VideoSearching';
import VideoResult from './containers/VideoResult';

function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <Header></Header>
      <div className="App" >
        <Switch>
          <Route path='/' exact render={() => <Main />} />
          <Route path="/sign/login" exact render={() => <Signin />} />
          <Route path="/sign/join" exact render={() => <Signup />} />
          <Route path='/mypage/:id' exact render={() => <MyPage />} />
          <Route path='/rank' exact render={() => <Ranking />} />
          <Route path="/search/:id" exact render={() => <SearchResult />} />
          <Route path="/search/group/:id" exact render={() => <SearchResult isGroup={true} />} />

          <Route path='/video' exact render={() => <VideoIndexing />} />
          <Route path='/video/search' exact render={() => <VideoSearching />} />
          <Route path='/video/result' exact render={() => <VideoResult />} />
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
