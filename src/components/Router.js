import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from '../App';
import Movie from './Movie';
import MovieResults from './MovieResults';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={App} exact />
      <Route path="/movie/:movieId" component={Movie} />
      <Route path="/search/:term" component={MovieResults} />
    </Switch>
  </BrowserRouter>
);

export default Router;
