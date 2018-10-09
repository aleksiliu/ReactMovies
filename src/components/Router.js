import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Main from './Main';
import Movie from './Movie';
import MovieResults from './MovieResults';

export default () => (
  <HashRouter>
    <Switch>
      <Route path="/" component={Main} exact />
      <Route path="/movie/:movieId" component={Movie} />
      <Route path="/search/:term" component={MovieResults} />
    </Switch>
  </HashRouter>
);
