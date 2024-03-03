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
import { ItemsPage } from './routes/ItemsPage';
import { ShopsPage } from './routes/ShopsPage';

const root = document.getElementById('root');

render(
  () => (
    <Router root={App}>
      <Route path="/weapons/*number" component={WeaponsPage} />
      <Route path="/armor/*number" component={ArmorPage} />
      <Route path="/items/*number" component={ItemsPage} />
      <Route path="/classes-races" component={ClassRacePage} />
      <Route path="/monsters/*number" component={MonstersPage} />
      <Route path="/shops/*number" component={ShopsPage} />
      <Route path="/characters/*id" component={CharactersPage} />
      <Route path="/" />
    </Router>
  ),
  root!,
);
