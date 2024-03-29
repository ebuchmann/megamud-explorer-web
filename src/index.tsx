/* @refresh reload */
import { render } from 'solid-js/web';
import { inject } from '@vercel/analytics';

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
import { MainPage } from './routes/MainPage';
import { SpellsPage } from './routes/SpellsPage';
import { RoomsPage } from './routes/RoomsPage';

inject({ debug: false });

const root = document.getElementById('root');

render(
  () => (
    <Router root={App}>
      <Route path="/weapons/*number" component={WeaponsPage} />
      <Route path="/armor/*number" component={ArmorPage} />
      <Route path="/items/*number" component={ItemsPage} />
      <Route path="/classes-races" component={ClassRacePage} />
      <Route path="/spells/*number" component={SpellsPage} />
      <Route path="/monsters/*number" component={MonstersPage} />
      <Route path="/shops/*number" component={ShopsPage} />
      <Route path="/characters/*id" component={CharactersPage} />
      <Route path="/rooms/*number" component={RoomsPage} />
      <Route path="/" component={MainPage} />
    </Router>
  ),
  root!,
);
