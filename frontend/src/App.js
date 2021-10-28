// import React from 'react';
// import './App.css';

// import HeroList from './containers/HeroList/HeroList';
// import RealDetail from './containers/HeroList/RealDetail/RealDetail';
// import NewHero from './containers/HeroList/NewHero/NewHero';

// import { Route, Redirect, Switch } from 'react-router-dom';
// import { ConnectedRouter } from 'connected-react-router';

// function App(props) {
//   return (
//     <ConnectedRouter history={props.history}>
//       <div className="App" >
//         <Switch>
//           <Route path='/heros' exact render={() => <HeroList title="MY FAVORITE HEROS" />} />
//           <Route path='/heros/:id' exact component={RealDetail} />
//           <Route path='/new-hero' exact component={NewHero} />
//           <Redirect exact from='/' to='heros' />
//           <Route render={() => <h1>Not Found</h1>} />
//         </Switch>
//       </div >
//     </ConnectedRouter>
//   );
// }

// export default App;