/* @refresh reload */
import { render } from 'solid-js/web';

import './output.css';
import { App } from './App';

import { Router, Route } from '@solidjs/router';
import {
  ArmorPage,
  ClassRacePage,
  WeaponsPage,
  MonstersPage,
  CharactersPage,
} from './routes';

const root = document.getElementById('root');

render(
  () => (
    <Router root={App}>
      <Route path="/weapons" component={WeaponsPage} />
      <Route path="/armor" component={ArmorPage} />
      <Route path="/classes-races" component={ClassRacePage} />
      <Route path="/monsters/*number" component={MonstersPage} />
      <Route path="/characters" component={CharactersPage} />
      <Route path="/" />
    </Router>
  ),
  root!,
);
