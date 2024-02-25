/* @refresh reload */
import { render } from 'solid-js/web';

import './output.css';
import { App } from './App';

import { Router, Route } from '@solidjs/router';
import { WeaponsPage } from './routes/Weapons';
import { ArmorPage } from './routes/Armor';

const root = document.getElementById('root');

render(
  () => (
    <Router root={App}>
      <Route path="/weapons" component={WeaponsPage} />
      <Route path="/armor" component={ArmorPage} />
      <Route path="/" />
    </Router>
  ),
  root!,
);
