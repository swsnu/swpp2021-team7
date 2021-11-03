import './App.css';
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <div className="App" >
        <Switch>
          <Route path='/mypage/:id' exact render={() => <TodoList title="My TODOs!" />} />
          <Route path='/todos/:id' exact component={RealDetail} />
          <Route path='/new-todo' exact component={NewTodo} />
          <Redirect exact from='/' to='todos' />
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </div >
    </ConnectedRouter>
  );
}

export default App;
