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
      <div className="App" >
        <Switch>
          <Route path='/' exact render={() => <React.Fragment><Header /><Main /></React.Fragment>} />
          <Route path="/sign/login" exact render={() => <React.Fragment><Header /><Signin /></React.Fragment>} />
          <Route path="/sign/join" exact render={() => <React.Fragment><Header /><Signup /></React.Fragment>} />
          <Route path='/mypage/:id' exact render={(props) => <React.Fragment><Header /><MyPage {...props} /></React.Fragment>} />
          <Route path='/rank' exact render={() => <React.Fragment><Header /><Ranking /></React.Fragment>} />
          <Route path="/search/member/:id" exact render={() => <React.Fragment><Header /><SearchResult /></React.Fragment>} />
          <Route path="/search/group/:id" exact render={() => <React.Fragment><Header /><SearchResult isGroup={true} /></React.Fragment>} />

          <Route path='/video' exact render={() => <React.Fragment><Header /><VideoIndexing /></React.Fragment>} />
          <Route path='/video/search' exact render={() => <React.Fragment><Header /><VideoSearching /></React.Fragment>} />
          <Route path='/video/result' exact render={() => <React.Fragment><Header /><VideoResult /></React.Fragment>} />
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
