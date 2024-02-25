/* @refresh reload */
import { render } from 'solid-js/web';

import './output.css';
import { App } from './App';

import { Router, Route } from '@solidjs/router';
import { ArmorPage, ClassRacePage, WeaponsPage } from './routes';

const root = document.getElementById('root');

render(
  () => (
    <Router root={App}>
      <Route path="/weapons" component={WeaponsPage} />
      <Route path="/armor" component={ArmorPage} />
      <Route path="/classes-races" component={ClassRacePage} />
      <Route path="/" />
    </Router>
  ),
  root!,
);
